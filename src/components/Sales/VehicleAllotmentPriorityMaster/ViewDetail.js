/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
// import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
// import CardNotificationDetail from './NotificationDetails/CardNotificationDetail';
import { Card, Row, Divider, Typography, Space, Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

// const { Panel } = Collapse;
const { Text } = Typography;

// const expandIcon = ({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />);
const ViewDetailBase = (props) => {
    const { formData, styles, isLoading, roleData, data } = props;
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    const getRoleName = (value) => {
        return roleData?.find((i) => i?.key === value)?.value;
    };
    const getDesignationName = (value) => {
        return data?.find((i) => i?.designationCode === value)?.designationDescription;
    };

    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('vehicleAllotmentPriorityMaster.label.oldModel')}>{checkAndSetDefaultValue(formData?.oldModelGroup, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehicleAllotmentPriorityMaster.label.newModel')}>{checkAndSetDefaultValue(formData?.newModelGroup, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehicleAllotmentPriorityMaster.label.effectiveFromDate')}>{checkAndSetDefaultValue(formData?.effectiveFromDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehicleAllotmentPriorityMaster.label.effectiveToDate')}>{checkAndSetDefaultValue(formData?.effectiveToDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>

                    {/* <Descriptions.Item label="Old Model">{checkAndSetDefaultValue(formData?.oldModelGroup, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="New Model">{checkAndSetDefaultValue(formData?.newModelGroup, isLoading)}</Descriptions.Item> */}
                </Descriptions>
            </div>
            {formData?.roleData?.length > 0 && (
                <>
                    <div>
                        {formData?.roleData?.map((item, index) => (
                            <Card>
                                <Row align="middle" justify="space-between" className={styles.marB20}>
                                    <Space>
                                        {/* <Text> {item?.find((i) => i?.key === props?.roleCode)?.value}</Text> */}
                                        <Text> {getRoleName(item?.roleCode)}</Text>

                                        <Divider type="vertical" />
                                        {/* <Text> {item.designationCode}</Text> */}
                                        <Text> {getDesignationName(item?.designationCode)}</Text>
                                    </Space>
                                </Row>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export const ViewDetail = ViewDetailBase;
