import express from 'express';
import patientService from '../services/patientService';
import {
  toNewPatientEntry, 
  toNewMedicalEntry
} from '../utils';

const router = express.Router();

/* Create an endpoint /api/patients/:id that returns all of the patient information for one patient, including the array of patient entries that is still empty for all the patients.  
Return: name, ssn, occupation, dateOfBirth, gender, entries, id*/
router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});
/* 
We have established that patients can have different kinds of entries. We don't yet have any way of adding entries to patients in our app, so, at the moment, it is pretty useless as an electronic medical record.

Your next task is to add endpoint /api/patients/:id/entries to your backend, through which you can POST an entry for a patient.

Remember that we have different kinds of entries in our app, so our backend should support all those types and check that at least all required fields are given for each type.
*/

//add new medical entry for a patient
router.post('/:id/entries', (req, res) => {
  try {

    console.log(`body: ${req.body}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewMedicalEntry(req.body);

    const patientId = req.params.id;
    
    const addedEntry = patientService.addMedicalEntry(newEntry, patientId);
    
    res.json(addedEntry);
    
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

//add new patient
router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
    
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;