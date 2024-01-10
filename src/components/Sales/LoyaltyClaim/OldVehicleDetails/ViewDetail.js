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
                <Descriptions.Item label={'Title' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.title, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'First Name' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.firstName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Middle Name' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.middleName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Last Name' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.lastName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Make' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.make, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Modal' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.exchangeMake, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Vehicle Varient' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.chessisNo, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Chessis No' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.registrationNo, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Reg. No' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.yearOfRegistration, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Year of Registration' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.monthOfRegistration, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Month of Registration' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.km, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'K.M.' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.scheme, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Relationship' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.relationship, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
