import React from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { PARAM_MASTER } from 'constants/paramMaster';
import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { typeData, configData, parameterType, setParameterType, hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, form, isReadOnly, showSaveBtn, formData, onCloseAction } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed } = props;

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const handleControlChange = (control, e) => {
        const controlData = configData?.find((i) => i.controlId === control);
        form.setFieldsValue({
            parameterType: controlData?.parameterType,
        });
    };

    const changeSelectOptionHandler = (event) => {
        setParameterType(event);
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={formData?.controlId} label="Control ID" name="controlId" rules={[validateRequiredInputField('ControlID')]}>
                        <Select placeholder={preparePlaceholderSelect('control id')} showSearch allowClear onChange={handleControlChange} disabled={isReadOnly}>
                            {typeData && typeData[PARAM_MASTER.CFG_PARAM.id] && typeData[PARAM_MASTER.CFG_PARAM.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label="Control Description" initialValue={formData?.controlDescription} rules={[validateRequiredInputField('Control Description')]} name="controlDescription">
                        <TextArea rows={2} value={formData?.controlDescription} placeholder={preparePlaceholderText('control description')} disabled={isReadOnly} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Control Group" initialValue={formData?.controlGroup} name="controlGroup" rules={[validateRequiredSelectField('controlGroup')]}>
                        <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('control group')}>
                            {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={parameterType} label="Configurable Parameter Type" name="configurableParameterType" rules={[validateRequiredSelectField('ConfigParamType')]}>
                        <Select placeholder={preparePlaceholderSelect('parameter type')} onChange={changeSelectOptionHandler} disabled={isReadOnly}>
                            {typeData && typeData[PARAM_MASTER.CFG_PARAM_TYPE.id] && typeData[PARAM_MASTER.CFG_PARAM_TYPE.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY ? (
                        <Form.Item initialValue={formData?.textValue} label="Configurable Parameter Values" name="textValue" rules={[validateRequiredInputField('ConfigParamValues')]}>
                            <Input value={configData?.textValue} placeholder={preparePlaceholderText('configurable parameter values')} disabled={isReadOnly} />
                        </Form.Item>
                    ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY ? (
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="From Number" className={styles.numberRange} initialValue={formData?.fromNumber} name="fromNumber" rules={[validateRequiredInputField('Number')]}>
                                    <InputNumber min={1} max={100} placeholder={preparePlaceholderText('from number')} style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="To Number" className={styles.numberRange} initialValue={formData?.toNumber} name="toNumber" rules={[validateRequiredInputField('Number')]}>
                                    <InputNumber min={1} max={100} placeholder={preparePlaceholderText('to number')} style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                </Form.Item>
                            </Col>
                        </Row>
                    ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY ? (
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="From Date" name="fromDate" rules={[validateRequiredInputField('Number')]}>
                                    <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="To Date" name="toDate" rules={[validateRequiredInputField('Number')]}>
                                    <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                </Form.Item>
                            </Col>
                        </Row>
                    ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY ? (
                        <Form.Item initialValue={formData?.booleanValue} name="booleanValue" label="Configurable Parameter Values" rules={[validateRequiredInputField('ConfigParamValues')]}>
                            <Select
                                placeholder={preparePlaceholderSelect('configurable parameter values')}
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

                    {!formData?.id && (
                        <Button htmlType="submit" danger disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(true)}>
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
