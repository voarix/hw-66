import axiosApi from "../../axiosApi.ts";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IMealForm } from "../../types";
import MealForm from "../../components/MealForm/MealForm.tsx";

const EditMeal = () => {
  const [loading, setLoading] = useState(false);
  const {idMeal} = useParams();

  const onSubmitAddNewMeal = async (meal: IMealForm) => {
    try {
      setLoading(true);
      await axiosApi.put(`meals/${idMeal}.json`, meal);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    console.log(meal);
  };

  return (
    <div>
      <MealForm onSubmitAdd={onSubmitAddNewMeal} isLoading={loading} isEdit={true} idMeal={idMeal} />
    </div>
  );
};

export default EditMeal;