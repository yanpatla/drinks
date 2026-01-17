import type { StateCreator } from "zustand";
import type { Recipe } from "../types";
import { createRecipesSlice, type RecipeSliceType } from "./recipeSlice";
import {
  createNotificationSlice,
  type NotificationSliceType,
} from "./notificationSlice";

export type FavouritesSliceType = {
  favourites: Recipe[];
  handleClickFavourite: (recipe: Recipe) => void;
  favouriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromLocalStorage: () => void;
};

export const createFavouritesSlice: StateCreator<
  FavouritesSliceType & RecipeSliceType & NotificationSliceType,
  [],
  [],
  FavouritesSliceType
> = (set, get, api) => ({
  favourites: [],
  handleClickFavourite: (recipe) => {
    if (get().favouriteExists(recipe.idDrink)) {
      set((state) => ({
        favourites: state.favourites.filter(
          (fav) => fav.idDrink !== recipe.idDrink
        ),
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Deleted from favourite",
        error: false,
      });
    } else {
      set((state) => ({
        favourites: [...state.favourites, recipe],
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Added to favourite",
        error: false,
      });
      localStorage.setItem("favourites", JSON.stringify(get().favourites));
    }
    createRecipesSlice(set, get, api).closeModal();
  },

  favouriteExists: (id) => {
    return get().favourites.some((fav) => fav.idDrink === id);
  },
  loadFromLocalStorage: () => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      set({ favourites: JSON.parse(storedFavourites) });
    }
  },
});
