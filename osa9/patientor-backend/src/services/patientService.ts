import patientData from '../../data/patients.json';
import { 
  Patient, 
  NonSensitivePatient,
  NewPatientEntry 
} from '../types';

import {v1 as uuid} from 'uuid';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  
  const newPatient: Patient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
  
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};