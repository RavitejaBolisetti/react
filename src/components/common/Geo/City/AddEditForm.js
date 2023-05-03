import React from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, Switch, DatePicker } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { convertCalenderDate, convertDate } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { STATE_DROPDOWN } from '../Tehsil/InputType';
import { PARAM_MASTER } from 'constants/paramMaster';
import { ViewCityDetails } from './ViewCityDetails';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { typeData, configData, parameterType, setParameterType, hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, form, setClosePanels, isReadOnly, showSaveBtn, formData, onCloseAction, isViewModeVisible, setisViewModeVisible } = props;
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

    console.log(formData)
    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="State Name"  name="stateName" rules={[validateRequiredSelectField('State Name')]}>
                                <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('State Name')}>
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {STATE_DROPDOWN?.map((item) => (
                                        <Option value={item?.KEY}>{item?.TITLE}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={'22'} label="State Code" name="stateCode" rules={[validateRequiredInputField('State Code')]}>
                                <Input placeholder={preparePlaceholderText('State Code')} className={styles.inputBox} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="District Name"name="districtName" rules={[validateRequiredSelectField('District Name')]}>
                                <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('District Name')}>
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {STATE_DROPDOWN?.map((item) => (
                                        <Option value={item?.KEY}>{item?.TITLE}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={'D10411'} label="District Code" name="districtCode" rules={[validateRequiredInputField('District Code')]}>
                                <Input placeholder={preparePlaceholderText('District Code')} className={styles.inputBox} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="City Code" initialValue={formData?.code} name="code" rules={[validateRequiredInputField('City Code')]}>
                                <Input placeholder={preparePlaceholderText('Tehsil Code')} className={styles.inputBox} disabled={ isReadOnly} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="City Name" name="name" initialValue={formData?.name} rules={[validateRequiredInputField('City Name')]}>
                                <Input placeholder={preparePlaceholderText('Tehsil Name')} className={styles.inputBox} disabled={  isReadOnly} />
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
                <ViewCityDetails {...viewProps} />
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
