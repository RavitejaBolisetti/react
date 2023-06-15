import React from 'react';
import { Card, Descriptions } from 'antd';

const ViewDetailMain = (props) => {
    const { styles } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const customerForm = {
        customerId: 'MO1085585',
        customerName: 'Vimal Kumar',
        make: 'Maruti Suzuki',
        modelGroup: 'Swift ',
        variant: 'abc',
        oldRegNumber: 'UP13AB4325',
        oldChassisNumber: 'MACF527736276',
        dob: '15/06/2021',
        relationship: 'wife',
        month: 'June',
        year: '2012',
        usage: 'Private',
        schemeName: 'Scheme',
        schemeAmount: '2500',
        KM: 'Good Condition',
        expectedPrice: '450000',
        procurementPrice: '35000',
        financeCompany: 'ICICI',
    };

    return (
        <Card className={styles.drawerCardView} >
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Customer ID">{customerForm?.customerId}</Descriptions.Item>
                <Descriptions.Item label="Customer Name">{customerForm?.customerName}</Descriptions.Item>
                <Descriptions.Item label="Make">{customerForm?.make}</Descriptions.Item>
                <Descriptions.Item label="Model Group">{customerForm?.modelGroup}</Descriptions.Item>
                <Descriptions.Item label="Variant">{customerForm?.variant}</Descriptions.Item>
                <Descriptions.Item label="Old Reg. Number">{customerForm?.oldRegNumber}</Descriptions.Item>
                <Descriptions.Item label="Old Chassis Number">{customerForm?.oldChassisNumber}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">{customerForm?.dob}</Descriptions.Item>
                <Descriptions.Item label="Relationship">{customerForm?.relationship}</Descriptions.Item>
                <Descriptions.Item label="Month of Registration">{customerForm?.month}</Descriptions.Item>
                <Descriptions.Item label="Year of Registration">{customerForm?.year}</Descriptions.Item>
                <Descriptions.Item label="Usage">{customerForm?.usage}</Descriptions.Item>
                <Descriptions.Item label="Scheme Name">{customerForm?.schemeName}</Descriptions.Item>
                <Descriptions.Item label="Scheme Amount">{customerForm?.schemeAmount}</Descriptions.Item>
                <Descriptions.Item label="Remarks">{customerForm?.KM}</Descriptions.Item>
                <Descriptions.Item label="Remarks">{customerForm?.expectedPrice}</Descriptions.Item>
                <Descriptions.Item label="Remarks">{customerForm?.procurementPrice}</Descriptions.Item>
                <Descriptions.Item label="Remarks">{customerForm?.financeCompany}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
