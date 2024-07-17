import React, { useState, Dispatch, SetStateAction } from 'react';
import { Box, Button, IconButton, TextField, Card, MenuItem, InputLabel, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IEmail } from '../services/types';

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
      <h4 className="text-base font-semibold m-4 mb-0">Email Address</h4>
      {emails.map((email, index) => {
        if (emails[index]._destroy === "1") {
          return <div />
        }

        return (
          <div key={index} className="flex w-full justify-between items-center my-4">
            <Box className="w-[70%] mx-4">
              <TextField label="Email" className="w-full bg-[#E9ECF0]" value={email.value} onChange={({ target }) => setEmailValue(index, target.value)}/>
            </Box>
            <Box className="w-[30%] mx-4">
              <FormControl className="w-full bg-[#E9ECF0]">
                <InputLabel id={`kind-label-${index}`}>Kind</InputLabel>
                <Select
                  label="Kind"
                  labelId={`kind-label-${index}`}
                  value={email.kind}
                  onChange={({ target }) => setEmailKind(index, target.value)}
                >
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="spouse">Spouse</MenuItem>
                  <MenuItem value="partner">Partner</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <IconButton onClick={() => removeEmail(index)}>
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
