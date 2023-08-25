/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Row, Col } from 'antd';
import styles from 'components/common/Common.module.css';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DataTable } from 'utils/dataTable';
import { tableColumnAddEdit } from './tableColumnAddEdit';

const ViewDetailMain = (props) => {
    const { formData, tableData, isLoading, handleButtonClick, typeData, formActionType } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <h2>Dealer List</h2>
                </Col>
            </Row>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Area Office">{checkAndSetDefaultValue(formData?.customerName || formData?.partyName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="State">{checkAndSetDefaultValue(formData?.address, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Pricing City Code">{checkAndSetDefaultValue(formData?.city, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Dealer Name">{checkAndSetDefaultValue(formData?.state, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Dealer Branch">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Dealer Selected for on Road Price">{checkAndSetDefaultValue(formData?.mitraType, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <h2>Model Details</h2>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {/* <Form.Item initialValue={formData?.areaOffice} label="Area Office" name="areaOffice"> */}
                    <DataTable tableColumn={tableColumnAddEdit({ handleButtonClick, typeData, formActionType })} tableData={tableData} pagination={false} />
                    {/* </Form.Item> */}
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
