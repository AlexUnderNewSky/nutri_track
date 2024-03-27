import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NutritionTable.css";

export default function NutritionTable({ isFiltered, nutritions, selectNutrition, removeSelected }) {
  const navigate = useNavigate();
  
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {isFiltered && <th>Info</th>}
            <th>Description</th>
            <th>Protein (g)</th>
            <th>Fat (g)</th>
            <th>Carbs (g)</th>
            <th>Kcal</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {nutritions.map((nutrition, index) => (
            <tr key={index} onClick={() => !isFiltered && selectNutrition(nutrition.id)}>
              {isFiltered && (
                <td>
                  <Button 
                    variant="outline-secondary"
                    onClick={() => navigate(`/details/${nutrition.id}`)}
                  >
                    View
                  </Button>
                </td>
              )}
              <td>{nutrition.description}</td>
              <td>{nutrition.protein}</td>
              <td>{nutrition.fat}</td>
              <td>{nutrition.carbs}</td>
              <td>{nutrition.kcal}</td>
              <td>
                <Button 
                  className="mx-2"
                  variant="outline-danger"
                  onClick={() => removeSelected(nutrition.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
          {isFiltered && (
            <tr>
              <td colSpan={isFiltered ? 2 : 0}>Total</td>
              <td>
                {+nutritions.reduce((acc, nutrition) => acc + nutrition.kcal, 0).toFixed(2)}
              </td>
              <td>
                {+nutritions.reduce((acc, nutrition) => acc + nutrition.protein, 0).toFixed(2)}
              </td>
              <td>
                {+nutritions.reduce((acc, nutrition) => acc + nutrition.fat, 0).toFixed(2)}
              </td>
              <td>
                {+nutritions.reduce((acc, nutrition) => acc + nutrition.carbs, 0).toFixed(2)}
              </td>
              <td colSpan={isFiltered ? 1 : 0}>-</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
