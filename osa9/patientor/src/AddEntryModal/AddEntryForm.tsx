import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { SelectTypeField, TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { EntryWithoutId, HealthCheckRating, Diagnosis } from "../types";
import { useStateValue } from "../state";


interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
  entryType: "HealthCheck" | "Hospital" | "OccupationalHealthcare"
}

interface ButtonProps {
  onCancel: () => void;
  dirty: boolean;
  isValid: boolean
}

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

  const errors: { [field: string]: string | {date?: string, criteria?: string} | {startDate?: string, endDate?: string} } = {};
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
      const date = values.discharge.date;

      const dischargeTemp: {date?: string, criteria?: string} = {};

      if (!date || !isString(date) || !isDate(date)) {
        dischargeTemp.date = 'Incorrect or missing date: ' + date + '. Use format YYYY-MM-DD';
        errors.discharge = dischargeTemp;
      }

      const criteria = values.discharge.criteria;
      if (!criteria || !isString(criteria)) {
        dischargeTemp.criteria = requiredStringError;
        errors.discharge = dischargeTemp;
      }
      
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
      if (values.sickLeave) {
        const sickLeaveTemp: {startDate?: string, endDate?: string} = {};
        let date = values.sickLeave.startDate;

        if (!date || !isString(date) || !isDate(date)) {
          sickLeaveTemp.startDate = 'Incorrect or missing date: ' + date + '. Use format YYYY-MM-DD';
          errors.sickLeave = sickLeaveTemp;
        }

        date = values.sickLeave.endDate;
        if (!date || !isString(date) || !isDate(date)) {
          sickLeaveTemp.endDate = 'Incorrect or missing date: ' + date + '. Use format YYYY-MM-DD';
          errors.sickLeave = sickLeaveTemp;
        }
      }
      
      const employerName = values.employerName;
      if (!employerName || !isString(employerName)) {
        errors.employerName = requiredStringError;
      }
      
      break;
      
  }
  
  return errors;
};

const HealthCheckFields = () => {
  return (
    <Field
      label="healthCheckRating"
      name="healthCheckRating"
      component={NumberField}
      min={0}
      max={3}
    />
  );
};

const HospitalFields = () => {
  return (
    <div>
      <Field
        label="dischargeDate"
        placeholder="YYYY-MM-DD"
        name='discharge.date'
        component={TextField}
      />
      <Field
        label="dischargeCriteria"
        placeholder="criteria"
        name="discharge.criteria"
        component={TextField}
      />
    </div>
  );
};

const OccupationalFields = () => {
  return (
    <div>
      <Field
        label="employerName"
        placeholder="employer"
        name='employerName'
        component={TextField}
      />
      <Field
        label="startDate"
        placeholder="YYYY-MM-DD"
        name='sickLeave.startDate'
        component={TextField}
      />
      <Field
        label="endDate"
        placeholder="YYYY-MM-DD"
        name='sickLeave.endDate'
        component={TextField}
      />
    </div>
  );
};

interface CommonProps {
  entryType: "HealthCheck" | "Hospital" | "OccupationalHealthcare"
}

const CommonFields = ({entryType}: CommonProps) => {
  return (
    <div>
      <SelectTypeField
        label="Type"
        name="type"
        options={[entryType]}
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
    </div>
  );
};

const ButtonGrid = ({ onCancel, dirty, isValid } : ButtonProps) => {
  return (
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
  );
};

export const AddEntryForm = ({ onSubmit, onCancel, entryType } : Props ) => {
  const [{ diagnoses }] = useStateValue();

  // initial values
  const healthCheckInitialValues: EntryWithoutId = {
    description: "",
    specialist: "",
    date: "",
    type: "HealthCheck",
    diagnosisCodes: [],
    healthCheckRating: 0
  };
  const hospitalInitialValues: EntryWithoutId = {
    description: "",
    specialist: "",
    date: "",
    type: "Hospital",
    diagnosisCodes: [],
    discharge: {
      date: "",
      criteria: ""
    }
  };
  const occupationalInitialValues: EntryWithoutId = {
    description: "",
    specialist: "",
    date: "",
    type: "OccupationalHealthcare",
    diagnosisCodes: [],
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: ""
    }
  };

  const initialValue = (entryType: "HealthCheck" | "Hospital" | "OccupationalHealthcare"): EntryWithoutId => {
    switch (entryType) {
      case "HealthCheck": return healthCheckInitialValues;
      case "Hospital": return hospitalInitialValues;
      case "OccupationalHealthcare": return occupationalInitialValues;
    }
  };

  switch (entryType){
    case "HealthCheck":
      return (
        <Formik
          initialValues={initialValue(entryType)}
          onSubmit={onSubmit}
          validate={values => validateForm(values, diagnoses)}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
              <Form className="form ui">
                <CommonFields entryType={entryType}/>
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                /> 
                <HealthCheckFields />
                <ButtonGrid onCancel={onCancel} dirty={dirty} isValid={isValid} />
              </Form>
            );
          }}
        </Formik>
      );
    case "Hospital":
      return (
        <Formik
          initialValues={initialValue(entryType)}
          onSubmit={onSubmit}
          validate={values => validateForm(values, diagnoses)}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
              <Form className="form ui">
                <CommonFields  entryType={entryType}/>
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                /> 
                <HospitalFields />
                <ButtonGrid onCancel={onCancel} dirty={dirty} isValid={isValid} />
              </Form>
            );
          }}
        </Formik>
      );
    case "OccupationalHealthcare":
      return (
        <Formik
          initialValues={initialValue(entryType)}
          onSubmit={onSubmit}
          validate={values => validateForm(values, diagnoses)}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
              <Form className="form ui">
                <CommonFields  entryType={entryType}/>
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                /> 
                <OccupationalFields />
                <ButtonGrid onCancel={onCancel} dirty={dirty} isValid={isValid} />
              </Form>
            );
          }}
        </Formik>
      );
  }
  
};

export default AddEntryForm;
