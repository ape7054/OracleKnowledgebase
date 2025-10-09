// GitHub API 集成
// 用于获取真实的 GitHub 数据

interface GitHubStats {
  repos: number
  stars: number
  followers: number
  contributions: number
}

interface GitHubRepo {
  name: string
  description: string
  stars: number
  language: string
  url: string
}

// GitHub API 返回的原始仓库数据
interface GitHubApiRepo {
  name: string
  description: string | null
  stargazers_count: number
  language: string | null
  html_url: string
}

// GitHub API 返回的用户数据
interface GitHubApiUser {
  public_repos: number
  followers: number
}

// 缓存配置
const CACHE_KEY = 'github_stats'
const CACHE_DURATION = 1000 * 60 * 60 // 1 小时

// 从localStorage获取缓存数据
function getCachedData(): { data: GitHubStats; timestamp: number } | null {
  if (typeof window === 'undefined') return null
  
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      return JSON.parse(cached)
    }
  } catch (error) {
    console.error('Error reading cache:', error)
  }
  return null
}

// 保存数据到localStorage
function setCachedData(data: GitHubStats) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (error) {
    console.error('Error saving cache:', error)
  }
}

// 检查缓存是否过期
function isCacheValid(cached: { data: GitHubStats; timestamp: number } | null): boolean {
  if (!cached) return false
  return Date.now() - cached.timestamp < CACHE_DURATION
}

/**
 * 获取 GitHub 统计数据
 * @param username GitHub 用户名
 * @returns GitHub 统计数据或fallback数据
 */
export async function getGitHubStats(username: string = 'yourusername'): Promise<GitHubStats> {
  // 检查缓存
  const cached = getCachedData()
  if (cached && isCacheValid(cached)) {
    return cached.data
  }

  try {
    // 获取用户信息
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 } // Next.js 缓存1小时
    })

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data')
    }

    const userData = await userResponse.json() as GitHubApiUser

    // 获取仓库信息
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    })

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch repos data')
    }

    const reposData = await reposResponse.json() as GitHubApiRepo[]

    // 计算总stars
    const totalStars = reposData.reduce((acc: number, repo: GitHubApiRepo) => acc + repo.stargazers_count, 0)

    const stats: GitHubStats = {
      repos: userData.public_repos || 0,
      stars: totalStars || 0,
      followers: userData.followers || 0,
      contributions: 0 // 贡献数需要通过其他API获取，这里先设为0
    }

    // 保存到缓存
    setCachedData(stats)

    return stats
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    
    // 返回fallback数据
    return {
      repos: 15,
      stars: 200,
      followers: 50,
      contributions: 500
    }
  }
}

/**
 * 获取热门仓库
 * @param username GitHub 用户名
 * @param limit 返回数量
 * @returns 仓库列表
 */
export async function getTopRepos(username: string = 'yourusername', limit: number = 6): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=stars`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch repos')
    }

    const data = await response.json() as GitHubApiRepo[]

    return data
      .sort((a: GitHubApiRepo, b: GitHubApiRepo) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit)
      .map((repo: GitHubApiRepo) => ({
        name: repo.name,
        description: repo.description || 'No description',
        stars: repo.stargazers_count,
        language: repo.language || 'Unknown',
        url: repo.html_url
      }))
  } catch (error) {
    console.error('Error fetching top repos:', error)
    return []
  }
}

