/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Switch } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import LeftPanel from 'components/common/LeftPanel';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
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
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <h4>Dealer List</h4>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.state} label="State" name="state">
                                            <Input placeholder={preparePlaceholderText('State Code')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.city} label="City" name="city">
                                            <Input placeholder={preparePlaceholderText('City')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.dealerParent} label="Dealer Parent" name="dealerParent">
                                            <Input placeholder={preparePlaceholderText('Dealer Parent')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.dealerBranch} label="Dealer Location" name="dealerBranch">
                                            <Input placeholder={preparePlaceholderText('Dealer Branch')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.dealerSelectOnRoadPrice} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="dealerSelectOnRoadPrice" label="Dealer Selected for On Road Price?">
                                            <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? 1 : 0)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <h4>Model Details</h4>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <LeftPanel {...myProps} />
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
