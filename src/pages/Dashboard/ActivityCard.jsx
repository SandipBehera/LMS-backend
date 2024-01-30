import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { H5, H6, LI, P, UL } from "../../AbstractElements";
import { WebApi } from "../../api";

const ActivityCard = ({ ActivityData }) => {
  const [data, setRow] = useState(ActivityData);
  const calculateTimeElapsed = (createdAt) => {
    const currentTime = new Date();
    const dataCreationTime = new Date(createdAt);

    const timeDifference = currentTime - dataCreationTime;
    const secondsElapsed = Math.floor(timeDifference / 1000);
    const minutesElapsed = Math.floor(secondsElapsed / 60);
    const hoursElapsed = Math.floor(minutesElapsed / 60);
    const daysElapsed = Math.floor(hoursElapsed / 24);

    if (daysElapsed > 0) {
      return `${daysElapsed} ${daysElapsed === 1 ? "day" : "days"} ago`;
    } else if (hoursElapsed > 0) {
      return `${hoursElapsed} ${hoursElapsed === 1 ? "hour" : "hours"} ago`;
    } else if (minutesElapsed > 0) {
      return `${minutesElapsed} ${
        minutesElapsed === 1 ? "minute" : "minutes"
      } ago`;
    } else {
      return `${secondsElapsed} ${
        secondsElapsed === 1 ? "second" : "seconds"
      } ago`;
    }
  };

  return (
    <Col xxl="4" xl="5" md="6" sm="7" className="notification box-col-6">
      <Card className="height-equal">
        <CardHeader className="card-no-border">
          <div className="header-top">
            <H5 attrH5={{ className: "m-0" }}></H5>
            <div className="card-header-right-icon"></div>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <UL>
            {data.length > 0 ? (
              data.map((item, i) => (
                <LI key={i} attrLI={{ className: "d-flex" }}>
                  <div className={"activity-dot-primary"} />
                  <div className="w-100 ms-3">
                    <P
                      attrPara={{
                        className: "d-flex justify-content-between mb-2",
                      }}
                    >
                      <span className="date-content light-background">
                        {`${new Date(item.created_at)}`.slice(4, 15)}
                      </span>
                      <span>{calculateTimeElapsed(item.created_at)}</span>
                    </P>
                    <H6>
                      {item.issue_type}
                      <span className="dot-notification" />
                    </H6>

                    <p className="f-light">{item.details?.reason}</p>
                    <p className="f-light">{item.details[0]?.content}</p>
                  </div>
                </LI>
              ))
            ) : (
              <p>No Complaint/Request Yet</p>
            )}
          </UL>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActivityCard;
