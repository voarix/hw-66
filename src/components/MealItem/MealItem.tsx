import React from "react";

interface Props {
  time: string;
  dish: string;
  calories: number;
}

const MealItem: React.FC<Props> = ({time, dish, calories}) => {
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
          <button type="button" className="btn btn-primary mb-2">Edit</button>
          <button type="button" className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;