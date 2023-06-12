import React from 'react';
import { Card, Typography } from 'antd';

import AddEditForm from './AddEditForm';

import styles from 'components/common/Common.module.css';

const { Text } = Typography;

const OtfDetailsMaster = () => {
    return (
        <>
            <Card>
                <AddEditForm />
            </Card>
        </>
    );
};

export default OtfDetailsMaster;
