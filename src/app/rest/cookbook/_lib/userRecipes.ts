import { COOKBOOK_DISHES, type DetailedDish } from "@/app/rest/cookbook/_content";
import { makeOverlayCatalog, slugId } from "@/lib/localCatalog";

const BLANK_NUTRITION = { calories: "—", protein: "—", carbs: "—", fat: "—", fiber: "—" };

const store = makeOverlayCatalog<DetailedDish>({
  list: "hearth_user_recipes_v1",
  hidden: "hearth_hidden_recipe_ids",
  overlay: "hearth_recipe_overlays_v1",
  event: "hearth_user_recipes_updated",
});

export function isUserRecipe(id: string) {
  return id.startsWith("user-");
}

export function emptyRecipe(opts: {
  title: string;
  cuisine?: string;
  meal?: DetailedDish["meal"];
  imageUrl?: string;
  ingredients?: string[];
  steps?: string[];
}): DetailedDish {
  const title = opts.title.trim() || "Untitled recipe";
  return {
    id: `user-dish-${slugId(title)}-${Date.now().toString(36).slice(-4)}`,
    title,
    cuisine: (opts.cuisine || "Custom").trim() || "Custom",
    meal: opts.meal || "dinner",
    level: "easy",
    prepTime: "15 min",
    cookTime: "15 min",
    ways: 1,
    imageUrl: opts.imageUrl?.trim() || "",
    nutrition: { ...BLANK_NUTRITION },
    equipment: [],
    ingredients: (opts.ingredients || []).map((x) => x.trim()).filter(Boolean),
    steps: (opts.steps || []).map((x) => x.trim()).filter(Boolean),
    chefTip: "",
  };
}

export function listedRecipes(): DetailedDish[] {
  return store.merge(COOKBOOK_DISHES);
}

export function saveRecipe(dish: DetailedDish) {
  return store.upsert(dish);
}

export function patchRecipe(id: string, patch: Partial<DetailedDish>) {
  if (isUserRecipe(id)) {
    const found = store.list().find((d) => d.id === id);
    if (!found) return;
    store.upsert({ ...found, ...patch, id });
    return;
  }
  store.overlay(id, patch);
}

export function removeRecipe(id: string) {
  if (isUserRecipe(id)) store.remove(id);
  else store.hide(id);
}

export function subscribeRecipes(onChange: () => void) {
  return store.subscribe(onChange);
}
