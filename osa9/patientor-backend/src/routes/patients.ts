import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

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