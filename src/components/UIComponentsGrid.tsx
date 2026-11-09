import React from 'react'
import { Card } from './ui/Card'
import { Tag } from './ui/Tag'
import { UIComponentMetaWithUrl } from '@/types'
import Link from '@/components/Link'
import { IconByName } from '@/utils/iconKit'

interface UIComponentsGridProps {
  components: UIComponentMetaWithUrl[]
  utilsComponents: UIComponentMetaWithUrl[]
  nodeComponents: UIComponentMetaWithUrl[]
  primitives: UIComponentMetaWithUrl[]
}

function UIComponentCard({ comp }: { comp: UIComponentMetaWithUrl }) {
  return (
    <Card isClickable asChild>
      <Link href={comp.url} key={comp.path}>
        <div className="flex items-center justify-between gap-2 mb-5">
          <IconByName name={comp.icon} className="w-3.5 h-3.5" />
          <div className="ml-auto flex items-center gap-1">
            {comp.isNew ? <Tag variant="info">新</Tag> : null}
          </div>
        </div>
        <div className="font-semibold text-black leading-[140%]">{comp.name}</div>
        <div className="mt-2 leading-[140%] text-grayAlpha-600">{comp.description}</div>
        <div className="mt-5 flex items-center flex-wrap gap-1">
          {comp.isOpen ? <Tag>开源</Tag> : null}
        </div>
      </Link>
    </Card>
  )
}

function UIComponentGroup({ comps, title }: { comps: UIComponentMetaWithUrl[]; title: string }) {
  if (comps.length === 0) return null

  return (
    <div>
      <div className="text-xl font-bold mb-6 leading-[120%]">{title}</div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 xl:gap-5">
        {comps.map((comp) => (
          <UIComponentCard comp={comp} key={comp.path} />
        ))}
      </div>
    </div>
  )
}

export function UIComponentsGrid({
  components,
  utilsComponents,
  nodeComponents,
  primitives,
}: UIComponentsGridProps) {
  return (
    <div className="grid gap-20 first:mt-0 last:mb-0">
      <UIComponentGroup comps={components} title="组件" />
      <UIComponentGroup comps={utilsComponents} title="工具组件" />
      <UIComponentGroup comps={nodeComponents} title="节点组件" />
      <UIComponentGroup comps={primitives} title="基础组件" />
    </div>
  )
}
