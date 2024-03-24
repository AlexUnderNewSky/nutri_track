import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import useParams from "react-router-dom";
import "./NutritionDetails.css";
import getById from "../../../services/nutri-service";

export function NutritionDetails(props) {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [nutrition, setNutrition] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
      const fetchNutrition = async () => {
        try {
          debugger;
          const res = await getById(params.id);
          setNutrition({
            ...res.data[0],
            info,
          });
    
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false); 
      };
    }

    fetchNutrition();
  }, [params.id]);

  if (isLoading || !nutrition) {
    return (
      <div className="nutrition-form-wrapper">
        <h4>Loading...</h4>
      </div>
    )
  }

  return (
    <div className="nutrition-form-wrapper">
      <Form>
        {error && <span className="text-danger">{error}</span>}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={nutrition.description}
            disabled
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Protein</Form.Label>
          <Form.Control
            type="text"
            name="protein"
            value={nutrition.protein}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Fat</Form.Label>
          <Form.Control
            type="text"
            name="fat"
            value={nutrition.fat}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Carbs</Form.Label>
          <Form.Control
            type="text"
            name="carbs"
            value={nutrition.carbs}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Kcal</Form.Label>
          <Form.Control
            type="text"
            name="kcal"
            value={nutrition.kcal}
            disabled
          />
        </Form.Group>
      </Form>
    </div>
  );
}
