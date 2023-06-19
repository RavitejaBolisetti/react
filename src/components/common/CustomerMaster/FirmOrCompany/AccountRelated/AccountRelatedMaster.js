import React from 'react';

import { Space, Card } from 'antd';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewAccountDetails';

import styles from 'components/common/Common.module.css';

const AccountRelatedBase = (props) => {
    const { isViewModeVisible, formActionType } = props;

    const viewProps = {
        styles,
    };

    return (
        <>
            {!formActionType?.viewMode ? (
                <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                    <Card style={{ backgroundColor: '#F2F2F2' }}>
                        <AddEditForm {...props} />
                    </Card>
                </Space>
            ) : (
                <Card style={{ backgroundColor: '#F2F2F2' }}>
                    <ViewDetail {...viewProps} />
                </Card>
            )}
        </>
    );
};

export const AccountRelatedMaster = AccountRelatedBase;
