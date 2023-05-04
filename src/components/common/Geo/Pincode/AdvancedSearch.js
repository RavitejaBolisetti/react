import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber,Switch, DatePicker } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { STATE_DROPDOWN } from '../District/InputType';
import { GeoDistrict } from 'store/reducers/data/geoDistrict';

const { Option } = Select;
const { TextArea } = Input;

const AdvanceSearchMain = (props) => {
    const { typeData, configData, parameterType, setParameterType, hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, form,setClosePanels, isReadOnly, showSaveBtn, formData,onCloseAction, isViewModeVisible, setisViewModeVisible } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed,geoStateData,geoDistrictData,geoTehsilData,geoCityData } = props;
    const disabledProps = { disabled: isReadOnly };
    const [show, setShow] = useState([]);
    const [showCity, setShowCity] = useState([]);
    const [showTehsil, setShowTehsil] = useState([]);

    const handleSelectState = (e) =>{
        setShow(geoDistrictData.filter((i)=>i.stateCode === e))
    }
    const handleSelectDistrict = (e) => {
        setShowCity(geoCityData.filter((i)=>i.districtCode === e))
    };
    const handleSelectTehsil = (e) => {
        setShowTehsil(geoTehsilData.filter((i)=>i.districtCode === e));
    };

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
    const formProps = {
      
        geoStateData,
        geoDistrictData,
        geoTehsilData,
        geoCityData,
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} {...viewProps} {...formProps}>
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
                            <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('state')} onChange={handleSelectState}>
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {geoStateData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Select District" initialValue={formData?.districtName} name="districtName" rules={[validateRequiredSelectField('District')]}>
                            <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('district')} onChange={handleSelectDistrict} >
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {show?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Select City" initialValue={formData?.cityName} name="cityName" rules={[validateRequiredSelectField('City')]}>
                            <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('city')} onChange={handleSelectTehsil}>
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {showCity?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            {console.log(geoCityData,'GEOCITY')}
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Select Tehsil" initialValue={formData?.tehsilName} name="tehsilName" rules={[validateRequiredSelectField('Tehsil')]}>
                            <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('tehsil')} >
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {geoTehsilData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            {console.log(geoTehsilData,'GEOTEHSIL')}
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
