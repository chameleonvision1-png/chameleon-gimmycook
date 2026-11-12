import type { DB, Product, ProductAddon, ProductSize, Taste } from "./types";

const sz = (list: [string, number][]): ProductSize[] =>
  list.map(([label, price], i) => ({ id: `s${i}`, label, price }));

const ad = (list: [string, number][]): ProductAddon[] =>
  list.map(([label, price], i) => ({ id: `a${i}`, label, price }));

export const pizzaFeteerAddons = ad([
  ["إضافة جبنة موتزاريلا دبل", 30],
  ["أطراف محشية جبنة كريمي", 35],
  ["صوص رانش كريمي", 20],
  ["صوص شيدر غني", 20],
  ["صوص باربكيو مدخن", 15],
  ["هالبينو حار", 12],
]);

export const pastaTagineAddons = ad([
  ["طبقة موتزاريلا فرن إضافية", 28],
  ["قطع فراخ مشوية إضافية", 35],
  ["مشروم فريش", 20],
  ["خبز ثوم بالجبنة (قطعتين)", 25],
]);

export const mealGrillAddons = ad([
  ["أرز بسمتي مبهر إضافي", 30],
  ["باكيت بطاطس مقرمشة", 25],
  ["علبة صوص شيدر", 20],
  ["علبة طحينة أو ثومية", 15],
  ["خبز طازج إضافي", 10],
]);

let pid = 0;
const p = (
  categoryId: string,
  nameAr: string,
  nameEn: string,
  descriptionAr: string,
  image: string,
  sizes: ProductSize[],
  opts: Partial<Product> & { taste?: Taste } = {},
): Product => ({
  id: `p${++pid}`,
  categoryId,
  nameAr,
  nameEn,
  descriptionAr,
  image,
  sizes,
  addons: [],
  taste: opts.taste ?? "savory",
  isAvailable: true,
  isBestSeller: false,
  isNew: false,
  forFamily: false,
  unavailableBranches: [],
  ...opts,
});

const prodImg = (n: string) => `/images/products/${n}.webp`;

