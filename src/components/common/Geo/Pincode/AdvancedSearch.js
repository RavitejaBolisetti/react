import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber,Switch, DatePicker } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { STATE_DROPDOWN } from '../District/InputType';

const { Option } = Select;
const { TextArea } = Input;

const AdvanceSearchMain = (props) => {
    const { typeData, configData, parameterType, setParameterType, hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, form,setClosePanels, isReadOnly, showSaveBtn, formData,onCloseAction, isViewModeVisible, setisViewModeVisible } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed,stateDropdown,cityDropdown,tehsildropdown,districtDropdown } = props;
    const disabledProps = { disabled: isReadOnly };

    // const [ selectedState, isSelectedState ] = useState('');
    // const [selectedCity, isSelectedCity] = useState('');
    // const [selectedDistrict, isSelectedDistrict] = useState('');
    // const [selectedTehsil, isSelectedTehsil] = useState('');


    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const changeSelectOptionHandler = (event) => {
        setParameterType(event);
    };
    // useEffect(() => {
    //     form.setFieldsValue();
    // }, [selectedState,form])
    // useEffect(() => {
    //     form.setFieldsValue();
    // }, [selectedCity,form])
    // useEffect(() => {
    //     form.setFieldsValue();
    // }, [selectedDistrict,form])
    // useEffect(() => {
    //     form.setFieldsValue();
    // }, [selectedTehsil,form])

    // const handleSelectState = (props) =>{
    //     isSelectedState(props)
    // }
    // const handleSelectCity = (props) => {
    //     isSelectedCity(props);
    // };
    // const handleSelectTehsil = (props) => {
    //     isSelectedTehsil(props);
    // };
    // const handleSelectDistrict = (props) => {
    //     isSelectedDistrict(props);
    // };
    const viewProps = {
        isVisible: isViewModeVisible,
        formData,
        styles,
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} {...viewProps}>
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={'India'} label="Select Country" name="countryName">
                                <Select disabled>
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {STATE_DROPDOWN?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Select State" initialValue={formData?.stateCode} rules={[validateRequiredInputField('State')]} name="stateCode">
                            <Select disabled={isReadOnly} >
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {stateDropdown?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Select District" initialValue={formData?.districtName} name="districtName" rules={[validateRequiredSelectField('District')]}>
                            <Select disabled={isReadOnly} >
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {districtDropdown?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Select City" initialValue={formData?.cityName} name="cityName" rules={[validateRequiredSelectField('City')]}>
                            <Select disabled={isReadOnly}>
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {cityDropdown?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Select Tehsil" initialValue={formData?.tehsilName} name="tehsilName" rules={[validateRequiredSelectField('Tehsil')]}>
                            <Select disabled={isReadOnly} >
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {tehsildropdown?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            <Row gutter={20} className={styles.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                    <Button danger onClick={onCloseAction}>
                        {footerEdit ? 'Close' : 'Cancel'}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                    {!footerEdit && showSaveBtn && (
                        <Button disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(false)} htmlType="submit" type="primary">
                            Search
                        </Button>
                    )}
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withDrawer(AdvanceSearchMain, {title: 'Advanced Search'});
