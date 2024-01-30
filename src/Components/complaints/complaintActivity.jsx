import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { H5, H6, LI, P, UL } from "../../AbstractElements";

const ComplaintActivity = ({ complaint, displayTtile }) => {
  console.log(complaint)
  const title = displayTtile || false;
  return (
    <Col xxl="12" xl="12" md="12" sm="7" className="notification box-col-6">
      <Card className="height-equal">
        <CardHeader className="card-no-border">
          {title && (
            <div className="header-top">
              <H5 attrH5={{ className: "m-0" }}>Complaint Description</H5>
            </div>
          )}
        </CardHeader>
        <CardBody className="pt-0">
          <UL>
            {complaint?.details.map((item, i) => (
              <LI key={i} attrLI={{ className: "d-flex" }}>
                <div className={`activity-dot-${item.color}`} />
                <div className="w-100 ms-3">
                  <p className="f-light">{item.status}</p>
                  <P
                    attrPara={{
                      className: "d-flex justify-content-between mb-2",
                    }}
                  >
                    <span className="date-content light-background">
                      {item.date}
                    </span>
                  </P>
                  <H6>
                    {item.content}
                    <span className="dot-notification" />
                  </H6>
                </div>
              </LI>
            ))}
          </UL>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ComplaintActivity;