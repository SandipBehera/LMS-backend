import React, { Fragment, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Breadcrumbs } from '../../../../AbstractElements';
 
export default function CopyList (){
  const [data, setData] = useState([
    {
      id: 1,
      BookCategory: "Bb scheme",
      BookTitle: "Wings of fire",
      AccessionNo: "bb1",
      AccessionDate: "12-1-2023",
      Print: "paul ",
      DamagedStatus: false, // Initially not damaged
    },
    {
      id: 2,
      BookCategory: "Bb scheme",
      BookTitle: "Wings of fire",
      AccessionNo: "bb1",
      AccessionDate: "12-1-2023",
      Print: "paul ",
      DamagedStatus: true, // Initially damaged
    },
    {
      id: 3,
      BookCategory: "Bb scheme",
      BookTitle: "Wings of fire",
      AccessionNo: "bb1",
      AccessionDate: "12-1-2023",
      Print: "paul ",
      DamagedStatus: false, // Initially not damaged
    },
  ]);
 
  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Book Category",
      selector: (row) => row.BookCategory,
    },
    {
      name: "Book Title",
      selector: (row) => row.BookTitle,
    },
    {
      name: "Accession No",
      selector: (row) => row.AccessionNo,
    },
    {
      name: "Accession Date",
      selector: (row) => row.AccessionDate,
    },
    {
      name: "Print",
      selector: (row) => row.Print,
    },
    {
      name: "Damaged Status",
      cell: (row) => (
        <>
          <input
          type="checkbox"
          checked={row.DamagedStatus}
          onChange={() => handleDamagedStatusChange(row.id)}
        />
        <span className="ml-2">Mark as Damaged</span>
        </>
     
      ),
    },
  ];
 
  const handleDamagedStatusChange = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, DamagedStatus: !item.DamagedStatus } : item
      )
    );
  };
 
  return (
    <Fragment>
      <Breadcrumbs
        parent="Book Management"
        mainTitle="Copy List"
        subParent="Copy List"
        title="Copy List"
      />
      <DataTable columns={columns} data={data} pagination/>
    </Fragment>
  );
};
 
