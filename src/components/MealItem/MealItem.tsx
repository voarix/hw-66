import React from "react";

interface Props {
  time: string;
  dish: string;
  calories: number;
}

const MealItem: React.FC<Props> = ({time, dish, calories}) => {
  return (
    <div className="row">
      <div className='col-md-4'>
        <p>{time}</p>
        <p>{dish}</p>
      </div>
      <div className='col-md-4 row'>
        <div className='col-md-6'>
          {calories}
        </div>
        <div className='col-md-6'>
          <button type='button' className='btn btn-primary d-block mb-2'>Edit</button>
          <button type='button' className='btn btn-danger'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;