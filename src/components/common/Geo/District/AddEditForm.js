import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Button, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateAlphanumericWithSpace } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { ViewDistrictDetails } from './ViewDistrictDetails';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { ADD_ACTION, EDIT_ACTION, VIEW_ACTION } = props;

    const { hanndleEditData, setSaveAndAddNewBtnClicked } = props;
    const { footerEdit, isReadOnly, showSaveBtn, formData, onCloseAction, isViewModeVisible,formActionType,handleFormAction } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed, stateData } = props;
    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);

    const [selectedState, isSelectedState] = useState(formData?.stateCode);

    const isAddMode = formActionType === ADD_ACTION;
    const isViewMode = formActionType === VIEW_ACTION;

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const handleStateChange = (state) => {
        isSelectedState(state);
        form.setFieldValue('stateCodeDisplay', stateData?.find((i) => i?.code === state)?.code);
    };

    const viewProps = {
        isVisible: isViewMode,
        formData,
        styles,
    };

    const handleCountryChange = (countryCode) => {
        form.setFieldValue('countryCodeDisplay', countryData?.find((i) => i?.countryCode === countryCode)?.countryCode);
    };

    const [form] = Form.useForm();

    return (
        <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {isViewMode ? (
                <>
                   <ViewDistrictDetails {...viewProps} /> 
                </>
            ) : (
                <>
                <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.countryCode || defaultCountry} disabled label="Country" name="countryCode" placeholder={preparePlaceholderSelect('Country')} rules={[validateRequiredInputField('Country')]}>
                                <Select className={styles.headerSelectField} showSearch loading={!isDataCountryLoaded} placeholder="Select" allowClear onChange={handleCountryChange}>
                                    {countryData?.map((item) => (
                                        <Option value={item?.countryCode}>{item?.countryName}</Option>
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
                            <Form.Item initialValue={formData?.stateCode} label="State Name" name="stateCode" rules={[validateRequiredSelectField('State Name')]}>
                                <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('State Name')} onChange={handleStateChange}>
                                    {stateData?.map((item) => (
                                        <Option value={item?.code}>{item?.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="State Code" initialValue={formData?.stateCode} name="stateCodeDisplay" rules={[validateRequiredInputField('State Code')]}>
                                <Input placeholder={preparePlaceholderText('State Code')} className={styles.inputBox} disabled={true} maxLength={6} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.code} label="District Code" name="code" rules={[validationFieldLetterAndNumber('District Code')]}>
                                <Input placeholder={preparePlaceholderText('District Code')} className={styles.inputBox} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.name} label="District Name" name="name" rules={[validateAlphanumericWithSpace('District Name')]}>
                                <Input placeholder={preparePlaceholderText('District Name')} className={styles.inputBox} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={formData?.status} label="Status" name="status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}

            <Row gutter={20} className={styles.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                    <Button danger onClick={onCloseAction}>
                        {isViewMode ? 'Close' : 'Cancel'}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                {!isViewMode && (
                        <Button data-testid="save" disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(false)} htmlType="submit" type="primary">
                            Save
                        </Button>
                    )}

                    {isAddMode && (
                        <Button htmlType="submit" disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(true)} type="primary">
                            Save & Add New
                        </Button>
                    )}

                    {isViewMode && (
                        <Button onClick={() => handleFormAction({ buttonAction: EDIT_ACTION, record: formData })} form="configForm" key="submitAndNew" htmlType="submit" type="primary">
                            Edit
                        </Button>
                    )}
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
