/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import AddEditForm from './AddEditForm';
import UploadUtils from './../UploadUtils';

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
                        <Descriptions.Item label="Purpose of Contact">{formData?.purposeOfContact}</Descriptions.Item>
                        <Descriptions.Item label="Mobile Number">{formData?.mobileNumber}</Descriptions.Item>
                        <Descriptions.Item label="Alternate Mobile Numbe">{formData?.alternateMobileNumber}</Descriptions.Item>
                        <Descriptions.Item label="Relation">{formData?.relationCode}</Descriptions.Item>
                        <Descriptions.Item label="Gender">{formData?.gender}</Descriptions.Item>
                        <Descriptions.Item label="Title">{formData?.title}</Descriptions.Item>
                        <Descriptions.Item label="First Name">{formData?.firstName}</Descriptions.Item>
                        <Descriptions.Item label="Middle Name">{formData?.middleName}</Descriptions.Item>
                        <Descriptions.Item label="Last/Surname">{formData?.lastName}</Descriptions.Item>
                        <Descriptions.Item label="E-mail">{formData?.contactEmailId}</Descriptions.Item>
                        <Descriptions.Item label="Alternate Email ID">{formData?.alternateEmailId}</Descriptions.Item>

                        <Descriptions.Item label="Facebook Link">{formData?.facebookId}</Descriptions.Item>
                        <Descriptions.Item label="Twitter Link">{formData?.twitterId}</Descriptions.Item>
                        <Descriptions.Item label="Instagram Link">{formData?.instagramId}</Descriptions.Item>
                        <Descriptions.Item label="Youtube Channel">{formData?.youTubeChannel}</Descriptions.Item>
                        <Descriptions.Item label="Team BHP Link">{formData?.teamBhp}</Descriptions.Item>
                        <Descriptions.Item label="Mark As Default">{formData?.defaultContactIndicator ? 'Yes' : 'No'}</Descriptions.Item>
                    </Descriptions>
                </>
            ) : (
                <AddEditForm {...formProps} />
            )}
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
