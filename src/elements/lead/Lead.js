import "./Lead.css";
import { Container, FormControl, InputGroup, Row } from "react-bootstrap";
import NutritionTable from "../nutritions/nutrition-table/NutritionTable";
import { useEffect, useMemo, useState } from "react";
import { getAll } from "../../services/nutri-service";

export default function Lead() {
  const [searchTerm, setSearchTerm] = useState();
  const [nutritions, setNutritions] = useState([]);
  const [filteredNutritions, setFilteredNutritions] = useState([]);

  useEffect(() => {
    getAll()
    .then((res) => {
      setNutritions(res);
    })
  }, [])

  const selectNutrition = (id) => {
    setFilteredNutritions((prevNutritions) => {
      const isFiltered = prevNutritions.some(x => x.id === id) 
      if (isFiltered) {
        return prevNutritions;
      }

      const newFilteredNutrition = nutritions.find(f => f.id === id);
      return [
        ...prevNutritions,
        newFilteredNutrition,
      ]
    });
  };

  const removeSelected = (id) => {
    setFilteredNutritions((prevNutritions) => prevNutritions.filter(x => x.id !== id));
  }

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const visibleNutritions = useMemo(() => {
    return searchTerm
      ? nutritions.filter(f => f.description.toLowerCase().includes(searchTerm.toLowerCase()))
      : nutritions;
  }, [searchTerm, nutritions]);

  return (
    <Container>
      <Row className="search">
        <InputGroup className="mb-3">
          <InputGroup.Text>
            Search                      
          </InputGroup.Text>
          <FormControl
            value={searchTerm}
            placeholder="Just start writing for the search..." 
            aria-label="Just start writing for the search..."
            aria-describedby="basic-addon2"
            onChange={onInputChange}
          />
        </InputGroup>
      </Row>
      <Row className="viewbox">
        <NutritionTable isFiltered nutritions={filteredNutritions} removeSelected={removeSelected}/>
      </Row>
      
      <Row>
        <NutritionTable 
          nutritions={visibleNutritions} 
          selectNutrition={selectNutrition}
        />
      </Row>
    </Container>
  );
}
