import React, { useState } from 'react';
import { Col, Input, Form, Row, Switch, Select, Checkbox, Upload, Button } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateAlphanumericWithSpace } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { UploadOutlined } from '@ant-design/icons';

import styles from 'components/common/Common.module.css';
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed } = props;

    const { buttonData, setButtonData, handleButtonClick, divisionData, departmentData, roleData } = props;
    const [filteredDepartmentData, setFilteredDepartmentData] = useState([]);
    const [filteredRoleData, setFilteredRoletData] = useState([]);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleDivisionChange = (division) => {
        form.setFieldValue('departmentName', undefined);
        setFilteredDepartmentData(departmentData?.filter((i) => i?.divisionCode === division));
    };
    const handleDepartmentChange = (department) => {
        form.setFieldValue('roleDescription', undefined);
        setFilteredRoletData(roleData?.filter((i) => i?.departmentCode === department));
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {viewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.divisionCode} label="Division Name" name="divisionCode" rules={[validateRequiredSelectField('Division Name')]}>
                                <Select placeholder={preparePlaceholderSelect('Division Name')} allowClear onChange={handleDivisionChange}>
                                    {divisionData?.map((item) => (
                                        <Option value={item?.code}>{item?.divisionName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.departmentCode} label="Department Name" name="departmentCode" rules={[validateRequiredSelectField('Department Name')]}>
                                <Select placeholder={preparePlaceholderSelect('Department Name')} allowClear onChange={handleDepartmentChange}>
                                    {filteredDepartmentData?.map((item) => (
                                        <Option value={item?.departmentCode}>{item?.departmentName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.roleCode} label="Role Description" name="roleCode" rules={[validateRequiredSelectField('Role Description')]}>
                                <Select placeholder={preparePlaceholderSelect('Role Description')}>
                                    {filteredRoleData?.map((item) => (
                                        <Option value={item?.roleCode}>{item?.roleDescription}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.designationCode} label="Designation Code" name="designationCode" rules={[validateRequiredInputField('Designation Code'), validationFieldLetterAndNumber('Location Type Code')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Designation Code')} maxLength={6} disabled={editMode ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Designation Description" initialValue={formData?.designationDescription} rules={[validateRequiredInputField('Designation Description'), validateAlphanumericWithSpace('Location Type Description')]} name="designationDescription">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Designation Description')} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isCommonIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isCommonIndicatorRequired">
                                <Checkbox>Common</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isManpowerIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isManpowerIndicatorRequired">
                                <Checkbox>Manpower Required</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isLeadershipIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isLeadershipIndicatorRequired">
                                <Checkbox>Leadship</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isAccountsDataIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isAccountsDataIndicatorRequired">
                                <Checkbox>Accounts Data</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isDealerHrIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isDealerHrIndicatorRequired">
                                <Checkbox>Dealer HR</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isCertifiedIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isCertifiedIndicatorRequired">
                                <Checkbox>Certified</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isNeftDetailsIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isNeftDetailsIndicatorRequired">
                                <Checkbox>NEFT Details</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isCapabilityIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isCapabilityIndicatorRequired">
                                <Checkbox>Capability (L1/L2/L3)</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isFftDepartmentApprovalIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isFftDepartmentApprovalIndicatorRequired">
                                <Checkbox>FFT Department Approval</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isCreateUserIdRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isCreateUserIdRequired">
                                <Checkbox>Create User Id</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    {/* <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Upload Job Description</Button>
                    </Upload> */}
                </>
            )}

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
