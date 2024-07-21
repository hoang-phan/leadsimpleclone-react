import React, { useState } from 'react';
import { Modal, Box, IconButton, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useApolloClient } from '@apollo/client';
import { IContact } from '../services/types';
import { GET_CONTACTS_QUERY, MERGE_CONTACTS_QUERY } from '../services/apiQueries';

function MergeContactsFormModal({open, handleClose, contacts} : {
  open: boolean, handleClose: () => void, contacts: IContact[],
}) {
  const [primaryContactId, setPrimaryContactId] = useState<string>("");
  const [stageId, setStageId] = useState<string>("");
  const [mergeContactsFunc] = useMutation(MERGE_CONTACTS_QUERY);
  const client = useApolloClient();

  const mergeContacts = () => {
    mergeContactsFunc({
      variables: { contactIds: contacts.map(({id}) => id), primaryContactId },
      onCompleted: () => {
        handleClose();
        setPrimaryContactId("");
        client.refetchQueries({include: [GET_CONTACTS_QUERY]});
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center"
    >
      <Box className="bg-white max-w-screen-sm max-h-[calc(100%-64px)] w-[810px]">        
        <div className="flex justify-between items-center">
          <h1 id="modal-modal-title" className="text-2xl font-semibold m-1 p-4">Merge {contacts.length} Contacts</h1>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div id="modal-modal-description" className="w-full max-h-[calc(100vh-300px)] overflow-y-auto overflow-x-hidden">
          <p className="font-semibold m-4 mr-3 text-justify">
            You're about to merge {contacts.length} contacts. This action cannot be undone. If you're sure you want to do this, select the winner contact below.
            LeadSimple will merge any information the winner doesn't have from the other contacts.
          </p>
          <FormControl className="!mx-4">
            <FormLabel id="merge-contacts-label">Select Contact You Want To Keep</FormLabel>
            <RadioGroup
              aria-labelledby="merge-contacts-label"
              value={primaryContactId}
              onChange={({target}) => setPrimaryContactId(target.value)}
            >
              {contacts.map((contact) => (
                <FormControlLabel
                  key={contact.id}
                  value={contact.id}
                  control={<Radio />}
                  label={`${contact.name} - ${contact.leadsCount} leads - ${contact.createdAt}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <Box className="flex justify-end p-4">
          <Button className="text-[#3E495A] !border-[#3E495A] !text-[#3E495A] !normal-case !mr-2 !font-semibold" variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button className="bg-[#0E4EB0] !normal-case !font-semibold" variant="contained" onClick={mergeContacts}>Merge</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default MergeContactsFormModal;
