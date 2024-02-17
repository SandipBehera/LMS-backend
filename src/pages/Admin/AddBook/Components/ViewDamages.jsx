import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs } from "../../../../AbstractElements";

export default function ViewDamage() {
  const [data, setData] = useState([
    {
      id: 1,
      TotalQuantity: "10",
      DamagedQuantity: "6",
      AvailabeQuantity: "4",
      DanmagedBy: "paul ",
      DamagedOn: "1-1-2023 ",
      AuthorisedPerson: "xyz",
    },
    {
      id: 2,
      TotalQuantity: "10",
      DamagedQuantity: "6",
      AvailabeQuantity: "4",
      DanmagedBy: "paul ",
      DamagedOn: "1-1-2023 ",
      AuthorisedPerson: "xyz",
    },
    {
      id: 3,
      TotalQuantity: "10",
      DamagedQuantity: "6",
      AvailabeQuantity: "4",
      DanmagedBy: "paul ",
      DamagedOn: "1-1-2023 ",
      AuthorisedPerson: "xyz",
    },
  ]);
  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Total Quantity",
      selector: (row) => row.TotalQuantity,
    },
    {
      name: "Damaged Quantity",
      selector: (row) => row.DamagedQuantity,
    },
    {
      name: "Availabe Quantity",
      selector: (row) => row.AvailabeQuantity,
    },
    {
      name: "Danmaged By",
      selector: (row) => row.DanmagedBy,
    },
    {
      name: "Damaged On",
      selector: (row) => row.DamagedOn,
    },
    {
      name: "Authorised Person",
      selector: (row) => row.AuthorisedPerson,
    },
  ];
  return (
    <Fragment>
      <Breadcrumbs
        parent="Book Management"
        mainTitle="View Damages"
        subParent="View Damages"
        title="View Damages"
      />
      <div className="mb-3 d-flex justify-content-around">
        <h6>Material Type: Non text</h6>
        <h6>Sub Material Type: CD/DVD</h6>
        <h6>Title: Wings of fire</h6>
      </div>
      <DataTable columns={columns} data={data} pagination/>
    </Fragment>
  );
}
