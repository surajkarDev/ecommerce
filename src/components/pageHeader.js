import React from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";

const PageHeader = ({ heading, link, linkName }) => {
    return (
        <Container className="my-4">
            <Row>
                <Col lg="12">
                    <div className="pageheadermain p-5 rounded-4 my-4">
                        <h1>{heading}</h1>
                        <Breadcrumb className="mt-3">
                            <Breadcrumb.Item href="ecommerce/home">Home</Breadcrumb.Item>
                            <Breadcrumb.Item href={link}>{linkName}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PageHeader;
