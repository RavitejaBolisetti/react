import React, { useState } from 'react';
import { Input, Form, Col, Row, Button, Select, DatePicker } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/Common.module.css';
import { ViewTermConditionList } from './ViewTermConditionList';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, productHierarchyList, documentTypeList, languageList, formActionType: { editMode, isViewModeVisible } = undefined, onFinish, onFinishFailed, footerEdit, setIsFormVisible, onSaveShowLoading } = props;
    const { CustomEditor } = props;
    const { buttonData, setButtonData, handleButtonClick, formActionType } = props;
    const { productName, setProductName } = props;
    const { documentName, setDocumentName } = props;
    const { languageName, setLanguageName } = props;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();

    const [termsAndCondition, setTermsAndCondition] = useState(undefined);
    const onChange = (e) => {
        setTermsAndCondition(e.editor.getData());
    };

    const { TextArea } = Input;

    const handleProductHierarchySelect = (label, value) => {
        setProductName(value.children);
    };

    const handleDocumentTypeSelect = (label, value) => {
        setDocumentName(value.children);
    };

    const handleLanguageSelect = (label, value) => {
        setLanguageName(value.children);
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
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
        form.resetFields();
    };

    return (
        <Form autoComplete="off" form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={formActionType?.editMode ? 'Revised' : 'Initial'} label="Document Category" name="documentCategory">
                                <Input disabled={formActionType?.viewMode} maxLength={10} placeholder={preparePlaceholderText('Document Category')} />
                            </Form.Item>
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={formData?.productCode} label="Product Hierarchy" name="productCode">
                                <Select disabled={formActionType?.viewMode} onSelect={handleProductHierarchySelect} className={styles.headerSelectField} placeholder="Select Parameter" allowClear>
                                    {productHierarchyList?.map((item) => (
                                        <Option value={item.prodctCode}>{item.prodctLongName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={formData?.documentTypeCode} label="Document Type" name="documentTypeCode">
                                <Select disabled={formActionType?.viewMode} onSelect={handleDocumentTypeSelect} className={styles.headerSelectField} placeholder="Select Parameter" allowClear>
                                    {documentTypeList?.map((item) => (
                                        <Option value={item.documentCode}>{item.documentCode}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={formData?.languageCode} label="Language" name="languageCode">
                                <Select disabled={formActionType?.viewMode} onSelect={handleLanguageSelect} className={styles.headerSelectField} placeholder="Select Parameter" allowClear>
                                    {languageList?.map((item) => (
                                        <Option value={item.value}>{item.value}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item disabled={formActionType?.viewMode} initialValue={formData?.termConditionDescription} label="Terms & Conditions" name="termsConditions">
                                <CustomEditor onChange={onChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {termsAndCondition}
                            <Form.Item name="description" initialValue={termsAndCondition}>
                                <Input disabled={formActionType?.viewMode} value />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Effective From" name="effectiveFrom" rules={[validateRequiredInputField('date')]}>
                                <DatePicker disabled={formActionType?.viewMode} style={{ width: '100%' }} selected={startDate} onChange={(date) => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} maxDate={endDate} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Effective To" name="effectiveTo">
                                <DatePicker disabled={formActionType?.viewMode} style={{ width: '100%' }} selected={endDate} onChange={(date) => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />
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
                    {
                        <Button form="myForm" key="submit" htmlType="submit" type="primary">
                            Add T&C
                        </Button>
                    }
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
