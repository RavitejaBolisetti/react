import React from 'react';
import { Col, Input, Form, Row, Switch, Select } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateAlphanumericWithSpace } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed } = props;
    const { isDivisionLoading, divisionData } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleDivisionChange = (division) => {
        form.setFieldValue('divisionCodeDisplay', divisionData?.find((i) => i?.code === division)?.code);
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
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.divisionCode} label="Division Name" name="divisionCode" rules={[validateRequiredSelectField('Division Name')]}>
                                <Select placeholder={preparePlaceholderSelect('Division')} loading={isDivisionLoading} onChange={handleDivisionChange}>
                                    {divisionData?.map((item) => (
                                        <Option value={item?.code}>{item?.divisionName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Division Code" initialValue={formData?.divisionCode} name="divisionCodeDisplay" rules={[validateRequiredInputField('Division Code')]}>
                                <Input placeholder={preparePlaceholderText('Division Code')} className={styles.inputBox} maxLength={6} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.departmentCode} label="Department Code" name="departmentCode" rules={[validateRequiredInputField('Department Code'), validationFieldLetterAndNumber('Department Code')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Department Code')} maxLength={6} disabled={editMode ? true : false} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.departmentName} label="Employee Department Name" name="departmentName" rules={[validateRequiredInputField('Department Description'), validateAlphanumericWithSpace('Department Description')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Department Description')} maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
