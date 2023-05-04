import React from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber,Switch, DatePicker } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { convertCalenderDate, convertDate } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';


import { PARAM_MASTER } from 'constants/paramMaster';
import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';
import { ViewStateDetails } from './ViewStateDetails'

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { typeData, configData, parameterType, setParameterType, hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, form,setClosePanels, isReadOnly, showSaveBtn, formData, onCloseAction, isViewModeVisible, setisViewModeVisible } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed } = props;
    const disabledProps = { disabled: isReadOnly };


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

    const viewProps = {
        isVisible: isViewModeVisible,
        setClosePanels,
        formData,
        styles,
    };


    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.stateCd} label="State Code" name="stateCd" rules={[validateRequiredInputField('State Code')]}>
                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('State Code')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="State Name" initialValue={formData?.stateName} rules={[validateRequiredInputField('State Name')]} name="stateName">
                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('State Name')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="GST State Code" initialValue={formData?.gstCode} name="gstCode" rules={[validateRequiredSelectField('GST State Code')]}>
                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('GST State Code')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter ={16}>
                        <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                        </Col>
                    </Row>

                    
                </>
            ) : (
                 <ViewStateDetails {...viewProps} />
                
                
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

                    {!formData?.id && (
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
