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
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={'Vehicle Type' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.vehicleType, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Customer ID' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.customerID, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Customer Name' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Make' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.make, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Modal Group' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.modalGroup, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Varient' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.Varient, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Old Reg. No' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.oldRegistrationNo, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Old Chessis No' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.oldchessisNo, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'DOB' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.dob, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Relationship' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.relationship, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Year of Registration' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.yearOfRegistration, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Month of Registration' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.monthOfRegistration, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Usage' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.usage, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Scheme Name' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.schemeName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Scheme Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.schemeAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'KM' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.km, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Customer Expected Price' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.customerExpectedPrice, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Procurement Price' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.procurementPrice, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Finance Company' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.financeCompany, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
