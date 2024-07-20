import React, { useState, Dispatch, SetStateAction } from 'react';
import { Box, Button, IconButton, TextField, Card, MenuItem, InputLabel, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import StarIcon from '@mui/icons-material/Star';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Avatar from 'react-avatar';
import { useQuery } from '@apollo/client';
import { IContact } from '../services/types';
import { SEARCH_CONTACTS_QUERY } from '../services/apiQueries';

function LeadContactsForm({contacts, setContacts} : {contacts: IContact[], setContacts: Dispatch<SetStateAction<IContact[]>>}) {
  const [filter, setFilter] = useState<string>("");
  const { data, loading, error, refetch } = useQuery(SEARCH_CONTACTS_QUERY, {skip: !filter});
  const [addingContact, setAddingContact] = useState<boolean>(false);

  const addContact = (contact: IContact) => {
    setContacts(contacts => [...contacts, contact])
  }

  const removeContact = (index: number) => {
    setContacts(contacts => {
      const newContacts = [...contacts];
      newContacts[index] = { ...newContacts[index], _destroy: "1" };
      return newContacts;
    })
  }

  const setContact = (index: number, contact: IContact) => {
    setContacts(contacts => {
      const newContacts = [...contacts];
      newContacts[index]= contact;
      return newContacts;
    });
  }

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    refetch({ filter });
  }

  return (
    <div className="flex flex-col">
      {!addingContact && (
        <div className="flex w-full items-center justify-between m-1">
          <h2 className="text-xl font-semibold">Contacts</h2>
          <IconButton onClick={() => setAddingContact(true)}>
            <AddCircleIcon />
          </IconButton>
        </div>
      )}
      {addingContact && (
        <Box className="flex flex-col w-full pr-3 m-1">
          <Box className="flex w-full px-3 items-center justify-between border border-[#AAAAAA]">
            <SearchIcon />
            <input
              className="w-full p-2 focus:outline-none"
              type="text"
              placeholder="Search Contact"
              value={filter}
              onChange={({ target }) => handleFilterChange(target.value)}
            />
            <IconButton onClick={() => setAddingContact(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className="flex flex-col border border-[#AAAAAA] min-h-[36px]">
            {data && data.contacts.edges.map(({node}: {node: IContact}) => (
              <Box className="px-2 pt-1" key={node.id} onClick={() => {
                addContact(node)
                setAddingContact(false);
              }}>
              {`${node.firstName} ${node.lastName}`}
              </Box>
            ))}
            {!filter && <Box className="px-2 pt-1">You must enter a search term</Box>}
          </Box>
        </Box>
      )}
      {contacts.map(contact => (
        <Card key={contact.id} className="flex flex-col justify-center p-2 m-2">
          <Box className="flex h-[50px]">
            <Box className="flex h-full items-center justify-center">
              <Avatar name={`${contact.firstName} ${contact.lastName}`} size="32px" className="mr-2 rounded-full text-2xl"/>
            </Box>
            <Box className="flex flex-col justify-center">
              <Box className="font-semibold">{contact.firstName} {contact.lastName}</Box>
              <Box className="font-semibold text-[#AAAAAA]">{contact.companyName}</Box>
            </Box>
          </Box>
          <Box className="flex items-center text-sm">
            <InfoIcon className="text-[#888888] m-2" />
            <p>Lease Violations: 0</p>
          </Box>
          <Box className="flex items-center mt-2">
            <IconButton onClick={() => alert("Under construction")}>
              <EditIcon className="text-[#888888]" />
            </IconButton>
            <IconButton onClick={() => alert("Under construction")}>
              <FileCopyIcon className="text-[#888888]" />
            </IconButton>
            <IconButton onClick={() => alert("Under construction")}>
              <StarIcon className="text-[#FFCC80]" />
            </IconButton>
            <IconButton onClick={() => alert("Under construction")}>
              <CloudDownloadIcon className="text-[#888888]" />
            </IconButton>
          </Box>
        </Card>
      ))}
      {contacts.length === 0 && !addingContact && (
        <Button fullWidth={true} className="w-full !font-semibold !normal-case" onClick={() => setAddingContact(true)}>
          <AddIcon />
          Add a contact to this lead
        </Button>
      )}
    </div>
  );
}

export default LeadContactsForm;
