import React, { useState, useEffect } from 'react';
import { Tooltip, Checkbox, IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloseIcon from '@mui/icons-material/Close';
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { GET_LEADS_QUERY, DELETE_LEAD_QUERY } from '../services/apiQueries';
import LeadFormModal from '../components/LeadFormModal';
import { ILead } from '../services/types';
import ConfirmDialog from '../components/ConfirmDialog';

function Leads() {
  const { data, loading, error } = useQuery(GET_LEADS_QUERY);
  const [deleteFunction] = useMutation(DELETE_LEAD_QUERY);
  const [selected, setSelected] = useState<Record<string, any>>({});
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [leads, setLeads] = useState<{node: ILead}[]>([]);
  const [newLeadOpen, setNewLeadOpen] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const currentSelectedIds = leads.filter(({ node }: { node: ILead }) => selected[node.id]).map(({ node }) => node.id);
  const numberOfSelected = currentSelectedIds.length;
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.leads?.edges) {
      setLeads(data.leads.edges);
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
    leads.forEach(({ node }: { node: ILead }) => {
      newSelected[node.id] = value;
    });
    setSelected(newSelected);
    setSelectedAll(value);
  }

  const allSelected = (result: Record<string, any>) => (
    leads.every(({ node }: { node: ILead }) => result[node.id])
  );

  const deleteLeads = (ids: String[]) => {
    deleteFunction({
      variables: { ids },
      onCompleted: () => {
        client.refetchQueries({include: [GET_LEADS_QUERY]});
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
              {numberOfSelected < leads.length ? `Select all ${leads.length} records` : "All records selected"}
            </div>
          </div>
          <div className="flex items-center">
            <Button
              className="bg-[#0E4EB0] !normal-case !font-semibold !mx-2"
              variant="contained"
              onClick={() => alert("Under construction")}
            >
              Create Processes
            </Button>
            <Button
              className="bg-[#0E4EB0] !normal-case !font-semibold"
              variant="contained"
              onClick={() => setConfirmDeleteOpen(true)}
            >
              Delete Leads
            </Button>
            <Button
              className="bg-[#0E4EB0] !normal-case !font-semibold !mx-2"
              variant="contained"
              disabled={numberOfSelected < 2}
              onClick={() => alert("Under construction")}
            >
              Merge Leads
            </Button>
            <Button
              className="bg-[#0E4EB0] !normal-case !font-semibold"
              variant="contained"
              onClick={() => alert("Under construction")}
            >
              Update Leads
            </Button>
          </div>
        </div>
      )}
      <div className="h-[72px] flex items-center justify-between border-b-2 border-grey w-full">
        <h1 className="text-2xl font-medium px-[24px]">Leads</h1>
        <div className="flex">
          <Tooltip title="New Lead">
            <IconButton onClick={() => setNewLeadOpen(true)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Report">
            <IconButton onClick={() => alert("Under construction")}>
              <AssessmentIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton onClick={() => alert("Under construction")}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export Leads">
            <IconButton onClick={() => alert("Under construction")}>
              <CloudDownloadIcon/>
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <LeadFormModal
        open={newLeadOpen}
        handleClose={() => setNewLeadOpen(false)}
      />
      <ConfirmDialog
        open={confirmDeleteOpen}
        handleClose={() => { setConfirmDeleteOpen(false) }}
        title={`Delete ${numberOfSelected} ${numberOfSelected > 1 ? "Leads" : "Lead"}`}
        content={`You're about to permanently delete ${numberOfSelected} ${numberOfSelected > 1 ? "leads" : "lead"} from your account. This can't be undone. Are you sure you want to do this?`}
        actionTitle="Delete"
        handleConfirm={() => { deleteLeads(currentSelectedIds) }}
      />
      <div className="flex flex-col items-start w-full p-[24px]">
        {leads && <h2 className="text-lg font-medium">Total: {leads.length}</h2>}
        {leads && (
          <table className="text-left p-[24px] w-full mt-4 text-sm">
            <thead>
              <tr>
                <th className="p-[16px] border-b border-grey">
                  <Checkbox onChange={toggleSelected} checked={selectedAll}/>
                </th>
                <th className="p-[16px] border-b border-grey">Name</th>
                <th className="p-[16px] border-b border-grey">Calls Made</th>
                <th className="p-[16px] border-b border-grey">Emails Sent</th>
                <th className="p-[16px] border-b border-grey">Stage</th>
                <th className="p-[16px] border-b border-grey">Assignee</th>
                <th className="p-[16px] border-b border-grey">Created At</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {leads.map(({node}: {node: ILead}) => {
                return(
                  <tr key={node.id} onClick={() => navigate(`/leads/${node.id}`)} className={`hover:bg-[#EEEEEE] ${selected[node.id] && 'bg-[#EEEEEE]'}`}>
                    <td onClick={(event) => event.stopPropagation()} className="p-[16px] border-b border-grey">
                      <Checkbox onChange={() => toggleSelectedRow(node.id)} checked={!!selected[node.id]}/>
                    </td>
                    <td className="px-[16px] border-b border-grey">{node.name}</td>
                    <td className="px-[16px] border-b border-grey">{node.callsMade}</td>
                    <td className="px-[16px] border-b border-grey">{node.emailsSent}</td>
                    <td className="px-[16px] border-b border-grey font-semibold"><span style={{ color: node.stage.color }}>{node.stage.name}</span></td>
                    <td className="px-[16px] border-b border-grey">{node.assignee?.email}</td>
                    <td className="px-[16px] border-b border-grey">{node.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Leads;
