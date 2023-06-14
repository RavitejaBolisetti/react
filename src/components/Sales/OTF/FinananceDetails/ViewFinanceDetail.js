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
    const financeForm = {
        financier: 'HDFC',
        branch: 'Noida',
        filenumber: 'FA12123',
        loanamoount: '1500000',
        emi: '60',
        financedone: 'Yes',
        dorecived: 'Yes',
        donumber: '121121212123',
        dodate: '12/09/2022',
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Card style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
                    <div className={styles.alignUser}>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Financier">{financeForm?.financier}</Descriptions.Item>
                            <Descriptions.Item label="Branch">{financeForm?.branch}</Descriptions.Item>
                            <Descriptions.Item label="File Number">{financeForm?.filenumber}</Descriptions.Item>
                            <Descriptions.Item label="Loan Amount">{financeForm?.loanamoount}</Descriptions.Item>
                            <Descriptions.Item label="EMI">{financeForm?.emi}</Descriptions.Item>
                            <Descriptions.Item label="Finance Done">{financeForm?.financedone}</Descriptions.Item>
                            <Descriptions.Item label="D.O. Recived">{financeForm?.dorecived}</Descriptions.Item>
                            <Descriptions.Item label="D.O. Number">{financeForm?.donumber}</Descriptions.Item>
                            <Descriptions.Item label="D.O. Date">{financeForm?.dodate}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Card>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
