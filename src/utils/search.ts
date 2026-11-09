import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter'

// 默认权重：hierarchy.lvl0 权重最高，子标题的权重依次降低
// 可通过 NEXT_PUBLIC_SEARCH_WEIGHTS 环境变量覆盖（逗号分隔，例如 "20,10,6,4,3,2,1,1"）
const DEFAULT_WEIGHTS = '30,12,6,3,2,1,1,1'

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: {
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_DOCSEARCH_HOST || '',
        port: process.env.NEXT_PUBLIC_DOCSEARCH_PORT
          ? parseInt(process.env.NEXT_PUBLIC_DOCSEARCH_PORT)
          : 443,
        protocol: process.env.NEXT_PUBLIC_DOCSEARCH_PROTOCOL || 'https',
      },
    ],
    apiKey: process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY || '',
    cacheSearchResultsForSeconds: 2 * 60,
  },
  additionalSearchParameters: {
    group_by: process.env.NEXT_PUBLIC_SEARCH_GROUP_BY || 'url_without_anchor',
    group_limit: 1,
    query_by:
      'hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content',
    query_by_weights: process.env.NEXT_PUBLIC_SEARCH_WEIGHTS || DEFAULT_WEIGHTS,
    prioritize_exact_match: true,
    // 放宽词元匹配条件，以支持部分单词匹配
    drop_tokens_threshold: 0,
    // 优先匹配前缀（例如，“install”可匹配“installation”）
    prefix: 'true,true,true,true,true,true,true,false',
    num_typos: 1,
    min_len_1typo: 5,
    min_len_2typo: 9,
  },
})
