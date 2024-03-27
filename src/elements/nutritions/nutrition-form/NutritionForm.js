import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NutritionForm.css";
import { createNutrition } from "../../../services/nutri-service";
import { v4 as uuidv4 } from 'uuid';

export function NutritionForm() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [nutrition, setNutrition] = useState({
    description: '',
    protein: 0,
    fat: 0,
    carbs: 0,
  });

  const onInputChange = (e) => {
    setNutrition((prevState) => {
      let currentName = e.target.name;
      let currentValue = e.target.value;

      return {
        ...prevState,
        [currentName]: isNaN(currentValue) ? currentValue : parseFloat(currentValue),
      };
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    try {
        createNutrition({id: uuidv4(), ...nutrition})
      .then(() => {
        navigate(`/`);
      })
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="nutrition-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        {error && <span className="text-danger">{error}</span>}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={nutrition.description}
            placeholder="Enter Description"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Protein (g)</Form.Label>
          <Form.Control
            type="number"
            name="protein"
            value={nutrition.protein}
            placeholder="Enter Protein"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Fat (g)</Form.Label>
          <Form.Control
            type="number"
            name="fat"
            value={nutrition.fat}
            placeholder="Enter Fat (g)"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Carbs (g)</Form.Label>
          <Form.Control
            type="number"
            name="carbs"
            value={nutrition.carbs}
            placeholder="Enter Carbs (g)"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Kcal</Form.Label>
          <Form.Control
            type="number"
            name="kcal"
            value={nutrition.kcal}
            placeholder="Enter Kcal (g)"
            onChange={onInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Nutrition
        </Button>
      </Form>
    </div>
  );
}
