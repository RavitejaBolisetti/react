/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Collapse, Descriptions, Divider } from 'antd';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import { addToolTip } from 'utils/customMenuLink';
import { DataTable } from 'utils/dataTable';
import { expandIcon } from 'utils/accordianExpandIcon';

import { taxDetailsColumn } from './tableColumn';
import { getCodeValue } from 'utils/getCodeValue';
import { prepareCaption } from 'utils/prepareCaption';
import { translateContent } from 'utils/translateContent';
import { CollapseOnChange } from 'utils/CollapseOnChange';
import { PARAM_MASTER } from 'constants/paramMaster';

const { Panel } = Collapse;
export const ViewDetail = (props) => {
    const { typeData, isLoading, activeKey, toolTipContent, styles, formData, collapseActiveKey, setcollapseActiveKey} = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    return (
        <div className={styles?.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => CollapseOnChange(1, collapseActiveKey, setcollapseActiveKey)} expandIconPosition="end" className={styles?.collapseContainer} collapsible="icon">
                        <Panel header="Vehicle Information" key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.modelDescription')}>
                                    <div className={styles?.tooltipAlign}>
                                        {checkAndSetDefaultValue(formData?.modelDescription, isLoading)}
                                        {formData?.modelDescription && checkAndSetDefaultValue(addToolTip(toolTipContent, 'bottom', '#D3EDFE', styles?.toolTip)(<AiOutlineInfoCircle className={styles?.infoIconColor} size={13} />), isLoading)}
                                    </div>
                                </Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.modelCode')}>{checkAndSetDefaultValue(formData?.modelCode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.vin')}>{checkAndSetDefaultValue(formData?.vinNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.bookingDetails.taxCalculation')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.TAX_CALCLTN_TYPE.id], formData?.taxCalculationType), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.bookingDetails.taxPayableOnReverseCharges')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.RFRL.id], formData?.taxPayableOnReverseCharges), isLoading)}</Descriptions.Item>
                            </Descriptions>

                            <Descriptions {...viewProps} title={prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.priceInformation'))}>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.saleType')}>{checkAndSetDefaultValue(getCodeValue(typeData?.SALE_TYPE, formData?.saleType), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.priceType')}>{checkAndSetDefaultValue(getCodeValue(typeData?.PRC_TYP, formData?.priceType), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.vehicleSellingPrice')}>{checkAndSetDefaultValue(formData?.vehicleSellingPrice, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.vehicleAmount')}>{checkAndSetDefaultValue(formData?.vehicleAmount, isLoading)}</Descriptions.Item>
                            </Descriptions>

                            <Descriptions {...viewProps} title={prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.benefit'))}>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.dealerDiscountWithTax')}>{checkAndSetDefaultValue(formData?.discountAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.totalTaxAmount')}>{checkAndSetDefaultValue(formData?.totalTaxAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.tcsAmount')}>{checkAndSetDefaultValue(formData?.tcsAmount, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => CollapseOnChange(2, collapseActiveKey, setcollapseActiveKey)} expandIconPosition="end" className={styles?.collapseContainer} collapsible="icon">
                        <Panel header="Tax Details" key="2">
                            <Divider />
                            <DataTable tableColumn={taxDetailsColumn()} tableData={formData?.['taxDetails']} pagination={false} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};
