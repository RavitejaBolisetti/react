import React from 'react';
import { Card, Descriptions } from 'antd';

const ViewDetailMain = (props) => {
    const { styles, formData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    return (
        <Card className={styles.drawerCardView} style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Financier">{formData?.financier}</Descriptions.Item>
                <Descriptions.Item label="Branch">{formData?.branch}</Descriptions.Item>
                <Descriptions.Item label="File Number">{formData?.fileNumber}</Descriptions.Item>
                <Descriptions.Item label="Loan Amount">{formData?.loanAmount}</Descriptions.Item>
                <Descriptions.Item label="EMI">{formData?.emi}</Descriptions.Item>
                <Descriptions.Item label="D.O. Recived">{formData?.doReceived}</Descriptions.Item>
                <Descriptions.Item label="D.O. Number">{formData?.doNumber}</Descriptions.Item>
                <Descriptions.Item label="D.O. Date">{formData?.doDate}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
