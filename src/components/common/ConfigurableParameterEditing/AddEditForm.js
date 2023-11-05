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
import { preparePlaceholderSelect, prepareDatePickerText, preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;
const AddEditFormMain = (props) => {
    const { typeData, configData, parameterType, setParameterType, hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, form, isReadOnly, showSaveBtn, formData, onCloseAction, isViewModeVisible } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, isLoadingOnSave } = props;

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
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {!isViewModeVisible ? (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item initialValue={formData?.controlId} label={translateContent('configurableParameter.label.controlId')} name="controlId" rules={[validateRequiredInputField(translateContent('configurableParameter.validation.controlIdValidation'))]}>
                                        <Select showSearch allowClear placeholder={preparePlaceholderSelect(translateContent('configurableParameter.placeholder.controlIdPlaceholder'))} onChange={handleControlChange} disabled={isReadOnly} fieldNames={{ label: 'value', value: 'key' }} options={typeData[PARAM_MASTER.CFG_PARAM.id]}></Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                    <Form.Item label={translateContent('configurableParameter.label.controlDescription')} initialValue={formData?.controlDescription} rules={[validateRequiredInputField(translateContent('configurableParameter.validation.descriptionValidation'))]} name="controlDescription">
                                        <TextArea maxLength={300} value={formData?.controlDescription} placeholder={preparePlaceholderText(translateContent('configurableParameter.placeholder.controlDescriptionPlaceHolder'))} disabled={isReadOnly} showCount />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('configurableParameter.label.controlGroup')} initialValue={formData?.controlGroup} name="controlGroup" rules={[validateRequiredSelectField(translateContent('configurableParameter.validation.controlGroupValidation'))]}>
                                        <Select showSearch allowClear placeholder={preparePlaceholderSelect(translateContent('configurableParameter.placeholder.controlGroupPlaceHolder'))} disabled={isReadOnly} fieldNames={{ label: 'value', value: 'key' }} options={typeData[PARAM_MASTER.CTRL_GRP.id]}></Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('configurableParameter.label.configurableParameterType')} rules={[validateRequiredSelectField(translateContent('configurableParameter.validation.configParamValuesValidation'))]}>
                                        <Select defaultValue={parameterType} placeholder={preparePlaceholderSelect(translateContent('configurableParameter.placeholder.parameterTypePlaceHolder'))} onChange={changeSelectOptionHandler} disabled={isReadOnly} fieldNames={{ label: 'value', value: 'key' }} options={typeData[PARAM_MASTER.CFG_PARAM_TYPE.id]} allowClear></Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    {parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY ? (
                                        <Form.Item initialValue={formData?.textValue} label={translateContent('configurableParameter.label.configurableParameterValues')} name="textValue" rules={[validateRequiredInputField(translateContent('configurableParameter.validation.configParamValuesValidation'))]}>
                                            <Input value={configData?.textValue} placeholder={preparePlaceholderText(translateContent('configurableParameter.placeholder.controlDescriptionPlaceHolder'))} disabled={isReadOnly} />
                                        </Form.Item>
                                    ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY ? (
                                        <Row gutter={20}>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item label={translateContent('configurableParameter.label.fromNumber')} initialValue={formData?.fromNumber} name="fromNumber" rules={[validateRequiredInputField(translateContent('configurableParameter.validation.number'))]}>
                                                    <InputNumber min={0} placeholder={preparePlaceholderText('configurableParameter.label.fromDate')} disabled={isReadOnly} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item label={translateContent('configurableParameter.label.toNumber')} initialValue={formData?.toNumber} name="toNumber" rules={[validateRequiredInputField(translateContent('configurableParameter.validation.number'))]}>
                                                    <InputNumber min={0} placeholder={preparePlaceholderText('configurableParameter.label.toDate')} disabled={isReadOnly} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY ? (
                                        <Row gutter={20}>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item label={translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField(translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                                    <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item label={translateContent('configurableParameter.label.toDate')} name="toDate" rules={[validateRequiredInputField(translateContent('configurableParameter.validation.toDateValidaiton'))]}>
                                                    <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY ? (
                                        <Form.Item initialValue={formData?.booleanValue} name="booleanValue" label={translateContent('configurableParameter.label.configurableParameterValues')} rules={[validateRequiredInputField(translateContent('configurableParameter.validation.configParamValuesValidation'))]}>
                                            <Select
                                                placeholder={translateContent('global.placeholder.select')}
                                                options={[
                                                    { value: true, label: translateContent('global.yesNo.yes') },
                                                    { value: false, label: translateContent('global.yesNo.no') },
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
                </Col>
            </Row>

            <div className={styles.formFooter}>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                        <Button danger onClick={onCloseAction}>
                            {footerEdit ? 'Close' : 'Cancel'}
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
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
            </div>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
