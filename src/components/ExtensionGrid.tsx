/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { SearchIcon } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { CloseIcon } from '@codesandbox/sandpack-react'
import { Tag } from './ui/Tag'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import Link from '@/components/Link'
import { ExtensionMetaWithUrl } from '@/types'
import { IconByName } from '@/utils/iconKit'
import { useQueryParam } from '@/hooks/useQueryParams'

const SEARCH_FILTER = {
  ALL: 'all',
  OPEN_SOURCE: 'opensource',
  START: 'start',
  TEAM: 'team',
  ADDON: 'addon',
} as const

type SearchFilter = (typeof SEARCH_FILTER)[keyof typeof SEARCH_FILTER]

function useSearch() {
  const [query, setQuery] = useQueryParam('search', '')
  const [filter, setFilter] = useQueryParam<SearchFilter>('filter', SEARCH_FILTER.ALL)

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const clear = useCallback(() => {
    setQuery('')
  }, [])

  const showAll = useCallback(() => {
    setFilter(SEARCH_FILTER.ALL)
  }, [])

  const showOpenSource = useCallback(() => {
    setFilter(SEARCH_FILTER.OPEN_SOURCE)
  }, [])

  const showStart = useCallback(() => {
    setFilter(SEARCH_FILTER.START)
  }, [])

  const showTeam = useCallback(() => {
    setFilter(SEARCH_FILTER.TEAM)
  }, [])

  const showAddon = useCallback(() => {
    setFilter(SEARCH_FILTER.ADDON)
  }, [])

  return {
    query,
    handleInput,
    clear,
    filter,
    showAll,
    showOpenSource,
    showStart,
    showTeam,
    showAddon,
  }
}

function useFilteredExtensions(
  query: string,
  extensions?: ExtensionMetaWithUrl[],
  filter?: SearchFilter,
) {
  if (!extensions) return []

  return extensions.filter((ext) => {
    // 选择“全部”时，不按扩展类型（开源、Start、Team）筛选
    if (filter === SEARCH_FILTER.ALL) {
      // 仅按搜索词筛选
      return (
        ext.name.toLowerCase().includes(query.toLowerCase()) ||
        ext.description.toLowerCase().includes(query.toLowerCase())
      )
    }

    // 选择“Team”时，同时显示 Team 和 Start 套餐的扩展
    if (filter === SEARCH_FILTER.TEAM) {
      // 检查它是否为 Team 扩展，或带有 Start 标签
      return (
        (ext.tags?.includes('Team') || ext.tags?.includes('Start')) &&
        (ext.name.toLowerCase().includes(query.toLowerCase()) ||
          ext.description.toLowerCase().includes(query.toLowerCase()))
      )
    }

    // 选择“Add-on”时，仅显示 Add-on 扩展
    if (filter === SEARCH_FILTER.ADDON) {
      return (
        ext.tags?.includes('Addon') &&
        (ext.name.toLowerCase().includes(query.toLowerCase()) ||
          ext.description.toLowerCase().includes(query.toLowerCase()))
      )
    }

    // 其他筛选逻辑保持不变
    if (
      filter === SEARCH_FILTER.OPEN_SOURCE &&
      (ext.tags?.includes('Start') || ext.tags?.includes('Team') || ext.tags?.includes('Addon'))
    )
      return false
    if (filter === SEARCH_FILTER.START && !ext.tags?.includes('Start')) return false

    return (
      ext.name.toLowerCase().includes(query.toLowerCase()) ||
      ext.description.toLowerCase().includes(query.toLowerCase())
    )
  })
}

