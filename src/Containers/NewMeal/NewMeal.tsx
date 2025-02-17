import { useState } from "react";
import { IMealForm } from "../../types";
import axiosApi from "../../axiosApi.ts";
import MealForm from "../../components/MealForm/MealForm.tsx";
import { useNavigate } from "react-router-dom";

const NewMeal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmitAddNewMeal = async (newMeal: IMealForm) => {
    try {
      setLoading(true);
      await axiosApi.post<IMealForm>("meals.json", newMeal);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="mb-5 text-center">Submit new meal</h3>
      <MealForm onSubmitAdd={onSubmitAddNewMeal} isLoading={loading} />
    </div>
  );
};

export default NewMeal;
