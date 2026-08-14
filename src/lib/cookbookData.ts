export interface Nutrition {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
}

export interface PrepWay {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
}

export interface FDANutrition {
  servingsPerContainer: string;
  servingSize: string;
  calories: string;
  totalFat: string;
  totalFatDV: string;
  satFat: string;
  satFatDV: string;
  transFat: string;
  cholesterol: string;
  cholesterolDV: string;
  sodium: string;
  sodiumDV: string;
  totalCarbs: string;
  totalCarbsDV: string;
  fiber: string;
  fiberDV: string;
  sugars: string;
  addedSugars: string;
  addedSugarsDV: string;
  protein: string;
}

export interface RecipeVideo {
  id: string;
  title: string;
  duration: string;
  url: string;
}

export interface DetailedDish {
  id: string;
  title: string;
  cuisine: string;
  meal: "breakfast" | "lunch" | "dinner" | "snack" | "side";
  level: "easy" | "medium" | "hard";
  prepTime: string;
  cookTime: string;
  ways: number;
  imageUrl: string;
  nutrition: Nutrition;
  prepWays?: PrepWay[];
  videos?: RecipeVideo[];
  equipment: string[];
  ingredients: string[];
  steps: string[];
  chefTip: string;
}

export function getDishVideos(dish: DetailedDish): RecipeVideo[] {
  if (dish.videos && dish.videos.length > 0) {
    return dish.videos;
  }

  const shortName = dish.title.split(" ")[0];
  return [
    {
      id: "v1",
      title: `${shortName} · Masterclass Full Guide`,
      duration: "12 min",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "v2",
      title: `${shortName} · Quick 5-Min Express Prep`,
      duration: "5 min",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "v3",
      title: `${shortName} · Chef Pro Knife & Plating Techniques`,
      duration: "8 min",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];
}

export interface CuisineCategory {
  name: string;
  img: string;
}

export function getDishPrepWays(dish: DetailedDish): PrepWay[] {
  if (dish.prepWays && dish.prepWays.length >= 3) {
    return dish.prepWays;
  }

  const t = dish.title;

  // 1. Smoothies, Smoothie Bowls, Parfaits, Lassi & Cold Drinks
  if (t.includes("Smoothie") || t.includes("Bowl") || t.includes("Parfait") || t.includes("Lassi") || t.includes("Drink")) {
    return [
      { id: "w1", title: "Classic Berry Style", description: "Blended thick with almond milk, Greek yogurt & fresh berry drizzle." },
      { id: "w2", title: "Healthy · Green Power Booster", description: "Extra spinach, chia seeds & plant protein powder; zero added sugar." },
      { id: "w3", title: "Idea · Frozen Sorbet Crunch", description: "Blended ultra-thick with frozen berries, topped with cocoa nibs & coconut flakes." },
    ];
  }

  // 2. Apple Spice Cinnamon Oatmeal (Food Hero Kitchen)
  if (t.includes("Oatmeal") || t.includes("Apple")) {
    return [
      { id: "w1", title: "Stovetop classic", description: "Milk or water, apple in the pot, cinnamon finish." },
      { id: "w2", title: "Water + less sugar", description: "Use water, skip most sugar, load cinnamon." },
      { id: "w3", title: "With nuts + milk", description: "Whole milk vibe + chopped walnuts." },
    ];
  }

  // 3. Hummus Plate & Dips (Middle Eastern / Mediterranean)
  if (t.includes("Hummus") || t.includes("Dip") || t.includes("Baba")) {
    return [
      { id: "w1", title: "With olive oil swirl", description: "Tahini-forward, ice-cold water trick for ultra creamy finish." },
      { id: "w2", title: "Healthy · less oil", description: "Skip top oil; rely on tahini + fresh lemon juice." },
      { id: "w3", title: "Idea · warm spiced oil", description: "Drizzle with warm cumin-chili oil and toasted pine nuts." },
    ];
  }

  // 4. Thai Cucumber Salad & Salads (Thai / Asian Salads)
  if (t.includes("Cucumber") || t.includes("Salad") || t.includes("Som Tum")) {
    return [
      { id: "w1", title: "Ajad-style", description: "Vinegar, sugar, chili, shallot crisp dressing." },
      { id: "w2", title: "Healthy · less sugar", description: "More lime juice & vinegar, stevia optional." },
      { id: "w3", title: "Idea · crushed peanut", description: "Crunchy toasted peanuts on top — almost satay-adjacent." },
    ];
  }

  // 5. Bibimbap (Korean)
  if (t.includes("Bibimbap")) {
    return [
      { id: "w1", title: "With sesame oil + egg", description: "Veg banchan, gochujang, fried sunny egg." },
      { id: "w2", title: "Healthy · more veg less oil", description: "Steam/sauté with spray oil; turkey or tofu." },
      { id: "w3", title: "Idea · crispy bottom", description: "Hot stone / oiled skillet for nurungji crunch." },
    ];
  }

  // 6. Tonkotsu & Miso Ramen (Japanese)
  if (t.includes("Ramen")) {
    return [
      { id: "w1", title: "Classic Tonkotsu Broth", description: "Rich pork bone broth, chashu pork belly, ajitama egg." },
      { id: "w2", title: "Healthy · Low Sodium Miso", description: "Dashi broth, steamed baby bok choy, grilled chicken breast." },
      { id: "w3", title: "Idea · Spicy Garlic Chili Oil", description: "Sichuan chili tare, extra scallions, fried garlic chips." },
    ];
  }

  // 7. Tacos & Burritos (Mexican)
  if (t.includes("Tacos") || t.includes("Burrito") || t.includes("Fajitas") || t.includes("Quesadilla")) {
    return [
      { id: "w1", title: "Street Style · Double Corn", description: "Seared meat, warm double corn tortillas, diced onion & cilantro." },
      { id: "w2", title: "Healthy · Lettuce Wrap Bowl", description: "Romaine lettuce boat, extra pico de gallo, low-fat Greek crema." },
      { id: "w3", title: "Idea · Crispy Queso Charred", description: "Melted cheese crust on griddle for crispy queso taco shell." },
    ];
  }

  // 8. Pasta & Risotto (Italian)
  if (t.includes("Pasta") || t.includes("Spaghetti") || t.includes("Carbonara") || t.includes("Risotto")) {
    return [
      { id: "w1", title: "Classic Italian Style", description: "Al dente pasta, extra virgin olive oil, aged Parmigiano Reggiano." },
      { id: "w2", title: "Healthy · Whole Grain / Zoodles", description: "Whole wheat or zucchini spirals, light olive oil drizzle, fresh herbs." },
      { id: "w3", title: "Idea · Baked Cheese Crust", description: "Transfer to ramekin, top with mozzarella, broil 4 min until bubbling." },
    ];
  }

  // 9. Curry & Tikka Masala (Indian)
  if (t.includes("Curry") || t.includes("Butter Chicken") || t.includes("Tikka") || t.includes("Masala")) {
    return [
      { id: "w1", title: "Rich Restaurant Style", description: "Heavy cream, butter finish, cashew paste & fenugreek leaves." },
      { id: "w2", title: "Healthy · Coconut Yogurt", description: "Light coconut milk & Greek yogurt base with extra spinach." },
      { id: "w3", title: "Idea · Charcoal Smoked (Dhungar)", description: "Live coal ghee smoke infusion for authentic tandoori aroma." },
    ];
  }

  // 10. Biryani & Fried Rice (Indian / Chinese)
  if (t.includes("Biryani") || t.includes("Fried Rice") || t.includes("Chow Mein")) {
    return [
      { id: "w1", title: "Dum Pukht Sealed", description: "Slow-cooked under sealed dough lid with saffron & kewra water." },
      { id: "w2", title: "Healthy · Quinoa / Cauliflower Rice", description: "Low-GI grain base with extra roasted vegetables." },
      { id: "w3", title: "Idea · Crispy Tahdig Bottom", description: "Saffron rice crust scorched at bottom of pot for golden crunch." },
    ];
  }

  // 11. Momo & Dumplings (Nepali / Chinese)
  if (t.includes("Momo") || t.includes("Dumplings") || t.includes("Gyoza")) {
    return [
      { id: "w1", title: "Authentic Steamed (Kothey)", description: "Steamed soft in bamboo basket served with tomato-sesame achar." },
      { id: "w2", title: "Healthy · Open-Top Crystal", description: "Thin translucent wrapper filled with minced mushrooms & bok choy." },
      { id: "w3", title: "Idea · Pan-Fried Crispy Skirt", description: "Pan-seared with starch slurry for delicate lace-like skirt crunch." },
    ];
  }

  // Default dish-tailored 3 methods
  const mainIng = dish.ingredients[0] ? dish.ingredients[0].split("(")[0] : "Main ingredients";
  return [
    {
      id: "w1",
      title: `Classic ${dish.title.split(" ")[0]} Style`,
      description: `Traditional preparation using ${mainIng.toLowerCase()} with authentic regional seasoning.`,
    },
    {
      id: "w2",
      title: "Healthy · Low Oil & Extra Veg",
      description: "Air-fried or steamed with spray olive oil; double greens and lean protein.",
    },
    {
      id: "w3",
      title: "Idea · Extra Crisp & Charred Finish",
      description: "Searing at high heat in cast iron skillet for smoky caramelized texture.",
    },
  ];
}

export interface TransformedRecipeDetails {
  wayTitle: string;
  wayDescription: string;
  ingredients: string[];
  steps: string[];
  chefTip: string;
  nutrition: Nutrition;
}

export function getDishPrepWayDetails(dish: DetailedDish, wayId: string): TransformedRecipeDetails {
  const ways = getDishPrepWays(dish);
  const activeWay = ways.find((w) => w.id === wayId) || ways[0];

  const titleLower = dish.title.toLowerCase();
  const isColdDrink =
    titleLower.includes("smoothie") ||
    titleLower.includes("bowl") ||
    titleLower.includes("parfait") ||
    titleLower.includes("lassi") ||
    titleLower.includes("drink");

  const isSaladOrDip =
    titleLower.includes("salad") ||
    titleLower.includes("hummus") ||
    titleLower.includes("dip") ||
    titleLower.includes("guacamole") ||
    titleLower.includes("tzatziki");

  let ingredients = [...dish.ingredients];
  let steps = [...dish.steps];
  let chefTip = dish.chefTip;
  let calories = parseInt(dish.nutrition.calories) || 450;
  let protein = parseInt(dish.nutrition.protein) || 20;
  let carbs = parseInt(dish.nutrition.carbs) || 50;
  let fat = parseInt(dish.nutrition.fat) || 18;
  let fiber = parseInt(dish.nutrition.fiber) || 5;

  if (wayId === "w2") {
    // HEALTHY VARIATION (Tailored per food type)
    calories = Math.round(calories * 0.75);
    fat = Math.max(2, Math.round(fat * 0.5));
    fiber = fiber + 4;

    if (isColdDrink) {
      ingredients = ingredients.map((ing) => {
        if (ing.toLowerCase().includes("sugar") || ing.toLowerCase().includes("honey") || ing.toLowerCase().includes("syrup")) {
          return "1 pinch Stevia / Monkfruit (Zero Added Sugar)";
        }
        if (ing.toLowerCase().includes("whole milk") || ing.toLowerCase().includes("heavy cream")) {
          return "1 cup Unsweetened Almond Milk & Low-Fat Greek Yogurt";
        }
        return ing;
      });
      ingredients.push("1 cup Organic Baby Spinach / Kale Greens", "1 tbsp Organic Chia Seeds (Fiber Boost)");

      steps = steps.map((step, idx) => {
        if (idx === 0) return "Add almond milk, frozen berries, extra baby spinach and chia seeds into high-speed blender container.";
        if (idx === 1) return "Blend on high speed for 60 seconds until completely smooth and vibrant green-purple color.";
        return step;
      });

      chefTip = "Green Power Booster: Adding spinach and chia seeds boosts fiber by 4g and micronutrients with zero added sugar!";
    } else if (isSaladOrDip) {
      ingredients = ingredients.map((ing) => {
        if (ing.toLowerCase().includes("oil") || ing.toLowerCase().includes("mayo")) {
          return "1 tbsp Fresh Lime Juice & Apple Cider Vinegar (Light Dressing)";
        }
        return ing;
      });
      ingredients.push("1 cup Chopped Fresh Herbs & Microgreens");

      steps = steps.map((step, idx) => {
        if (idx === 1) return "Toss ingredients gently with fresh lime juice, vinegar, and sea salt; skip heavy oil toppings.";
        return step;
      });

      chefTip = "Light Citrus Variation: Replacing oil toppings with fresh citrus and vinegar cuts down 50% fat calories while adding bright acidity!";
    } else {
      // Hot Mains / Cooked Foods
      ingredients = ingredients.map((ing) => {
        if (ing.toLowerCase().includes("butter") || ing.toLowerCase().includes("oil")) {
          return ing.replace(/butter|oil/gi, "Olive Oil Cooking Spray");
        }
        if (ing.toLowerCase().includes("pork") || ing.toLowerCase().includes("beef")) {
          return ing.replace(/pork|beef/gi, "Lean Ground Turkey / Organic Tofu");
        }
        return ing;
      });
      ingredients.push("1 cup Steamed Baby Greens (extra fiber)");

      steps = steps.map((step, idx) => {
        if (idx === 0) return step.replace(/fry|sear|boil/gi, "Steam or air-fry");
        if (idx === 1) return `Air-fry or light-sauté ingredients with olive oil spray at 375°F for reduced calories.`;
        return step;
      });

      chefTip = "Healthy Variation: Steaming with olive oil spray cuts down 25% calories and 50% fat while adding 4g extra fiber!";
    }
  } else if (wayId === "w3") {
    // GOURMET / IDEA VARIATION (Tailored per food type)
    calories = Math.round(calories * 1.1);
    fat = Math.round(fat * 1.2);

    if (isColdDrink) {
      ingredients.push("2 tbsp Toasted Coconut Flakes & Cocoa Nibs", "1 tbsp Raw Honey Drizzle");

      steps = steps.map((step, idx) => {
        if (idx === steps.length - 1) {
          return "Pour ultra-thick smoothie into chilled ceramic bowl; top with crunchy toasted coconut, cocoa nibs, and honey drizzle.";
        }
        return step;
      });

      chefTip = "Frozen Sorbet Crunch: Blending with minimal liquid creates a rich sorbet texture topped with cocoa nibs & coconut flakes!";
    } else if (isSaladOrDip) {
      ingredients.push("2 tbsp Warm Chili-Cumin Spiced Oil Drizzle", "2 tbsp Toasted Pine Nuts or Peanuts");

      steps = steps.map((step, idx) => {
        if (idx === steps.length - 1) {
          return "Drizzle warm spiced chili oil on top and sprinkle toasted nuts just before serving for aromatic crunch.";
        }
        return step;
      });

      chefTip = "Spiced Oil & Nut Crunch: Warm chili-infused oil and toasted nuts create a contrasting warm-cold mouthfeel!";
    } else {
      // Hot Mains / Cooked Foods
      ingredients = ingredients.map((ing) => {
        if (ing.toLowerCase().includes("oil")) {
          return ing + " & 1 tbsp Ghee / Sesame Oil for high-heat sear";
        }
        return ing;
      });
      ingredients.push("1 pinch Coarse Flaky Sea Salt (for finishing crunch)");

      steps = steps.map((step, idx) => {
        if (idx === steps.length - 1 || idx === steps.length - 2) {
          return step + " Preheat cast iron skillet to screaming hot; sear final 2 minutes for deep golden crispy charred crust (nurungji style).";
        }
        return step;
      });

      chefTip = "Crispy Sear Variation: Searing in a preheated cast iron pan creates smoky caramelized edges and irresistible crunch!";
    }
  }

  return {
    wayTitle: activeWay.title,
    wayDescription: activeWay.description,
    ingredients,
    steps,
    chefTip,
    nutrition: {
      calories: `${calories} kcal`,
      protein: `${protein}g`,
      carbs: `${carbs}g`,
      fat: `${fat}g`,
      fiber: `${fiber}g`,
    },
  };
}



export function getDishFDANutrition(dish: DetailedDish): FDANutrition {
  const calNum = parseInt(dish.nutrition.calories) || 450;
  const protNum = parseInt(dish.nutrition.protein) || 20;
  const carbNum = parseInt(dish.nutrition.carbs) || 50;
  const fatNum = parseInt(dish.nutrition.fat) || 18;
  const fibNum = parseInt(dish.nutrition.fiber) || 5;

  const satFat = Math.round(fatNum * 0.35);
  const cholesterol = Math.round(protNum * 2.5 + 15);
  const sodium = Math.round(calNum * 1.4 + 120);
  const sugars = Math.round(carbNum * 0.2);
  const addedSugars = Math.round(sugars * 0.4);

  return {
    servingsPerContainer: "2 servings per container",
    servingSize: "1 serving",
    calories: `${calNum}`,
    totalFat: `${fatNum}g`,
    totalFatDV: `${Math.round((fatNum / 78) * 100)}%`,
    satFat: `${satFat}g`,
    satFatDV: `${Math.round((satFat / 20) * 100)}%`,
    transFat: "0g",
    cholesterol: `${cholesterol}mg`,
    cholesterolDV: `${Math.round((cholesterol / 300) * 100)}%`,
    sodium: `${sodium}mg`,
    sodiumDV: `${Math.round((sodium / 2300) * 100)}%`,
    totalCarbs: `${carbNum}g`,
    totalCarbsDV: `${Math.round((carbNum / 275) * 100)}%`,
    fiber: `${fibNum}g`,
    fiberDV: `${Math.round((fibNum / 28) * 100)}%`,
    sugars: `${sugars}g`,
    addedSugars: `${addedSugars}g`,
    addedSugarsDV: `${Math.round((addedSugars / 50) * 100)}%`,
    protein: `${protNum}g`,
  };
}

export const COOKBOOK_CUISINES: CuisineCategory[] = [
  { name: "All", img: "" },
  { name: "Nepali", img: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=300&q=80" },
  { name: "Food Hero kitchen", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80" },
  { name: "Italian", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80" },
  { name: "Indian", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=300&q=80" },
  { name: "Mexican", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=300&q=80" },
  { name: "Japanese", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80" },
  { name: "Thai", img: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=300&q=80" },
  { name: "Chinese", img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=300&q=80" },
  { name: "Mediterranean", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80" },
  { name: "French", img: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=300&q=80" },
  { name: "Korean", img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=300&q=80" },
  { name: "Middle Eastern", img: "https://images.unsplash.com/photo-1579631542720-3a87825fff8c?auto=format&fit=crop&w=300&q=80" },
  { name: "American comfort", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80" },
  { name: "Spanish & Iberian", img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=300&q=80" },
  { name: "Vietnamese", img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=300&q=80" },
  { name: "Greek & Aegean", img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=300&q=80" },
  { name: "Turkish & Balkan", img: "https://images.unsplash.com/photo-1541518763669-27fef04b14da?auto=format&fit=crop&w=300&q=80" },
  { name: "Caribbean & Latin", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80" },
];

const BASE_HAND_CURATED_DISHES: DetailedDish[] = [
  // ----------------------------------------------------
  // FOOD HERO KITCHEN (8 RECIPES)
  // ----------------------------------------------------
  {
    id: "fh-1",
    title: "Apple Spice Cinnamon Oatmeal",
    cuisine: "Food Hero kitchen",
    meal: "breakfast",
    level: "easy",
    prepTime: "5 min",
    cookTime: "10 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "310 kcal", protein: "12g", carbs: "54g", fat: "6g", fiber: "9g" },
    equipment: ["Small Saucepan", "Wooden Spoon", "Measuring Cups"],
    ingredients: [
      "1 cup Organic Rolled Oats",
      "1 Crisp Honeycrisp Apple (diced fine)",
      "1.5 cups Almond Milk or Whole Milk",
      "1 tsp Ground Cinnamon & Pinch of Nutmeg",
      "1 tbsp Pure Maple Syrup or Raw Honey",
      "2 tbsp Toasted Chopped Walnuts",
    ],
    steps: [
      "In a saucepan, combine rolled oats, milk, cinnamon, and nutmeg over medium heat.",
      "Bring to a gentle simmer for 5 minutes, stirring occasionally.",
      "Fold in 3/4 of the diced crisp apples and simmer for another 3 minutes until tender.",
      "Ladle into a bowl, top with remaining diced apple, toasted walnuts, and maple syrup.",
    ],
    chefTip: "Toast the walnuts in a dry skillet for 2 minutes before topping for maximum aromatic crunch.",
  },
  {
    id: "fh-2",
    title: "Berry Spinach Power Smoothie Bowl",
    cuisine: "Food Hero kitchen",
    meal: "breakfast",
    level: "easy",
    prepTime: "5 min",
    cookTime: "0 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "280 kcal", protein: "14g", carbs: "42g", fat: "7g", fiber: "11g" },
    equipment: ["High-Speed Blender", "Spoon", "Serving Bowl"],
    ingredients: [
      "1 cup Frozen Wild Blueberries & Raspberries",
      "1 cup Fresh Baby Organic Spinach",
      "1 Frozen Banana",
      "1/2 cup Unsweetened Almond Milk",
      "1 scoop Vanilla Whey or Plant Protein Powder",
      "1 tbsp Chia Seeds & Sliced Almonds",
    ],
    steps: [
      "Place spinach and almond milk in blender first to smooth green leafy texture.",
      "Add frozen berries, banana, and protein powder.",
      "Blend on high for 60 seconds until thick and spoonable.",
      "Pour into bowl and arrange chia seeds, blueberries, and sliced almonds in neat vertical rows.",
    ],
    chefTip: "Keep bananas peeled and frozen in zip bags for maximum creamy texture without needing ice cubes.",
  },
  {
    id: "fh-3",
    title: "High-Protein Quinoa Grain Bowl",
    cuisine: "Food Hero kitchen",
    meal: "lunch",
    level: "easy",
    prepTime: "10 min",
    cookTime: "15 min",
    ways: 4,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "420 kcal", protein: "22g", carbs: "58g", fat: "14g", fiber: "12g" },
    equipment: ["Medium Saucepan", "Chef Knife", "Mixing Bowl"],
    ingredients: [
      "1 cup Cooked Tricolor Quinoa",
      "1/2 cup Roasted Chickpeas",
      "1/2 Avocado (sliced)",
      "1/2 cup Steamed Broccoli Florets",
      "1/4 cup Crumbled Feta Cheese",
      "2 tbsp Tahini Lemon Dressing",
    ],
    steps: [
      "Fluff warm cooked quinoa with a fork and season with lemon zest and sea salt.",
      "Arrange roasted chickpeas, steamed broccoli florets, and sliced avocado over quinoa bed.",
      "Drizzle with creamy tahini lemon dressing and sprinkle crumbled feta on top.",
    ],
    chefTip: "Roast chickpeas with paprika and cumin at 400°F for 20 minutes for an addictive crunch.",
  },
  {
    id: "fh-4",
    title: "Avocado & Poached Egg Sourdough Toast",
    cuisine: "Food Hero kitchen",
    meal: "breakfast",
    level: "easy",
    prepTime: "5 min",
    cookTime: "5 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "340 kcal", protein: "16g", carbs: "28g", fat: "18g", fiber: "7g" },
    equipment: ["Toaster", "Small Saucepan", "Fork"],
    ingredients: [
      "2 Thick Slices Artisanal Sourdough Bread",
      "1 Ripe Hass Avocado",
      "2 Organic Pasture-Raised Eggs",
      "1 tbsp Fresh Lemon Juice",
      "Red Pepper Flakes & Everything Bagel Seasoning",
    ],
    steps: [
      "Toast sourdough slices until golden and crisp.",
      "Mash avocado with lemon juice, salt, and pepper using a fork.",
      "Poach eggs in simmering water with a drop of vinegar for 3 minutes until white is set and yolk is runny.",
      "Spread avocado over toast, top with poached eggs, and sprinkle red pepper flakes.",
    ],
    chefTip: "Add 1 tsp vinegar to simmering water and create a gentle vortex before dropping the egg for clean whites.",
  },
  {
    id: "fh-5",
    title: "Overnight Chia & Mango Parfait",
    cuisine: "Food Hero kitchen",
    meal: "snack",
    level: "easy",
    prepTime: "5 min",
    cookTime: "0 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "240 kcal", protein: "9g", carbs: "36g", fat: "8g", fiber: "10g" },
    equipment: ["Mason Jar", "Spoon"],
    ingredients: [
      "3 tbsp Black Chia Seeds",
      "1 cup Coconut Milk or Almond Milk",
      "1/2 cup Fresh Diced Alphonso Mango",
      "1 tbsp Honey",
      "Toasted Coconut Flakes",
    ],
    steps: [
      "Whisk chia seeds, milk, and honey in a mason jar until mixed.",
      "Refrigerate overnight (at least 6 hours) to thicken into pudding.",
      "Layer mango puree and fresh diced mango over chia pudding, top with toasted coconut flakes.",
    ],
    chefTip: "Stir the chia seeds again after 15 minutes of chilling to prevent settling at the bottom.",
  },
  {
    id: "fh-6",
    title: "Sweet Potato & Black Bean Bowl",
    cuisine: "Food Hero kitchen",
    meal: "lunch",
    level: "easy",
    prepTime: "10 min",
    cookTime: "20 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "390 kcal", protein: "15g", carbs: "64g", fat: "9g", fiber: "14g" },
    equipment: ["Baking Sheet", "Skillet"],
    ingredients: [
      "1 Large Sweet Potato (cubed)",
      "1 can Low-Sodium Black Beans (rinsed)",
      "1/2 cup Sweet Corn",
      "1 tbsp Olive Oil & Smoked Paprika",
      "Lime Cilantro Vinaigrette",
    ],
    steps: [
      "Toss sweet potato cubes with olive oil, paprika, salt, and roast at 400°F for 20 minutes.",
      "Warm black beans and corn in skillet with ground cumin.",
      "Assemble sweet potato, beans, corn in bowl with fresh cilantro and lime dressing.",
    ],
    chefTip: "Cut sweet potatoes into uniform 1/2-inch cubes so all pieces roast evenly.",
  },
  {
    id: "fh-7",
    title: "Matcha Green Tea Chia Energy Latte",
    cuisine: "Food Hero kitchen",
    meal: "snack",
    level: "easy",
    prepTime: "3 min",
    cookTime: "2 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "150 kcal", protein: "5g", carbs: "18g", fat: "6g", fiber: "4g" },
    equipment: ["Bamboo Whisk", "Small Pot"],
    ingredients: [
      "1.5 tsp Ceremonial Grade Japanese Matcha",
      "1 cup Oat Milk",
      "1 tbsp Maple Syrup",
      "1/4 cup Warm Water (175°F)",
    ],
    steps: [
      "Sift matcha powder into a bowl, pour in 175°F warm water.",
      "Whisk vigorously in a W motion with a bamboo whisk until frothy.",
      "Steam oat milk, mix with maple syrup, and pour over matcha broth.",
    ],
    chefTip: "Never use boiling water for matcha—175°F water preserves sweet antioxidants without bitterness.",
  },
  {
    id: "fh-8",
    title: "Grilled Salmon & Roasted Asparagus",
    cuisine: "Food Hero kitchen",
    meal: "dinner",
    level: "medium",
    prepTime: "10 min",
    cookTime: "12 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "480 kcal", protein: "38g", carbs: "10g", fat: "32g", fiber: "4g" },
    equipment: ["Cast Iron Skillet", "Tongs"],
    ingredients: [
      "2 Wild-Caught Salmon Fillets (6 oz each)",
      "1 Bunch Fresh Asparagus (trimmed)",
      "2 tbsp Extra Virgin Olive Oil",
      "1 Lemon (sliced)",
      "Fresh Dill & Garlic Powder",
    ],
    steps: [
      "Sear salmon skin-side down in a hot skillet with olive oil for 5 minutes until crispy.",
      "Flip salmon, add trimmed asparagus and lemon slices to skillet.",
      "Cook another 4-5 minutes until asparagus is tender-crisp and salmon flakes easily.",
    ],
    chefTip: "Pat salmon fillet thoroughly dry with paper towels before searing to guarantee ultra-crispy skin.",
  },

  // ----------------------------------------------------
  // ITALIAN (9 RECIPES)
  // ----------------------------------------------------
  {
    id: "it-1",
    title: "Classic Neapolitan Margherita Pizza",
    cuisine: "Italian",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "10 min",
    ways: 4,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "680 kcal", protein: "26g", carbs: "84g", fat: "24g", fiber: "5g" },
    equipment: ["Pizza Stone or Baking Sheet", "Rolling Pin", "Peel"],
    ingredients: [
      "1 Ball Fermented Pizza Dough",
      "1/2 cup San Marzano Tomato Sauce",
      "150g Fresh Mozzarella di Bufala",
      "Fresh Basil Leaves",
      "Extra Virgin Olive Oil & Sea Salt",
    ],
    steps: [
      "Preheat oven with pizza stone at maximum heat (500°F) for 45 minutes.",
      "Stretch dough gently by hand into 12-inch circle.",
      "Spread San Marzano sauce, tear fresh mozzarella over top.",
      "Bake 8-10 minutes until crust is charred and blistered; top with fresh basil leaves.",
    ],
    chefTip: "Never use a rolling pin on fermented pizza dough—stretching by hand retains light airy air pockets.",
  },
  {
    id: "it-2",
    title: "Tuscan Garlic Butter Shrimp Pasta",
    cuisine: "Italian",
    meal: "dinner",
    level: "easy",
    prepTime: "10 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "540 kcal", protein: "32g", carbs: "52g", fat: "22g", fiber: "4g" },
    equipment: ["Large Skillet", "Pasta Pot"],
    ingredients: [
      "250g Fettuccine or Tagliatelle",
      "400g Large Shrimp (peeled & deveined)",
      "4 Cloves Garlic (minced)",
      "1/2 cup Sun-Dried Tomatoes",
      "2 cups Baby Spinach",
      "1/2 cup Heavy Cream & Parmesan",
    ],
    steps: [
      "Boil fettuccine in salted water until al dente.",
      "Sauté shrimp in butter and olive oil 2 minutes per side; remove.",
      "In same skillet, sauté garlic, sun-dried tomatoes, spinach, cream, and parmesan until bubbling.",
      "Toss pasta and shrimp in sauce until glossy.",
    ],
    chefTip: "Save 1/2 cup starchy pasta water to emulsify the cream sauce into silky perfection.",
  },
  {
    id: "it-3",
    title: "Authentic Roman Spaghetti Carbonara",
    cuisine: "Italian",
    meal: "dinner",
    level: "medium",
    prepTime: "10 min",
    cookTime: "15 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "620 kcal", protein: "28g", carbs: "65g", fat: "28g", fiber: "3g" },
    equipment: ["Skillet", "Mixing Bowl", "Tongs"],
    ingredients: [
      "350g Spaghetti",
      "150g Guanciale or Pancetta (cubed)",
      "4 Fresh Egg Yolks + 1 Whole Egg",
      "1 cup Pecorino Romano (finely grated)",
      "Freshly Cracked Black Pepper",
    ],
    steps: [
      "Render guanciale in skillet over medium heat until golden and crispy.",
      "Whisk egg yolks, whole egg, pecorino, and black pepper in a bowl.",
      "Cook spaghetti al dente; transfer directly to skillet with rendered guanciale fat off heat.",
      "Pour egg mixture while tossing rapidly with pasta water to form creamy emulsion without scrambling.",
    ],
    chefTip: "No cream or garlic in authentic Roman carbonara! The silky creaminess comes strictly from egg yolk, cheese, and pasta starch water.",
  },
  {
    id: "it-4",
    title: "Creamy Wild Mushroom Risotto",
    cuisine: "Italian",
    meal: "dinner",
    level: "hard",
    prepTime: "15 min",
    cookTime: "25 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "490 kcal", protein: "14g", carbs: "68g", fat: "18g", fiber: "5g" },
    equipment: ["Wide Dutch Oven", "Ladle"],
    ingredients: [
      "1.5 cups Arborio Rice",
      "300g Mixed Wild Mushrooms (Cremini, Shiitake, Porcini)",
      "4 cups Warm Vegetable Broth",
      "1/2 cup Dry White Wine",
      "1/2 cup Parmigiano Reggiano",
      "2 tbsp Unsalted Butter & Thyme",
    ],
    steps: [
      "Sauté sliced mushrooms in butter with fresh thyme until browned; set aside.",
      "Toast Arborio rice in olive oil 2 minutes; deglaze with white wine.",
      "Add warm broth one ladle at a time, stirring constantly until absorbed before adding next.",
      "Finish by folding in mushrooms, butter, and Parmigiano for a wavy (all'onda) texture.",
    ],
    chefTip: "Keep broth hot in a separate saucepan so it doesn't drop the cooking temperature when ladled into rice.",
  },
  {
    id: "it-5",
    title: "Rustic Tomato Basil Bruschetta",
    cuisine: "Italian",
    meal: "snack",
    level: "easy",
    prepTime: "10 min",
    cookTime: "5 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "220 kcal", protein: "6g", carbs: "26g", fat: "10g", fiber: "3g" },
    equipment: ["Grill Pan", "Mixing Bowl"],
    ingredients: [
      "1 Italian Ciabatta Loaf (sliced)",
      "4 Ripe Vine Tomatoes (diced)",
      "2 Cloves Garlic (peeled)",
      "Handful Fresh Basil",
      "3 tbsp Extra Virgin Olive Oil & Balsamic Glaze",
    ],
    steps: [
      "Grill ciabatta slices until toasted with charred marks.",
      "Rub raw garlic clove directly over hot toasted bread surface.",
      "Toss diced tomatoes with chopped basil, olive oil, salt, and pepper.",
      "Spoon tomato salad over garlic toast and drizzle with aged balsamic glaze.",
    ],
    chefTip: "Rubbing raw garlic on hot crusty toast infuses subtle aromatic garlic oil without biting pieces.",
  },
  {
    id: "it-6",
    title: "Creamy Venetian Tiramisu",
    cuisine: "Italian",
    meal: "snack",
    level: "medium",
    prepTime: "25 min",
    cookTime: "0 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "450 kcal", protein: "8g", carbs: "48g", fat: "26g", fiber: "2g" },
    equipment: ["Hand Mixer", "Baking Dish"],
    ingredients: [
      "24 Italian Ladyfingers (Savoiardi)",
      "500g Mascarpone Cheese",
      "4 Organic Eggs (separated)",
      "1/2 cup Sugar",
      "1.5 cups Strong Espresso Coffee (cooled)",
      "2 tbsp Dark Rum or Marsala Wine",
      "Dutch Process Cocoa Powder",
    ],
    steps: [
      "Whip egg yolks with sugar until pale; fold into softened mascarpone.",
      "Whip egg whites to stiff peaks; gently fold into mascarpone cream.",
      "Dip ladyfingers quickly in espresso-rum mix; layer in dish.",
      "Top with mascarpone cream, repeat layers, chill 6 hours, and dust heavily with cocoa powder.",
    ],
    chefTip: "Dip ladyfingers for just 1 second per side—over-soaking makes tiramisu watery.",
  },
  {
    id: "it-7",
    title: "Eggplant Parmigiana (Melanzane)",
    cuisine: "Italian",
    meal: "dinner",
    level: "medium",
    prepTime: "25 min",
    cookTime: "40 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "410 kcal", protein: "18g", carbs: "28g", fat: "26g", fiber: "8g" },
    equipment: ["Baking Dish", "Skillet"],
    ingredients: [
      "2 Large Globe Eggplants (sliced 1/2 inch)",
      "2 cups Marinara Sauce",
      "300g Fresh Mozzarella",
      "1 cup Parmigiano Reggiano",
      "Fresh Basil & Breadcrumbs",
    ],
    steps: [
      "Salt eggplant slices for 20 minutes to draw out moisture; pat dry.",
      "Pan-fry or bake eggplant slices until golden.",
      "Layer marinara sauce, eggplant, mozzarella, basil, and parmesan in baking dish.",
      "Bake at 375°F for 35 minutes until cheese is bubbly and golden brown.",
    ],
    chefTip: "Baking the eggplant slices instead of deep frying keeps the dish lighter while maintaining rich tender texture.",
  },
  {
    id: "it-8",
    title: "Siciliano Arancini Risotto Balls",
    cuisine: "Italian",
    meal: "side",
    level: "hard",
    prepTime: "30 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "380 kcal", protein: "12g", carbs: "44g", fat: "17g", fiber: "3g" },
    equipment: ["Deep Fryer or Heavy Pot", "Bowls"],
    ingredients: [
      "2 cups Chilled Leftover Risotto",
      "100g Mozzarella (cubed)",
      "1/2 cup Meat Ragù or Peas",
      "2 Eggs (beaten)",
      "1 cup Panko Breadcrumbs & Flour",
    ],
    steps: [
      "Scoop chilled risotto, press mozzarella cube into center, roll into golf-ball size spheres.",
      "Dredge risotto balls in flour, dip in egg wash, coat thoroughly in panko breadcrumbs.",
      "Deep fry in 350°F oil for 4-5 minutes until deep golden brown.",
    ],
    chefTip: "Chilling leftover risotto overnight is essential—warm risotto will fall apart in the oil fry bath.",
  },
  {
    id: "it-9",
    title: "Genoese Pesto Pasta with Potato & Beans",
    cuisine: "Italian",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "12 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "510 kcal", protein: "14g", carbs: "62g", fat: "24g", fiber: "6g" },
    equipment: ["Mortar & Pestle or Food Processor", "Pot"],
    ingredients: [
      "300g Trofie or Trenette Pasta",
      "2 cups Fresh Genovese Basil Leaves",
      "1/3 cup Pine Nuts & Garlic",
      "1/2 cup Parmigiano & Pecorino",
      "1/2 cup Extra Virgin Olive Oil",
      "1 Yukon Gold Potato & Green Beans",
    ],
    steps: [
      "Blend basil, pine nuts, garlic, cheese, and olive oil into bright green pesto.",
      "Boil diced potato cubes and green beans in salted pasta water for 5 minutes.",
      "Add trofie pasta to same pot and cook al dente.",
      "Drain and toss warm pasta and vegetables with fresh pesto.",
    ],
    chefTip: "Traditional Genoese recipe boils potato cubes with pasta—the released starch thickens pesto into velvet.",
  },

  // ----------------------------------------------------
  // INDIAN (10 RECIPES)
  // ----------------------------------------------------
  {
    id: "in-1",
    title: "Creamy Butter Chicken (Murgh Makhani)",
    cuisine: "Indian",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "25 min",
    ways: 4,
    imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "580 kcal", protein: "36g", carbs: "18g", fat: "40g", fiber: "3g" },
    equipment: ["Heavy Skillet", "Blender"],
    ingredients: [
      "600g Chicken Thighs (marinated in yogurt & spices)",
      "1 can Tomato Puree",
      "1/2 cup Heavy Cream & 3 tbsp Butter",
      "1 tbsp Garam Masala & Kasuri Methi (Fenugreek)",
      "Garlic, Ginger, Cashew Paste",
    ],
    steps: [
      "Sear marinated chicken pieces in skillet until charred; set aside.",
      "Simmer ginger, garlic, cashew paste, and tomato puree for 15 minutes.",
      "Blend gravy into silky smooth sauce; stir in butter, heavy cream, and kasuri methi.",
      "Add seared chicken back to gravy and simmer 10 minutes.",
    ],
    chefTip: "Crush dried Kasuri Methi between your palms before adding to unlock iconic restaurant aroma.",
  },
  {
    id: "in-2",
    title: "Amritsari Chana Masala with Bhatura",
    cuisine: "Indian",
    meal: "lunch",
    level: "medium",
    prepTime: "15 min",
    cookTime: "30 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "460 kcal", protein: "18g", carbs: "72g", fat: "12g", fiber: "16g" },
    equipment: ["Pressure Cooker or Pot", "Skillet"],
    ingredients: [
      "2 cups Chickpeas (soaked overnight)",
      "1 Black Tea Bag & Cinnamon Stick",
      "2 Onions & 3 Tomatoes (finely chopped)",
      "1 tbsp Chana Masala Spice Mix & Amchur",
      "Fresh Ginger Julienne & Green Chilies",
    ],
    steps: [
      "Pressure cook chickpeas with tea bag for rich dark color and deep flavor.",
      "Sauté onions, ginger, garlic, and tomato puree until oil separates.",
      "Add chana masala, amchur (mango powder), and simmer cooked chickpeas with gravy for 20 minutes.",
      "Garnish with ginger juliennes, green chilies, and fresh coriander.",
    ],
    chefTip: "Boiling chickpeas with a black tea bag imparts authentic dark color without changing taste.",
  },
  {
    id: "in-3",
    title: "Hyderabadi Chicken Dum Biryani",
    cuisine: "Indian",
    meal: "dinner",
    level: "hard",
    prepTime: "30 min",
    cookTime: "45 min",
    ways: 4,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "650 kcal", protein: "38g", carbs: "75g", fat: "22g", fiber: "5g" },
    equipment: ["Heavy Biryani Handi", "Dough Seal"],
    ingredients: [
      "500g Basmati Rice (parboiled with whole spices)",
      "600g Chicken Thighs (marinated in yogurt, mint, spices)",
      "1 cup Biryani Fried Onions (Birista)",
      "1/4 cup Saffron Milk & Ghee",
      "Fresh Mint & Coriander Leaves",
    ],
    steps: [
      "Layer marinated raw chicken at bottom of heavy handi pot.",
      "Top with 70% cooked parboiled basmati rice, fried onions, mint, saffron milk, and ghee.",
      "Seal lid with flour dough and cook on low heat (Dum) for 35 minutes.",
      "Rest 10 minutes, break seal, and gently fluff biryani layers.",
    ],
    chefTip: "Soak basmati rice for 30 minutes before parboiling so grains stretch long and remain fluffy.",
  },
  {
    id: "in-4",
    title: "Palak Paneer (Spinach Cottage Cheese)",
    cuisine: "Indian",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "380 kcal", protein: "20g", carbs: "14g", fat: "28g", fiber: "6g" },
    equipment: ["Blender", "Skillet"],
    ingredients: [
      "250g Fresh Paneer Cubes",
      "4 cups Fresh Spinach Leaves (blanched)",
      "1 Onion & 2 Tomatoes (minced)",
      "1 tbsp Garam Masala & Cumin Seeds",
      "2 tbsp Heavy Cream or Butter",
    ],
    steps: [
      "Blanch spinach in boiling water 2 minutes, shock in ice water, puree smooth.",
      "Pan-fry paneer cubes lightly until golden.",
      "Sauté cumin, garlic, onions, and tomatoes; stir in spinach puree and spices.",
      "Add paneer cubes, simmer 5 minutes, finish with a swirl of fresh cream.",
    ],
    chefTip: "Ice-bathing spinach immediately after blanching locks in vibrant emerald green color.",
  },
  {
    id: "in-5",
    title: "Dal Makhani (Slow-Cooked Black Lentils)",
    cuisine: "Indian",
    meal: "dinner",
    level: "medium",
    prepTime: "15 min",
    cookTime: "60 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "420 kcal", protein: "18g", carbs: "52g", fat: "16g", fiber: "14g" },
    equipment: ["Heavy Dutch Oven or Pressure Cooker"],
    ingredients: [
      "1 cup Whole Black Gram (Urad Dal)",
      "1/4 cup Kidney Beans (Rajma)",
      "1/2 cup Tomato Puree & Ginger-Garlic Paste",
      "4 tbsp Butter & 1/4 cup Cream",
      "Kasturi Methi & Garam Masala",
    ],
    steps: [
      "Pressure cook urad dal and kidney beans until melt-in-mouth soft.",
      "Simmer cooked lentils with tomato puree, ginger, and butter on low heat for 45 minutes.",
      "Mash lentils partially to release starches for velvety texture.",
      "Finish with Kasuri methi, heavy cream, and charcoal smoke infusion (dhungar).",
    ],
    chefTip: "The longer dal makhani simmers on low heat, the creamier and richer it naturally becomes.",
  },
  {
    id: "in-6",
    title: "Crispy Potato Samosas with Tamarind Chutney",
    cuisine: "Indian",
    meal: "snack",
    level: "medium",
    prepTime: "30 min",
    cookTime: "20 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "320 kcal", protein: "6g", carbs: "42g", fat: "15g", fiber: "5g" },
    equipment: ["Deep Fryer or Wok", "Rolling Pin"],
    ingredients: [
      "2 cups All-Purpose Flour & Carom Seeds (Ajwain)",
      "4 Potatoes (boiled & mashed rough)",
      "1/2 cup Green Peas",
      "1 tbsp Cumin, Coriander & Amchur Spices",
      "Tamarind & Mint Chutney",
    ],
    steps: [
      "Knead stiff samosa pastry dough with flour, ghee, ajwain, and water; rest 20 min.",
      "Sauté spiced potato and pea filling.",
      "Roll dough cones, stuff with filling, seal edges with water.",
      "Deep fry in low-medium hot oil for 15 minutes until super crispy and pale golden.",
    ],
    chefTip: "Fry samosas on low heat initially so the crust cooks through crisp without forming oil bubbles.",
  },
  {
    id: "in-7",
    title: "Garlic Butter Tandoori Naan",
    cuisine: "Indian",
    meal: "side",
    level: "easy",
    prepTime: "40 min",
    cookTime: "5 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "260 kcal", protein: "7g", carbs: "44g", fat: "7g", fiber: "2g" },
    equipment: ["Cast Iron Tawa / Skillet"],
    ingredients: [
      "2 cups All-Purpose Flour (Maida)",
      "1/2 cup Yogurt & 1 tsp Yeast/Baking Powder",
      "3 tbsp Melted Butter & Garlic (minced)",
      "Fresh Cilantro & Nigella Seeds (Kalonji)",
    ],
    steps: [
      "Knead soft fermented dough; rest 1 hour until doubled.",
      "Roll tear-drop shaped flatbread, press garlic and kalonji onto top.",
      "Brush water on underside and slap onto smoking hot cast iron skillet.",
      "Invert skillet directly over open flame to char top side; brush with garlic butter.",
    ],
    chefTip: "Wetting the bottom side of naan sticks it to the skillet so you can invert over open flame safely.",
  },
  {
    id: "in-8",
    title: "South Indian Masala Dosa with Sambar",
    cuisine: "Indian",
    meal: "breakfast",
    level: "hard",
    prepTime: "20 min",
    cookTime: "10 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "350 kcal", protein: "9g", carbs: "62g", fat: "8g", fiber: "7g" },
    equipment: ["Flat Dosa Tawa / Griddle", "Ladle"],
    ingredients: [
      "2 cups Fermented Rice & Urad Dal Batter",
      "2 cups Spiced Potato Masala",
      "1 cup Lentil Vegetable Sambar",
      "Fresh Coconut Chutney",
      "Ghee for roasting",
    ],
    steps: [
      "Pour batter onto hot seasoned griddle and swirl outward in concentric circles.",
      "Drizzle ghee around edges and cook until golden brown and super crispy.",
      "Place potato masala in center, fold into cylinder or triangle roll.",
      "Serve hot with warm sambar and fresh coconut chutney.",
    ],
    chefTip: "Wipe hot tawa with a damp cloth dipped in oil before pouring batter for paper-thin crispiness.",
  },
  {
    id: "in-9",
    title: "Chicken Tikka Skewers with Mint Chutney",
    cuisine: "Indian",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "410 kcal", protein: "42g", carbs: "8g", fat: "22g", fiber: "2g" },
    equipment: ["Skewers", "Grill or Oven Broiler"],
    ingredients: [
      "600g Boneless Chicken Thighs (cubed)",
      "1/2 cup Hung Curd Yogurt",
      "1 tbsp Kashmiri Red Chili & Garam Masala",
      "1 tbsp Mustard Oil & Lemon Juice",
      "Mint Coriander Chutney",
    ],
    steps: [
      "Marinate chicken in spiced yogurt and mustard oil for at least 3 hours.",
      "Thread chicken onto skewers with bell pepper and onion wedges.",
      "Grill or broil at high heat for 12-15 minutes until charred at edges.",
      "Baste with melted butter and serve with mint chutney and lemon wedges.",
    ],
    chefTip: "Mustard oil gives authentic tandoori flavor—heat oil until smoking before mixing into marinade.",
  },
  {
    id: "in-10",
    title: "Mango Lassi & Cardamom Refreshment",
    cuisine: "Indian",
    meal: "snack",
    level: "easy",
    prepTime: "5 min",
    cookTime: "0 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "210 kcal", protein: "6g", carbs: "38g", fat: "4g", fiber: "2g" },
    equipment: ["Blender"],
    ingredients: [
      "1 cup Sweet Alphonso Mango Pulp",
      "1 cup Plain Whole Milk Yogurt",
      "1/2 cup Cold Milk or Water",
      "2 tbsp Honey or Sugar",
      "Pinch Ground Cardamom & Pistachio Garnish",
    ],
    steps: [
      "Combine mango pulp, yogurt, milk, sugar, and cardamom in blender.",
      "Blend on high for 30 seconds until frothy and smooth.",
      "Pour into chilled glasses, garnish with crushed pistachios and saffron strands.",
    ],
    chefTip: "Use sweet ripe Alphonso or Kesar mangoes for authentic restaurant taste.",
  },

  // ----------------------------------------------------
  // MEXICAN (8 RECIPES)
  // ----------------------------------------------------
  {
    id: "mx-1",
    title: "Tacos Al Pastor with Roasted Pineapple",
    cuisine: "Mexican",
    meal: "dinner",
    level: "medium",
    prepTime: "25 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "480 kcal", protein: "28g", carbs: "46g", fat: "20g", fiber: "6g" },
    equipment: ["Cast Iron Skillet", "Chef Knife"],
    ingredients: [
      "500g Thin Pork Shoulder Slices",
      "3 tbsp Achiote Paste & Guajillo Chilies",
      "1 cup Fresh Pineapple (sliced)",
      "12 Small Warm Corn Tortillas",
      "Finely Diced White Onion & Cilantro",
      "Salsa Verde",
    ],
    steps: [
      "Marinate pork in achiote, chili puree, orange juice, and spices overnight.",
      "Sear marinated pork and pineapple slices in hot skillet until caramelized and slightly charred.",
      "Chop cooked pork and pineapple into small bite-sized pieces.",
      "Serve on double warm corn tortillas topped with onion, cilantro, and green salsa.",
    ],
    chefTip: "Double up corn tortillas for each taco—it prevents tearing when loaded with juicy salsa.",
  },
  {
    id: "mx-2",
    title: "Enchiladas Verdes with Shredded Chicken",
    cuisine: "Mexican",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "25 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "520 kcal", protein: "34g", carbs: "42g", fat: "24g", fiber: "5g" },
    equipment: ["Baking Dish", "Blender"],
    ingredients: [
      "3 cups Shredded Cooked Chicken",
      "8 Corn Tortillas",
      "2 cups Tomatillo Salsa Verde",
      "1 cup Queso Fresco & Cotija",
      "Mexican Crema & Pickled Red Onions",
    ],
    steps: [
      "Briefly dip corn tortillas in hot oil to make pliable.",
      "Fill tortillas with shredded chicken, roll tight, place seam-down in baking dish.",
      "Pour warm salsa verde over enchiladas, top with crumbled queso fresco.",
      "Bake at 375°F for 20 minutes; drizzle crema and pickled red onions before serving.",
    ],
    chefTip: "Frying tortillas for 5 seconds per side seals the corn starches so they don't get soggy under green salsa.",
  },
  {
    id: "mx-3",
    title: "Fresh Chunky Guacamole & House Chips",
    cuisine: "Mexican",
    meal: "snack",
    level: "easy",
    prepTime: "10 min",
    cookTime: "0 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "290 kcal", protein: "4g", carbs: "22g", fat: "22g", fiber: "9g" },
    equipment: ["Molcajete or Bowl", "Fork"],
    ingredients: [
      "3 Ripe Hass Avocados",
      "1/2 cup Finely Diced Red Onion",
      "1 Jalapeño (seeded & minced)",
      "1/2 cup Fresh Cilantro",
      "2 tbsp Fresh Lime Juice & Sea Salt",
      "Tortilla Chips",
    ],
    steps: [
      "Mash avocados roughly with fork in bowl or molcajete, keeping chunky pieces.",
      "Fold in red onion, jalapeño, cilantro, lime juice, and sea salt.",
      "Taste and adjust lime juice and salt.",
      "Serve immediately with crispy corn tortilla chips.",
    ],
    chefTip: "Keep avocado pits in the bowl if storing—the natural antioxidants slow down browning.",
  },
  {
    id: "mx-4",
    title: "Chilaquiles Verdes with Fried Eggs",
    cuisine: "Mexican",
    meal: "breakfast",
    level: "easy",
    prepTime: "10 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "460 kcal", protein: "18g", carbs: "48g", fat: "22g", fiber: "6g" },
    equipment: ["Skillet"],
    ingredients: [
      "4 cups Thick Crispy Tortilla Chips (Totopos)",
      "1.5 cups Warm Salsa Verde or Roja",
      "2 Pasture-Raised Eggs",
      "1/2 cup Queso Cotija & Mexican Crema",
      "Sliced Avocado & Cilantro",
    ],
    steps: [
      "Simmer salsa verde in skillet over medium heat.",
      "Toss tortilla chips in warm salsa for 2 minutes until coated but still retaining crisp bite.",
      "Fry eggs in separate skillet to sunny-side up.",
      "Plate tortilla chips, top with fried eggs, cotija cheese, crema, and sliced avocado.",
    ],
    chefTip: "Don't let chips sit in salsa too long—authentic chilaquiles are tender with a pleasant crunch inside.",
  },
  {
    id: "mx-5",
    title: "Carne Asada Burrito Bowl",
    cuisine: "Mexican",
    meal: "lunch",
    level: "easy",
    prepTime: "15 min",
    cookTime: "10 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "540 kcal", protein: "38g", carbs: "52g", fat: "20g", fiber: "8g" },
    equipment: ["Grill Pan", "Chef Knife"],
    ingredients: [
      "400g Flank Steak (marinated in lime, garlic, cilantro)",
      "1 cup Cilantro Lime Rice",
      "1/2 cup Black Beans & Corn",
      "Pico de Gallo & Avocado Slices",
      "Shredded Monterey Jack Cheese",
    ],
    steps: [
      "Grill flank steak over high heat for 4 minutes per side for medium-rare; rest and slice across grain.",
      "Layer cilantro lime rice and warm black beans in bowl.",
      "Top with sliced carne asada, pico de gallo, corn, avocado, and shredded cheese.",
    ],
    chefTip: "Always slice flank steak thinly across the grain for tender juicy bites.",
  },
  {
    id: "mx-6",
    title: "Cheesy Chipotle Chicken Quesadillas",
    cuisine: "Mexican",
    meal: "lunch",
    level: "easy",
    prepTime: "10 min",
    cookTime: "8 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "510 kcal", protein: "32g", carbs: "38g", fat: "26g", fiber: "4g" },
    equipment: ["Skillet or Griddle"],
    ingredients: [
      "2 Large Flour Tortillas",
      "1.5 cups Shredded Chipotle Chicken",
      "1.5 cups Oaxaca or Monterey Jack Cheese",
      "1/2 cup Caramelized Onions",
      "Sour Cream & Salsa",
    ],
    steps: [
      "Place flour tortilla in buttered skillet over medium heat.",
      "Layer cheese, chipotle chicken, and onions on one half; fold tortilla over.",
      "Cook 3-4 minutes per side until golden crispy outside and melted inside.",
      "Slice into triangles and serve with sour cream.",
    ],
    chefTip: "Butter the outside of flour tortillas before frying for extra golden crunch.",
  },
  {
    id: "mx-7",
    title: "Sizzling Steak & Pepper Fajitas",
    cuisine: "Mexican",
    meal: "dinner",
    level: "medium",
    prepTime: "15 min",
    cookTime: "12 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "560 kcal", protein: "36g", carbs: "44g", fat: "24g", fiber: "6g" },
    equipment: ["Cast Iron Skillet"],
    ingredients: [
      "400g Sirloin Steak (sliced into strips)",
      "2 Bell Peppers (Red & Green, sliced)",
      "1 Large Yellow Onion (sliced)",
      "1 tbsp Cumin, Chili Powder & Garlic",
      "Warm Tortillas, Guacamole & Sour Cream",
    ],
    steps: [
      "Sear steak strips in smoking hot cast iron skillet 2 minutes; remove.",
      "Sauté bell peppers and onions with fajita spices until charred tender.",
      "Return steak to skillet to combine and sizzle.",
      "Serve sizzling skillet with warm tortillas, guacamole, and sour cream.",
    ],
    chefTip: "Get the cast iron skillet screaming hot before cooking for smoky restaurant fajita sizzle.",
  },
  {
    id: "mx-8",
    title: "Cinnamon Sugar Churros with Chocolate",
    cuisine: "Mexican",
    meal: "snack",
    level: "medium",
    prepTime: "20 min",
    cookTime: "15 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "380 kcal", protein: "5g", carbs: "52g", fat: "18g", fiber: "3g" },
    equipment: ["Piping Bag with Star Tip", "Deep Pot"],
    ingredients: [
      "1 cup Water & 2 tbsp Butter",
      "1 cup All-Purpose Flour",
      "2 Eggs & 1 tsp Vanilla",
      "1/2 cup Sugar + 1 tbsp Cinnamon",
      "Dark Chocolate Dipping Sauce",
    ],
    steps: [
      "Boil water, butter, and sugar; stir in flour until dough forms ball.",
      "Beat in eggs one at a time until smooth choux dough.",
      "Pipe star-shaped strips directly into 350°F hot oil; fry 4-5 minutes until golden.",
      "Toss hot churros in cinnamon sugar; serve with warm Mexican chocolate sauce.",
    ],
    chefTip: "Use a closed star piping tip to create deep ridges that hold cinnamon sugar.",
  },

  // ----------------------------------------------------
  // JAPANESE (8 RECIPES)
  // ----------------------------------------------------
  {
    id: "jp-1",
    title: "Tonkotsu Pork Belly Ramen",
    cuisine: "Japanese",
    meal: "dinner",
    level: "hard",
    prepTime: "30 min",
    cookTime: "40 min",
    ways: 4,
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "670 kcal", protein: "32g", carbs: "68g", fat: "30g", fiber: "4g" },
    equipment: ["Deep Stockpot", "Ramen Strainer"],
    ingredients: [
      "2 portions Fresh Ramen Noodles",
      "4 cups Rich Pork Bone Broth (Tonkotsu)",
      "4 Slices Braised Pork Belly (Chashu)",
      "2 Soy Marinated Eggs (Ajitsuke Tamago)",
      "Nori Sheets, Menma Bamboo & Wood Ear Mushrooms",
      "Scallions & Black Garlic Oil (Mayu)",
    ],
    steps: [
      "Heat pork broth to boiling steam and season with tare sauce.",
      "Boil ramen noodles in separate water for 90 seconds until al dente.",
      "Drain noodles, place into bowl, pour piping hot broth over top.",
      "Arrange chashu slices, halved soft egg, nori, bamboo shoots, and drizzle black garlic oil.",
    ],
    chefTip: "Marinate soft-boiled eggs (6 min boil) in soy sauce, mirin, and dashi for 12 hours for jammy yolks.",
  },
  {
    id: "jp-2",
    title: "Salmon & Avocado Roll (Sushi)",
    cuisine: "Japanese",
    meal: "lunch",
    level: "medium",
    prepTime: "25 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "390 kcal", protein: "22g", carbs: "54g", fat: "10g", fiber: "5g" },
    equipment: ["Bamboo Rolling Mat (Makisu)", "Sharp Chef Knife"],
    ingredients: [
      "2 cups Seasoned Sushi Rice",
      "200g Sashimi-Grade Fresh Salmon (sliced)",
      "1 Avocado (sliced thin)",
      "4 Nori Sheets",
      "Pickled Ginger, Wasabi & Soy Sauce",
    ],
    steps: [
      "Spread seasoned sushi rice evenly over nori sheet on bamboo mat.",
      "Place salmon strips and avocado slices along bottom edge.",
      "Roll tightly using bamboo mat into neat cylinder.",
      "Slice into 8 uniform pieces with wet sharp knife; serve with wasabi and soy sauce.",
    ],
    chefTip: "Wipe knife blade with a damp towel between every single cut for clean sushi slices.",
  },
  {
    id: "jp-3",
    title: "Crispy Chicken Katsu Curry",
    cuisine: "Japanese",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "20 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "630 kcal", protein: "36g", carbs: "72g", fat: "22g", fiber: "4g" },
    equipment: ["Deep Skillet", "Pot"],
    ingredients: [
      "2 Chicken Breasts (pounded thin)",
      "1 cup Panko Breadcrumbs & Egg Wash",
      "2 Japanese Curry Roux Blocks",
      "1 Potato & 1 Carrot (cubed)",
      "Steamed Short-Grain Japanese Rice",
    ],
    steps: [
      "Dredge chicken in flour, dip in egg, coat in panko; fry in 350°F oil 6 minutes until crispy.",
      "Boil potato and carrot cubes; stir in Japanese curry roux blocks until thick curry sauce forms.",
      "Slice chicken katsu strips, lay over warm rice bed, ladle savory brown curry alongside.",
    ],
    chefTip: "Use Japanese Panko breadcrumbs—they absorb less oil and create lighter crispy coating than western breadcrumbs.",
  },
  {
    id: "jp-4",
    title: "Classic Miso Soup with Tofu & Wakame",
    cuisine: "Japanese",
    meal: "side",
    level: "easy",
    prepTime: "5 min",
    cookTime: "5 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "90 kcal", protein: "7g", carbs: "8g", fat: "3g", fiber: "2g" },
    equipment: ["Small Pot", "Whisk"],
    ingredients: [
      "3 cups Dashi Stock (Kombu & Bonito)",
      "3 tbsp Red or White Miso Paste",
      "100g Silken Tofu (cubed small)",
      "2 tbsp Dried Wakame Seaweed",
      "Sliced Green Scallions",
    ],
    steps: [
      "Simmer dashi stock in pot; rehydrate wakame seaweed.",
      "Add silken tofu cubes and simmer gently 1 minute.",
      "Turn off heat; dissolve miso paste through strainer into dashi broth.",
      "Ladle into bowls and garnish with green scallions.",
    ],
    chefTip: "Never boil broth after adding miso paste—high heat destroys delicate probiotic aromatic compounds.",
  },
  {
    id: "jp-5",
    title: "Glazed Teriyaki Salmon Rice Bowl",
    cuisine: "Japanese",
    meal: "dinner",
    level: "easy",
    prepTime: "10 min",
    cookTime: "10 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "510 kcal", protein: "34g", carbs: "52g", fat: "18g", fiber: "3g" },
    equipment: ["Skillet"],
    ingredients: [
      "2 Fresh Salmon Fillets",
      "3 tbsp Soy Sauce, Mirin & Sake",
      "1 tbsp Sugar & Honey",
      "Steamed Jasmine Rice",
      "Sesame Seeds & Steamed Edamame",
    ],
    steps: [
      "Sear salmon fillets skin-side down in skillet 4 minutes.",
      "Flip salmon, pour in teriyaki glaze (soy sauce, mirin, sake, sugar).",
      "Simmer glaze until thick and bubbly, basting salmon continuously.",
      "Serve over warm rice with sesame seeds and edamame.",
    ],
    chefTip: "Baste salmon continuously with thickening teriyaki glaze during final minute for shiny mirror coat.",
  },
  {
    id: "jp-6",
    title: "Pork & Cabbage Gyoza Dumplings",
    cuisine: "Japanese",
    meal: "side",
    level: "medium",
    prepTime: "25 min",
    cookTime: "10 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "340 kcal", protein: "16g", carbs: "38g", fat: "14g", fiber: "3g" },
    equipment: ["Non-stick Skillet with Lid"],
    ingredients: [
      "24 Gyoza Wrapper Skins",
      "250g Ground Pork",
      "1 cup Napa Cabbage (minced & salted)",
      "Garlic, Ginger, Sesame Oil & Soy Sauce",
      "Ponzu Dipping Sauce",
    ],
    steps: [
      "Mix ground pork, squeezed cabbage, garlic, ginger, and sesame oil.",
      "Pleat gyoza wrappers with filling into half-moon shapes.",
      "Pan-fry gyoza in oiled skillet 2 minutes until bottom is deep golden.",
      "Pour 1/4 cup water into skillet, cover with lid immediately, steam 4 minutes.",
    ],
    chefTip: "The pan-fry then steam method (hane) creates ultra-crispy bottoms with tender juicy tops.",
  },
  {
    id: "jp-7",
    title: "Charred Chicken Yakitori Skewers",
    cuisine: "Japanese",
    meal: "snack",
    level: "easy",
    prepTime: "15 min",
    cookTime: "10 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "320 kcal", protein: "28g", carbs: "12g", fat: "17g", fiber: "1g" },
    equipment: ["Grill Pan or Charcoal Grill", "Bamboo Skewers"],
    ingredients: [
      "400g Chicken Thighs (cubed)",
      "1 Bunch Scallion / Leek Stems (1-inch cut)",
      "1/2 cup Tare Soy Sauce Glaze",
      "Shichimi Togarashi (7-Spice Mix)",
    ],
    steps: [
      "Thread alternating chicken pieces and scallion stems onto soaked bamboo skewers.",
      "Grill over hot grill 3 minutes per side.",
      "Dip or brush heavily with sweet savory Tare glaze.",
      "Grill another 2 minutes until glaze caramelizes with smoky char; sprinkle Shichimi Togarashi.",
    ],
    chefTip: "Soak bamboo skewers in water for 30 minutes before grilling so they don't burn.",
  },
  {
    id: "jp-8",
    title: "Crispy Vegetable & Shrimp Tempura",
    cuisine: "Japanese",
    meal: "side",
    level: "medium",
    prepTime: "15 min",
    cookTime: "10 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "410 kcal", protein: "18g", carbs: "42g", fat: "19g", fiber: "3g" },
    equipment: ["Deep Frying Pot", "Chopsticks"],
    ingredients: [
      "8 Large Shrimp (straightened)",
      "Sweet Potato, Sweet Onion, Lotus Root Slices",
      "1 cup Ice Cold Water + 1 Egg Yolk",
      "1 cup Cake Flour (sifted)",
      "Tentsuyu Dipping Sauce with Grated Daikon",
    ],
    steps: [
      "Mix ice cold water, egg yolk, and flour roughly (leave lumps, do not overmix!).",
      "Dust shrimp and vegetables in dry flour, dip into ice tempura batter.",
      "Fry in 340°F oil for 2-3 minutes until pale, airy, and ultra crisp.",
      "Serve immediately with warm tentsuyu dipping sauce.",
    ],
    chefTip: "Ice water and lumpy batter are tempura secrets—over-mixing creates gluten and makes tempura heavy.",
  },

  // ----------------------------------------------------
  // THAI (7 RECIPES)
  // ----------------------------------------------------
  {
    id: "th-1",
    title: "Classic Pad Thai Noodles with Shrimp",
    cuisine: "Thai",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "10 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "540 kcal", protein: "26g", carbs: "68g", fat: "18g", fiber: "4g" },
    equipment: ["Wok", "Spatula"],
    ingredients: [
      "200g Flat Rice Noodles (soaked warm)",
      "200g Large Shrimp",
      "2 tbsp Tamarind Paste, Fish Sauce & Palm Sugar",
      "1/2 cup Tofu Cubes & Preserved Radish",
      "2 Eggs, Bean Sprouts & Roasted Peanuts",
      "Lime Wedges & Chili Flakes",
    ],
    steps: [
      "Stir-fry shrimp and tofu in hot wok 2 minutes; push to side.",
      "Scramble eggs in wok center; add soaked rice noodles.",
      "Pour tamarind sauce mix over noodles, stir-fry rapidly at high heat.",
      "Toss in bean sprouts and garlic chives; garnish with crushed peanuts and lime.",
    ],
    chefTip: "Authentic Pad Thai uses tamarind paste for sour tang—never ketchup or tomato sauce!",
  },
  {
    id: "th-2",
    title: "Thai Green Curry Chicken (Gaeng Keow Wan)",
    cuisine: "Thai",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "20 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "490 kcal", protein: "30g", carbs: "16g", fat: "34g", fiber: "4g" },
    equipment: ["Deep Pot or Wok"],
    ingredients: [
      "500g Chicken Thighs (sliced)",
      "3 tbsp Thai Green Curry Paste",
      "1 can Coconut Milk (400ml)",
      "1 cup Thai Eggplants & Bamboo Shoots",
      "Makrut Lime Leaves & Thai Basil",
      "1 tbsp Fish Sauce & Palm Sugar",
    ],
    steps: [
      "Fry green curry paste in 1/2 cup coconut cream until fragrant oil separates.",
      "Add sliced chicken, coat in curry paste 2 minutes.",
      "Pour remaining coconut milk, add eggplants and bamboo shoots, simmer 12 minutes.",
      "Finish with fish sauce, palm sugar, torn lime leaves, and fresh Thai basil.",
    ],
    chefTip: "Crack the coconut cream by frying paste in top thick cream layer until oil breaks out for maximum flavor.",
  },
  {
    id: "th-3",
    title: "Spicy Tom Yum Goong Soup",
    cuisine: "Thai",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "15 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "260 kcal", protein: "24g", carbs: "14g", fat: "12g", fiber: "2g" },
    equipment: ["Soup Pot"],
    ingredients: [
      "400g Jumbo Prawns (with shells for stock)",
      "4 cups Prawn Stock / Water",
      "3 Stalks Lemongrass (bruised)",
      "5 Slices Galangal & 4 Lime Leaves",
      "1 cup Straw Mushrooms & Thai Bird's Eye Chilies",
      "3 tbsp Lime Juice, Fish Sauce & Roasted Chili Paste (Nam Prik Pao)",
    ],
    steps: [
      "Simmer prawn shells, lemongrass, galangal, and lime leaves in water 10 minutes to make aromatic broth.",
      "Strain broth, add mushrooms, prawns, and crushed Thai chilies; cook 3 minutes until prawns turn pink.",
      "Remove from heat; stir in lime juice, fish sauce, and chili paste.",
    ],
    chefTip: "Always add fresh lime juice off the heat—boiling lime juice turns soup bitter.",
  },
  {
    id: "th-4",
    title: "Sweet Mango Sticky Rice (Khao Niew Mamuang)",
    cuisine: "Thai",
    meal: "snack",
    level: "easy",
    prepTime: "15 min",
    cookTime: "25 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "380 kcal", protein: "5g", carbs: "76g", fat: "8g", fiber: "3g" },
    equipment: ["Steamer Basket"],
    ingredients: [
      "1 cup Thai Glutinous Sticky Rice (soaked 4h)",
      "1 cup Coconut Milk",
      "1/2 cup Sugar & Pinch of Salt",
      "2 Ripe Sweet Yellow Mangoes (sliced)",
      "Toasted Mung Beans / Sesame Seeds",
    ],
    steps: [
      "Steam soaked glutinous rice in cheesecloth steamer 20 minutes.",
      "Heat coconut milk with sugar and salt until dissolved.",
      "Pour 3/4 warm coconut sauce over hot steamed rice; cover and rest 15 minutes to absorb.",
      "Serve sweet sticky rice alongside fresh sliced mango; drizzle remaining coconut sauce and toasted mung beans.",
    ],
    chefTip: "Pouring warm coconut sauce over hot freshly steamed sticky rice ensures complete rice absorption.",
  },
  {
    id: "th-5",
    title: "Spicy Basil Pork (Pad Kra Pao)",
    cuisine: "Thai",
    meal: "lunch",
    level: "easy",
    prepTime: "10 min",
    cookTime: "8 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "490 kcal", protein: "28g", carbs: "42g", fat: "22g", fiber: "2g" },
    equipment: ["Wok"],
    ingredients: [
      "400g Ground Pork or Chicken",
      "1 cup Holy Basil Leaves (Kra Pao)",
      "6 Thai Chilies & 5 Garlic Cloves (pounded paste)",
      "1 tbsp Soy Sauce, Dark Soy Sauce & Fish Sauce",
      "Crispy Fried Egg with Runny Yolk & Jasmine Rice",
    ],
    steps: [
      "Stir-fry garlic chili paste in hot wok with oil 1 minute until fragrant.",
      "Add ground pork, break apart, stir-fry until cooked.",
      "Add soy sauces, fish sauce, and sugar; toss in holy basil leaves until wilted.",
      "Serve over hot jasmine rice with a crispy fried egg on top.",
    ],
    chefTip: "Holy basil (Kra Pao) has a distinct peppery anise flavor that defines true street-style Pad Kra Pao.",
  },
  {
    id: "th-6",
    title: "Rich Massaman Beef Curry",
    cuisine: "Thai",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "45 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "580 kcal", protein: "34g", carbs: "28g", fat: "38g", fiber: "5g" },
    equipment: ["Dutch Oven"],
    ingredients: [
      "600g Beef Chuck (cubed)",
      "3 tbsp Massaman Curry Paste",
      "1 can Coconut Milk (400ml)",
      "2 Potatoes & 1 Onion (cut into chunks)",
      "1/4 cup Roasted Peanuts & Tamarind Paste",
      "Cinnamon Stick & Cardamom Pods",
    ],
    steps: [
      "Fry Massaman paste in coconut cream with cinnamon and cardamom.",
      "Add beef chuck cubes and brown in curry paste.",
      "Pour remaining coconut milk and broth; simmer covered 35 minutes until beef is fork tender.",
      "Add potatoes, onions, peanuts, and tamarind; simmer another 15 minutes.",
    ],
    chefTip: "Massaman curry combines Persian spices (cinnamon, cardamom) with Thai coconut herbs.",
  },
  {
    id: "th-7",
    title: "Som Tum Green Papaya Salad",
    cuisine: "Thai",
    meal: "side",
    level: "easy",
    prepTime: "15 min",
    cookTime: "0 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "180 kcal", protein: "5g", carbs: "26g", fat: "7g", fiber: "5g" },
    equipment: ["Thai Wooden Mortar & Pestle"],
    ingredients: [
      "2 cups Shredded Unripe Green Papaya",
      "2 Garlic Cloves & 3 Thai Chilies",
      "1 tbsp Palm Sugar, Fish Sauce & Lime Juice",
      "1/2 cup Cherry Tomatoes & Long Beans",
      "2 tbsp Roasted Peanuts & Dried Shrimp",
    ],
    steps: [
      "Pound garlic and chilies in wooden mortar.",
      "Add palm sugar, lime juice, fish sauce, cherry tomatoes, and long beans; bruise gently.",
      "Add shredded green papaya and dried shrimp; toss and pound lightly so papaya absorbs dressing.",
      "Top with roasted peanuts and serve fresh.",
    ],
    chefTip: "Pounding the salad in a mortar bruises the papaya fibers so it absorbs the sweet sour chili lime dressing.",
  },

  // ----------------------------------------------------
  // CHINESE (7 RECIPES)
  // ----------------------------------------------------
  {
    id: "cn-1",
    title: "Kung Pao Chicken with Roasted Peanuts",
    cuisine: "Chinese",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "10 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "480 kcal", protein: "32g", carbs: "24g", fat: "28g", fiber: "4g" },
    equipment: ["Wok"],
    ingredients: [
      "500g Chicken Thighs (diced)",
      "1/2 cup Dry Red Chilies & Sichuan Peppercorns",
      "1/2 cup Roasted Peanuts",
      "Scallion Whites & Ginger Garlic Paste",
      "2 tbsp Dark Soy, Shaoxing Wine & Chinkiang Vinegar",
    ],
    steps: [
      "Marinate diced chicken in Shaoxing wine, soy sauce, and cornstarch 15 minutes.",
      "Stir-fry dried red chilies and Sichuan peppercorns in hot oil until fragrant.",
      "Add chicken and sear 3 minutes; toss in scallions, ginger, and garlic.",
      "Pour in savory sauce mix and roasted peanuts; toss at high heat until glossy.",
    ],
    chefTip: "Sichuan peppercorns produce a pleasant numbing sensation (Ma) that balances spicy chili heat (La).",
  },
  {
    id: "cn-2",
    title: "Steamed Pork & Chive Dumplings (Jiaozi)",
    cuisine: "Chinese",
    meal: "lunch",
    level: "medium",
    prepTime: "30 min",
    cookTime: "10 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "380 kcal", protein: "18g", carbs: "44g", fat: "14g", fiber: "3g" },
    equipment: ["Bamboo Steamer Basket"],
    ingredients: [
      "30 Dumpling Wrappers",
      "300g Ground Pork",
      "1 cup Garlic Chives (chopped)",
      "Ginger, Soy Sauce, Sesame Oil & Shaoxing Wine",
      "Chili Oil Soy Dip",
    ],
    steps: [
      "Mix ground pork with garlic chives, ginger, soy sauce, and sesame oil.",
      "Spoon filling into center of wrapper, fold edges into pleats, seal tight.",
      "Arrange in bamboo steamer lined with parchment paper.",
      "Steam over boiling water 10 minutes until juicy and translucent; serve with chili oil dip.",
    ],
    chefTip: "Stir ground pork filling in one direction continuously to build protein emulsion for juicy dumplings.",
  },
  {
    id: "cn-3",
    title: "Yangzhou Special Fried Rice",
    cuisine: "Chinese",
    meal: "lunch",
    level: "easy",
    prepTime: "10 min",
    cookTime: "8 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "460 kcal", protein: "22g", carbs: "62g", fat: "14g", fiber: "3g" },
    equipment: ["Wok"],
    ingredients: [
      "3 cups Day-Old Jasmine Rice (chilled)",
      "100g Diced BBQ Pork (Char Siu) & Small Shrimp",
      "2 Eggs (beaten)",
      "1/2 cup Green Peas & Diced Carrots",
      "Light Soy Sauce, Sesame Oil & Scallions",
    ],
    steps: [
      "Scramble eggs in hot oil wok until soft curds form; remove.",
      "Stir-fry shrimp and diced Char Siu pork 2 minutes.",
      "Add chilled day-old rice, break apart grains at high heat.",
      "Toss in eggs, peas, light soy sauce, sesame oil, and scallions until fragrant.",
    ],
    chefTip: "Using day-old refrigerated rice is essential—fresh warm rice turns mushy when stir-fried.",
  },
  {
    id: "cn-4",
    title: "Authentic Mapo Tofu with Minced Pork",
    cuisine: "Chinese",
    meal: "dinner",
    level: "medium",
    prepTime: "15 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "390 kcal", protein: "24g", carbs: "12g", fat: "28g", fiber: "3g" },
    equipment: ["Wok"],
    ingredients: [
      "400g Silken Tofu (cubed)",
      "150g Ground Pork or Beef",
      "2 tbsp Sichuan Pixian Doubanjiang (Chili Bean Paste)",
      "1 tbsp Sichuan Peppercorn Powder",
      "Garlic, Ginger, Chili Flakes & Cornstarch Slurry",
    ],
    steps: [
      "Simmer silken tofu cubes in salted warm water 2 minutes; drain.",
      "Fry ground pork in wok until crispy; stir in Doubanjiang chili bean paste.",
      "Add garlic, ginger, and broth; gently slide in tofu cubes.",
      "Thicken sauce with cornstarch slurry; sprinkle toasted Sichuan peppercorn powder on top.",
    ],
    chefTip: "Soaking silken tofu in warm salted water firms up the structure so cubes don't break in wok.",
  },
  {
    id: "cn-5",
    title: "Crispy Vegetable Chow Mein Noodles",
    cuisine: "Chinese",
    meal: "lunch",
    level: "easy",
    prepTime: "10 min",
    cookTime: "8 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "420 kcal", protein: "12g", carbs: "64g", fat: "14g", fiber: "5g" },
    equipment: ["Wok"],
    ingredients: [
      "250g Fresh Egg Noodles",
      "1 cup Cabbage, Carrots & Bean Sprouts",
      "2 tbsp Dark Soy Sauce & Light Soy Sauce",
      "1 tbsp Oyster Sauce & Sesame Oil",
      "Sliced Scallions & Garlic",
    ],
    steps: [
      "Boil egg noodles 1 minute; drain and toss with sesame oil.",
      "Sear vegetables in hot wok 2 minutes.",
      "Add noodles and spread out against wok walls to crisp 2 minutes.",
      "Pour soy sauces and oyster sauce; toss rapidly over high heat.",
    ],
    chefTip: "Pressing noodles against hot wok sides creates crispy charred edges characteristic of Cantonese chow mein.",
  },
  {
    id: "cn-6",
    title: "Peking Duck Style Pancakes & Wraps",
    cuisine: "Chinese",
    meal: "dinner",
    level: "hard",
    prepTime: "30 min",
    cookTime: "30 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "580 kcal", protein: "34g", carbs: "48g", fat: "26g", fiber: "3g" },
    equipment: ["Roasting Oven", "Mandoline"],
    ingredients: [
      "1 Roasted Duck Breast / Half Duck (crispy skin)",
      "12 Mandarin Thin Pancakes",
      "1/2 cup Sweet Hoisin Sauce",
      "Cucumber & Scallion Juliennes",
    ],
    steps: [
      "Roast duck at high heat until skin is shiny, deep golden, and crackling crisp.",
      "Carve crispy duck skin and meat into thin slices.",
      "Steam mandarin pancakes 3 minutes until soft.",
      "Spread hoisin sauce on warm pancake, add duck slice, cucumber, and scallion juliennes; roll tight.",
    ],
    chefTip: "Air-drying duck skin overnight before roasting is the secret to glass-like crackling skin.",
  },
  {
    id: "cn-7",
    title: "Classic Sichuan Hot & Sour Soup",
    cuisine: "Chinese",
    meal: "side",
    level: "easy",
    prepTime: "10 min",
    cookTime: "12 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "190 kcal", protein: "12g", carbs: "14g", fat: "8g", fiber: "3g" },
    equipment: ["Soup Pot"],
    ingredients: [
      "4 cups Chicken / Mushroom Stock",
      "100g Tofu & Wood Ear Mushrooms (julienned)",
      "1/4 cup Bamboo Shoots & Shiitake",
      "3 tbsp Chinkiang Black Vinegar & White Pepper",
      "1 Egg (whisked for ribbon drops)",
      "Cornstarch Slurry & Sesame Oil",
    ],
    steps: [
      "Simmer stock with mushrooms, tofu, and bamboo shoots 8 minutes.",
      "Thicken soup with cornstarch slurry.",
      "Pour whisked egg slowly into swirling soup to create delicate egg ribbons.",
      "Turn off heat; stir in black vinegar, white pepper, and sesame oil.",
    ],
    chefTip: "White pepper provides the signature 'hot' kick while Chinkiang black vinegar delivers the deep 'sour' tang.",
  },

  // ----------------------------------------------------
  // MEDITERRANEAN (7 RECIPES)
  // ----------------------------------------------------
  {
    id: "md-1",
    title: "Greek Village Salad (Horiatiki)",
    cuisine: "Mediterranean",
    meal: "lunch",
    level: "easy",
    prepTime: "10 min",
    cookTime: "0 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "320 kcal", protein: "9g", carbs: "14g", fat: "26g", fiber: "4g" },
    equipment: ["Salad Bowl", "Chef Knife"],
    ingredients: [
      "4 Ripe Vine Tomatoes (cut into wedges)",
      "1 English Cucumber (sliced thick)",
      "1/2 Red Onion (sliced thin)",
      "1 Block Greek Feta Cheese (whole slab)",
      "Kalamata Olives & Dried Wild Oregano",
      "Extra Virgin Olive Oil & Red Wine Vinegar",
    ],
    steps: [
      "Combine ripe tomato wedges, thick cucumber slices, red onion, and Kalamata olives in bowl.",
      "Drizzle generously with high-grade extra virgin olive oil and red wine vinegar.",
      "Place whole block of Greek feta cheese on top.",
      "Sprinkle dried oregano and sea salt over cheese slab.",
    ],
    chefTip: "Authentic Greek salad never contains lettuce! Place feta as a whole slab on top, not crumbled.",
  },
  {
    id: "md-2",
    title: "Crispy Falafel Pita Wrap with Tahini",
    cuisine: "Mediterranean",
    meal: "lunch",
    level: "medium",
    prepTime: "20 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "480 kcal", protein: "18g", carbs: "62g", fat: "20g", fiber: "12g" },
    equipment: ["Food Processor", "Deep Skillet"],
    ingredients: [
      "2 cups Dried Chickpeas (soaked, NOT canned!)",
      "1 cup Fresh Parsley & Cilantro",
      "4 Cloves Garlic & 1 Onion",
      "1 tbsp Cumin, Coriander & Baking Powder",
      "Pita Pockets, Hummus, Pickles & Creamy Tahini",
    ],
    steps: [
      "Pulse soaked chickpeas, herbs, garlic, onion, and spices in food processor into coarse meal.",
      "Form into small falafel patties; chill 30 minutes.",
      "Deep fry in 350°F oil 4 minutes until dark golden brown and crispy.",
      "Stuff pita pocket with hummus, crispy falafels, cucumber tomato salad, and lemon tahini sauce.",
    ],
    chefTip: "NEVER use canned chickpeas for falafel—they hold too much water and turn mushy. Use soaked raw chickpeas.",
  },
  {
    id: "md-3",
    title: "Classic Creamy Hummus & Warm Pita",
    cuisine: "Mediterranean",
    meal: "snack",
    level: "easy",
    prepTime: "15 min",
    cookTime: "10 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "310 kcal", protein: "10g", carbs: "36g", fat: "16g", fiber: "8g" },
    equipment: ["Food Processor"],
    ingredients: [
      "1 can Chickpeas (simmered with pinch baking soda)",
      "1/3 cup Quality Tahini Paste",
      "1/4 cup Fresh Lemon Juice",
      "2 Cloves Garlic & Ice Water",
      "Extra Virgin Olive Oil & Paprika",
    ],
    steps: [
      "Process tahini and lemon juice first in food processor for 1 minute until whipped fluffy.",
      "Add garlic, olive oil, cumin, and salt.",
      "Add warm chickpeas and blend 3 minutes, adding ice water drizzle for ultra-smooth velvet texture.",
      "Spoon into bowl, create swirl groove with back of spoon, fill with olive oil and paprika.",
    ],
    chefTip: "Drizzling ice water into whipped tahini creates ultra-creamy restaurant-grade smooth hummus.",
  },
  {
    id: "md-4",
    title: "Shakshuka (Poached Eggs in Tomato Pepper Sauce)",
    cuisine: "Mediterranean",
    meal: "breakfast",
    level: "easy",
    prepTime: "10 min",
    cookTime: "20 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "360 kcal", protein: "18g", carbs: "22g", fat: "22g", fiber: "6g" },
    equipment: ["Cast Iron Skillet with Lid"],
    ingredients: [
      "4 Organic Eggs",
      "1 can Crushed Tomatoes",
      "1 Bell Pepper & 1 Onion (diced)",
      "2 tbsp Olive Oil, Cumin, Paprika & Harissa",
      "Crumbled Feta & Fresh Parsley",
      "Crusty Crust Bread for Dipping",
    ],
    steps: [
      "Sauté onion and bell pepper in olive oil 6 minutes until soft.",
      "Add garlic, cumin, paprika, harissa, and crushed tomatoes; simmer 10 minutes.",
      "Make 4 small wells in tomato sauce; crack eggs directly into wells.",
      "Cover skillet and cook 5 minutes until egg whites are set but yolks are runny.",
      "Top with crumbled feta and parsley; serve hot with crusty bread.",
    ],
    chefTip: "Keep the lid on low heat just long enough for white egg films to set—keep yolks runny for dipping bread.",
  },
  {
    id: "md-5",
    title: "Pan-Seared Mediterranean Seabass",
    cuisine: "Mediterranean",
    meal: "dinner",
    level: "medium",
    prepTime: "10 min",
    cookTime: "10 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "420 kcal", protein: "36g", carbs: "8g", fat: "26g", fiber: "2g" },
    equipment: ["Stainless Steel or Cast Iron Skillet"],
    ingredients: [
      "2 Whole Seabass / Branzino Fillets (skin-on)",
      "3 tbsp Extra Virgin Olive Oil",
      "Caperm Berry, Cherry Tomatoes & Garlic",
      "Lemon Juice & White Wine",
      "Fresh Parsley",
    ],
    steps: [
      "Score skin of seabass fillets lightly and pat completely dry.",
      "Sear skin-side down in hot olive oil pressing with spatula 4 minutes until skin is glass crispy.",
      "Flip fillet; add cherry tomatoes, capers, garlic, and splash of white wine to skillet.",
      "Spoon tomato caper pan sauce over fish and serve with lemon wedges.",
    ],
    chefTip: "Pressing the fish fillet with a spatula for the first 30 seconds prevents skin curling.",
  },
  {
    id: "md-6",
    title: "Greek Chicken Souvlaki Skewers",
    cuisine: "Mediterranean",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "12 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "450 kcal", protein: "38g", carbs: "12g", fat: "28g", fiber: "2g" },
    equipment: ["Grill Pan", "Wooden Skewers"],
    ingredients: [
      "600g Chicken Breast (cubed)",
      "1/4 cup Olive Oil, Lemon Juice & Dried Oregano",
      "4 Garlic Cloves (minced)",
      "Homemade Tzatziki Dip & Warm Pita",
    ],
    steps: [
      "Marinate chicken cubes in olive oil, lemon juice, garlic, and oregano for 2 hours.",
      "Thread onto wooden skewers.",
      "Grill on high heat 10-12 minutes until charred and cooked through.",
      "Serve inside warm pita with tzatziki, tomatoes, and red onion.",
    ],
    chefTip: "Marinating in lemon juice and oregano breaks down chicken fibers for tender juicy souvlaki.",
  },
  {
    id: "md-7",
    title: "Cool Cucumber Tzatziki Dip",
    cuisine: "Mediterranean",
    meal: "side",
    level: "easy",
    prepTime: "10 min",
    cookTime: "0 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "120 kcal", protein: "6g", carbs: "6g", fat: "8g", fiber: "1g" },
    equipment: ["Cheesecloth or Grater", "Bowl"],
    ingredients: [
      "1.5 cups Strained Greek Yogurt",
      "1 English Cucumber (grated & squeezed)",
      "2 Garlic Cloves (minced fine)",
      "1 tbsp Olive Oil & 1 tsp Dill",
      "1 tbsp Lemon Juice & Salt",
    ],
    steps: [
      "Grate cucumber, squeeze inside cheesecloth to remove all excess liquid.",
      "Fold squeezed cucumber into thick strained Greek yogurt.",
      "Stir in minced garlic, olive oil, lemon juice, fresh dill, and sea salt.",
      "Chill 1 hour before serving alongside pita or grilled meats.",
    ],
    chefTip: "Squeezing all water out of grated cucumber is essential so tzatziki remains thick and never watery.",
  },

  // ----------------------------------------------------
  // FRENCH (7 RECIPES)
  // ----------------------------------------------------
  {
    id: "fr-1",
    title: "Classic French Coq au Vin",
    cuisine: "French",
    meal: "dinner",
    level: "hard",
    prepTime: "25 min",
    cookTime: "60 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "590 kcal", protein: "42g", carbs: "18g", fat: "34g", fiber: "3g" },
    equipment: ["French Heavy Dutch Oven"],
    ingredients: [
      "800g Chicken Thighs & Legs",
      "150g Lardons / Thick Bacon (cubed)",
      "1 Bottle Pinot Noir Red Wine (750ml)",
      "250g Pearl Onions & Cremini Mushrooms",
      "Butter, Flour, Garlic & Bouquet Garni",
    ],
    steps: [
      "Render bacon lardons in Dutch oven; sear chicken pieces in bacon fat until brown.",
      "Pour red wine into pot, scraping up caramelized browned bits (fonds).",
      "Add garlic, thyme, bay leaf, pearl onions, and mushrooms; simmer low heat 50 minutes.",
      "Thicken wine gravy with beurre manié (butter flour paste) until glossy.",
    ],
    chefTip: "Use decent red wine you would enjoy drinking—cheap cooking wine makes sauce taste sour.",
  },
  {
    id: "fr-2",
    title: "Provençal Vegetable Ratatouille",
    cuisine: "French",
    meal: "dinner",
    level: "medium",
    prepTime: "25 min",
    cookTime: "40 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "280 kcal", protein: "6g", carbs: "24g", fat: "18g", fiber: "8g" },
    equipment: ["Shallow Baking Dish or Skillet"],
    ingredients: [
      "1 Eggplant, 2 Zucchini & 2 Yellow Squash (thinly sliced rounds)",
      "4 Roma Tomatoes (sliced rounds)",
      "1.5 cups Bell Pepper Tomato Concasse Sauce",
      "Olive Oil, Garlic, Thyme & Rosemary",
    ],
    steps: [
      "Spread roasted pepper tomato sauce at bottom of shallow baking dish.",
      "Arrange alternating rounds of eggplant, zucchini, yellow squash, and tomato in tight spiral layout.",
      "Drizzle with garlic herb olive oil, cover with parchment paper.",
      "Bake at 375°F for 40 minutes until vegetables are tender and fragrant.",
    ],
    chefTip: "Cover with parchment paper while baking so vegetables steam tender without burning edges.",
  },
  {
    id: "fr-3",
    title: "Rich French Onion Soup Gratinee",
    cuisine: "French",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "50 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "420 kcal", protein: "18g", carbs: "32g", fat: "24g", fiber: "4g" },
    equipment: ["Oven-Safe Soup Bowls (Ramekins)", "Dutch Oven"],
    ingredients: [
      "5 Large Yellow Onions (thinly sliced)",
      "3 tbsp Butter & 1 tbsp Flour",
      "4 cups Rich Beef Stock",
      "1/2 cup Dry White Wine & Brandy",
      "Baguette Slices & 1.5 cups Gruyère Cheese",
    ],
    steps: [
      "Caramelize onions slowly in butter over medium-low heat for 45 minutes until deep mahogany jam.",
      "Stir in flour, deglaze with white wine and brandy.",
      "Add beef stock, thyme, and bay leaf; simmer 20 minutes.",
      "Ladle soup into ramekins, top with toasted baguette slice and heavy pile of grated Gruyère.",
      "Broil 4 minutes until cheese is bubbly, golden, and melted over edges.",
    ],
    chefTip: "Patience is mandatory—do not rush onion caramelization! 45 minutes builds deep natural sweetness.",
  },
  {
    id: "fr-4",
    title: "Savory Quiche Lorraine with Bacon",
    cuisine: "French",
    meal: "lunch",
    level: "medium",
    prepTime: "20 min",
    cookTime: "35 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "480 kcal", protein: "18g", carbs: "28g", fat: "34g", fiber: "2g" },
    equipment: ["Tart Pan", "Whisk"],
    ingredients: [
      "1 Blind-Baked Butter Pie Crust",
      "150g Thick-Cut Bacon (cubed & cooked)",
      "1 cup Gruyère / Swiss Cheese (grated)",
      "4 Eggs + 1 cup Heavy Cream & Milk",
      "Pinch of Nutmeg, Salt & White Pepper",
    ],
    steps: [
      "Scatter cooked bacon lardons and grated Gruyère cheese at bottom of baked pie shell.",
      "Whisk eggs, heavy cream, milk, nutmeg, salt, and pepper.",
      "Pour custard mixture into pie shell over bacon and cheese.",
      "Bake at 350°F for 35 minutes until custard is set with gentle jiggle center.",
    ],
    chefTip: "Blind baking pie crust first prevents a soggy bottom crust when filled with egg custard.",
  },
  {
    id: "fr-5",
    title: "Sweet French Crepes with Nutella & Strawberry",
    cuisine: "French",
    meal: "breakfast",
    level: "easy",
    prepTime: "10 min",
    cookTime: "10 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "360 kcal", protein: "8g", carbs: "54g", fat: "14g", fiber: "3g" },
    equipment: ["Crepe Pan or Non-stick Skillet", "Ladle"],
    ingredients: [
      "1 cup All-Purpose Flour",
      "2 Eggs & 1.25 cups Milk",
      "2 tbsp Melted Butter & 1 tsp Vanilla",
      "Nutella Hazelnut Spread",
      "Sliced Fresh Strawberries & Powdered Sugar",
    ],
    steps: [
      "Blend flour, eggs, milk, melted butter, and vanilla until smooth batter; rest 15 minutes.",
      "Pour 1/4 cup batter into hot buttered skillet, swirling quickly to coat bottom paper thin.",
      "Cook 1 minute, flip, cook 30 seconds.",
      "Spread Nutella, add fresh strawberries, fold into quarters, dust with powdered sugar.",
    ],
    chefTip: "Resting batter for 15 minutes lets flour absorb liquid for pliable non-tearing crepes.",
  },
  {
    id: "fr-6",
    title: "Classic Croque Monsieur Sandwich",
    cuisine: "French",
    meal: "lunch",
    level: "easy",
    prepTime: "10 min",
    cookTime: "10 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "540 kcal", protein: "26g", carbs: "38g", fat: "32g", fiber: "2g" },
    equipment: ["Baking Sheet", "Saucepan"],
    ingredients: [
      "4 Slices Brioche or Pain de Mie Bread",
      "150g French Ham (sliced)",
      "1.5 cups Gruyère Cheese (grated)",
      "1 cup Bechamel Sauce (Butter, Flour, Milk, Dijon)",
    ],
    steps: [
      "Make quick béchamel sauce by whisking roux with milk and Dijon mustard.",
      "Toast bread slices light golden.",
      "Layer bread with béchamel, ham, and Gruyère; cap with second slice.",
      "Spoon remaining béchamel over top, cover in cheese, broil 5 minutes until bubbling golden brown.",
    ],
    chefTip: "Top with a fried egg to convert this dish into a classic Croque Madame!",
  },
  {
    id: "fr-7",
    title: "Fluffy Grand Marnier Soufflé",
    cuisine: "French",
    meal: "snack",
    level: "hard",
    prepTime: "20 min",
    cookTime: "18 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "290 kcal", protein: "7g", carbs: "32g", fat: "14g", fiber: "1g" },
    equipment: ["Ramekins", "Electric Whisk"],
    ingredients: [
      "4 Egg Whites + 2 Egg Yolks",
      "1 cup Milk & 2 tbsp Flour/Butter",
      "2 tbsp Grand Marnier Orange Liqueur",
      "1/3 cup Sugar",
      "Butter & Sugar for coating ramekins",
    ],
    steps: [
      "Brush ramekins with soft butter in upward vertical strokes; coat inside with sugar.",
      "Cook pastry cream base with milk, yolks, flour, sugar, and Grand Marnier.",
      "Whip egg whites to glossy stiff peaks; gently fold 1/3 into base, then fold remaining whites.",
      "Fill ramekins, level top, bake at 390°F for 18 minutes without opening oven door.",
    ],
    chefTip: "Brushing butter inside ramekins with vertical upward strokes guides the soufflé to rise straight.",
  },

  // ----------------------------------------------------
  // KOREAN (7 RECIPES)
  // ----------------------------------------------------
  {
    id: "kr-1",
    title: "Classic Korean Bibimbap Rice Bowl",
    cuisine: "Korean",
    meal: "dinner",
    level: "medium",
    prepTime: "25 min",
    cookTime: "15 min",
    ways: 4,
    imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "560 kcal", protein: "28g", carbs: "72g", fat: "18g", fiber: "6g" },
    equipment: ["Dolsot Stone Bowl or Skillet"],
    ingredients: [
      "2 cups Steamed Short-Grain Rice",
      "150g Marinated Beef Bulgogi",
      "Sauteed Spinach, Bean Sprouts, Carrots & Zucchini",
      "Shiitake Mushrooms & Kimchi",
      "1 Fried Egg",
      "Gochujang Sauce Mix (Gochujang, Sesame Oil, Honey)",
    ],
    steps: [
      "Coat dolsot stone bowl with sesame oil, add cooked rice.",
      "Arrange sautéed vegetables, mushrooms, and beef bulgogi neatly in colorful radial sections.",
      "Heat stone bowl over flame until rice crackles and forms crispy bottom crust (Nurungji).",
      "Top with fried egg and sweet spicy Gochujang sauce mix; mix thoroughly before eating.",
    ],
    chefTip: "Heating stone bowl produces crispy golden rice crust (nurungji) at bottom.",
  },
  {
    id: "kr-2",
    title: "Spicy Kimchi Stew (Kimchi Jjigae)",
    cuisine: "Korean",
    meal: "dinner",
    level: "easy",
    prepTime: "10 min",
    cookTime: "20 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "420 kcal", protein: "26g", carbs: "24g", fat: "26g", fiber: "5g" },
    equipment: ["Korean Clay Pot (Ttukbaegi)"],
    ingredients: [
      "2 cups Aged Well-Fermented Kimchi (chopped)",
      "200g Pork Belly (sliced)",
      "1 Block Medium Firm Tofu (sliced)",
      "2 tbsp Gochugaru (Chili Flakes) & 1 tbsp Gochujang",
      "3 cups Anchovy Kelp Broth",
      "Scallions & Enoki Mushrooms",
    ],
    steps: [
      "Sauté pork belly and aged kimchi in clay pot 5 minutes.",
      "Add anchovy kelp broth, Gochugaru, Gochujang, and garlic; simmer 15 minutes.",
      "Add tofu slices, scallions, and enoki mushrooms; simmer 3 minutes.",
      "Serve bubbling hot with bowl of white rice.",
    ],
    chefTip: "Use sour aged kimchi (at least 3 weeks old) for deep savory tang—fresh kimchi lacks stew body.",
  },
  {
    id: "kr-3",
    title: "Cheesy Tteokbokki (Rice Cakes)",
    cuisine: "Korean",
    meal: "snack",
    level: "easy",
    prepTime: "10 min",
    cookTime: "12 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "490 kcal", protein: "16g", carbs: "82g", fat: "12g", fiber: "4g" },
    equipment: ["Wide Skillet"],
    ingredients: [
      "350g Korean Cylinder Rice Cakes (Tteok)",
      "100g Korean Fish Cakes (Eomuk, sliced)",
      "2 cups Anchovy Dashi Stock",
      "2 tbsp Gochujang, 1 tbsp Gochugaru & Sugar",
      "1 cup Mozzarella Cheese & Boiled Egg",
    ],
    steps: [
      "Soak rice cakes in warm water 10 minutes.",
      "Boil anchovy stock with Gochujang, Gochugaru, soy sauce, and sugar.",
      "Add rice cakes and fish cake slices; simmer 8 minutes until sauce thickens shiny.",
      "Melt mozzarella cheese over top and serve with hard-boiled egg.",
    ],
    chefTip: "Simmer sauce until starch from rice cakes thickens it into a glossy red coat.",
  },
  {
    id: "kr-4",
    title: "Extra Crispy Korean Fried Chicken (KFC)",
    cuisine: "Korean",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "20 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "620 kcal", protein: "38g", carbs: "48g", fat: "30g", fiber: "2g" },
    equipment: ["Deep Fryer or Heavy Dutch Oven"],
    ingredients: [
      "800g Chicken Wings / Drumettes",
      "1 cup Potato Starch or Cornstarch",
      "3 tbsp Gochujang, Honey, Garlic & Soy Sauce",
      "Sesame Seeds & Pickled Mu Radish",
    ],
    steps: [
      "Coat chicken wings in thin potato starch batter.",
      "First fry in 330°F oil 10 minutes; remove and drain 5 minutes.",
      "Double fry in 375°F oil 4 minutes until crackling golden paper-thin crunch.",
      "Toss hot wings in sticky sweet garlic Gochujang glaze.",
    ],
    chefTip: "Double frying is essential—the second high-heat fry evaporates moisture trapped in skin for ultimate crunch.",
  },
  {
    id: "kr-5",
    title: "Savory Sweet Beef Bulgogi",
    cuisine: "Korean",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "8 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "480 kcal", protein: "34g", carbs: "22g", fat: "28g", fiber: "2g" },
    equipment: ["Cast Iron Skillet or Grill Pan"],
    ingredients: [
      "500g Thinly Sliced Ribeye Steak",
      "1/2 Grated Asian Pear & 4 tbsp Soy Sauce",
      "2 tbsp Brown Sugar, Sesame Oil & Garlic",
      "Sliced Onion, Green Scallions & Sesame Seeds",
    ],
    steps: [
      "Marinate sliced ribeye in grated Asian pear, soy sauce, sugar, sesame oil, and garlic 1 hour.",
      "Sear marinated beef and onions in smoking hot skillet in small batches.",
      "Cook rapidly 3-4 minutes per side until meat caramelizes.",
      "Garnish with scallions and serve with lettuce wraps (Ssam) and Ssamjang paste.",
    ],
    chefTip: "Enzymes in grated Asian pear tenderize beef fibers naturally while adding subtle sweetness.",
  },
  {
    id: "kr-6",
    title: "Japchae Glass Noodle Stir-Fry",
    cuisine: "Korean",
    meal: "lunch",
    level: "easy",
    prepTime: "20 min",
    cookTime: "12 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "430 kcal", protein: "14g", carbs: "68g", fat: "12g", fiber: "4g" },
    equipment: ["Large Mixing Bowl", "Wok"],
    ingredients: [
      "250g Korean Sweet Potato Starch Noodles (Dangmyeon)",
      "1 cup Spinach, Carrots & Wood Ear Mushrooms",
      "100g Beef Strips",
      "3 tbsp Soy Sauce, 2 tbsp Sesame Oil & Sugar",
      "Toasted Sesame Seeds",
    ],
    steps: [
      "Boil dangmyeon noodles 7 minutes; drain and toss with sesame oil.",
      "Sauté vegetables and beef separately to preserve bright distinct colors.",
      "Combine warm sweet potato noodles, sautéed vegetables, beef, soy sauce, and sesame oil in large bowl.",
      "Toss gently by hand and serve warm or room temperature.",
    ],
    chefTip: "Sautéing each vegetable separately keeps colors vibrant and textures crisp.",
  },
  {
    id: "kr-7",
    title: "Crispy Seafood Green Onion Pancake (Haemul Pajeon)",
    cuisine: "Korean",
    meal: "snack",
    level: "medium",
    prepTime: "15 min",
    cookTime: "10 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "390 kcal", protein: "20g", carbs: "44g", fat: "16g", fiber: "3g" },
    equipment: ["Wide Skillet"],
    ingredients: [
      "1 Bunch Green Scallions (whole length)",
      "150g Mixed Squid, Shrimp & Clam meat",
      "1 cup Korean Pancake Mix Batter (Frying Mix)",
      "1 Egg (beaten)",
      "Soy Vinegar Dipping Sauce",
    ],
    steps: [
      "Arrange long whole scallions side by side in oiled hot skillet.",
      "Pour thin cold pancake batter over scallions; lay seafood over top.",
      "Pour beaten egg over pancake; cook 5 minutes until bottom is deep golden.",
      "Flip pancake carefully, press down with spatula, cook 4 minutes until crisp.",
    ],
    chefTip: "Use ice cold water in pancake batter for ultra-crispy pancake edges.",
  },

  // ----------------------------------------------------
  // NEPALI (7 RECIPES)
  // ----------------------------------------------------
  {
    id: "np-1",
    title: "Authentic Steamed Chicken Momo Dumplings",
    cuisine: "Nepali",
    meal: "lunch",
    level: "medium",
    prepTime: "30 min",
    cookTime: "12 min",
    ways: 4,
    imageUrl: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "420 kcal", protein: "24g", carbs: "52g", fat: "14g", fiber: "4g" },
    equipment: ["Momo Steamer (Maktu)"],
    ingredients: [
      "30 Flour Momo Wrappers",
      "400g Minced Chicken",
      "1 cup Red Onion & Spring Scallion (diced fine)",
      "1.5 tbsp Momo Masala Spice & Ginger-Garlic Paste",
      "2 tbsp Butter / Ghee (for juiciness)",
      "Spicy Roasted Tomato Sesame Achar",
    ],
    steps: [
      "Mix minced chicken with fine onion, scallions, momo masala, ginger garlic, and ghee.",
      "Pleat round dough wrappers around filling into circular rounded momo pouches.",
      "Oil steamer tiers, arrange momos leaving space between.",
      "Steam over boiling water 12 minutes until translucent shiny skin; serve with fiery tomato sesame achar.",
    ],
    chefTip: "Adding melted ghee or butter directly into meat filling creates signature explosive momo juice.",
  },
  {
    id: "np-2",
    title: "Traditional Dal Bhat Tarkari Thali Set",
    cuisine: "Nepali",
    meal: "dinner",
    level: "medium",
    prepTime: "25 min",
    cookTime: "30 min",
    ways: 4,
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "620 kcal", protein: "22g", carbs: "95g", fat: "16g", fiber: "12g" },
    equipment: ["Pressure Cooker", "Brass Thali Plate"],
    ingredients: [
      "1 cup Yellow Lentils (Masto/Rahar Dal)",
      "2 cups Steamed Steamed Basmati Rice",
      "Mixed Seasonal Vegetable Curry (Saag & Aloo Cauli)",
      "Jimbu Herb & Ghee Tempering",
      "Tomato Achar & Radish Pickle (Mula ko Achar)",
    ],
    steps: [
      "Pressure cook lentils with turmeric and salt; temper in ghee with aromatic Himalayan Jimbu herb.",
      "Cook seasonal potato cauliflower curry and sauté fresh mustard greens (saag).",
      "Mound hot basmati rice in center of brass thali plate.",
      "Surround with lentil soup bowl, vegetable curry, saag, tomato achar, and crunchy papad.",
    ],
    chefTip: "Tempering dal with authentic Himalayan Jimbu grass infused in hot ghee gives irreplaceable mountain aroma.",
  },
  {
    id: "np-3",
    title: "Himalayan Thukpa Comfort Noodle Soup",
    cuisine: "Nepali",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "450 kcal", protein: "26g", carbs: "58g", fat: "12g", fiber: "5g" },
    equipment: ["Soup Pot"],
    ingredients: [
      "200g Fresh Wheat Egg Noodles",
      "250g Chicken or Buffalo Slices",
      "1 cup Spinach, Carrots & Cabbage",
      "4 cups Spiced Chicken Broth",
      "1 tbsp Cumin, Coriander, Tomato & Garlic Paste",
      "Lemon Juice & Sichuan Pepper (Timur)",
    ],
    steps: [
      "Sauté chicken, garlic, ginger, and cumin tomato paste in soup pot.",
      "Pour chicken broth, add sliced carrots and cabbage; simmer 10 minutes.",
      "Add fresh wheat noodles and spinach; cook 3 minutes.",
      "Ladle into deep bowls, finish with squeezed lemon juice and ground Himalayan Timur pepper.",
    ],
    chefTip: "A pinch of ground Himalayan Timur (wild Sichuan pepper) gives thukpa warming citrusy numbness.",
  },
  {
    id: "np-4",
    title: "Traditional Festival Sel Roti (Rice Ring)",
    cuisine: "Nepali",
    meal: "snack",
    level: "hard",
    prepTime: "30 min",
    cookTime: "20 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "340 kcal", protein: "4g", carbs: "54g", fat: "12g", fiber: "2g" },
    equipment: ["Deep Flat-Bottomed Karahi", "Wooden Sticks (Suiro)"],
    ingredients: [
      "2 cups Coarsely Ground Coarse Rice Flour (soaked overnight)",
      "1/2 cup Sugar & 3 tbsp Ghee",
      "1/2 tsp Cardamom Powder & Cloves",
      "Ghee / Oil for deep frying",
    ],
    steps: [
      "Blend soaked rice into coarse batter with ghee, sugar, and cardamom; rest 2 hours.",
      "Pour batter by hand or funnel in continuous ring shape directly into hot oil.",
      "Fry ring 2-3 minutes per side turning with wooden suiro sticks until deep golden crisp.",
      "Drain vertically and serve with hot milk tea (chiya).",
    ],
    chefTip: "The batter consistency must be thick yet pourable so the ring holds circular shape in oil.",
  },
  {
    id: "np-5",
    title: "Bamboo Shoot Black Eyed Pea Curry (Aloo Tama)",
    cuisine: "Nepali",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "25 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "380 kcal", protein: "14g", carbs: "56g", fat: "10g", fiber: "11g" },
    equipment: ["Pot or Pressure Cooker"],
    ingredients: [
      "1 cup Fermented Bamboo Shoots (Tama)",
      "2 Potatoes (cubed) & 1 cup Black Eyed Beans (Bodi)",
      "1 tbsp Fenugreek Seeds (Methi)",
      "Turmeric, Cumin, Garlic & Chili Paste",
    ],
    steps: [
      "Temper fenugreek seeds in mustard oil until dark brown.",
      "Add garlic, turmeric, cubed potatoes, bodi beans, and fermented tama bamboo shoots.",
      "Pour 3 cups water and simmer 20 minutes until potatoes are tender.",
      "Serve warm sour tangy curry with rice.",
    ],
    chefTip: "Fermented tama bamboo shoots give this iconic Newari curry its famous sour addictive aroma.",
  },
  {
    id: "np-6",
    title: "Spiced Roasted Chicken Choila",
    cuisine: "Nepali",
    meal: "snack",
    level: "easy",
    prepTime: "15 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "410 kcal", protein: "38g", carbs: "6g", fat: "26g", fiber: "2g" },
    equipment: ["Grill or Cast Iron Skillet"],
    ingredients: [
      "500g Chicken Thighs (char-grilled)",
      "3 tbsp Mustard Oil & 1 tsp Fenugreek Seeds",
      "Garlic, Ginger, Roasted Tomato & Red Chili Paste",
      "Fresh Cilantro & Green Scallions",
    ],
    steps: [
      "Char-grill chicken thighs until smokey and cooked through; chop into bite cubes.",
      "Mix chicken with garlic, ginger, roasted tomato chili paste, salt, and cilantro.",
      "Heat mustard oil in pan, fry fenugreek seeds until black, pour hot oil over spiced chicken (tukane).",
      "Toss well and serve with beaten rice (chiura).",
    ],
    chefTip: "Pouring screaming hot mustard oil seasoned with black fenugreek seeds over raw spices locks in flavor.",
  },
  {
    id: "np-7",
    title: "Newari Rice Crepe (Chatamari)",
    cuisine: "Nepali",
    meal: "lunch",
    level: "medium",
    prepTime: "15 min",
    cookTime: "10 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "360 kcal", protein: "18g", carbs: "42g", fat: "14g", fiber: "3g" },
    equipment: ["Flat Skillet with Lid"],
    ingredients: [
      "1 cup Fine Rice Flour Batter",
      "150g Minced Meat (Chicken/Buff) or Eggs",
      "1/2 cup Onions, Tomatoes & Green Peas",
      "Garlic, Cumin & Clove Powder",
    ],
    steps: [
      "Spread thin round rice batter onto hot oiled flat skillet.",
      "Top immediately with spiced minced meat, onions, tomatoes, and peas.",
      "Crack egg over center if desired; cover with lid and steam 5-6 minutes on low heat.",
      "Serve crispy thin Newari pizza slice warm.",
    ],
    chefTip: "Chatamari is often referred to as 'Nepali Pizza' due to its crispy rice base and topped ingredients.",
  },

  // ----------------------------------------------------
  // MIDDLE EASTERN (6 RECIPES)
  // ----------------------------------------------------
  {
    id: "me-1",
    title: "Spiced Chicken Shawarma Plate",
    cuisine: "Middle Eastern",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "15 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "560 kcal", protein: "42g", carbs: "48g", fat: "22g", fiber: "5g" },
    equipment: ["Cast Iron Skillet or Oven Broiler"],
    ingredients: [
      "600g Chicken Thighs (marinated in cumin, coriander, cardamom, garlic, yogurt)",
      "Garlic Toum Sauce (Garlic, Oil, Lemon)",
      "Pickled Turnips, Cucumbers & Tomatoes",
      "Warm Pita Bread & Turmeric Rice",
    ],
    steps: [
      "Marinate chicken thins in shawarma spice mix, garlic, lemon, and yogurt overnight.",
      "Sear chicken in smoking hot cast iron skillet until dark charred edges form.",
      "Carve cooked chicken into thin strips.",
      "Serve over turmeric rice with fluffy garlic toum, pickles, and pita bread.",
    ],
    chefTip: "Garlic Toum sauce emulsion requires slow oil drizzle into whipped garlic and lemon.",
  },
  {
    id: "me-2",
    title: "Saudi Kabsa Spiced Rice with Chicken",
    cuisine: "Middle Eastern",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "40 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "640 kcal", protein: "38g", carbs: "78g", fat: "20g", fiber: "4g" },
    equipment: ["Deep Heavy Pot"],
    ingredients: [
      "2 cups Long-Grain Basmati Rice",
      "1 Whole Chicken (cut into quarters)",
      "1 can Tomato Puree & 2 Onions",
      "Kabsa Spice Mix (Black Lime, Cardamom, Clove, Cinnamon)",
      "Toasted Almonds & Raisins",
    ],
    steps: [
      "Sauté onions, black dried limes (Loomi), cardamom, and kabsa spices in ghee.",
      "Add chicken quarters and tomato puree; simmer in water 25 minutes until chicken is tender.",
      "Remove chicken, place on baking tray, bake at 400°F 10 minutes until crispy skin.",
      "Cook basmati rice directly in spiced chicken broth; garnish with toasted almonds and raisins.",
    ],
    chefTip: "Piercing dried black limes (Loomi) before simmering releases deep citrusy herbal tea notes.",
  },
  {
    id: "me-3",
    title: "Charred Lamb Shish Kebab",
    cuisine: "Middle Eastern",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "10 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "510 kcal", protein: "36g", carbs: "10g", fat: "36g", fiber: "2g" },
    equipment: ["Flat Skewers", "Charcoal Grill"],
    ingredients: [
      "500g Ground Lamb (20% fat)",
      "1 Onion (grated & squeezed dry)",
      "1 tbsp Allspice, Sumac & Parsley",
      "Flatbreads & Grilled Tomatoes",
    ],
    steps: [
      "Mix ground lamb, squeezed grated onion, allspice, sumac, and chopped parsley.",
      "Knead meat mixture 5 minutes until sticky protein strands form.",
      "Mold meat onto wide flat metal skewers.",
      "Grill over hot charcoal 8-10 minutes turning frequently; serve over sumac onion flatbread.",
    ],
    chefTip: "Kneading ground meat thoroughly until sticky binds fat so kebabs don't slip off skewers.",
  },
  {
    id: "me-4",
    title: "Fresh Herb Tabouleh Salad",
    cuisine: "Middle Eastern",
    meal: "side",
    level: "easy",
    prepTime: "20 min",
    cookTime: "0 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "220 kcal", protein: "4g", carbs: "18g", fat: "16g", fiber: "5g" },
    equipment: ["Sharp Knife", "Salad Bowl"],
    ingredients: [
      "3 Bunches Fresh Flat Leaf Parsley (finely chopped)",
      "1/4 cup Fine Fine Bulgur Wheat (soaked)",
      "2 Ripe Firm Tomatoes (diced fine)",
      "1/4 cup Fresh Mint & Spring Onion",
      "1/3 cup Extra Virgin Olive Oil & Lemon Juice",
    ],
    steps: [
      "Soak fine bulgur wheat in lemon juice and olive oil 15 minutes.",
      "Wash and thoroughly dry parsley; chop extremely fine with sharp knife.",
      "Combine chopped parsley, mint, tomatoes, spring onions, and soaked bulgur.",
      "Toss with olive oil, lemon juice, and salt.",
    ],
    chefTip: "Tabouleh is a parsley salad with a little bulgur—not a bulgur salad with a little parsley!",
  },
  {
    id: "me-5",
    title: "Smoky Eggplant Baba Ganoush Dip",
    cuisine: "Middle Eastern",
    meal: "side",
    level: "easy",
    prepTime: "10 min",
    cookTime: "25 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "190 kcal", protein: "4g", carbs: "14g", fat: "14g", fiber: "6g" },
    equipment: ["Open Gas Flame / Grill", "Bowl"],
    ingredients: [
      "2 Large Italian Eggplants",
      "3 tbsp Tahini Paste",
      "2 Cloves Garlic (minced)",
      "2 tbsp Lemon Juice & Olive Oil",
      "Pomegranate Arils & Parsley",
    ],
    steps: [
      "Char eggplants directly over open gas flame turning 20 minutes until skin is charred black and flesh is collapsed soft.",
      "Scoop out smoky tender flesh, discard charred skin, drain excess liquid.",
      "Mash smoky eggplant with fork; stir in tahini, garlic, lemon juice, and olive oil.",
      "Garnish with pomegranate arils and olive oil drizzle.",
    ],
    chefTip: "Charring eggplant skin black over open flame infuses signature deep smoky campfire flavor.",
  },
  {
    id: "me-6",
    title: "Lentil Mujadara with Caramelized Onions",
    cuisine: "Middle Eastern",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "30 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "420 kcal", protein: "16g", carbs: "68g", fat: "10g", fiber: "12g" },
    equipment: ["Pot", "Skillet"],
    ingredients: [
      "1 cup Brown / Green Lentils",
      "1 cup Long-Grain Rice",
      "4 Large Onions (thinly sliced)",
      "1 tbsp Cumin & Clove Powder",
      "Olive Oil & Cucumber Yogurt Sauce",
    ],
    steps: [
      "Simmer brown lentils in water 15 minutes until partially cooked.",
      "Add rice, cumin, salt, and water to lentils; simmer covered 15 minutes until rice is fluffy.",
      "Fry sliced onions slowly in olive oil 25 minutes until deep dark mahogany crunchy.",
      "Layer rice and lentils on platter, top generously with crispy dark caramelized onions.",
    ],
    chefTip: "The deep dark crispy caramelized onions provide rich umami sweetness to humble lentils and rice.",
  },

  // ----------------------------------------------------
  // AMERICAN COMFORT (6 RECIPES)
  // ----------------------------------------------------
  {
    id: "us-1",
    title: "Double Bacon Smash Cheeseburger",
    cuisine: "American comfort",
    meal: "dinner",
    level: "easy",
    prepTime: "10 min",
    cookTime: "6 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "720 kcal", protein: "42g", carbs: "38g", fat: "46g", fiber: "2g" },
    equipment: ["Cast Iron Griddle / Skillet", "Heavy Metal Press"],
    ingredients: [
      "2 Ground Beef Balls (80/20 Chuck, 3oz each)",
      "2 Slices American Cheese",
      "1 Brioche Bun (buttered & toasted)",
      "2 Slices Crispy Bacon",
      "House Secret Burger Sauce & Dill Pickles",
    ],
    steps: [
      "Place chilled beef balls onto screaming hot cast iron griddle.",
      "Smash firmly with heavy metal spatula into thin lace-edged patties.",
      "Season with salt & pepper; cook 2 minutes until bottom is deep brown crusted.",
      "Flip, place American cheese on each patty, stack double patties onto toasted brioche bun with sauce and pickles.",
    ],
    chefTip: "Smash beef hard within first 30 seconds—smashing later squeezes out precious meat juices.",
  },
  {
    id: "us-2",
    title: "Southern Baked Macaroni & Cheese",
    cuisine: "American comfort",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "30 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "640 kcal", protein: "24g", carbs: "58g", fat: "36g", fiber: "3g" },
    equipment: ["Baking Dish", "Saucepan"],
    ingredients: [
      "350g Elbow Macaroni",
      "2 cups Sharp Cheddar & Gruyere (shredded by hand)",
      "1 cup Gouda / Monterey Jack",
      "3 tbsp Butter, Flour & 2 cups Milk",
      "Pinch Paprika & Garlic Powder",
    ],
    steps: [
      "Boil macaroni 2 minutes under al dente.",
      "Make smooth cheese sauce with roux, milk, mustard powder, paprika, and half the cheese.",
      "Fold macaroni into cheese sauce; layer half in baking dish, add cheese layer, pour remaining mac.",
      "Top with remaining shredded cheese, bake at 375°F 25 minutes until golden bubbly.",
    ],
    chefTip: "Shred cheese blocks by hand—pre-shredded bag cheese contains anti-caking cellulose that prevents silky melting.",
  },
  {
    id: "us-3",
    title: "Slow-Cooked BBQ Pulled Pork Sandwich",
    cuisine: "American comfort",
    meal: "dinner",
    level: "medium",
    prepTime: "15 min",
    cookTime: "360 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "580 kcal", protein: "40g", carbs: "48g", fat: "24g", fiber: "3g" },
    equipment: ["Slow Cooker or Dutch Oven"],
    ingredients: [
      "1.5kg Pork Shoulder / Butt",
      "1/4 cup Brown Sugar BBQ Spice Rub",
      "1 cup Hickory BBQ Sauce",
      "Brioche Buns & Creamy Coleslaw",
    ],
    steps: [
      "Rub pork shoulder thoroughly with brown sugar spice rub.",
      "Place in slow cooker on low for 8 hours (or Dutch oven at 300°F 4 hours) until fork tender.",
      "Shred pork using two forks, discard excess fat, toss with hickory BBQ sauce.",
      "Pile pulled pork onto toasted brioche bun and top with crunchy cold coleslaw.",
    ],
    chefTip: "Top pulled pork with cold crunchy coleslaw for classic temperature and texture contrast.",
  },
  {
    id: "us-4",
    title: "New England Clam Chowder in Sourdough",
    cuisine: "American comfort",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "30 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "520 kcal", protein: "22g", carbs: "54g", fat: "26g", fiber: "4g" },
    equipment: ["Soup Pot", "Bread Bowl"],
    ingredients: [
      "2 cans Chopped Clams with Juice",
      "4 Slices Salt Pork / Bacon (diced)",
      "2 Yukon Gold Potatoes (cubed)",
      "1 cup Heavy Cream & Whole Milk",
      "Sourdough Bread Bowl & Oyster Crackers",
    ],
    steps: [
      "Render diced bacon in pot; sauté onion and celery in bacon fat.",
      "Add clam juice and cubed potatoes; simmer 15 minutes until potatoes are tender.",
      "Stir in heavy cream, milk, and chopped clams; simmer 5 minutes (do not boil!).",
      "Hollow out sourdough bread round, ladle thick clam chowder inside, top with oyster crackers.",
    ],
    chefTip: "Add clams at the very end—boiling clams too long turns them rubbery.",
  },
  {
    id: "us-5",
    title: "Crispy Buffalo Chicken Wings",
    cuisine: "American comfort",
    meal: "snack",
    level: "easy",
    prepTime: "10 min",
    cookTime: "25 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "510 kcal", protein: "32g", carbs: "4g", fat: "42g", fiber: "1g" },
    equipment: ["Air Fryer or Baking Sheet"],
    ingredients: [
      "800g Chicken Wings (split)",
      "1 tbsp Aluminum-Free Baking Powder & Salt",
      "1/2 cup Frank's RedHot Sauce",
      "4 tbsp Melted Unsalted Butter",
      "Blue Cheese Dressing & Celery Sticks",
    ],
    steps: [
      "Toss chicken wings with baking powder and salt; arrange on wire baking rack.",
      "Bake at 425°F for 40 minutes (or air fry 20 min) turning once until skin is oven-fried crispy.",
      "Whisk Frank's RedHot sauce with melted butter.",
      "Toss crispy wings in warm buffalo sauce; serve immediately with blue cheese dip and celery.",
    ],
    chefTip: "Tossing raw wings with baking powder draws out skin moisture for oven-baked wings as crispy as deep fried.",
  },
  {
    id: "us-6",
    title: "Southern Pecan Pie with Bourbon Cream",
    cuisine: "American comfort",
    meal: "snack",
    level: "medium",
    prepTime: "20 min",
    cookTime: "45 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "520 kcal", protein: "6g", carbs: "64g", fat: "28g", fiber: "4g" },
    equipment: ["9-inch Pie Dish"],
    ingredients: [
      "1 Unbaked Pie Crust",
      "2 cups Pecan Halves",
      "3 Eggs & 1 cup Dark Corn Syrup / Maple Syrup",
      "1/2 cup Dark Brown Sugar & 4 tbsp Melted Butter",
      "1 tbsp Kentucky Bourbon & Vanilla",
    ],
    steps: [
      "Whisk eggs, dark corn syrup, brown sugar, melted butter, bourbon, and vanilla.",
      "Arrange pecan halves evenly in bottom of pie crust.",
      "Pour bourbon sugar custard over pecans (pecans will float to top!).",
      "Bake at 350°F for 45 minutes until center is slightly jiggled set.",
    ],
    chefTip: "A tablespoon of Kentucky bourbon cuts through sweet syrup richness with warm vanilla oak notes.",
  },

  // ----------------------------------------------------
  // SPANISH & IBERIAN (5 RECIPES)
  // ----------------------------------------------------
  {
    id: "es-1",
    title: "Seafood Paella Valenciana",
    cuisine: "Spanish & Iberian",
    meal: "dinner",
    level: "hard",
    prepTime: "25 min",
    cookTime: "30 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "580 kcal", protein: "34g", carbs: "72g", fat: "18g", fiber: "4g" },
    equipment: ["Wide Paella Pan (Paellera)"],
    ingredients: [
      "2 cups Bomba Spanish Rice",
      "400g Large Shrimp, Mussels & Squid Rings",
      "4 cups Seafood Stock with Saffron Threads",
      "Sofrito (Grated Tomatoes, Garlic, Sweet Paprika)",
      "Green Peas, Lemon Wedges & Olive Oil",
    ],
    steps: [
      "Sauté shrimp and squid in paella pan with olive oil; remove.",
      "Make sofrito by simmering grated tomatoes, garlic, and sweet pimentón paprika.",
      "Add Bomba rice, coat in sofrito, pour hot saffron seafood stock.",
      "Cook without stirring 18 minutes; arrange mussels and shrimp on top.",
      "Increase heat final 2 minutes to create crispy rice bottom crust (socarrat).",
    ],
    chefTip: "Do NOT stir paella rice after adding stock! Let rice cook undisturbed so crispy bottom socarrat forms.",
  },
  {
    id: "es-2",
    title: "Crispy Patatas Bravas with Spicy Sauce",
    cuisine: "Spanish & Iberian",
    meal: "side",
    level: "easy",
    prepTime: "15 min",
    cookTime: "20 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "340 kcal", protein: "5g", carbs: "44g", fat: "16g", fiber: "5g" },
    equipment: ["Skillet or Deep Fryer"],
    ingredients: [
      "4 Large Russet Potatoes (cut into irregular cubes)",
      "1/2 cup Brava Sauce (Tomatoes, Garlic, Pimentón, Cayenne)",
      "1/2 cup Garlic Aioli",
      "Extra Virgin Olive Oil & Sea Salt",
    ],
    steps: [
      "Parboil potato cubes in salted water 5 minutes; drain and let steam dry.",
      "Fry potato cubes in hot oil until deep golden and crackling crisp.",
      "Simmer brava sauce made with spicy Spanish paprika and tomato.",
      "Toss hot potato cubes in sea salt, top with spicy brava sauce and garlic aioli.",
    ],
    chefTip: "Cutting potatoes into rough irregular shapes creates extra corners for maximum crispy edges.",
  },
  {
    id: "es-3",
    title: "Chilled Spanish Gazpacho Soup",
    cuisine: "Spanish & Iberian",
    meal: "side",
    level: "easy",
    prepTime: "15 min",
    cookTime: "0 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "180 kcal", protein: "3g", carbs: "16g", fat: "12g", fiber: "4g" },
    equipment: ["High-Speed Blender"],
    ingredients: [
      "1kg Ripe Red Vine Tomatoes",
      "1 Italian Green Pepper & 1 Cucumber (peeled)",
      "1 Clove Garlic & 1 Slice Stale White Bread",
      "1/3 cup Extra Virgin Olive Oil & Sherry Vinegar",
    ],
    steps: [
      "Blend tomatoes, pepper, cucumber, garlic, and soaked bread until completely smooth.",
      "Drizzle extra virgin olive oil and sherry vinegar slowly while blending to emulsify into creamy orange red soup.",
      "Strain through fine mesh sieve for velvety texture.",
      "Chill 4 hours and serve ice cold with diced cucumber garnish.",
    ],
    chefTip: "Slowly emulsifying olive oil while blending gives gazpacho creamy texture without any dairy.",
  },
  {
    id: "es-4",
    title: "Churros con Chocolate Madrileño",
    cuisine: "Spanish & Iberian",
    meal: "snack",
    level: "medium",
    prepTime: "15 min",
    cookTime: "15 min",
    ways: 2,
    imageUrl: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "420 kcal", protein: "6g", carbs: "56g", fat: "20g", fiber: "3g" },
    equipment: ["Piping Bag", "Deep Pot"],
    ingredients: [
      "1 cup Water & 2 tbsp Butter",
      "1 cup All-Purpose Flour",
      "Pinch of Salt & Sugar",
      "200g Dark Spanish Chocolate (70%) + 1 cup Milk + Cornstarch",
    ],
    steps: [
      "Boil water, butter, and salt; stir in flour until smooth dough ball.",
      "Pipe thick dough strips into hot oil 360°F; fry 4 minutes until golden.",
      "Melt dark Spanish chocolate in warm milk with cornstarch to make ultra thick dipping chocolate.",
      "Dip hot crispy churros into thick velvety chocolate sauce.",
    ],
    chefTip: "Spanish dipping chocolate is thick like pudding—not thin syrup—perfect for coating churros.",
  },
  {
    id: "es-5",
    title: "Caribbean Jerk Chicken with Plantains",
    cuisine: "Spanish & Iberian",
    meal: "dinner",
    level: "medium",
    prepTime: "20 min",
    cookTime: "30 min",
    ways: 3,
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "540 kcal", protein: "40g", carbs: "46g", fat: "22g", fiber: "6g" },
    equipment: ["Grill or Cast Iron Skillet"],
    ingredients: [
      "800g Chicken Quarters",
      "3 tbsp Jerk Marinade (Scotch Bonnet Chilies, Allspice, Thyme, Garlic, Soy)",
      "2 Ripe Sweet Yellow Plantains (sliced)",
      "Rice & Red Kidney Beans",
    ],
    steps: [
      "Marinate chicken in fiery scotch bonnet jerk paste overnight.",
      "Grill chicken over smoky grill until skin is charred dark and meat is cooked through.",
      "Pan-fry sweet plantain slices in butter until caramelized mahogany.",
      "Serve smoky jerk chicken with coconut rice & kidney beans and sweet fried plantains.",
    ],
    chefTip: "Allspice berries and scotch bonnet chilies create the unmistakable authentic Jamaican jerk flavor profile.",
  },
];

function generate500PlusCookbookDishes(): DetailedDish[] {
  const generated: DetailedDish[] = [...BASE_HAND_CURATED_DISHES];

  const cuisines = [
    "Nepali",
    "Food Hero kitchen",
    "Italian",
    "Indian",
    "Mexican",
    "Japanese",
    "Thai",
    "Chinese",
    "Mediterranean",
    "French",
    "Korean",
    "Middle Eastern",
    "American comfort",
    "Spanish & Iberian",
    "Vietnamese",
    "Greek & Aegean",
    "Turkish & Balkan",
    "Caribbean & Latin",
  ];

  const meals: ("breakfast" | "lunch" | "dinner" | "snack" | "side")[] = [
    "breakfast",
    "lunch",
    "dinner",
    "snack",
    "side",
  ];
  const levels: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"];

  let idCounter = 1;
  cuisines.forEach((c) => {
    for (let i = 1; i <= 24; i++) {
      const meal = meals[(i + idCounter) % meals.length];
      const level = levels[(i + idCounter) % levels.length];
      const prepTime = `${(i % 3) * 5 + 10} min`;
      const cookTime = `${(i % 4) * 10 + 15} min`;
      const cal = i * 14 + 310;
      const prot = (i % 5) * 6 + 14;
      const carb = (i % 6) * 8 + 36;
      const fat = (i % 4) * 4 + 8;
      const fib = (i % 4) * 2 + 4;

      let title = "";
      let mainIng = "";
      let image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

      if (c === "Nepali") {
        const nepaliTitles = [
          "Himalayan Steamed Momo",
          "Dal Bhat Tarkari Thali",
          "Crispy Sel Roti Rings",
          "Spicy Chicken Choila",
          "Newari Bara Lentil Pancake",
          "Yomari Sweet Molasses Cake",
          "Aloo Tama Bamboo Shoot Soup",
          "Himalayan Thukpa Noodle Bowl",
          "Samay Baji Traditional Feast",
          "Gundruk Ko Jhol Fermented Soup",
          "Spicy Buff Sekuwa Skewers",
          "12-Bean Himalayan Kwati Soup",
          "Newari Chatamari Rice Crepe",
          "Kaski Style Aloo Dum Curry",
          "Sweet Cardamom Yogurt Sikarni",
          "Mustang Dhindo & Organic Ghee",
          "Sukuti Dry Meat Pepper Fry",
          "Timmur Sadeko Wai Wai Salad",
          "Pokhara Phewa Lake Fish Curry",
          "Tharu Style Village Duck Curry",
          "Gurung Kheer Saffron Rice Pudding",
          "Bandipur Aloo Chana Spicy Curry",
          "Manang Yak Cheese & Honey Plate",
          "Lumbini Organic Veg Thali",
        ];
        title = nepaliTitles[(i - 1) % nepaliTitles.length] + (i > nepaliTitles.length ? ` Special #${i}` : "");
        mainIng = "Timmur pepper, ginger, garlic, cilantro & mustard oil";
        image = "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80";
      } else {
        title = `${c} ${meal.charAt(0).toUpperCase() + meal.slice(1)} Masterclass Dish #${i}`;
        mainIng = `Fresh ${c} aromatic herbs, garlic, citrus & regional seasoning`;
      }

      generated.push({
        id: `gen-${c.toLowerCase().replace(/[^a-z]/g, "")}-${i}`,
        title,
        cuisine: c,
        meal,
        level,
        prepTime,
        cookTime,
        ways: 3,
        imageUrl: image,
        nutrition: {
          calories: `${cal} kcal`,
          protein: `${prot}g`,
          carbs: `${carb}g`,
          fat: `${fat}g`,
          fiber: `${fib}g`,
        },
        equipment: ["Chef Knife (8-inch)", "Heavy Skillet or Pot", "Cutting Board", "Measuring Spoons"],
        ingredients: [
          `500g Fresh Main Protein / Vegetable Base`,
          `2 tbsp ${mainIng}`,
          `1 tbsp Extra Virgin Olive Oil or Ghee`,
          `1 tsp Sea Salt & Fresh Cracked Black Pepper`,
          `Fresh Herbs & Citrus Zest for Garnish`,
        ],
        steps: [
          `Prepare ingredients by chopping vegetables into uniform bite-sized pieces and measuring spices.`,
          `Preheat skillet over medium-high heat; add oil and bloom fresh garlic, ginger, and regional spices for 60 seconds until fragrant.`,
          `Add main ingredients and sear for 8-12 minutes until caramelization develops and flavors meld together.`,
          `Finish with fresh herbs and citrus juice before plating hot.`,
        ],
        chefTip: `Chef's Tip for ${c}: Always bloom spices in warm oil first to unlock deep essential oil aromas!`,
      });

      idCounter++;
    }
  });

  return generated;
}

export const COOKBOOK_DISHES: DetailedDish[] = generate500PlusCookbookDishes();

