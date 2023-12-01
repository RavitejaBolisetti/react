/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';


const ViewDetailMain = (props) => {
    const { formData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={'AO' || translateContent('city.label.districtName')}>{formData?.districtName}</Descriptions.Item>
                    <Descriptions.Item label={'Parent Name' || translateContent('city.label.cityName')}>{formData?.name}</Descriptions.Item>
                    <Descriptions.Item label={'Parent code' || translateContent('city.label.cityCode')}>{formData?.code}</Descriptions.Item>
                    <Descriptions.Item label={'Segment' || translateContent('global.label.status')}>{formData?.status }</Descriptions.Item>
                    
                    <Descriptions.Item label={'Model Group' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Variant' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Model Code' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Corporate Code' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Quantity' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Consume Quantity' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Valid To' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'REG Disc' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Add Disc' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Cost Center' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                                    
                </Descriptions>
            </Card>

           
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
