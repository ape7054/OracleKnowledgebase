/**
 * AI 项目研究配置文件
 * 用于管理追踪的AI项目信息
 */

export interface AIProject {
  id: string
  name: string
  logo: string // 项目 ID 用于图标映射
  category: ProjectCategory
  description: {
    en: string
    zh: string
  }
  links: {
    website?: string
    twitter?: string
    docs?: string
  }
  color?: string // 项目主题色渐变
}

export type ProjectCategory = 'dev-tools' | 'image-gen' | 'llm' | 'infrastructure' | 'research'

export const projectCategories: ProjectCategory[] = [
  'dev-tools',
  'image-gen',
  'llm',
  'infrastructure',
  'research'
]

/**
 * AI 项目列表
 */
export const aiProjects: AIProject[] = [
  // 开发工具类
  {
    id: 'openai',
    name: 'OpenAI',
    logo: 'openai',
    category: 'dev-tools',
    color: 'from-[#10A37F] to-[#6FD3B8]',
    description: {
      en: 'Leading AI research company behind GPT-4, ChatGPT, and DALL-E. Pioneering artificial general intelligence development.',
      zh: 'GPT-4、ChatGPT 和 DALL-E 背后的领先 AI 研究公司，致力于通用人工智能开发。'
    },
    links: {
      website: 'https://openai.com',
      twitter: 'https://twitter.com/OpenAI',
      docs: 'https://platform.openai.com/docs'
    }
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    logo: 'anthropic',
    category: 'dev-tools',
    color: 'from-[#D4AA6F] to-[#E8C9A0]',
    description: {
      en: 'AI safety company behind Claude, focusing on building reliable, interpretable, and steerable AI systems.',
      zh: 'Claude 背后的 AI 安全公司，专注于构建可靠、可解释和可控的 AI 系统。'
    },
    links: {
      website: 'https://www.anthropic.com',
      twitter: 'https://twitter.com/AnthropicAI',
      docs: 'https://docs.anthropic.com'
    }
  },
  {
    id: 'cursor',
    name: 'Cursor',
    logo: 'cursor',
    category: 'dev-tools',
    color: 'from-[#000000] to-[#4B5563]',
    description: {
      en: 'AI-first code editor built for pair programming with AI. Write, edit, and debug code faster with GPT-4.',
      zh: 'AI 优先的代码编辑器，专为 AI 配对编程而构建。使用 GPT-4 更快地编写、编辑和调试代码。'
    },
    links: {
      website: 'https://cursor.sh',
      twitter: 'https://twitter.com/cursor_ai',
      docs: 'https://docs.cursor.sh'
    }
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    logo: 'github',
    category: 'dev-tools',
    color: 'from-[#6e5494] to-[#9b8cc4]',
    description: {
      en: 'AI pair programmer that helps you write code faster. Trained on billions of lines of code.',
      zh: 'AI 配对编程助手，帮助您更快地编写代码。在数十亿行代码上训练而成。'
    },
    links: {
      website: 'https://github.com/features/copilot',
      twitter: 'https://twitter.com/github',
      docs: 'https://docs.github.com/copilot'
    }
  },
  {
    id: 'v0',
    name: 'Vercel v0',
    logo: 'vercel',
    category: 'dev-tools',
    color: 'from-[#000000] to-[#333333]',
    description: {
      en: 'Generative UI tool by Vercel. Generate React components from text prompts using AI.',
      zh: 'Vercel 推出的生成式 UI 工具。使用 AI 从文本提示生成 React 组件。'
    },
    links: {
      website: 'https://v0.dev',
      twitter: 'https://twitter.com/vercel',
      docs: 'https://v0.dev/docs'
    }
  },
  {
    id: 'replit',
    name: 'Replit AI',
    logo: 'replit',
    category: 'dev-tools',
    color: 'from-[#F26207] to-[#FFAD7A]',
    description: {
      en: 'AI-powered collaborative coding platform. Build, deploy, and host apps directly from your browser.',
      zh: 'AI 驱动的协作编码平台。直接从浏览器构建、部署和托管应用程序。'
    },
    links: {
      website: 'https://replit.com',
      twitter: 'https://twitter.com/Replit',
      docs: 'https://docs.replit.com'
    }
  },

  // 图像生成类
  {
    id: 'midjourney',
    name: 'Midjourney',
    logo: 'midjourney',
    category: 'image-gen',
    color: 'from-[#000000] to-[#4B5563]',
    description: {
      en: 'Leading AI image generation tool. Create stunning visual art from text descriptions using advanced diffusion models.',
      zh: '领先的 AI 图像生成工具。使用先进的扩散模型从文本描述创建惊艳的视觉艺术。'
    },
    links: {
      website: 'https://www.midjourney.com',
      twitter: 'https://twitter.com/midjourney',
      docs: 'https://docs.midjourney.com'
    }
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    logo: 'stability',
    category: 'image-gen',
    color: 'from-[#5B21B6] to-[#9333EA]',
    description: {
      en: 'Open-source image generation model. Run it locally or use cloud services for free AI art creation.',
      zh: '开源图像生成模型。本地运行或使用云服务免费创建 AI 艺术作品。'
    },
    links: {
      website: 'https://stability.ai',
      twitter: 'https://twitter.com/StabilityAI',
      docs: 'https://platform.stability.ai/docs'
    }
  },
  {
    id: 'dalle',
    name: 'DALL-E 3',
    logo: 'openai',
    category: 'image-gen',
    color: 'from-[#10A37F] to-[#6FD3B8]',
    description: {
      en: 'OpenAI\'s image generation model. Create highly detailed images from text with improved prompt following.',
      zh: 'OpenAI 的图像生成模型。从文本创建高度详细的图像，具有改进的提示跟随能力。'
    },
    links: {
      website: 'https://openai.com/dall-e-3',
      twitter: 'https://twitter.com/OpenAI',
      docs: 'https://platform.openai.com/docs/guides/images'
    }
  },
  {
    id: 'leonardo',
    name: 'Leonardo AI',
    logo: 'leonardo',
    category: 'image-gen',
    color: 'from-[#8B5CF6] to-[#C084FC]',
    description: {
      en: 'AI art generator for game assets and creative projects. Fine-tuned models for consistent character design.',
      zh: '游戏资产和创意项目的 AI 艺术生成器。精调模型用于一致的角色设计。'
    },
    links: {
      website: 'https://leonardo.ai',
      twitter: 'https://twitter.com/LeonardoAi_',
      docs: 'https://docs.leonardo.ai'
    }
  },
  {
    id: 'runway',
    name: 'Runway',
    logo: 'runway',
    category: 'image-gen',
    color: 'from-[#00E5CC] to-[#00B3A3]',
    description: {
      en: 'AI video and image editing platform. Gen-2 for video generation, plus powerful editing tools.',
      zh: 'AI 视频和图像编辑平台。Gen-2 用于视频生成，以及强大的编辑工具。'
    },
    links: {
      website: 'https://runwayml.com',
      twitter: 'https://twitter.com/runwayml',
      docs: 'https://help.runwayml.com'
    }
  },

  // 大语言模型类
  {
    id: 'gpt4',
    name: 'GPT-4 Turbo',
    logo: 'openai',
    category: 'llm',
    color: 'from-[#10A37F] to-[#6FD3B8]',
    description: {
      en: 'OpenAI\'s most capable model. Excels at complex reasoning, coding, and multi-step tasks with 128K context.',
      zh: 'OpenAI 最强大的模型。擅长复杂推理、编码和多步骤任务，支持 128K 上下文。'
    },
    links: {
      website: 'https://openai.com/gpt-4',
      twitter: 'https://twitter.com/OpenAI',
      docs: 'https://platform.openai.com/docs/models/gpt-4'
    }
  },
  {
    id: 'claude-sonnet',
    name: 'Claude 3.5 Sonnet',
    logo: 'anthropic',
    category: 'llm',
    color: 'from-[#D4AA6F] to-[#E8C9A0]',
    description: {
      en: 'Anthropic\'s top-tier model. Industry-leading performance on coding, reasoning, and long-form writing.',
      zh: 'Anthropic 的顶级模型。在编码、推理和长文本写作方面具有行业领先的性能。'
    },
    links: {
      website: 'https://www.anthropic.com/claude',
      twitter: 'https://twitter.com/AnthropicAI',
      docs: 'https://docs.anthropic.com'
    }
  },
  {
    id: 'gemini',
    name: 'Gemini 1.5 Pro',
    logo: 'google',
    category: 'llm',
    color: 'from-[#4285F4] to-[#8AB4F8]',
    description: {
      en: 'Google\'s flagship model with 1M token context window. Exceptional at processing long documents and videos.',
      zh: 'Google 的旗舰模型，支持 100 万 token 上下文窗口。在处理长文档和视频方面表现出色。'
    },
    links: {
      website: 'https://deepmind.google/technologies/gemini',
      twitter: 'https://twitter.com/Google',
      docs: 'https://ai.google.dev/docs'
    }
  },
  {
    id: 'llama',
    name: 'Llama 3.1 405B',
    logo: 'meta',
    category: 'llm',
    color: 'from-[#0668E1] to-[#4A9EFF]',
    description: {
      en: 'Meta\'s open-source frontier model. Largest open model with performance rivaling closed-source alternatives.',
      zh: 'Meta 的开源前沿模型。最大的开源模型，性能可与闭源替代方案媲美。'
    },
    links: {
      website: 'https://llama.meta.com',
      twitter: 'https://twitter.com/Meta',
      docs: 'https://llama.meta.com/docs'
    }
  },
  {
    id: 'deepseek',
    name: 'DeepSeek V2.5',
    logo: 'deepseek',
    category: 'llm',
    color: 'from-[#1E40AF] to-[#3B82F6]',
    description: {
      en: 'Chinese AI model with exceptional cost-performance ratio. Strong coding and reasoning abilities at low price.',
      zh: '中国 AI 模型，性价比极高。强大的编码和推理能力，价格低廉。'
    },
    links: {
      website: 'https://www.deepseek.com',
      twitter: 'https://twitter.com/deepseek_ai',
      docs: 'https://platform.deepseek.com/docs'
    }
  },
  {
    id: 'qwen',
    name: 'Qwen 2.5',
    logo: 'alibaba',
    category: 'llm',
    color: 'from-[#FF6A00] to-[#FFA940]',
    description: {
      en: 'Alibaba Cloud\'s multilingual model. Excellent Chinese language understanding and bilingual capabilities.',
      zh: '阿里云的多语言模型。卓越的中文理解能力和双语能力。'
    },
    links: {
      website: 'https://qwenlm.github.io',
      twitter: 'https://twitter.com/Alibaba_Cloud',
      docs: 'https://qwen.readthedocs.io'
    }
  },

  // AI 基础设施类
  {
    id: 'huggingface',
    name: 'Hugging Face',
    logo: 'huggingface',
    category: 'infrastructure',
    color: 'from-[#FFD21E] to-[#FFE666]',
    description: {
      en: 'The AI community hub. 500K+ models, datasets, and apps. Deploy ML models with ease.',
      zh: 'AI 社区中心。50 万+ 模型、数据集和应用。轻松部署 ML 模型。'
    },
    links: {
      website: 'https://huggingface.co',
      twitter: 'https://twitter.com/huggingface',
      docs: 'https://huggingface.co/docs'
    }
  },
  {
    id: 'pinecone',
    name: 'Pinecone',
    logo: 'pinecone',
    category: 'infrastructure',
    color: 'from-[#000000] to-[#4B5563]',
    description: {
      en: 'Vector database for AI applications. Power semantic search, RAG, and recommendation systems.',
      zh: 'AI 应用的向量数据库。支持语义搜索、RAG 和推荐系统。'
    },
    links: {
      website: 'https://www.pinecone.io',
      twitter: 'https://twitter.com/pinecone',
      docs: 'https://docs.pinecone.io'
    }
  },
  {
    id: 'langchain',
    name: 'LangChain',
    logo: 'langchain',
    category: 'infrastructure',
    color: 'from-[#1C3C3C] to-[#2D5A5A]',
    description: {
      en: 'Framework for building LLM applications. Chain prompts, agents, and memory for complex AI workflows.',
      zh: '构建 LLM 应用的框架。链接提示、代理和内存以实现复杂的 AI 工作流。'
    },
    links: {
      website: 'https://www.langchain.com',
      twitter: 'https://twitter.com/LangChainAI',
      docs: 'https://docs.langchain.com'
    }
  },
  {
    id: 'replicate',
    name: 'Replicate',
    logo: 'replicate',
    category: 'infrastructure',
    color: 'from-[#000000] to-[#333333]',
    description: {
      en: 'Run AI models in the cloud. Deploy open-source models with a simple API, no infrastructure needed.',
      zh: '在云端运行 AI 模型。使用简单的 API 部署开源模型，无需基础设施。'
    },
    links: {
      website: 'https://replicate.com',
      twitter: 'https://twitter.com/replicate',
      docs: 'https://replicate.com/docs'
    }
  },

  // 前沿研究类
  {
    id: 'openai-research',
    name: 'OpenAI Research',
    logo: 'openai',
    category: 'research',
    color: 'from-[#10A37F] to-[#6FD3B8]',
    description: {
      en: 'Cutting-edge AI research from OpenAI. Latest papers on GPT models, reinforcement learning, and AGI.',
      zh: 'OpenAI 的前沿 AI 研究。关于 GPT 模型、强化学习和通用人工智能的最新论文。'
    },
    links: {
      website: 'https://openai.com/research',
      twitter: 'https://twitter.com/OpenAI',
      docs: 'https://openai.com/research'
    }
  },
  {
    id: 'deepmind',
    name: 'DeepMind',
    logo: 'google',
    category: 'research',
    color: 'from-[#4285F4] to-[#8AB4F8]',
    description: {
      en: 'Google\'s AI research lab. Pioneering work in AlphaGo, protein folding, and fundamental AI research.',
      zh: 'Google 的 AI 研究实验室。在 AlphaGo、蛋白质折叠和基础 AI 研究方面的开创性工作。'
    },
    links: {
      website: 'https://deepmind.google',
      twitter: 'https://twitter.com/GoogleDeepMind',
      docs: 'https://deepmind.google/research'
    }
  },
  {
    id: 'anthropic-research',
    name: 'Anthropic Research',
    logo: 'anthropic',
    category: 'research',
    color: 'from-[#D4AA6F] to-[#E8C9A0]',
    description: {
      en: 'AI safety and interpretability research. Constitutional AI, mechanistic interpretability, and alignment.',
      zh: 'AI 安全和可解释性研究。宪法 AI、机制可解释性和对齐研究。'
    },
    links: {
      website: 'https://www.anthropic.com/research',
      twitter: 'https://twitter.com/AnthropicAI',
      docs: 'https://www.anthropic.com/research'
    }
  }
]

/**
 * 根据分类获取项目列表
 */
export function getProjectsByCategory(category: ProjectCategory): AIProject[] {
  return aiProjects.filter(project => project.category === category)
}

/**
 * 根据 ID 获取项目
 */
export function getProjectById(id: string): AIProject | undefined {
  return aiProjects.find(project => project.id === id)
}

