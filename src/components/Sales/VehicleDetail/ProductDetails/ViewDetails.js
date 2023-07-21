/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Space, Collapse, Typography, Descriptions, Card, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DataTable } from 'utils/dataTable';
import { aggregatesCoulmn } from './tableCoulmn';
import { InputSkeleton } from 'components/common/Skeleton';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { tableColumn } from './tableCoulmn';

import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { openAccordian, onChange, styles, formData, tooltTipText, isLoading, optionsServiceModified } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel header="Product Attribute Details" key="1">
                        <Descriptions {...viewProps}>
                            <br />
                            <Descriptions.Item label="Product Division">{checkAndSetDefaultValue(formData?.dateOfBirth, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Model Family">{checkAndSetDefaultValue(formData?.dateOfBirth, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(formData?.dateOfBirth, isLoading)}</Descriptions.Item>
                            {/* <Descriptions.Item label="Model">{checkAndSetDefaultValue(formData?.dateOfBirth, isLoading)}</Descriptions.Item> */}
                            <Descriptions.Item label="Model">
                                {isLoading ? (
                                    <InputSkeleton width={'100px'} height={20} theme={'card'} />
                                ) : (
                                    <div className={styles.tooltipAlign}>
                                        {formData?.model}
                                        {!formData?.model ? 'NA' : addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles.toolTip)(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                                    </div>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Model Variant">{checkAndSetDefaultValue(formData?.dateOfBirth, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Product SKU">{checkAndSetDefaultValue(formData?.dateOfBirth, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Manufacturer Invoice Date">{checkAndSetDefaultValue(formData?.dateOfBirth, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Manufacturer Warrenty Start Date">{checkAndSetDefaultValue(formData?.dateOfBirth, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>

                <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => onChange(2)} expandIconPosition="end">
                    <Panel header="Connected Vehicle" key="2">
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="TCU ID">{checkAndSetDefaultValue(formData?.accountCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="E-SIM No">{checkAndSetDefaultValue(formData?.accountName, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="E-SIM Status">{checkAndSetDefaultValue(formData?.accountSegement, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Prefered Mobile No 1">{checkAndSetDefaultValue(formData?.accountClientName, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Prefered Mobile No 2">{checkAndSetDefaultValue(formData?.accountMappingDate, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="KYC Status">{checkAndSetDefaultValue(formData?.accountMappingDate, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
                <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => onChange(3)} expandIconPosition="end">
                    <Panel header="Aggregates" key="3">
                        <DataTable tableColumn={tableColumn({ viewMode: true })} tableData={optionsServiceModified} pagination={false} />
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
