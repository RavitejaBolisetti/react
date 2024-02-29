/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Collapse, Descriptions, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';
import { expandIcon } from 'utils/accordianExpandIcon';
import { prepareCaption } from 'utils/prepareCaption';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, salesConsultantLovData } = props;
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
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" className={styles.drawerGap}>
                        <Panel header='Payment Details' key="1">
                            <Divider />
                            <Descriptions {...viewProps} >
                                <Descriptions.Item label="Payment Number">{checkAndSetDefaultValue(formData?.bookingNumber || formData?.otfNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Payment Date">{checkAndSetDefaultValue(formData?.otfDate ? formData?.otfDate : formData?.orderDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                <Descriptions.Item label="Payment Status">{checkAndSetDefaultValue(getCodeValue(typeData?.TAX_CALCLTN_TYPE, formData?.taxCalculationType), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Payment Mode">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Paid Amount">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="DD/Cheque No.">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="DD/Cheque Date">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Bank Name">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Bank Location">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Total Paid Amount">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Total Write Off Amt.">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Total Apportioned Amount">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Total Balance Amount">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                            </Descriptions>
                            {/* <Descriptions {...viewProps} title={prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.salesDetails'))}>
                                <Descriptions.Item label="Sales Consultant Name">{checkAndSetDefaultValue(getCodeValue(salesConsultantLovData, formData?.saleConsultant), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Influencer/Mitra Type">{checkAndSetDefaultValue(formData?.mitraType, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Influencer/Mitra Name">{checkAndSetDefaultValue(formData?.mitraName, isLoading)}</Descriptions.Item>
                            </Descriptions> */}
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
