/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Input, Form, Col, Row, Switch, Select, Button } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { ROOT_PARENT_APPLICATION, ACCESSIBLE_LOCATION_INDICATOR_SELECT_DATA } from 'constants/modules/applicationMaster';

import TreeSelectField from '../TreeSelectField';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Option } = Select;
const ApplicationDetails = ({ setCanFormSave, form, onFinishFailed = () => {}, parentAppCode, isReadOnly, isFieldDisable, onFinish, setIsRestrictedLocation, setParentAppCode, setIsDocumentToGenerate, finalFormdata, criticalityGroupData, configurableParamData, menuData, setSelectedTreeKey, selectedTreeKey, showGlobalNotification, isApplicatinoOnSaveLoading, canFormSave, onCloseAction }) => {
    useEffect(() => {
        form?.setFieldsValue({ ...finalFormdata?.applicationDetails, applicationStatus: finalFormdata?.applicationDetails?.status, parentApplicationId: finalFormdata?.applicationDetails?.parentApplicationId || ROOT_PARENT_APPLICATION });
        setParentAppCode(finalFormdata?.applicationDetails?.parentApplicationId || ROOT_PARENT_APPLICATION);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, finalFormdata?.applicationDetails, finalFormdata?.applicationDetails?.parentApplicationId, setSelectedTreeKey]);

    const handleChangeLocations = (value) => {
        setIsRestrictedLocation(value === 2);
    };
    const handleDocReq = (val) => {
        setIsDocumentToGenerate(val);
    };
    const fieldNames = { label: 'menuTitle', value: 'menuId', children: 'subMenu' };

    const handleSelectTreeClick = (value) => {
        if (value === finalFormdata?.applicationDetails?.applicationId) {
            return showGlobalNotification({ notificationType: 'warning', title: translateContent('global.notificationSuccess.warning'), message: translateContent('global.generalMessage.selectDifferentParent'), placement: 'bottomRight' });
        }

        setCanFormSave(true);
        setParentAppCode(value);
    };

    const onFieldsChange = () => {
        setCanFormSave(true);
    };

    const treeSelectFieldProps = {
        treeFieldNames: fieldNames,
        treeData: menuData,
        treeDisabled: isReadOnly || !menuData?.length,
        selectedTreeSelectKey: parentAppCode,
        handleSelectTreeClick,
        defaultValue: finalFormdata?.applicationDetails?.parentApplicationId || ROOT_PARENT_APPLICATION,
        placeholder: preparePlaceholderSelect('parent'),
    };

    return (
        <>
            <Form form={form} id="myForm" onFieldsChange={onFieldsChange} autoComplete="off" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('applicationMaster.label.applicationId')} name="applicationId" rules={[validateRequiredInputField(translateContent('applicationMaster.validation.applicationId'))]}>
                            <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText(translateContent('applicationMaster.placeholder.applicationId'))} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('applicationMaster.label.applicationName')} name="applicationName" rules={[validateRequiredInputField(translateContent('applicationMaster.validation.applicationName'))]}>
                            <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText(translateContent('applicationMaster.placeholder.applicationName'))} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('applicationMaster.label.applicationTitle')} name="applicationTitle" rules={[validateRequiredInputField(translateContent('applicationMaster.validation.applicationTitle'))]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('applicationMaster.placeholder.applicationTitle'))} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('applicationMaster.label.applicationType')} name="applicationType" rules={[validateRequiredSelectField(translateContent('applicationMaster.validation.applicationType'))]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} maxLength={50} placeholder={preparePlaceholderText(translateContent('applicationMaster.placeholder.applicationType'))}>
                                {configurableParamData?.map((type) => (
                                    <Option key={'at' + type.value} value={type?.value}>
                                        {type?.value}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="parentApplicationId" label={translateContent('applicationMaster.label.parentApplicationId')} initialValue={ROOT_PARENT_APPLICATION} rules={[validateRequiredSelectField(translateContent('applicationMaster.validation.parentApplicationId'))]}>
                            <TreeSelectField {...treeSelectFieldProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="accessableIndicator" label={translateContent('applicationMaster.label.accessibleLocation')} rules={[validateRequiredSelectField(translateContent('applicationMaster.validation.accessibleLocation'))]}>
                            {customSelectBox({ data: ACCESSIBLE_LOCATION_INDICATOR_SELECT_DATA, onChange: handleChangeLocations, placeholder: preparePlaceholderSelect(translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('applicationMaster.label.criticalityGroupName')} name="criticalityGroupMasterId" rules={[validateRequiredInputField(translateContent('applicationMaster.validation.criticalityGroupName'))]}>
                            {customSelectBox({ data: criticalityGroupData, fieldNames: { key: 'id', value: 'criticalityGroupName' }, placeholder: preparePlaceholderText(translateContent('applicationMaster.placeholder.criticalityGroupName')) })}
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={false} labelAlign="left" wrapperCol={{ span: 24 }} name="documentNumRequired" label={translateContent('applicationMaster.label.documentNumRequired')} valuePropName="checked">
                            <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" onChange={handleDocReq} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="applicationStatus" label={translateContent('global.label.status')} valuePropName="checked">
                            <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="termAndConRequired" label={translateContent('applicationMaster.label.termAndConRequired')} valuePropName="checked">
                            <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="digitalSignatureRequired" label={translateContent('applicationMaster.label.digitalSignatureRequired')} valuePropName="checked">
                            <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="isFinanceRelated" label={translateContent('applicationMaster.label.isFinanceRelated')} valuePropName="checked">
                            <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="irnIntegrationRequired" label={translateContent('applicationMaster.label.irnIntegrationRequired')} valuePropName="checked">
                            <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item hidden name="id">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20} className={styles.formFooterNew}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                        <Button danger onClick={onCloseAction}>
                            {translateContent('global.buttons.cancel')}
                        </Button>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                        <Button disabled={isApplicatinoOnSaveLoading || !canFormSave} loading={isApplicatinoOnSaveLoading} htmlType="submit" form="myForm" key="saveBtm" type="primary">
                            {translateContent('global.buttons.save')}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default ApplicationDetails;
