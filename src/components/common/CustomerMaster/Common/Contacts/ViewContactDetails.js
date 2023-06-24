/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import AddEditForm from './AddEditForm';
import UploadUtils from './../UploadUtils';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const ViewDetailBase = (props) => {
    const { formData, styles } = props;
    const { setShowAddEditForm, setContactData, onFinish, form, isEditing, isLoading } = props;

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
                    <UploadUtils {...formProps} />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Purpose of Contact">{checkAndSetDefaultValue(formData?.purposeOfContact, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Alternate Mobile Numbe">{checkAndSetDefaultValue(formData?.alternateMobileNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Relation">{checkAndSetDefaultValue(formData?.relationCode, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Gender">{checkAndSetDefaultValue(formData?.gender, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Title">{checkAndSetDefaultValue(formData?.title, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="First Name">{checkAndSetDefaultValue(formData?.firstName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Middle Name">{checkAndSetDefaultValue(formData?.middleName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Last/Surname">{checkAndSetDefaultValue(formData?.lastName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="E-mail">{checkAndSetDefaultValue(formData?.contactEmailId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Alternate Email ID">{checkAndSetDefaultValue(formData?.alternateEmailId, isLoading)}</Descriptions.Item>

                        <Descriptions.Item label="Facebook Link">{checkAndSetDefaultValue(formData?.facebookId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Twitter Link">{checkAndSetDefaultValue(formData?.twitterId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Instagram Link">{checkAndSetDefaultValue(formData?.instagramId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Youtube Channel">{checkAndSetDefaultValue(formData?.youTubeChannel, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Team BHP Link">{checkAndSetDefaultValue(formData?.teamBhp, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Mark As Default">{checkAndSetDefaultValue(formData?.defaultContactIndicator ? 'Yes' : 'No', isLoading)}</Descriptions.Item>
                    </Descriptions>
                </>
            ) : (
                <AddEditForm {...formProps} />
            )}
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
