"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  COOKBOOK_CUISINES,
  COOKBOOK_DISHES,
  DetailedDish,
  Nutrition,
  getDishPrepWays,
  getDishPrepWayDetails,
  getDishFDANutrition,
  getDishMatchedImage,
  getDishVideos,
  PrepWay,
  FDANutrition,
  RecipeVideo,
  TransformedRecipeDetails,
} from "@/lib/cookbookData";
import {
  Utensils,
  BookOpen,
  ChefHat,
  Search,
  Sparkles,
  Flame,
  Bookmark,
  Coffee,
  X,
  Play,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Info,
  ArrowLeft,
  Clock,
  Wand2,
  Check,
  Shuffle,
  Gamepad2,
  Activity,
  Flame as BurnIcon,
  Film,
  Pin,
} from "lucide-react";
import { PinButton, getPinnedItems, PinnedItemMetadata } from "@/components/ui/PinButton";
import Link from "next/link";

export default function LuminaCookbookPage() {
  const { toast } = useToast();

  const [selectedCuisine, setSelectedCuisine] = useState<string>("All");
  const [selectedMeal, setSelectedMeal] = useState<string>("Any meal");
  const [selectedLevel, setSelectedLevel] = useState<string>("Any level");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [savedDishIds, setSavedDishIds] = useState<string[]>(["fh-1", "it-1", "in-1"]);
  const [activeDishModal, setActiveDishModal] = useState<DetailedDish | null>(null);
  const [selectedWayId, setSelectedWayId] = useState<string>("w1");
  const [activeVideo, setActiveVideo] = useState<RecipeVideo | null>(null);
  const [pinnedRecipes, setPinnedRecipes] = useState<PinnedItemMetadata[]>([]);

  useEffect(() => {
    const updatePins = () => {
      const allPins = getPinnedItems();
      setPinnedRecipes(allPins.filter((p) => p.type === "recipe"));
    };
    updatePins();
    window.addEventListener("hearth_pins_updated", updatePins);
    return () => window.removeEventListener("hearth_pins_updated", updatePins);
  }, []);

  const cuisines = COOKBOOK_CUISINES;
  const allDishes = COOKBOOK_DISHES;

  // Filter Dishes by Search, Cuisine, Meal, Level
  const filteredDishes = allDishes.filter((dish) => {
    const matchesCuisine = selectedCuisine === "All" || dish.cuisine === selectedCuisine;
    const matchesMeal = selectedMeal === "Any meal" || dish.meal === selectedMeal.toLowerCase();
    const matchesLevel = selectedLevel === "Any level" || dish.level === selectedLevel.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      dish.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      dish.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCuisine && matchesMeal && matchesLevel && matchesSearch;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedDishIds.includes(id)) {
      setSavedDishIds(savedDishIds.filter((d) => d !== id));
      toast({ type: "info", title: "Recipe Removed", description: "Removed from saved recipe collection." });
    } else {
      setSavedDishIds([...savedDishIds, id]);
      toast({ type: "achievement", title: "Recipe Saved! 🔖", description: "Added to your personal cookbook collection." });
    }
  };

  const handleRandomSurprise = () => {
    const randomIndex = Math.floor(Math.random() * allDishes.length);
    const dish = allDishes[randomIndex];
    setActiveDishModal(dish);
    setSelectedWayId("w1");
    toast({ type: "success", title: "Chef's Surprise! 👨‍🍳", description: `Selected ${dish.title}` });
  };

  const openDishModal = (dish: DetailedDish) => {
    setActiveDishModal(dish);
    setSelectedWayId("w1");
  };

  const handleSelectWay = (way: PrepWay) => {
    setSelectedWayId(way.id);
    toast({
      type: "success",
      title: `Selected: ${way.title} ✨`,
      description: `Recipe ingredients, steps, and FDA nutrition label updated!`,
    });
  };

  const handleWatchVideo = (vid: RecipeVideo) => {
    setActiveVideo(vid);
    toast({
      type: "info",
      title: "Playing Recipe Video 🎥",
      description: `Loaded ${vid.title} (${vid.duration}).`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-10 w-full space-y-8 flex-1">
        {/* Top Header & Navigation Links */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/rest">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Rest Sanctuary
              </Button>
            </Link>

            <Link href="/rest/games">
              <Button variant="ghost" size="sm" leftIcon={<Gamepad2 className="w-4 h-4 text-[#D97706]" />}>
                Arcadia Games
              </Button>
            </Link>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleRandomSurprise}
            leftIcon={<Shuffle className="w-4 h-4 text-[#D97706]" />}
          >
            Chef&apos;s Surprise Dish 🎲
          </Button>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-6 sm:p-10 space-y-4 shadow-sm relative overflow-hidden">
          <div className="space-y-2 w-full">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="amber" icon={<ChefHat className="w-3.5 h-3.5" />}>
                GLOBAL CABIN COOKBOOK · {allDishes.length} RECIPES
              </Badge>
              <span className="text-xs font-semibold text-[#8A9B95]">
                {cuisines.length - 1} World Cuisines • 3 Preparation Methods Per Dish • Dynamic Recipe Reflection
              </span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1C2A26] tracking-tight leading-tight">
              Food Hero Kitchen & Global Feast
            </h1>

            <p className="text-xs sm:text-base text-[#52635E] leading-relaxed w-full">
              Explore {allDishes.length}+ detailed recipes across {cuisines.length - 1} world cuisines. Select any of the 3 preparation methods to dynamically update ingredients, cooking steps, chef tips, and FDA Nutrition Facts labels in real-time.
            </p>
          </div>

          {/* Search Bar */}
          <div className="pt-2 sm:max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8A9B95] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 100+ dishes: Biryani, Ramen, Tacos, Oatmeal..."
                className="w-full h-11 pl-11 pr-4 text-xs sm:text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* 14 CUISINES HORIZONTAL CAROUSEL (Lumina Spec Design) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#52635E]">
              CUISINE CATEGORIES ({cuisines.length - 1})
            </span>
            <span className="text-xs text-[#8A9B95]">Showing {filteredDishes.length} Recipes</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin">
            {cuisines.map((c) => {
              const isSelected = selectedCuisine === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedCuisine(c.name)}
                  className={`flex flex-col items-center gap-2 shrink-0 p-2.5 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-[#1C2A26] text-white border-[#1C2A26] shadow-md scale-105"
                      : "bg-white border-[#E7E0D3] text-[#52635E] hover:border-[#D97706] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden relative bg-[#FAF7F2] border border-[#E7E0D3]">
                    {c.img ? (
                      <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-xs text-[#1C2A26]">
                        ALL
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-bold tracking-tight whitespace-nowrap px-1">
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MEAL & LEVEL FILTER DROPDOWNS */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E7E0D3]">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="text-[#8A9B95]">Meal:</span>
              <select
                value={selectedMeal}
                onChange={(e) => setSelectedMeal(e.target.value)}
                className="bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl px-3 py-1.5 focus:outline-none text-[#1C2A26] font-bold"
              >
                <option>Any meal</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
                <option>Side</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8A9B95]">Difficulty:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl px-3 py-1.5 focus:outline-none text-[#1C2A26] font-bold"
              >
                <option>Any level</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>

          <span className="text-xs font-bold text-[#D97706]">
            Showing {filteredDishes.length} of {allDishes.length} Recipes
          </span>
        </div>

        {/* 📌 PINNED FAVORITE RECIPES SHELF */}
        {pinnedRecipes.length > 0 && (
          <div className="space-y-4 bg-gradient-to-br from-white via-[#FAF7F2] to-[#FEF3C7]/40 border border-[#E7E0D3] rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] flex items-center gap-2">
                <Pin className="w-5 h-5 text-[#D97706]" />
                <span>Your Pinned Favorite Recipes ({pinnedRecipes.length})</span>
              </h2>
              <span className="text-xs text-[#8A9B95] font-semibold">Quick Kitchen Access</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white border border-[#E7E0D3] rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs hover:border-[#1C2A26] transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3] overflow-hidden shrink-0">
                      <img src={recipe.icon || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300"} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <span className="text-[9px] font-bold text-[#D97706] uppercase tracking-wider block">
                        {recipe.category || "Cookbook Recipe"}
                      </span>
                      <h4 className="font-serif-display font-bold text-sm text-[#1C2A26] truncate">
                        {recipe.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      variant="amber"
                      size="sm"
                      onClick={() => {
                        const dishObj = allDishes.find((d) => `dish-${d.id}` === recipe.id || d.title === recipe.title);
                        if (dishObj) openDishModal(dishObj);
                      }}
                      className="px-3 py-1.5 text-xs h-auto"
                    >
                      Cook
                    </Button>
                    <PinButton
                      itemId={recipe.id}
                      itemTitle={recipe.title}
                      itemCategory={recipe.category}
                      itemType="recipe"
                      itemUrl="/rest/cookbook"
                      itemIcon={recipe.icon}
                      variant="icon"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECIPES GRID (STOREFRONT DISH CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => {
            const isSaved = savedDishIds.includes(dish.id);
            const prepWays = getDishPrepWays(dish);
            const matchedImg = getDishMatchedImage(dish);

            return (
              <div
                key={dish.id}
                onClick={() => openDishModal(dish)}
                className="bg-white border border-[#E7E0D3] rounded-3xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 relative overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={matchedImg}
                      alt={dish.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      <PinButton
                        itemId={`dish-${dish.id}`}
                        itemTitle={dish.title}
                        itemCategory={dish.cuisine}
                        itemType="recipe"
                        itemUrl="/rest/cookbook"
                        itemIcon={matchedImg}
                        variant="icon"
                      />
                      <button
                        onClick={(e) => toggleBookmark(dish.id, e)}
                        className={`p-2 rounded-xl backdrop-blur-xs transition-colors ${
                          isSaved
                            ? "bg-[#D97706] text-white"
                            : "bg-black/30 text-white hover:bg-black/50"
                        }`}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#1C2A26]/90 text-[#D97706] text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                      {dish.cuisine}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant={dish.level === "easy" ? "pine" : dish.level === "medium" ? "amber" : "subtle"}>
                        {dish.level}
                      </Badge>

                      <span className="text-[#8A9B95] font-mono text-[11px]">
                        🔥 {dish.nutrition.calories}
                      </span>
                    </div>

                    <h3 className="font-serif-display font-bold text-lg text-[#1C2A26] group-hover:text-[#D97706] transition-colors leading-tight">
                      {dish.title}
                    </h3>

                    {/* Preparation Ways Teaser Badge */}
                    <div className="text-[11px] font-semibold text-[#8A9B95] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{prepWays.length} Prep Ways Available</span>
                    </div>

                    {/* Macronutrient Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[#52635E] pt-1">
                      <span className="bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E7E0D3]">
                        P: <strong>{dish.nutrition.protein}</strong>
                      </span>
                      <span className="bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E7E0D3]">
                        C: <strong>{dish.nutrition.carbs}</strong>
                      </span>
                      <span className="bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E7E0D3]">
                        F: <strong>{dish.nutrition.fat}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 text-[11px] text-[#8A9B95] font-medium border-t border-[#F5EFE6] flex items-center justify-between">
                  <span>3 ways • Prep: {dish.prepTime}</span>
                  <span className="capitalize font-bold text-[#1C2A26]">{dish.meal}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* DETAILED RECIPE & NUTRIENTS MODAL WITH DYNAMIC PREP WAY REFLECTION */}
        {activeDishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A26]/50 backdrop-blur-xs overflow-y-auto">
            {(() => {
              const activeWayDetails: TransformedRecipeDetails = getDishPrepWayDetails(
                activeDishModal,
                selectedWayId
              );

              // Dynamically derived dish with updated nutrition metrics
              const dynamicDish: DetailedDish = {
                ...activeDishModal,
                ingredients: activeWayDetails.ingredients,
                steps: activeWayDetails.steps,
                chefTip: activeWayDetails.chefTip,
                nutrition: activeWayDetails.nutrition,
              };

              const fda: FDANutrition = getDishFDANutrition(dynamicDish);
              const modalMatchedImg = getDishMatchedImage(activeDishModal);

              return (
                <div className="bg-white border border-[#E7E0D3] rounded-3xl p-6 sm:p-8 max-w-4xl w-full space-y-6 shadow-2xl relative max-h-[92vh] overflow-y-auto my-6">
                  <button
                    onClick={() => setActiveDishModal(null)}
                    className="absolute top-6 right-6 z-10 text-[#8A9B95] hover:text-[#1C2A26] bg-[#FAF7F2] p-2 rounded-full border border-[#E7E0D3] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="h-64 sm:h-72 rounded-2xl overflow-hidden relative">
                    <img src={modalMatchedImg} alt={activeDishModal.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="amber">{activeDishModal.cuisine}</Badge>
                      <Badge variant="pine">{activeDishModal.level}</Badge>
                      <span className="text-xs text-[#8A9B95]">Prep: {activeDishModal.prepTime} • Cook: {activeDishModal.cookTime}</span>
                    </div>

                    <h3 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#1C2A26]">
                      {activeDishModal.title}
                    </h3>
                  </div>

                  {/* 1. PICK A WAY FOR THIS RECIPE (Dynamic Reflection) */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D97706]" />
                        <span>PICK A WAY FOR THIS RECIPE</span>
                      </h4>

                      <span className="text-xs font-bold text-[#D97706]">
                        Active: {activeWayDetails.wayTitle}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {getDishPrepWays(activeDishModal).map((way) => {
                        const isSelected = selectedWayId === way.id;
                        return (
                          <button
                            key={way.id}
                            onClick={() => handleSelectWay(way)}
                            className={`text-left p-4 rounded-2xl transition-all border ${
                              isSelected
                                ? "bg-rose-50/90 border-2 border-rose-400 text-[#1C2A26] shadow-xs"
                                : "bg-white border-[#E7E0D3] text-[#52635E] hover:border-rose-300 hover:bg-[#FAF7F2]"
                            }`}
                          >
                            <h5 className="font-bold text-xs sm:text-sm text-[#1C2A26] mb-1 flex items-center justify-between">
                              <span>{way.title}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-rose-600" />}
                            </h5>
                            <p className="text-[11px] text-[#52635E] leading-relaxed">
                              {way.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. WATCH · THEN COOK MULTIPLE VIDEO BUTTONS */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                      <Film className="w-4 h-4 text-[#D97706]" />
                      <span>WATCH · THEN COOK</span>
                    </h4>

                    <div className="flex flex-wrap items-center gap-2">
                      {getDishVideos(activeDishModal).map((vid) => (
                        <button
                          key={vid.id}
                          onClick={() => handleWatchVideo(vid)}
                          className="px-4 py-2 rounded-full bg-rose-100/80 text-rose-900 border border-rose-300 text-xs font-bold hover:bg-rose-200 transition-all flex items-center gap-2"
                        >
                          <Play className="w-3.5 h-3.5 fill-current text-rose-700" />
                          <span>{vid.title}</span>
                          <span className="text-[10px] font-mono opacity-75">({vid.duration})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Equipment & Dynamic Ingredients */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E7E0D3]">
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-[#1C2A26] uppercase tracking-wider flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-[#D97706]" /> Ingredients ({activeWayDetails.wayTitle})
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#52635E]">
                        {activeWayDetails.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-[#1C2A26] uppercase tracking-wider flex items-center gap-2">
                        <ChefHat className="w-4 h-4 text-[#D97706]" /> Kitchen Equipment
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#52635E]">
                        {activeDishModal.equipment.map((eq, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{eq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 3. SIDE-BY-SIDE 2-COLUMN GRID: DYNAMIC STEPS + DYNAMIC FDA NUTRITION FACTS LABEL */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-[#E7E0D3]">
                    {/* LEFT COLUMN: DYNAMIC STEPS & COOK TIP */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif-display font-bold text-2xl text-[#1E3A2F]">
                            Steps
                          </h3>
                          <span className="text-xs font-semibold text-[#8A9B95]">
                            Method: {activeWayDetails.wayTitle}
                          </span>
                        </div>

                        <div className="divide-y divide-[#E7E0D3]">
                          {activeWayDetails.steps.map((step, idx) => (
                            <div key={idx} className="py-3.5 flex items-start gap-4">
                              <span className="w-7 h-7 rounded-[10px] bg-[#1E3A2F] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <p className="text-xs sm:text-sm text-[#3E4C47] leading-relaxed pt-1">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Dynamic Cook tip */}
                      <div className="pt-2 text-xs sm:text-sm text-[#3E4C47] font-sans p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
                        <strong className="text-[#1E3A2F]">Cook tip:</strong>{" "}
                        {activeWayDetails.chefTip}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: DYNAMIC FDA NUTRITION FACTS LABEL */}
                    <div className="lg:col-span-5 w-full">
                      <div className="w-full bg-white border-2 border-black p-5 text-black font-sans shadow-md rounded-xs">
                        <h2 className="text-3xl font-extrabold tracking-tight leading-none">
                          Nutrition Facts
                        </h2>
                        <p className="text-xs font-bold pt-1 border-b border-black pb-1">
                          {fda.servingsPerContainer}
                        </p>

                        <div className="flex justify-between items-center text-sm font-extrabold pt-1">
                          <span>Serving size</span>
                          <span>{fda.servingSize}</span>
                        </div>

                        {/* Heavy Black Divider */}
                        <div className="h-3.5 bg-black my-1.5" />

                        <div className="text-xs font-bold">Amount per serving</div>
                        <div className="flex justify-between items-baseline border-b-4 border-black pb-1">
                          <span className="text-2xl font-extrabold">Calories</span>
                          <span className="text-4xl font-black">{fda.calories}</span>
                        </div>

                        <div className="text-[11px] font-bold text-right border-b border-black py-1">
                          % Daily Value*
                        </div>

                        <div className="text-xs space-y-1 divide-y divide-gray-300">
                          <div className="flex justify-between pt-1 font-bold">
                            <span>
                              Total Fat <span className="font-normal">{fda.totalFat}</span>
                            </span>
                            <span>{fda.totalFatDV}</span>
                          </div>

                          <div className="flex justify-between pl-4 pt-1 text-[11px]">
                            <span>
                              Saturated Fat <span className="font-normal">{fda.satFat}</span>
                            </span>
                            <span className="font-bold">{fda.satFatDV}</span>
                          </div>

                          <div className="pl-4 pt-1 text-[11px]">
                            Trans Fat <span className="font-normal">{fda.transFat}</span>
                          </div>

                          <div className="flex justify-between pt-1 font-bold">
                            <span>
                              Cholesterol <span className="font-normal">{fda.cholesterol}</span>
                            </span>
                            <span>{fda.cholesterolDV}</span>
                          </div>

                          <div className="flex justify-between pt-1 font-bold">
                            <span>
                              Sodium <span className="font-normal">{fda.sodium}</span>
                            </span>
                            <span>{fda.sodiumDV}</span>
                          </div>

                          <div className="flex justify-between pt-1 font-bold">
                            <span>
                              Total Carbohydrate <span className="font-normal">{fda.totalCarbs}</span>
                            </span>
                            <span>{fda.totalCarbsDV}</span>
                          </div>

                          <div className="flex justify-between pl-4 pt-1 text-[11px]">
                            <span>
                              Dietary Fiber <span className="font-normal">{fda.fiber}</span>
                            </span>
                            <span className="font-bold">{fda.fiberDV}</span>
                          </div>

                          <div className="pl-4 pt-1 text-[11px]">
                            Total Sugars <span className="font-normal">{fda.sugars}</span>
                          </div>

                          <div className="flex justify-between pl-8 pt-1 text-[11px]">
                            <span>
                              Includes <span className="font-normal">{fda.addedSugars} Added Sugars</span>
                            </span>
                            <span className="font-bold">{fda.addedSugarsDV}</span>
                          </div>

                          <div className="flex justify-between pt-1 font-extrabold text-sm border-t-4 border-black">
                            <span>
                              Protein <span className="font-normal">{fda.protein}</span>
                            </span>
                            <span className="font-bold">
                              {Math.round((parseInt(fda.protein) / 50) * 100)}%
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-black mt-2 pt-2 text-[10px] text-gray-600 leading-tight">
                          Reflecting {activeWayDetails.wayTitle}. Estimates based on typical ingredients (USDA-style). Optional toppings not included.
                          <br />
                          *2,000 calories a day is used for general nutrition advice.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* VIDEO PLAYER DRAWER MODAL */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#1C2A26] border border-[#2D3F3A] rounded-3xl p-6 max-w-3xl w-full space-y-4 shadow-2xl relative text-white">
              <div className="flex justify-between items-center pb-2 border-b border-[#2D3F3A]">
                <h4 className="font-serif-display font-bold text-lg flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#D97706] fill-current" />
                  <span>{activeVideo.title}</span>
                </h4>
                <button onClick={() => setActiveVideo(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center relative">
                <div className="text-center space-y-3 p-6">
                  <Play className="w-16 h-16 text-[#D97706] mx-auto animate-pulse fill-current" />
                  <p className="font-bold text-base">{activeVideo.title}</p>
                  <p className="text-xs text-gray-300">Duration: {activeVideo.duration} • HD 1080p Cooking Masterclass</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="primary" size="sm" onClick={() => setActiveVideo(null)}>
                  Done Watching
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
