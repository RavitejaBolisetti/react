/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Card, Descriptions, Collapse, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };

    return (
        <>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={'Dealer Name' }>{checkAndSetDefaultValue(formData?.dealerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Dealer Branch' }>{checkAndSetDefaultValue(formData?.dealerBranch, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Claim No' }>{checkAndSetDefaultValue(formData?.claimNo, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Claim Date' }>{checkAndSetDefaultValue(formData?.claimDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Claim Status' }>{checkAndSetDefaultValue(formData?.claimStatus, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Scheme Name' }>{checkAndSetDefaultValue(formData?.schemeName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Against Scheme No' }>{checkAndSetDefaultValue(formData?.againstSchemeNo, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Scheme Date' }>{checkAndSetDefaultValue(formData?.schemeDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Scheme Status' }>{checkAndSetDefaultValue(formData?.schemeStatus, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Budget' }>{checkAndSetDefaultValue(formData?.budget, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Given To' }>{checkAndSetDefaultValue(formData?.givenTo, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Financial Year' }>{checkAndSetDefaultValue(formData?.financialYear, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'From Month' }>{checkAndSetDefaultValue(formData?.fromMonth, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'To Month' }>{checkAndSetDefaultValue(formData?.toMonth, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Form Date' }>{checkAndSetDefaultValue(formData?.formDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'To Date' }>{checkAndSetDefaultValue(formData?.toDate, isLoading)}</Descriptions.Item>
            </Descriptions>
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
