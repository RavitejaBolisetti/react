/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import AddEditForm from './AddEditForm';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

const ViewContactDetailBase = (props) => {
    const { formData, styles } = props;
    const { setShowAddEditForm, setContactData, onFinish, form, isEditing, isLoading, typeData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    const formProps = {
        setShowAddEditForm,
        setContactData,
        onFinish,
        form,
        ...props,
    };

    return (
        <div className={styles.viewDrawerContainer}>
            {!isEditing ? (
                <>
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Contact Type">{checkAndSetDefaultValue(getCodeValue(typeData?.VH_CONTACT_TYPE, formData?.contactType), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Preferred Days For Contact">{checkAndSetDefaultValue(getCodeValue(typeData?.VH_CONTACT_DAYS, formData?.preferredDayForContact), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Name">{checkAndSetDefaultValue(formData?.name, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="E-mail">{checkAndSetDefaultValue(formData?.emailId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Preferred Contact Time">
                            {formData?.preferredContactTimeFrom} - {formData?.preferredContactTimeTo}
                        </Descriptions.Item>
                    </Descriptions>
                </>
            ) : (
                <AddEditForm {...formProps} />
            )}
        </div>
    );
};

export const ViewContactDetail = ViewContactDetailBase;
