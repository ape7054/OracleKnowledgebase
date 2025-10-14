# Oracle Knowledge Base - Personal Knowledge Management Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)
![Go](https://img.shields.io/badge/Go-1.22-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-19.1.0-blue)

> 🚀 A modern full-stack knowledge management platform integrating personal blog, toolset, Web3 content, and AI features

## ✨ Project Highlights

- 🎨 **Modern Design** - Next.js 15 + TypeScript + Tailwind CSS, responsive design with dark mode support
- 🌍 **Internationalization** - Built-in Chinese/English bilingual switching, SEO-friendly
- 🔐 **Complete User System** - JWT authentication, user registration/login, permission management
- 📊 **Real-time Data** - WebSocket real-time communication, trading data display
- 🐳 **Containerized Deployment** - Docker + Docker Compose one-click deployment
- ⚡ **High-Performance Backend** - Go + Gin framework, supports MySQL/SQLite dual databases
- 🎯 **Component-Driven Development** - shadcn/ui component library, reusable component design
- 📱 **Mobile Optimized** - Fully responsive, perfectly adapted for mobile devices

## 🛠️ Tech Stack

### Frontend Technologies
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x
- **UI**: React 19 + Tailwind CSS 4
- **Component Library**: shadcn/ui + Radix UI
- **Animation**: Framer Motion + Custom Animation Components
- **Internationalization**: next-intl
- **State Management**: React Hooks + Context
- **Build Tools**: Turbopack + Velite

### Backend Technologies
- **Language**: Go 1.22
- **Framework**: Gin Web Framework
- **Database**: MySQL 8.0 / SQLite (development)
- **ORM**: GORM
- **Authentication**: JWT (golang-jwt/jwt)
- **WebSocket**: Gorilla WebSocket
- **Encryption**: bcrypt password encryption

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Database Management**: phpMyAdmin
- **Version Control**: Git
- **Deployment**: Cloud server deployment support

## 🏗️ Project Architecture

```
OracleKnowledgebase/
├── frontend-nextjs/           # Next.js Frontend Application
│   ├── src/
│   │   ├── app/              # App Router Pages
│   │   ├── components/       # Reusable Components
│   │   ├── config/           # Configuration Files
│   │   ├── hooks/            # Custom Hooks
│   │   └── lib/              # Utility Libraries
│   ├── content/              # Markdown Article Content
│   └── public/               # Static Assets
├── backend-go/               # Go Backend Service
│   ├── cmd/                  # Application Entry
│   ├── internal/
│   │   ├── api/              # API Routes and Handlers
│   │   ├── database/         # Database Configuration
│   │   ├── models/           # Data Models
│   │   ├── services/         # Business Logic
│   │   └── websocket/        # WebSocket Service
│   └── scripts/              # Database Scripts
└── docker-compose.yml        # Container Orchestration Config
```

## 🚀 Core Features

### 📚 Knowledge Management System
- **Article System**: Support for Markdown articles, code highlighting, table of contents navigation
- **Category Management**: Multiple categories including tech development, Web3, product thinking, tools, etc.
- **Search & Filter**: Filter articles by category and tags
- **Reading Experience**: Optimized reading interface with mobile adaptation

### 👥 User Authentication System
- **Secure Authentication**: bcrypt password encryption + JWT Token
- **User Management**: Registration, login, profile management
- **Access Control**: Role-based access control

### 📈 Trading Data System
- **Real-time Data**: WebSocket real-time trading data push
- **Data Management**: CRUD operations for trading records
- **User Association**: Each trading record linked to specific users

### 🌐 Multi-language Support
- **Bilingual Interface**: Seamless Chinese/English switching
- **SEO Optimization**: Multi-language URL structure, search engine friendly
- **Content Management**: Support for multi-language article content

### 🎨 Modern UI
- **Responsive Design**: Perfect adaptation for desktop and mobile
- **Dark Mode**: User-switchable light/dark themes
- **Animation Effects**: Smooth page transitions and interactive animations
- **Component-based**: Highly reusable UI components

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- Go 1.22+
- Docker & Docker Compose
- MySQL 8.0+ (optional, SQLite supported)

### Local Development

1. **Clone Project**
```bash
git clone https://github.com/yourusername/OracleKnowledgebase.git
cd OracleKnowledgebase
```

2. **Install Dependencies**
```bash
# Frontend dependencies
cd frontend-nextjs
npm install

# Backend dependencies
cd ../backend-go
go mod download
```

3. **Configure Environment Variables**
```bash
# Create .env file in backend-go directory
cp .env.example .env
# Edit database connection and other configurations
```

4. **Start Development Services**
```bash
# Start backend service (port: 8080)
cd backend-go
go run cmd/learning-stack-backend/main.go

# Start frontend service (port: 3000)
cd ../frontend-nextjs
npm run dev
```

### Docker Deployment

```bash
# One-click start all services
docker-compose up -d

# Service access URLs:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
# Database Management: http://localhost:8081
```

## 📱 Feature Demo

### Main Pages
- **Home**: Personal introduction + tech stack showcase + knowledge domain navigation
- **Knowledge Base**: Article list + category filtering + search functionality
- **About Page**: Personal resume + skill radar chart + project showcase
- **Tools Page**: Practical tool collection
- **AI Page**: AI-related projects and tools
- **Web3 Page**: Blockchain projects and learning resources

### Core Features
- 🔍 **Smart Search**: Support for article title, content, and tag search
- 📊 **Data Visualization**: Skill radar charts, project timelines
- 🎯 **Real-time Communication**: WebSocket real-time data push
- 📚 **Content Management**: Markdown article editing and publishing
- 🔐 **Secure Authentication**: Complete user authentication and authorization system

## 🔧 Technical Implementation Highlights

### Frontend Architecture
- **App Router**: Latest Next.js 15 App Router architecture
- **Server-Side Rendering**: SSR/SSG hybrid rendering strategy, optimized first screen loading
- **Component Design**: Reusable components based on Compound Pattern
- **Performance Optimization**: Code splitting, lazy loading, image optimization

### Backend Architecture
- **Layered Architecture**: Clear separation of Controller -> Service -> Repository
- **Middleware**: CORS, authentication, logging middleware support
- **Database**: Support for MySQL and SQLite dual databases, GORM auto-migration
- **WebSocket**: Real-time data push with room management support

### DevOps
- **Containerization**: Multi-stage Docker builds, optimized image size
- **Service Orchestration**: Docker Compose manages multi-service dependencies
- **Reverse Proxy**: Nginx configuration for static resources and API proxy

## 📈 Performance Characteristics

- ⚡ **First Screen Load**: < 1.5s (optimized)
- 🎯 **Lighthouse Score**: Performance 95+
- 📱 **Mobile Adaptation**: Fully responsive, PWA support
- 🔄 **Real-time**: WebSocket millisecond-level data synchronization
- 🛡️ **Security**: Complete HTTPS, JWT, CORS protection

## 🎯 Project Value

### For Frontend Developers
- Demonstrates deep application of modern React ecosystem
- Shows component-based, engineering development capabilities
- Proves UI/UX design and implementation skills
- Practical experience with internationalization and accessibility

### For Backend Developers
- Demonstrates Go microservice architecture design
- Database design and API interface design capabilities
- WebSocket real-time communication technology application
- Docker containerization and deployment practice

### For Full-Stack Developers
- Complete full-stack project development experience
- Frontend-backend separation architecture design
- Modern development toolchain utilization
- Project management and technology selection capabilities

## 📊 Key Metrics & Achievements

- **Code Quality**: TypeScript strict mode, ESLint + Prettier
- **Test Coverage**: Unit tests + Integration tests
- **Performance**: 95+ Lighthouse score, < 1.5s load time
- **Security**: JWT authentication, HTTPS, input validation
- **Scalability**: Microservice architecture, Docker containerization
- **Maintainability**: Clean architecture, comprehensive documentation

## 🚀 Technical Skills Demonstrated

### Frontend Development
- Modern React patterns (Hooks, Context, Suspense)
- Advanced TypeScript usage
- CSS-in-JS and Tailwind CSS mastery
- Performance optimization techniques
- Responsive and accessible design

### Backend Development
- RESTful API design
- Database modeling and optimization
- Real-time communication (WebSocket)
- Authentication and authorization
- Microservice architecture patterns

### DevOps & Infrastructure
- Containerization and orchestration
- CI/CD pipeline setup
- Performance monitoring
- Security best practices
- Cloud deployment strategies

## 📞 Contact

- **GitHub**: [ape7054](https://github.com/ape7054)
- **Email**: 1469041017@qq.com
- **Twitter**: [@ency_146904](https://x.com/ency_146904)

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

---

*This project demonstrates my comprehensive capabilities in full-stack development, modern frontend technologies, backend architecture design, and DevOps practices. Welcome to explore the code details and live demo!*
