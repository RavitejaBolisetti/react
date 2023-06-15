import React from 'react';
import { Card, Descriptions } from 'antd';
import styles from 'components/common/Common.module.css';

const AccessoriesInformationCard = () => {

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Type">{'Accessories type'}</Descriptions.Item>
                <Descriptions.Item label="Selling Price">{'4567'}</Descriptions.Item>
                <Descriptions.Item label="MRP">{'6543'}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default AccessoriesInformationCard;
