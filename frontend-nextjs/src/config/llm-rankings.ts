/**
 * 大语言模型排行榜配置文件
 * 数据来源：Chatbot Arena, HumanEval, MMLU 等基准测试
 * 更新日期：2024年10月
 */

export interface LLMRanking {
  id: string
  modelName: string
  provider: string
  scores: {
    overall: number      // 综合评分 (Elo rating 1000-1400)
    coding: number       // 编程能力 (0-100)
    math: number         // 数学推理 (0-100)
    reasoning: number    // 推理能力 (0-100)
    mmlu: number        // 多任务理解 (0-100)
  }
  contextLength: number  // 上下文长度 (K tokens)
  pricing: {
    input: number       // 输入价格 ($/1M tokens)
    output: number      // 输出价格 ($/1M tokens)
  }
  isOpenSource: boolean
  releaseDate: string
  highlights: HighlightBadge[]
}

export type HighlightBadge = 
  | 'best-overall'      // 🏆 综合榜首
  | 'best-coding'       // 💻 编程之王
  | 'best-math'         // 🧮 数学冠军
  | 'best-reasoning'    // 🧠 推理大师
  | 'best-value'        // 💰 性价比之王
  | 'open-source'       // 🔓 开源
  | 'long-context'      // 📚 超长上下文
  | 'multilingual'      // 🌏 多语言

export type SortBy = 'overall' | 'coding' | 'math' | 'reasoning' | 'value'

/**
 * LLM 排行榜数据
 * 数据基于最新的公开基准测试结果
 */
export const llmRankings: LLMRanking[] = [
  {
    id: 'claude-35-sonnet',
    modelName: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    scores: {
      overall: 1324,  // Chatbot Arena Elo
      coding: 96,     // 编程能力极强
      math: 90,
      reasoning: 94,
      mmlu: 88.7
    },
    contextLength: 200,
    pricing: {
      input: 3.0,
      output: 15.0
    },
    isOpenSource: false,
    releaseDate: '2024-06-20',
    highlights: ['best-overall', 'best-coding']
  },
  {
    id: 'gpt-4-turbo',
    modelName: 'GPT-4 Turbo',
    provider: 'OpenAI',
    scores: {
      overall: 1287,
      coding: 92,
      math: 88,
      reasoning: 91,
      mmlu: 86.4
    },
    contextLength: 128,
    pricing: {
      input: 10.0,
      output: 30.0
    },
    isOpenSource: false,
    releaseDate: '2024-04-09',
    highlights: ['best-coding']
  },
  {
    id: 'gemini-15-pro',
    modelName: 'Gemini 1.5 Pro',
    provider: 'Google',
    scores: {
      overall: 1268,
      coding: 88,
      math: 86,
      reasoning: 89,
      mmlu: 85.9
    },
    contextLength: 1000,  // 1M tokens
    pricing: {
      input: 3.5,
      output: 10.5
    },
    isOpenSource: false,
    releaseDate: '2024-02-15',
    highlights: ['long-context']
  },
  {
    id: 'claude-3-opus',
    modelName: 'Claude 3 Opus',
    provider: 'Anthropic',
    scores: {
      overall: 1253,
      coding: 90,
      math: 89,
      reasoning: 93,
      mmlu: 86.8
    },
    contextLength: 200,
    pricing: {
      input: 15.0,
      output: 75.0
    },
    isOpenSource: false,
    releaseDate: '2024-03-04',
    highlights: ['best-reasoning']
  },
  {
    id: 'gpt-4o',
    modelName: 'GPT-4o',
    provider: 'OpenAI',
    scores: {
      overall: 1246,
      coding: 90,
      math: 87,
      reasoning: 88,
      mmlu: 87.2
    },
    contextLength: 128,
    pricing: {
      input: 5.0,
      output: 15.0
    },
    isOpenSource: false,
    releaseDate: '2024-05-13',
    highlights: ['multilingual']
  },
  {
    id: 'llama-31-405b',
    modelName: 'Llama 3.1 405B',
    provider: 'Meta',
    scores: {
      overall: 1224,
      coding: 87,
      math: 85,
      reasoning: 86,
      mmlu: 85.2
    },
    contextLength: 128,
    pricing: {
      input: 0.0,  // 开源，可自部署
      output: 0.0
    },
    isOpenSource: true,
    releaseDate: '2024-07-23',
    highlights: ['open-source']
  },
  {
    id: 'deepseek-v25',
    modelName: 'DeepSeek V2.5',
    provider: 'DeepSeek',
    scores: {
      overall: 1195,
      coding: 89,  // 编程能力出色
      math: 84,
      reasoning: 83,
      mmlu: 81.7
    },
    contextLength: 128,
    pricing: {
      input: 0.14,   // 极低价格
      output: 0.28
    },
    isOpenSource: false,
    releaseDate: '2024-09-05',
    highlights: ['best-value', 'best-coding']
  },
  {
    id: 'qwen-25-72b',
    modelName: 'Qwen 2.5 72B',
    provider: 'Alibaba Cloud',
    scores: {
      overall: 1188,
      coding: 86,
      math: 83,
      reasoning: 82,
      mmlu: 84.2
    },
    contextLength: 128,
    pricing: {
      input: 0.35,
      output: 1.15
    },
    isOpenSource: true,
    releaseDate: '2024-09-19',
    highlights: ['open-source', 'multilingual', 'best-value']
  },
  {
    id: 'mistral-large-2',
    modelName: 'Mistral Large 2',
    provider: 'Mistral AI',
    scores: {
      overall: 1176,
      coding: 85,
      math: 82,
      reasoning: 84,
      mmlu: 84.0
    },
    contextLength: 128,
    pricing: {
      input: 3.0,
      output: 9.0
    },
    isOpenSource: false,
    releaseDate: '2024-07-24',
    highlights: ['multilingual']
  },
  {
    id: 'command-r-plus',
    modelName: 'Command R+',
    provider: 'Cohere',
    scores: {
      overall: 1158,
      coding: 81,
      math: 79,
      reasoning: 80,
      mmlu: 81.5
    },
    contextLength: 128,
    pricing: {
      input: 3.0,
      output: 15.0
    },
    isOpenSource: false,
    releaseDate: '2024-04-04',
    highlights: ['multilingual']
  },
  {
    id: 'llama-31-70b',
    modelName: 'Llama 3.1 70B',
    provider: 'Meta',
    scores: {
      overall: 1145,
      coding: 80,
      math: 78,
      reasoning: 79,
      mmlu: 79.3
    },
    contextLength: 128,
    pricing: {
      input: 0.0,
      output: 0.0
    },
    isOpenSource: true,
    releaseDate: '2024-07-23',
    highlights: ['open-source', 'best-value']
  },
  {
    id: 'gemini-15-flash',
    modelName: 'Gemini 1.5 Flash',
    provider: 'Google',
    scores: {
      overall: 1131,
      coding: 78,
      math: 76,
      reasoning: 77,
      mmlu: 78.9
    },
    contextLength: 1000,
    pricing: {
      input: 0.075,
      output: 0.30
    },
    isOpenSource: false,
    releaseDate: '2024-05-14',
    highlights: ['best-value', 'long-context']
  }
]

