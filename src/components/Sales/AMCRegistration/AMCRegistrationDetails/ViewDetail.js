/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Collapse, Descriptions, Divider, Typography, Card, Button, Popover } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { translateContent } from 'utils/translateContent';
import { getCodeValue } from 'utils/getCodeValue';

import styles from 'assets/sass/app.module.scss';
import { DATA_TYPE } from 'constants/dataType';
import { PARAM_MASTER } from 'constants/paramMaster';
import { AMC_REPORT_DOCUMENT_TYPE } from '../utils/amcReportDocumentType';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, isLoading, employeeData, managerData, typeData, handlePrintDownload, selectedAMC, handleDownloadFile } = props;
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
                                <Descriptions.Item label={translateContent('amcRegistration.label.saleType')}>{checkAndSetDefaultValue(getCodeValue(typeData['SALE_TYPE'], formData?.amcRegistration?.saleType), isLoading)}</Descriptions.Item>
                                {formData?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key && (
                                    <>
                                        <Descriptions.Item label={translateContent('amcRegistration.label.bookingNumber')}>{checkAndSetDefaultValue(formData?.amcRegistration?.bookingNumber, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('amcRegistration.label.vin')}>{checkAndSetDefaultValue(formData?.amcRegistration?.vin, isLoading)}</Descriptions.Item>
                                    </>
                                )}
                                <Descriptions.Item label={translateContent('amcRegistration.label.employeeName')}>{checkAndSetDefaultValue(getCodeValue(employeeData, formData?.amcRegistration?.employeeCode), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.managerName')}>{checkAndSetDefaultValue(getCodeValue(managerData, formData?.amcRegistration?.managerCode), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('amcRegistration.label.remarks')}>{checkAndSetDefaultValue(formData?.amcRegistration?.remarks, isLoading)}</Descriptions.Item>
                            </Descriptions>
                            {selectedAMC?.status === AMC_CONSTANTS?.CANCELLED?.key && (
                                <>
                                    <Divider />
                                    <Descriptions {...viewProps}>
                                        <Descriptions.Item label={translateContent('amcRegistration.label.creditNoteNumber')}>{checkAndSetDefaultValue(formData?.amcRegistration?.creditNoteNumber, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('amcRegistration.label.creditNoteDate')}>{checkAndSetDefaultValue(formData?.amcRegistration?.creditNoteDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('amcRegistration.label.creditNoteAmount')}>{checkAndSetDefaultValue(formData?.amcRegistration?.creditNoteAmount, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('amcRegistration.label.debitNoteNumber')}>{checkAndSetDefaultValue(formData?.amcRegistration?.debitNoteNumber, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('amcRegistration.label.debitNoteDate')}>{checkAndSetDefaultValue(formData?.amcRegistration?.debitNoteDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('amcRegistration.label.debitNoteAmount')}>{checkAndSetDefaultValue(formData?.amcRegistration?.debitNoteAmount, isLoading)}</Descriptions.Item>
                                    </Descriptions>
                                </>
                            )}
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" className={styles.drawerGap}>
                        <Panel header={translateContent('amcRegistration.label.schemeDetails')} key="2">
                            <Divider />
                            <>
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label={translateContent('amcRegistration.label.amcType')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.amcType, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('amcRegistration.label.schemeDescription')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeDescription, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('amcRegistration.label.schemeCode')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeCode, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('amcRegistration.label.schemeBasicAmount')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeBasicAmount, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('amcRegistration.label.schemeDiscount')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeDiscount, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('amcRegistration.label.schemeTaxAmount')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeTaxAmount, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('amcRegistration.label.schemeEndDate')}>{checkAndSetDefaultValue(formData?.amcSchemeDetails?.schemeEndDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                </Descriptions>
                                {formData?.amcRegistration?.priceType !== AMC_CONSTANTS?.MNM_FOC?.key && selectedAMC?.status === AMC_CONSTANTS?.APPROVED?.key && (
                                    <>
                                        <Card>
                                            <Row>
                                                <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                                    <Text strong>
                                                        {translateContent('amcRegistration.label.invoiceNumber')}:{checkAndSetDefaultValue(formData?.amcRegistration?.invoiceNumber, isLoading)}
                                                    </Text>
                                                </Col>
                                                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                                    <div className={styles.floatRight}>
                                                        <Popover trigger="hover">
                                                            <Button onClick={() => handleDownloadFile(formData?.amcRegistration?.documentId)} danger>
                                                                {translateContent('global.buttons.print/download')}
                                                            </Button>
                                                        </Popover>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={styles.marB10}>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <Text type="secondary">
                                                        {translateContent('amcRegistration.label.invoiceDate')}: {checkAndSetDefaultValue(formData?.amcRegistration?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key)}
                                                    </Text>
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <Text type="secondary">
                                                        {translateContent('amcRegistration.label.irnNo')}: {checkAndSetDefaultValue(formData?.amcRegistration?.irnNumber, isLoading)}
                                                    </Text>
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <Text type="secondary">
                                                        {translateContent('amcRegistration.label.irnStatus')}: {checkAndSetDefaultValue(formData?.amcRegistration?.irnStatus, isLoading)}
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Card>

                                        <Card>
                                            <Row>
                                                <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                                    <Text strong>
                                                        {translateContent('amcRegistration.label.amcCertificateNo')}:{checkAndSetDefaultValue(formData?.amcRegistration?.amcCertificateNumber, isLoading)}
                                                    </Text>
                                                </Col>
                                                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                                    <div className={styles.floatRight}>
                                                        <Button onClick={() => handlePrintDownload({ ...selectedAMC, typeselectedAMC: AMC_REPORT_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_AMC?.value })} danger>
                                                            {translateContent('global.buttons.print/download')}
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={styles.marB10}>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <Text type="secondary">
                                                        {translateContent('amcRegistration.label.invoiceDate')}: {checkAndSetDefaultValue(formData?.amcRegistration?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key)}
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Card>

                                        <Card>
                                            <Row>
                                                <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                                    <Text strong>
                                                        {translateContent('amcRegistration.label.amcIncenticeClaim')}:{checkAndSetDefaultValue(formData?.amcRegistration?.amcIncentiveClaim, isLoading)}
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
                                                        {translateContent('amcRegistration.label.invoiceDate')}: {checkAndSetDefaultValue(formData?.amcRegistration?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key)}
                                                    </Text>
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <Text type="secondary">
                                                        {translateContent('amcRegistration.label.irnNo')}: {checkAndSetDefaultValue(formData?.amcRegistration?.irnNumber, isLoading)}
                                                    </Text>
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <Text type="secondary">
                                                        {translateContent('amcRegistration.label.irnStatus')}: {checkAndSetDefaultValue(formData?.amcRegistration?.irnStatus, isLoading)}
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </>
                                )}
                            </>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
