import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NutritionForm } from "./elements/nutritions/nutrition-form/NutritionForm.js";
//import Layout from "./elements/layout/Layout";
//import Home from "./elements/home/Home";
import { NutritionDetails } from "./elements/nutritions/nutrition-details/NutritionDetails.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/add" element={<NutritionForm/>} />
          <Route path="/details/:id" element={<NutritionDetails/>} />
      </Routes>
    </div>
  );
}

export default App;