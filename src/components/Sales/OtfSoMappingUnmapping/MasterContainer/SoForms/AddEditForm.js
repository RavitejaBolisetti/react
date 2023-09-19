/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form } from 'antd';
import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { OTF_SO_MAPPING_UNMAPPING_CONSTANTS } from 'components/Sales/OtfSoMappingUnmapping/Constants';

import styles from 'assets/sass/app.module.scss';
import { ListSkeleton } from 'components/common/Skeleton';
const { Search } = Input;

const AddEditFormMain = ({ formType, disabledProps, handleSearchChange, isLoading, filterString, handleResetData, status }) => {
    if (isLoading && formType === filterString?.formType) return <ListSkeleton count={12} height={30} />;
    const hideFields = status?.key === OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.RESERVE_QUOTA?.key && formType === 'FORM_1';

    return (
        <>
            {hideFields && (
                <Form.Item label="SO No." name={[formType, 'soNumber']} rules={[validateRequiredInputField('SO number'), validationFieldLetterAndNumber('SO number')]}>
                    <Search placeholder="Search by SO Number" allowClear onSearch={(value) => handleSearchChange(value, formType)} onChange={() => handleResetData(formType, ['soNumber'])} className={styles.headerSearchField} />
                </Form.Item>
            )}
            {hideFields && (
                <Form.Item label="SO Date" name={[formType, 'soDate']}>
                    <Input {...disabledProps} />
                </Form.Item>
            )}
            {!hideFields && (
                <Form.Item label="Booking No." name={[formType, 'otfNumber']} rules={[validateRequiredInputField('Booking number'), validationFieldLetterAndNumber('Booking number')]}>
                    <Search placeholder="Search by Booking Number" allowClear onSearch={(value) => handleSearchChange(value, formType)} onChange={() => handleResetData(formType)} className={styles.headerSearchField} />
                </Form.Item>
            )}
            {!hideFields && (
                <Form.Item label="Booking Date" name={[formType, 'otfDate']}>
                    <Input {...disabledProps} />
                </Form.Item>
            )}
            {!hideFields && (
                <Form.Item label="SO Number" name={[formType, 'soNumber']}>
                    <Input {...disabledProps} />
                </Form.Item>
            )}
            {!hideFields && (
                <Form.Item label="SO Date" name={[formType, 'soDate']}>
                    <Input {...disabledProps} />
                </Form.Item>
            )}

            <Form.Item label="SO Status" name={[formType, 'soStatus']}>
                <Input {...disabledProps} />
            </Form.Item>
            <Form.Item hidden initialValue={formType} name={[formType, 'formType']} />
            <Form.Item hidden initialValue={formType} name={[formType, 'soStatusCode']} />
            {!hideFields && (
                <>
                    <Form.Item label="Customer ID" name={[formType, 'customerId']}>
                        <Input {...disabledProps} />
                    </Form.Item>
                    <Form.Item label="Customer Name" name={[formType, 'customerName']}>
                        <Input {...disabledProps} />
                    </Form.Item>
                    <Form.Item label="Mobile No." name={[formType, 'mobileNumber']}>
                        <Input {...disabledProps} />
                    </Form.Item>
                </>
            )}

            <Form.Item label="Chassis" name={[formType, 'chasisNumber']}>
                <Input {...disabledProps} />
            </Form.Item>
            <Form.Item label="Model Group" name={[formType, 'modelGroup']}>
                <Input {...disabledProps} />
            </Form.Item>
            <Form.Item label="Model Variant" name={[formType, 'modelVariant']}>
                <Input {...disabledProps} />
            </Form.Item>
            <Form.Item label="Model Description" name={[formType, 'modelDescription']}>
                <Input {...disabledProps} />
            </Form.Item>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
