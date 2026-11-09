import { Button } from './Button'
import Link from '@/components/Link'
import { getRepoBase } from '@/utils'

export const PageEditStatus = ({ contentPath }: { contentPath?: string }) => {
  if (!contentPath) {
    return null
  }

  return (
    <>
      <Button asChild variant="secondary">
        <Link
          href={`https://github.com/${getRepoBase()}/content/${contentPath}`}
          target="_blank"
          rel="nofollow noreferrer"
        >
          在 GitHub 上编辑此页面
        </Link>
      </Button>
    </>
  )
}
