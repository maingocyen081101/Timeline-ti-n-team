
import React from 'react';
import { Task, Status } from '../types';
import { STATUS_COLORS } from '../constants';

interface TaskRowProps {
  task: Task;
  onUpdateProgress: (taskId: string, value: number) => void;
  onUpdateStatus: (taskId: string, status: Status) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onUpdateProgress, onUpdateStatus }) => {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/80 transition-all text-[12px]">
      <td className="py-3 px-4 font-mono font-medium text-slate-500">{task.reqId}</td>
      <td className="py-3 px-4">
        <div className="max-w-[300px]">
          <div className="text-sm font-semibold text-slate-800 line-clamp-2 leading-tight" title={task.info}>
            {task.info}
          </div>
          <div className="mt-1 flex gap-2">
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">{task.phase}</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-600">
              {task.employee.substring(0, 1)}
            </div>
            <span className="font-semibold text-slate-700 truncate max-w-[80px]">{task.employee}</span>
          </div>
          {task.support && (
            <div className="text-[10px] text-slate-400 italic">Sup: {task.support}</div>
          )}
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-0.5">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                onClick={() => onUpdateProgress(task.id, i + 1)}
                className={`w-2 h-4 rounded-sm transition-all ${
                  i < task.progress 
                    ? (task.status === 'Trễ' ? 'bg-rose-500' : 'bg-indigo-600') 
                    : 'bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Level ${i + 1}/10`}
              />
            ))}
          </div>
          <div className="text-[10px] font-bold text-slate-400 flex justify-between">
             <span>PROGRESS</span>
             <span className={task.progress === 10 ? 'text-emerald-500' : ''}>{task.progress * 10}%</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <select 
          value={task.status}
          onChange={(e) => onUpdateStatus(task.id, e.target.value as Status)}
          className={`text-[11px] px-2 py-1 rounded-md border font-bold outline-none transition-all cursor-pointer ${STATUS_COLORS[task.status]}`}
        >
          <option value="Đang thực hiện">Đang thực hiện</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Trễ">Trễ</option>
          <option value="Chờ phản hồi">Chờ phản hồi</option>
          <option value="Tạm dừng">Tạm dừng</option>
        </select>
      </td>
      <td className="py-3 px-4 whitespace-nowrap">
        <div className="flex flex-col text-[10px]">
          <span className="text-slate-400">Due: <span className="text-slate-700 font-mono font-bold">{task.dueDate}</span></span>
          {task.extraReason && (
            <span className="text-rose-500 font-medium mt-1">⚠ {task.extraReason}</span>
          )}
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="text-[11px] text-slate-500 italic max-w-[120px] truncate" title={task.note}>
          {task.note || '-'}
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
