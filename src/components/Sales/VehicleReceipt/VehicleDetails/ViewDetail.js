/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Card, Descriptions, Collapse, Divider, Space, Typography, Row, Col, Tooltip } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, salesConsultantLov } = props;

    const [activeKey, setactiveKey] = useState([1]);

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

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.accessInfo}>
            <div className={styles.drawerCardView}>
                <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel
                        header={
                            <Space direction="vertical">
                                <Space>
                                    <Text className={styles.headText}> Model: Scorpio </Text>
                                    <Text className={styles.headText}> {`|`}</Text>
                                    <Text className={styles.headText}> VIN: 234254543453</Text>
                                </Space>
                                <Text className={styles.subSection}> Vehicle Status: Received</Text>
                            </Space>
                        }
                        key="1"
                    >
                        <Divider />
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Model Description">
                                {checkAndSetDefaultValue(getCodeValue(typeData?.SALE_TYP, formData?.saleType), isLoading)}
                                {/* <Tooltip title="Extra information">
                                    <InfoCircleOutlined
                                        style={{
                                            color: 'rgba(0,0,0,.45)',
                                        }}
                                    />
                                </Tooltip> */}
                            </Descriptions.Item>
                            <Descriptions.Item label="VIN">{checkAndSetDefaultValue(formData?.custExpectedDeliveryDate, isLoading, 'date')}</Descriptions.Item>
                            <Descriptions.Item label="Key Number">{checkAndSetDefaultValue(getCodeValue(typeData?.SALE_TYP, formData?.saleType), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="MFG Date">{checkAndSetDefaultValue(getCodeValue(typeData?.PRC_TYP, formData?.priceType), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Received On">{checkAndSetDefaultValue(formData?.bookingAmount, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Cost">{checkAndSetDefaultValue(getCodeValue(salesConsultantLov, formData?.saleConsultant), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Demo Vehicle">{checkAndSetDefaultValue(formData?.specialRequest, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Status">{checkAndSetDefaultValue(formData?.placeOfRegistration, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Physical Status">{checkAndSetDefaultValue(getCodeValue(typeData?.DLVR_AT, formData?.deliveryAt), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Shortage">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.referral), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Receipt Checklist No.">{checkAndSetDefaultValue(formData?.mitraType, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
            </div>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
