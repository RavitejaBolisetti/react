import React from 'react';
import { Space, Card, Descriptions } from 'antd';

const ViewDetailMain = (props) => {
    const { styles } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const insuranceForm = {
        insuranceComapny: 'Mahindra',
        insuranceCoverNote: 'Thara Thar',
        insuranceAmount: '999',
        date: '10/10/2023',
        registrationNumber: 1020,
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Card style={{ backgroundColor: '#f2f2f2' }}>
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Insurance Company">{insuranceForm?.insuranceComapny}</Descriptions.Item>
                        <Descriptions.Item label="Insurance Cover Note">{insuranceForm?.insuranceCoverNote}</Descriptions.Item>
                        <Descriptions.Item label="Insurance Amount">{insuranceForm?.insuranceAmount}</Descriptions.Item>
                        <Descriptions.Item label="Date">{insuranceForm?.date}</Descriptions.Item>
                        <Descriptions.Item label="Registration Number">{insuranceForm?.registrationNumber}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
