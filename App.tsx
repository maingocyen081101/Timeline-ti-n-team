
import React, { useState, useCallback, useMemo } from 'react';
import { Project, Status, AIInsight, Task } from './types';
import { INITIAL_PROJECTS } from './constants';
import TaskRow from './components/ProjectRow';
import DashboardCharts from './components/DashboardCharts';
import AIInsightPanel from './components/AIInsightPanel';
import { analyzeProjects } from './services/geminiService';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setProjects(prev => prev.map(p => ({
      ...p,
      tasks: p.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
    })));
  }, []);

  const handleUpdateProgress = (taskId: string, value: number) => {
    const status: Status = value === 10 ? 'Hoàn thành' : 'Đang thực hiện';
    updateTask(taskId, { progress: value, status });
  };

  const handleUpdateStatus = (taskId: string, status: Status) => {
    updateTask(taskId, { status });
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const insight = await analyzeProjects(projects);
      setAiInsight(insight);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredProjects = useMemo(() => {
    if (!searchTerm) return projects;
    return projects.map(p => ({
      ...p,
      tasks: p.tasks.filter(t => 
        t.info.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.reqId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(p => p.tasks.length > 0);
  }, [projects, searchTerm]);

  const stats = useMemo(() => {
    const allTasks = projects.flatMap(p => p.tasks);
    return {
      total: allTasks.length,
      completed: allTasks.filter(t => t.status === 'Hoàn thành').length,
      delayed: allTasks.filter(t => t.status === 'Trễ').length,
      active: allTasks.filter(t => t.status === 'Đang thực hiện').length,
    };
  }, [projects]);

  const legacyProjectsData = useMemo(() => {
    return projects.map(p => {
      const totalProgress = p.tasks.reduce((sum, t) => sum + t.progress, 0);
      const maxPossible = p.tasks.length * 10;
      const progressPercent = maxPossible > 0 ? Math.round((totalProgress / maxPossible) * 100) : 0;
      
      return {
        ...p,
        owner: p.code,
        status: (progressPercent === 100 ? 'Completed' : p.tasks.some(t => t.status === 'Trễ') ? 'Delayed' : 'In Progress') as any,
        priority: 'High' as any,
        startDate: '',
        deadline: '',
        stages: p.tasks.map(t => ({ id: t.id, name: t.reqId, progress: t.progress }))
      };
    });
  }, [projects]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1500px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">HQA BA Dashboard</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Live Monitoring System</span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md px-10">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Tìm kiếm REQ ID, Nhân sự hoặc Nội dung..." 
                className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Hoàn thành</span>
                <span className="text-sm font-black text-emerald-600 tabular-nums">{stats.completed}/{stats.total}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Đang trễ</span>
                <span className="text-sm font-black text-rose-500 tabular-nums">{stats.delayed}</span>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=BA_TEAM" className="w-9 h-9 rounded-full ring-2 ring-indigo-50" alt="BA profile" />
          </div>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto px-6 py-8">
        <DashboardCharts projects={legacyProjectsData} />

        <AIInsightPanel 
          insight={aiInsight} 
          loading={isAnalyzing} 
          onAnalyze={runAnalysis} 
        />

        <div className="space-y-12">
          {filteredProjects.map((project) => (
            <section key={project.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-indigo-50/50 border-b border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-black tracking-wider">
                    {project.code}
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-800 tracking-tight">{project.name}</h2>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      {project.tasks.length} sub-tasks identified
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                    Export Project CSV
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white text-[10px] uppercase tracking-[0.15em] text-slate-400 font-black">
                      <th className="py-4 px-4 border-b border-slate-100">ID</th>
                      <th className="py-4 px-4 border-b border-slate-100 w-[30%]">Thông tin Task</th>
                      <th className="py-4 px-4 border-b border-slate-100">Nhân sự (EMP/SP)</th>
                      <th className="py-4 px-4 border-b border-slate-100">Tiến độ (Scale 1-10)</th>
                      <th className="py-4 px-4 border-b border-slate-100">Trạng thái</th>
                      <th className="py-4 px-4 border-b border-slate-100">Thời hạn / Rủi ro</th>
                      <th className="py-4 px-4 border-b border-slate-100">Ghi chú (BA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.tasks.map((task) => (
                      <TaskRow 
                        key={task.id} 
                        task={task} 
                        onUpdateProgress={handleUpdateProgress}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              
              {project.tasks.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-slate-400 text-sm font-medium">Không tìm thấy task nào khớp với từ khóa.</p>
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span className="absolute right-full mr-4 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Thêm REQ mới</span>
        </button>
      </div>
    </div>
  );
};

export default App;
