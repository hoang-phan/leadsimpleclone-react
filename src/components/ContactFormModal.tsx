import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useApolloClient, useMutation } from '@apollo/client';
import EmailsForm from './EmailsForm';
import PhonesForm from './PhonesForm';
import { IEmail, IPhone, IContact } from '../services/types';
import { SAVE_CONTACT_QUERY, GET_CONTACTS_QUERY } from '../services/apiQueries';
import LSTextField from '../components/LSTextField';

function ContactFormModal({open, handleClose, contact} : {
  open: boolean, handleClose: () => void, contact?: IContact
}) {
  const id = contact?.id;
  const [emails, setEmails] = useState<IEmail[]>([]);
  const [phones, setPhones] = useState<IPhone[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [saveContactFunc, { data, loading, error }] = useMutation(SAVE_CONTACT_QUERY);
  const client = useApolloClient();

  const saveContact = () => {
    saveContactFunc({
      variables: { id, firstName, lastName, companyName, emails, phones },
      onCompleted: () => {
        handleClose();
        setFirstName("");
        setLastName("");
        setCompanyName("");
        setEmails([]);
        setPhones([]);
        client.refetchQueries({include: [GET_CONTACTS_QUERY]});
      }
    });
  };

  useEffect(() => {
    setFirstName(contact?.firstName || "");
    setLastName(contact?.lastName || "");
    setCompanyName(contact?.companyName || "");
    setEmails(contact?.emails || []);
    setPhones(contact?.phones || []);
  }, [contact])

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
          <h1 id="modal-modal-title" className="text-2xl font-semibold m-1 p-4">Add Contact</h1>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div id="modal-modal-description" className="p-4 w-full max-h-[calc(100vh-300px)] overflow-y-auto">
          <div className="flex justify-between w-full">
            <Box className="m-1 flex-1 max-w-[50%]">
              <LSTextField
                label="First Name"
                onChange={(value) => setFirstName(value)}
                value={firstName}
              />
            </Box>
            <Box className="m-1 flex-1 max-w-[50%]">
              <LSTextField
                label="Last Name"
                onChange={(value) => setLastName(value)}
                value={lastName}
              />
            </Box>
          </div>
          <div className="flex justify-between w-full">
            <Box className="w-full m-1">
              <LSTextField
                label="Company Name"
                onChange={(value) => setCompanyName(value)}
                value={companyName}
              />
            </Box>
          </div>

          <h2 className="text-xl font-semibold m-1 mt-5">Contact Info</h2>
          <h3 className="text-lg font-semibold m-1 mt-5">Emails</h3>
          <EmailsForm emails={emails} setEmails={setEmails} />
          <h3 className="text-lg font-semibold m-1 mt-5">Phones</h3>
          <PhonesForm phones={phones} setPhones={setPhones} />
        </div>
        <Box className="flex justify-end p-4">
          <Button className="text-[#3E495A] !border-[#3E495A] !text-[#3E495A] !normal-case !mr-2 !font-semibold" variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button className="bg-[#0E4EB0] !normal-case !font-semibold" variant="contained" onClick={saveContact}>Save Contact</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ContactFormModal;
