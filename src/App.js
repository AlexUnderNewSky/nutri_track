import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NutritionForm } from "./elements/nutritions/nutrition-form/NutritionForm.js";
//import Layout from "./elements/layout/Layout";
import Lead from "./elements/lead/Lead";
import { NutritionDetails } from "./elements/nutritions/nutrition-details/NutritionDetails.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Layout/>}>
          <Route path="/" element={<Lead/>} />
          <Route path="/add" element={<NutritionForm/>} />
          <Route path="/details/:id" element={<NutritionDetails/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;