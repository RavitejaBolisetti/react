/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Space, Collapse, Typography, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { InputSkeleton } from 'components/common/Skeleton';

import { addToolTip } from 'utils/customMenuLink';
import { DataTable } from 'utils/dataTable';
import { taxDetailsColumn, optionalServicesColumns } from './tableColumn';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { isLoading, activeKey, onChange, tooltTipText, styles, formData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Space direction="vertical" size="middle" className={styles.accordianContainer}>
            <Collapse
                expandIcon={() => {
                    if (activeKey.includes(1)) {
                        return <MinusOutlined className={styles.iconsColor} />;
                    } else {
                        return <PlusOutlined className={styles.iconsColor} />;
                    }
                }}
                activeKey={activeKey}
                onChange={() => onChange(1)}
                expandIconPosition="end"
                className={styles.collapseContainer}
            >
                <Panel
                    header={
                        <div className={styles.alignUser}>
                            <Text strong level={5} style={{ marginTop: '4px', marginLeft: '8px' }}>
                                Vehicle Information
                            </Text>
                        </div>
                    }
                    key="1"
                >
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Vehicle Usage Type ">{checkAndSetDefaultValue(formData?.vehicleUsageType, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Model">
                            {isLoading ? (
                                <InputSkeleton width={'100px'} height={20} theme={'card'} />
                            ) : (
                                <div className={styles.tooltipAlign}>
                                    {formData?.model}
                                    {addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles.toolTip)(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                                </div>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(formData?.modelCode, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Available Stock">{checkAndSetDefaultValue(formData?.availableStock, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Allocated Status">{checkAndSetDefaultValue(formData?.vehicleAllocatedStatus, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="PO Number">{checkAndSetDefaultValue(formData?.ponumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="PO Date">{checkAndSetDefaultValue(formData?.podate, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="PO Status">{checkAndSetDefaultValue(formData?.postatus, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="SO Number">{checkAndSetDefaultValue(formData?.sonumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="SO Status">{checkAndSetDefaultValue(formData?.sostatus, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="VIN Number">{checkAndSetDefaultValue(formData?.vinnumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Selling Price">{checkAndSetDefaultValue(formData?.vehicleSellingPrice, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Discount Amount">{checkAndSetDefaultValue(formData?.discountAmount, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Tax Amount">{checkAndSetDefaultValue(formData?.taxAmount, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Amount">{checkAndSetDefaultValue(formData?.vehicleAmount, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse>

            <Collapse
                expandIcon={() => {
                    if (activeKey.includes(2)) {
                        return <MinusOutlined className={styles.iconsColor} />;
                    } else {
                        return <PlusOutlined className={styles.iconsColor} />;
                    }
                }}
                activeKey={activeKey}
                onChange={() => onChange(2)}
                expandIconPosition="end"
                className={styles.collapseContainer}
            >
                <Panel
                    header={
                        <div className={styles.alignUser}>
                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                Tax Details
                            </Text>
                        </div>
                    }
                    key="2"
                >
                    <DataTable tableColumn={taxDetailsColumn} tableData={formData['taxDetails']} removePagination={true} />
                </Panel>
            </Collapse>

            <Collapse
                expandIcon={() => {
                    if (activeKey.includes(3)) {
                        return <MinusOutlined className={styles.iconsColor} />;
                    } else {
                        return <PlusOutlined className={styles.iconsColor} />;
                    }
                }}
                activeKey={activeKey}
                onChange={() => onChange(3)}
                expandIconPosition="end"
                className={styles.collapseContainer}
            >
                <Panel
                    header={
                        <div className={styles.alignUser}>
                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                Optional Service
                            </Text>
                        </div>
                    }
                    key="3"
                >
                    <DataTable tableColumn={optionalServicesColumns} tableData={formData['optionalServices']} removePagination={true} />
                </Panel>
            </Collapse>
        </Space>
    );
};

export const ViewDetail = ViewDetailMain;
