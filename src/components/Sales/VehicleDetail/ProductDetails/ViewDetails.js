/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Space, Collapse, Typography, Descriptions, Card, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DataTable } from 'utils/dataTable';
import { aggregatesCoulmn } from './tableCoulmn';
import { InputSkeleton } from 'components/common/Skeleton';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { tableColumn } from './tableCoulmn';

import { expandIcon } from 'utils/accordianExpandIcon';
import { convertDateToCalender } from 'utils/formatDateTime';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { styles, bindCodeValue, formData, collapseProps, disabledProps, tooltTipText, isLoading, optionsServiceModified, formActionType } = props;
    const [openAccordian, setOpenAccordian] = useState([]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };
    const { productAttributeDetail, aggregates, connectedVehicle } = formData;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse(1)} expandIconPosition="end" {...collapseProps}>
                    <Panel header="Product Attribute Details" key="1">
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Product Division">{checkAndSetDefaultValue(productAttributeDetail?.productDivision, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Model Family">{checkAndSetDefaultValue(productAttributeDetail?.modelFamily, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(productAttributeDetail?.modelGroup, isLoading)}</Descriptions.Item>

                            <Descriptions.Item label="Model">
                                {isLoading ? (
                                    <InputSkeleton width={'100px'} height={20} theme={'card'} />
                                ) : (
                                    <div className={styles.tooltipAlign}>
                                        {productAttributeDetail?.model}
                                        {!productAttributeDetail?.model ? 'NA' : addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles.toolTip)(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                                    </div>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Model Variant">{checkAndSetDefaultValue(productAttributeDetail?.modelVariant, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Manufacturer Invoice Date">{!isLoading ? productAttributeDetail?.manufacturerInvoiceDate?.slice(0, 10) ?? '-' : <InputSkeleton width={'100px'} height={20} theme={'card'} />}</Descriptions.Item>
                            <Descriptions.Item label="Manufacturer Warrenty Start Date">{!isLoading ? productAttributeDetail?.manufacturerWarrantyStartDate?.slice(0, 10) ?? '-' : <InputSkeleton width={'100px'} height={20} theme={'card'} />}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>

                <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse(2)} expandIconPosition="end" {...collapseProps}>
                    <Panel header="Connected Vehicle" key="2">
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="TCU ID">{checkAndSetDefaultValue(connectedVehicle && connectedVehicle[0]?.tcuId, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="E-SIM No">{checkAndSetDefaultValue(connectedVehicle && connectedVehicle[0]?.esimNo, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="E-SIM Status">{checkAndSetDefaultValue(connectedVehicle && connectedVehicle[0]?.esimStatus, isLoading, 'bool')}</Descriptions.Item>
                            <Descriptions.Item label="Prefered Mobile No 1">{checkAndSetDefaultValue(connectedVehicle && connectedVehicle[0]?.preferredMobileNo1, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Prefered Mobile No 2">{checkAndSetDefaultValue(connectedVehicle && connectedVehicle[0]?.preferredMobileNo2, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="KYC Status">{checkAndSetDefaultValue(connectedVehicle && connectedVehicle[0]?.kycStatus, isLoading, 'bool')}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
                <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse(3)} expandIconPosition="end" {...collapseProps}>
                    <Panel header="Aggregates" key="3">
                        <DataTable tableColumn={tableColumn({ formActionType, bindCodeValue })} tableData={optionsServiceModified} removePagination={true} />
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;