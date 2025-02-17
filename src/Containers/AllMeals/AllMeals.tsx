import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { IMeal, IMealApi } from "../../types";
import MealItem from "../../components/MealItem/MealItem.tsx";
import Loader from "../../UI/Loader.tsx";
import { useNavigate } from "react-router-dom";

const AllMeals = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();

  const deleteMeal = (idMeal: string) => {
    setMeals((prev) => prev.filter(meal => meal.id !== idMeal));
  };

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
        meals.map((meal) => (<MealItem deleteMeal={() => deleteMeal(meal.id)} time={meal.time} key={meal.id} dish={meal.text} calories={meal.calories} idMeal={meal.id}/>)) :
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
      <div className='mb-5'>
        <button type='button' className='btn btn-primary' onClick={() => navigate('/meals/new-meal')}>Add new  meal</button>
      </div>
      {content}
    </div>
  );
};

export default AllMeals;