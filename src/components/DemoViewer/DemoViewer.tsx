'use client'

import { useClipboard } from '@mantine/hooks'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Expand,
  Check,
  Code2,
  ExternalLink,
  Eye,
  Link,
  Monitor,
  Moon,
  RotateCcw,
  Rows2,
  Smartphone,
  Sun,
  Tablet,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { ControlButton, ControlLink, Segmented } from './controls'
import { DemoCode } from './DemoCode'
import { DemoBridgeEvent, DemoDocument, DemoFile, DemoFrame, DemoFrameHandle } from './DemoFrame'
import {
  demoId,
  storeHeight,
  useStoredHeight,
  parseFrameworks,
  formatHash,
  Framework,
  FRAMEWORKS,
  parseHash,
  Size,
  SIZE_WIDTHS,
  Theme,
  useHash,
  useStoredFramework,
  View,
} from './state'
import { DEMO_URL, PRO_DEMO_URL } from '@/utils/constants'
import { cn } from '@/utils'

export type DemoViewerProps = {
  /** demos 应用中的演示，例如 `/Extensions/Comments`；可以带查询参数。使用 `src` 时不需要此项。 */
  path?: string
  isPro?: boolean
  /** 用完整 URL 代替 `path`：按原样显示，不提供代码、主题或框架选项。 */
  src?: string
  /** 固定高度为 15rem，除非设置了 `height`。 */
  isSmall?: boolean
  /** 固定高度为 70vh（宽屏上为 31rem），除非设置了 `height`。 */
  isLarge?: boolean
  /**
   * `auto`（默认值）会根据演示自身的高度调整，但不超过 `maxHeight`；数字（像素）
   * 或 CSS 长度则会固定高度。没有 bridge 的 demos 应用高度为 24rem。
   */
  height?: 'auto' | number | string
  /** 自动高度的最大值，单位为像素。 */
  maxHeight?: number
  /** 读者可以拖动演示底边来调整高度；除非设为 `false`，否则默认开启。 */
  resizable?: boolean
  /** 首先显示的内容。`both` 会在演示下方显示代码。 */
  view?: View
  /** 演示下方的代码块。关闭后，工具栏也不会显示“预览 / 代码 / 两者”。 */
  code?: boolean
  /** 演示下方显示多少代码后出现“显示全部”：像素值，或用 `full` 显示全部。 */
  codeHeight?: number | 'full'
  /** 代码支持的框架，例如 `"React"` 或 `"React, Vue"`。只有一个时会隐藏切换选项。 */
  frameworks?: Framework[] | string
  /** 浅色 / 深色切换，仅适用于同时支持这两种主题的演示。 */
  themes?: boolean
  /** 桌面 / 平板 / 手机宽度切换，用于响应式 UI 演示。 */
  sizes?: boolean
  /** “展开”按钮，可在页面上方以大尺寸打开演示，并在旁边显示代码；除非设为 `false`，否则默认开启。 */
  expand?: boolean
  /** 工具栏左侧的简短文字，用于没有代码、因而没有“预览 / 代码 / 两者”选项的演示。 */
  caption?: React.ReactNode
  className?: string
}

const OPEN_SOURCE_REPO = 'https://github.com/ueberdosis/tiptap/tree/main/demos/src'

const VIEW_OPTIONS: { value: View; label: string; tooltip: string; icon: React.ReactNode }[] = [
  { value: 'preview', label: '预览', tooltip: '显示演示', icon: <Eye /> },
  { value: 'code', label: '代码', tooltip: '显示代码', icon: <Code2 /> },
  { value: 'both', label: '两者', tooltip: '显示演示及其代码', icon: <Rows2 /> },
]

const THEME_OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: '浅色', icon: <Sun /> },
  { value: 'dark', label: '深色', icon: <Moon /> },
]

const SIZE_OPTIONS: { value: Size; label: string; icon: React.ReactNode }[] = [
  { value: 'desktop', label: '桌面宽度', icon: <Monitor /> },
  { value: 'tablet', label: '平板宽度', icon: <Tablet /> },
  { value: 'phone', label: '手机宽度', icon: <Smartphone /> },
]

