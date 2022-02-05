import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_SENSITIVE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  }
  | {
      type: "ADD_ENTRY";
      payload: {
        entry: Entry,
        patientId: string
      };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "ADD_SENSITIVE_PATIENT":
      return {
        ...state,
        sensitivePatients: {
          ...state.sensitivePatients,
          [action.payload.id]: action.payload
        }
      };

      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            ),
            ...state.diagnoses
          }
        };

      case "ADD_ENTRY": {
        const id = action.payload.patientId;
        let updatedEntries: Entry[] = [];
        
        const patientToBeUpdated = Object.entries(state.sensitivePatients).find(p => p[0] === id);
        if(patientToBeUpdated) {
          const foundPatientEntries = patientToBeUpdated[1].entries;
          if(foundPatientEntries) {
            updatedEntries = foundPatientEntries;
          }
          updatedEntries.push(action.payload.entry);

          const updatedPatient: Patient = {
            ...patientToBeUpdated[1],
            entries: updatedEntries
          };
          return {
            ...state,
            sensitivePatients: {
              ...state.sensitivePatients,
              [action.payload.patientId]: updatedPatient
            }
          };
        }
        /* if (patientToBeUpdated) {
          const updatedEntries = [] = patientToBeUpdated[1].entries ? patientToBeUpdated[1].entries : action.payload.entry;
          const updatedPatient: Patient = {
            ...patientToBeUpdated[1],
            entries: patientToBeUpdated[1].entries?.push()
          };
        } */
        
        return {
          ...state,
          sensitivePatients: state.sensitivePatients
        };
      }
    
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const addSensitivePatient = (patient: Patient): Action => {
  return {
    type: 'ADD_SENSITIVE_PATIENT',
    payload: patient
  };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnoses
  };
};

export const addEntry = (entry: Entry, patientId: string): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: {
      entry: entry,
      patientId: patientId
    }
  };
};