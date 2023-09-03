/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import AddEditForm from './AddEditForm';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const ViewMacIdDetailBase = (props) => {
    const { formData, styles } = props;
    const { setShowAddEditForm, setMacIdData, onFinish, form, isEditing, isLoading } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    const formProps = {
        setShowAddEditForm,
        setMacIdData,
        onFinish,
        form,
        ...props,
    };

    return (
        <div className={styles.viewDrawerContainer}>
            {!isEditing ? (
                <>
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Device Type">{checkAndSetDefaultValue(formData?.deviceType, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Device Id">{checkAndSetDefaultValue(formData?.macId, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </>
            ) : (
                <AddEditForm {...formProps} />
            )}
        </div>
    );
};

export const ViewMacIdDetail = ViewMacIdDetailBase;
