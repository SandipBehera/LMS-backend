import React, { Fragment, useState } from "react";
import { Button, Card, CardBody, FormGroup, Row, Col, Label } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { Breadcrumbs } from "../../../AbstractElements";
import { Add_Book_Category } from "../../../api_handler/bookcategory";
import { toast } from "react-toastify";

export default function AddBookCategory() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [resetFlag, setResetFlag] = useState(false);
  const userTypes = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");

  const onSubmit = (data) => {
    Add_Book_Category(
      data.category_name,
      data.category_description,
      data.status
    ).then((res) => {
      console.log("first", res);
      if (res.status === "success") {
        toast.success(res.message);
        window.location.replace(`/lms/${userTypes}/${userId}/all-category`);
      } else if (res.status === "error") {
        toast.error(res.message);
      }
    });
  };

  const handleCancel = () => {
    setResetFlag(true);
    setTimeout(() => {
      setResetFlag(false);
      setValue("category_name", "");
      setValue("category_description", "");
      setValue("status", "");
    }, 0);
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Admin"
        mainTitle="Book Category"
        subParent="Add Category"
        title="Add Book Category"
      />
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Row className="p-2">
                <Col md={12}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Book Category
                  </Label>
                  <Controller
                    name="category_name"
                    control={control}
                    rules={{
                      required: true,
                      // maxLength: 20,
                      pattern: /^[A-Za-z. ]+$/i,
                    }}
                    render={({ field }) => (
                      <>
                        <input {...field} className="form-control" />
                      </>
                    )}
                  />
                  {errors.category_name?.type === "required" && (
                    <p className="text-danger">Category name is required</p>
                  )}
                  {errors.category_name?.type === "maxLength" && (
                    <p className="text-danger">
                      Book name cannot exceed 20 characters
                    </p>
                  )}
                  {errors.category_name?.type === "pattern" && (
                    <p className="text-danger">Alphabetical characters only</p>
                  )}
                </Col>
              </Row>

              <Row className="p-2">
                <Col md={12}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Description
                  </Label>
                  <Controller
                    name="category_description"
                    control={control}
                    rules={{
                      required: true,
                      minLength: 100,
                    }}
                    render={({ field }) => (
                      <>
                        <textarea {...field} className="form-control" />
                      </>
                    )}
                  />
                  {errors.category_description?.type === "required" && (
                    <p className="text-danger">Description is required</p>
                  )}
                  {errors.category_description?.type === "minLength" && (
                    <p className="text-danger">
                      Description should be minimum 100 characters
                    </p>
                  )}
                </Col>
              </Row>

              <Row className="p-2">
                <Col md={12}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Status
                  </Label>
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <select {...field} className="form-control">
                          <option value="">Select Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </>
                    )}
                  />
                  {errors.status?.type === "required" && (
                    <p className="text-danger">Status is required</p>
                  )}
                </Col>
              </Row>
            </FormGroup>
            <Button
              type="submit"
              color="success"
              className="mt-2 ml-3 btn-success mr-2"
            >
              Save
            </Button>{" "}
            <Button
              type="button"
              color="danger"
              onClick={handleCancel}
              className="mt-2 ml-3 btn-danger"
            >
              Cancel
            </Button>
          </form>
        </CardBody>
      </Card>
    </Fragment>
  );
}