function ExtensionCard({ ext }: { ext: ExtensionMetaWithUrl; currentFilter?: SearchFilter }) {
  return (
    <Card isClickable asChild>
      <Link href={ext.url} key={ext.path}>
        <div className="flex items-center justify-between gap-2 mb-5">
          <IconByName name={ext.icon} className="w-3.5 h-3.5" />
          <div className="ml-auto flex items-center gap-1">
            {ext.isNew ? <Tag variant="info">新品</Tag> : null}
          </div>
        </div>
        <div className="font-semibold text-black leading-[140%]">{ext.name}</div>
        <div className="mt-2 leading-[140%] text-grayAlpha-600">{ext.description}</div>
        <div className="mt-5 flex items-center flex-wrap gap-1">
          {/* 无论筛选条件如何，始终显示所有标签 */}
          {ext.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </Link>
    </Card>
  )
}

function ExtensionGroup({
  extensions,
  title,
  currentFilter,
}: {
  extensions: ExtensionMetaWithUrl[]
  title: string
  currentFilter?: SearchFilter
}) {
  return (
    <div>
      <div className="text-xl font-bold mb-6 leading-[120%]">{title}</div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 xl:gap-5">
        {extensions.map((ext) => (
          <ExtensionCard ext={ext} key={ext.path} currentFilter={currentFilter} />
        ))}
      </div>
    </div>
  )
}

function FilterButton({
  onClick,
  children,
  isActive,
}: {
  onClick: () => void
  children: React.ReactNode
  isActive?: boolean
}) {
  return (
    <Button variant="tertiary" isActive={isActive} onClick={onClick}>
      {children}
    </Button>
  )
}

function useAllExtensions(
  nodeExtensions: ExtensionMetaWithUrl[] | undefined,
  markExtensions: ExtensionMetaWithUrl[] | undefined,
  functionalityExtensions: ExtensionMetaWithUrl[] | undefined,
) {
  return [...(nodeExtensions || []), ...(markExtensions || []), ...(functionalityExtensions || [])]
}

export type ExtensionGridProps = {
  nodeExtensions?: ExtensionMetaWithUrl[]
  markExtensions?: ExtensionMetaWithUrl[]
  functionalityExtensions?: ExtensionMetaWithUrl[]
  hideAll?: boolean
  hideFree?: boolean
}

export const ExtensionGrid = ({
  functionalityExtensions,
  markExtensions,
  nodeExtensions,
  hideAll,
}: ExtensionGridProps) => {
  const {
    clear,
    handleInput,
    query,
    filter,
    showAll,
    showOpenSource,
    showStart,
    showTeam,
    showAddon,
  } = useSearch()
  const allExtensions = useAllExtensions(nodeExtensions, markExtensions, functionalityExtensions)
  const filteredNodeExtensions = useFilteredExtensions(query, nodeExtensions, filter)
  const filteredMarkExtensions = useFilteredExtensions(query, markExtensions, filter)
  const filteredFunctionalityExtensions = useFilteredExtensions(
    query,
    functionalityExtensions,
    filter,
  )

  const hasOpenSourceExtensions = useMemo(
    () => allExtensions.some((ext) => !ext.tags?.includes('Start') && !ext.tags?.includes('Team')),
    [allExtensions],
  )
  const hasStartExtensions = useMemo(
    () => allExtensions.some((ext) => ext.tags?.includes('Start')),
    [allExtensions],
  )
  const hasTeamExtensions = useMemo(
    () => allExtensions.some((ext) => ext.tags?.includes('Team')),
    [allExtensions],
  )
  const hasAddonExtensions = useMemo(
    () => allExtensions.some((ext) => ext.tags?.includes('Addon')),
    [allExtensions],
  )

  const noExtensions =
    (!nodeExtensions && !markExtensions && !functionalityExtensions) ||
    (filteredNodeExtensions.length === 0 &&
      filteredMarkExtensions.length === 0 &&
      filteredFunctionalityExtensions.length === 0)

  return (
    <div className="grid gap-8">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-8">
        <label className="flex flex-1 items-center p-2 gap-2 justify-center bg-white max-w-[36rem] rounded-lg border border-neutral-300 focus-within:border-neutral-700">
          <SearchIcon className="w-4 h-4 text-neutral-500" />
          <input
            type="text"
            className="w-full outline-none"
            placeholder="筛选扩展…"
            value={query}
            onChange={handleInput}
          />
          {query ? (
            <button className="p-1 hover:bg-neutral-100" onClick={clear}>
              <CloseIcon />
            </button>
          ) : null}
        </label>
        <div className="flex flex-none items-center gap-1 sm:ml-auto">
          {!hideAll ? (
            <FilterButton isActive={filter === SEARCH_FILTER.ALL} onClick={showAll}>
              全部
            </FilterButton>
          ) : null}
          {hasOpenSourceExtensions ? (
            <FilterButton isActive={filter === SEARCH_FILTER.OPEN_SOURCE} onClick={showOpenSource}>
              开源
            </FilterButton>
          ) : null}
          {hasStartExtensions ? (
            <FilterButton isActive={filter === SEARCH_FILTER.START} onClick={showStart}>
              Start 套餐
            </FilterButton>
          ) : null}
          {hasTeamExtensions ? (
            <FilterButton isActive={filter === SEARCH_FILTER.TEAM} onClick={showTeam}>
              Team 套餐
            </FilterButton>
          ) : null}
          {hasAddonExtensions ? (
            <FilterButton isActive={filter === SEARCH_FILTER.ADDON} onClick={showAddon}>
              附加组件
            </FilterButton>
          ) : null}
        </div>
      </div>
      <div className="grid gap-20 first:mt-0 last:mb-0">
        {noExtensions ? (
          <div className="text-neutral-700">
            没有找到符合以下条件的扩展：{' '}
            {query ? <span className="font-semibold">&quot;{query}&quot;</span> : '当前筛选条件。'}
          </div>
        ) : null}
        {nodeExtensions && filteredNodeExtensions.length > 0 ? (
          <ExtensionGroup
            extensions={filteredNodeExtensions}
            title="节点"
            currentFilter={filter}
          />
        ) : null}
        {markExtensions && filteredMarkExtensions.length > 0 ? (
          <ExtensionGroup
            extensions={filteredMarkExtensions}
            title="标记"
            currentFilter={filter}
          />
        ) : null}
        {functionalityExtensions && filteredFunctionalityExtensions.length > 0 ? (
          <ExtensionGroup
            extensions={filteredFunctionalityExtensions}
            title="功能"
            currentFilter={filter}
          />
        ) : null}
      </div>
    </div>
  )
}
