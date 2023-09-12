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

// const { Panel } = Collapse;
const { Text } = Typography;

// const expandIcon = ({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />);
const ViewDetailBase = (props) => {
    const { formData, styles, isLoading,roleData, data, } = props;
    
    // const currentRole = formData?.roleData?.find((i) => i?.key === props?.roleCode)?.value;
    // const currentDestination =  filterDesignationList?.find((i) => i?.designationCode === props?.designationCode)?.designationDescription;

    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
    };

    const getRoleName = (value) => {    console.log('value',value);     
       return roleData?.find((i) => i?.key === value)?.value;
    };
    const getDesignationName = (value) => {    console.log('value',value);     
    return data?.find((i) => i?.designationCode === value)?.designationDescription;
 };
    
    return (
        <>
            <div className={styles.viewContainer}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label="Old Model">{checkAndSetDefaultValue(formData?.oldModelGroup, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="New Model">{checkAndSetDefaultValue(formData?.newModelGroup, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Effective From Date">{checkAndSetDefaultValue(formData?.effectiveFromDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="Effective To Date">{checkAndSetDefaultValue(formData?.effectiveToDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    {/* <Descriptions.Item label="Status">
                        <span className={formData?.activeIndicator ? styles.activeText : styles?.inactiveText}>{formData?.activeIndicator ? 'Active' : 'Inactive'}</span>
                    </Descriptions.Item> */}
                </Descriptions>
            </div>
            {formData?.roleData?.length > 0 && (
                <>
                    <div>
                    {formData?.roleData?.map((item, index) => (
                        <Card style={{ backgroundColor: '#BEBEBE1A', }}  >
                            <Row align="middle" justify="space-between" className={styles.marB20}>
                                <Space>
                                    {/* <Text> {item?.find((i) => i?.key === props?.roleCode)?.value}</Text> */}
                                <Text> {getRoleName(item?.roleCode) }</Text>

                                    <Divider type="vertical" />
                                    {/* <Text> {item.designationCode}</Text> */}
                                    <Text> {getDesignationName(item?.designationCode) }</Text>
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
