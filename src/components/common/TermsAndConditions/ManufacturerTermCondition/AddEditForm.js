import React, { useState, useEffect } from 'react';
import { Input, Form, Col, Row, Button, Select, DatePicker } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/Common.module.css';
import { ViewTermConditionList } from './ViewTermConditionList';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';
import { CustomEditor } from 'components/common/CustomEditor';
import { convertCalenderDate } from 'utils/formatDateTime';
import dayjs from 'dayjs';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, productHierarchyList, documentTypeList, languageList, formActionType: { editMode, viewMode, isViewModeVisible } = undefined, onFinish, onFinishFailed, footerEdit, setIsFormVisible, onSaveShowLoading } = props;
    // const dateInitialValue = { initialValue: convertCalenderDate(formData?.includedOn, 'YYYY/MM/DD') };
    const { buttonData, setButtonData, handleButtonClick, formActionType, effectiveFrom, effectiveTo, seteffectiveFrom, seteffectiveTo } = props;
    const { productName, setProductName } = props;
    const { documentName, setDocumentName } = props;
    const { languageName, setLanguageName } = props;
    const { termsAndCondition, setTermsAndCondition } = props;
    //const [ termConditionDescription , setTermConditionDescription ] = useState("");
    const [contentEditor, setContentEditor] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();

    const onChangeCkEditor = (e, editor) => {
        setTermsAndCondition(e.editor.getData());
    };
    useEffect(() => {
        form.resetFields();
    }, [effectiveFrom, effectiveTo]);
    const { TextArea } = Input;

    const handleProductHierarchySelect = (label, value) => {
        setProductName(value.children);
        console.log(' productName ' + productName);
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
        saveButtonName: formActionType?.editMode ? 'Revise T&C' : 'Add T&C',
    };
    const handleFromDateChange = (value) => {
        setStartDate(value);
    };

    const handleToDateChange = (value) => {
        setEndDate(value);
    };

    const disableFromDate = (value) => {
        return value < dayjs().endOf('day');
        // value > endDate;
    };

    const disableToDate = (value) => {
        return value < startDate;
    };

    const customEditorProps = {
        data: formData?.termConditionDescription ? formData?.termConditionDescription : '',
    };
    const fromDateInitialValue = { initialValue: convertCalenderDate(formData?.effectivefrom, 'YYYY/MM/DD') };
    const toDateInitialValue = { initialValue: convertCalenderDate(formData?.effectiveto ? formData?.effectiveto : new Date('December 31, 9999'), 'YYYY/MM/DD') };
    return (
        <Form autoComplete="off" form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} onFieldsChange={handleFormFieldChange}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={formActionType?.editMode || formActionType?.viewMode ? 'Revised' : 'Initial'} label="Document Category" name="documentcategory">
                                <Input disabled={true} maxLength={10} placeholder={preparePlaceholderText('Document Category')} />
                            </Form.Item>
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={formData?.productcode} label="Product Hierarchy" name="productcode">
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
                            <Form.Item initialValue={formData?.languageDesc} label="Language" name="languageCode">
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
                            <Form.Item disabled={formActionType?.viewMode} label="Terms & Conditions" initialValue={formData?.termConditionDescription}>
                                <CustomEditor data={formData?.termsconditiondescription} />
                            </Form.Item>
                        </Col>
                        {/* <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {termsAndCondition}*/}
                        <Form.Item name="termConditionDescription" initialValue={termsAndCondition}>
                            <Input disabled={formActionType?.viewMode} type="hidden" />
                        </Form.Item>
                        {/* </Col> */}
                    </Row>

                    {/*<Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item  {...dateInitialValue} label="Effective From" name="effectivefrom" >
                                <DatePicker format="YYYY/MM/DD" disabled={formActionType?.viewMode} style={{ width: '100%' }}  />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item {...dateInitialValue}  label="Effective To" name="effectiveto">
                                <DatePicker format="YYYY/MM/DD" format={dateFormat} disabled={formActionType?.viewMode} style={{ width: '100%' }}  />
                            </Form.Item>
                        </Col>
                        </Row> */}

                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item {...fromDateInitialValue} label="Effective From" name="effectivefrom" rules={[validateRequiredInputField('date')]}>
                                <DatePicker disabled={formActionType?.viewMode} style={{ width: '100%' }} selected={startDate} onChange={handleFromDateChange} disabledDate={disableFromDate} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item {...toDateInitialValue} label="Effective To" name="effectiveto">
                                <DatePicker disabled style={{ width: '100%' }} onChange={handleToDateChange} disabledDate={disableToDate} />
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
