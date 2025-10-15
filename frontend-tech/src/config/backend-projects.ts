/**
 * 后端项目配置文件
 * 用于管理后端技术项目信息
 */

export interface BackendProject {
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
    github?: string
    docs?: string
  }
  color?: string // 项目主题色渐变
}

export type ProjectCategory = 'microservices' | 'api-design' | 'rust' | 'database'

export const projectCategories: ProjectCategory[] = [
  'microservices',
  'api-design',
  'rust',
  'database'
]

/**
 * 后端项目列表
 */
export const backendProjects: BackendProject[] = [
  // Go 微服务类
  {
    id: 'go-gin',
    name: 'Go + Gin',
    logo: 'go',
    category: 'microservices',
    color: 'from-[#00ADD8] to-[#5DC9E2]',
    description: {
      en: 'High-performance HTTP web framework for Go. Build RESTful APIs with minimal overhead and maximum speed.',
      zh: '高性能的 Go HTTP Web 框架。以最小的开销和最大的速度构建 RESTful API。'
    },
    links: {
      website: 'https://gin-gonic.com',
      github: 'https://github.com/gin-gonic/gin',
      docs: 'https://gin-gonic.com/docs/'
    }
  },
  {
    id: 'go-grpc',
    name: 'gRPC',
    logo: 'grpc',
    category: 'microservices',
    color: 'from-[#244C5A] to-[#4A9EFF]',
    description: {
      en: 'Modern open source high performance RPC framework. Build microservices with Protocol Buffers and HTTP/2.',
      zh: '现代开源高性能 RPC 框架。使用 Protocol Buffers 和 HTTP/2 构建微服务。'
    },
    links: {
      website: 'https://grpc.io',
      github: 'https://github.com/grpc/grpc-go',
      docs: 'https://grpc.io/docs/'
    }
  },
  {
    id: 'go-kit',
    name: 'Go Kit',
    logo: 'go',
    category: 'microservices',
    color: 'from-[#00ADD8] to-[#00D9FF]',
    description: {
      en: 'Toolkit for building microservices in Go. Provides packages for service discovery, load balancing, and more.',
      zh: '用于在 Go 中构建微服务的工具包。提供服务发现、负载均衡等功能包。'
    },
    links: {
      website: 'https://gokit.io',
      github: 'https://github.com/go-kit/kit',
      docs: 'https://gokit.io/examples/'
    }
  },
  {
    id: 'go-micro',
    name: 'Go Micro',
    logo: 'go',
    category: 'microservices',
    color: 'from-[#00ADD8] to-[#76E0F7]',
    description: {
      en: 'Distributed systems development framework. Simplifies building and managing microservices at scale.',
      zh: '分布式系统开发框架。简化大规模微服务的构建和管理。'
    },
    links: {
      website: 'https://micro.dev',
      github: 'https://github.com/micro/go-micro',
      docs: 'https://micro.dev/docs'
    }
  },

  // API 设计类
  {
    id: 'restful-api',
    name: 'RESTful API',
    logo: 'api',
    category: 'api-design',
    color: 'from-[#FF6B6B] to-[#FFA07A]',
    description: {
      en: 'Architectural style for designing networked applications. Standard approach for building web APIs.',
      zh: '设计网络应用的架构风格。构建 Web API 的标准方法。'
    },
    links: {
      website: 'https://restfulapi.net',
      docs: 'https://restfulapi.net/rest-architectural-constraints/'
    }
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    logo: 'graphql',
    category: 'api-design',
    color: 'from-[#E535AB] to-[#F58BCA]',
    description: {
      en: 'Query language for APIs. Request exactly what you need, get predictable results, and build powerful APIs.',
      zh: 'API 查询语言。精确请求所需数据，获得可预测的结果，构建强大的 API。'
    },
    links: {
      website: 'https://graphql.org',
      github: 'https://github.com/graphql/graphql-spec',
      docs: 'https://graphql.org/learn/'
    }
  },
  {
    id: 'swagger',
    name: 'Swagger/OpenAPI',
    logo: 'swagger',
    category: 'api-design',
    color: 'from-[#85EA2D] to-[#A4F756]',
    description: {
      en: 'OpenAPI Specification for designing, building, and documenting RESTful APIs with interactive documentation.',
      zh: '用于设计、构建和记录 RESTful API 的 OpenAPI 规范，提供交互式文档。'
    },
    links: {
      website: 'https://swagger.io',
      github: 'https://github.com/swagger-api',
      docs: 'https://swagger.io/docs/'
    }
  },
  {
    id: 'postman',
    name: 'Postman',
    logo: 'postman',
    category: 'api-design',
    color: 'from-[#FF6C37] to-[#FFA07A]',
    description: {
      en: 'API platform for building and using APIs. Simplify each step of the API lifecycle and streamline collaboration.',
      zh: 'API 平台，用于构建和使用 API。简化 API 生命周期的每个步骤并优化协作。'
    },
    links: {
      website: 'https://www.postman.com',
      docs: 'https://learning.postman.com/docs/'
    }
  },

  // Rust 类
  {
    id: 'rust-lang',
    name: 'Rust',
    logo: 'rust',
    category: 'rust',
    color: 'from-[#CE422B] to-[#F74C00]',
    description: {
      en: 'Systems programming language focused on safety, speed, and concurrency. Build reliable and efficient software.',
      zh: '专注于安全、速度和并发的系统编程语言。构建可靠高效的软件。'
    },
    links: {
      website: 'https://www.rust-lang.org',
      github: 'https://github.com/rust-lang/rust',
      docs: 'https://doc.rust-lang.org/'
    }
  },
  {
    id: 'actix-web',
    name: 'Actix Web',
    logo: 'rust',
    category: 'rust',
    color: 'from-[#CE422B] to-[#FF8C42]',
    description: {
      en: 'Powerful, pragmatic, and extremely fast web framework for Rust. Build high-performance web applications.',
      zh: '强大、实用且极快的 Rust Web 框架。构建高性能 Web 应用程序。'
    },
    links: {
      website: 'https://actix.rs',
      github: 'https://github.com/actix/actix-web',
      docs: 'https://actix.rs/docs/'
    }
  },
  {
    id: 'tokio',
    name: 'Tokio',
    logo: 'rust',
    category: 'rust',
    color: 'from-[#CE422B] to-[#E8A87C]',
    description: {
      en: 'Asynchronous runtime for Rust. Build reliable network applications without compromising speed.',
      zh: 'Rust 的异步运行时。构建可靠的网络应用程序，不影响速度。'
    },
    links: {
      website: 'https://tokio.rs',
      github: 'https://github.com/tokio-rs/tokio',
      docs: 'https://tokio.rs/tokio/tutorial'
    }
  },
  {
    id: 'rocket',
    name: 'Rocket',
    logo: 'rust',
    category: 'rust',
    color: 'from-[#D33847] to-[#E85D75]',
    description: {
      en: 'Web framework for Rust that makes it simple to write fast, secure web applications without sacrificing flexibility.',
      zh: 'Rust Web 框架，使编写快速、安全的 Web 应用程序变得简单，且不牺牲灵活性。'
    },
    links: {
      website: 'https://rocket.rs',
      github: 'https://github.com/SergioBenitez/Rocket',
      docs: 'https://rocket.rs/guide/'
    }
  },

  // 数据库类
  {
    id: 'mysql',
    name: 'MySQL',
    logo: 'mysql',
    category: 'database',
    color: 'from-[#00758F] to-[#00A8CC]',
    description: {
      en: 'Most popular open-source relational database. Reliable, scalable, and easy to use for web applications.',
      zh: '最流行的开源关系型数据库。可靠、可扩展且易于在 Web 应用中使用。'
    },
    links: {
      website: 'https://www.mysql.com',
      github: 'https://github.com/mysql/mysql-server',
      docs: 'https://dev.mysql.com/doc/'
    }
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    logo: 'postgresql',
    category: 'database',
    color: 'from-[#336791] to-[#6BA3D0]',
    description: {
      en: 'Advanced open-source relational database. Powerful features, extensibility, and standards compliance.',
      zh: '先进的开源关系型数据库。强大的功能、可扩展性和标准合规性。'
    },
    links: {
      website: 'https://www.postgresql.org',
      github: 'https://github.com/postgres/postgres',
      docs: 'https://www.postgresql.org/docs/'
    }
  },
  {
    id: 'redis',
    name: 'Redis',
    logo: 'redis',
    category: 'database',
    color: 'from-[#DC382D] to-[#FF6B6B]',
    description: {
      en: 'In-memory data structure store. Use as database, cache, message broker, and streaming engine.',
      zh: '内存数据结构存储。可用作数据库、缓存、消息代理和流引擎。'
    },
    links: {
      website: 'https://redis.io',
      github: 'https://github.com/redis/redis',
      docs: 'https://redis.io/docs/'
    }
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    logo: 'mongodb',
    category: 'database',
    color: 'from-[#47A248] to-[#6FD57F]',
    description: {
      en: 'NoSQL document database. Flexible schema, horizontal scaling, and powerful query capabilities.',
      zh: 'NoSQL 文档数据库。灵活的模式、水平扩展和强大的查询能力。'
    },
    links: {
      website: 'https://www.mongodb.com',
      github: 'https://github.com/mongodb/mongo',
      docs: 'https://www.mongodb.com/docs/'
    }
  }
]

/**
 * 根据分类获取项目列表
 */
export function getProjectsByCategory(category: ProjectCategory): BackendProject[] {
  return backendProjects.filter(project => project.category === category)
}

/**
 * 根据 ID 获取项目
 */
export function getProjectById(id: string): BackendProject | undefined {
  return backendProjects.find(project => project.id === id)
}

