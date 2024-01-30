import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { H5, UL, LI } from "../../AbstractElements";
import { Earning, Expense, OverallBalanceTitle } from "../../Constant";
import LightCard from "./LitghtCard";
import ReactApexChart from "react-apexcharts";
import { LightCardData } from "../../Data/DefaultDashboard";
import { CurrencyChartData } from "../../Data/DefaultDashboard/Chart";

const OverallBalance = (props) => {
  console.log(props);
  return (
    <Col xxl="12" lg="12" className="box-col-12">
      <Card>
        <CardHeader className="card-no-border">
          <H5>{props.title}</H5>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="m-0 overall-card">
            <Col xl="9" md="12" sm="7" className="p-0">
              <div className="chart-right">
                <Row>
                  <Col xl="12" className="col-xl-12">
                    <CardBody className="p-0">
                      <UL
                        attrUL={{
                          horizontal: true,
                          className: "d-flex balance-data",
                        }}
                      >
                        {props.student_type.map((item, index) => (
                          <LI key={index}>
                            <span className="circle bg-warning"> </span>
                            <span className="f-light ms-1">{item}</span>
                          </LI>
                        ))}
                      </UL>
                      <div className="current-sale-container">
                        <ReactApexChart
                          type="bar"
                          height={300}
                          options={CurrencyChartData.options}
                          series={CurrencyChartData.series}
                        />
                      </div>
                    </CardBody>
                  </Col>
                </Row>
              </div>
            </Col>
            <LightCard LightCardData={LightCardData} />
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default OverallBalance;
