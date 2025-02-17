import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { IMeal, IMealApi } from "../../types";
import MealItem from "../../components/MealItem/MealItem.tsx";

const AllMeals = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);

  const fetchAllMeals = useCallback(async () => {
    try {
      const response = await axiosApi<IMealApi>("meals.json");
      if (response.data) {
        const objMeals = response.data;
        const objKeys = Object.keys(objMeals);
        const mealsArray = objKeys.map((key: string) => {
          return {
            id: key,
            ...objMeals[key],
          };
        });

        setMeals(mealsArray);
      } else {
        setMeals([]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    void fetchAllMeals();
  }, [fetchAllMeals]);

  return (
    <div>
      {meals.length ?
        meals.map((meal) => (<MealItem time={meal.time} key={meal.id} dish={meal.text} calories={meal.calories} />)) :
        <p>No quotes yet</p>
      }
    </div>
  );
};

export default AllMeals;