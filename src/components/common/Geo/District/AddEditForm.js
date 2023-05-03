import React,{ useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Button, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { ViewDistrictDetails } from './ViewDistrictDetails';

const { Option } = Select;


const AddEditFormMain = (props) => {
    const { typeData, hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, isReadOnly, showSaveBtn, formData, onCloseAction, isViewModeVisible } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed, stateData } = props;

    const [ selectedState, isSelectedState ] = useState('');


    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const handleSelectState = (props) =>{
        isSelectedState(props)
    }

    const viewProps = {
        isVisible: isViewModeVisible,
        //setClosePanels,
        formData,
        styles,
    };

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue();
    }, [selectedState,form])


    // console.log(formData,'selectedState')

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        {/* formData?.stateName */}
                            <Form.Item label="State Name" initialValue={formData?.stateName} name="stateName" rules={[validateRequiredSelectField('State Name')]}>
                                <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect("State Name")}
                                    onChange={handleSelectState}
                                >
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {stateData?.map((item) => (
                                        <Option value={item?.name}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={33} label="State Code" name="stateCode" rules={[validateRequiredInputField('State Code')]}>
                                <Input placeholder={preparePlaceholderText('State Code')} className={styles.inputBox} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.districtCode} label="District Code" name="districtCode" rules={[validateRequiredInputField('District Code')]}>
                                <Input placeholder={preparePlaceholderText('District Code')} className={styles.inputBox} disabled={formData?.shortDescription || isReadOnly} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.districtName} label="District Name" name="districtName" rules={[validateRequiredInputField('District Name')]}>
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
            ) : (
                <ViewDistrictDetails {...viewProps} />
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
