import React, { useState } from 'react';
import { Modal, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { IUser, IStage } from '../services/types';
import { GET_LEADS_QUERY, GET_USERS_QUERY, GET_STAGES_QUERY, CREATE_LEADS_FROM_CONTACTS_QUERY } from '../services/apiQueries';
import LSSelect from '../components/LSSelect';

function CreateLeadsFromContactsFormModal({open, handleClose, contactIds} : {
  open: boolean, handleClose: () => void, contactIds: string[],
}) {
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [stageId, setStageId] = useState<string>("");
  const usersData = useQuery(GET_USERS_QUERY).data;
  const stagesData = useQuery(GET_STAGES_QUERY).data;
  const [createLeadsFunc] = useMutation(CREATE_LEADS_FROM_CONTACTS_QUERY);
  const client = useApolloClient();

  const createLeads = () => {
    createLeadsFunc({
      variables: { contactIds, assigneeId, stageId },
      onCompleted: () => {
        handleClose();
        setStageId("");
        setAssigneeId("");
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
          <h1 id="modal-modal-title" className="text-2xl font-semibold m-1 p-4">Create Leads</h1>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <p className="font-semibold m-4 mr-3 text-justify">
          <span>LeadSimple will create new leads for the {contactIds.length} contacts you selected in the Stage you select below. </span>
          <span className="text-[#EF6C00]">This cannot easily be undone. If you're sure you want to do this, select from the options below.</span>
        </p>
        <div id="modal-modal-description" className="p-4 w-full max-h-[calc(100vh-300px)] overflow-y-auto overflow-x-hidden">
          <Box className="flex m-1 w-full my-4">
            <LSSelect
              required={true}
              label="Start In Stage"
              id="stage"
              value={stageId}
              onChange={(value) => setStageId(value)}
              options={stageOptions}
            />
          </Box>
          <Box className="flex m-1 w-full my-4">
            <LSSelect
              required={true}
              label="Assign to User"
              id="assignee"
              value={assigneeId}
              onChange={(value) => setAssigneeId(value)}
              options={assigneeOptions}
            />
          </Box>
        </div>
        <Box className="flex justify-end p-4">
          <Button className="text-[#3E495A] !border-[#3E495A] !text-[#3E495A] !normal-case !mr-2 !font-semibold" variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button className="bg-[#0E4EB0] !normal-case !font-semibold" variant="contained" onClick={createLeads}>Create</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CreateLeadsFromContactsFormModal;
