import type { StateCreator } from "zustand";
import {
  getCategories,
  getRecipeById,
  getRecipes,
} from "../services/recipe.service";
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types";
import type { FavouritesSliceType } from "./favouritesSlice";

export type RecipeSliceType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (SearchFilter: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => void;
  closeModal: () => void;
};

export const createRecipesSlice: StateCreator<
  RecipeSliceType & FavouritesSliceType,
  [],
  [],
  RecipeSliceType
> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  selectedRecipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();

    set({ categories });
  },

  searchRecipes: async (searchFilter) => {
    const drinks = await getRecipes(searchFilter);
    set({ drinks });
  },

  selectRecipe: async (id: string) => {
    const selectedRecipe = await getRecipeById(id);
    set({ selectedRecipe, modal: true });
  },
  closeModal: () => set({ modal: false, selectedRecipe: {} as Recipe }),
});
