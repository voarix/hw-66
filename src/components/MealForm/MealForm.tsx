import React, { useCallback, useEffect, useState } from "react";
import { IMealForm } from "../../types";
import axiosApi from "../../axiosApi.ts";
import ButtonSpinner from "../../UI/ButtonSpinner.tsx";
import Spinner from "react-bootstrap/Spinner";

interface MealFormData {
  isEdit?: boolean;
  idMeal?: string;
  onSubmitAdd: (quote: IMealForm) => void;
  isLoading?: boolean;
}

const initialForm : IMealForm= {
  time: "",
  text: "",
  calories: 0,
};


const MealForm: React.FC<MealFormData> = ({isEdit = false, idMeal, onSubmitAdd, isLoading }) => {
  const [form, setForm] = useState<IMealForm>(initialForm);
  const [getOneMealLoading, setGetOneMealLoading] = useState(false);

  const fetchOnePost = useCallback(async () => {
    try {
      setGetOneMealLoading(true);
      const response = await axiosApi(`meals/${idMeal}.json`);

      if (!response.data) {
        return;
      }
      setForm(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setGetOneMealLoading(false);
    }
  }, [idMeal]);

  useEffect(() => {
    if (isEdit) {
      void fetchOnePost();
    }
  }, [fetchOnePost, isEdit]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.calories) {
      onSubmitAdd(form);
      setForm(initialForm);
    } else {
      alert('Укажите количество кило калорий');
    }
  };

  const onChangeInputMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
    <>
      {getOneMealLoading ? <Spinner /> : <div className="mb-4">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="mb-4">{isEdit ? "Edit" : "Add new"} meal</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="time">
                  Time:
                </label>
                <select
                  className="form-control"
                  required
                  name="time"
                  id="time"
                  value={form.time}
                  onChange={onChangeInputMessage}
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Choose category
                  </option>
                  <option value="breakfast">Breakfast</option>
                  <option value="snack">Snack</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  disabled={isLoading}
                  type="text"
                  className="form-control"
                  placeholder="Meal description"
                  required
                  name="text"
                  id="text"
                  value={form.text}
                  onChange={onChangeInputMessage}
                />
              </div>
              <label htmlFor="calories">Calories</label>
              <input
                type="number"
                className="form-control"
                disabled={isLoading}
                required
                name="calories"
                id="calories"
                value={form.calories}
                onChange={onChangeInputMessage}
              />
              <button type="submit" disabled={isLoading} className="btn btn-primary mt-3">
                {isEdit ? "Edit" : "Add"}
                {isLoading && <ButtonSpinner />}
              </button>
            </form>
          </div>
        </div>
      </div>}
    </>
  );
};

export default MealForm;