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
                <Descriptions.Item label={'Doc Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.docNumber, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Doc Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.DocDate, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Doc Status' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.docStatus, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Evaluation Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.evaluationNumber, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Evaluation Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.evaluationDate, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Customer Name' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.customerName, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Procuremant Price' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.procuremantPrice, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Procurement Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.procurementDate, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Customer Mob. Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.customerMobNumber, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Product Type' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.productType, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Reg. Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.regNumber, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Fuel Type' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.fuelType, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Make' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.make, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Mileage' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.mileage, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Varient' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.varient, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Model' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.model, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Year of Manufacturing' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.yearofManufacturing, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Month of Manufacturing' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.monthofManufacturing, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Color' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.color, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Year of Registration' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.yearofRegistration, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Month of Registration' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.monthofRegistration, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Chassis Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.chassisNumber, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Engine Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.engineNumber, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Selling/Offload Price' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.sellingOffloadPrice, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Selling Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.sellingDate, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Selling Type' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.sellingType, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Bussiness Assosiate Id' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.bussinessAssosiateId, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Bussiness Assosiate Name' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.bussinessAssosiateName, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Broker Source' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.brokerSource, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Assosiate Mob No' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.assosiateMobNo, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Form 29C Vahan Ack  Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.form29cVahanAckNumber, isLoading)}</Descriptions.Item> 
                <Descriptions.Item label={'Broker Vahan Ack Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.brokerVahanAckNumber, isLoading)}</Descriptions.Item> 
            </Descriptions>
        </Card>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
