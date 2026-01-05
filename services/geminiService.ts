
import { GoogleGenAI, Type } from "@google/genai";
import { Project, AIInsight } from "../types";

export const analyzeProjects = async (projects: Project[]): Promise<AIInsight> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Prepare a concise summary of the task data for the AI
  const summaryData = projects.map(p => ({
    projectName: p.name,
    code: p.code,
    tasks: p.tasks.map(t => ({
      req: t.reqId,
      info: t.info,
      dev: t.employee,
      progress: t.progress,
      status: t.status,
      deadline: t.dueDate,
      note: t.note,
      reason: t.extraReason
    }))
  }));

  const prompt = `
    Bạn là một Senior Business Analyst chuyên về quản lý dự án phần mềm.
    Dưới đây là dữ liệu tiến độ công việc của team Dev. 
    Hãy phân tích các dự án bị Trễ hoặc Đang thực hiện nhưng tiến độ thấp so với Deadline.
    Chỉ ra các "bottleneck" (nút thắt cổ chai) dựa trên phân bổ nhân sự (EMP) và thông tin ghi chú.

    Dữ liệu (JSON):
    ${JSON.stringify(summaryData)}

    Yêu cầu: 
    1. Tổng hợp sức khỏe dự án (Tiếng Việt).
    2. Liệt kê các rủi ro cụ thể (ví dụ: Task X trễ do lý do Y).
    3. Đưa ra 3-5 khuyến nghị hành động để BA xử lý với Team Dev.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          risks: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          recommendations: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          }
        },
        required: ["summary", "risks", "recommendations"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return {
      summary: "Không thể phân tích dữ liệu lúc này.",
      risks: [],
      recommendations: []
    };
  }
};
