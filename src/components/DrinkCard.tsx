import { useAppStore } from "../stores/useAppStore";
import type { Drink } from "../types";

type DrinkCardProps = {
  drink: Drink;
};
export default function DrinkCard({ drink }: DrinkCardProps) {
  const selectRecipe = useAppStore((state) => state.selectRecipe);

  return (
    <div className="border shadow-lg">
      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          className="hover:scale-125 transition-transform hover:rotate-2"
        />
      </div>

      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          className="mt-5 w-full bg-orange-400 hover:bg-orange-500 text-white uppercase font-bold p-3 text-lg"
          onClick={() => selectRecipe(drink.idDrink)}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}
