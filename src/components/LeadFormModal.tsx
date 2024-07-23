import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import LeadContactsForm from './LeadContactsForm';
import { IContact, ILead, IUser, IStage } from '../services/types';
import { SAVE_LEAD_QUERY, GET_LEADS_QUERY, GET_USERS_QUERY, GET_STAGES_QUERY } from '../services/apiQueries';
import LSTextField from '../components/LSTextField';
import LSSelect from '../components/LSSelect';

function LeadFormModal({open, handleClose, lead} : {
  open: boolean, handleClose: () => void, lead?: ILead
}) {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [stageId, setStageId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [saveLeadFunc, { data, loading, error }] = useMutation(SAVE_LEAD_QUERY);
  const usersData = useQuery(GET_USERS_QUERY).data;
  const stagesData = useQuery(GET_STAGES_QUERY).data;
  const client = useApolloClient();

  const initLeadNameByContact = (contact: IContact) => {
    if (!name) {
      setName(`${contact.firstName} ${contact.lastName}`)
    }
  }

  const saveLead = () => {
    const contactIds = contacts.map((contact: IContact) => contact.id);

    saveLeadFunc({
      variables: { name, contactIds, assigneeId, stageId },
      onCompleted: () => {
        handleClose();
        setName("");
        setContacts([]);
        setAssigneeId("");
        setStageId("");
        client.refetchQueries({include: [GET_LEADS_QUERY]});
      }
    });
  };

  const assigneeOptions = usersData ? usersData.users.map((user: IUser) => ({ value: user.id, label: user.email })) : [];
  const stageOptions = stagesData ? stagesData.stages.map((stage: IStage) => ({ value: stage.id, label: stage.name, style: { color: stage.color, fontWeight: 600 } })) : [];

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
          <h1 id="modal-modal-title" className="text-2xl font-semibold m-1 p-4">Create Lead</h1>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div id="modal-modal-description" className="p-4 w-full max-h-[calc(100vh-300px)] overflow-y-auto">
          <LeadContactsForm contacts={contacts} setContacts={setContacts} initLeadNameByContact={initLeadNameByContact} />
          <h2 className="text-xl font-semibold m-1 mt-5">Lead Info</h2>
          <div className="flex justify-between w-full my-4">
            <Box className="m-1 w-full">
              <LSTextField
                label="Name"
                onChange={(name) => setName(name)}
                value={name}
                required={true}
              />
            </Box>
          </div>
          <div className="flex justify-between w-full my-4">
            <Box className="m-1 w-[50%]">
              <LSSelect
                required={true}
                label="Assignee"
                id="assignee"
                value={assigneeId}
                onChange={(value) => setAssigneeId(value)}
                options={assigneeOptions}
              />
            </Box>
            <Box className="m-1 w-[50%]">
              <LSSelect
                required={true}
                label="Stage"
                id="stage"
                value={stageId}
                onChange={(value) => setStageId(value)}
                options={stageOptions}
              />
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
