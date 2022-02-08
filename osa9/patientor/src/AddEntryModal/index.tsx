import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { EntryWithoutId } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  formName: string
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, formName }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry for {formName}</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} entryType="HealthCheck"/>
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;