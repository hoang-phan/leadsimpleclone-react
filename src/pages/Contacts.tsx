import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useGetContacts } from '../services/apiQueries';
import { IContact } from '../services/types'

function Contacts() {
  const { data, loading, error } = useGetContacts();
  const [selected, setSelected] = useState<Record<string, any>>({});
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [contacts, setContacts] = useState<{node: IContact}[]>([]);

  useEffect(() => {
    if (data?.contacts?.edges) {
      setContacts(data.contacts.edges);
    }
  }, [data])

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
    const newSelected : Record<string, any> = {};
    contacts.forEach(({ node }: { node: IContact }) => {
      newSelected[node.id] = !selectedAll;
    });
    setSelected(newSelected);
    setSelectedAll(!selectedAll);
  }

  const allSelected = (result: Record<string, any>) => (
    contacts.every(({ node }: { node: IContact }) => result[node.id])
  );

  return (
    <div className="flex flex-col">
      <div className="h-[72px] flex items-center border-b-2 border-grey w-full">
        <h1 className="text-2xl font-medium px-[24px]">Contacts</h1>
      </div>
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
            <tbody className="text-base">
              {contacts.map(({node}: {node: IContact}) => (
                <tr key={node.id}>
                  <td className="p-[16px] border-b border-grey">
                    <Checkbox onChange={() => toggleSelectedRow(node.id)} checked={!!selected[node.id]}/>
                  </td>
                  <td className="px-[16px] py-[12px] border-b border-grey">{node.firstName}</td>
                  <td className="px-[16px] py-[12px] border-b border-grey">{node.lastName}</td>
                  <td className="px-[16px] py-[12px] border-b border-grey">{node.companyName}</td>
                  <td className="px-[16px] py-[12px] border-b border-grey">{node.phones[0]?.value}</td>
                  <td className="px-[16px] py-[12px] border-b border-grey">{node.emails[0]?.value}</td>
                  <td className="px-[16px] py-[12px] border-b border-grey">{node.source.name}</td>
                  <td className="px-[16px] py-[12px] border-b border-grey">{node.createdAt}</td>
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
