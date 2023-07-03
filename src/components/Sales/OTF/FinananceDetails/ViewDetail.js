/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
const ViewDetailMain = (props) => {
    const { styles, formData, isLoading, FinanceLovData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    return (
        <Card className={styles.drawerCardView} style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Financier">{checkAndSetDefaultValue(getCodeValue(FinanceLovData, formData?.financier), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Branch">{checkAndSetDefaultValue(formData?.branch, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="File Number">{checkAndSetDefaultValue(formData?.fileNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Loan Amount">{checkAndSetDefaultValue(formData?.loanAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="EMI">{checkAndSetDefaultValue(formData?.emi, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="D.O. Recived">{checkAndSetDefaultValue(formData?.doReceived, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="D.O. Number">{checkAndSetDefaultValue(formData?.doNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="D.O. Date">{checkAndSetDefaultValue(formData?.doDate?.format('YYYY-MM-DD'), isLoading, 'date')}</Descriptions.Item>
            </Descriptions>
        </Card> 
    );
};

export const ViewDetail = ViewDetailMain;
