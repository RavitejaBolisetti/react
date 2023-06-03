import React from 'react';
import { Col, Input, Form, Row, Switch, Select } from 'antd';
import { validateRequiredInputField, validateMobileNoField, validateEmailField, validateRequiredSelectField,validationFieldLetterAndNumber,validateLettersWithWhitespaces } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed, titleData } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
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
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
            {viewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.code} label="Group Code" name="code" rules={[validateRequiredInputField('Group Code'), validationFieldLetterAndNumber('code')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Group Code')} maxLength={6} disabled={editMode} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.name} label="Group Name" name="name" rules={[validateRequiredInputField('Group Name'),validateLettersWithWhitespaces('Group Name')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Group Name')} maxLenght={50} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Title" name="title" initialValue={formData?.title} rules={[validateRequiredSelectField('Attribute Name')]}>
                                <Select
                                    placeholder={preparePlaceholderSelect('Title')}
                                    style={{
                                        width: '100%',
                                    }}
                                    allowClear
                                    labelInValue
                                >
                                    {titleData?.map((item) => {
                                        return <Option value={item.key}>
                                            {item.value}
                                        </Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.ownerName} label="Owner Name" name="ownerName" rules={[validateRequiredInputField('Owner Name'), validateLettersWithWhitespaces('Owner Name')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Owner Name')} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.mobileNumber} label="Contact Number" name="mobileNumber" rules={[validateRequiredInputField('Contact Number'), validateMobileNoField('Contact Number')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Contact Number')} maxLength={10}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.emailId} label="Email ID" name="emailId" rules={[validateRequiredInputField('Email ID'), validateEmailField('Email ID')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Email ID')} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.status : true} label="Active" labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status">
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