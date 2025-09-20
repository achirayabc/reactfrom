import { z } from "zod";

// Zod schema สำหรับ validate ฟอร์ม
export const mpSchema = z.object({
  prefix: z.string().min(1, "กรุณากรอกคำนำหน้า"),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  photoUrl: z.string().url("ต้องเป็น URL ของรูปภาพ"),
  workHistory: z.string().optional(),
  achievements: z.string().optional(),
  ministerPosition: z.string().optional(),
  ministry: z.string().optional(),
  party: z.string().min(1, "กรุณาระบุพรรคการเมือง"),
});

export type MP = z.infer<typeof mpSchema>;
