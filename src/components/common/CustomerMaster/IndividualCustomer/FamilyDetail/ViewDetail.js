/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Card, Space } from 'antd';
import dayjs from 'dayjs';

import styles from 'components/common/Common.module.css';

const ViewDetailBase = (props) => {
    const { customerType } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 },
    };

    return (
        <div className={styles.sectionborder}>
                    <Descriptions {...viewProps} className={styles.descriptionBox}>
                        <Descriptions.Item label="M&M Customer">{props?.mnmCustomer}</Descriptions.Item>
                        <Descriptions.Item label="Customer ID">{props?.customerId}</Descriptions.Item>
                        {customerType ? <Descriptions.Item label="Customer Name">{props?.customerName}</Descriptions.Item> : null}
                        <Descriptions.Item label="Relationship">{props?.relationship}</Descriptions.Item>
                        <Descriptions.Item label="Date of Birth">{typeof props?.dateOfBirth === 'object' ? dayjs(props?.dateOfBirth).format('YYYY-MM-DD') : props?.dateOfBirth}</Descriptions.Item>
                        <Descriptions.Item label="Age">{props?.relationAge}</Descriptions.Item>
                        <Descriptions.Item label="" />
                        <Descriptions.Item label="Remark">{props?.remarks}</Descriptions.Item>
                    </Descriptions>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
