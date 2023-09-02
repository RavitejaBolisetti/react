/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Collapse, Descriptions, Divider, Space } from 'antd';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { InputSkeleton } from 'components/common/Skeleton';

import { addToolTip } from 'utils/customMenuLink';
import { DataTable } from 'utils/dataTable';
import { expandIcon } from 'utils/accordianExpandIcon';
import { DATA_TYPE } from 'constants/dataType';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import { taxDetailsColumn, optionalServicesColumns } from './tableColumn';
import { getCodeValue } from 'utils/getCodeValue';

const { Panel } = Collapse;
const ViewDetailMain = (props) => {
    const { typeData, isLoading, activeKey, onChange, tooltTipText, styles, formData } = props;
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
                                <Descriptions.Item label="Vehicle Usage Type ">{checkAndSetDefaultValue(formData?.vehicleUsageType, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Model">
                                    {isLoading ? (
                                        <InputSkeleton width={'100px'} height={20} theme={'card'} />
                                    ) : (
                                        <div className={styles?.tooltipAlign}>
                                            {formData?.model}
                                            {!formData?.model ? 'NA' : addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles.toolTip)(<AiOutlineInfoCircle className={styles?.infoIconColor} size={13} />)}
                                        </div>
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(formData?.modelCode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Available Stock">{checkAndSetDefaultValue(formData?.availableStock, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Vehicle Allocated Status">{checkAndSetDefaultValue(getCodeValue(VEHICLE_TYPE, formData?.vehicleAllocatedStatus, 'title'), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="PO Number">{checkAndSetDefaultValue(formData?.poNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="PO Date">{checkAndSetDefaultValue(formData?.poDate ? formData?.poDate : undefined, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                <Descriptions.Item label="PO Status">{checkAndSetDefaultValue(getCodeValue(typeData?.SPR_PO_STATS, formData?.poStatus, isLoading))}</Descriptions.Item>
                                <Descriptions.Item label="SO Number">{checkAndSetDefaultValue(formData?.soNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="SO Status">{checkAndSetDefaultValue(formData?.soStatus, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="VIN Number">{checkAndSetDefaultValue(formData?.vinNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Vehicle Selling Price">{checkAndSetDefaultValue(formData?.vehicleSellingPrice, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Discount Amount">{checkAndSetDefaultValue(formData?.discountAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Tax Amount">{checkAndSetDefaultValue(formData?.taxAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Vehicle Amount">{checkAndSetDefaultValue(formData?.vehicleAmount, isLoading)}</Descriptions.Item>
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
                        <Panel header="Other Charges" key="3">
                            <Divider />
                            <DataTable tableColumn={optionalServicesColumns()} tableData={formData['optionalServices']} pagination={false} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
