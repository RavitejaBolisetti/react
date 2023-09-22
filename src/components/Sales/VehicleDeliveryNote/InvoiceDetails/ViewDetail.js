/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';

const ViewDetailMain = (props) => {
    const { styles, formData, isLoading, soldByDealer } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    return (
        <Card className={styles?.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Delivery Note For">{checkAndSetDefaultValue(soldByDealer ? 'Vehicle Sold By Dealer' : null, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Invoice No.">{checkAndSetDefaultValue(formData?.invoiceNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Invoice Date">{checkAndSetDefaultValue(formData?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Engine No.">{checkAndSetDefaultValue(formData?.engineNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Chassis No.">{checkAndSetDefaultValue(formData?.chassisNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Relationship Manager">{checkAndSetDefaultValue(formData?.relationShipManager, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Customer Provided Date">{checkAndSetDefaultValue(formData?.customerPromiseDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Reasons For Delay">{checkAndSetDefaultValue(formData?.reasonForDelay, isLoading)}</Descriptions.Item>
                <br />
                <Descriptions.Item label="Remark For Delay">{checkAndSetDefaultValue(formData?.reasonForDelayRemarks, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
