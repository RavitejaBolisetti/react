/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Space, Collapse, Typography, Divider, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styles from 'components/common/Common.module.css';

import { addToolTip } from 'utils/customMenuLink';
import { DataTable } from 'utils/dataTable';
import { taxDetailsColumn, optionalServicesColumns } from './tableColumn';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { activeKey, onChange, tooltTipText, settooltTipText, modelData, styles, columns, data, formData, optionalData, optionalColumns } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    useEffect(() => {
        if (modelData?.length > 0) {
            settooltTipText(
                <div>
                    <p>
                        Color:<span>{modelData['0']['color']}</span>
                    </p>
                    <p>
                        Seating<span>{modelData['0']['seatingCapacity']}</span>
                    </p>
                    <p>
                        Fuel<span>{modelData['0']['fuel']}</span>
                    </p>
                    <p>
                        Variant<span>{modelData['0']['variant']}</span>
                    </p>
                    <p>
                        Name<span>{modelData['0']['name']}</span>
                    </p>
                </div>
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelData]);

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
                        <Descriptions.Item label="Vehicle Usage Type ">{formData?.vehicleUsageType ? formData?.vehicleUsageType : 'null'}</Descriptions.Item>
                        <Descriptions.Item label="Model">
                            {formData?.model}
                            {addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles.toolTip)(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Model Code">{formData?.modelCode}</Descriptions.Item>
                        <Descriptions.Item label="Available Stock">{formData?.availableStock}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Allocated Status">{formData?.vehicleAllocationStatus ? formData?.vehicleAllocationStatus : 'null'}</Descriptions.Item>
                        <Descriptions.Item label="PO Number">{formData?.ponumber}</Descriptions.Item>
                        <Descriptions.Item label="PO Date">{formData?.podate}</Descriptions.Item>
                        <Descriptions.Item label="PO Status">{formData?.postatus}</Descriptions.Item>
                        <Descriptions.Item label="SO Number">{formData?.sonumber}</Descriptions.Item>
                        <Descriptions.Item label="SO Status">{formData?.sostatus}</Descriptions.Item>
                        <Descriptions.Item label="VIN Number">{formData?.vinnumber}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Selling Price">{formData?.vehicleSellingPrice}</Descriptions.Item>
                        <Descriptions.Item label="Discount Amount">{formData?.discountAmount}</Descriptions.Item>
                        <Descriptions.Item label="Tax Amount">{formData?.taxAmount}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Amount">{formData?.vehicleAmount}</Descriptions.Item>
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
