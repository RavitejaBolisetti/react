/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { DATA_TYPE } from 'constants/dataType';
import dayjs from 'dayjs';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'components/common/Common.module.css';

const ViewDetailBase = (props) => {
    const { isLoading } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Descriptions {...viewProps} className={styles.descriptionBox}>
                <Descriptions.Item label="M&M Customer">{checkAndSetDefaultValue(props?.mnmCustomer, isLoading)}</Descriptions.Item>
                {props?.mnmCustomer === 'Yes' ? <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(props?.relationCustomerId, isLoading)}</Descriptions.Item> : null}
                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(props?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Relationship">{checkAndSetDefaultValue(props?.relationship, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">{checkAndSetDefaultValue(props?.dateOfBirth, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Age">{checkAndSetDefaultValue(props?.relationAge, isLoading)}</Descriptions.Item>
                {props?.mnmCustomer === 'No' ? <Descriptions.Item label="" /> : null}
                <Descriptions.Item label="Remark">{checkAndSetDefaultValue(props?.remarks, isLoading)}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
