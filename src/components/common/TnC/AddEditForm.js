import React, { useState } from 'react';
import { Drawer, Input, Form, Col, Row, Switch, Button, Select, DatePicker } from 'antd';

import { validateAlphanumericWithSpaceHyphenPeriod, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/Common.module.css';
import { ViewTermConditionList } from './ViewTermConditionList';
import { withDrawer } from 'components/withDrawer';
import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    console.log("Product Hierarchy:", props)
    const languages  = ['Lang1', 'Lang2'];
    const { form, formData, onCloseAction, productHierarchyList, documentTypeList, formActionType: { editMode, isViewModeVisible } = undefined, onFinish, onFinishFailed, footerEdit, setIsFormVisible, onSaveShowLoading } = props;

    
    const { buttonData, setButtonData, handleButtonClick } = props;

    const { stateData, districtData } = props;
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    // const handleCountryChange = (countryCode) => {
    //     form.setFieldValue('countryCodeDisplay', countryData?.find((i) => i?.countryCode === countryCode)?.countryCode);
    // };

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
        isVisible: isViewModeVisible,
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

    const onClose = () => {
        setIsFormVisible(false);
        // setFormBtnDisable(false);
        form.resetFields();
    };

    return (
        <Form autoComplete="off" form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Document Category" name="documentCategory" rules={[validateRequiredInputField('code'), validationFieldLetterAndNumber('code')]}>
                                <Input maxLength={10} placeholder={preparePlaceholderText('code')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Product Hierarchy" name="productHierarchy">
                                <Select className={styles.headerSelectField} placeholder="Select Parameter" allowClear>
                                        {productHierarchyList?.map((item) => (
                                            <Option value={item.prodctShrtName}>{item.prodctShrtName}</Option>
                                        ))}
                                </Select>                                
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Document Type" name="documentType" rules={[validateRequiredInputField('name'), validateAlphanumericWithSpaceHyphenPeriod('name')]}>
                                <Select className={styles.headerSelectField} placeholder="Select Parameter" allowClear>
                                        {documentTypeList?.map((item) => (
                                            <Option value={item.documentCode}>{item.documentCode}</Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Language" name="language" rules={[validateRequiredInputField('code'), validationFieldLetterAndNumber('code')]}>
                                <Select className={styles.headerSelectField} placeholder="Select Parameter" allowClear>
                                        {languages?.map((item) => (
                                            <Option value={item}>{item}</Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Terms & Conditions" name="termsConditions" rules={[validateRequiredInputField('termsConditions'), validationFieldLetterAndNumber('termsConditions')]}>
                                <textarea rows="15" cols="60" placeholder={preparePlaceholderText('Terms & Conditions')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Effective From" name="effectiveFrom" rules={[validateRequiredInputField('date')]}>
                            <DatePicker />
                        </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Effective To" name="effectiveTo" rules={[validateRequiredInputField('date')]}>
                            <DatePicker />
                        </Form.Item>
                        </Col>
                    </Row>                
                </>
            ) : (
                <ViewTermConditionList {...viewProps} />
            )}
            <Row gutter={20} className={style.formFooter}>
                <Col xs={24} sm={6} md={6} lg={6} xl={6} className={style.footerBtnLeft}>
                <Button danger onClick={onClose}>
                        {!footerEdit ? 'Cancel' : 'Close'}
                </Button>
                </Col>
                <Col xs={24} sm={18} md={18} lg={18} xl={18} className={style.footerBtnRight}>
                    {(
                        <Button form="myForm" key="submit" htmlType="submit" type="primary">
                            Add T&C
                        </Button>
                    )}
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
