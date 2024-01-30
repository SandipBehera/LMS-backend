import react, { Fragment } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { H5 } from "../../AbstractElements";
import Select from "react-select";
import { Controller } from "react-hook-form";
const DynamicForm = ({
  floor_no,
  room_count,
  register,
  RoomType,
  Ammenities,
  control,
}) => {
  const renderForm = () => {
    const formElements = [];
    const roomDataTypes = RoomType.map((room) => {
      return { value: room, label: room };
    });
    console.log("room dats", roomDataTypes);
    const roomAmenities = Ammenities.map((room) => {
      return { value: room, label: room };
    });
    for (let floor = 1; floor <= floor_no; floor++) {
      const floorField = [];
      for (let room = 1; room <= room_count; room++) {
        const inputName = `floor${floor}_room${room}`;
        const roomCapacity = `floor${floor}_room${room}_capacity`;
        const amenitiesControl = `floor${floor}_room${room}_amenities`;
        const roomTypeControl = `floor${floor}_room${room}_roomType`;

        floorField.push(
          <>
            <Col className="col-md-3" key={floor}>
              <FormGroup className="mb-3">
                <Label htmlFor={inputName}>Room No</Label>
                <input
                  className={`form-control`}
                  id={inputName}
                  type="text"
                  name={inputName}
                  {...register(inputName, {
                    required: true,
                  })}
                />
              </FormGroup>
            </Col>
            <Col className="col-md-3" key={floor}>
              <FormGroup className="mb-3">
                <Label htmlFor={roomCapacity}>Room Capacity</Label>
                <input
                  className={`form-control`}
                  id={roomCapacity}
                  type="text"
                  name={roomCapacity}
                  {...register(roomCapacity, {
                    required: true,
                  })}
                />
              </FormGroup>
            </Col>
            <Col className="col-md-3" key={floor}>
              <FormGroup className="mb-3">
                <Label htmlFor={roomTypeControl}>Room Type</Label>
                <Controller
                  name={roomTypeControl}
                  control={control}
                  defaultValue={[]}
                  {...register(roomTypeControl, {
                    required: true,
                  })}
                  render={({ field }) => (
                    <Select {...field} options={roomDataTypes} isMulti />
                  )}
                />
              </FormGroup>
            </Col>
            <Col className="col-md-3" key={floor}>
              <Label htmlFor={amenitiesControl}>Room Amenities</Label>
              {/* <Select
                className={`form-control`}
                id={amenitiesControl}
                name={amenitiesControl}
                options={roomAmenities}
                {...register(amenitiesControl, {
                  required: true,
                })}
                isMulti
              /> */}
              <Controller
                name={amenitiesControl}
                control={control}
                defaultValue={[]}
                {...register(amenitiesControl, {
                  required: true,
                })}
                render={({ field }) => (
                  <Select {...field} options={roomAmenities} isMulti />
                )}
              />
            </Col>
          </>
        );
      }
      formElements.push(
        <Fragment key={`floor${floor}`}>
          <Row>
            <Col sm="12">
              <H5>{`Floor ${floor}`}</H5>
            </Col>
          </Row>
          <Row>{floorField}</Row>
        </Fragment>
      );
    }
    return formElements;
  };
  return <Fragment>{renderForm()}</Fragment>;
};
export default DynamicForm;
