/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Col, Row } from 'antd';

import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { customSelectBox } from 'utils/customSelectBox';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'components/common/Common.module.css';

const AddEditFormMain = (props) => {
    const {
        form,
        formData,
        onCloseAction,
        formActionType: { editMode, viewMode },
        onFinish,
        onFinishFailed,
    } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;

    const { ModelOptions, TaxChargesOptions, AccountDataOptions } = props;

    const isCodePresent = ({ searchkey = 'id', value, options, attibuteName }) => {
        const foundVal = !value || options?.find((element, index) => element[searchkey] === value);
        if (foundVal) return Promise.resolve();
        return Promise.reject(new Error(`${attibuteName} is not active anymore`));
    };

    const taxChargesValidation = {};
    const accountCategoryValidation = {};

    if (TaxChargesOptions && formData?.taxCategoryId) {
        if (TaxChargesOptions.find((data) => data.id === formData?.taxCategoryId)) {
            taxChargesValidation.initialValue = formData?.taxCategoryId;
        } else {
            taxChargesValidation.initialValue = formData?.taxCategoryDescription;
        }
    }
    if (AccountDataOptions && formData?.accountCategoryCode) {
        if (AccountDataOptions.find((data) => data.key === formData?.accountCategoryCode)) {
            accountCategoryValidation.initialValue = formData?.accountCategoryCode;
        } else {
            accountCategoryValidation.initialValue = formData?.accountCategoryDescription;
        }
    }

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        style: styles,
    };

    return (
        <Form form={form} autoComplete="off" layout="vertical" colon={false} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {!viewMode ? (
                        <>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formData?.modelId} name="modelId" label="Model Group (Product Hierarchy)" rules={[validateRequiredSelectField('Model Group')]}>
                                        {customSelectBox({ data: ModelOptions, placeholder: preparePlaceholderSelect('Model Group'), fieldNames: { key: 'id', value: 'value' }, disabled: editMode })}
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item {...taxChargesValidation} name="taxCategoryId" label="Tax/Charge Category" rules={[validateRequiredSelectField('Tax/Charge Category'), { validator: (rule, value) => isCodePresent({ searchkey: 'id', value, options: TaxChargesOptions, attibuteName: 'Tax/Charge Category' }) }]}>
                                        {customSelectBox({ data: TaxChargesOptions, placeholder: preparePlaceholderSelect('Tax/Charge Category'), fieldNames: { key: 'id', value: 'value' }, disabled: editMode })}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item {...accountCategoryValidation} label="Account category" name="accountCategoryCode" rules={[validateRequiredSelectField('Account category'), { validator: (rule, value) => isCodePresent({ searchkey: 'key', value, options: AccountDataOptions, attibuteName: 'Account Category' }) }]}>
                                        {customSelectBox({ data: AccountDataOptions, placeholder: preparePlaceholderSelect('Account Category') })}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <ViewDetail {...viewProps} />
                    )}
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
