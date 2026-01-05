
import { Project, Status } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    code: '#46034',
    name: 'TOM-BHQ-HỒ SƠ BỆNH ÁN (I-D3)',
    tasks: [
      {
        id: 't1_1', reqId: 'A01', phase: 'Phase 1: M-M, M-V-M', 
        info: 'Timeline, phân tích và thiết kế database. Thu thập thông tin từ các bên liên quan...',
        employee: 'Quang TPCN', support: 'Hạt PM, BA, QC',
        startDate: '2025-12-11', dueDate: '2025-12-18', progress: 7, 
        extraDays: 0, extraReason: '', status: 'Đang thực hiện', note: 'Dự án đang chạy'
      },
      {
        id: 't1_2', reqId: 'CHSBA010', phase: 'M-M', 
        info: 'Quản lý các thông tin săn hàng phía local và ship đến kho.',
        employee: 'Sơn FE', support: 'Khôi BE',
        startDate: '2025-12-11', dueDate: '2025-12-13', progress: 5, 
        extraDays: 0, extraReason: '', status: 'Đang thực hiện', note: ''
      },
      {
        id: 't1_3', reqId: 'CHSBA011', phase: 'M-M', 
        info: 'Phân loại các mặt hàng vào kho thông qua mã hàng.',
        employee: 'Sơn FE', support: 'Khôi BE',
        startDate: '2025-12-13', dueDate: '2025-12-15', progress: 2, 
        extraDays: 0, extraReason: '', status: 'Đang thực hiện', note: ''
      },
      {
        id: 't1_15', reqId: 'CHSBA023', phase: 'M-V-M', 
        info: 'Quản lý thông tin vận chuyển hàng về VN (Logistic)',
        employee: 'Sơn FE', support: 'Khôi BE',
        startDate: '2025-12-22', dueDate: '2025-12-23', progress: 0, 
        extraDays: 0, extraReason: '', status: 'Đang thực hiện', note: ''
      }
    ]
  },
  {
    id: 'p2',
    code: '#46840',
    name: 'TOOLS SENSOR FACEBOOK - EBAY - OFFERUP (I-W4)',
    tasks: [
      {
        id: 't2_32', reqId: 'A01', phase: 'Meta (phase1)', 
        info: 'Xác định phạm vi Phase 1 (MVP)',
        employee: 'Phong BE, FE', support: '',
        startDate: '2025-12-01', dueDate: '2025-12-01', progress: 10, 
        extraDays: 0, extraReason: '', status: 'Hoàn thành', note: 'Dự án đang chạy'
      },
      {
        id: 't2_38', reqId: 'CM003', phase: 'Meta (phase1)', 
        info: 'BrowserPool',
        employee: 'Phong BE, FE', support: 'Khôi BE',
        startDate: '2025-12-15', dueDate: '2025-12-22', progress: 4, 
        extraDays: 0, extraReason: 'Thiếu tài nguyên proxy', status: 'Trễ', note: ''
      },
      {
        id: 't2_53', reqId: 'CE006', phase: 'Ebay', 
        info: 'Frontend Dashboard (ReactJS)',
        employee: 'Phong BE, FE', support: 'Sơn FE',
        startDate: '2025-12-25', dueDate: '2025-12-30', progress: 0, 
        extraDays: 0, extraReason: '', status: 'Tạm dừng', note: ''
      }
    ]
  },
  {
    id: 'p3',
    code: '#45428',
    name: 'TOM-BHQ-PHẦN MỀM SUPPORT BE (I-W7)',
    tasks: [
      {
        id: 't3_64', reqId: 'CSB001', phase: 'Update', 
        info: 'Driver thêm cột giá, chi phí pickup, đổi km -> miles...',
        employee: 'Khôi BE', support: 'Hạt PM, BA, QC',
        startDate: '2025-12-11', dueDate: '2025-12-11', progress: 10, 
        extraDays: 0, extraReason: '', status: 'Hoàn thành', note: ''
      },
      {
        id: 't3_67', reqId: 'CSB011', phase: 'Update', 
        info: 'Thử nghiệm các hình ảnh clock tìm kiếm trên mạng để test',
        employee: 'Khôi BE', support: 'Hạt PM, BA, QC',
        startDate: '2025-12-15', dueDate: '2025-12-15', progress: 6, 
        extraDays: 0, extraReason: '', status: 'Đang thực hiện', note: ''
      }
    ]
  },
  {
    id: 'p4',
    code: '#43908',
    name: 'TOM-BHQ-DỰ ÁN CHATBOT TỔNG CHO HQA (I-D3)',
    tasks: [
      {
        id: 't4_75', reqId: 'CC001', phase: 'Yêu cầu 1', 
        info: 'Gợi ý câu hỏi tự động (BE) - Migration & Model',
        employee: 'Hạt PM, BA, QC', support: '',
        startDate: '2025-11-20', dueDate: '2025-11-25', progress: 10, 
        extraDays: 0, extraReason: '', status: 'Hoàn thành', note: 'Đã hoàn thành'
      },
      {
        id: 't4_77', reqId: 'CC003', phase: 'Yêu cầu 2', 
        info: 'Ghi lịch sử và phân loại câu hỏi (BE)',
        employee: 'Hạt PM, BA, QC', support: '',
        startDate: '2025-12-01', dueDate: '2025-12-05', progress: 3, 
        extraDays: 1, extraReason: 'Tăng cường bảo mật schema', status: 'Trễ', note: ''
      }
    ]
  },
  {
    id: 'p5',
    code: '47118',
    name: 'TOM-BHQ-HQSING MKT AUTOMATION (I-D3)',
    tasks: [
      {
        id: 't5_95', reqId: 'AA001', phase: 'Phân tích', 
        info: 'Phân tích yêu cầu chức năng và insight khách hàng',
        employee: 'Quang TPCN', support: 'Hạt PM, BA, QC',
        startDate: '2025-11-25', dueDate: '2025-11-30', progress: 10, 
        extraDays: 0, extraReason: '', status: 'Hoàn thành', note: 'Chờ phản hồi'
      },
      {
        id: 't5_98', reqId: 'CA001', phase: 'Tuần 1', 
        info: 'Xây dựng nền tảng và chạy flow E2E bản nháp',
        employee: 'Quang TPCN', support: 'Teams',
        startDate: '2025-12-15', dueDate: '2025-12-22', progress: 2, 
        extraDays: 0, extraReason: '', status: 'Đang thực hiện', note: ''
      }
    ]
  }
];

export const STATUS_COLORS: Record<Status, string> = {
  'Đang thực hiện': 'bg-blue-100 text-blue-700 border-blue-200',
  'Hoàn thành': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Trễ': 'bg-rose-100 text-rose-700 border-rose-200',
  'Chờ phản hồi': 'bg-amber-100 text-amber-700 border-amber-200',
  'Tạm dừng': 'bg-slate-100 text-slate-700 border-slate-200',
};
