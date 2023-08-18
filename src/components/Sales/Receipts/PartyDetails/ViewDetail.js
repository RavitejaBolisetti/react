/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Divider } from 'antd';
import styles from 'components/common/Common.module.css';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

const ViewDetailMain = (props) => {
    const { formData, isLoading, partySegmentType } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Party Segment">{checkAndSetDefaultValue(getCodeValue(partySegmentType, formData?.partySegment, isLoading))}</Descriptions.Item>
                <Descriptions.Item label="Party ID">{checkAndSetDefaultValue(formData?.partyId)}</Descriptions.Item>
                <Descriptions.Item label="Party Name">{checkAndSetDefaultValue(formData?.customerName || formData?.partyName)}</Descriptions.Item>
                <Descriptions.Item label="Address">{checkAndSetDefaultValue(formData?.address)}</Descriptions.Item>
                <Descriptions.Item label="City">{checkAndSetDefaultValue(formData?.city)}</Descriptions.Item>
                <Descriptions.Item label="State">{checkAndSetDefaultValue(formData?.state)}</Descriptions.Item>
                <Descriptions.Item label="Phone">{checkAndSetDefaultValue(formData?.mobileNumber)}</Descriptions.Item>
                <Descriptions.Item label="Mitra Type">{checkAndSetDefaultValue(formData?.mitraType)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
