import React from 'react';
import { Card, Descriptions } from 'antd';

const ViewDetailMain = (props) => {
    const { styles, customerForm } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    // const customerForm = {
    //     customerId: 'MO1085585',
    //     customerName: 'Vimal Kumar',
    //     make: 'Maruti Suzuki',
    //     modelGroup: 'Swift ',
    //     variant: 'abc',
    //     oldRegNumber: 'UP13AB4325',
    //     oldChassisNumber: 'MACF527736276',
    //     dob: '15/06/2021',
    //     relationship: 'wife',
    //     year: '2012',
    //     month: 'June',
    //     usage: 'Private',
    //     schemeName: 'Scheme',
    //     schemeAmount: '2500',
    //     remarks: 'Good Condition',
    // };

    return (
        <Card className={styles.drawerCardView} style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Customer ID">{customerForm?.customerCode}</Descriptions.Item>
                <Descriptions.Item label="Customer Name">{customerForm?.customerName}</Descriptions.Item>
                <Descriptions.Item label="Make">{customerForm?.vehicleManufactureCode}</Descriptions.Item>
                <Descriptions.Item label="Model Group">{customerForm?.vehicleModelCode}</Descriptions.Item>
                <Descriptions.Item label="Variant">{customerForm?.variantDescription}</Descriptions.Item>
                <Descriptions.Item label="Old Reg. Number">{customerForm?.registrationNumber}</Descriptions.Item>
                <Descriptions.Item label="Old Chassis Number">{customerForm?.oldChassisNumber}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">{customerForm?.customerDOB}</Descriptions.Item>
                <Descriptions.Item label="Relationship">{customerForm?.relationCode}</Descriptions.Item>
                <Descriptions.Item label="Year of Registration">{customerForm?.registrationYear}</Descriptions.Item>
                <Descriptions.Item label="Month of Registration">{customerForm?.registrationMonth}</Descriptions.Item>
                <Descriptions.Item label="Usage">{customerForm?.vehicleUsage}</Descriptions.Item>
                <Descriptions.Item label="Scheme Name">{customerForm?.schemeName}</Descriptions.Item>
                <Descriptions.Item label="Scheme Amount">{customerForm?.schemeBase}</Descriptions.Item>
                <Descriptions.Item label="Remarks">{customerForm?.remarks}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
