import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Button, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateAlphanumericWithSpace } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { hanndleEditData, districtData, setSaveAndAddNewBtnClicked, stateData } = props;
    const { footerEdit, form, setClosePanels, isReadOnly, showSaveBtn, formData, onCloseAction, isViewModeVisible } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed } = props;
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);

    const disabledProps = { disabled: isReadOnly };

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        setClosePanels,
        formData,
        styles,
    };

    const handleStateChange = (state) => {
        form.setFieldValue('districtCode', undefined);
        form.setFieldValue('districtCodeDisplay', undefined);

        const stateCode = stateData?.find((i) => i?.code === state)?.code;
        stateCode && form.setFieldValue('stateCodeDisplay', stateCode);

        setFilteredDistrictData(districtData?.filter((i) => i?.stateCode === state));
    };

    const handleDistrictChange = (district) => {
        const districtCode = districtData?.find((i) => i?.code === district)?.code;
        districtCode && form.setFieldValue('districtCodeDisplay', districtCode);
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.stateCode} label="State Name" name="stateCode" rules={[validateRequiredSelectField('State Name')]}>
                                <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('State Name')} onChange={handleStateChange}>
                                    {stateData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="State Code" initialValue={formData?.stateCode} name="stateCodeDisplay" rules={[validateRequiredInputField('State Code')]}>
                                <Input placeholder={preparePlaceholderText('State Code')} className={styles.inputBox} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.districtCode} label="District Name" name="districtCode" rules={[validateRequiredSelectField('District Name')]}>
                                <Select placeholder={preparePlaceholderSelect('District Name')} onChange={handleDistrictChange}>
                                    {filteredDistrictData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.districtCode} label="District Code" name="districtCodeDisplay" rules={[validateRequiredInputField('District Code')]}>
                                <Input placeholder={preparePlaceholderText('District Code')} className={styles.inputBox} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="City Code" initialValue={formData?.code} name="code" rules={[validationFieldLetterAndNumber('City Code')]}>
                                <Input placeholder={preparePlaceholderText('Tehsil Code')} className={styles.inputBox} disabled={isReadOnly} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="City Name" name="name" initialValue={formData?.name} rules={[validateAlphanumericWithSpace('City Name')]}>
                                <Input placeholder={preparePlaceholderText('Tehsil Name')} className={styles.inputBox} disabled={isReadOnly} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            ) : (
                <ViewDetail {...viewProps} />
            )}

            <Row gutter={20} className={styles.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                    <Button danger onClick={onCloseAction}>
                        {footerEdit ? 'Close' : 'Cancel'}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                    {!footerEdit && showSaveBtn && (
                        <Button disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(false)} htmlType="submit" type="primary">
                            Save
                        </Button>
                    )}

                    {!formData?.code && (
                        <Button htmlType="submit" disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(true)} type="primary">
                            Save & Add New
                        </Button>
                    )}

                    {footerEdit && (
                        <Button onClick={hanndleEditData} form="configForm" key="submitAndNew" htmlType="submit" type="primary">
                            Edit
                        </Button>
                    )}
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});