type Bridge = { state: 'pending' | 'ready' | 'none'; tabs: Framework[]; tab: Framework | null }

/**
 * 显示来自 demos 应用的演示，并在上方提供工具栏：预览 / 代码 / 两者、浅色或深色主题、
 * 桌面 / 平板 / 手机宽度、重置、复制当前状态链接、在页面上展开演示，以及在新标签页单独打开演示。
 * 代码来自演示本身（参见 `DemoFrame`）。
 *
 * 读者可以为所有演示选择 React 或 Vue。每个框架的演示都是单独的页面，
 * 因此切换框架会重新加载框架；读者编辑过的文档也会一并保留。
 */
export const DemoViewer = ({
  path = '',
  isPro,
  src,
  isSmall,
  isLarge,
  height = isSmall ? 240 : isLarge ? 'min(70vh, 31rem)' : 'auto',
  maxHeight = 640,
  resizable = true,
  view: defaultView = 'both',
  code: showsCode = true,
  codeHeight = 448,
  frameworks: frameworksProp,
  themes: hasThemes,
  sizes: hasSizes,
  expand: hasExpand = true,
  caption,
  className,
}: DemoViewerProps) => {
  const id = demoId(src ?? path)
  const [pathname, search = ''] = path.split('?')
  const demoPath = pathname.replace(/\/$/, '')
  const pathFramework = FRAMEWORKS.find((name) => demoPath.endsWith(`/${name}`))
  const allowed = parseFrameworks(frameworksProp)
  // 如果路径以框架名结尾，或页面指定了框架，则只显示该框架
  const fixedFramework = pathFramework ?? (allowed.length === 1 ? allowed[0] : undefined)
  const name =
    demoPath
      .split('/')
      .filter(Boolean)
      .at(pathFramework ? -2 : -1) ?? 'Demo'
  const base = isPro ? PRO_DEMO_URL : DEMO_URL

  const hashState = parseHash(useHash(), id)
  const [storedFramework, setStoredFramework] = useStoredFramework()
  const [viewChoice, setViewChoice] = useState<View | null>(null)
  const [frameworkChoice, setFrameworkChoice] = useState<Framework | null>(null)
  const [themeChoice, setThemeChoice] = useState<Theme | null>(null)
  const [sizeChoice, setSizeChoice] = useState<Size | null>(null)
  const [loadTheme, setLoadTheme] = useState<Theme | null>(null)
  const [reloads, setReloads] = useState(0)
  const [bridge, setBridge] = useState<Bridge>({ state: 'pending', tabs: [], tab: null })
  const [files, setFiles] = useState<Partial<Record<Framework, DemoFile[]>>>({})
  const [doc, setDoc] = useState<{ json: DemoDocument; edited: boolean } | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  // 展开视图有自己的显示模式，默认同时显示演示和代码
  const [expandedView, setExpandedView] = useState<View>('both')
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const storedHeight = useStoredHeight(id)
  const [dragHeight, setDragHeight] = useState<number | null>(null)
  const demoCard = useRef<HTMLDivElement>(null)
  const inlineHandle = useRef<DemoFrameHandle>(null)
  const expandedEdited = useRef(false)
  const clipboard = useClipboard({ timeout: 1200 })

  const wanted = frameworkChoice ?? hashState?.framework ?? storedFramework
  const framework = fixedFramework ?? (allowed.includes(wanted) ? wanted : allowed[0])
  const theme = hasThemes ? (themeChoice ?? hashState?.theme ?? 'light') : 'light'
  const size = hasSizes ? (sizeChoice ?? hashState?.size ?? 'desktop') : 'desktop'
  // 演示实际显示的框架：只有 React 的演示只显示 React
  const shownFramework =
    bridge.tab ??
    (bridge.tabs.length && !bridge.tabs.includes(framework) ? bridge.tabs[0] : framework)
  const hasBridge = !src && bridge.state === 'ready'
  const hasCode = showsCode && !src && bridge.state !== 'none'
  const view = hasCode ? (viewChoice ?? hashState?.view ?? defaultView) : 'preview'

  const frameSrc = (() => {
    if (src) return src
    const params = new URLSearchParams(search)
    params.set('embed', 'true')
    params.set('hideSource', 'true')
    if (!pathFramework) params.set('tab', framework)
    params.set('theme', loadTheme ?? theme)
    return `${base}${pathname}?${params}`
  })()

  const newTabUrl = (() => {
    if (src) return src
    const demo = pathFramework ? demoPath : `${demoPath}/${shownFramework}`
    return `${new URL(base).origin}/src${demo}/?theme=${theme}`
  })()

  const githubUrl =
    !isPro && !src
      ? `${OPEN_SOURCE_REPO}${pathFramework ? demoPath : `${demoPath}/${shownFramework}`}`
      : undefined

  // 带有此演示状态的链接会滚动到该演示
  const isLinked = hashState !== null
  useEffect(() => {
    if (isLinked) {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    }
  }, [id, isLinked])

  const onBridge = (event: DemoBridgeEvent) => {
    if (event.type === 'ready') {
      setBridge({ state: 'ready', tabs: event.tabs, tab: event.tab })
    }
    if (event.type === 'height') {
      setContentHeight(event.height)
      storeHeight(id, event.height)
    }
    if (event.type === 'source') {
      setFiles((previous) => ({ ...previous, [event.tab]: event.files }))
    }
    if (event.type === 'document') {
      setDoc((previous) => ({
        json: event.json,
        edited: Boolean(previous?.edited || event.edited),
      }))
      if (isExpanded && event.edited) expandedEdited.current = true
    }
  }

  // 展开框架会按对话框宽度测量，因此它的高度与内嵌演示的高度不同
  const onExpandedBridge = (event: DemoBridgeEvent) => {
    if (event.type !== 'height') onBridge(event)
  }

  const onNoBridge = () =>
    setBridge((previous) =>
      previous.state === 'pending' ? { ...previous, state: 'none' } : previous,
    )

  // 新框架会以当前显示的主题启动；之后的更改通过消息发送给它
  const freezeTheme = () => setLoadTheme(null)

  const changeFramework = (value: Framework) => {
    if (value === framework) return
    setStoredFramework(value)
    if (hashState?.framework) setFrameworkChoice(value)
    setBridge((previous) => ({ ...previous, tab: null }))
    freezeTheme()
  }

  const changeTheme = (value: Theme) => {
    if (loadTheme === null) setLoadTheme(theme)
    setThemeChoice(value)
  }

  const reset = () => {
    setDoc(null)
    setDragHeight(null)
    setBridge((previous) => ({ ...previous, tab: null }))
    freezeTheme()
    setReloads((count) => count + 1)
  }

  const copyLink = () => {
    const hash = formatHash(id, { view, framework: shownFramework, size, theme })
    clipboard.copy(`${window.location.href.split('#')[0]}${hash}`)
    toast('链接已复制', { duration: 1200 })
  }

  const openExpanded = () => {
    setExpandedView('both')
    expandedEdited.current = false
    setIsExpanded(true)
  }

  const onExpandedChange = (isOpen: boolean) => {
    setIsExpanded(isOpen)
    // 读者在展开视图中输入的内容会同步回页面
    if (!isOpen && expandedEdited.current && doc) {
      inlineHandle.current?.setContent(doc.json)
    }
  }

  const frameworks = fixedFramework
    ? []
    : bridge.tabs.length
      ? allowed.filter((item) => bridge.tabs.includes(item))
      : allowed

  // 用户拖动的高度、固定高度，或演示自身的高度（收到通知前为 24rem；没有 bridge 时也为 24rem）
  const frameHeight: number | string =
    dragHeight ??
    (height !== 'auto'
      ? height
      : Math.min(maxHeight, Math.max(120, (hasBridge && contentHeight) || storedHeight || 384)))

  // 自动高度模式下，等演示报告高度后再显示，避免在读者面前不断变高
  const isMeasuring =
    height === 'auto' && dragHeight === null && contentHeight === null && bridge.state !== 'none'

  const startResize = (event: React.PointerEvent<HTMLDivElement>) => {
    const startY = event.clientY
    const startHeight = demoCard.current?.getBoundingClientRect().height ?? 384
    const handle = event.currentTarget
    handle.setPointerCapture(event.pointerId)
    const onMove = (move: PointerEvent) =>
      setDragHeight(Math.max(120, Math.round(startHeight + move.clientY - startY)))
    const onUp = () => {
      handle.removeEventListener('pointermove', onMove)
      handle.removeEventListener('pointerup', onUp)
    }
    handle.addEventListener('pointermove', onMove)
    handle.addEventListener('pointerup', onUp)
  }

  const resizeByKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowDown' ? 40 : event.key === 'ArrowUp' ? -40 : 0
    if (!step) return
    event.preventDefault()
    const current = demoCard.current?.getBoundingClientRect().height ?? 384
    setDragHeight(Math.max(120, Math.round(current + step)))
  }
  const frameKey = `${frameSrc}#${reloads}`
  const restore = doc?.edited ? doc.json : null

  const code = (codeClassName?: string, collapsedHeight: number | null = null) => (
    <DemoCode
      className={codeClassName}
      collapsedHeight={collapsedHeight}
      files={files[shownFramework] ?? null}
      document={doc?.json ?? null}
      framework={shownFramework}
      frameworks={frameworks}
      onFrameworkChange={changeFramework}
      githubUrl={githubUrl}
      isUnavailable={bridge.state === 'none'}
      demoUrl={newTabUrl}
    />
  )

  const viewSwitch = (current: View, onChange: (value: View) => void) => (
    <Segmented label="视图">
      {VIEW_OPTIONS.map((option) => (
        <ControlButton
          key={option.value}
          label={option.label}
          tooltip={option.tooltip}
          aria-pressed={current === option.value}
          isActive={current === option.value}
          onClick={() => onChange(option.value)}
          className="px-2.5"
        >
          <span className="max-sm:hidden">{option.label}</span>
          <span className="sm:hidden">{option.icon}</span>
        </ControlButton>
      ))}
    </Segmented>
  )

  const bar = (inExpanded: boolean) => (
    // 手机屏幕上工具栏可横向滚动，不会换行到第二行
    <div className="flex items-center gap-x-2 gap-y-1.5 sm:flex-wrap max-sm:-mx-1 max-sm:overflow-x-auto max-sm:px-1 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden">
      {hasCode && !inExpanded ? viewSwitch(view, setViewChoice) : null}
      {/* 左侧通常放视图切换；没有视图切换时才放说明文字 */}
      {caption && !hasCode && !inExpanded ? (
        <p className="m-0 min-w-0 flex-1 truncate text-sm text-grayAlpha-600 [&_strong]:font-semibold [&_strong]:text-grayAlpha-900">
          {caption}
        </p>
      ) : null}

      <div className="ml-auto flex shrink-0 items-center gap-x-2 gap-y-1.5 sm:flex-wrap">
        {hasCode && inExpanded ? (
          <>
            {/* 展开视图始终显示演示；唯一的选项是是否在旁边显示代码 */}
            <ControlButton
              label="代码"
              tooltip={expandedView === 'both' ? '隐藏代码' : '在演示旁显示代码'}
              aria-pressed={expandedView === 'both'}
              isActive={expandedView === 'both'}
              onClick={() => setExpandedView(expandedView === 'both' ? 'preview' : 'both')}
            >
              <Code2 />
              <span className="max-sm:hidden">代码</span>
            </ControlButton>
            <Divider />
          </>
        ) : null}
        {hasBridge && hasThemes ? (
          <Segmented label="主题">
            {THEME_OPTIONS.map((option) => (
              <ControlButton
                key={option.value}
                label={option.label}
                tooltip={`${option.label}主题演示`}
                aria-pressed={theme === option.value}
                isActive={theme === option.value}
                onClick={() => changeTheme(option.value)}
              >
                {option.icon}
              </ControlButton>
            ))}
          </Segmented>
        ) : null}
        {hasSizes ? (
          <Segmented label="宽度" className="max-sm:hidden">
            {SIZE_OPTIONS.map((option) => (
              <ControlButton
                key={option.value}
                label={option.label}
                aria-pressed={size === option.value}
                isActive={size === option.value}
                onClick={() => setSizeChoice(option.value)}
              >
                {option.icon}
              </ControlButton>
            ))}
          </Segmented>
        ) : null}
        <div className="flex items-center gap-0.5">
          <ControlButton label="重置" tooltip="重新加载演示" onClick={reset}>
            <RotateCcw />
          </ControlButton>
          {!src ? (
            <ControlButton
              label={clipboard.copied ? '链接已复制' : '复制链接'}
              tooltip="复制当前演示状态的链接"
              onClick={copyLink}
            >
              {clipboard.copied ? <Check /> : <Link />}
            </ControlButton>
          ) : null}
          {/* 图标操作按钮，之后是可在其他位置打开演示的按钮 */}
          <Divider />
          {inExpanded || !hasExpand ? null : (
            <ControlButton
              label="展开"
              tooltip="放大打开，并在旁边显示代码"
              onClick={openExpanded}
            >
              <Expand />
              <span className="max-sm:hidden">展开</span>
            </ControlButton>
          )}
          <ControlLink
            label="新标签页"
            tooltip="在新标签页中单独打开演示"
            tipAlign="end"
            href={newTabUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink />
            <span className="max-sm:hidden">新标签页</span>
          </ControlLink>
          {inExpanded ? (
            <>
              <Divider />
              <Dialog.Close asChild>
                <ControlButton label="关闭" tooltip="关闭（Esc）" tipAlign="end">
                  <X />
                </ControlButton>
              </Dialog.Close>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )

  const stage = (frame: React.ReactNode, frameClassName?: string) => (
    <div
      className={cn(
        'flex h-full justify-center overflow-hidden transition-colors',
        size === 'desktop'
          ? theme === 'dark'
            ? 'bg-[#110f0e]'
            : 'bg-white'
          : theme === 'dark'
            ? 'bg-gray-800'
            : 'bg-grayAlpha-100',
      )}
    >
      <div
        className={cn(
          'max-w-full transition-[width] duration-200',
          theme === 'dark' ? 'bg-[#110f0e]' : 'bg-white',
          size !== 'desktop' ? 'shadow-cardHover' : undefined,
          frameClassName,
        )}
        style={{ width: SIZE_WIDTHS[size] }}
      >
        {frame}
      </div>
    </div>
  )

  return (
    <div id={id} className={cn('c-demo my-12 scroll-mt-28', className)}>
      <div className="mb-2">{bar(false)}</div>
      <div className="relative">
        {/* 演示单独放在卡片中；在“代码”视图下会隐藏但仍保持加载，因为代码来自演示本身 */}
        <div
          aria-hidden={view === 'code' || undefined}
          className={
            view === 'code'
              ? 'pointer-events-none absolute inset-x-0 top-0 opacity-0'
              : 'relative overflow-hidden rounded-[0.625rem] bg-white shadow-cardHover'
          }
        >
          <div
            ref={demoCard}
            style={{ height: frameHeight }}
            className={cn(
              'transition-opacity duration-200',
              isMeasuring ? 'opacity-0' : 'opacity-100',
            )}
          >
            {stage(
              <DemoFrame
                key={frameKey}
                ref={inlineHandle}
                src={frameSrc}
                title={`${name} 演示`}
                theme={theme}
                initialContent={restore}
                isEager={view === 'code'}
                onBridge={onBridge}
                onNoBridge={onNoBridge}
              />,
              'h-full',
            )}
          </div>
          {resizable && view !== 'code' ? (
            <div
              role="separator"
              aria-orientation="horizontal"
              aria-label="调整演示大小"
              title="拖动以调整演示大小"
              tabIndex={0}
              onPointerDown={startResize}
              onKeyDown={resizeByKey}
              onDoubleClick={() => setDragHeight(null)}
              className="group/resize absolute inset-x-0 bottom-0 flex h-3 cursor-row-resize touch-none items-end justify-center pb-1 focus-visible:outline-none"
            >
              <span className="h-1 w-10 rounded-full bg-grayAlpha-300 transition-colors group-hover/resize:bg-purple-400 group-focus-visible/resize:bg-purple-600" />
            </div>
          ) : null}
        </div>

        {/* 代码块独立显示在演示下方 */}
        {hasCode && view !== 'preview'
          ? code(
              cn(
                'overflow-hidden rounded-[0.625rem]',
                view === 'code' ? 'h-124 max-h-[70vh]' : 'mt-4',
              ),
              view === 'both' && codeHeight !== 'full' ? codeHeight : null,
            )
          : null}
      </div>

      <Dialog.Root open={isExpanded} onOpenChange={onExpandedChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" />
          <Dialog.Content
            aria-describedby={undefined}
            // 焦点先放在对话框上，而不是第一个会显示工具提示的按钮上
            tabIndex={-1}
            onOpenAutoFocus={(event) => {
              event.preventDefault()
              ;(event.currentTarget as HTMLElement | null)?.focus()
            }}
            className="fixed inset-2 z-50 flex flex-col overflow-hidden rounded-xl bg-white shadow-2xl outline-none sm:inset-6"
          >
            <div className="flex flex-wrap items-center gap-2 border-b border-grayAlpha-200 px-3 py-2">
              <Dialog.Title className="m-0 mr-2 text-sm font-semibold text-grayAlpha-900">
                {name}
              </Dialog.Title>
              <div className="min-w-0 flex-1">{bar(true)}</div>
            </div>
            {isExpanded ? (
              <ExpandedBody
                view={hasCode ? expandedView : 'preview'}
                demo={stage(
                  <DemoFrame
                    key={`expanded-${frameKey}`}
                    src={frameSrc}
                    title={`${name} 演示`}
                    theme={theme}
                    initialContent={restore}
                    onBridge={onExpandedBridge}
                    onNoBridge={onNoBridge}
                  />,
                  'h-full',
                )}
                code={hasCode ? code('h-full') : null}
              />
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

/** 演示和代码并排显示；两者之间的分隔线可以用指针或方向键移动。 */
/** 控件组之间的细分隔线。 */
const Divider = () => <span aria-hidden className="mx-1 h-4 w-px shrink-0 bg-grayAlpha-200" />

const ExpandedBody = ({
  view,
  demo,
  code,
}: {
  view: View
  demo: React.ReactNode
  code: React.ReactNode | null
}) => {
  const [codeShare, setCodeShare] = useState(40)
  const container = useRef<HTMLDivElement>(null)

  const moveTo = (clientX: number) => {
    const box = container.current?.getBoundingClientRect()
    if (!box) return
    const share = ((clientX - box.left) / box.width) * 100
    setCodeShare(Math.min(80, Math.max(20, share)))
  }

  // 代码在左侧，演示在右侧；窄屏上演示显示在前
  return (
    <div ref={container} className="flex min-h-0 flex-1 flex-col-reverse md:flex-row">
      {code && view !== 'preview' ? (
        <>
          <div
            className={cn(
              'min-h-0',
              view === 'code' ? 'flex-1' : 'max-md:h-2/5 md:w-[var(--code-share)] md:shrink-0',
            )}
            style={{ '--code-share': `${codeShare}%` } as React.CSSProperties}
          >
            {code}
          </div>
          {view === 'code' ? null : (
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="调整代码区域大小"
              aria-valuenow={Math.round(codeShare)}
              aria-valuemin={20}
              aria-valuemax={80}
              tabIndex={0}
              onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) moveTo(event.clientX)
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') setCodeShare((share) => Math.min(80, share + 5))
                if (event.key === 'ArrowLeft') setCodeShare((share) => Math.max(20, share - 5))
              }}
              className="hidden w-1.5 shrink-0 cursor-col-resize bg-grayAlpha-200 transition-colors hover:bg-purple-400 focus-visible:bg-purple-600 focus-visible:outline-none md:block"
            />
          )}
        </>
      ) : null}
      {/* “代码”视图下隐藏但不卸载，以便演示保留读者输入的内容 */}
      <div
        className={cn(
          'min-h-0 min-w-0 flex-1 [&>div]:h-full',
          view === 'code' ? 'hidden' : undefined,
        )}
      >
        {demo}
      </div>
    </div>
  )
}
