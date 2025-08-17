import { ArticleLayout } from '@/components/ArticleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'

export async function ArticleLayoutWithSidebar({
  article,
  children,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
}) {
  const allArticles = await getAllArticles()
  
  return (
    <ArticleLayout article={article} allArticles={allArticles}>
      {children}
    </ArticleLayout>
  )
}