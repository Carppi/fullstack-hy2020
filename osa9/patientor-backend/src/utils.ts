import { 
  NewPatientEntry,
  Gender,
  EntryWithoutId,
  Discharge,
  HealthCheckRating,
  SickLeave
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)){
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {    
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newEntry;
};

// new medical entries for a patient

type MedicalEntryFields = { description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, type: unknown, discharge: unknown, employerName: unknown, sickLeave: unknown, healthCheckRating: unknown };

const parseType = (type: unknown): "Hospital" | "OccupationalHealthcare" | "HealthCheck" => {
  if (!type || !isString(type)){
    console.log(type);
    console.log("type not available or not string");
    throw new Error('Incorrect or missing type');
  } else {
    
    if(type === "Hospital" || type === "OccupationalHealthcare" || type === "HealthCheck") {
      return type;
    } else {
      throw new Error('Type is available and string but the value is not Hospital, OccupationalHealthcare or HealthCheck');
    }

  }
};

const parseText = (text: unknown, textName: string): string => {
  if (!text || !isString(text)){
    throw new Error('Incorrect or missing ' + textName);
  }
  return text;
};


const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (diagnosisCodes && diagnosisCodes instanceof Array && diagnosisCodes.every(x => isString(x))) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return diagnosisCodes;
  } else {
    throw new Error('DiagnosisCodes not in string array format');
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  return ("date" in param && "criteria" in param);
};

const parseDischarge = (discharge: unknown): Discharge => {
  if(!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge information');
  } else {
    return discharge;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
      throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  return ("startDate" in param && "endDate" in param);
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if(!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave information');
  } else {
    return sickLeave;
  }
};

export const toNewMedicalEntry = ({ type, description, date, specialist, diagnosisCodes, discharge, employerName, sickLeave, healthCheckRating }: MedicalEntryFields): EntryWithoutId => {
  
  const parsedType = parseType(type);

  switch (parsedType) {
    case "Hospital":
      const newHospitalEntry: EntryWithoutId = {    
        type: parsedType,
        description: parseText(description, "description"),
        date: parseDate(date),
        specialist: parseText(specialist, "specialist"),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        discharge: parseDischarge(discharge)
      };
    
      return newHospitalEntry;
      
    case "HealthCheck":
      const newHealthCheckEntry: EntryWithoutId = {    
        type: parsedType,
        description: parseText(description, "description"),
        date: parseDate(date),
        specialist: parseText(specialist, "specialist"),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
    
      return newHealthCheckEntry;

    case "OccupationalHealthcare":
      const newOccupationalEntry: EntryWithoutId = {    
        type: parsedType,
        description: parseText(description, "description"),
        date: parseDate(date),
        specialist: parseText(specialist, "specialist"),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        employerName: parseText(employerName, "employer name"),
        sickLeave: parseSickLeave(sickLeave)
      };
    
      return newOccupationalEntry;
  }

};