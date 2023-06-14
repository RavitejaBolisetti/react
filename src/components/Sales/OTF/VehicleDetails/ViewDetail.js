import React from 'react';
import { Space, Collapse, Typography, Divider, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import style from 'utils/PasswordStrengthMeter/PasswordStrengthMeter.module.css';
import { addToolTip } from 'utils/customMenuLink';
import { DataTable } from 'utils/dataTable';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { activeKey, onChange, styles, columns, data, optionalData, optionalColumns } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const vehicleForm = {
        vehicleUsageType: 'uttar pradesh',
        vehicleModel: 'ssss',
        model: '12312',
        stock: 'Delhi',
        allotedStatus: 'status',
        PONumber: '123122737328',
        PODate: '12/06/2023',
        POStatus: 'Status',
        SONumber: '653728438213',
        SOStatus: 'Status',
        VINNumber: 'MAFCL723849203VIN',
        discountAmount: '24500',
        sellingPrice: '2454324',
        taxAmount: '222',
        vehicleAmount: '12640',
    };
    // const taxChargesForm = {
    //     type: 'uttar pradesh',
    //     code: 'ssss',
    //     rate: '12312',
    //     rateType: 'Delhi',
    //     description: 'Delhi',
    // };

    const text = 'Color - RED Seating Capacity - 7 Fuel - Diesel Variant - XUV 500 Name - XUV';

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
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Vehicle Usage Type ">{vehicleForm?.vehicleUsageType}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Model">{vehicleForm?.vehicleModel}</Descriptions.Item>
                        <Descriptions.Item label="Model">
                            {vehicleForm?.model}
                            {addToolTip(text, 'bottom', '#20232C', style.infoTooltipDesign)(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Available Stock">{vehicleForm?.stock}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Allocated Status">{vehicleForm?.allotedStatus}</Descriptions.Item>
                        <Descriptions.Item label="PO Number">{vehicleForm?.PONumber}</Descriptions.Item>
                        <Descriptions.Item label="PO Date">{vehicleForm?.PODate}</Descriptions.Item>
                        <Descriptions.Item label="PO Status">{vehicleForm?.POStatus}</Descriptions.Item>
                        <Descriptions.Item label="SO Number">{vehicleForm?.SONumber}</Descriptions.Item>
                        <Descriptions.Item label="SO Status">{vehicleForm?.SOStatus}</Descriptions.Item>
                        <Descriptions.Item label="VIN Number">{vehicleForm?.VINNumber}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Selling Price">{vehicleForm?.sellingPrice}</Descriptions.Item>
                        <Descriptions.Item label="Discount Amount">{vehicleForm?.discountAmount}</Descriptions.Item>
                        <Descriptions.Item label="Tax Amount">{vehicleForm?.taxAmount}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Amount">{vehicleForm?.vehicleAmount}</Descriptions.Item>
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
                    <DataTable tableColumn={columns} tableData={data} pagination={false} removePagination={true} />
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
                    <DataTable tableColumn={optionalColumns} tableData={optionalData} pagination={false} removePagination={true} />
                </Panel>
            </Collapse>
        </Space>
    );
};

export const ViewDetail = ViewDetailMain;
