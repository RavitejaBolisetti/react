/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
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
    // const findModelId = (data, name) => {
    //     const foundData = data?.find((element, index) => {
    //         if (element?.value === name) {
    //             return element;
    //         }
    //     });
    //     return foundData?.id ?? 'NA';
    // };

    useEffect(() => {
        if (editMode) {
            form.setFieldsValue({ ...formData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode]);

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
                                    <Form.Item name="modelId" label="Model Group (Product Hierarchy)" rules={[validateRequiredSelectField('Model Group')]}>
                                        {customSelectBox({ data: ModelOptions, placeholder: preparePlaceholderSelect('Model Group'), fieldNames: { key: 'id', value: 'value' }, disabled: editMode })}
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="taxCategoryId" label="Tax/Charge Category" rules={[validateRequiredSelectField('Tax/Charge Category')]}>
                                        {customSelectBox({ data: TaxChargesOptions, placeholder: preparePlaceholderSelect('Tax/Charge Category'), fieldNames: { key: 'id', value: 'value' }, disabled: editMode })}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item label="Account category" name="accountCategoryCode" rules={[validateRequiredSelectField('Account category')]}>
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
