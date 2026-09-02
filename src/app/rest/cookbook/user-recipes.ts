import { COOKBOOK_DISHES, type DetailedDish } from "@/app/rest/cookbook/_content";
import { readHiddenIds, readUserList, slugifyId, writeHiddenIds, writeUserList } from "@/lib/userCatalog";

const RECIPES_KEY = "hearth_user_recipes";
const HIDDEN_KEY = "hearth_user_recipes_hidden";
const SAVED_KEY = "hearth_cookbook_saved";

export function getUserRecipes(): DetailedDish[] {
  return readUserList<DetailedDish>(RECIPES_KEY);
}

export function saveUserRecipe(recipe: DetailedDish) {
  const list = getUserRecipes();
  const idx = list.findIndex((r) => r.id === recipe.id);
  if (idx >= 0) list[idx] = recipe;
  else list.push(recipe);
  writeUserList(RECIPES_KEY, list);
}

export function removeRecipe(id: string) {
  if (id.startsWith("user-")) {
    writeUserList(
      RECIPES_KEY,
      getUserRecipes().filter((r) => r.id !== id),
    );
    return;
  }
  const hidden = readHiddenIds(HIDDEN_KEY);
  hidden.add(id);
  writeHiddenIds(HIDDEN_KEY, hidden);
}

export function mergeRecipes(): DetailedDish[] {
  const hidden = readHiddenIds(HIDDEN_KEY);
  const builtin = COOKBOOK_DISHES.filter((d) => !hidden.has(d.id));
  return [...getUserRecipes(), ...builtin];
}

export function emptyUserRecipe(title: string): DetailedDish {
  return {
    id: `user-${slugifyId(title)}-${Date.now().toString(36)}`,
    title: title.trim() || "Untitled recipe",
    cuisine: "Custom",
    meal: "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "20 min",
    ways: 1,
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    nutrition: { calories: "—", protein: "—", carbs: "—", fat: "—", fiber: "—" },
    equipment: [],
    ingredients: [],
    steps: [],
    chefTip: "",
  };
}

export function readSavedDishIds(): string[] {
  return readUserList<string>(SAVED_KEY);
}

export function writeSavedDishIds(ids: string[]) {
  writeUserList(SAVED_KEY, ids);
}
