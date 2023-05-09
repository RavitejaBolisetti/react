import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
// import { convertCalenderDate } from 'utils/formatDateTime';
//import { PARAM_MASTER } from 'constants/paramMaster';
// import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
// import { STATE_DROPDOWN } from './InputType';
import { BayTypeMaster } from './BayTypeMaster';

const { Option } = Select;
// const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { typeData, hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, form, isReadOnly, showSaveBtn, formData, onCloseAction, isViewModeVisible } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed, stateCode, handleSelectState } = props;

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

    const viewProps = {
        isVisible: isViewModeVisible,
        //setClosePanels,
        formData,
        styles,
    };

    // useEffect(() => {
    //     form.setFieldsValue(defaultValues)
    // }, [form, defaultValues])

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {/* {console.log(stateCode, 'CODECOE')} */}
                            <Form.Item label="Location Type Code" initialValue={formData?.locationCode} name="locationCode" rules={[validateRequiredSelectField('Location Type Code')]}>
                                <Input
                                    placeholder={preparePlaceholderText('Location Type Code')}
                                    className={styles.inputBox}

                                    // addonAfter={
                                    //     <>
                                    //         <Button type="primary">Submit</Button>
                                    //     </>
                                    // }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.locationDescription} label="Location Type Description" name="locationDescription" rules={[validateRequiredInputField('Location Type Description')]}>
                                <Input placeholder={preparePlaceholderText('Location Type Description')} className={styles.inputBox} />
                            </Form.Item>
                            {/* initialValue={stateCode} */}
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
            ) : (
                <BayTypeMaster {...viewProps} />
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
