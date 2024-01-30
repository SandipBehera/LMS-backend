import React, { Component, Fragment } from "react";
import { Button, Col, Container, Media } from "reactstrap";
import { H2, P } from "../../AbstractElements";
import { Link } from "react-router-dom";
import sad from "../../assets/images/other-images/sad.png";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Update state with error information
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Fragment>
          <div className="page-wrapper">
            <div className="error-wrapper">
              <Container>
                <Media
                  body
                  className="img-100"
                  src={sad}
                  alt=""
                  style={{ borderRadius: "50px", backgroundColor: "orangered" }}
                />
                <div className="error-heading"></div>
                <Col md="8 offset-md-2">
                  <P
                    attrPara={{
                      className: "error-heading",
                      style: { color: "blue" },
                    }}
                  >
                    {
                      "The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved."
                    }
                  </P>
                  <p className="sub-heading">
                    Please Contact to &nbsp;
                    <a
                      href="mailto:hello@clumpssoftware.com"
                      style={{ color: "blue" }}
                    >
                      hello@clumpssoftware.com
                    </a>
                    &nbsp; for More Information.
                  </p>
                </Col>
              </Container>
            </div>
          </div>
        </Fragment>
      );
    }

    return this.props.children; // Render children components normally
  }
}

export default ErrorBoundary;
