import { useState } from "react";

type TodoList = {
  name: string;
  remark: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
};

const TodoList = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <List
        name={"shop"}
        remark="done"
        onChange={setIsChecked}
        checked={isChecked}
      />
    </div>
  );
};

const List = ({ name, remark, checked, onChange }: TodoList) => {
  return (
    <div className="flex gap-5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label htmlFor="text">{name}</label>
      <p>{remark}</p>
    </div>
  );
};
export default TodoList;

/* future!!
เป้าหมายของคุณ:
แม้ว่าเงินจะเข้าบัญชีร้านค้าโดยตรง (ไม่ผ่าน menuX) แต่ menuX ก็ต้องการรู้ว่า Customer ได้ “ชำระเงินเรียบร้อยแล้ว” เพื่ออัปเดตสถานะในระบบของตัวเอง เช่น:

แสดงว่าออเดอร์ "จ่ายแล้ว"

ปิดไม่ให้ลูกค้าแก้ไขออเดอร์

แจ้งร้านให้เตรียมของ ฯลฯ

✅ แนวทางแนะนำที่เหมาะกับระบบ “ร้านรับเงินเอง” แต่ menuX ต้องรู้สถานะการจ่าย
✅ ใช้ Webhook Callback จากฝั่งร้าน → menuX
Flow แบบมืออาชีพ และยังไม่มีค่าใช้จ่าย:

ลูกค้าสั่งผ่าน menuX → menuX ส่งออเดอร์ไปยัง ร้านค้า ผ่าน API

ร้านค้าสร้าง QR และแสดงแก่ลูกค้า

ลูกค้าชำระเงิน → ร้าน “ตรวจสอบเงินเข้า” ได้เอง (วิธีใดก็ได้ เช่น LINE Notify, เช็คบัญชี)

เมื่อร้านตรวจสอบว่า “เงินเข้าแล้ว” → ร้านยิง Webhook ไปที่ menuX เช่น:

🧠 ระบบนี้มีข้อดี:
เงินไม่ผ่าน menuX → ร้านได้เต็ม

menuX รู้สถานะเรียลไทม์ → อัปเดต UI, แจ้งลูกค้า, ปิดออเดอร์

ขยายได้ง่าย → เพิ่มร้านกี่ร้านก็ได้ ขอแค่แต่ละร้านมี API callback กลับมา


✅ สรุป 
ระบบ ทำอะไร อยู่ฝั่งไหน
ร้านค้า รับเงินเข้าบัญชี ฝั่งร้าน
ร้านค้า ตรวจสอบยอดเงินเข้า ฝั่งร้าน
ร้านค้า แจ้ง menuX ผ่าน Webhook ฝั่งร้าน
menuX รับสถานะการจ่ายเงิน ฝั่ง menuX
menuX อัปเดตสถานะ order ฝั่ง menuX

🧱 โครงสร้าง Flow ที่เราจะเขียน


✅ 1. ฝั่ง menuX
ส่ง order ไปยังร้าน

ส่ง callback_url ไปด้วย เพื่อให้ร้านเรียกกลับเมื่อเงินเข้า

✅ 2. ฝั่งร้านค้า
รับ order

ตรวจสอบยอดเงินเข้า (สมมุติว่าใช้ LINE Notify)

เมื่อพบยอดเข้า → POST กลับมาที่ menuX (ตาม callback_url)

*/

/* 

notification 
https://developers.line.biz/en/docs/liff/overview/

*/
