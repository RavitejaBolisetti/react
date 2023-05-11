import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Button, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';

const { Option } = Select;
// const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { typeData, hanndleEditData, setSaveAndAddNewBtnClicked, ditrict, setDistrict } = props;
    const { footerEdit, isReadOnly, showSaveBtn, formData, onCloseAction, isViewModeVisible, showSaveAndAddNewBtn, formActionType } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, actionform, geoStateData, geoPindata, geoDistrictData, geoTehsilData, geoCityData, onFinishFailed, stateDropdown, cityDropdown, tehsilDropdown, districtDropdown } = props;
    const [selectedState, isSelectedState] = useState('');
    const [show, setShow] = useState([]);
    const [showCity, setShowCity] = useState([]);
    const [showTehsil, setShowTehsil] = useState([]);
    const [city, setPin] = useState([]);
    useEffect(() => {
        console.log('formData', formData);
        console.log('formData', formData?.localityName);
        actionform.resetFields();

        if (formData?.stateName) {
            handleSelectState(formData?.stateCode);
            handleSelectDistrict(formData?.districtCode);
            handleSelectTehsil(formData?.tehsilCode);
        }
    }, [formData]);

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };
    const handleSelectState = (e) => {
        setShow(geoDistrictData.filter((i) => i.stateCode === e));
    };
    const handleSelectDistrict = (e) => {
        setDistrict(e);
        setShowCity(geoCityData.filter((i) => i.districtCode === e));
    };
    const handleSelectTehsil = (e) => {
        setShowTehsil(geoTehsilData.filter((i) => i.districtCode === ditrict));
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


    console.log(typeData,'xhvgsvx')
    return (
        <Form id="configForm" layout="vertical" form={actionform} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} {...formProps}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Country" initialValue={'India'} name="countryName" rules={[validateRequiredSelectField('Country')]}>
                                <Select disabled placeholder={preparePlaceholderSelect('Country')}>
                                    {stateDropdown?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.stateCode} label="State" name="stateCode" rules={[validateRequiredSelectField('State')]}>
                                <Select
                                    showSearch
                                    filterOption={(input, option) => {
                                        return option?.children?.toLowerCase()?.includes(input?.toLowerCase());
                                    }}
                                    disabled={isReadOnly}
                                    placeholder={preparePlaceholderSelect('State')}
                                    onChange={handleSelectState}
                                >
                                    {geoStateData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="District" initialValue={formData?.districtCode} name="districtCode" rules={[validateRequiredSelectField('District')]}>
                                <Select
                                    showSearch
                                    filterOption={(input, option) => {
                                        return option?.children?.toLowerCase()?.includes(input?.toLowerCase());
                                    }}
                                    disabled={isReadOnly}
                                    placeholder={preparePlaceholderSelect('District')}
                                    onChange={handleSelectDistrict}
                                >
                                    {show?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="City" initialValue={formData?.cityName} name="cityCode" rules={[validateRequiredSelectField('City')]}>
                                <Select
                                    showSearch
                                    filterOption={(input, option) => {
                                        return option?.children?.toLowerCase()?.includes(input?.toLowerCase());
                                    }}
                                    disabled={isReadOnly}
                                    placeholder={preparePlaceholderSelect('City')}
                                    onChange={handleSelectTehsil}
                                >
                                    {showCity?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Tehsil" initialValue={formData?.tehsilCode} name="tehsilCode" rules={[validateRequiredSelectField('Tehsil')]}>
                                <Select
                                    showSearch
                                    filterOption={(input, option) => {
                                        return option?.children?.toLowerCase()?.includes(input?.toLowerCase());
                                    }}
                                    disabled={isReadOnly}
                                    placeholder={preparePlaceholderSelect('Tehsil')}
                                >
                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                    {showTehsil?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Pin Category" initialValue={formData?.pinCategory} name="pinCategory" rules={[validateRequiredSelectField('Pin Category')]}>
                                <Select
                                    showSearch
                                    filterOption={(input, option) => {
                                        return option?.children?.toLowerCase()?.includes(input?.toLowerCase());
                                    }}
                                    disabled={isReadOnly}
                                    placeholder={preparePlaceholderSelect('Pin Category')}
                                    
                                >
                                    {typeData?.PIN_CATG?.map((item) => (
                                        <Option value={item?.key}>{item?.value}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.pinCode} label="PIN Code" name="pinCode" rules={[validateRequiredInputField('PIN code'), validationNumber('Pincode')]}>
                                <Input placeholder={preparePlaceholderText('PIN code')} className={styles.inputBox} disabled={isReadOnly} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.localityName} label="Locality" name="localityName" rules={[validateRequiredInputField('Locality')]}>
                                <Input placeholder={preparePlaceholderText('Locality')} className={styles.inputBox} disabled={isReadOnly} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={formActionType === 'update' ? formData?.withIn50KmFromGpo : true} label="Is Locality Under 50Km of GPO" name="withIn50KmFromGpo">
                                <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={formActionType === 'update' ? formData?.withIn50KmFromGpo : true} />
                                {/* {...disabledProps} onChange={() => setIsChecked(!isChecked)} defaultChecked={isChecked}  */}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={formActionType === 'update' ? formData?.status : true} label="Status" name="status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={formActionType === 'update' ? formData?.status : true} />
                                {/* {...disabledProps} onChange={() => setIsChecked(!isChecked)} defaultChecked={isChecked}  */}
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            ) : (
                <ViewDetail {...viewProps} />
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

                    {!formData?.id && showSaveAndAddNewBtn && (
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
