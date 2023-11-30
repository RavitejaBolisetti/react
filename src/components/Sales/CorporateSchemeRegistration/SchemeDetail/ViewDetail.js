/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Row, Input, Col, Select, Form, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';
import { validateRequiredInputField } from 'utils/validation';

const { TextArea } = Input;
const { Option } = Select;

const ViewDetailMain = (props) => {
    const { formData, isLoading, handleClearChange, mandatoryFields, selectProps } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const claimtype = [
        { key: 1, value: 'Corporate Claim' },
        { key: 2, value: 'Additional Corporate Claim' },
    ];
    return (
        <>
            <Card>
                <Descriptions {...viewProps}>
                <Descriptions.Item label={'Zone' || translateContent('city.label.stateName')}>{formData?.stateName}</Descriptions.Item>
                    <Descriptions.Item label={'Area Office' || translateContent('city.label.districtName')}>{formData?.districtName}</Descriptions.Item>
                    <Descriptions.Item label={'Dealer Code' || translateContent('city.label.cityCode')}>{formData?.code}</Descriptions.Item>
                    <Descriptions.Item label={'Corporate Category' || translateContent('city.label.cityName')}>{formData?.name}</Descriptions.Item>
                    <Descriptions.Item label={'Dealer Amount' || translateContent('global.label.status')}>{formData?.status }</Descriptions.Item>
                    
                    <Descriptions.Item label={'OEM Amount' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Valid From' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Valid To' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Status' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                </Descriptions>
            </Card>

           
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
