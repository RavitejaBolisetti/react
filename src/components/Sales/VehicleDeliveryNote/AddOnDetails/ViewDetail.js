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
import { getCodeValue } from 'utils/getCodeValue';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, relationshipManagerData } = props;
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
                        <Panel header="Shield Information" key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Scheme Registration No.">{checkAndSetDefaultValue(formData?.sheildRequest?.schemeRegistrationId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Scheme Description">{checkAndSetDefaultValue(formData?.sheildRequest?.schemeDescription, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Sale Type">{checkAndSetDefaultValue(getCodeValue(typeData?.DLVR_SALE_TYP, formData?.sheildRequest?.saleType, isLoading))}</Descriptions.Item>
                                <Descriptions.Item label="Valid From Date">{checkAndSetDefaultValue(formData?.sheildRequest?.validFrom, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Valid To Date">{checkAndSetDefaultValue(formData?.sheildRequest?.validTo, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Employee Name">{checkAndSetDefaultValue(getCodeValue(relationshipManagerData, formData?.sheildRequest?.employeeCode, isLoading))}</Descriptions.Item>
                                <Descriptions.Item label="Manager">{checkAndSetDefaultValue(formData?.sheildRequest?.manager, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                        <Panel header="RSA" key="2">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Scheme Registration No.">{checkAndSetDefaultValue(formData?.rsaRequest?.schemeRegistrationId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Scheme Description">{checkAndSetDefaultValue(formData?.rsaRequest?.schemeDescription, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Sale Type">{checkAndSetDefaultValue(getCodeValue(typeData?.DLVR_SALE_TYP, formData?.rsaRequest?.saleType, isLoading))}</Descriptions.Item>
                                <Descriptions.Item label="Valid From Date">{checkAndSetDefaultValue(formData?.rsaRequest?.validFrom, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Valid To Date">{checkAndSetDefaultValue(formData?.rsaRequest?.validTo, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Employee Name">{checkAndSetDefaultValue(getCodeValue(relationshipManagerData, formData?.rsaRequest?.employeeCode, isLoading))}</Descriptions.Item>
                                <Descriptions.Item label="Manager">{checkAndSetDefaultValue(formData?.rsaRequest?.manager, isLoading)}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Reason Of Rejection">{checkAndSetDefaultValue(formData?.rsaRequest?.reasonOfRejection, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                        <Panel header="AMC" key="3">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Scheme Type">{checkAndSetDefaultValue(formData?.amcRequest?.schemeType, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Scheme Registration No.">{checkAndSetDefaultValue(formData?.amcRequest?.schemeRegistrationId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Scheme Description">{checkAndSetDefaultValue(formData?.amcRequest?.schemeDescription, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Sale Type">{checkAndSetDefaultValue(getCodeValue(typeData?.DLVR_SALE_TYP, formData?.amcRequest?.saleType, isLoading))}</Descriptions.Item>
                                <Descriptions.Item label="Valid From Date">{checkAndSetDefaultValue(formData?.amcRequest?.validFrom, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Valid To Date">{checkAndSetDefaultValue(formData?.amcRequest?.validTo, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Employee Name">{checkAndSetDefaultValue(getCodeValue(relationshipManagerData, formData?.amcRequest?.employeeCode, isLoading))}</Descriptions.Item>
                                <Descriptions.Item label="Manager">{checkAndSetDefaultValue(formData?.amcRequest?.manager, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
