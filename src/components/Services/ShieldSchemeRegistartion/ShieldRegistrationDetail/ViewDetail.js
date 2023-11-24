/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Card, Descriptions, Divider, Button, Collapse, Typography, Popover } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { expandIcon } from 'utils/accordianExpandIcon';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { SHIELD_REPORT_DOCUMENT_TYPE } from '../utils/shieldReportDocumentType';
import { RSA_DOCUMENT_TYPE } from '../utils/rsaReportType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, saleTypes, employeeData, managerData, handlePrintDownload, isLoading, rsaDetails, detailShieldData } = props;

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
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                <Panel header={translateContent('shieldSchemeRegistration.heading.registrationInformation')} key="1">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.saleType')}>{checkAndSetDefaultValue(getCodeValue(saleTypes, formData?.registrationInformation?.saleType, isLoading))}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.bookingNo')}>{checkAndSetDefaultValue(formData?.registrationInformation?.otf, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.employeeName')}>{checkAndSetDefaultValue(getCodeValue(employeeData, formData?.registrationInformation?.employeeName), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.managerName')}>{checkAndSetDefaultValue(getCodeValue(managerData, formData?.registrationInformation?.managerName), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.creditNoteNumber')}>{checkAndSetDefaultValue(formData?.registrationInformation?.creditNoteNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.creditNoteDate')}>{checkAndSetDefaultValue(formData?.registrationInformation?.creditNoteDate ? convertDateMonthYear(formData?.registrationInformation?.creditNoteDate) : '', isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.creditNoteAmount')}>{checkAndSetDefaultValue(formData?.registrationInformation?.creditNoteAmount, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.debitNoteNumber')}>{checkAndSetDefaultValue(formData?.registrationInformation?.debitNoteNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.debitNoteDate')}>{checkAndSetDefaultValue(formData?.registrationInformation?.debitNoteDate, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.debitNoteAmount')}>{checkAndSetDefaultValue(formData?.registrationInformation?.debitNoteAmount, isLoading)}</Descriptions.Item>
                    </Descriptions>
                    {/* {formData?.registrationInformation?.shieldIncentiveClaim && ( */}
                    <Card>
                        <Row>
                            <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                <Text strong>
                                    {props?.screenType === 'RSA' ? 'RSA Incentive Claim' : translateContent('shieldSchemeRegistration.label.schemeIncentiveClaim')}:{checkAndSetDefaultValue(formData?.registrationInformation?.shieldIncentiveClaim, isLoading)}
                                </Text>
                            </Col>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                <div className={styles.floatRight}>
                                    <Popover content={'Coming Soon'} trigger="hover">
                                        <Button danger>{translateContent('global.buttons.print/download')}</Button>
                                    </Popover>
                                </div>
                            </Col>
                        </Row>
                        <Row className={styles.marB10}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Text type="secondary">
                                    {translateContent('shieldSchemeRegistration.label.invoiceDate')}:{checkAndSetDefaultValue(convertDateMonthYear(formData?.registrationInformation?.invoiceDate), isLoading)}
                                </Text>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Text type="secondary">
                                    {translateContent('shieldSchemeRegistration.label.irnNo')}: {checkAndSetDefaultValue(formData?.registrationInformation?.irnNumber, isLoading)}
                                </Text>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Text type="secondary">
                                    {translateContent('shieldSchemeRegistration.label.irnStatus')}: {checkAndSetDefaultValue(formData?.registrationInformation?.shieldIncentiveClaim, isLoading)}
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                    {/* )}
                    {formData?.registrationInformation?.shieldCertificateNumber && ( */}
                    <Card>
                        <Row>
                            <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                <Text strong>
                                    {props?.screenType === 'RSA' ? 'RSA Certificate Number' : translateContent('shieldSchemeRegistration.label.schemeCertificateNo')} : {checkAndSetDefaultValue(formData?.registrationInformation?.shieldCertificateNumber, isLoading)}
                                </Text>
                            </Col>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                <div className={styles.floatRight}>
                                    <Button onClick={() => handlePrintDownload(props?.screenType === 'RSA' ? { ...rsaDetails, typeRecord: RSA_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_RSA?.value } : { ...detailShieldData, typeRecord: SHIELD_REPORT_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_SHIELD?.value })} danger>
                                        {translateContent('global.buttons.print/download')}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className={styles.marB10}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Text type="secondary">
                                    {translateContent('shieldSchemeRegistration.label.invoiceDate')}: {checkAndSetDefaultValue(convertDateMonthYear(formData?.registrationInformation?.invoiceDate), isLoading)}
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                    {/* )}
                    {formData?.registrationInformation?.invoiceNumber && ( */}
                    <Card>
                        <Row>
                            <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                <Text strong>
                                    {translateContent('shieldSchemeRegistration.label.invoiceNo')}:{checkAndSetDefaultValue(formData?.registrationInformation?.invoiceNumber, isLoading)}
                                </Text>
                            </Col>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                <div className={styles.floatRight}>
                                    <Button onClick={() => handlePrintDownload(props?.screenType === 'RSA' ? { ...rsaDetails, typeRecord: RSA_DOCUMENT_TYPE?.INVOICE_RSA?.value } : { ...detailShieldData, typeRecord: SHIELD_REPORT_DOCUMENT_TYPE?.INVOICE_SHIELD?.value })} danger>
                                        {translateContent('global.buttons.print/download')}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className={styles.marB10}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Text type="secondary">
                                    {translateContent('shieldSchemeRegistration.label.invoiceDate')}: {checkAndSetDefaultValue(convertDateMonthYear(formData?.registrationInformation?.invoiceDate), isLoading)}
                                </Text>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Text type="secondary">
                                    {translateContent('shieldSchemeRegistration.label.irnNo')}: {checkAndSetDefaultValue(formData?.registrationInformation?.irnNumber, isLoading)}
                                </Text>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Text type="secondary">
                                    {translateContent('shieldSchemeRegistration.label.irnStatus')}: {checkAndSetDefaultValue(formData?.registrationInformation?.shieldIncentiveClaim, isLoading)}
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                    {/* )} */}
                </Panel>
            </Collapse>
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" collapsible="icon">
                <Panel header={translateContent('shieldSchemeRegistration.heading.schemeDetails')} key="2">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.schemeDescription')}>{checkAndSetDefaultValue(formData?.schemeDetails?.schemeDescription, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.schemeCode')}>{checkAndSetDefaultValue(formData?.schemeDetails?.schemeCode, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.schemeBasicAmount')}>{checkAndSetDefaultValue(formData?.schemeDetails?.schemeBasicAmount, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.schemeDiscount')}>{checkAndSetDefaultValue(formData?.schemeDetails?.schemeDiscount, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.schemeTaxAmount')}>{checkAndSetDefaultValue(formData?.schemeDetails?.schemeTaxAmount, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.schemeStartDate')}>{checkAndSetDefaultValue(convertDateMonthYear(formData?.schemeDetails?.schemeStartDate), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.schemeEndDate')}>{checkAndSetDefaultValue(convertDateMonthYear(formData?.schemeDetails?.schemeEndDate), isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
