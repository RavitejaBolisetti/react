import React from 'react';
import { Col, Input, Form, Row, Select, Button, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
// import { convertCalenderDate } from 'utils/formatDateTime';
import { PARAM_MASTER } from 'constants/paramMaster';
// import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';

const { Option } = Select;
// const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { typeData,hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, form, isReadOnly, showSaveBtn, formData, onCloseAction, isViewModeVisible } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed } = props;

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    // const handleControlChange = (control, e) => {
    //     const controlData = configData?.find((i) => i.controlId === control);
    //     form.setFieldsValue({
    //         parameterType: controlData?.parameterType,
    //     });
    // };

    // const changeSelectOptionHandler = (event) => {
    //     setParameterType(event);
    // };

    // const viewProps = {
    //     isVisible: isViewModeVisible,
    //     setClosePanels,
    //     formData,
    //     styles,
    //     parameterType
    // };

    console.log(CONFIGURABLE_PARAMETARS_INPUT_TYPE,'CONFIGURABLE_PARAMETARS_INPUT_TYPE')

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="State Name" initialValue={formData?.controlGroup} name="stateName" rules={[validateRequiredSelectField('State Name')]}>
                                <Select disabled={isReadOnly} placeholder="Select">
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {CONFIGURABLE_PARAMETARS_INPUT_TYPE?.map((item) => (
                                        <Option value={item?.KEY}>{item?.TITLE}</Option>
                                        )
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.shortDescription} label="State Code" name="stateCode" rules={[validateRequiredInputField('State Code')]}>
                                <Input placeholder={preparePlaceholderText('State Name')} className={styles.inputBox} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.shortDescription} label="District Code" name="shortDescription" rules={[validateRequiredInputField('District Code')]}>
                                <Input placeholder={preparePlaceholderText('District Code')} className={styles.inputBox} disabled={formData?.shortDescription || isReadOnly} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.shortDescription} label="District Name" name="shortDescription" rules={[validateRequiredInputField('District Name')]}>
                                <Input placeholder={preparePlaceholderText('District Name')} className={styles.inputBox} disabled={formData?.shortDescription || isReadOnly} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={formData?.status} label="Status" name="status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                                {/* {...disabledProps} onChange={() => setIsChecked(!isChecked)} defaultChecked={isChecked}  */}
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            ) : null}

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
