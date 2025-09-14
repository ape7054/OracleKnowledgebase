'use client';
import toast from 'react-hot-toast';

export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp?: string;
}

export interface MarketDataMessage {
  type: 'market_data';
  data: {
    symbol: string;
    price: number;
    change: number;
    volume: number;
  };
}

export interface TradeMessage {
  type: 'trade_update';
  data: {
    id: string;
    status: 'completed' | 'failed';
    message: string;
  };
}

type MessageHandler = (message: WebSocketMessage) => void;

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private handlers: Map<string, MessageHandler[]> = new Map();
  private isConnected = false;
  private pingInterval: NodeJS.Timeout | null = null;

  constructor(url: string = 'ws://localhost:8080/ws') {
    this.url = url;
  }

  connect(): void {
    try {
      this.ws = new WebSocket(this.url);
      this.setupEventHandlers();
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      toast.error('WebSocket连接失败');
    }
  }

  private setupEventHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = (event) => {
      console.log('WebSocket connected:', event);
      this.isConnected = true;
      this.reconnectAttempts = 0;
      toast.success('实时连接已建立');
      
      // 开始心跳检测
      this.startPing();
      
      // 触发连接事件
      this.emit('connected', {});
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket closed:', event);
      this.isConnected = false;
      this.stopPing();
      
      // 触发断开连接事件
      this.emit('disconnected', { code: event.code, reason: event.reason });
      
      // 尝试重连
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnect();
      } else {
        toast.error('WebSocket连接断开，请刷新页面');
      }
    };

    this.ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      toast.error('实时连接出现错误');
    };
  }

  private reconnect(): void {
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
    
    setTimeout(() => {
      this.connect();
    }, delay);
  }

  private startPing(): void {
    this.pingInterval = setInterval(() => {
      if (this.isConnected) {
        this.send({ type: 'ping', data: {} });
      }
    }, 30000); // 每30秒发送一次心跳
  }

  private stopPing(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    const handlers = this.handlers.get(message.type) || [];
    handlers.forEach(handler => {
      try {
        handler(message);
      } catch (error) {
        console.error(`Error handling message type ${message.type}:`, error);
      }
    });

    // 处理特定消息类型
    switch (message.type) {
      case 'pong':
        // 心跳响应，不需要特殊处理
        break;
      case 'market_data':
        // 市场数据更新
        break;
      case 'trade_update':
        // 交易状态更新
        break;
      default:
        console.log('Received unknown message type:', message.type);
    }
  }

  send(message: WebSocketMessage): void {
    if (this.ws && this.isConnected) {
      try {
        this.ws.send(JSON.stringify({
          ...message,
          timestamp: new Date().toISOString(),
        }));
      } catch (error) {
        console.error('Failed to send WebSocket message:', error);
      }
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  subscribe(messageType: string, handler: MessageHandler): void {
    if (!this.handlers.has(messageType)) {
      this.handlers.set(messageType, []);
    }
    this.handlers.get(messageType)!.push(handler);
  }

  unsubscribe(messageType: string, handler: MessageHandler): void {
    const handlers = this.handlers.get(messageType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }

  private emit(eventType: string, data: any): void {
    const message: WebSocketMessage = {
      type: eventType,
      data,
      timestamp: new Date().toISOString(),
    };
    this.handleMessage(message);
  }

  disconnect(): void {
    if (this.ws) {
      this.stopPing();
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
  }

  getConnectionState(): number {
    return this.ws?.readyState || WebSocket.CLOSED;
  }

  isConnectionOpen(): boolean {
    return this.isConnected && this.ws?.readyState === WebSocket.OPEN;
  }
}

// 创建全局WebSocket客户端实例
let wsClient: WebSocketClient | null = null;

export const getWebSocketClient = (): WebSocketClient => {
  if (!wsClient) {
    wsClient = new WebSocketClient();
  }
  return wsClient;
};

// React Hook for WebSocket
import { useEffect, useState } from 'react';

export const useWebSocket = () => {
  const [client] = useState(() => getWebSocketClient());
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    client.subscribe('connected', handleConnect);
    client.subscribe('disconnected', handleDisconnect);

    // 如果还未连接，则尝试连接
    if (client.getConnectionState() === WebSocket.CLOSED) {
      client.connect();
    }

    return () => {
      client.unsubscribe('connected', handleConnect);
      client.unsubscribe('disconnected', handleDisconnect);
    };
  }, [client]);

  return {
    client,
    isConnected,
    send: (message: WebSocketMessage) => client.send(message),
    subscribe: (messageType: string, handler: MessageHandler) => 
      client.subscribe(messageType, handler),
    unsubscribe: (messageType: string, handler: MessageHandler) => 
      client.unsubscribe(messageType, handler),
  };
};

export default WebSocketClient; 