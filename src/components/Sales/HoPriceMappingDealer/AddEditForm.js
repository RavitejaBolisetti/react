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
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { form, formData, buttonData, setButtonData, typeData, fieldNames, editProductData, handleButtonClick, onCloseAction, formActionType, onFinish, viewProductData, modelGroupArr, setViewProductData, responseData } = props;
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
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {formActionType?.viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <h4>{translateContent('hoPriceMapping.heading.dealerList')}</h4>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.state} label={translateContent('hoPriceMapping.label.state')} name="state">
                                            <Input placeholder={preparePlaceholderText(translateContent('hoPriceMapping.label.state'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.city} label={translateContent('hoPriceMapping.label.city')} name="city">
                                            <Input placeholder={preparePlaceholderText(translateContent('hoPriceMapping.label.city'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.dealerParent} label={translateContent('hoPriceMapping.label.dealerParent')} name="dealerParent">
                                            <Input placeholder={preparePlaceholderText(translateContent('hoPriceMapping.label.dealerParent'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.dealerBranch} label={translateContent('hoPriceMapping.label.dealerLocation')} name="dealerBranch">
                                            <Input placeholder={preparePlaceholderText(translateContent('hoPriceMapping.label.dealerBranch'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.dealerSelectOnRoadPrice} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="dealerSelectOnRoadPrice" label={translateContent('hoPriceMapping.label.dealerSelectOnRoadPrice')}>
                                            <Switch checkedChildren={translateContent('global.yesNo.yes')} unCheckedChildren={translateContent('global.yesNo.no')} onChange={(checked) => (checked ? 1 : 0)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <h4>{translateContent('hoPriceMapping.heading.modelDetails')}</h4>
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
