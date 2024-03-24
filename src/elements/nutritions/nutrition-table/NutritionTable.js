import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NutritionTable({ isFiltered, nutritions, selectNutrition, removeSelected }) {
  const navigate = useNavigate();
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {isFiltered && <th>Action</th>}
          <th>Description</th>
          <th>Kcal</th>
          <th>Protein (g)</th>
          <th>Fat (g)</th>
          <th>Carbs (g)</th>
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
                <Button 
									className="mx-2"
									variant="outline-danger"
									onClick={() => removeSelected(nutrition.id)}
								>
									Remove
								</Button>
              </td>
            )}
            <td>{nutrition.description}</td>
            <td>{nutrition.kcal}</td>
            <td>{nutrition.protein}</td>
            <td>{nutrition.fat}</td>
            <td>{nutrition.carbs}</td>
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
        </tr>
				)}
      </tbody>
    </Table>
  );
}