export function buildSeed(): DB {
  pid = 0;
  const inDays = (d: number) => new Date(Date.now() + d * 86400000).toISOString();

  const products: Product[] = [
    // ==================== 1. البيتزا (PIZZA) ====================
    p(
      "pizza",
      "بيتزا جيمي سوبريم ميكس",
      "GIMMY SUPREME PIZZA",
      "عجينة إيطالية مخبوزة طازجاً بصلصة الطماطم الإيطالية، بيبروني بقري، قطع فراخ متبلة، فلفل ألوان، مشروم، زيتون أسود، وموتزاريلا غنية.",
      prodImg("pizza-supreme"),
      sz([
        ["وسط M", 145],
        ["كبير L", 175],
        ["عائلي XL", 210],
      ]),
      {
        isBestSeller: true,
        badge: "الأكثر مبيعاً",
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "pizza",
      "بيتزا تشيكن رانش",
      "CHICKEN RANCH PIZZA",
      "شرائح صدور فراخ مشوية مع صوص الرانش الكريمي الأصلي، جبنة موتزاريلا سايحة، فلفل حلو، وزيتون.",
      prodImg("pizza-chicken-ranch"),
      sz([
        ["وسط M", 150],
        ["كبير L", 185],
        ["عائلي XL", 220],
      ]),
      {
        isBestSeller: true,
        badge: "توقيع جيمي كوك",
        allergens: "جلوتين القمح • ألبان • بيض (صوص رانش)",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "pizza",
      "بيتزا مارجريتا إيطاليانو",
      "CLASSIC MARGHERITA PIZZA",
      "صلصة طماطم إيطالية بالريحان الطازج وزيت الزيتون مع طبقة كثيفة من جبنة الموتزاريلا الطبيعية.",
      prodImg("pizza-margherita"),
      sz([
        ["وسط M", 110],
        ["كبير L", 140],
        ["عائلي XL", 170],
      ]),
      {
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "pizza",
      "بيتزا بيبروني دبل جبن",
      "DOUBLE PEPPERONI PIZZA",
      "شرائح بيبروني بقري مدخن مقرمش على الحواف مع دبل جبنة موتزاريلا وصلصة جيمي كوك الخاصة.",
      prodImg("pizza-pepperoni"),
      sz([
        ["وسط M", 145],
        ["كبير L", 180],
        ["عائلي XL", 215],
      ]),
      {
        isBestSeller: true,
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "pizza",
      "بيتزا كواترو فورماجيو (مشكل جبن)",
      "FOUR CHEESE PIZZA",
      "مزيج غني من أربع أنواع جبن (موتزاريلا، شيدر أحمر، رومي معتق، وجبنة كريمي) لعشاق الجبنة السايحة.",
      prodImg("pizza-four-cheese"),
      sz([
        ["وسط M", 140],
        ["كبير L", 175],
        ["عائلي XL", 210],
      ]),
      {
        badge: "غرقانة جبنة",
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "pizza",
      "بيتزا عشاق اللحوم (ميت لافرز)",
      "MEAT LOVERS PIZZA",
      "لحم مفروم متبل، سجق شرقي، بسطرمة بلدي، وبيبروني مع فلفل ألوان وموتزاريلا ذائبة.",
      prodImg("pizza-meat-lovers"),
      sz([
        ["وسط M", 155],
        ["كبير L", 190],
        ["عائلي XL", 230],
      ]),
      {
        forFamily: true,
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "pizza",
      "بيتزا باربكيو تشيكن",
      "BBQ CHICKEN PIZZA",
      "قطع دجاج مشوي متبلة بصوص الباربكيو المدخن مع بصل مكرمل وفلفل ألوان وموتزاريلا.",
      prodImg("pizza-chicken-ranch"),
      sz([
        ["وسط M", 148],
        ["كبير L", 182],
        ["عائلي XL", 218],
      ]),
      {
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "pizza",
      "بيتزا خضار فريش جاردن",
      "FRESH GARDEN VEGGIE PIZZA",
      "مشروم طازج، فلفل ألوان، طماطم شيري، زيتون أسود، وذرة حلوة مع جبنة موتزاريلا وأوريجانو.",
      prodImg("pizza-margherita"),
      sz([
        ["وسط M", 118],
        ["كبير L", 148],
        ["عائلي XL", 178],
      ]),
      {
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pizzaFeteerAddons,
      },
    ),

    // ==================== 2. الفطير (FETEER) ====================
    p(
      "feteer",
      "فطير شرقي فراخ وجبن",
      "CHICKEN & CHEESE ORIENTAL FETEER",
      "فطير مورق بالسمن البلدي محشو شرائح فراخ متبلة، ميكس جبن موتزاريلا ورومي وشيدر، فلفل ألوان وزيتون مخلي (وش بيتزا اختياري).",
      prodImg("feteer-chicken-cheese"),
      sz([
        ["وسط M", 155],
        ["كبير L", 182],
        ["عائلي XL", 220],
      ]),
      {
        isBestSeller: true,
        badge: "نجم قسم الفطير",
        allergens: "جلوتين القمح • ألبان وسمن",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "feteer",
      "فطير مشكل لحوم شرقي",
      "MIXED MEAT ORIENTAL FETEER",
      "فطيرة شرقية مورقة محشوة لحم معصج، سجق بلدي، وبسطرمة مع الجبنة الموتزاريلا والطماطم والفلفل والزيتون.",
      prodImg("feteer-mixed-meat"),
      sz([
        ["وسط M", 165],
        ["كبير L", 195],
        ["عائلي XL", 235],
      ]),
      {
        isBestSeller: true,
        forFamily: true,
        allergens: "جلوتين القمح • ألبان وسمن",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "feteer",
      "فطير سجق وكيري بالموتزاريلا",
      "SAUSAGE & KIRI CHEESE FETEER",
      "سجق شرقي متبل على الجريل مع مكعبات الجبنة الكيري الكريمية والموتزاريلا السايحة داخل رقائق الفطير الذهبية.",
      prodImg("feteer-sausage-kiry"),
      sz([
        ["وسط M", 160],
        ["كبير L", 190],
        ["عائلي XL", 225],
      ]),
      {
        badge: "طعم خطير",
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "feteer",
      "فطير بسطرمة وميكس جبن",
      "PASTRAMI & MIXED CHEESE FETEER",
      "شرائح بسطرمة بلدي فاخرة مع جبنة كيري وموتزاريلا ورومي وفلفل أخضر وزيتون في عجينة فطير هشة ومقرمشة.",
      prodImg("feteer-mixed-meat"),
      sz([
        ["وسط M", 160],
        ["كبير L", 190],
        ["عائلي XL", 225],
      ]),
      {
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "feteer",
      "فطير حادق مشكل جبن وموتزاريلا",
      "CHEESE LOVERS SAVORY FETEER",
      "رباعي الجبن الذائبة (موتزاريلا، كيري، رومي، شيدر) مع شرائح الزيتون والفلفل وحبة البركة.",
      prodImg("feteer-cheese-lovers"),
      sz([
        ["وسط M", 135],
        ["كبير L", 165],
        ["عائلي XL", 195],
      ]),
      {
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pizzaFeteerAddons,
      },
    ),
    p(
      "feteer",
      "فطيرة حلو قشطة وعسل ومكسرات",
      "CREAM, HONEY & NUTS SWEET FETEER",
      "فطير مورق ذهبي مغطى بالقشطة البلدي الطازجة وعسل النحل والسكر البودرة والمكسرات المحمصة للتحلية.",
      prodImg("feteer-sweet-cream"),
      sz([
        ["وسط M", 120],
        ["كبير L", 150],
      ]),
      {
        taste: "sweet",
        isNew: true,
        badge: "حلو جيمي كوك",
        allergens: "جلوتين القمح • ألبان • مكسرات",
      },
    ),

    // ==================== 3. المكرونة (PASTA) ====================
    p(
      "pasta",
      "مكرونة تشيكن ألفريدو وايت صوص",
      "CHICKEN ALFREDO PASTA",
      "مكرونة فيتوتشيني أو بينا غرقانة في الوايت صوص الكريمي الغني مع شرائح الفراخ المشوية والمشروم الفريش والبارميزان.",
      prodImg("pasta-alfredo"),
      sz([
        ["حجم فردي R", 135],
        ["حجم لارج L", 165],
      ]),
      {
        isBestSeller: true,
        badge: "الأكثر طلباً",
        allergens: "جلوتين القمح • ألبان وكريمة",
        addons: pastaTagineAddons,
      },
    ),
    p(
      "pasta",
      "مكرونة نجرسكو فراخ بالموتزاريلا",
      "BAKED CHICKEN NEGRESCO",
      "مكرونة بالبشاميل الكريمي الخفيف وقطع الفراخ المتبلة والمشروم والزيتون ومخبوزة بوش موتزاريلا ذهبي في الفرن.",
      prodImg("pasta-negresco"),
      sz([
        ["حجم فردي R", 140],
        ["حجم لارج L", 170],
      ]),
      {
        isBestSeller: true,
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pastaTagineAddons,
      },
    ),
    p(
      "pasta",
      "مكرونة كرسبي تشيكن تشيز صوص",
      "CRISPY CHICKEN CHEESE PASTA",
      "مكرونة بينا بصوص الجبنة الشيدر والوايت صوص مغطاة بقطع ستربس الدجاج المقرمش الذهبي.",
      prodImg("pasta-crispy-cheese"),
      sz([
        ["حجم فردي R", 145],
        ["حجم لارج L", 175],
      ]),
      {
        isNew: true,
        badge: "جديد",
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pastaTagineAddons,
      },
    ),
    p(
      "pasta",
      "مكرونة بولونيز لحم مفروم ريد صوص",
      "BEEF BOLOGNESE RED SAUCE PASTA",
      "مكرونة إيطالية بصلصة الطماطم والأعشاب الإيطالية مع اللحم المفروم البلدي المتبل ورشة جبنة موتزاريلا.",
      prodImg("pasta-bolognese"),
      sz([
        ["حجم فردي R", 125],
        ["حجم لارج L", 155],
      ]),
      {
        allergens: "جلوتين القمح • ألبان اختياري",
        addons: pastaTagineAddons,
      },
    ),
    p(
      "pasta",
      "مكرونة أرابياتا سبايسي ميكس لحوم",
      "SPICY ARRABBIATA MEAT MIX PASTA",
      "مكرونة بالصوص الأحمر الحار والفلفل الهالبينو مع قطع السجق والبيبروني والزيتون الأسود.",
      prodImg("pasta-bolognese"),
      sz([
        ["حجم فردي R", 135],
        ["حجم لارج L", 165],
      ]),
      {
        isSpicy: true,
        allergens: "جلوتين القمح • ألبان",
        addons: pastaTagineAddons,
      },
    ),

    // ==================== 4. الطواجن (TAWAGEN) ====================
    p(
      "tawagen",
      "طاجن مكرونة باللحمة والموتزاريلا",
      "BEEF & MOZZARELLA CLAY POT TAGINE",
      "طاجن فخار مخبوز في الفرن بمكرونة القلم واللحم البلدي المعصج والصلصة المتبلة وطبقة موتزاريلا سايحة محمرة.",
      prodImg("tagine-beef-mozza"),
      sz([
        ["طاجن وسط", 125],
        ["طاجن كبير", 155],
      ]),
      {
        isBestSeller: true,
        badge: "طاجن فرن أصلي",
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pastaTagineAddons,
      },
    ),
    p(
      "tawagen",
      "طاجن فراخ ومشروم وايت صوص بالفرن",
      "CHICKEN MUSHROOM AU GRATIN TAGINE",
      "طاجن فخار غني بقطع الدجاج المشوي والمشروم والمكرونة بصوص الكريمة ووجه موتزاريلا وشيدر ذهبي.",
      prodImg("tagine-chicken-white"),
      sz([
        ["طاجن وسط", 135],
        ["طاجن كبير", 165],
      ]),
      {
        isBestSeller: true,
        allergens: "جلوتين القمح • ألبان وجبن",
        addons: pastaTagineAddons,
      },
    ),
    p(
      "tawagen",
      "طاجن سجق شرقي بالجبنة الفخار",
      "ORIENTAL SAUSAGE CHEESE TAGINE",
      "سجق بلدي متبل مع الفلفل الألوان والطماطم وصوص الطاجن الشرقي ومغطى بطبقة جبنة موتزاريلا في الفرن.",
      prodImg("tagine-oriental-meat"),
      sz([
        ["طاجن وسط", 135],
        ["طاجن كبير", 165],
      ]),
      {
        isSpicy: true,
        allergens: "ألبان وجبن",
        addons: pastaTagineAddons,
      },
    ),
    p(
      "tawagen",
      "طاجن لحمة بالبصل المكرمل (تورلي شرقي)",
      "BRAISED BEEF & ONION ORIENTAL TAGINE",
      "مكعبات لحم بلدي مطهية على نار هادئة في الفخار مع البصل المكرمل والبهارات الشرقية ويُقدم مع أرز وخبز طازج.",
      prodImg("tagine-oriental-meat"),
      sz([["طاجن متكامل + أرز", 185]]),
      {
        forFamily: false,
        allergens: "جلوتين القمح (الخبز المرفق)",
        addons: mealGrillAddons,
      },
    ),

    // ==================== 5. الوجبات والساندوتشات (MEALS & SANDWICHES) ====================
    p(
      "meals",
      "وجبة ستربس جيمي كرسبي كومبو",
      "GIMMY CRISPY STRIPS COMBO MEAL",
      "٥ قطع دجاج ستربس مقرمشة بالتتبيلة الذهبية تُقدم مع أرز ريزو أو بطاطس مقرمشة، كولسلو، صوص جبنة، وخبز طازج.",
      prodImg("meal-crispy-strips"),
      sz([
        ["وجبة فردية (5 قطع)", 165],
        ["وجبة دبل (8 قطع)", 230],
      ]),
      {
        isBestSeller: true,
        badge: "كومبو التوفير",
        allergens: "جلوتين القمح • ألبان • بيض",
        addons: mealGrillAddons,
      },
    ),
    p(
      "meals",
      "وجبة جيمي دبل سماش برجر",
      "GIMMY DOUBLE SMASH BURGER MEAL",
      "قطعتين لحم بقري صافي عالجريل مع دبل جبنة شيدر أمريكي، صوص جيمي كوك البرتقالي المدخن، خيار مخلل، وبطاطس مقرمشة.",
      prodImg("meal-gimmy-burger"),
      sz([
        ["سنجل كومبو", 145],
        ["دبل كومبو", 185],
      ]),
      {
        isBestSeller: true,
        allergens: "جلوتين القمح • سمسم • ألبان",
        addons: mealGrillAddons,
      },
    ),
    p(
      "meals",
      "ساندوتش تشيكن رانش سوبريم",
      "CHICKEN RANCH SUPREME SUB",
      "صدور دجاج مقرمشة أو مشوية في خبز فرنساوي محمص مع جبنة موتزاريلا، خس طازج، تركي مدخن، وصوص رانش.",
      prodImg("meal-chicken-ranch-sub"),
      sz([
        ["ساندوتش فقط", 115],
        ["كومبو (بطاطس + كانز)", 150],
      ]),
      {
        allergens: "جلوتين القمح • ألبان • بيض",
        addons: mealGrillAddons,
      },
    ),
    p(
      "meals",
      "بوكس العيلة كرسبي وميكس (12 قطعة)",
      "GIMMY 12-PC FAMILY BOX",
      "١٢ قطعة دجاج مقرمش وستربس ذهبي مع باكت بطاطس عائلي، ٢ كولسلو، ٢ صوص شيدر، وخبز طازج للّمة.",
      prodImg("meal-family-feast"),
      sz([["بوكس عائلي (4-5 أفراد)", 420]]),
      {
        forFamily: true,
        badge: "وجبة العيلة",
        allergens: "جلوتين القمح • ألبان",
        addons: mealGrillAddons,
      },
    ),

    // ==================== 6. أطباق شرقية ومشاوي (ORIENTAL & GRILLS) ====================
    p(
      "grills",
      "صينية مشويات جيمي كوك المشكلة",
      "GIMMY MIXED CHARCOAL GRILL",
      "تشكيلة مشويات على الفحم (كباب، كفتة ضاني وكندوز، وشيش طاووق) على فرشة أرز بسمتي مبهر مع السلطات والطحينة والعيش الساخن.",
      prodImg("grill-mixed-platter"),
      sz([
        ["وجبة فردية مشكل", 220],
        ["صينية نصف كيلو (2-3 أفراد)", 390],
        ["صينية كيلو مشكل للعيلة", 740],
      ]),
      {
        isBestSeller: true,
        forFamily: true,
        badge: "مشوي عالفحم",
        allergens: "سمسم (طحينة) • جلوتين (الخبز)",
        addons: mealGrillAddons,
      },
    ),
    p(
      "grills",
      "فرخة مشوية على الفحم بتتبيلة جيمي",
      "CHARCOAL GRILLED WHOLE CHICKEN",
      "فرخة متبلة بخلطة الأعشاب الشرقية ومشوية على الفحم، تُقدم مع أرز بسمتي، بطاطس، طحينة، ثومية، ومخلل وخبز.",
      prodImg("grill-charcoal-chicken"),
      sz([
        ["نصف فرخة مشوية (وجبة)", 175],
        ["فرخة كاملة مشوية للعيلة", 330],
      ]),
      {
        isBestSeller: true,
        forFamily: true,
        allergens: "سمسم (طحينة) • جلوتين",
        addons: mealGrillAddons,
      },
    ),
    p(
      "grills",
      "وجبة كفتة الحاتي عالفحم",
      "CHARCOAL KOFTA PLATTER",
      "أصابع كفتة بلدي مشوية على الفحم مع أرز بسمتي أصفر، سلطة خضراء، سلطة طحينة، وعيش بلدي وشامي طازج.",
      prodImg("grill-kofta-kabab"),
      sz([
        ["ربع كيلو (وجبة)", 165],
        ["ثلث كيلو (وجبة سبيشيال)", 205],
      ]),
      {
        allergens: "سمسم (طحينة) • جلوتين",
        addons: mealGrillAddons,
      },
    ),
    p(
      "grills",
      "وجبة شيش طاووق مشوي عالفحم",
      "CHARCOAL SHISH TAWOOK MEAL",
      "مكعبات أوراك دجاج طرية متبلة بالزبادي والبهارات مع الفلفل الألوان والبصل المشوي، تُقدم مع أرز بسمتي وثومية.",
      prodImg("grill-shish-tawook"),
      sz([["وجبة كاملة + أرز وثومية", 175]]),
      {
        allergens: "ألبان (زبادي التتبيلة) • بيض (ثومية)",
        addons: mealGrillAddons,
      },
    ),

    // ==================== 7. الإضافات والمقبلات (SIDES) ====================
    p(
      "sides",
      "بطاطس تشيز فرايز جيمي (شيدر وهالبينو)",
      "LOADED CHEDDAR CHEESE FRIES",
      "أصابع بطاطس ذهبية مقرمشة غرقانة بصوص الشيدر الساخن وقطع البيبروني أو الهالبينو الاختياري.",
      prodImg("side-cheese-fries"),
      sz([
        ["باكت وسط", 65],
        ["بوكس لارج مشاركة", 95],
      ]),
      {
        isBestSeller: true,
        allergens: "ألبان وجبن",
      },
    ),
    p(
      "sides",
      "خبز بالثوم والموتزاريلا (4 قطع)",
      "CHEESY GARLIC BREAD",
      "خبز إيطالي محمص بزبدة الثوم والأعشاب ومغطى بطبقة جبنة موتزاريلا ذائبة.",
      prodImg("side-garlic-bread"),
      sz([["٤ قطع محمصة", 55]]),
      {
        allergens: "جلوتين القمح • ألبان وجبن",
      },
    ),
    p(
      "sides",
      "طبق أرز بسمتي مبهر بالمكسرات",
      "SPICED BASMATI RICE",
      "أرز بسمتي ذهبي مطهي بالمرقة الغنية والتوابل الشرقية.",
      prodImg("side-basmati-rice"),
      sz([["علبة وسط", 45], ["علبة عائلية", 75]]),
    ),
    p(
      "sides",
      "سلطة جيمي فريش جاردن / كولسلو",
      "FRESH SALAD OR CREAMY COLESLAW",
      "اختيارك من السلطة الخضراء الفريش بالدرسينج الإيطالي أو الكولسلو الكريمي الطازج.",
      prodImg("side-fresh-salad"),
      sz([
        ["سلطة خضراء إيطالي", 35],
        ["كولسلو كريمي", 35],
      ]),
    ),

    // ==================== 8. المشروبات (DRINKS) ====================
    p(
      "drinks",
      "مشروب غازي كانز بارد",
      "CHILLED SOFT DRINK CAN",
      "كانز بارد منعش (كولا، برتقال، ليمون نعناع) يُقدم مثلجاً مع طلبك.",
      prodImg("drink-cans"),
      sz([
        ["كانز 330 مل", 25],
        ["لتر عائلي", 48],
      ]),
    ),
    p(
      "drinks",
      "مياه معدنية مبردة",
      "MINERAL WATER",
      "زجاجة مياه معدنية نقية مبردة.",
      prodImg("drink-water"),
      sz([
        ["صغيرة 600 مل", 12],
        ["كبيرة 1.5 لتر", 22],
      ]),
    ),
  ];

  return {
    settings: {
      brandName: "مطعم جيمي كوك | GIMMY COOK",
      email: "gimmycook@gmail.com",
      facebook: "https://www.facebook.com/GIMMYCOOK",
      instagram: "https://www.instagram.com/gimmy_cook/",
      tiktok: "https://www.tiktok.com/@gimmy.cook",
      linktree: "",
      talabat: "",
      menuPdfUrl: "/menu",
      orderPhones: ["01020305074", "01060449933"],
      complaintsWhatsapp: "201060449933",
      adminUsername: "admin",
      adminPassword: "GimmyCook@2026",
    },
    branches: [
      {
        id: "new-cairo-main",
        name: "فرع القاهرة الجديدة — المطبخ الرئيسي ودليفري 24 ساعة",
        city: "القاهرة الجديدة",
        address:
          "القاهرة الجديدة — التجمع، مع تغطية دليفري 24 ساعة للقاهرة الجديدة ومدينتي والشروق وبدر والعاصمة الإدارية",
        phone: "01020305074",
        phone2: "01060449933",
        extraPhones: [],
        whatsapp: "201060449933",
        hours: "مفتوح 24 ساعة طوال أيام الأسبوع — دليفري واستلام بدون تلامس",
        mapUrl: "https://maps.google.com/?q=New+Cairo+Egypt",
        coordinates: "30.0074, 31.4913",
        services: [
          "دليفري 24 ساعة",
          "توصيل بدون تلامس (Contactless)",
          "استلام تيك أواي سريع",
          "نقاط ولاء GIMMY POINTS",
          "طلبات عائلية وجماعية",
        ],
        deliveryFee: 25,
        minOrder: 120,
        deliveryAreas: [
          "القاهرة الجديدة (التجمع الأول والثالث والخامس والرحاب)",
          "مدينتي ومدينة المستقبل",
          "مدينة الشروق وهليوبوليس الجديدة",
          "مدينة بدر ومدينة وصال",
          "العاصمة الإدارية الجديدة",
          "كمبوند البروج — طريق الإسماعيلية الصحراوي",
        ],
        isActive: true,
      },
    ],
    categories: [
      {
        id: "pizza",
        nameAr: "البيتزا الإيطالية",
        nameEn: "ITALIAN PIZZA",
        slug: "pizza",
        intent: "pizza",
        icon: "/01",
        image: prodImg("pizza-supreme"),
        sortOrder: 1,
      },
      {
        id: "feteer",
        nameAr: "الفطير الشرقي والحادق",
        nameEn: "ORIENTAL FETEER",
        slug: "feteer",
        intent: "feteer",
        icon: "/02",
        image: prodImg("feteer-chicken-cheese"),
        sortOrder: 2,
      },
      {
        id: "pasta",
        nameAr: "المكرونة والوايت صوص",
        nameEn: "PASTA",
        slug: "pasta",
        intent: "pasta",
        icon: "/03",
        image: prodImg("pasta-alfredo"),
        sortOrder: 3,
      },
      {
        id: "tawagen",
        nameAr: "الطواجن الفرن",
        nameEn: "OVEN TAWAGEN",
        slug: "tawagen",
        intent: "tawagen",
        icon: "/04",
        image: prodImg("tagine-beef-mozza"),
        sortOrder: 4,
      },
      {
        id: "meals",
        nameAr: "الوجبات والساندوتشات",
        nameEn: "MEALS & BURGERS",
        slug: "meals",
        intent: "meals",
        icon: "/05",
        image: prodImg("meal-crispy-strips"),
        sortOrder: 5,
      },
      {
        id: "grills",
        nameAr: "المشاوي والأطباق الشرقية",
        nameEn: "CHARCOAL GRILLS",
        slug: "grills",
        intent: "grills",
        icon: "/06",
        image: prodImg("grill-mixed-platter"),
        sortOrder: 6,
      },
      {
        id: "sides",
        nameAr: "الإضافات والمقبلات",
        nameEn: "SIDES & DIPS",
        slug: "sides",
        intent: "sides",
        icon: "/07",
        image: prodImg("side-cheese-fries"),
        sortOrder: 7,
      },
      {
        id: "drinks",
        nameAr: "المشروبات الباردة",
        nameEn: "DRINKS",
        slug: "drinks",
        intent: "drinks",
        icon: "/08",
        image: prodImg("drink-cans"),
        sortOrder: 8,
      },
    ],
    products,
    offers: [
      {
        id: "offer-italian-oriental-duo",
        title: "ميكس المود (بيتزا لارج + فطيرة فراخ وجبن + لتر بيبسي)",
        titleEn: "GOOD MOOD FUSION DUO",
        badge: "عرض خاص",
        description:
          "بيتزا جيمي سوبريم أو رانش حجم كبير + فطيرة شرقي فراخ وجبن حجم كبير + بطاطس مقرمشة + مشروب عائلي ١ لتر.",
        image: prodImg("pizza-supreme"),
        oldPrice: 395,
        price: 335,
        startsAt: inDays(-30),
        endsAt: inDays(365),
        branchIds: [],
        terms: "يكسبك 15 نقطة في برنامج GIMMY POINTS • متاح دليفري 24 ساعة",
        isActive: true,
      },
      {
        id: "offer-feteer-feast",
        title: "ثنائي الفطير الشرقي (فطيرة مشكل لحوم + فطيرة حلو قشطة وعسل)",
        titleEn: "FETEER SAVORY & SWEET COMBO",
        badge: "توقيع جيمي",
        description:
          "فطيرة مشكل لحوم شرقي غرقانة موتزاريلا + فطيرة تحلية بالقشطة البلدي والعسل والمكسرات بسعر توفير خاص.",
        image: prodImg("feteer-chicken-cheese"),
        oldPrice: 345,
        price: 290,
        startsAt: inDays(-30),
        endsAt: inDays(365),
        branchIds: [],
        terms: "يكسبك 10 نقاط في برنامج GIMMY POINTS",
        isActive: true,
      },
      {
        id: "offer-pasta-tagine-night",
        title: "سهرة الباستا والطواجن (ألفريدو + طاجن مكرونة لحمة موتزاريلا + خبز ثوم)",
        titleEn: "PASTA & TAGINE NIGHT",
        badge: "سهرة اللمة",
        description:
          "طبق مكرونة تشيكن ألفريدو وايت صوص + طاجن فخار مكرونة باللحمة والموتزاريلا + خبز ثوم بالجبنة + ٢ كانز.",
        image: prodImg("pasta-alfredo"),
        oldPrice: 365,
        price: 310,
        startsAt: inDays(-30),
        endsAt: inDays(365),
        branchIds: [],
        terms: "متاح طوال الليل عبر دليفري 24 ساعة",
        isActive: true,
      },
      {
        id: "offer-family-grill-pizza",
        title: "وليمة العيلة (فرخة مشوية عالفحم + بيتزا لارج + أرز وسلطات)",
        titleEn: "FAMILY GRILL & PIZZA FEAST",
        badge: "غدا العيلة",
        description:
          "فرخة كاملة مشوية عالفحم مع الأرز البسمتي والسلطات والطحينة + بيتزا إيطالي حجم كبير من اختيارك + مشروب عائلي.",
        image: prodImg("grill-mixed-platter"),
        oldPrice: 545,
        price: 465,
        startsAt: inDays(-30),
        endsAt: inDays(365),
        branchIds: [],
        terms: "يكسبك 20 نقطة فورية (20 ج.م رصيد مكافآت)",
        isActive: true,
      },
    ],
    orders: [],
    occasions: [],
    reviews: [
      {
        id: "rev-1",
        name: "عمر خالد — التجمع الخامس، القاهرة الجديدة",
        text: "فكرة إنك تلاقي بيتزا رانش خطيرة وفطير شرقي فراخ وجبن سخن ومورق في نفس الطلب وبنفس الجودة دي عبقرية! والتوصيل بيجي بالليل بسرعة جداً.",
        rating: 5,
      },
      {
        id: "rev-2",
        name: "مريم سامح — مدينتي",
        text: "طاجن المكرونة بالموتزاريلا ومكرونة الألفريدو طعمهم تحفة وكميتهم مشبعة جداً، والتغليف نظيف ومحترم بيحافظ على السخونة.",
        rating: 5,
      },
      {
        id: "rev-3",
        name: "كريم عبد الرحمن — مدينة الشروق",
        text: "طلبنا بوكس اللمة في سهرة متأخرة على الفجر ووصل سخن كأنه طالع من الفرن حالاً! خدمة الدليفري 24 ساعة منقذة بجد.",
        rating: 5,
      },
      {
        id: "rev-4",
        name: "ياسمين هاني — مدينة بدر",
        text: "صينية المشويات مع الفطير المشكل شرفونا في عزومة العيلة، وبرنامج نقاط GIMMY POINTS فكرة حلوة جداً بتشجع نطلب على طول.",
        rating: 5,
      },
    ],
  };
}
