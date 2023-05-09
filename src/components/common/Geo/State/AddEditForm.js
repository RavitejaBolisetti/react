import React from 'react';
import { Col, Input, Form, Row, Select, Button, Switch } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateAlphanumericWithSpace } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { ADD_ACTION, EDIT_ACTION, VIEW_ACTION } = props;
    const { handleFormAction, setSaveAndNewClicked, formActionType } = props;
    const { form, setClosePanels, formData, onCloseAction } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed } = props;
    const { isDataCountryLoaded, countryData, defaultCountry } = props;

    const isAddMode = formActionType === ADD_ACTION;
    const isViewMode = formActionType === VIEW_ACTION;

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const handleCountryChange = (countryCode) => {
        form.setFieldValue('countryCodeDisplay', countryData?.find((i) => i?.countryCode === countryCode)?.countryCode);
    };

    const viewProps = {
        isVisible: isViewMode,
        setClosePanels,
        formData,
        styles,
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {isViewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.countryCode || defaultCountry} disabled label="Country" name="countryCode" placeholder={preparePlaceholderSelect('Country')} rules={[validateRequiredInputField('Country')]}>
                                <Select className={styles.headerSelectField} showSearch loading={!isDataCountryLoaded} placeholder="Select" allowClear onChange={handleCountryChange}>
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
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('State Code')} maxLength={6} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="State Name" initialValue={formData?.name} rules={[validateRequiredInputField('State Name'), validateAlphanumericWithSpace('State Name')]} name="name">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('State Name')} maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}

            <Row gutter={20} className={styles.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                    <Button danger onClick={onCloseAction}>
                        {isViewMode ? 'Close' : 'Cancel'}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                    {!isViewMode && (
                        <Button disabled={!isFormBtnActive} onClick={() => setSaveAndNewClicked(false)} htmlType="submit" type="primary">
                            Save
                        </Button>
                    )}

                    {isAddMode && (
                        <Button htmlType="submit" disabled={!isFormBtnActive} onClick={() => setSaveAndNewClicked(true)} type="primary">
                            Save & Add New
                        </Button>
                    )}

                    {isViewMode && (
                        <Button onClick={() => handleFormAction({ buttonAction: EDIT_ACTION, record: formData })} form="configForm" key="submitAndNew" htmlType="submit" type="primary">
                            Edit
                        </Button>
                    )}
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
