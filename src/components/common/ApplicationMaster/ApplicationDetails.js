/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { Fragment, useEffect } from 'react';
import { Input, Form, Col, Row, Switch, Select, Button } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { LANGUAGE_EN } from 'language/en';
import { ROOT_PARENT_APPLICATION, ACCESSIBLE_LOCATION_INDICATOR_SELECT_DATA } from 'constants/modules/applicationMaster';

import styles from 'assets/sass/app.module.scss';
import TreeSelectField from '../TreeSelectField';
import { customSelectBox } from 'utils/customSelectBox';

const { Option } = Select;
const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

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
            return showGlobalNotification({ notificationType: 'warning', title: sameParentAndChildWarning?.TITLE, message: sameParentAndChildWarning?.MESSAGE, placement: 'bottomRight' });
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
                        <Form.Item label="Application ID" name="applicationId" rules={[validateRequiredInputField('application ID')]}>
                            <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText('application ID')} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Name" name="applicationName" rules={[validateRequiredInputField('application name')]}>
                            <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText('application name')} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Title" name="applicationTitle" rules={[validateRequiredInputField('application title')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('application title')} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Type" name="applicationType" rules={[validateRequiredSelectField('application type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} maxLength={50} placeholder={preparePlaceholderText('application type')}>
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
                        <Form.Item name="parentApplicationId" label="Parent Application" initialValue={ROOT_PARENT_APPLICATION} rules={[validateRequiredSelectField('parent application ID')]}>
                            <TreeSelectField {...treeSelectFieldProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="accessableIndicator" label="Accessible Location" rules={[validateRequiredSelectField('Accessible Locations')]}>
                            {customSelectBox({ data: ACCESSIBLE_LOCATION_INDICATOR_SELECT_DATA, onChange: handleChangeLocations, placeholder: preparePlaceholderSelect('accessible location') })}
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Criticality Group" name="criticalityGroupMasterId" rules={[validateRequiredInputField('Application Criticality Group')]}>
                            {customSelectBox({ data: criticalityGroupData, fieldNames: { key: 'id', value: 'criticalityGroupName' }, placeholder: preparePlaceholderText('application criticality group') })}
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={false} labelAlign="left" wrapperCol={{ span: 24 }} name="documentNumRequired" label="Document number to be generated" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={handleDocReq} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="applicationStatus" label="Status" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="termAndConRequired" label="T&C Required" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="digitalSignatureRequired" label="Digital Signature Required" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="isFinanceRelated" label="Is Finance Related" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="irnIntegrationRequired" label="IRN Integration Required" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" />
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
                            Cancel
                        </Button>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                        <Button disabled={isApplicatinoOnSaveLoading || !canFormSave} loading={isApplicatinoOnSaveLoading} htmlType="submit" form="myForm" key="saveBtm" type="primary">
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default ApplicationDetails;
