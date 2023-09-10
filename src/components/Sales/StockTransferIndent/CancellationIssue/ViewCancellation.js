/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { prepareCaption } from 'utils/prepareCaption';
import { f } from 'utils/form';

const ViewDetailMain = (props) => {
    const { styles, formData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const viewData = {
        indentNumber: formData?.indentNumber ?? 'NA',
        indentDate: formData?.indentDate ?? 'NA',
        indentStatus: formData?.indentStatus,
        indentLocation: formData?.indentLocation,
        requestedBy: formData?.requestedBy,
        remarks: formData?.remarks,
    };
    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Indent Number">{checkAndSetDefaultValue(viewData?.indentNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Indent Date">{checkAndSetDefaultValue(makeData, viewData?.indentDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Indent Status">{checkAndSetDefaultValue(viewData?.indentStatus, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Indent To Location">{checkAndSetDefaultValue(viewData?.indentLocation, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Requested By">{checkAndSetDefaultValue(makeData, viewData?.requestedBy, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(viewData?.remarks, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
