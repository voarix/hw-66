import { useState } from "react";
import { IMealForm } from "../../types";
import axiosApi from "../../axiosApi.ts";
import MealForm from "../../components/MealForm/MealForm.tsx";
import Loader from "../../UI/Loader.tsx";

const NewMeal = () => {
  const [loading, setLoading] = useState(false);


  const onSubmitAddNewMeal = async (newMeal: IMealForm) => {
    try {
      setLoading(true);
      await axiosApi.post('meals.json', newMeal);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  let form = (<MealForm onSubmitAdd={onSubmitAddNewMeal}/>);

  if (loading) form = <Loader/>;

  return (
    <div>
      <h1>Submit new meal</h1>
      {form}
    </div>
  );
};

export default NewMeal;