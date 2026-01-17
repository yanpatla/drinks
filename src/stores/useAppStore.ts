import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, type RecipeSliceType } from "./recipeSlice";
import {
  createFavouritesSlice,
  type FavouritesSliceType,
} from "./favouritesSlice";
import {
  createNotificationSlice,
  type NotificationSliceType,
} from "./notificationSlice";

export const useAppStore = create<
  RecipeSliceType & FavouritesSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavouritesSlice(...a),
    ...createNotificationSlice(...a),
  }))
);
