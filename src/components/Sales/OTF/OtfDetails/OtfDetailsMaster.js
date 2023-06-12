import React from 'react';
import { Card, Typography } from 'antd';

import AddEditForm from './AddEditForm';

import styles from 'components/common/Common.module.css';

const { Text } = Typography;

const OtfDetailsMaster = () => {
    return (
        <>
            <Card
                title={
                    <div className={styles.alignUser}>
                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                            OTF Details
                        </Text>
                    </div>
                }
            >
                <AddEditForm />
            </Card>
        </>
    );
};

export default OtfDetailsMaster;
