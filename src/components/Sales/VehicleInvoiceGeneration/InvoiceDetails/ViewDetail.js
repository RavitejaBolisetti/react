/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Collapse, Descriptions, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, otfFormData, isLoading } = props;
    const [activeKey, setactiveKey] = useState([]);
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
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                        <Panel header="OTF Details" key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Booking Number">{checkAndSetDefaultValue(otfFormData?.bookingNumber || otfFormData?.otfNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="OTF Date">{checkAndSetDefaultValue(otfFormData?.otfDate, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="DAR Number">{checkAndSetDefaultValue(otfFormData?.darNumber, isLoading)}</Descriptions.Item>
                                {/* key darNumber */}
                                <Descriptions.Item label="Sales Type">{checkAndSetDefaultValue(otfFormData?.saleType, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Price Type">{checkAndSetDefaultValue(otfFormData?.priceType, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Tax Calculation">{checkAndSetDefaultValue(otfFormData?.taxCalculationType, isLoading)}</Descriptions.Item>

                                <Descriptions.Item label="Tax Payable On Reverse Charges?">{checkAndSetDefaultValue(otfFormData?.taxPayableOnReverseCharges, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Sales Consultant Name">{checkAndSetDefaultValue(otfFormData?.saleConsultant, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Influence/Mitra Type">{checkAndSetDefaultValue(otfFormData?.mitraType, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Influence/Mitra Name">{checkAndSetDefaultValue(otfFormData?.mitraName, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                        <Panel header="Booked Customer" key="2">
                            <Divider />
                            <Descriptions {...viewProps}></Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                        <Panel header="Billing Customer" key="3">
                            <Divider />
                            <Descriptions {...viewProps}></Descriptions>
                        </Panel>
                    </Collapse> */}
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
