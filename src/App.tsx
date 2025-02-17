import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllMeals from "./Containers/AllMeals/AllMeals.tsx";

const App = () => {

  return (
    <>
      <header className="container">
        <h1>Calorie tracker</h1>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<AllMeals/>} />
        </Routes>
      </main>
    </>
  );

};

export default App;