/**
 * 根据不同维度排序
 */
export function sortRankings(rankings: LLMRanking[], sortBy: SortBy): LLMRanking[] {
  const sorted = [...rankings]
  
  switch (sortBy) {
    case 'overall':
      return sorted.sort((a, b) => b.scores.overall - a.scores.overall)
    case 'coding':
      return sorted.sort((a, b) => b.scores.coding - a.scores.coding)
    case 'math':
      return sorted.sort((a, b) => b.scores.math - a.scores.math)
    case 'reasoning':
      return sorted.sort((a, b) => b.scores.reasoning - a.scores.reasoning)
    case 'value':
      // 性价比 = 性能 / 价格 (考虑开源模型为最高性价比)
      return sorted.sort((a, b) => {
        const aValue = a.isOpenSource ? 9999 : a.scores.overall / ((a.pricing.input + a.pricing.output) / 2)
        const bValue = b.isOpenSource ? 9999 : b.scores.overall / ((b.pricing.input + b.pricing.output) / 2)
        return bValue - aValue
      })
    default:
      return sorted
  }
}

/**
 * 获取徽章的显示信息
 */
export function getBadgeInfo(badge: HighlightBadge): { label: { en: string; zh: string }; variant: string } {
  const badgeMap: Record<HighlightBadge, { label: { en: string; zh: string }; variant: string }> = {
    'best-overall': { label: { en: '🏆 Best Overall', zh: '🏆 综合榜首' }, variant: 'default' },
    'best-coding': { label: { en: '💻 Best Coding', zh: '💻 编程之王' }, variant: 'default' },
    'best-math': { label: { en: '🧮 Best Math', zh: '🧮 数学冠军' }, variant: 'default' },
    'best-reasoning': { label: { en: '🧠 Best Reasoning', zh: '🧠 推理大师' }, variant: 'default' },
    'best-value': { label: { en: '💰 Best Value', zh: '💰 性价比之王' }, variant: 'secondary' },
    'open-source': { label: { en: '🔓 Open Source', zh: '🔓 开源' }, variant: 'outline' },
    'long-context': { label: { en: '📚 Long Context', zh: '📚 超长上下文' }, variant: 'secondary' },
    'multilingual': { label: { en: '🌏 Multilingual', zh: '🌏 多语言' }, variant: 'secondary' }
  }
  
  return badgeMap[badge]
}

