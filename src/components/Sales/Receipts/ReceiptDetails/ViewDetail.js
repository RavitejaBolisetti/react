/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Collapse, Descriptions, Divider } from 'antd';

import { expandIcon } from 'utils/accordianExpandIcon';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { getCodeValue } from 'utils/getCodeValue';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { isLoading, openAccordian, receiptType, styles, handleCollapse, receiptData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse(1)} expandIconPosition="end" className={styles.collapseContainer} collapsible="icon">
                        <Panel header="Receipt Information" key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Actual Receipt Date ">{checkAndSetDefaultValue(receiptData?.receiptDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                <Descriptions.Item label="Receipt Type">{checkAndSetDefaultValue(getCodeValue(receiptType, receiptData?.receiptType), isLoading)}</Descriptions.Item>
                            </Descriptions>
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Total Apportioned Amount">{checkAndSetDefaultValue(receiptData?.totalApportionAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Total Received Amount">{checkAndSetDefaultValue(receiptData?.totalReceivedAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Total Write Off Amount">{checkAndSetDefaultValue(receiptData?.totalWriteOffAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(receiptData?.remarks)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
