import patientData from '../../data/patients';
import { 
  Patient, 
  NonSensitivePatient,
  NewPatientEntry,
  EntryWithoutId,
  Entry
} from '../types';

import {v1 as uuid} from 'uuid';

const patients: Patient[] = patientData;

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

const addMedicalEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  
  const patient = patients.find(p => p.id === patientId);

  if(patient) {
    
    const newEntry: Entry = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      id: uuid(),
      ...entry
    };
    
    patients.map(p => {
      if(p.id === patientId) {
        p.entries.push(newEntry);
      }
    });
    
    return newEntry;
  } else {
    throw new Error('Patient not found');
  }
  
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addMedicalEntry,
  findById
};