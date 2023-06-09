import React, { useState, useEffect } from 'react';
import { Input, Form, Col, Row, Button, Select, DatePicker } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewTermConditionList } from './ViewTermConditionList';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';
import { CustomEditor } from 'components/common/CustomEditor';
import { convertDate } from 'utils/formatDateTime';
import { convertCalenderDate } from 'utils/formatDateTime';
import dayjs from 'dayjs';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, productHierarchyList, documentTypeList, languageList, formActionType: { editMode, isViewModeVisible } = undefined, onFinish, onFinishFailed, footerEdit, setIsFormVisible, onSaveShowLoading } = props;
    const { buttonData, setButtonData, handleButtonClick, formActionType, effectiveFrom, effectiveTo, seteffectiveFrom, seteffectiveTo } = props;
    const { productName, setProductName, CustomEditorLoad, setCustomEditorLoad } = props;
    const { documentName, setDocumentName } = props;
    const { languageName, setLanguageName } = props;
    const { termsAndCondition, setTermsAndCondition } = props;
    // const { tableChangeHistoryProps } = props;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();

    const onChangeCkEditor = (e) => {
        setTermsAndCondition(e.editor.getData());
    };
    // useEffect(() => {
    //     form.resetFields();
    //     setCustomEditorLoad(Math.random());
    // }, [effectiveFrom, effectiveTo]);
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

    // const handleFormValueChange = () => {
    //     setButtonData({ ...buttonData, formBtnActive: true });
    // };

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
        saveButtonName: formActionType?.editMode ? 'Revise T&C' : 'Add T&C',
    };

    const handleFromDateChange = (value) => {
        setStartDate(value);
    };

    const handleToDateChange = (value) => {
        setEndDate(value);
    };

    const disableFromDate = (value) => {
        return value > endDate;
        // value < dayjs().endOf('day')
    };

    const disableToDate = (value) => {
        return value < startDate;
    };

    const customEditorProps = {
        data: formData?.termConditionDescription ? formData?.termConditionDescription : '',
    };
    const fromDateInitialValue = { initialValue: convertCalenderDate(formData?.effectiveFrom, 'YYYY/MM/DD') };
    const toDateInitialValue = { initialValue: convertCalenderDate(formData?.effectiveTo ? formData?.effectiveTo : '2050/12/31', 'YYYY/MM/DD') };

    // const dateFormat = 'YYYY/MM/DD';
    return (
        <Form autoComplete="off" form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} onFieldsChange={handleFormFieldChange}>
            {!formActionType?.viewMode ? (
                <>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={formActionType?.editMode || formActionType?.viewMode ? 'Revised' : 'Initial'} label="Document Category" name="documentCategory">
                                <Input disabled={true} maxLength={10} placeholder={preparePlaceholderText('Document Category')} />
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
                                        <Option value={item.key}>{item.value}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {(formActionType?.viewMode || formActionType?.editMode) && (
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formData?.version} label="Version" name="version">
                                    <Input disabled={true} placeholder={preparePlaceholderText('Version')} />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item disabled={formActionType?.viewMode} initialValue={formData?.termConditionDescription} label="Terms & Conditions" name="termConditionDescription">
                                <CustomEditor {...customEditorProps} />
                                {/* onChange={(event, editor) => { const data = editor.getData(), setContent(data)}} */}
                            </Form.Item>
                        </Col>
                        {/* <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {termsAndCondition}
                            <Form.Item name="description" initialValue={termsAndCondition}>
                                <Input disabled={formActionType?.viewMode} value />
                            </Form.Item>
                        </Col> */}
                    </Row>

                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item {...fromDateInitialValue} label="Effective From" name="effectiveFrom" rules={[validateRequiredInputField('date')]}>
                                <DatePicker format="YYYY-MM-DD" disabled={formActionType?.viewMode} style={{ width: '100%' }} onChange={handleFromDateChange} disabledDate={disableFromDate} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item {...toDateInitialValue} label="Effective To" name="effectiveTo">
                                <DatePicker format="YYYY-MM-DD" disabled={formActionType?.viewMode} style={{ width: '100%' }} onChange={handleToDateChange} disabledDate={disableToDate} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            ) : (
                <ViewTermConditionList {...viewProps} />
            )}
            {/* <Row gutter={20} className={style.formFooter}>
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
            </Row> */}
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
