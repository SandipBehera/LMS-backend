import React, { Fragment } from "react";
import { Breadcrumbs, P } from "../../../../AbstractElements";
import { useLocation} from "react-router-dom";
import { Button, Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { FaRegArrowAltCircleRight } from "react-icons/fa";


export default function BookInventory() {
  const location = useLocation();
  const { bookDetails } = location.state || {};
  console.log(location.state);
//   console.log(bookDetails)


    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
      };
    
  return (
    <Fragment>
      <Breadcrumbs
        parent="Add Book Inventory"
        mainTitle="Add Inventory"
        title="Add Book Inventory"
      />
      <Card className="p-4">
        <div className="d-flex justify-content-around mx-4">
            <div className="text-center" >
            <span className="font-size font-weight-bold text-center" style={{fontWeight:"bold"}}>Book Title:</span> {"  "}<span>{bookDetails.bookTitle}</span>

            </div>
            <div className="text-center">
            <span className="font-size font-weight-bold" style={{fontWeight:"bold"}}>Material Type:</span> {"  "}<span>{bookDetails.category}</span>
            </div>
        </div>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Row className="p-2">
                <Col md={6}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Vendor
                  </Label>
                  <Controller
                    name="vendor"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <select {...field} className="form-control">
                          <option value="">Select Vendor</option>
                          <option value="Vendor1">Vendor 1</option>
                          <option value="vendor2">Vendor 2</option>
                        </select>
                      </>
                    )}
                  />
                  {errors.vendor?.type === "required" && (
                    <p className="text-danger">Book location is required</p>
                  )}
                </Col>

                <Col md={6}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Total Units
                  </Label>
                  <Controller
                    name="totalUnits"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 20,
                      pattern: /^[0-9. ]+$/i,
                    }}
                    render={({ field }) => (
                      <>
                        <input {...field} className="form-control"  maxLength={20}/>
                      </>
                    )}
                  />
                  {errors.totalUnits?.type === "required" && (
                    <p className="text-danger">Book total units is required</p>
                  )}
                  {errors.totalUnits?.type === "maxLength" && (
                    <p className="text-danger">
                      Book totalUnits should be maximum 20 characters
                    </p>
                  )}
                  {errors.totalUnits?.type === "pattern" && (
                    <p className="text-danger">Numbers only</p>
                  )}
                </Col>
              </Row>
              <Row className="p-2">
              <Col md={6}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Item Code
                  </Label>
                  <Controller
                    name="itemCode"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 20,
                      pattern: /^[0-9. ]+$/i,
                    }}
                    render={({ field }) => (
                      <>
                        <input {...field} className="form-control"  maxLength={20}/>
                      </>
                    )}
                  />
                  {errors.itemCode?.type === "required" && (
                    <p className="text-danger">Item code is required</p>
                  )}
                  {errors.itemCode?.type === "maxLength" && (
                    <p className="text-danger">
                       Item code should be maximum 20 characters
                    </p>
                  )}
                  {errors.itemCode?.type === "pattern" && (
                    <p className="text-danger">Numbers only</p>
                  )}
                </Col>
              </Row>

              </FormGroup>
              <div className="d-flex justify-content-end"
>
              <Button
              type="submit"
              color="white"
            >
            <FaRegArrowAltCircleRight style={{fontSize:"3rem"}}/>

            </Button>

              </div>
             

              </form>
              </CardBody>

      </Card>
    </Fragment>
  );
}
