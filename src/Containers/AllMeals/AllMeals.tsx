import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { IMeal, IMealApi } from "../../types";
import MealItem from "../../components/MealItem/MealItem.tsx";
import Loader from "../../UI/Loader.tsx";

const AllMeals = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const fetchAllMeals = useCallback(async () => {
    try {
      setLoader(true);
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
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    void fetchAllMeals();
  }, [fetchAllMeals]);

  const mealsContent = (
    <>
      {meals.length ?
        meals.map((meal) => (<MealItem time={meal.time} key={meal.id} dish={meal.text} calories={meal.calories}/>)) :
        <p>No meals yet</p>
      }
    </>
  );

  const content = (
    <>
      {loader ? <Loader/> : mealsContent}
    </>
  );

  return (
    <div>
      {content}
    </div>
  );
};

export default AllMeals;