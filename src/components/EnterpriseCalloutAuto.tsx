'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { EnterpriseCallout } from './EnterpriseCallout'

export type EnterpriseCalloutAutoProps = {
  variant:
    | 'migration'
    | 'ai-agent'
    | 'ai-toolkit'
    | 'server-ai-toolkit'
    | 'docx'
    | 'pdf'
    | 'odt'
    | 'epub'
    | 'doc'
    | 'markdown'
    | 'tracked-changes'
    | 'compare'
    | 'deprecated'
  renderMode?: 'inline' | 'sidebar'
  disableWaitlist?: boolean
  inverted?: boolean
}

export const EnterpriseCalloutAuto = ({
  variant,
  renderMode = 'sidebar',
  disableWaitlist = false,
  inverted = false,
}: EnterpriseCalloutAutoProps) => {
  const [sidebarElement, setSidebarElement] = useState<Element | null>(null)

  useEffect(() => {
    if (renderMode === 'sidebar') {
      // 查找 requirements-slot 的父元素，以定位次级侧边栏
      const requirementsSlot = document.getElementById('requirements-slot')
      if (requirementsSlot && requirementsSlot.parentElement) {
        const sidebar = requirementsSlot.parentElement
        // 查找或创建位于 requirements-slot 后面的提示框容器
        let container = sidebar.querySelector('#enterprise-callout-slot')
        if (!container) {
          container = document.createElement('div')
          container.id = 'enterprise-callout-slot'
          container.className = 'mt-8'
          // 插入到 requirements-slot 后面
          requirementsSlot.insertAdjacentElement('afterend', container)
        }
        // 该容器仅在浏览器中存在，因此只能在组件挂载后获取
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSidebarElement(container)
      }
    }
  }, [renderMode])

  // 行内渲染
  if (renderMode === 'inline') {
    return (
      <EnterpriseCallout
        variant={variant}
        inline
        disableWaitlist={disableWaitlist}
        inverted={inverted}
        className="mt-12"
      />
    )
  }

  // 通过 portal 在侧边栏中渲染
  if (sidebarElement && renderMode === 'sidebar') {
    return createPortal(
      <EnterpriseCallout variant={variant} disableWaitlist={disableWaitlist} inverted={inverted} />,
      sidebarElement,
    )
  }

  return null
}
