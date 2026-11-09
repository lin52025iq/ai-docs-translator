'use client'

import { useCallback, useMemo } from 'react'
import { Tag } from './ui/Tag'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { TagProps } from './ui/Tag'
import Link from '@/components/Link'
import { IncidentData, INCIDENT_SEVERITY_COLORS } from '@/types'
import { useQueryParam } from '@/hooks/useQueryParams'

// 常量
const INCIDENT_FILTER = {
  ALL: 'all',
  UI_COMPONENT: 'ui-component',
} as const

const SEVERITY_TOOLTIPS = {
  low: '低严重性：影响极小的轻微安全问题',
  medium: '中等严重性：影响有限的中度安全风险',
  high: '高严重性：可能导致数据泄露或系统受损的重大安全漏洞',
  critical: '严重：需要紧急处理的即时安全威胁',
} as const

// 类型
type IncidentFilter = (typeof INCIDENT_FILTER)[keyof typeof INCIDENT_FILTER]

interface IncidentGridProps {
  incidents: IncidentData[]
}

interface FilterButtonProps {
  onClick: () => void
  children: React.ReactNode
  isActive?: boolean
}

// 工具函数
function normalizeProductForFilter(product: string): string {
  return product.toLowerCase().replace(/\s+/g, '-')
}

function getSeverityTooltip(severity: string): string {
  const normalizedSeverity = severity.toLowerCase() as keyof typeof SEVERITY_TOOLTIPS
  return SEVERITY_TOOLTIPS[normalizedSeverity] || `${severity} 严重性事件`
}

function getProductVariant(product: string): 'gray' | 'info' {
  return product === 'UI Component' ? 'gray' : 'info'
}

function getSeverityVariant(severity: string): TagProps['variant'] {
  const severityColor = INCIDENT_SEVERITY_COLORS[severity as keyof typeof INCIDENT_SEVERITY_COLORS]

  // 将严重性颜色映射为有效的 Tag 变体
  switch (severityColor) {
    case 'neutral':
    case 'hint':
    case 'warning':
      return severityColor
    case 'danger':
      return 'warning' // 将 'danger' 映射为 'warning'，因为 Tag 不支持 'danger'
    default:
      return 'neutral'
  }
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// 组件
function FilterButton({ onClick, children, isActive }: FilterButtonProps) {
  return (
    <Button variant="tertiary" isActive={isActive} onClick={onClick}>
      {children}
    </Button>
  )
}

function IncidentCard({ incident }: { incident: IncidentData }) {
  const productVariant = getProductVariant(incident.incident.product)
  const severityTooltip = getSeverityTooltip(incident.incident.severity)

  return (
    <Card className="w-full" isClickable asChild>
      <Link href={incident.url}>
        {/* 标题和严重性 */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-black leading-[140%]">{incident.title}</h3>
          </div>
          <div className="flex-shrink-0">
            <Tag
              variant={getSeverityVariant(incident.incident.severity)}
              className="text-xs font-medium"
              tooltip={severityTooltip}
            >
              {incident.incident.severity.toUpperCase()}
            </Tag>
          </div>
        </div>

        {/* 描述 */}
        <div className="leading-[140%] text-grayAlpha-600">{incident.meta.description}</div>

        {/* 元信息行 */}
        <div className="mt-3 flex items-center flex-wrap gap-1 text-sm text-grayAlpha-600">
          <span>
            {capitalizeFirstLetter(incident.incident.status)} {incident.incident.date}
          </span>
          <span className="mx-1">•</span>
          <Tag variant={productVariant}>{incident.incident.product}</Tag>
        </div>
      </Link>
    </Card>
  )
}

// Hooks
function useIncidentSearch() {
  const [filter, setFilter] = useQueryParam<IncidentFilter>('filter', INCIDENT_FILTER.ALL)

  const showAll = useCallback(() => {
    setFilter(INCIDENT_FILTER.ALL)
  }, [setFilter])

  const showUIComponent = useCallback(() => {
    setFilter(INCIDENT_FILTER.UI_COMPONENT)
  }, [setFilter])

  return {
    filter,
    showAll,
    showUIComponent,
  }
}

function useFilteredIncidents(incidents: IncidentData[], filter: IncidentFilter) {
  return useMemo(() => {
    return incidents.filter((incident) => {
      if (filter === INCIDENT_FILTER.ALL) {
        return true
      }

      return normalizeProductForFilter(incident.incident.product) === filter
    })
  }, [incidents, filter])
}

function useAvailableProducts(incidents: IncidentData[]) {
  return useMemo(() => {
    const products = new Set(incidents.map((incident) => incident.incident.product))
    return Array.from(products)
  }, [incidents])
}

// 主组件
export const IncidentGrid = ({ incidents }: IncidentGridProps) => {
  const { filter, showAll, showUIComponent } = useIncidentSearch()
  const filteredIncidents = useFilteredIncidents(incidents, filter)
  const availableProducts = useAvailableProducts(incidents)

  const noIncidents = incidents.length === 0 || filteredIncidents.length === 0
  const hasUIComponents = availableProducts.includes('UI Component')

  return (
    <div className="grid gap-8">
      {/* 筛选控件 */}
      <div className="flex flex-none items-center gap-1 justify-end">
        <FilterButton isActive={filter === INCIDENT_FILTER.ALL} onClick={showAll}>
          全部
        </FilterButton>
        {hasUIComponents && (
          <FilterButton
            isActive={filter === INCIDENT_FILTER.UI_COMPONENT}
            onClick={showUIComponent}
          >
            UI Component
          </FilterButton>
        )}
      </div>

      {/* 事件列表 */}
      <div className="grid gap-6">
        {noIncidents ? (
          <div className="text-theme-secondary">没有找到符合筛选条件的事件。</div>
        ) : (
          filteredIncidents.map((incident) => (
            <IncidentCard key={incident.path} incident={incident} />
          ))
        )}
      </div>
    </div>
  )
}
