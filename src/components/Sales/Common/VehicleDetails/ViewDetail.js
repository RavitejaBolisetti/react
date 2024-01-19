/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Collapse, Descriptions, Divider, Typography, Button } from 'antd';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import { addToolTip } from 'utils/customMenuLink';
import { DataTable } from 'utils/dataTable';
import { expandIcon } from 'utils/accordianExpandIcon';
import { DATA_TYPE } from 'constants/dataType';

import { taxDetailsColumn, optionalServicesColumns } from './tableColumn';
import { getCodeValue } from 'utils/getCodeValue';
import { prepareCaption } from 'utils/prepareCaption';
import { translateContent } from 'utils/translateContent';
import { STATUS } from 'constants/modelVariant';
import { PARAM_MASTER } from 'constants/paramMaster';
import { RevisedModelDetailMaster } from 'components/Sales/OTF/ChangeModelVariant/RevisedModelDetail/RevisedModelDetailMaster';

const { Text } = Typography;
const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { handleOtfSoMappingHistory, typeData, isLoading, formActionType, activeKey, onChange, toolTipContent, styles, formData, showPrintDiscount = false, isOTFModule } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const singleViewProps = {
        ...viewProps,
        column: { xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 },
    };

    const isReviedModelPending = formData?.revisedModel && [STATUS?.PENDING?.key, STATUS?.REJECTED?.key]?.includes(formData?.sapStatusResponseCode);
    const TCSAmountCalculation = getCodeValue(formData?.['taxDetails'], 'TCS', 'taxAmount', true, 'taxType');
    const TCSAmount = TCSAmountCalculation === 'TCS' ? '-' : TCSAmountCalculation;
    return (
        <div className={styles?.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" className={styles?.collapseContainer} collapsible="icon">
                        <Panel
                            header={
                                <Row type="flex" align="middle">
                                    <Text strong> {translateContent('commonModules.label.vehicleDetails.vehicleInformation')}</Text>
                                    <Button onClick={handleOtfSoMappingHistory} type="link">
                                        {translateContent('global.buttons.bookingMappingHistory')}
                                    </Button>
                                </Row>
                            }
                            key="1"
                        >
                            <Divider />
                            <Row gutter={20}>
                                <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                                    <Descriptions {...singleViewProps}>
                                        <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.modelDescription')}>
                                            <div className={styles?.tooltipAlign}>
                                                {checkAndSetDefaultValue(formData?.model, isLoading)}
                                                {formData?.model && checkAndSetDefaultValue(addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle className={styles?.infoIconColor} size={13} />), isLoading)}
                                            </div>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                    <Descriptions {...singleViewProps}>
                                        <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.oemModelCode')}>{checkAndSetDefaultValue(formData?.oemModelCode, isLoading)}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>

                            {isReviedModelPending ? (
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <RevisedModelDetailMaster {...props} />
                                    </Col>
                                </Row>
                            ) : (
                                <Divider />
                            )}
                            <Descriptions {...viewProps}>
                                {isOTFModule && (
                                    <>
                                        <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.availableStock')}>{checkAndSetDefaultValue(formData?.availableStock, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.poNumber')}>{checkAndSetDefaultValue(formData?.poNumber, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.poDate')}>{checkAndSetDefaultValue(formData?.poDate ? formData?.poDate : undefined, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.poStatus')}>{checkAndSetDefaultValue(formData?.poStatus, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.soNumber')}>{checkAndSetDefaultValue(formData?.soNumber, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.soStatus')}>{checkAndSetDefaultValue(formData?.soStatus, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.sapResonseRemarks')}>{checkAndSetDefaultValue(formData?.sapResonseRemarks, isLoading)}</Descriptions.Item>
                                    </>
                                )}

                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.vin')}>{checkAndSetDefaultValue(formData?.vinNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.vehicleUsageType')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER?.VEHCL_TYPE?.id], formData?.vehicleUsageType), isLoading)}</Descriptions.Item>
                            </Descriptions>

                            <Descriptions {...viewProps} title={prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.priceInformation'))}>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.saleType')}>{checkAndSetDefaultValue(getCodeValue(typeData?.SALE_TYPE, formData?.saleType), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.priceType')}>{checkAndSetDefaultValue(getCodeValue(typeData?.PRC_TYP, formData?.priceType), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.vehicleSellingPrice')}>{checkAndSetDefaultValue(formData?.vehicleSellingPrice, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.vehicleAmount')}>{checkAndSetDefaultValue(formData?.vehicleAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.tcsAmount')}>{checkAndSetDefaultValue(TCSAmount, isLoading)}</Descriptions.Item>
                            </Descriptions>

                            <Descriptions {...viewProps} title={prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.benefit'))}>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.dealerDiscountWithTax')}>{checkAndSetDefaultValue(formData?.discountAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.consumerSchemeWithTax')}>{checkAndSetDefaultValue(formData?.consumerSchemeWithTax, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.corporateSchemeWithTax')}>{checkAndSetDefaultValue(formData?.corporateSchemeWithTax, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.mnmNonCashBenefitAmountWithTax')}>{checkAndSetDefaultValue(formData?.mnmNonCashBenefitsWithTAX, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.fameSubsidyAmount')}>{checkAndSetDefaultValue(formData?.fameSubsidyAmount, isLoading)}</Descriptions.Item>
                                {showPrintDiscount && <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.printDiscount')}>{formData?.printDiscount === 'Y' ? translateContent('global.yesNo.yes') : translateContent('global.yesNo.no')}</Descriptions.Item>}
                            </Descriptions>
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" className={styles?.collapseContainer} collapsible="icon">
                        <Panel header={translateContent('vehicleInvoiceGeneration.heading.collapse.taxDetails')} key="2">
                            <Divider />
                            <DataTable tableColumn={taxDetailsColumn()} tableData={formData?.['taxDetails']} pagination={false} />
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end" className={styles?.collapseContainer} collapsible="icon">
                        <Panel header={translateContent('vehicleInvoiceGeneration.heading.collapse.optionalService')} key="3">
                            <Divider />
                            <DataTable tableColumn={optionalServicesColumns({ formActionType })} tableData={formData?.['optionalServices']} pagination={false} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
