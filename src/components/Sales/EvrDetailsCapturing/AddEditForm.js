/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Switch, DatePicker } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import { ViewDetail } from './ViewDetail';

import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { form, formData, buttonData, setButtonData, typeData, fieldNames, editProductData, handleButtonClick, onCloseAction, formActionType, onFinish, onFinishFailed, viewProductData, modelGroupArr, setViewProductData, responseData } = props;
    const { hoPriceDetailData, checkedKeys, setCheckedKeys } = props;
    const [searchValue, setSearchValue] = useState('');

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
        isVisible: formActionType?.viewMode,
        formData,
        styles,
        typeData,
        formActionType,
        viewProductData,
        modelGroupArr,
        setViewProductData,
        hoPriceDetailData,
        responseData,
    };

    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
        setButtonData((prev) => ({ ...prev, formBtnActive: true }));
    };

    const myProps = {
        checkable: true,
        isTreeViewVisible: true,
        fieldNames,
        treeData: editProductData,
        searchValue,
        setSearchValue,
        onCheck,
        checkedKeys,
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {formActionType?.viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.state} label="VIN" name="vin">
                                            <Input placeholder={preparePlaceholderText('vin')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.city} label="Model Group" name="modelGroup">
                                            <Input placeholder={preparePlaceholderText('Model Group')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.dealerParent} label="Model Code" name="modelCode">
                                            <Input placeholder={preparePlaceholderText('Model Code')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.state} label="Model Description" name="modelDescription">
                                            <Input placeholder={preparePlaceholderText('Model Description')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.city} label="GRN ID" name="grnId">
                                            <Input placeholder={preparePlaceholderText('GRN ID')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label="GRN Date" name="grnDate">
                                            <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.state} label="GRN Status" name="grnStatus">
                                            <Input placeholder={preparePlaceholderText('GRN Status')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.city} label="Model Group" name="modelGroup">
                                            <Input placeholder={preparePlaceholderText('Model Group')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.dealerParent} label="Model Code" name="modelCode">
                                            <Input placeholder={preparePlaceholderText('Model Code')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Col>
                </Row>

                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%' });
