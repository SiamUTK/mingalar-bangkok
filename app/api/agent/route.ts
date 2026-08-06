import { NextResponse } from "next/server";
import { Agent, Runner, tool } from "@openai/agents";
import { z } from "zod";

// 1. นิยาม Tool ตัวอย่างสำหรับ Agent
const searchDirectoryTool = tool({
  name: "search_directory",
  description: "ค้นหาข้อมูลธุรกิจหรือบริการในระบบ Mingalar Bangkok",
  parameters: z.object({
    query: z.string().describe("คำค้นหา เช่น ร้านอาหาร, โรงแรม, วีซ่า"),
  }),
  execute: async ({ query }) => {
    return `ผลการค้นหาสำหรับ "${query}": พบ 5 รายการที่เกี่ยวข้อง khrãb`;
  },
});

// 2. สร้าง AI Agent
const mingalarAgent = new Agent({
  name: "Mingalar Assistant",
  instructions:
    "คุณคือผู้ช่วย AI ประจำแพลตฟอร์ม Mingalar Bangkok คอยแนะนำและช่วยค้นหาข้อมูลธุรกิจ วีซ่า และบริการต่างๆ ตอบด้วยภาษาที่เป็นกันเองและสุภาพ khrãb!",
  model: process.env.OPENAI_MODEL || "gpt-4o",
  tools: [searchDirectoryTool],
});

// 3. API Route Handler (POST)
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // สร้าง Instance ของ Runner แล้วสั่งรัน Agent
    const runner = new Runner();
    const result = await runner.run(mingalarAgent, message);

    // ดึงข้อความตอบกลับจาก Agent Runner
    return NextResponse.json({
      success: true,
      output: result.finalOutput || result,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Agent Error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
