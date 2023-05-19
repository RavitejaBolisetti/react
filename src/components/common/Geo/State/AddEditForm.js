import React from 'react';
import { Col, Input, Form, Row, Select, Switch } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateAlphanumericWithSpace, validateLettersWithWhitespaces } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed } = props;

    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleCountryChange = (countryCode) => {
        form.setFieldValue('countryCodeDisplay', countryData?.find((i) => i?.countryCode === countryCode)?.countryCode);
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
                            <Form.Item initialValue={formData?.countryCode || defaultCountry} disabled label="Country" name="countryCode" placeholder={preparePlaceholderSelect('Country')} rules={[validateRequiredInputField('Country')]}>
                                <Select className={styles.headerSelectField} showSearch loading={!isDataCountryLoaded} placeholder="Select" allowClear onChange={handleCountryChange} disabled={true}>
                                    {countryData?.map((item) => (
                                        <Option value={item?.countryCode}>{item?.countryName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Country Code" initialValue={formData?.countryCode || defaultCountry} rules={[validateRequiredInputField('Country Code'), validateAlphanumericWithSpace('Country Code')]} name="countryCodeDisplay">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Country Code')} maxLength={6} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.code} label="State Code" name="code" rules={[validateRequiredInputField('State Code'), validationFieldLetterAndNumber('State Code')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('State Code')} maxLength={6} disabled={editMode ? true : false} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="State Name" initialValue={formData?.name} rules={[validateRequiredInputField('State Name'), validateLettersWithWhitespaces('State Name')]} name="name">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('State Name')} maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.gstStateCode} label="GST State Code" name="gstStateCode" rules={[validateRequiredInputField('get state code'), validationFieldLetterAndNumber('get state code')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('State Code')} maxLength={2} disabled={editMode ? true : false} />
                            </Form.Item>
                        </Col>
                    
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
