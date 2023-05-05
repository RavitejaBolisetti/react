import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Button, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { ViewPincodeDetails } from './ViewPincodeDetails';

const { Option } = Select;
// const { TextArea } = Input;

const PinCodeAddEditFormMain = (props) => {
    const { typeData, hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, isReadOnly, showSaveBtn, formData, onCloseAction, isViewModeVisible } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish,geoStateData,geoPindata,geoDistrictData,geoTehsilData,geoCityData,onFinishFailed,stateDropdown,cityDropdown,tehsilDropdown,districtDropdown } = props;
    const [ selectedState, isSelectedState ] = useState('');
    const [show, setShow] = useState([]);
    const [showCity, setShowCity] = useState([]);
    const [showTehsil, setShowTehsil] = useState([]);
    const [city, setPin] = useState([]);

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };
    const handleSelectState = (e) =>{
        setShow(geoDistrictData.filter((i)=>i.stateCode === e))
    }
    const handleSelectDistrict = (e) => {
        setShowCity(geoCityData.filter((i)=>i.districtCode === e))
    };
    const handleSelectTehsil = (e) => {
        setShowTehsil(geoTehsilData.filter((i)=>i.cityCode === e));
    };
   
    
    
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
        geoPindata,
    };
    const [form] = Form.useForm()

   
    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} {...formProps}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Country" initialValue={'India'} name="countryName" rules={[validateRequiredSelectField('Country')]}>
                                <Select disabled placeholder={preparePlaceholderSelect('Country')}>
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {stateDropdown?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.stateName} label="State" name="stateCode" rules={[validateRequiredSelectField('State')]}>
                                <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('State')} onChange={handleSelectState}>
                                    {geoStateData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="District" initialValue={formData?.districtName} name="districtCode" rules={[validateRequiredSelectField('District')]}>
                                <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('District')} onChange={handleSelectDistrict}>
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {show?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="City" initialValue={formData?.cityName} name="cityCode" rules={[validateRequiredSelectField('City')]}>
                                <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('City')} onChange={handleSelectTehsil}>
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {showCity?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Tehsil" initialValue={formData?.tehsilName} name="tehsilCode" rules={[validateRequiredSelectField('Tehsil')]}>
                                <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('Tehsil')}>
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {geoTehsilData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                    {console.log(formData,'FORMDATA')}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.pinCode} label="PIN Code" name="pinCode" rules={[validateRequiredInputField('PIN code'), validationNumber('Pincode')]}>
                                <Input placeholder={preparePlaceholderText('PIN code')} className={styles.inputBox} disabled={isReadOnly} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.localityName} label="Locality" name="localityCode" rules={[validateRequiredInputField('Locality')]}>
                                <Input placeholder={preparePlaceholderText('Locality')} className={styles.inputBox} disabled={isReadOnly} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={formData?.withIn50KmFromGpo} label="Is Locality Under 50Km of GPO" name="withIn50KmFromGpo">
                                <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
                                {/* {...disabledProps} onChange={() => setIsChecked(!isChecked)} defaultChecked={isChecked}  */}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={formData?.status} label="Status" name="status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                                {/* {...disabledProps} onChange={() => setIsChecked(!isChecked)} defaultChecked={isChecked}  */}
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            ) : (
                <ViewPincodeDetails {...viewProps} />
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

export const PinCodeAddEditForm = withDrawer(PinCodeAddEditFormMain, {});
