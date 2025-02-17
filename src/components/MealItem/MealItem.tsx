import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import ButtonSpinner from "../../UI/ButtonSpinner.tsx";

interface Props {
  time: string;
  dish: string;
  calories: number;
  idMeal: string;
}

const MealItem: React.FC<Props> = ({time, dish, calories, idMeal}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onDeleteMeal = async () => {
    try {
      setLoading(true);
      await axiosApi.delete(`meals/${idMeal}.json`);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row mb-3 p-3 border rounded shadow bg-light">
      <div className="col-md-6">
        <p className="mb-4 text-muted">
          {time}
        </p>
        <p>
          <strong>
            {dish}
          </strong>
        </p>
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-end">
        <div className="me-3">
          <span className="badge bg-success fs-6">
            {calories} kcal
          </span>
        </div>

        <div className="row ms-5">
          <button type="button" className="btn btn-primary mb-2" onClick={() => navigate(`/edit/${idMeal}`)}>Edit
          </button>
          <button type="button" className="btn btn-danger" onClick={onDeleteMeal} disabled={loading}>
            Удалить
            {loading && <ButtonSpinner/>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;