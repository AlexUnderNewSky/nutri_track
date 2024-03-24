import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./NutritionDetails.css"; 
import { getById } from "../../../services/nutri-service";

export function NutritionDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [nutrition, setNutrition] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        const res = await getById(params.id);
        setNutrition(res.data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNutrition();
  }, [params.id]);

  if (isLoading || !nutrition) {
    return (
      <div className="nutrition-form-wrapper">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="nutrition-form-wrapper">
      <Formik
        initialValues={nutrition}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Submit logic here
          } catch (error) {
            setError(error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {error && <span className="text-danger">{error}</span>}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field type="text" name="description" disabled className="field" />
            </div>
            <div className="form-group">
              <label htmlFor="protein">Protein</label>
              <Field type="text" name="protein" disabled className="field" />
            </div>
            <div className="form-group">
              <label htmlFor="fat">Fat</label>
              <Field type="text" name="fat" disabled className="field" />
            </div>
            <div className="form-group">
              <label htmlFor="carbs">Carbs</label>
              <Field type="text" name="carbs" disabled className="field" />
            </div>
            <div className="form-group">
              <label htmlFor="kcal">Kcal</label>
              <Field type="text" name="kcal" disabled className="field" />
            </div>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="btn-submit"
              onClick={() => navigate("/")}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
