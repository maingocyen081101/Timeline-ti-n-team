
export type Status = 'Đang thực hiện' | 'Hoàn thành' | 'Trễ' | 'Chờ phản hồi' | 'Tạm dừng';

export interface Task {
  id: string;
  reqId: string;
  phase: string;
  info: string;
  employee: string;
  support: string;
  startDate: string;
  dueDate: string;
  progress: number; // 1-10 scale
  extraDays: number;
  extraReason: string;
  status: Status;
  note: string;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  tasks: Task[];
}

export interface AIInsight {
  summary: string;
  risks: string[];
  recommendations: string[];
}
