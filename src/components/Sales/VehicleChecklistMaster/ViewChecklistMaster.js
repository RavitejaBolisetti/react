/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Typography } from 'antd';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';
import { ATTRIBUTE_LEVEL } from 'constants/modules/VehicleCheckListMaster/attributeType';

export const ViewTaxChargesMain = (props) => {
    const { Text } = Typography;
    const { attributeType, viewTitle, styles, formData } = props;
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label="Attribute Level">{formData?.attributeName}</Descriptions.Item>
                    <Descriptions.Item label="Parent">{formData?.parentName || HIERARCHY_DEFAULT_PARENT}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status ? <Text type="success">Active</Text> : <Text>Inactive</Text>}</Descriptions.Item>
                    {attributeType === ATTRIBUTE_LEVEL?.[0]?.key && (
                        <>
                            <Descriptions.Item label="Group Code">{formData?.code}</Descriptions.Item>
                            <Descriptions.Item label="Group Description">{formData?.descriptionTitle}</Descriptions.Item>
                        </>
                    )}
                    {attributeType === ATTRIBUTE_LEVEL?.[1]?.key && (
                        <>
                            <Descriptions.Item label="Sub Group Code">{formData?.code}</Descriptions.Item>
                            <Descriptions.Item label="Sub Group Description">{formData?.descriptionTitle}</Descriptions.Item>
                        </>
                    )}
                    {attributeType === ATTRIBUTE_LEVEL?.[2]?.key && (
                        <>
                            <Descriptions.Item label="Checklist Code">{formData?.code}</Descriptions.Item>
                            <Descriptions.Item label="Checklist Description">{formData?.descriptionTitle}</Descriptions.Item>
                        </>
                    )}
                    {attributeType === ATTRIBUTE_LEVEL?.[3]?.key && (
                        <>
                            <Descriptions.Item label="Checklist Code">{formData?.code}</Descriptions.Item>
                            <Descriptions.Item label="Checklist Description">{formData?.descriptionTitle}</Descriptions.Item>
                        </>
                    )}
                </Descriptions>
            </div>
        </>
    );
};

export const ViewTaxCharges = ViewTaxChargesMain;
