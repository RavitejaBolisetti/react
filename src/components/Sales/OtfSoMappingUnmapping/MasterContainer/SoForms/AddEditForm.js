/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form } from 'antd';
import { validateAlphanumericWithSpaceHyphenPeriod, validateRequiredInputField } from 'utils/validation';
import { OTF_SO_MAPPING_UNMAPPING_CONSTANTS } from 'components/Sales/OtfSoMappingUnmapping/Constants';

import styles from 'assets/sass/app.module.scss';
import { ListSkeleton } from 'components/common/Skeleton';
import { translateContent } from 'utils/translateContent';
const { Search } = Input;

const AddEditFormMain = ({ formType, disabledProps, handleSearchChange, isLoading, filterString, handleResetData, status }) => {
    if (isLoading && formType === filterString?.formType) return <ListSkeleton count={12} height={30} />;
    const hideFields = status?.key === OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.RESERVE_QUOTA?.key && formType === 'FORM_1';

    return (
        <>
            {hideFields && (
                <Form.Item label={translateContent('bookingSoMappUnmapp.label.soNumber')} name={[formType, 'soNumber']} rules={[validateRequiredInputField(translateContent('bookingSoMappUnmapp.label.soNumber')), validateAlphanumericWithSpaceHyphenPeriod(translateContent('bookingSoMappUnmapp.label.soNumber'))]}>
                    <Search placeholder={translateContent('bookingSoMappUnmapp.label.soNumber')} allowClear onSearch={(value) => handleSearchChange(value, formType)} onChange={() => handleResetData(formType, ['soNumber'])} className={styles.headerSearchField} />
                </Form.Item>
            )}
            {hideFields && (
                <Form.Item label={translateContent('bookingSoMappUnmapp.label.soDate')} name={[formType, 'soDate']}>
                    <Input {...disabledProps} />
                </Form.Item>
            )}
            {!hideFields && (
                <Form.Item label={translateContent('bookingSoMappUnmapp.label.bookingNumber')} name={[formType, 'otfNumber']} rules={[validateRequiredInputField(translateContent('bookingSoMappUnmapp.label.bookingNumber')), validateAlphanumericWithSpaceHyphenPeriod(translateContent('bookingSoMappUnmapp.label.bookingNumber'))]}>
                    <Search placeholder={translateContent('bookingSoMappUnmapp.label.bookingNumber')} allowClear onSearch={(value) => handleSearchChange(value, formType)} onChange={() => handleResetData(formType)} className={styles.headerSearchField} />
                </Form.Item>
            )}
            {!hideFields && (
                <Form.Item label={translateContent('bookingSoMappUnmapp.label.bookingDate')} name={[formType, 'otfDate']}>
                    <Input {...disabledProps} />
                </Form.Item>
            )}
            {!hideFields && (
                <Form.Item label={translateContent('bookingSoMappUnmapp.label.soNumber')} name={[formType, 'soNumber']}>
                    <Input {...disabledProps} />
                </Form.Item>
            )}
            {!hideFields && (
                <Form.Item label={translateContent('bookingSoMappUnmapp.label.soDate')} name={[formType, 'soDate']}>
                    <Input {...disabledProps} />
                </Form.Item>
            )}

            <Form.Item label={translateContent('bookingSoMappUnmapp.label.soStatus')} name={[formType, 'soStatus']}>
                <Input {...disabledProps} />
            </Form.Item>
            <Form.Item hidden initialValue={formType} name={[formType, 'formType']} />
            <Form.Item hidden initialValue={formType} name={[formType, 'soStatusCode']} />
            {!hideFields && (
                <>
                    <Form.Item label={translateContent('bookingSoMappUnmapp.label.customerId')} name={[formType, 'customerId']}>
                        <Input {...disabledProps} />
                    </Form.Item>
                    <Form.Item label={translateContent('bookingSoMappUnmapp.label.customerName')} name={[formType, 'customerName']}>
                        <Input {...disabledProps} />
                    </Form.Item>
                    <Form.Item label={translateContent('bookingSoMappUnmapp.label.mobileNumber')} name={[formType, 'mobileNumber']}>
                        <Input {...disabledProps} />
                    </Form.Item>
                </>
            )}

            <Form.Item label={translateContent('bookingSoMappUnmapp.label.chassisNumber')} name={[formType, 'chasisNumber']}>
                <Input {...disabledProps} />
            </Form.Item>
            <Form.Item label={translateContent('bookingSoMappUnmapp.label.modelGroup')} name={[formType, 'modelGroup']}>
                <Input {...disabledProps} />
            </Form.Item>
            <Form.Item label={translateContent('bookingSoMappUnmapp.label.modelVariant')} name={[formType, 'modelVariant']}>
                <Input {...disabledProps} />
            </Form.Item>
            <Form.Item label={translateContent('bookingSoMappUnmapp.label.modelDescription')} name={[formType, 'modelDescription']}>
                <Input {...disabledProps} />
            </Form.Item>
            <Form.Item  name={[formType, 'orderStatus']} hidden/>
            <Form.Item  name={[formType, 'revisedModel']} hidden/>
                       
        </>
    );
};

export const AddEditForm = AddEditFormMain;
