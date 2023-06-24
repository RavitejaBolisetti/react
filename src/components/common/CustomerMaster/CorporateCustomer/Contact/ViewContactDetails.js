/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Row, Col, Button } from 'antd';
import styles from 'components/common/Common.module.css';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';


const ViewDetailBase = ({ formData, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    const editContactHandeler = (data) => {
        console.log('formData', formData);
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Purpose of Contact">{checkAndSetDefaultValue(formData?.purposeOfContact)}</Descriptions.Item>
                    <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.contactMobileNumber)}</Descriptions.Item>
                    <Descriptions.Item label="Alternate Mobile Numbe">{checkAndSetDefaultValue(formData?.alternativeMobileNumber)}</Descriptions.Item>
                    <Descriptions.Item label="Relation">{checkAndSetDefaultValue(formData?.relationwithCustomer)}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{checkAndSetDefaultValue(formData?.gender)}</Descriptions.Item>
                    <Descriptions.Item label="Title">{checkAndSetDefaultValue(formData?.contactNameTitle)}</Descriptions.Item>
                    <Descriptions.Item label="First Name">{checkAndSetDefaultValue(formData?.contactNameFirstName)}</Descriptions.Item>
                    <Descriptions.Item label="Middle Name">{checkAndSetDefaultValue(formData?.contactNameMiddleName)}</Descriptions.Item>
                    <Descriptions.Item label="Last/Surname">{checkAndSetDefaultValue(formData?.contactNameLastName)}</Descriptions.Item>
                    <Descriptions.Item label="E-mail">{checkAndSetDefaultValue(formData?.contactEmail)}</Descriptions.Item>
                    <Descriptions.Item label="Alternate Email ID">{checkAndSetDefaultValue(formData?.alternativeEmail)}</Descriptions.Item>

                    <Descriptions.Item label="Facebook Link">{checkAndSetDefaultValue(formData?.facebook)}</Descriptions.Item>
                    <Descriptions.Item label="Twitter Link">{checkAndSetDefaultValue(formData?.twitter)}</Descriptions.Item>
                    <Descriptions.Item label="Instagram Link">{checkAndSetDefaultValue(formData?.instagram)}</Descriptions.Item>
                    <Descriptions.Item label="Youtube Channel">{checkAndSetDefaultValue(formData?.youtube)}</Descriptions.Item>
                    <Descriptions.Item label="Team BHP Link">{checkAndSetDefaultValue(formData?.teamBhp)}</Descriptions.Item>
                    <Descriptions.Item label="Mark As Default">{checkAndSetDefaultValue(formData?.defaultaddress ? 'Yes' : 'No')}</Descriptions.Item>
                </Descriptions>
                <Row justify="left">
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                        <Button type="primary" onClick={() => editContactHandeler(formData)}>
                            Edit
                        </Button>
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
