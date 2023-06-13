import React from 'react';
import { Descriptions, Row, Col, Button } from 'antd';

const ViewDetailBase = ({ formData, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    const editContactHandeler = (data) => {
        console.log('formData',formData)
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Purpose of Contact">{formData?.purposeOfContact}</Descriptions.Item>
                    <Descriptions.Item label="Mobile Number">{formData?.contactMobileNumber}</Descriptions.Item>
                    <Descriptions.Item label="Alternate Mobile Numbe">{formData?.alternativeMobileNumber}</Descriptions.Item>
                    <Descriptions.Item label="Relation">{formData?.relationwithCustomer}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{formData?.gender}</Descriptions.Item>
                    <Descriptions.Item label="Title">{formData?.contactNameTitle}</Descriptions.Item>
                    <Descriptions.Item label="First Name">{formData?.contactNameFirstName}</Descriptions.Item>
                    <Descriptions.Item label="Middle Name">{formData?.contactNameMiddleName}</Descriptions.Item>
                    <Descriptions.Item label="Last/Surname">{formData?.contactNameLastName}</Descriptions.Item>
                    <Descriptions.Item label="E-mail">{formData?.contactEmail}</Descriptions.Item>
                    <Descriptions.Item label="Alternate Email ID">{formData?.alternativeEmail}</Descriptions.Item>

                    <Descriptions.Item label="Facebook Link">{formData?.facebook}</Descriptions.Item>
                    <Descriptions.Item label="Twitter Link">{formData?.twitter}</Descriptions.Item>
                    <Descriptions.Item label="Instagram Link">{formData?.instagram}</Descriptions.Item>
                    <Descriptions.Item label="Youtube Channel">{formData?.youtube}</Descriptions.Item>
                    <Descriptions.Item label="Team BHP Link">{formData?.teamBhp}</Descriptions.Item>
                    <Descriptions.Item label="Mark As Default">{formData?.defaultaddress ? 'Yes' : 'No'}</Descriptions.Item>
                </Descriptions>
                <Row justify="left">
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                        <Button type="primary" onClick={() => editContactHandeler(formData)}>Edit</Button>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                        <Button>Delete</Button>
                    </Col>
                </Row>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
