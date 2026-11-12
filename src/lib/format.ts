export const formatPrice = (n: number) => `${n.toLocaleString("ar-EG")} ج.م`;

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
