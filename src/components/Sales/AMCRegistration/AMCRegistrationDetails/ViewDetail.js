/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Collapse, Descriptions, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { translateContent } from 'utils/translateContent';
import { getCodeValue } from 'utils/getCodeValue';

import styles from 'assets/sass/app.module.scss';
import { DATA_TYPE } from 'constants/dataType';
import { PARAM_MASTER } from 'constants/paramMaster';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading, selectedSaleType, employeeData, managerData, typeData } = props;
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
                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" className={styles.drawerGap}>
                        <Panel header={translateContent('amcRegistration.label.registrationInfo')} key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('amcRegistration.label.priceType')}>{checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.DLVR_SALE_TYP.id], formData?.amcRegistration?.priceType), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.saleType')}>{checkAndSetDefaultValue(getCodeValue(typeData['SALE_TYP'], formData?.amcRegistration?.saleType), isLoading)}</Descriptions.Item>
                                {selectedSaleType === AMC_CONSTANTS?.MNM_FOC?.key && (
                                    <>
                                        <Descriptions.Item label={translateContent('amcRegistration.label.bookingNumber')}>{checkAndSetDefaultValue(formData?.amcRegistration?.bookingNumber, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('amcRegistration.label.vin')}>{checkAndSetDefaultValue(formData?.amcRegistration?.vin, isLoading)}</Descriptions.Item>
                                    </>
                                )}
                                <Descriptions.Item label={translateContent('amcRegistration.label.employeeName')}>{checkAndSetDefaultValue(getCodeValue(employeeData, formData?.amcRegistration?.employeeCode), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.managerName')}>{checkAndSetDefaultValue(getCodeValue(managerData, formData?.amcRegistration?.managerCode), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.remarks')}>{checkAndSetDefaultValue(formData?.amcRegistration?.remarks, isLoading)}</Descriptions.Item>
                            </Descriptions>
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('amcRegistration.label.creditNoteNumber')}>{checkAndSetDefaultValue(formData?.amcRegistration?.creditNoteNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.creditNoteDate')}>{checkAndSetDefaultValue(formData?.amcRegistration?.creditNoteDate, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.creditNoteAmount')}>{checkAndSetDefaultValue(formData?.amcRegistration?.creditNoteAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.debitNoteNumber')}>{checkAndSetDefaultValue(formData?.amcRegistration?.debitNoteNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.debitNoteDate')}>{checkAndSetDefaultValue(formData?.amcRegistration?.debitNoteDate, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.debitNoteAmount')}>{checkAndSetDefaultValue(formData?.amcRegistration?.debitNoteAmount, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" className={styles.drawerGap}>
                        <Panel header={translateContent('amcRegistration.label.schemeDetails')} key="2">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('amcRegistration.label.amcType')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.amcType, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.schemeDescription')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeDescription, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.schemeCode')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeCode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.schemeBasicAmount')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeBasicAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.schemeDiscount')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeDiscount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.schemeTaxAmount')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeTaxAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.schemeEndDate')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeEndDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
