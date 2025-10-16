'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SiteHeader } from '@/components/SiteHeader';
import { FileCode, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TypeScriptPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <FileCode className="h-3 w-3 mr-1" />
            100% Type Coverage
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            TypeScript Showcase
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Type-safe code practices with TypeScript 5
          </p>
        </div>

        <Tabs defaultValue="basics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="generics">Generics</TabsTrigger>
            <TabsTrigger value="utility">Utility Types</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="api">API Types</TabsTrigger>
          </TabsList>

          {/* Basics */}
          <TabsContent value="basics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Type Definitions</CardTitle>
                <CardDescription>
                  Defining types for better code safety and IntelliSense
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// User type definition
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  updatedAt?: Date;
}

// Type alias with union
type Status = 'pending' | 'active' | 'inactive';

// Enum for constants
enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}`}</code>
                </pre>
                <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Type safety prevents runtime errors and provides excellent autocompletion
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Type Inference</CardTitle>
                <CardDescription>
                  TypeScript automatically infers types when possible
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// Type inferred as string
const message = "Hello, TypeScript!";

// Type inferred as number[]
const numbers = [1, 2, 3, 4, 5];

// Type inferred from function return
function getUser() {
  return {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com'
  };
}

const user = getUser(); // Type: { id: string; name: string; email: string }`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Generics */}
          <TabsContent value="generics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generic Functions</CardTitle>
                <CardDescription>
                  Create reusable functions that work with multiple types
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// Generic array wrapper
function wrapInArray<T>(value: T): T[] {
  return [value];
}

wrapInArray<number>(42);      // number[]
wrapInArray<string>("hello"); // string[]

// Generic API response
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// Usage
const userData = await fetchData<User>('/api/user');
// userData.data is typed as User`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generic Components</CardTitle>
                <CardDescription>
                  Type-safe React components with generics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <div>
      {items.map((item) => (
        <div key={keyExtractor(item)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

// Usage with type safety
<List<User>
  items={users}
  renderItem={(user) => <div>{user.name}</div>}
  keyExtractor={(user) => user.id}
/>`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Utility Types */}
          <TabsContent value="utility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Built-in Utility Types</CardTitle>
                <CardDescription>
                  TypeScript provides powerful utility types for transforming types
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Partial - all properties optional
type UpdateUser = Partial<User>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type PublicUser = Omit<User, 'password'>;

// Required - make all properties required
type CompleteUser = Required<User>;

// Readonly - make all properties readonly
type ImmutableUser = Readonly<User>;

// Record - create object type with specific keys
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Utility Types</CardTitle>
                <CardDescription>
                  Creating your own utility types for specific use cases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// DeepPartial - make all properties deeply optional
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// NonNullable properties
type NonNullableProps<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// Extract function parameter types
type FunctionParams<T extends (...args: any[]) => any> = 
  T extends (...args: infer P) => any ? P : never;

// Extract promise value type
type Await<T> = T extends Promise<infer U> ? U : T;`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components */}
          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Type-Safe Component Props</CardTitle>
                <CardDescription>
                  Defining and validating component props with TypeScript
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// Button component props
interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = 'default',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className
}: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size} \${className}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Component with Generics</CardTitle>
                <CardDescription>
                  Creating flexible components that work with any data type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// Generic select component
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
  getValue: (option: T) => string;
}

function Select<T>({
  options,
  value,
  onChange,
  getLabel,
  getValue
}: SelectProps<T>) {
  return (
    <select
      value={getValue(value)}
      onChange={(e) => {
        const selected = options.find(
          (opt) => getValue(opt) === e.target.value
        );
        if (selected) onChange(selected);
      }}
    >
      {options.map((option) => (
        <option key={getValue(option)} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Types */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Response Types</CardTitle>
                <CardDescription>
                  Type-safe API calls and data fetching
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// API response wrapper
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

// User API types
interface GetUsersResponse {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

// Type-safe API client
class ApiClient {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    const response = await fetch(url);
    return response.json();
  }

  async post<TRequest, TResponse>(
    url: string,
    data: TRequest
  ): Promise<ApiResponse<TResponse>> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

// Usage with full type safety
const api = new ApiClient();
const response = await api.get<GetUsersResponse>('/api/users');
// response.data.users is typed as User[]`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Benefits Section */}
        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>TypeScript Benefits</CardTitle>
              <CardDescription>
                Why TypeScript improves code quality and developer experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Catch Errors Early',
                    desc: 'Type checking catches errors at compile time, not runtime',
                  },
                  {
                    title: 'Better IntelliSense',
                    desc: 'IDE provides accurate autocompletion and suggestions',
                  },
                  {
                    title: 'Self-Documenting',
                    desc: 'Types serve as inline documentation for your code',
                  },
                  {
                    title: 'Refactoring Confidence',
                    desc: 'Safely refactor code knowing types will catch issues',
                  },
                  {
                    title: 'Team Collaboration',
                    desc: 'Types make it easier for teams to work on the same codebase',
                  },
                  {
                    title: 'Reduced Bugs',
                    desc: 'Type safety significantly reduces common programming errors',
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg border hover:border-primary/50 transition-colors"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                100% TypeScript Coverage
              </h3>
              <p className="text-muted-foreground mb-6">
                Every file in this project is written in TypeScript with full type safety.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/frontend">
                  <Button size="lg" variant="outline">
                    Back to Demos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

