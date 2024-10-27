import React, { useCallback, useState } from 'react';

// Example data structure to represent the rows and columns
const tableData = [
  {id:2, category: "Booking Engine", permissions: { Flights: true, Hotels: true, Visa: false, Holidays: true, Bus: false, Trains: true, Cars: false } },
  { id:3,category: "Approval Policy", permissions: { Flights: false, Hotels: true, Visa: false, Holidays: false, Bus: false, Trains: false, Cars: false } },
  { id:4,category: "Travel Policy", permissions: { Flights: true, Hotels: true, Visa: false, Holidays: true, Bus: false, Trains: false, Cars: true } },
  {id:5, category: "Pricing Policy", permissions: { Flights: true, Hotels: false, Visa: false, Holidays: false, Bus: false, Trains: false, Cars: false } },
  { id:6,category: "Reporting Engine", permissions: { Flights: false, Hotels: true, Visa: false, Holidays: true, Bus: false, Trains: false, Cars: true } },
  { id:7,category: "Expense", permissions: { Flights: false, Hotels: true, Visa: false, Holidays: false, Bus: false, Trains: true, Cars: false } },
  { id:8,category: "Org Admin", permissions: { Flights: true, Hotels: false, Visa: true, Holidays: false, Bus: false, Trains: true, Cars: true } },
  { id:9,category: "Finance Module", permissions: { Flights: false, Hotels: true, Visa: false, Holidays: false, Bus: false, Trains: false, Cars: false } },
  { id:10,category: "User Admin", permissions: { Flights: false, Hotels: false, Visa: true, Holidays: false, Bus: true, Trains: false, Cars: false } },
  { id:11,category: "Offer Module", permissions: { Flights: false, Hotels: false, Visa: false, Holidays: false, Bus: false, Trains: true, Cars: false } },
  { id:12,category: "Budget Module", permissions: { Flights: false, Hotels: false, Visa: false, Holidays: false, Bus: true, Trains: false, Cars: false } },
];

 // Table headers
 const columnsData = [
    {id:2,title:"Flights", permissions:true},
    {id:3,title:"Hotels", permissions:true},
    {id:4,title:"Visa", permissions:false},
    {id:5,title:"Holidays", permissions:true},
    {id:6,title:"Bus", permissions:false},
    {id:7,title:"Trains", permissions:false},
    {id:8,title:"Cars", permissions:true},
  ];

// Component to render the table
const DynamicTable = () => {
  const [data, setData] = useState(tableData);
  const [columns, setColumns] = useState(columnsData);

  // Toggle checkbox value
  const togglePermission = useCallback((rowIndex, colName) => {
    console.log('rowIndex', rowIndex)
    console.log('colName', colName)
    const newData = [...data];
    newData[rowIndex].permissions[colName] = !newData[rowIndex].permissions[colName];
    setData(newData);
  },[data]);


  // Toggle checkbox value for columns
  const togglePermissionForColumns = useCallback((colId) => {
    const newData = columns.map((col) => col.id === colId ? { ...col, permissions: !col.permissions } : col);
    setColumns(newData);
  },[columns]);


 

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Some Heading Text</th>
            {columns.map((col) => (
              <th key={col?.id}>{col?.title}<input
              type="checkbox"
              checked={col?.permissions}
              onChange={() => togglePermissionForColumns(col?.id)}
            /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row?.id}>
              <td>{row.category}</td>
              {columns.map((col) => (
                <td key={col?.id}>
                  <input
                    type="checkbox"
                    checked={row.permissions[col?.title]}
                    onChange={() => togglePermission(rowIndex, col?.title)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
