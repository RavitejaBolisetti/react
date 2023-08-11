/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Descriptions, Divider } from 'antd';
import AddEditForm from './AddEditForm';
import UploadUtils from './../UploadUtils';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

import { CUSTOMER_TYPE } from 'constants/CustomerType';

const ViewDetailBase = (props) => {
    const { formData, styles } = props;
    const { setShowAddEditForm, setContactData, onFinish, form, isEditing, isLoading, typeData } = props;
    const { customerType } = props;

    const [uploadedFile, setUploadedFile] = useState();
    const [base64Img, setBase64Img] = useState('');

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
        uploadedFile,
        setUploadedFile,
        base64Img,
        setBase64Img,
        ...props,
    };

    return (
        <div className={styles.viewDrawerContainer}>
            {!isEditing ? (
                <>
                    <Divider />
                    {/* <UploadUtils {...formProps} /> */}
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Purpose of Contact">{checkAndSetDefaultValue(getCodeValue(typeData?.PURPOSE, formData?.purposeOfContact), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Alternate Mobile Numbe">{checkAndSetDefaultValue(formData?.alternateMobileNumber, isLoading)}</Descriptions.Item>
                        {customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? <Descriptions.Item label="Relation">{checkAndSetDefaultValue(getCodeValue(typeData?.FAMLY_RELTN, formData?.relationCode), isLoading)}</Descriptions.Item> : <Descriptions.Item label="Designation">{checkAndSetDefaultValue(formData?.designation, isLoading)}</Descriptions.Item>}

                        <Descriptions.Item label="Gender">{checkAndSetDefaultValue(getCodeValue(typeData?.GENDER_CD, formData?.gender), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Title">{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, formData?.title), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="First Name">{checkAndSetDefaultValue(formData?.firstName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Middle Name">{checkAndSetDefaultValue(formData?.middleName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Last/Surname">{checkAndSetDefaultValue(formData?.lastName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="E-mail">{checkAndSetDefaultValue(formData?.contactEmailId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Alternate Email ID">{checkAndSetDefaultValue(formData?.alternateEmailId, isLoading)}</Descriptions.Item>

                        {/* <Descriptions.Item label="Facebook Link">{checkAndSetDefaultValue(formData?.facebookId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Twitter Link">{checkAndSetDefaultValue(formData?.twitterId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Instagram Link">{checkAndSetDefaultValue(formData?.instagramId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Youtube Channel">{checkAndSetDefaultValue(formData?.youTubeChannel, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Team BHP Link">{checkAndSetDefaultValue(formData?.teamBhp, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Mark As Default">{checkAndSetDefaultValue(formData?.defaultContactIndicator ? 'Yes' : 'No', isLoading)}</Descriptions.Item> */}
                    </Descriptions>
                </>
            ) : (
                <AddEditForm {...formProps} />
            )}
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
