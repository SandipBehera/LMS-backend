import React, { Fragment, useState } from "react";
import { Label, Input, Row, Col, Button, Card } from "reactstrap";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../../../AbstractElements";

export default function AddDamage() {
  const [totalCopies, setTotalCopies] = useState("");
  const [description, setDescription] = useState("");
  const [damagedQty, setDamagedQty] = useState("");
  const userType = localStorage.getItem("userType");
  const branchId = localStorage.getItem("branchId");

  const handleTotalCopiesChange = (e) => {
    setTotalCopies(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleDamagedQty = (e) => {
    setDamagedQty(e.target.value);
  };
  const handleSave = () => {};
  const handleCancel = () => {};

  return (
    <Fragment>
      <Breadcrumbs
        parent="Book Management"
        mainTitle="Add Damages"
        subParent="Add Damages"
        title="Add Damages"
      />
    <Card className="p-3"> 
    <Row className="mx-2">
        <Col md={6} className="mb-2">
          <Label for="totalcopy" style={{fontWeight:"bold"}}>Total Copy</Label>
          <Input
            type="number"
            name="totalcopy"
            id="totalcopy"
            value={totalCopies}
            onChange={handleTotalCopiesChange}
          />

          <Label for="DesCrption" style={{fontWeight:"bold"}}>Description</Label>
          <Input
            type="textarea"
            name="DesCrption"
            id="DesCrption"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Col>
        <div style={{ flex: 1 }}>
          <Label for="Damaged" style={{fontWeight:"bold"}}>Damaged Quantity</Label>
          <Input
            type="number"
            name="Damaged"
            id="Damaged"
            value={damagedQty}
            onChange={handleDamagedQty}
          />
        </div>
      </Row>
      <div className=" text-center mt-3">
        <Link to={`/${userType}/${branchId}/view-damage`}>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </Link>
        <Button color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Card>
    </Fragment>
  );
}
