import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import AllMeals from "./Containers/AllMeals/AllMeals.tsx";
import NewMeal from "./Containers/NewMeal/NewMeal.tsx";
import EditMeal from "./Containers/EditMeal/EditMeal.tsx";

const App = () => {
  return (
    <>
      <header className="container">
        <h1>
          <Link to="/" className="nav-link">
            Calorie tracker
          </Link>
        </h1>
      </header>
      <hr />
      <main className="container">
        <Routes>
          <Route path="/" element={<AllMeals />} />
          <Route path="/meals" element={<AllMeals />} />
          <Route path="/meals/new-meal" element={<NewMeal />} />
          <Route path="/edit/:idMeal" element={<EditMeal />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
