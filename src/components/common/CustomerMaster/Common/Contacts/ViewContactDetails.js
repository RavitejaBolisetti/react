/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Descriptions } from 'antd';

import AddEditForm from './AddEditForm';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

import { CUSTOMER_TYPE } from 'constants/CustomerType';
import { translateContent } from 'utils/translateContent';

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
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('customerMaster.label.purpose')}>{checkAndSetDefaultValue(getCodeValue(typeData?.PURPOSE, formData?.purposeOfContact), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.mobileNo')}>{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.alternateNo')}>{checkAndSetDefaultValue(formData?.alternateMobileNumber, isLoading)}</Descriptions.Item>
                        {customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? <Descriptions.Item label={translateContent('customerMaster.label.relationship')}>{checkAndSetDefaultValue(getCodeValue(typeData?.FAMLY_RELTN, formData?.relationCode), isLoading)}</Descriptions.Item> : <Descriptions.Item label={translateContent('customerMaster.label.designation')}>{checkAndSetDefaultValue(formData?.designation, isLoading)}</Descriptions.Item>}

                        <Descriptions.Item label={translateContent('customerMaster.label.gender')}>{checkAndSetDefaultValue(getCodeValue(typeData?.GENDER_CD, formData?.gender), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.title')}>{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, formData?.title), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.firstName')}>{checkAndSetDefaultValue(formData?.firstName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.middleName')}>{checkAndSetDefaultValue(formData?.middleName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.lastSurname')}>{checkAndSetDefaultValue(formData?.lastName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.eMail')}>{checkAndSetDefaultValue(formData?.contactEmailId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.alternateEmail')}>{checkAndSetDefaultValue(formData?.alternateEmailId, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </>
            ) : (
                <AddEditForm {...formProps} />
            )}
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
