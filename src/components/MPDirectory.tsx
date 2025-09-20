import { useState } from "react";
import type { MP } from "./types";
import MPForm from "./MPForm";
import MPTable from "./MPTable";

const initialMembers: MP[] = [
  {
    prefix: "นางสาว",
    firstName: "กมนทรรศน์",
    lastName: "กิตติสุนทรสกุล",
    photoUrl: "https://prod-mfp-imgsrv.tillitsdone.com/uploads/medium_2_1_0c9898e3eb.jpg",
    workHistory: "รองประธานคณะกรรมาธิการ",
    achievements: "เสนอร่างพระราชบัญญัติ",
    ministerPosition: "สภาผู้แทนราษฎรแบบแบ่งเขต",
    ministry: "",
    party: "พรรคประชาชน",
  },
  {
    prefix: "นาย",
    firstName: "กมลศักดิ์",
    lastName: "ลีวาเมาะ",
    photoUrl: "https://sheets.wevis.info/download/noco/They-Work-For-Us/People/Images/กมลศักดิ์-ลีวาเมาะ.jpg",
    workHistory: "คณะกรรมาธิการวิสามัญเพื่อพิจารณาศึกษาและเสนอแนวทางการส่งเสริมกระบวนการ",
    achievements: "",
    ministerPosition: "สภาผู้แทนราษฎรแบบแบ่งเขต",
    ministry: "",
    party: "พรรคประชาชาติ",
  },
  {
    prefix: "นาย",
    firstName: "กรวีร์",
    lastName: "ปริศนานันทกุล",
    photoUrl: "https://hris.parliament.go.th/manage/fileupload/pic_new_public/3e6ad8230dae020e0f92c93307da8fd1.jpg",
    workHistory: "คณะกรรมาธิการคณะกรรมาธิการการปกครองประธานคณะกรรมาธิการ",
    achievements: "",
    ministerPosition: "สภาผู้แทนราษฎรแบบแบ่งเขต",
    ministry: "",
    party: "พรรคภูมิใจไทย",
  },
  {
    prefix: "นาย",
    firstName: "กรวีร์",
    lastName: "สาราคำ",
    photoUrl: "https://ptpcandidate.b-cdn.net/pics/แบ่งเขต/อุดรธานี/กรวีร์-สาราคำ.webp",
    workHistory: "",
    achievements: "ร่างพระราชบัญญัติสภาผู้แทนนิสิตนักศึกษาแห่งประเทศไทย",
    ministerPosition: "สภาผู้แทนราษฎรแบบแบ่งเขต",
    ministry: "",
    party: "พรรคเพื่อไทย",
  },
  {
    prefix: "นาย",
    firstName: "กระแสร์",
    lastName: "ตระกูลพรพงศ์",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz6-pxuGozDaK05Y7TfpV7Ojtlal1dzIWCZA&s",
    workHistory: "",
    achievements: "ร่างพระราชบัญญัติส่งเสริมการลดก๊าซเรือนกระจกและคาร์บอนเครดิต",
    ministerPosition: "สภาผู้แทนราษฎรแบบแบ่งเขต",
    ministry: "",
    party: "พรรคพลังประชารัฐ",
  },
  {
    prefix: "นาย",
    firstName: "กฤดิทัช",
    lastName: "แสงธนโยธิน",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhGT7coeVEruexyfxAwxvvigtJB1jxqOR3w&s",
    workHistory: "",
    achievements: "คณะกรรมาธิการวิสามัญพิจารณาร่างพระราชบัญญัติการรายงานการปล่อยและการเคลื่อนย้ายสารมลพิษสู่สิ่งแวดล้อม",
    ministerPosition: "สภาผู้แทนราษฎรแบบแบ่งเขต",
    ministry: "",
    party: "พรรค กล้าธรรม",
  },
  {
    prefix: "นาย",
    firstName: "กัณวีร์",
    lastName: "สืบแสง",
    photoUrl: "https://www.tnnthailand.com/static/images/cb10865f-6232-4633-b757-be0bdcb98805.jpg",
    workHistory: "ร่างพระราชบัญญัติป้องกันและปราบปรามการกระทำความผิดร้ายแรงต่อสันติภาพและมนุษยชาติ ",
    achievements: "",
    ministerPosition: "สภาผู้แทนราษฎรแบบแบ่งเขต",
    ministry: "",
    party: "พรรคเป็นธรรม",
  },
  {
    prefix: "นาย",
    firstName: "กาญจน์",
    lastName: "ตั้งปอง",
    photoUrl: "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5nLxAKQXhI9XYef71AKYH8RDqPtEUikYqoYTfzZ3r1WhdNSF5fF.jpg",
    workHistory: "",
    achievements: "คณะกรรมาธิการวิสามัญพิจารณาร่างพระราชบัญญัติคุ้มครองแรงงาน",
    ministerPosition: "สภาผู้แทนราษฎรแบบแบ่งเขต",
    ministry: "",
    party: "พรรคพัฒนา",
  },
  {
    prefix: "นาย",
    firstName: "จุติ",
    lastName: "ไกรฤกษ์",
    photoUrl: "https://www.thaigov.go.th/uploads/thumbnail/cabinet/2020/08/286_20200812131349000000.jpg",
    workHistory: "",
    achievements: "คณะกรรมาธิการวิสามัญพิจารณาร่างพระราชบัญญัติแก้ไขเพิ่มเติมประมวลกฎหมายแพ่งและพาณิชย์",
    ministerPosition: "สภาผู้แทนราษฎรแบบแบ่งเขต",
    ministry: "",
    party: "พรรครวมไทยสร้างชาติ",
  }

];

export default function MPDirectory() {
  const [members, setMembers] = useState<MP[]>(initialMembers);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = (data: MP) => {
    if (editIndex !== null) {
      const updated = [...members];
      updated[editIndex] = data;
      setMembers(updated);
      setEditIndex(null);
    } else {
      setMembers((prev) => [...prev, data]);
    }
  };

  const handleEdit = (index: number) => setEditIndex(index);
  const handleDelete = (index: number) =>
    setMembers(members.filter((_, i) => i !== index));
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 space-y-8">
      <div className="max-w-5xl w-full bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          ทำเนียบรายชื่อสมาชิกสภาผู้แทนราษฎร
        </h1>
  
        <MPTable
          members={members}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
  
      <div className="max-w-5xl w-full bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          เพิ่มสมาชิกสภาผู้แทนราษฎร
        </h1>
  
        <MPForm
          onSubmit={handleSubmit}
          initialData={editIndex !== null ? members[editIndex] : undefined}
          isEditing={editIndex !== null}
        />
      </div>
    </div>
  );
}