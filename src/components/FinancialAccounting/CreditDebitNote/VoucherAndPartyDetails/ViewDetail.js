/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Space, Collapse, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

import styles from 'components/common/Common.module.css';
import { expandIcon } from 'utils/accordianExpandIcon';
import { PARAM_MASTER } from 'constants/paramMaster';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData } = props;
    const [activeKey, setactiveKey] = useState([]);
    const { voucherDetailsDto, partyDetailsDto } = formData;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" className={styles.collapseContainer}>
                            <Panel header="Voucher Details" key="1">
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Total Settled Amount">{checkAndSetDefaultValue(voucherDetailsDto?.totalSettledAmount, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Total Write-Off Amount">{checkAndSetDefaultValue(voucherDetailsDto?.totalWriteOffAmount, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Total Apportioned Amount">{checkAndSetDefaultValue(voucherDetailsDto?.totalApportionedAmount, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Total Amount">{checkAndSetDefaultValue(voucherDetailsDto?.totalAmount, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Total Balanced Amount">{checkAndSetDefaultValue(voucherDetailsDto?.totalBalancedAmount, isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </Panel>
                        </Collapse>
                        <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" className={styles.collapseContainer}>
                            <Panel header="Party Details" key="2">
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Party ID">{getCodeValue(typeData[PARAM_MASTER?.PARTY_CATEG?.id], partyDetailsDto?.partySegment)}</Descriptions.Item>
                                    <Descriptions.Item label="Party ID">{checkAndSetDefaultValue(partyDetailsDto?.partyId, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Party Name">{checkAndSetDefaultValue(partyDetailsDto?.partyName, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Address">{checkAndSetDefaultValue(partyDetailsDto?.address, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="City">{checkAndSetDefaultValue(partyDetailsDto?.city, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="State">{checkAndSetDefaultValue(partyDetailsDto?.state, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Phone No.">{checkAndSetDefaultValue(partyDetailsDto?.mobileNumber, isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
