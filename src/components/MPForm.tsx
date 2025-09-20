import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mpSchema } from "./types";
import type { MP } from "./types";

type MPFormProps = {
  onSubmit: (data: MP) => void;
  initialData?: MP;
  isEditing?: boolean;
};

type MPFormValues = MP & {
  photoFile?: FileList; // เพิ่มสำหรับ input file
};

export default function MPForm({ onSubmit, initialData, isEditing }: MPFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<MPFormValues>({
    resolver: zodResolver(mpSchema),
    defaultValues: initialData || {},
  });

  const [preview, setPreview] = useState<string>(initialData?.photoUrl || "");

  const photoFile = watch("photoFile"); // watch file input

  useEffect(() => {
    if (photoFile && photoFile[0]) {
      const url = URL.createObjectURL(photoFile[0]);
      setPreview(url);
    }
  }, [photoFile]);

  const submitHandler = (data: MPFormValues) => {
    if (data.photoFile && data.photoFile[0]) {
      data.photoUrl = URL.createObjectURL(data.photoFile[0]);
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mb-8 space-y-4">
      <div>
        <label className="block mb-1 font-medium">คำนำหน้า</label>
        <input {...register("prefix")} className="w-full p-2 border rounded" />
        {errors.prefix && <p className="text-red-500 text-sm">{errors.prefix.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">ชื่อ</label>
        <input {...register("firstName")} className="w-full p-2 border rounded" />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">นามสกุล</label>
        <input {...register("lastName")} className="w-full p-2 border rounded" />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">รูปถ่าย</label>
        <input
          type="file"
          accept="image/*"
          {...register("photoFile")}
          className="w-full p-2 border rounded"
        />
        {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
      </div>

      <div>
        <label className="block mb-1 font-medium">ประวัติการทำงาน</label>
        <textarea {...register("workHistory")} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block mb-1 font-medium">ผลงานที่ผ่านมา</label>
        <textarea {...register("achievements")} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block mb-1 font-medium">ตำแหน่งรัฐมนตรี</label>
        <input {...register("ministerPosition")} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block mb-1 font-medium">กระทรวง</label>
        <input {...register("ministry")} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block mb-1 font-medium">สังกัดพรรคการเมือง</label>
        <input {...register("party")} className="w-full p-2 border rounded" />
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        {isEditing ? "แก้ไข" : "เพิ่ม"}
      </button>
    </form>
  );
}
