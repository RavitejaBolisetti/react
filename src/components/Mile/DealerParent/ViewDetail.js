/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

const ViewDetailBase = ({ formData, styles, parameterType, typeData }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <>
            <div className={styles.viewContainer}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label="Group Code">{formData?.code}</Descriptions.Item>
                    <Descriptions.Item label="Group Name">{formData?.name}</Descriptions.Item>
                    <Descriptions.Item label="Title">{checkAndSetDefaultValue(getCodeValue(typeData, formData?.title))}</Descriptions.Item>
                    <Descriptions.Item label="Owner Name">{formData?.ownerName}</Descriptions.Item>
                    <Descriptions.Item label="Contact Number">{formData?.mobileNumber}</Descriptions.Item>
                    <Descriptions.Item label="Email ID">{formData?.emailId}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
