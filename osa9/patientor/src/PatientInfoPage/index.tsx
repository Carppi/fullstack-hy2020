import React from "react";
import axios from "axios";
import { Button, Container, Header, Icon, List, Segment } from "semantic-ui-react";
import {
  useParams
} from 'react-router-dom';

import AddEntryModal from "../AddEntryModal";

import { Entry, EntryWithoutId, Patient, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addSensitivePatient, addEntry } from "../state";
import HealthRatingBar from "../components/HealthRatingBar";

type DiagnosisCodeProps ={
  diagnoseCodes?: string[];
};

type HospitalEntryProps ={
  entry: HospitalEntry;
};

type HealthCheckEntryProps ={
  entry: HealthCheckEntry;
};

type OccupationalHealthEntryProps ={
  entry: OccupationalHealthcareEntry;
};

const PatientInfoPage = () => {

  const [{ sensitivePatients, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
  const [occupationalModalOpen, setOccupationalModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const openHospitalModal = (): void => setHospitalModalOpen(true);
  const openOccupationalModal = (): void => setOccupationalModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const closeHospitalModal = (): void => {
    setHospitalModalOpen(false);
    setError(undefined);
  };
  const closeOccupationalModal = (): void => {
    setOccupationalModalOpen(false);
    setError(undefined);
  };
  

  const { id } = useParams<{ id: string }>();

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      closeModal();
      closeHospitalModal();
      closeOccupationalModal();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  React.useEffect(() => {

    const fetchSensitivePatient = async () => {
      if (!Object.keys(sensitivePatients).includes(id) ){
        try {
          const { data: sensitivePatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(addSensitivePatient(sensitivePatient));
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchSensitivePatient();
  }, [dispatch]);

  const patient: Patient | undefined = Object.entries(sensitivePatients).find(p => p[0] === id)?.[1];
  
  if(patient) {

    const GenderIcon = () => {
      switch(patient.gender) {
        case "male":
          return <Icon name="mars" />;
        case "female":
          return <Icon name="venus" />;
        default:
          return <Icon name="genderless" />;
      }

    };

    /**
     * Helper function for exhaustive type checking
     */
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

    const diagnosisCodetoName = (code: string) => {
      const potentialDiagnosis = Object.entries(diagnoses).find(d => d[0] == code);
      if(potentialDiagnosis) {
        return potentialDiagnosis[1].name;
      } else {
        return "no diagnosis found";
      }

    };

    const DiagnosesList = ({ diagnoseCodes }: DiagnosisCodeProps) => {
      if (diagnoseCodes) {
        return (<List bulleted>
          {diagnoseCodes.map((code: string) => (
            <List.Item key={code}>{code} {diagnosisCodetoName(code)}</List.Item>
          ))}
        </List>);
      } else {
        return (<List bulleted>
          <List.Item>No related diagnoses found</List.Item>
        </List>);
      }
    };


    const HospitalEntry = ({entry}: HospitalEntryProps) => (
      <Segment key={entry.id}>
        <Header icon='hospital' content={`${entry.date} (specialist: ${entry.specialist})`} />
        <i>Description: {entry.description}</i> <br/>
        <i>Patient was discharged on {entry.discharge.date} based on the following criteria: {entry.discharge.criteria}</i>
        <DiagnosesList diagnoseCodes={entry.diagnosisCodes} />
      </Segment>
    );

    const HealthCheckEntry = ({entry}: HealthCheckEntryProps) => (
      <Segment key={entry.id}>
        <Header icon='stethoscope' content={`${entry.date} (specialist: ${entry.specialist})`} />
        <i>Description: {entry.description}</i>
        <DiagnosesList diagnoseCodes={entry.diagnosisCodes} />
        <Header>Result</Header>
        <HealthRatingBar rating={entry.healthCheckRating} showText={true}/>
      </Segment>
    );

    interface SickLeaveProps {
      sickLeave?: {startDate: string, endDate: string}
    }

    const SickLeave = ({sickLeave}: SickLeaveProps) => {
      if(sickLeave){
        return <i>Sick leave from {sickLeave.startDate} to {sickLeave.endDate}</i>;
      } else {
        return null;
      }
    };

    const OccupationalHealthEntry = ({entry}: OccupationalHealthEntryProps) => (
      <Segment key={entry.id}>
        <Header icon='user md' content={`${entry.date}, ${entry.employerName} (specialist: ${entry.specialist})`} />
        <i>Description: {entry.description}</i><br/>
        <SickLeave sickLeave={entry.sickLeave}/>
        <DiagnosesList diagnoseCodes={entry.diagnosisCodes} />
      </Segment>
    );

    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
      switch (entry.type) {
        case "Hospital":
          return <HospitalEntry entry={entry}/>;
        case "HealthCheck":
          return <HealthCheckEntry entry={entry}/>;
        case "OccupationalHealthcare":
          return <OccupationalHealthEntry entry={entry}/>;
        default:
          return assertNever(entry);
      }
    };

    const PatientEntries = () => {
      if(patient.entries && patient.entries.length > 0){
        return (
          <div>
            {patient.entries.map((entry: Entry) => (
              <EntryDetails entry={entry} key={entry.id}/>
            ))}
          </div>
        );
      } else {
        return(<p>No patient entries available</p>);
      }
    };

    return (
      <div className="App">
        <Container textAlign="center">
          <h3>Patient information</h3>
        </Container>
        <div>
          <h2>{patient.name} <GenderIcon/></h2>
          <p>ssn: {patient.ssn}</p>
          <p>Occupation: {patient.occupation}</p>
          <h3>Entries</h3>
          <PatientEntries />
        </div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          formName='Health Check'
          entryType="HealthCheck"
        />
        <AddEntryModal
          modalOpen={hospitalModalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeHospitalModal}
          formName='Hospital'
          entryType="Hospital"
        />
        <AddEntryModal
          modalOpen={occupationalModalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeOccupationalModal}
          formName='Occupational Healthcare'
          entryType="OccupationalHealthcare"
        />
        <Button onClick={() => openModal()}>Add New Health Check Entry</Button>
        <Button onClick={() => openHospitalModal()}>Add New Hospital Entry</Button>
        <Button onClick={() => openOccupationalModal()}>Add New Occupational Entry</Button>
      </div>
    );
  } else {
    return(<div>Patient not found</div>);
  }
};

export default PatientInfoPage;