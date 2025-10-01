import { defineConfig, defineCollection, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const computedFields = <T extends { slug: string; locale: string }>(data: T) => ({
  ...data,
  // 移除 'articles' 和 locale 前缀
  // 例如: "articles/zh/example" -> "example"
  slugAsParams: data.slug.split('/').slice(2).join('/'),
})

const articles = defineCollection({
  name: 'Article',
  pattern: 'articles/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      author: s.string().default('Your Name'),
      category: s.string().default('技术'),
      tags: s.array(s.string()).default([]),
      readTime: s.string().optional(),
      icon: s.string().optional(),
      coverImage: s.string().optional(),
      body: s.markdown(),
      locale: s.enum(['zh', 'en']).default('zh'),
    })
    .transform(computedFields),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { articles },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: 'github-dark' }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
}) 