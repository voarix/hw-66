import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllMeals from "./Containers/AllMeals/AllMeals.tsx";
import NewMeal from "./Containers/NewMeal/NewMeal.tsx";

const App = () => {

  return (
    <>
      <header className="container">
        <h1>Calorie tracker</h1>
      </header>
      <hr/>
      <main className="container">
        <Routes>
          <Route path="/" element={<AllMeals/>} />
          <Route path="/meals" element={<AllMeals/>} />
          <Route path="/meals/new-meal" element={<NewMeal/>} />
        </Routes>
      </main>
    </>
  );

};

export default App;
