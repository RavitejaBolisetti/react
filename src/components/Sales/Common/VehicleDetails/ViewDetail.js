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
import { DATA_TYPE } from 'constants/dataType';

import { taxDetailsColumn, optionalServicesColumns } from './tableColumn';
import { getCodeValue } from 'utils/getCodeValue';
import { prepareCaption } from 'utils/prepareCaption';

const { Panel } = Collapse;
const ViewDetailMain = (props) => {
    const { typeData, isLoading, formActionType, activeKey, onChange, toolTipContent, styles, formData, showPrintDiscount = false, isOTFModule } = props;
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
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" className={styles?.collapseContainer} collapsible="icon">
                        <Panel header="Vehicle Information" key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Model Description">
                                    <div className={styles?.tooltipAlign}>
                                        {checkAndSetDefaultValue(formData?.model, isLoading)}
                                        {formData?.model && checkAndSetDefaultValue(addToolTip(toolTipContent, 'bottom', '#D3EDFE', styles.toolTip)(<AiOutlineInfoCircle className={styles?.infoIconColor} size={13} />), isLoading)}
                                    </div>
                                </Descriptions.Item>
                                <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(formData?.modelCode, isLoading)}</Descriptions.Item>
                                {isOTFModule && (
                                    <>
                                        <Descriptions.Item label="Available Stock">{checkAndSetDefaultValue(formData?.availableStock, isLoading)}</Descriptions.Item>

                                        <Descriptions.Item label="PO Number">{checkAndSetDefaultValue(formData?.poNumber, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="PO Date">{checkAndSetDefaultValue(formData?.poDate ? formData?.poDate : undefined, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                        <Descriptions.Item label="PO Status">{checkAndSetDefaultValue(formData?.poStatus, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="SO Number">{checkAndSetDefaultValue(formData?.soNumber, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="SO Status">{checkAndSetDefaultValue(formData?.soStatus, isLoading)}</Descriptions.Item>
                                    </>
                                )}
                                <Descriptions.Item label="VIN">{checkAndSetDefaultValue(formData?.vinNumber, isLoading)}</Descriptions.Item>
                            </Descriptions>

                            <Descriptions {...viewProps} title={prepareCaption('Price Information')}>
                                <Descriptions.Item label="Sale Type">{checkAndSetDefaultValue(getCodeValue(typeData?.SALE_TYPE, formData?.saleType), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Price Type">{checkAndSetDefaultValue(getCodeValue(typeData?.PRC_TYP, formData?.priceType), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Vehicle Selling Price">{checkAndSetDefaultValue(formData?.vehicleSellingPrice, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Vehicle Amount">{checkAndSetDefaultValue(formData?.vehicleAmount, isLoading)}</Descriptions.Item>
                            </Descriptions>

                            <Descriptions {...viewProps} title={prepareCaption('Benefits')}>
                                <Descriptions.Item label="Dealer Discount with TAX">{checkAndSetDefaultValue(formData?.discountAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Consumer Scheme with TAX">{checkAndSetDefaultValue(formData?.taxAmount, isLoading)}</Descriptions.Item>
                                {showPrintDiscount && <Descriptions.Item label="Print Discount">{formData?.printDiscount === 'Y' ? 'Yes' : 'No'}</Descriptions.Item>}
                            </Descriptions>
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" className={styles?.collapseContainer} collapsible="icon">
                        <Panel header="Tax Details" key="2">
                            <Divider />
                            <DataTable tableColumn={taxDetailsColumn()} tableData={formData['taxDetails']} pagination={false} />
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end" className={styles?.collapseContainer} collapsible="icon">
                        <Panel header="Optional Services" key="3">
                            <Divider />
                            <DataTable tableColumn={optionalServicesColumns({ formActionType })} tableData={formData['optionalServices']} pagination={false} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
