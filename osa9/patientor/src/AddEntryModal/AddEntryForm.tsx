import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { SelectTypeField, TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { EntryWithoutId, HealthCheckRating, /* EntryType, Entry, */ Diagnosis } from "../types";
import { useStateValue } from "../state";


interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
  entryType: "HealthCheck" | "Hospital" | "OccupationalHealthcare"
}

const typeOptions: string[] = [
  "HealthCheck",
  "Hospital",
  "OccupationalHealthcare"
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isType = (type: unknown): {
  isType: boolean,
  errorMessage: string
} => {
  if (!type || !isString(type)){
    return {
      isType: false,
      errorMessage: "Incorrect or missing type"
    };
  } else {
    
    if(type === "Hospital" || type === "OccupationalHealthcare" || type === "HealthCheck") {
      return {
        isType: true,
        errorMessage: ""
      };
    } else {
      return {
        isType: false,
        errorMessage: "Type is available as string but the value is not Hospital, OccupationalHealthcare or HealthCheck. Choose again."
      };
    }

  }
};

const validateForm = (values: EntryWithoutId, diagnoses: {[code: string]: Diagnosis;}) => {
  const requiredStringError = "Field is required and in text format";

  const errors: { [field: string]: string } = {};
  if (!values.description || !isString(values.description)) {
    errors.description = requiredStringError;
  }
  if (!values.specialist || !isString(values.specialist)) {
    errors.specialist = requiredStringError;
  }
  
  const date = values.date;
  if (!date || !isString(date) || !isDate(date)) {
    errors.date = 'Incorrect or missing date: ' + date + '. Use format YYYY-MM-DD';
  }

  const typeCheck = isType(values.type);
  if (!typeCheck.isType) {
    errors.type = typeCheck.errorMessage;
  }

  if (values.diagnosisCodes) {
    if (!values.diagnosisCodes.every(d => {
      return Object.keys(diagnoses).includes(d);
    })) {
      errors.diagnosisCodes = "All diagnosis codes do not match the directory";
    }
  }
  switch (values.type) {
    case "Hospital":
      break;
    case "HealthCheck":
      if (typeof values.healthCheckRating === 'undefined' || values.healthCheckRating === null) {
        errors.healthCheckRating = "Health check rating is required";
      } else {
        if (!isHealthCheckRating(values.healthCheckRating)) {
          errors.healthCheckRating = `Health check rating incorrect. Accepted values are 0 (Healthy), 1 (LowRisk), 2 (HighRisk), and 3 (CriticalRisk)`;
        }
      }
      break;
    case "OccupationalHealthcare":
      break;
    default:
      
  }
  
  return errors;
};

export const AddEntryForm = ({ onSubmit, onCancel, entryType } : Props ) => {
  const [{ diagnoses }] = useStateValue();

  console.log(`Switch case begins with entryType: ${entryType}`);

  switch (entryType){
    case "HealthCheck":
      return (
        <Formik
          initialValues={{
            description: "",
            specialist: "",
            date: "",
            type: "HealthCheck",
            diagnosisCodes: [],
            healthCheckRating: 0
          }}
          onSubmit={onSubmit}
          validate={values => validateForm(values, diagnoses)}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
              <Form className="form ui">
                <SelectTypeField
                  label="Type"
                  name="type"
                  options={typeOptions}
                />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Specialist name"
                  placeholder="specialist"
                  name="specialist"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                /> 
                <Field
                  label="healthCheckRating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                />
                <Grid>
                  <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                      Cancel
                    </Button>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <Button
                      type="submit"
                      floated="right"
                      color="green"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      );
    case "Hospital":
      return (
        <h1>CASE HOSPITAL</h1>
      );
    case "OccupationalHealthcare":
      return (
        <h1>CASE OCCUPATIONAL</h1>
      );
  }
  
};

export default AddEntryForm;