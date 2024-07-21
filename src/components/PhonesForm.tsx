import React, { useState, Dispatch, SetStateAction } from 'react';
import { Box, Button, IconButton, Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IPhone } from '../services/types';
import { KIND_OPTIONS } from '../services/constants';
import LSTextField from '../components/LSTextField';
import LSSelect from '../components/LSSelect';

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
              <LSTextField
                label="Phone"
                value={phone.value}
                onChange={(value) => setPhoneValue(index, value)}
                required={true}
              />
            </Box>
            <Box className="w-[30%] mx-4">
              <LSSelect
                label="Kind"
                id={`kind-${index}`}
                value={phone.kind}
                options={KIND_OPTIONS}
                onChange={(value) => setPhoneKind(index, value)}
                required={true}
              />
            </Box>
            <IconButton className="!mb-6" onClick={() => removePhone(index)}>
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
