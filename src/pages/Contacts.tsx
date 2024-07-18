import React, { useState, useEffect } from 'react';
import { Tooltip, Checkbox, IconButton, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloseIcon from '@mui/icons-material/Close';
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { GET_CONTACTS_QUERY, DELETE_CONTACT_QUERY } from '../services/apiQueries';
import { IContact } from '../services/types'
import ContactFormModal from '../components/ContactFormModal';
import ConfirmDialog from '../components/ConfirmDialog';

function Contacts() {
  const { data, loading, error } = useQuery(GET_CONTACTS_QUERY);
  const [deleteFunction] = useMutation(DELETE_CONTACT_QUERY);
  const [selected, setSelected] = useState<Record<string, any>>({});
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [contacts, setContacts] = useState<{node: IContact}[]>([]);
  const [currentContact, setCurrentContact] = useState<IContact | undefined>(undefined);
  const [newContactOpen, setNewContactOpen] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const currentSelectedIds = contacts.filter(({ node }: { node: IContact }) => selected[node.id]).map(({ node }) => node.id);
  const numberOfSelected = currentSelectedIds.length;
  const client = useApolloClient();

  useEffect(() => {
    if (data?.contacts?.edges) {
      setContacts(data.contacts.edges);
    }
  }, [data]);

  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <h1>Loading...</h1>;

  const toggleSelectedRow = (id: string) => {
    setSelected((selected) => {
      const newRowSelected = !selected[id];
      const result = { ...selected, [id]: newRowSelected };
      setSelectedAll(newRowSelected && allSelected(result));
      return result;
    });
  }

  const toggleSelected = () => {
    updateAllSelected(!selectedAll);
  }

  const updateAllSelected = (value: boolean) => {
    const newSelected : Record<string, any> = {};
    contacts.forEach(({ node }: { node: IContact }) => {
      newSelected[node.id] = value;
    });
    setSelected(newSelected);
    setSelectedAll(value);
  }

  const allSelected = (result: Record<string, any>) => (
    contacts.every(({ node }: { node: IContact }) => result[node.id])
  );

  const openContactForm = (contact?: IContact) => {
    setCurrentContact(contact);
    setNewContactOpen(true);
  };

  const deleteContacts = (ids: String[]) => {
    deleteFunction({
      variables: { ids },
      onCompleted: () => {
        client.refetchQueries({include: [GET_CONTACTS_QUERY]});
      }
    })
  }

  return (
    <div className="flex flex-col">
      {numberOfSelected > 0 && (
        <div className="p-2 fixed top-0 left-0 w-full h-[72px] bg-[#ffffffee] z-10 flex items-center justify-between shadow-md">
          <div className="flex items-center">
            <IconButton onClick={() => updateAllSelected(false)}>
              <CloseIcon />
            </IconButton>
            <h1 className="text-xl font-semibold ml-5">{numberOfSelected} selected</h1>
            <div
              className="text-xs font-semibold ml-5 text-blue-800 cursor-pointer"
              onClick={() => updateAllSelected(true)}
            >
              {numberOfSelected < contacts.length ? `Select all ${contacts.length} records` : "All records selected"}
            </div>
          </div>
          <div className="flex items-center">
            <Button
              className="bg-[#0E4EB0] !normal-case !font-semibold"
              variant="contained"
              onClick={() => alert("Under construction")}
            >
              Create Leads
            </Button>
            <Button
              className="bg-[#0E4EB0] !normal-case !font-semibold !mx-2"
              variant="contained"
              disabled={numberOfSelected < 2}
              onClick={() => alert("Under construction")}
            >
              Merge
            </Button>
            <Button
              className="bg-[#0E4EB0] !normal-case !font-semibold"
              variant="contained"
              onClick={() => setConfirmDeleteOpen(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      <div className="h-[72px] flex items-center justify-between border-b-2 border-grey w-full">
        <h1 className="text-2xl font-medium px-[24px]">Contacts</h1>
        <div className="flex">
          <Tooltip title="New Contact">
            <IconButton onClick={() => setNewContactOpen(true)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Merge Duplicated Contacts">
            <IconButton onClick={() => alert("Under construction")}>
              <MergeTypeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export Contacts">
            <IconButton>
              <CloudDownloadIcon onClick={() => alert("Under construction")}/>
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <ContactFormModal
        open={newContactOpen}
        contact={currentContact}
        handleClose={() => {
          setNewContactOpen(false);
          setCurrentContact(undefined);
        }}
      />
      <ConfirmDialog
        open={confirmDeleteOpen}
        handleClose={() => { setConfirmDeleteOpen(false) }}
        title={`Delete ${numberOfSelected} ${numberOfSelected > 1 ? "Contacts" : "Contact"}`}
        content={`You're about to permanently delete ${numberOfSelected} ${numberOfSelected > 1 ? "contacts" : "contact"} from your account. This can't be undone. Are you sure you want to do this?`}
        actionTitle="Delete"
        handleConfirm={() => { deleteContacts(currentSelectedIds) }}
      />
      <div className="flex flex-col items-start w-full p-[24px]">
        {contacts && <h2 className="text-lg font-medium">Total: {contacts.length}</h2>}
        {contacts && (
          <table className="text-left p-[24px] w-full mt-4 text-sm">
            <thead>
              <tr>
                <th className="p-[16px] border-b border-grey">
                  <Checkbox onChange={toggleSelected} checked={selectedAll}/>
                </th>
                <th className="p-[16px] border-b border-grey">First name</th>
                <th className="p-[16px] border-b border-grey">Last name</th>
                <th className="p-[16px] border-b border-grey">Company name</th>
                <th className="p-[16px] border-b border-grey">Primary Phone</th>
                <th className="p-[16px] border-b border-grey">Primary Email</th>
                <th className="p-[16px] border-b border-grey">Source</th>
                <th className="p-[16px] border-b border-grey">Created At</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {contacts.map(({node}: {node: IContact}) => (
                <tr key={node.id} onClick={() => openContactForm(node)} className={`hover:bg-[#EEEEEE] ${selected[node.id] && 'bg-[#EEEEEE]'}`}>
                  <td onClick={(event) => event.stopPropagation()} className="p-[16px] border-b border-grey">
                    <Checkbox onChange={() => toggleSelectedRow(node.id)} checked={!!selected[node.id]}/>
                  </td>
                  <td className="px-[16px] border-b border-grey">{node.firstName}</td>
                  <td className="px-[16px] border-b border-grey">{node.lastName}</td>
                  <td className="px-[16px] border-b border-grey">{node.companyName}</td>
                  <td className="px-[16px] border-b border-grey">{node.phones[0]?.value || <span className="text-[#AAAAAA]">None</span>}</td>
                  <td className="px-[16px] border-b border-grey">{node.emails[0]?.value || <span className="text-[#AAAAAA]">None</span>}</td>
                  <td className="px-[16px] border-b border-grey">{node.source.name}</td>
                  <td className="px-[16px] border-b border-grey">{node.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Contacts;
