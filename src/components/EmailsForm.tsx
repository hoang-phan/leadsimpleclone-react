import React, { useState, Dispatch, SetStateAction } from 'react';
import { Box, Button, IconButton, Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IEmail } from '../services/types';
import { KIND_OPTIONS } from '../services/constants';
import LSTextField from '../components/LSTextField';
import LSSelect from '../components/LSSelect';

function EmailForm({emails, setEmails} : {emails: IEmail[], setEmails: Dispatch<SetStateAction<IEmail[]>>}) {
  const addEmail = () => {
    setEmails(emails => [...emails, { value: "", kind: "personal" } as IEmail])
  }

  const removeEmail = (index: number) => {
    setEmails(emails => {
      const newEmails = [...emails];
      newEmails[index] = { ...newEmails[index], _destroy: "1" };
      return newEmails;
    })
  }

  const setEmailValue = (index: number, value: string) => {
    setEmails(emails => {
      const newEmails = [...emails];
      newEmails[index]= { ...newEmails[index], value };
      return newEmails;
    });
  }

  const setEmailKind = (index: number, kind: string) => {
    setEmails(emails => {
      const newEmails = [...emails];
      newEmails[index]= { ...newEmails[index], kind };
      return newEmails;
    });
  }

  return (
    <Card className="bg-white m-1">
      <h4 className="text-base font-semibold m-4 mb-0">Email Addresses</h4>
      {emails.map((email, index) => {
        if (emails[index]._destroy === "1") {
          return <div />
        }

        return (
          <div key={index} className="flex w-full justify-between items-center my-4">
            <Box className="w-[70%] mx-4">
              <LSTextField
                label="Email"
                value={email.value}
                onChange={(value) => setEmailValue(index, value)}
                required={true}
              />
            </Box>
            <Box className="w-[30%] mx-4">
              <LSSelect
                label="Kind"
                id={`kind-${index}`}
                value={email.kind}
                options={KIND_OPTIONS}
                onChange={(value) => setEmailKind(index, value)}
                required={true}
              />
            </Box>
            <IconButton className="!mb-6" onClick={() => removeEmail(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      })}
      <Button fullWidth={true} className="w-full !normal-case !text-[#3E495A]" onClick={addEmail}>
        <AddIcon />
        Add Email
      </Button>
    </Card>
  );
}

export default EmailForm;
