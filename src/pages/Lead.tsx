import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tooltip, Checkbox, IconButton, Button, Select, MenuItem, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { SAVE_LEAD_QUERY, GET_LEADS_QUERY, GET_LEAD_QUERY, DELETE_LEAD_QUERY, GET_USERS_QUERY, GET_STAGES_QUERY } from '../services/apiQueries';
import LeadFormModal from '../components/LeadFormModal';
import { ILead, IStage } from '../services/types';
import ConfirmDialog from '../components/ConfirmDialog';

function Lead() {
  const { id } = useParams();
  const { data, refetch } = useQuery(GET_LEAD_QUERY);
  const [saveLeadFunc] = useMutation(SAVE_LEAD_QUERY);
  const usersData = useQuery(GET_USERS_QUERY).data;
  const stagesData = useQuery(GET_STAGES_QUERY).data;
  const client = useApolloClient();

  useEffect(() => {
    refetch({ id });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const saveLead = (value: string) => {
    saveLeadFunc({
      variables: { id, stageId: value },
      onCompleted: () => {
        client.refetchQueries({ include: [GET_LEAD_QUERY, GET_LEADS_QUERY] });
      }
    })
  }

  const { name, assignee, contacts, stage } = data.lead;

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center h-[72px]">
        <IconButton component={Link} to="/leads">
          <ArrowBackIcon />
        </IconButton>
        <Button className="flex flex-start group !text-[grey]">
          <span className="text-2xl normal-case">{name}</span>
          <EditIcon className="!hidden group-hover:!block" />
        </Button>
      </div>
      <div className="flex flex-col m-2">
        <div className="flex w-full">
          <Select
            value={stage.id}
            onChange={({ target }) => saveLead(target.value)}
            variant="standard"
            className="mb-2 before:!hidden after:!hidden"
            sx={{ "& .MuiSvgIcon-root": { color: stage.color } }}
            renderValue={(val) => {
              const stage = stagesData.stages.find((stage: IStage) => stage.id === val);
              return <div className="text-xl font-semibold" style={{color: stage?.color}}>Stage: {stage?.name}</div>;
            }}
          >
            {stagesData && stagesData.stages.map((stage: IStage) => (
              <MenuItem key={stage.id} value={stage.id} style={{color: stage.color}}>{stage.name}</MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex">
          {stagesData && stagesData.stages.map((node: IStage) => (
            <Tooltip key={node.id} title={node.name}>
              <div
                className={`w-[25px] h-[25px] opacity-[0.7] hover:opacity-[1] mr-2 mb-2 flex items-center justify-center`}
                style={{backgroundColor: node.color}}
                onClick={() => saveLead(node.id)}
              >
                {node.id === stage.id && <CheckIcon className="text-white" />}
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lead;
