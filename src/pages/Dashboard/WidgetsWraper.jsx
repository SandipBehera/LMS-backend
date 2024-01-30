import React from "react";
import { Col, Row } from "reactstrap";
import {
  Widgets2Data,
  Widgets2Data2,
  WidgetsData,
  WidgetsData2,
  WidgetsData3,
  WidgetsData4,
} from "../../Data/DefaultDashboard";
import Widgets1 from "../../Components/Common/CommonWidgets/Widgets1";
import Widgets2 from "../../Components/Common/CommonWidgets/Widgets2";

const WidgetsWrapper = ({ issueTypeCount, healthData }) => {
  console.log(issueTypeCount);
  const Complaint = {
    title: "Complaint",
    gros: 50,
    total: issueTypeCount.compaint || 0,
    color: "secondary",
    icon: "fill-form",
  };
  const NightOutRequest = {
    title: "Night Out Request",
    gros: 50,
    total: issueTypeCount.night_out_request || 0,
    color: "warning",
    icon: "fill-form",
  };
  const MessEntry = {
    title: "Mess Entry",
    total: issueTypeCount.mess_entry || 0,
    color: "purple",
    icon: "fill-calender",
  };
  const HealthConsultancy = {
    title: "Health Issues",
    total: healthData || 0,
    color: "orange",
    icon: "fill-calender",
  };
  const OutingRequest = {
    title: "Outing Request",
    gros: 70,
    total: issueTypeCount.outing_request || 0,
    color: "success",
    icon: "rate",
  };
  const LeaveRequest = {
    title: "Leave Request",
    gros: 70,
    total: issueTypeCount.leave_request || 0,
    color: "success",
    icon: "rate",
  };
  return (
    <>
      <Col xxl="auto" xl="3" sm="6" className="box-col-6">
        <Row>
          <Col xl="12">
            <Widgets1 data={Complaint} />
          </Col>
          <Col xl="12">
            <Widgets1 data={NightOutRequest} />
          </Col>
        </Row>
      </Col>
      <Col xxl="auto" xl="3" sm="6" className="box-col-6">
        <Row>
          <Col xl="12">
            <Widgets1 data={MessEntry} />
          </Col>
          <Col xl="12">
            <Widgets1 data={OutingRequest} />
          </Col>
        </Row>
      </Col>
      <Col xxl="auto" xl="12" sm="6" className="box-col-6">
        <Row>
          <Col xxl="12" xl="6" className="box-col-12">
            <Widgets1 data={LeaveRequest} />
          </Col>
          <Col xxl="12" xl="6" className="box-col-12">
            <Widgets1 data={HealthConsultancy} />
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default WidgetsWrapper;
