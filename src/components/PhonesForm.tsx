import React, { useState, Dispatch, SetStateAction } from 'react';
import { Box, Button, IconButton, TextField, Card, MenuItem, InputLabel, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IPhone } from '../services/types';

function PhoneForm({phones, setPhones} : {phones: IPhone[], setPhones: Dispatch<SetStateAction<IPhone[]>>}) {
  const addPhone = () => {
    setPhones(phones => [...phones, { value: "", kind: "personal" } as IPhone])
  }

  const removePhone = (index: number) => {
    setPhones(phones => {
      const newPhones = [...phones];
      newPhones[index] = { ...newPhones[index], _destroy: "1" };
      return newPhones;
    })
  }

  const setPhoneValue = (index: number, value: string) => {
    setPhones(phones => {
      const newPhones = [...phones];
      newPhones[index]= { ...newPhones[index], value };
      return newPhones;
    });
  }

  const setPhoneKind = (index: number, kind: string) => {
    setPhones(phones => {
      const newPhones = [...phones];
      newPhones[index]= { ...newPhones[index], kind };
      return newPhones;
    });
  }

  return (
    <Card className="bg-white m-1">
      <h4 className="text-base font-semibold m-4 mb-0">Phone Numbers</h4>
      {phones.map((phone, index) => {
        if (phones[index]._destroy === "1") {
          return <div />
        }

        return (
          <div key={index} className="flex w-full justify-between items-center my-4">
            <Box className="w-[70%] mx-4">
              <TextField label="Phone" className="w-full bg-[#E9ECF0]" value={phone.value} onChange={({ target }) => setPhoneValue(index, target.value)}/>
            </Box>
            <Box className="w-[30%] mx-4">
              <FormControl className="w-full bg-[#E9ECF0]">
                <InputLabel id={`kind-label-${index}`}>Kind</InputLabel>
                <Select
                  label="Kind"
                  labelId={`kind-label-${index}`}
                  value={phone.kind}
                  onChange={({ target }) => setPhoneKind(index, target.value)}
                >
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="spouse">Spouse</MenuItem>
                  <MenuItem value="partner">Partner</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <IconButton onClick={() => removePhone(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      })}
      <Button fullWidth={true} className="w-full !normal-case !text-[#3E495A]" onClick={addPhone}>
        <AddIcon />
        Add Phone
      </Button>
    </Card>
  );
}

export default PhoneForm;
