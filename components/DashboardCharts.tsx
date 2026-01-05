
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Project } from '../types';

interface DashboardChartsProps {
  projects: Project[];
}

const COLORS = ['#6366f1', '#f59e0b', '#ef4444', '#10b981'];

const DashboardCharts: React.FC<DashboardChartsProps> = ({ projects }) => {
  const statusData = [
    { name: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length },
    { name: 'Postponed', value: projects.filter(p => p.status === 'Postponed').length },
    { name: 'Delayed', value: projects.filter(p => p.status === 'Delayed').length },
    { name: 'Completed', value: projects.filter(p => p.status === 'Completed').length },
  ].filter(d => d.value > 0);

  const completionData = projects.map(p => {
    const totalProgress = p.stages.reduce((acc, s) => acc + s.progress, 0);
    const maxProgress = p.stages.length * 10;
    const percentage = Math.round((totalProgress / maxProgress) * 100);
    return {
      name: p.name.length > 15 ? p.name.substring(0, 12) + '...' : p.name,
      progress: percentage
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Project Status Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Total Completion %</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={completionData}>
              <XAxis dataKey="name" fontSize={12} tick={{ fill: '#64748b' }} />
              <YAxis domain={[0, 100]} fontSize={12} tick={{ fill: '#64748b' }} />
              <Tooltip />
              <Bar dataKey="progress" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
