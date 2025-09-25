'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface LearningRecord {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: number;
  date: string;
  status: 'completed' | 'in-progress' | 'planned';
  notes: string;
}

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
}

const LearningPage: React.FC = () => {
  const [records, setRecords] = useState<LearningRecord[]>([]);
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newRecord, setNewRecord] = useState<Partial<LearningRecord>>({
    title: '',
    category: '',
    description: '',
    duration: 0,
    date: new Date().toISOString().split('T')[0],
    status: 'completed',
    notes: ''
  });
  const [newGoal, setNewGoal] = useState<Partial<LearningGoal>>({
    title: '',
    description: '',
    targetDate: '',
    progress: 0,
    status: 'active'
  });

  useEffect(() => {
    const savedRecords = localStorage.getItem('learningRecords');
    const savedGoals = localStorage.getItem('learningGoals');
    
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('learningRecords', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('learningGoals', JSON.stringify(goals));
  }, [goals]);

  const addRecord = () => {
    if (newRecord.title && newRecord.category) {
      const record: LearningRecord = {
        id: Date.now().toString(),
        title: newRecord.title || '',
        category: newRecord.category || '',
        description: newRecord.description || '',
        duration: newRecord.duration || 0,
        date: newRecord.date || new Date().toISOString().split('T')[0],
        status: newRecord.status || 'completed',
        notes: newRecord.notes || ''
      };
      setRecords(prev => [record, ...prev]);
      setNewRecord({
        title: '',
        category: '',
        description: '',
        duration: 0,
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
        notes: ''
      });
      setShowAddRecord(false);
    }
  };

  const addGoal = () => {
    if (newGoal.title && newGoal.targetDate) {
      const goal: LearningGoal = {
        id: Date.now().toString(),
        title: newGoal.title || '',
        description: newGoal.description || '',
        targetDate: newGoal.targetDate || '',
        progress: newGoal.progress || 0,
        status: newGoal.status || 'active'
      };
      setGoals(prev => [goal, ...prev]);
      setNewGoal({
        title: '',
        description: '',
        targetDate: '',
        progress: 0,
        status: 'active'
      });
      setShowAddGoal(false);
    }
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const stats = {
    totalRecords: records.length,
    totalHours: Math.round(records.reduce((sum, record) => sum + record.duration, 0) / 60 * 10) / 10,
    thisWeek: records.filter(record => {
      const recordDate = new Date(record.date);
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      return recordDate >= weekStart;
    }).length,
    completedGoals: goals.filter(goal => goal.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* 头部导航 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
              ← 返回首页
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">学习记录</h1>
              <p className="text-gray-400">记录每一次学习，见证成长轨迹</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddRecord(true)}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              <span className="text-lg">+</span>
              <span>添加记录</span>
            </button>
            <button
              onClick={() => setShowAddGoal(true)}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              <span>🎯</span>
              <span>设置目标</span>
            </button>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="text-3xl">📚</div>
              <div>
                <p className="text-3xl font-bold text-white">{stats.totalRecords}</p>
                <p className="text-gray-400 text-sm">学习记录</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="text-3xl">⏰</div>
              <div>
                <p className="text-3xl font-bold text-white">{stats.totalHours}h</p>
                <p className="text-gray-400 text-sm">总学习时长</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="text-3xl">📅</div>
              <div>
                <p className="text-3xl font-bold text-white">{stats.thisWeek}</p>
                <p className="text-gray-400 text-sm">本周记录</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="text-3xl">✅</div>
              <div>
                <p className="text-3xl font-bold text-white">{stats.completedGoals}</p>
                <p className="text-gray-400 text-sm">完成目标</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 学习目标 */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <span>🎯</span> 学习目标
            </h2>
            <div className="space-y-4">
              {goals.map(goal => (
                <div key={goal.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-white text-lg">{goal.title}</h3>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-400 hover:text-red-300 transition-colors text-xl"
                    >
                      🗑️
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{goal.description}</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">进度</span>
                      <span className="text-cyan-400 font-medium">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-purple-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">📅 目标日期: {goal.targetDate}</p>
                </div>
              ))}
              
              {goals.length === 0 && (
                <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">🎯</div>
                  <p className="text-gray-400 mb-2">还没有设置学习目标</p>
                  <button
                    onClick={() => setShowAddGoal(true)}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium mt-2"
                  >
                    设置你的第一个目标
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 学习记录 */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <span>📖</span> 最近学习记录
            </h2>
            <div className="space-y-6">
              {records.map(record => (
                <div key={record.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{record.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full font-medium">{record.category}</span>
                        <span className="flex items-center gap-1 text-gray-300">
                          <span>📅</span>
                          <span>{record.date}</span>
                        </span>
                        <span className="flex items-center gap-1 text-gray-300">
                          <span>⏱️</span>
                          <span>{record.duration}分钟</span>
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.status === 'completed' 
                            ? 'bg-green-500/20 text-green-300' 
                            : record.status === 'in-progress'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-gray-500/20 text-gray-300'
                        }`}>
                          {record.status === 'completed' ? '✅ 已完成' : record.status === 'in-progress' ? '🔄 进行中' : '📋 计划中'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteRecord(record.id)}
                      className="text-red-400 hover:text-red-300 transition-colors text-xl ml-4"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">{record.description}</p>
                  
                  {record.notes && (
                    <div className="bg-white/5 rounded-lg p-4 border-l-4 border-cyan-400">
                      <p className="text-sm text-cyan-300 mb-2 font-medium">📝 学习笔记:</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{record.notes}</p>
                    </div>
                  )}
                </div>
              ))}
              
              {records.length === 0 && (
                <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-12 text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <p className="text-gray-400 mb-2 text-lg">还没有学习记录</p>
                  <p className="text-gray-500 text-sm mb-6">开始记录你的学习历程吧！</p>
                  <button
                    onClick={() => setShowAddRecord(true)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
                  >
                    添加第一条记录
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 添加记录弹窗 */}
      {showAddRecord && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-lg border border-white/20 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold text-white mb-6">添加学习记录</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-3">学习内容</label>
                <input
                  type="text"
                  value={newRecord.title}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  placeholder="今天学了什么？"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-3">学习分类</label>
                <select
                  value={newRecord.category}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  aria-label="选择学习分类"
                >
                  <option value="" className="bg-slate-800">选择分类</option>
                  <option value="前端开发" className="bg-slate-800">前端开发</option>
                  <option value="后端开发" className="bg-slate-800">后端开发</option>
                  <option value="算法数据结构" className="bg-slate-800">算法数据结构</option>
                  <option value="系统设计" className="bg-slate-800">系统设计</option>
                  <option value="数据库" className="bg-slate-800">数据库</option>
                  <option value="DevOps" className="bg-slate-800">DevOps</option>
                  <option value="其他" className="bg-slate-800">其他</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-3">学习描述</label>
                <textarea
                  value={newRecord.description}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  placeholder="详细描述你的学习内容..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">学习时长(分钟)</label>
                  <input
                    type="number"
                    value={newRecord.duration}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    min="0"
                    aria-label="学习时长（分钟）"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">学习日期</label>
                  <input
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    aria-label="学习日期"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-3">学习笔记(可选)</label>
                <textarea
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  placeholder="记录重要的知识点、心得体会..."
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button
                onClick={addRecord}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors duration-200 font-medium"
              >
                添加记录
              </button>
              <button
                onClick={() => setShowAddRecord(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors duration-200 font-medium"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 添加目标弹窗 */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-lg border border-white/20">
            <h3 className="text-2xl font-semibold text-white mb-6">设置学习目标</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-3">目标名称</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  placeholder="例如：掌握React Hooks"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-3">目标描述</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  placeholder="详细描述你的学习目标..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">目标日期</label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    aria-label="目标日期"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">当前进度(%)</label>
                  <input
                    type="number"
                    value={newGoal.progress}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, progress: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    min="0"
                    max="100"
                    aria-label="当前进度百分比"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button
                onClick={addGoal}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-colors duration-200 font-medium"
              >
                设置目标
              </button>
              <button
                onClick={() => setShowAddGoal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors duration-200 font-medium"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPage; 