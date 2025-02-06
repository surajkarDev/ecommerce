import React from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageHeader = ({ heading, link, linkName }) => {
    return (
        <Container className="my-4">
            <Row>
                <Col lg="12">
                    <div className="pageheadermain p-5 rounded-4 my-4">
                        <h1>{heading}</h1>
                        <Breadcrumb className="mt-3">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to={link}>{linkName}</Link>
                            </li>
                        </Breadcrumb>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PageHeader;
