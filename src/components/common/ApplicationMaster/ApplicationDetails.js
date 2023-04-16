import React, { Fragment, useEffect } from 'react';
import { Input, Form, Col, Row, Switch, Select, TreeSelect } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';

import styles from './ApplicationMaster.module.css';
import TreeSelectField from '../TreeSelectField';

const { Option } = Select;

const ApplicationDetails = ({ form, onFinishFailed = () => {}, isReadOnly = false, onFinish, setIsRestrictedLocation, setIsDocumentToGenerate, finalFormdata, criticalityGroupData, configurableParamData, menuData,setSelectedTreeKey, selectedTreeKey }) => {
    const disabledProps = { disabled: isReadOnly };

    useEffect(() => {
        form.setFieldsValue(finalFormdata?.applicationDetails);
    }, [form, finalFormdata]);

    const handleChangeLocations = (value) => {
        setIsRestrictedLocation(value === '2');
    };
    const handleDocReq = (val) => {
        setIsDocumentToGenerate(val);
    };
    const fieldNames = { label: 'menuTitle', value: 'menuId', children: 'subMenu' };
    // const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subGeo' };
    console.log('menuData', menuData);

    const handleSelectTreeClick =(value)=>{
        console.log('Vlaue', value)
        setSelectedTreeKey(value)
    };

    const treeSelectFieldProps = {
        treeFieldNames: fieldNames,
        treeData: menuData,
        // treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey: selectedTreeKey,
        handleSelectTreeClick,
        // defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('parent'),
    };

    return (
        <Fragment>
            <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application ID" name="applicationId" rules={[validateRequiredInputField('Application ID'), validationFieldLetterAndNumber('Application ID')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Application ID')} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Name" name="applicationName" rules={[validateRequiredInputField('Application Name'), validateRequiredInputField('Application Name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Application Name')} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Title" name="menuTitle" rules={[validateRequiredInputField('Application Title'), validateRequiredInputField('Application Title')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Application Title')} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item className={styles.selectMgTop6} label="Application Type" name="applicationType" rules={[validateRequiredInputField('Application Type'), validationFieldLetterAndNumber('Application Type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} maxLength={50} placeholder={preparePlaceholderText('Application Type')} {...disabledProps}>
                                {configurableParamData?.map((type) => (
                                    <Option value={type.value}>{type.value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {/* parent application id */}
                        {/* <Form.Item className={styles.selectMgTop6} name="parentApplicationId" label="Parent Application" rules={[validateRequiredSelectField('Parent Application ID')]}> */}
                        {/* <Select {...disabledProps} placeholder={preparePlaceholderSelect('Parent Application')} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Option value="all"></Option>
                            </Select> */}
                        <TreeSelectField {...treeSelectFieldProps} />
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item className={styles.selectMgTop6} name="accessibleLocations" label="Accessible Location" rules={[validateRequiredSelectField('Accessible Locations')]}>
                            <Select onChange={handleChangeLocations} {...disabledProps} placeholder={preparePlaceholderSelect('Accessible Location')} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Option value="0">Accessible to all</Option>
                                <Option value="1">Not accessible to all</Option>
                                <Option value="2">Restricted Accessible</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item className={styles.selectMgTop6} label="Application Criticality Group" name="criticalityGroupCode" rules={[validateRequiredInputField('Application Criticality Group'), validationFieldLetterAndNumber('Application Criticality Group')]}>
                            <Select maxLength={50} placeholder={preparePlaceholderText('Application Criticality Group')} {...disabledProps} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                {criticalityGroupData?.map((cg) => (
                                    <Option value={cg.criticalityGroupCode}>{cg?.criticalityGroupName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="documentNumRequired" label="Document not to be generated" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={handleDocReq} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="activeIndicator" label="Status" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    );
};

export default ApplicationDetails;
