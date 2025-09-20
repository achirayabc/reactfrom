import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { mpSchema } from "./types";
import type { MP } from "./types";

type MPFormProps = {
  onSubmit: (data: MP) => void;
  initialData?: MP;
  isEditing?: boolean;
};

export default function MPForm({ onSubmit, initialData, isEditing }: MPFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MP>({
    resolver: zodResolver(mpSchema),
    defaultValues: initialData || {},
  });

  const submitHandler: SubmitHandler<MP> = (data) => {
    onSubmit(data);
    if (!isEditing) reset(); // เคลียร์ฟอร์มถ้าเพิ่มใหม่
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mb-8 space-y-4">
      <div>
        <label>คำนำหน้า</label>
        <input {...register("prefix")} className="w-full p-2 border rounded" />
        {errors.prefix && <p className="text-red-500">{errors.prefix.message}</p>}
      </div>

      <div>
        <label>ชื่อ</label>
        <input {...register("firstName")} className="w-full p-2 border rounded" />
        {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
      </div>

      <div>
        <label>นามสกุล</label>
        <input {...register("lastName")} className="w-full p-2 border rounded" />
        {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
      </div>

      <div>
        <label>URL รูปภาพ</label>
        <input {...register("photoUrl")} className="w-full p-2 border rounded" placeholder="ใส่ URL ของรูปภาพ" />
        {/** แสดง preview */}
        {initialData?.photoUrl && <img src={initialData.photoUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
      </div>

      <div>
        <label>ประวัติการทำงาน</label>
        <textarea {...register("workHistory")} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>ผลงานที่ผ่านมา</label>
        <textarea {...register("achievements")} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>ตำแหน่งรัฐมนตรี</label>
        <input {...register("ministerPosition")} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>กระทรวง</label>
        <input {...register("ministry")} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>สังกัดพรรคการเมือง</label>
        <input {...register("party")} className="w-full p-2 border rounded" />
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        {isEditing ? "แก้ไข" : "เพิ่ม"}
      </button>
    </form>
  );
}
