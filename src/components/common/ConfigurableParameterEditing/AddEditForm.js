/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { PARAM_MASTER } from 'constants/paramMaster';
import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';
import { ViewConfigDetails } from './ViewConfigDetails';
import { preparePlaceholderSelect, prepareDatePickerText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

const { TextArea } = Input;
const AddEditFormMain = (props) => {
    const { typeData, configData, parameterType, setParameterType, hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, form, isReadOnly, showSaveBtn, formData, onCloseAction, isViewModeVisible } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed, isLoadingOnSave } = props;

    useEffect(() => {
        setParameterType(formData?.configurableParameterType);
        form.setFieldValue('parameterType', formData?.configurableParameterType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const handleControlChange = (control, e) => {
        const controlData = configData?.find((i) => i.controlId === control);
        form.setFieldsValue({
            controlDescription: controlData?.controlDescription,
        });
    };

    const changeSelectOptionHandler = (event) => {
        setParameterType(event);
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        formData,
        styles,
        parameterType,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.controlId} label="Control ID" name="controlId" rules={[validateRequiredInputField('Control ID')]}>
                                <Select showSearch allowClear placeholder={preparePlaceholderSelect('Select')} onChange={handleControlChange} disabled={isReadOnly} fieldNames={{ label: 'value', value: 'key' }} options={typeData[PARAM_MASTER.CFG_PARAM.id]}></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Control Description" initialValue={formData?.controlDescription} rules={[validateRequiredInputField('Control Description')]} name="controlDescription">
                                <TextArea maxLength={300} value={formData?.controlDescription} placeholder="Enter Data" disabled={isReadOnly} showCount />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Control Group" initialValue={formData?.controlGroup} name="controlGroup" rules={[validateRequiredSelectField('controlGroup')]}>
                                <Select showSearch allowClear placeholder={preparePlaceholderSelect('control group')} disabled={isReadOnly} fieldNames={{ label: 'value', value: 'key' }} options={typeData[PARAM_MASTER.CTRL_GRP.id]}></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Configurable Parameter Type" rules={[validateRequiredSelectField('ConfigParamType')]}>
                                <Select defaultValue={parameterType} placeholder={preparePlaceholderSelect('Parameter Type')} onChange={changeSelectOptionHandler} disabled={isReadOnly} fieldNames={{ label: 'value', value: 'key' }} options={typeData[PARAM_MASTER.CFG_PARAM_TYPE.id]} allowClear></Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            {parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY ? (
                                <Form.Item initialValue={formData?.textValue} label="Configurable Parameter Values" name="textValue" rules={[validateRequiredInputField('ConfigParamValues')]}>
                                    <Input value={configData?.textValue} placeholder="Enter Data" disabled={isReadOnly} />
                                </Form.Item>
                            ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY ? (
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label="From Number" className={styles.numberRange} initialValue={formData?.fromNumber} name="fromNumber" rules={[validateRequiredInputField('Number')]}>
                                            <InputNumber min={0} placeholder="From Number" style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label="To Number" className={styles.numberRange} initialValue={formData?.toNumber} name="toNumber" rules={[validateRequiredInputField('Number')]}>
                                            <InputNumber min={0} placeholder="To Number" style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY ? (
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label="From Date" name="fromDate" rules={[validateRequiredInputField('from date')]}>
                                            <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label="To Date" name="toDate" rules={[validateRequiredInputField('to date')]}>
                                            <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY ? (
                                <Form.Item initialValue={formData?.booleanValue} name="booleanValue" label="Configurable Parameter Values" rules={[validateRequiredInputField('ConfigParamValues')]}>
                                    <Select
                                        placeholder="Select"
                                        options={[
                                            { value: true, label: 'Yes' },
                                            { value: false, label: 'No' },
                                        ]}
                                        disabled={isReadOnly}
                                    />
                                </Form.Item>
                            ) : null}
                        </Col>
                    </Row>
                </>
            ) : (
                <ViewConfigDetails {...viewProps} />
            )}

            <Row gutter={20} className={styles.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                    <Button danger onClick={onCloseAction}>
                        {footerEdit ? 'Close' : 'Cancel'}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                    {!footerEdit && showSaveBtn && (
                        <Button loading={isLoadingOnSave} disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(false)} htmlType="submit" type="primary">
                            Save
                        </Button>
                    )}

                    {!formData?.id && (
                        <Button loading={isLoadingOnSave} htmlType="submit" disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(true)} type="primary">
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
