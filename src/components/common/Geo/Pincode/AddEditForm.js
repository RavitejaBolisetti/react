import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Switch } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField, validationNumber } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'components/common/Common.module.css';
import { District } from 'store/reducers/data/geo/district';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed } = props;
    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const { stateData, districtData, tehsilData, cityData, typeData } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;

    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);
    const [filteredCityData, setFilteredCityData] = useState([]);
    const [filteredTehsilData, setFilteredTehsilData] = useState([]);

    useEffect(() => {
        form.resetFields();

        if (formData?.stateName) {
            handleStateChange(formData?.stateCode);
            handleDistrictChange(formData?.districtCode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleCountryChange = (countryCode) => {
        form.setFieldValue('countryCodeDisplay', countryData?.find((i) => i?.countryCode === countryCode)?.countryCode);
    };

    const handleStateChange = (state) => {
        form.setFieldValue('districtCode', undefined);
        setFilteredDistrictData(districtData?.filter((i) => i?.stateCode === state));
    };

    const handleDistrictChange = (district) => {
        setFilteredTehsilData(tehsilData?.filter((i) => i?.districtCode === district));
        setFilteredCityData(cityData?.filter((i) => i?.districtCode === district));
    };

    

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };
    return (
        <Form id="configForm" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {viewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.countryCode || defaultCountry} disabled label="Country" name="countryCode" placeholder={preparePlaceholderSelect('Country')} rules={[validateRequiredInputField('Country')]}>
                                <Select className={styles.headerSelectField} showSearch loading={!isDataCountryLoaded} placeholder="Select" allowClear onChange={handleCountryChange} disabled={true}>
                                    {countryData?.map((item) => (
                                        <Option value={item?.countryCode}>{item?.countryName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.stateCode} label="State Name" name="stateCode" rules={[validateRequiredSelectField('State Name')]}>
                                <Select placeholder={preparePlaceholderSelect('State Name')} onChange={handleStateChange}>
                                    {filteredStateData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col> */}
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.stateCode} label="State" name="stateCode" rules={[validateRequiredSelectField('State')]}>
                                <Select showSearch optionFilterProp={'children'} placeholder={preparePlaceholderSelect('State')} onChange={handleStateChange}>
                                    {stateData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="District" initialValue={formData?.districtCode} name="districtCode" rules={[validateRequiredSelectField('District')]}>
                                <Select showSearch optionFilterProp={'children'} placeholder={preparePlaceholderSelect('District')} onChange={handleDistrictChange}>
                                    {filteredDistrictData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="City" initialValue={formData?.cityName} name="cityCode" rules={[validateRequiredSelectField('City')]}>
                                <Select showSearch optionFilterProp={'children'} placeholder={preparePlaceholderSelect('City')} >
                                    {filteredCityData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Tehsil" initialValue={formData?.tehsilCode} name="tehsilCode" rules={[validateRequiredSelectField('Tehsil')]}>
                                <Select showSearch optionFilterProp={'children'} placeholder={preparePlaceholderSelect('Tehsil')}>
                                    {filteredTehsilData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Pin Category" initialValue={formData?.pinCategory} name="pinCategory" rules={[validateRequiredSelectField('Pin Category')]}>
                                <Select showSearch optionFilterProp={'children'} placeholder={preparePlaceholderSelect('Pin Category')}>
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
                                <Input placeholder={preparePlaceholderText('PIN code')} className={styles.inputBox}  />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.localityName} label="Locality" name="localityName" rules={[validateRequiredInputField('Locality')]}>
                                <Input placeholder={preparePlaceholderText('Locality')} className={styles.inputBox} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={editMode ? formData?.withIn50KmFromGpo : true} label="Is Locality Under 50Km of GPO" name="withIn50KmFromGpo">
                                <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
