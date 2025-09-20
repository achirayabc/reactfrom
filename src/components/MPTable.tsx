import type { MP } from "./types";

interface Props {
  members: MP[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function MPTable({ members, onEdit, onDelete }: Props) {
  if (members.length === 0)
    return <p className="text-gray-600 mt-4 text-center">ยังไม่มีข้อมูล</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden text-black">
        <thead className="bg-blue-100">
          <tr className="text-black">
            <th className="p-3 border">รูป</th>
            <th className="p-3 border">ชื่อ-นามสกุล</th>
            <th className="p-3 border">ตำแหน่ง / กระทรวง</th>
            <th className="p-3 border">พรรค</th>
            <th className="p-3 border">ประวัติ / ผลงาน</th>
            <th className="p-3 border">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, i) => (
            <tr key={i} className="hover:bg-gray-50 transition text-black">
              <td className="p-2 border text-center">
                <a href={m.photoUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={m.photoUrl}
                    alt="photo"
                    className="w-12 h-12 rounded-full object-cover mx-auto"
                  />
                </a>
              </td>
              <td className="p-2 border">
                {m.prefix} {m.firstName} {m.lastName}
              </td>
              <td className="p-2 border">
                {m.ministerPosition && <div>{m.ministerPosition}</div>}
                {m.ministry && <div>{m.ministry}</div>}
              </td>
              <td className="p-2 border">{m.party}</td>
              <td className="p-2 border text-sm">
                {m.workHistory && <div>{m.workHistory}</div>}
                {m.achievements && <div className="mt-1">{m.achievements}</div>}
              </td>
              <td className="p-2 border text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(i)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition shadow-sm"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => onDelete(i)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm"
                  >
                    ลบ
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
