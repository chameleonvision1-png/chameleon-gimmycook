export const formatPrice = (n: number) => `${n.toLocaleString("ar-EG")} ج.م`;

/**
 * GIMMY POINTS Loyalty Formula:
 * Every 100 EGP = 5 Points, and 5 Points = 5 EGP reward credit.
 */
export const calcGimmyPoints = (subtotal: number): number =>
  Math.max(0, Math.floor(subtotal / 100) * 5);

export const statusLabels: Record<string, string> = {
  new: "جديد",
  preparing: "جاري التحضير",
  delivering: "خرج للتوصيل",
  done: "مكتمل",
  cancelled: "ملغي",
  contacted: "تم التواصل",
  confirmed: "مؤكد",
};

export const paymentMethods = [
  "الدفع عند الاستلام (كاش)",
  "إنستاباي (InstaPay)",
  "محفظة إلكترونية (فودافون كاش / اتصالات كاش)",
];

export const occasionTypes = [
  "طلب جماعي أو لمة عيلة (بيتزا وفطير وطواجن)",
  "وليمة مشويات شرقية وأطباق أرز للتجمعات",
  "توريد وجبات شركات ومكاتب وجامعات بالقاهرة الجديدة",
  "حفلة عيد ميلاد أو مناسبة خاصة",
  "تعاقد غداء دوري للموظفين والطلاب",
  "استفسار أو اقتراح لإدارة GIMMY COOK",
];
