import React, { Fragment, useEffect } from 'react';
import { Input, Form, Col, Row, Switch, Select, TreeSelect } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';

import styles from './ApplicationMaster.module.css';
import TreeSelectField from '../TreeSelectField';

const { Option } = Select;

const ApplicationDetails = ({ form, onFinishFailed = () => {}, isReadOnly, isFieldDisable, onFinish, setIsRestrictedLocation, setIsDocumentToGenerate, finalFormdata, criticalityGroupData, configurableParamData, menuData, setSelectedTreeKey, selectedTreeKey }) => {

    useEffect(() => {
        form.setFieldsValue({ ...finalFormdata?.applicationDetails });
        setSelectedTreeKey(finalFormdata?.applicationDetails.parentApplicationId);
    }, [form, finalFormdata?.applicationDetails, finalFormdata?.applicationDetails?.parentApplicationId, setSelectedTreeKey]);

    const handleChangeLocations = (value) => {
        setIsRestrictedLocation(value === '2');
    };
    const handleDocReq = (val) => {
        setIsDocumentToGenerate(val);
    };
    const fieldNames = { label: 'menuTitle', value: 'menuId', children: 'subMenu' };

    const handleSelectTreeClick = (value) => {
        setSelectedTreeKey(value);
    };

    const treeSelectFieldProps = {
        treeFieldNames: fieldNames,
        treeData: menuData,
        treeDisabled: isReadOnly,
        selectedTreeSelectKey: selectedTreeKey,
        handleSelectTreeClick,
        defaultValue: finalFormdata?.applicationDetails?.parentApplicationId,
        placeholder: preparePlaceholderSelect('parent'),
    };

    return (
        <Fragment>
            <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application ID" name="applicationId" rules={[validateRequiredInputField('Application ID')]}>
                            <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText('Application ID')} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Name" name="applicationName" rules={[validateRequiredInputField('Application Name'), validateRequiredInputField('Application Name')]}>
                            <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText('Application Name')} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Title" name="applicationTitle" rules={[validateRequiredInputField('Application Title'), validateRequiredInputField('Application Title')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Application Title')} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item className={styles.selectMgTop6} label="Application Type" name="applicationType" rules={[validateRequiredInputField('Application Type'), validationFieldLetterAndNumber('Application Type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} maxLength={50} placeholder={preparePlaceholderText('Application Type')}>
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
                        {/* <Select  placeholder={preparePlaceholderSelect('Parent Application')} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Option value="all"></Option>
                            </Select> */}
                        <Form.Item className={styles.selectMgTop6} name="parentApplicationId" label="Parent Application" rules={[validateRequiredSelectField('Parent Application ID')]}>
                            <TreeSelectField {...treeSelectFieldProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item className={styles.selectMgTop6} name="accessableIndicator" label="Accessible Location" rules={[validateRequiredSelectField('Accessible Locations')]}>
                            <Select onChange={handleChangeLocations} placeholder={preparePlaceholderSelect('Accessible Location')} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Option value="0">Accessible to all</Option>
                                <Option value="1">Not accessible to all</Option>
                                <Option value="2">Restricted Accessible</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item className={styles.selectMgTop6} label="Application Criticality Group" name="criticalityGroupCode" rules={[validateRequiredInputField('Application Criticality Group')]}>
                            <Select maxLength={50} placeholder={preparePlaceholderText('Application Criticality Group')} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                {criticalityGroupData?.map((cg) => (
                                    <Option value={cg?.id}>{cg?.criticalityGroupName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="documentNumRequired" label="Document number to be generated" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={handleDocReq} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Status" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item hidden name="id">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    );
};

export default ApplicationDetails;
