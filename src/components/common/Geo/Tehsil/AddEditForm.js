import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Switch, DatePicker } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateAlphanumericWithSpace, validateLettersWithWhitespaces } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import dayjs from 'dayjs';
import { convertCalenderDate } from 'utils/formatDateTime';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed } = props;

    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const { stateData, districtData } = props;
    const [filteredDistrictData, setFilteredDistrictData] = useState(districtData?.filter((i) => i?.stateCode === formData?.stateCode));

    useEffect(() => {
        setFilteredDistrictData(districtData?.filter((i) => i?.stateCode === formData?.stateCode));
        // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [formData?.stateCode]);

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
        form.setFieldValue('districtCodeDisplay', undefined);

        const stateCode = stateData?.find((i) => i?.code === state)?.code;
        stateCode && form.setFieldValue('stateCodeDisplay', stateCode);

        setFilteredDistrictData(districtData?.filter((i) => i?.stateCode === state));
    };

    const handleDistrictChange = (district) => {
        const districtCode = districtData?.find((i) => i?.code === district)?.code;
        districtCode && form.setFieldValue('districtCodeDisplay', districtCode);
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

    console.log(formData, 'formData');

    const dateInitialValue = { initialValue: editMode ? convertCalenderDate(formData?.includeOn, 'YYYY/MM/DD') : null };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {viewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.countryCode || defaultCountry} disabled label="Country" name="countryCode" placeholder={preparePlaceholderSelect('Country')} rules={[validateRequiredInputField('Country')]}>
                                <Select className={styles.headerSelectField} showSearch loading={!isDataCountryLoaded} placeholder="Select" allowClear onChange={handleCountryChange} disabled={true}>
                                    {countryData?.map((item) => (
                                        <Option key={item?.countryCode} value={item?.countryCode}>
                                            {item?.countryName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Country Code" initialValue={formData?.countryCode || defaultCountry} rules={[validateRequiredInputField('Country Code'), validateAlphanumericWithSpace('Country Code')]} name="countryCodeDisplay">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Country Code')} maxLength={6} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="State Name" initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField('State Name')]}>
                                <Select placeholder={preparePlaceholderSelect('State Name')} {...selectProps} onChange={handleStateChange}>
                                    {stateData?.map((item) => (
                                        <Option key={item?.code} value={item?.code}>
                                            {item?.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.stateCode} label="State Code" name="stateCodeDisplay" rules={[validateRequiredInputField('State Code')]}>
                                <Input placeholder={preparePlaceholderText('State Code')} className={styles.inputBox} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="District Name" initialValue={formData?.districtName} name="districtCode" rules={[validateRequiredSelectField('District Name')]}>
                                <Select placeholder={preparePlaceholderSelect('District Name')} {...selectProps} onChange={handleDistrictChange}>
                                    {filteredDistrictData?.map((item) => (
                                        <Option key={item?.code} value={item?.code}>
                                            {item?.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.districtCode} label="District Code" name="districtCodeDisplay" rules={[validateRequiredInputField('District Code')]}>
                                <Input placeholder={preparePlaceholderText('District Code')} className={styles.inputBox} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.code} label="Tehsil Code" name="code" rules={[validateRequiredInputField('Tehsil Code'), validationFieldLetterAndNumber('Tehsil Code')]}>
                                <Input placeholder={preparePlaceholderText('Tehsil Code')} className={styles.inputBox} maxLength={6} disabled={editMode ? true : false} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.name} label="Tehsil Name" name="name" rules={[validateRequiredInputField('Tehsil Name'), validateLettersWithWhitespaces('Tehsil Name')]}>
                                <Input placeholder={preparePlaceholderText('Tehsil Name')} className={styles.inputBox} maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.tehsilCategoryCode} label="Tehsil Category" name="tehsilCategoryCode">
                                <Select
                                    showSearch
                                    placeholder={preparePlaceholderSelect('Tehsil Category')}
                                    allowClear
                                    optionFilterProp="children"
                                    {...selectProps}
                                    options={[
                                        {
                                            value: 'CAT001',
                                            label: 'Category 1',
                                        },
                                        {
                                            value: 'CAT002',
                                            label: 'Category 2',
                                        },
                                        {
                                            value: 'CAT003',
                                            label: 'Category 3',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Included On" name="includedOn" {...dateInitialValue} rules={[validateRequiredInputField('Included On')]}>
                                <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} placeholder={preparePlaceholderSelect('Included On Date')} className={styles.inputBox} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                        <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                        </Form.Item>
                    </Col>
                </>
            )}

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
