import type { Metadata } from "next";
import CartClient from "@/components/CartClient";

export const metadata: Metadata = {
  title: "سلة الطلبات | مطعم جيمي كوك GIMMY COOK",
  description:
    "راجع سلة طلباتك من مطعم جيمي كوك (GIMMY COOK)، احتسب نقاط مكافآت GIMMY POINTS، وأرسل طلبك مباشرة عبر واتساب لخدمة دليفري 24 ساعة.",
};

export default function CartPage() {
  return <CartClient />;
}
