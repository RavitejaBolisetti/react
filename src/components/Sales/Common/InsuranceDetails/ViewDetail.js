/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';

import styles from 'assets/sass/app.module.scss';
import { getCodeValue } from 'utils/getCodeValue';

const ViewDetailMain = (props) => {
    const { formData, isLoading, insuranceCompanies } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Insurance Company">{checkAndSetDefaultValue(getCodeValue(insuranceCompanies, formData?.insuranceCompany), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Insurance Cover Note">{checkAndSetDefaultValue(formData?.insuranceCoverNote, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Insurance Amount">{checkAndSetDefaultValue(formData?.insuranceAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Insurance Cover Note Date">{checkAndSetDefaultValue(formData?.insuranceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Registration Number">{checkAndSetDefaultValue(formData?.registrationNumber, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
