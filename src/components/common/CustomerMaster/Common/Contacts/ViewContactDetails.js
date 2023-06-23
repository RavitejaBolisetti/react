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
    const { setShowAddEditForm, setContactData, onFinish, form, isEditing } = props;

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
                        <Descriptions.Item label="Purpose of Contact">{checkAndSetDefaultValue(formData?.purposeOfContact)}</Descriptions.Item>
                        <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.mobileNumber)}</Descriptions.Item>
                        <Descriptions.Item label="Alternate Mobile Numbe">{checkAndSetDefaultValue(formData?.alternateMobileNumber)}</Descriptions.Item>
                        <Descriptions.Item label="Relation">{checkAndSetDefaultValue(formData?.relationCode)}</Descriptions.Item>
                        <Descriptions.Item label="Gender">{checkAndSetDefaultValue(formData?.gender)}</Descriptions.Item>
                        <Descriptions.Item label="Title">{checkAndSetDefaultValue(formData?.title)}</Descriptions.Item>
                        <Descriptions.Item label="First Name">{checkAndSetDefaultValue(formData?.firstName)}</Descriptions.Item>
                        <Descriptions.Item label="Middle Name">{checkAndSetDefaultValue(formData?.middleName)}</Descriptions.Item>
                        <Descriptions.Item label="Last/Surname">{checkAndSetDefaultValue(formData?.lastName)}</Descriptions.Item>
                        <Descriptions.Item label="E-mail">{checkAndSetDefaultValue(formData?.contactEmailId)}</Descriptions.Item>
                        <Descriptions.Item label="Alternate Email ID">{checkAndSetDefaultValue(formData?.alternateEmailId)}</Descriptions.Item>

                        <Descriptions.Item label="Facebook Link">{checkAndSetDefaultValue(formData?.facebookId)}</Descriptions.Item>
                        <Descriptions.Item label="Twitter Link">{checkAndSetDefaultValue(formData?.twitterId)}</Descriptions.Item>
                        <Descriptions.Item label="Instagram Link">{checkAndSetDefaultValue(formData?.instagramId)}</Descriptions.Item>
                        <Descriptions.Item label="Youtube Channel">{checkAndSetDefaultValue(formData?.youTubeChannel)}</Descriptions.Item>
                        <Descriptions.Item label="Team BHP Link">{checkAndSetDefaultValue(formData?.teamBhp)}</Descriptions.Item>
                        <Descriptions.Item label="Mark As Default">{checkAndSetDefaultValue(formData?.defaultContactIndicator ? 'Yes' : 'No')}</Descriptions.Item>
                    </Descriptions>
                </>
            ) : (
                <AddEditForm {...formProps} />
            )}
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
