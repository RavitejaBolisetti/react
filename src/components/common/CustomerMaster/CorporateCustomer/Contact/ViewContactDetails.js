/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Row, Col, Button } from 'antd';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

const ViewDetailBase = ({ formData, styles, isLoading, typeData }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    const editContactHandeler = (data) => {};

    return (
        <div className={styles.viewDrawerContainer}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Purpose of Contact">{checkAndSetDefaultValue(getCodeValue(typeData?.PURPOSE, formData?.purposeOfContact), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.contactMobileNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Alternate Mobile Numbe">{checkAndSetDefaultValue(formData?.alternativeMobileNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Relation">{checkAndSetDefaultValue(getCodeValue(typeData?.FAMLY_RELTN, formData?.relationwithCustomer), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{checkAndSetDefaultValue(getCodeValue(typeData?.GENDER_CD, formData?.gender), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Title">{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, formData?.contactNameTitle), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="First Name">{checkAndSetDefaultValue(formData?.contactNameFirstName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Middle Name">{checkAndSetDefaultValue(formData?.contactNameMiddleName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Last/Surname">{checkAndSetDefaultValue(formData?.contactNameLastName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="E-mail">{checkAndSetDefaultValue(formData?.contactEmail, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Alternate Email ID">{checkAndSetDefaultValue(formData?.alternativeEmail, isLoading)}</Descriptions.Item>

                    <Descriptions.Item label="Facebook Link">{checkAndSetDefaultValue(formData?.facebook, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Twitter Link">{checkAndSetDefaultValue(formData?.twitter, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Instagram Link">{checkAndSetDefaultValue(formData?.instagram, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Youtube Channel">{checkAndSetDefaultValue(formData?.youtube, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Team BHP Link">{checkAndSetDefaultValue(formData?.teamBhp, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Mark As Default">{checkAndSetDefaultValue(formData?.defaultaddress ? 'Yes' : 'No', isLoading)}</Descriptions.Item>
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
