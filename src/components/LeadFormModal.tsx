import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button, MenuItem, InputLabel, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import LeadContactsForm from './LeadContactsForm';
import { IContact, ILead, IUser, IStage } from '../services/types';
import { SAVE_LEAD_QUERY, GET_LEADS_QUERY } from '../services/apiQueries';
import { useApolloClient, useMutation } from '@apollo/client';

function LeadFormModal({open, handleClose, lead} : {
  open: boolean, handleClose: () => void, lead?: ILead
}) {
  const id = lead?.id;
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [assignee, setAssignee] = useState<IUser>({} as IUser);
  const [stage, setStage] = useState<IStage>({} as IStage);
  const [name, setName] = useState<string>("");
  const [saveLeadFunc, { data, loading, error }] = useMutation(SAVE_LEAD_QUERY);
  const client = useApolloClient();

  const initLeadNameByContact = (contact: IContact) => {
    if (!name) {
      setName(`${contact.firstName} ${contact.lastName}`)
    }
  }

  const saveLead = () => {
    saveLeadFunc({
      variables: { id, name, contacts },
      onCompleted: () => {
        handleClose();
        setName("");
        setContacts([]);
        setAssignee({} as IUser);
        setStage({} as IStage);
        client.refetchQueries({include: [GET_LEADS_QUERY]});
      }
    });
  };

  useEffect(() => {
    setName(lead?.name || "");
    setContacts(lead?.contacts || []);
    setStage(lead?.stage || ({} as IStage));
    setAssignee(lead?.assignee || ({} as IUser));
  }, [lead])

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
          <h1 id="modal-modal-title" className="text-2xl font-semibold m-1 p-4">{id ? 'Update' : 'Create'} Lead</h1>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div id="modal-modal-description" className="p-4 w-full max-h-[calc(100vh-300px)] overflow-y-auto">
          <LeadContactsForm contacts={contacts} setContacts={setContacts} initLeadNameByContact={initLeadNameByContact} />
          <h2 className="text-xl font-semibold m-1 mt-5">Lead Info</h2>
          <div className="flex justify-between w-full my-4">
            <Box className="m-1 w-full">
              <TextField
                label="Name"
                variant="outlined"
                className="bg-[#E9ECF0] font-semibold w-full"
                onChange={({ target }) => setName(target.value)}
                value={name}
              />
            </Box>
          </div>
          <div className="flex justify-between w-full my-4">
            <Box className="m-1 w-[50%]">
              <FormControl className="w-full bg-[#E9ECF0]">
                <InputLabel id="assignee-label">Assignee</InputLabel>
                <Select
                  label="Assignee"
                  labelId={`assignee-label`}
                  value={assignee.id}
                  onChange={({ target }) => setAssignee({ id: target.value } as IUser)}
                >
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="spouse">Spouse</MenuItem>
                  <MenuItem value="partner">Partner</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className="m-1 w-[50%]">
              <FormControl className="w-full bg-[#E9ECF0]">
                <InputLabel id="stage-label">Stage</InputLabel>
                <Select
                  label="Stage"
                  labelId={`stage-label`}
                  value={stage.id}
                  onChange={({ target }) => setStage({ id: target.value } as IStage)}
                >
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="spouse">Spouse</MenuItem>
                  <MenuItem value="partner">Partner</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <Box className="flex justify-end p-4">
          <Button className="text-[#3E495A] !border-[#3E495A] !text-[#3E495A] !normal-case !mr-2 !font-semibold" variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button className="bg-[#0E4EB0] !normal-case !font-semibold" variant="contained" onClick={saveLead}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default LeadFormModal;
