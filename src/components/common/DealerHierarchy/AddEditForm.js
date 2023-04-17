import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, Button, DatePicker } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateMobileNoField, validateEmailField, validatePanField } from 'utils/validation';
import styles from 'components/common/Common.module.css';
import TreeSelectField from '../TreeSelectField';
import { DEALER_HIERARCHY } from 'constants/modules/dealerHierarchy';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { withDrawer } from 'components/withDrawer';

const { Option } = Select;

const checkType = (type) => {
    if (type === 'Parent') {
        return 'PARNT';
    } else if (type === 'Company') {
        return 'COMP';
    } else if (type === 'Gstin') {
        return 'GSTIN';
    } else if (type === 'Branch') {
        return 'LOCTN';
    }
};

const AddEditFormMain = (props) => {
    const { isChecked, treeData, setSelectedTreeKey, setSelectedTreeSelectKey, setIsChecked, flatternData, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, fieldNames, onCloseAction, onFinish, onFinishFailed } = props;
    const [seletedAttribute, setSeletedAttribute] = useState(checkType(formData?.type));
    const [inputFormType, setInputFormType] = useState(DEALER_HIERARCHY.PARNT.FORM_NAME);
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    //console.log('🚀 ~ file: AddEditForm.js:31 ~ AddEditFormMain ~ inputFormType:', inputFormType);
    const disabledProps = { disabled: false };
    const [form] = Form.useForm();

    const { isFormBtnActive, setFormBtnActive } = props;

    useEffect(() => {
        if (formData) {
            const formInputType = attributeData?.find((i) => i.id === formData?.attributeId)?.hierarchyAttribueCode;
            formInputType && setSeletedAttribute(formInputType);
            formInputType && setInputFormType(DEALER_HIERARCHY[formInputType]?.FORM_NAME);
            form.setFieldValue('inputFormType', DEALER_HIERARCHY[formInputType]?.FORM_NAME);
            // console.log(DEALER_HIERARCHY[formInputType]?.FORM_NAME,'First Value');
            // console.log( inputFormType, 'Second Value' )
            // form.setFieldValue('inputFormType', 'parentGroup');
            // form.setFieldValue('inputFormType', 'companyGroup');
            // form.setFieldValue('inputFormType', 'gstinGroup');
            // form.setFieldValue('inputFormType', 'branchGroup');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    if (formActionType === FROM_ACTION_TYPE.EDIT) {
        treeCodeId = formData?.parentId;
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        treeCodeId = selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = treeCodeData && treeCodeData?.data?.parentId;
    }

    useEffect(() => {
    //     if (formActionType === 'sibling') {
    //         setSelectedTreeKey([treeCodeId]);
    //     }
        setSelectedTreeSelectKey(treeCodeId);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    const handleChange = (event) => {
        const formInputType = attributeData?.find((i) => i.id === event)?.hierarchyAttribueCode;
        setSeletedAttribute(formInputType);
        setInputFormType(DEALER_HIERARCHY[formInputType].FORM_NAME);
        form.setFieldValue('inputFormType', DEALER_HIERARCHY[formInputType].FORM_NAME);
    };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('Parent', 'select'),
    };

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const parentGroupForm = DEALER_HIERARCHY?.PARNT?.FORM_NAME;
    const companyGroupForm = DEALER_HIERARCHY?.COMP?.FORM_NAME;
    const gstinGroupForm = DEALER_HIERARCHY?.GSTIN?.FORM_NAME;
    const branchGroupForm = DEALER_HIERARCHY?.LOCTN?.FORM_NAME;

    const parentIdFormName = seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ? parentGroupForm : seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ? companyGroupForm : seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ? gstinGroupForm : seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ? branchGroupForm : 'parentId';

    const defaultForm = (
        <div>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={formData?.code} label="Code" name="code" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                        <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={formData?.shortDescription} label="Short Description" name="shortDescription" rules={[validateRequiredInputField('Short Description')]}>
                        <Input placeholder={preparePlaceholderText('Short Description')} className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={formData?.longDescription} label="Long Description" name="longDescription" rules={[validateRequiredInputField('Long Description')]}>
                        <Input placeholder={preparePlaceholderText('Long Description')} className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={formData?.status} label="Status" name="status">
                    <Switch defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)}  {...disabledProps} />
                                {/* checkedChildren="Active" unCheckedChildren="Inactive" */}
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );

    return (
        <Form form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {/* {formData?.attributeId} */}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={formData?.attributeId} name="attributeId" label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('Attribute Level')} {...disabledProps} onChange={handleChange} showSearch allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item?.id}>{item?.hierarchyAttribueName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={treeCodeId} label="Parent" name={[parentIdFormName, 'parentId']}>
                        {/* {treeCodeId} */}
                        <TreeSelectField {...treeSelectFieldProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                {/* <Col xs={0} sm={0} md={0} lg={0} xl={0} className={styles.padLeft10}> */}
                <Col xs={0} sm={0} md={0} lg={0} xl={0} className={styles.padLeft10}> 
                    <Form.Item label="" name={'inputFormType'} initialValue={inputFormType}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            {!seletedAttribute && defaultForm}
            {seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ? (
                <div>
                    {/* {JSON.stringify(formData)} */}
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.code || formData?.parentGroupCode} label="Code" name={[parentGroupForm, 'code']} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('code')]}>
                                <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.shortDescription} label="Short Description" name={[parentGroupForm, 'shortDescription']} rules={[validateRequiredInputField('Short Description')]}>
                                <Input placeholder={preparePlaceholderText('Short Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.longDescription} label="Long Description" name={[parentGroupForm, 'longDescription']} rules={[validateRequiredInputField('Long Description')]}>
                                <Input placeholder={preparePlaceholderText('Long Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.ownerName} label="Owner Name" name={[parentGroupForm, 'ownerName']} rules={[validateRequiredInputField('Owner Name')]}>
                                <Input placeholder={preparePlaceholderText('Owner Name')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.contactNo} label="Contact Number" name={[parentGroupForm, 'contactNo']} rules={[validateRequiredInputField('Contact Number'), validateMobileNoField('Contact Number')]}>
                                <Input placeholder={preparePlaceholderText('Contact Number')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.emailId} label="Email ID" name={[parentGroupForm, 'emailId']} rules={[validateRequiredInputField('Email ID'), validateEmailField('Email ID')]}>
                                <Input placeholder={preparePlaceholderText('Email ID')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={formData?.status} label="Status" name={[parentGroupForm, 'status']}>
                            <Switch defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)}  {...disabledProps} />
                                {/* checkedChildren="Active" unCheckedChildren="Inactive" */}
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : (
                <Row gutter={20}>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} className={styles.padLeft10}>
                        <Form.Item label="" name={parentGroupForm} initialValue={null}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            )}
            {seletedAttribute === DEALER_HIERARCHY.COMP.KEY ? (
                <div>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.code} label="Code" name={[companyGroupForm, 'code']} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('code')]}>
                                <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} {...disabledProps} />
                                {/* disabled={formData?.id || isReadOnly} */}
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.shortDescription} label="Short Description" name={[companyGroupForm, 'shortDescription']} rules={[validateRequiredInputField('Short Description')]}>
                                <Input placeholder={preparePlaceholderText('Short Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.longDescription} label="Long Description" name={[companyGroupForm, 'longDescription']} rules={[validateRequiredInputField('Long Description')]}>
                                <Input placeholder={preparePlaceholderText('Long Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.registeredAddressOfCompany} label="Registered Address of the Company" name={[companyGroupForm, 'registeredAddressOfCompany']} rules={[validateRequiredInputField('Registered Address of the Company')]}>
                                <Input placeholder={preparePlaceholderText('Registered Address of the Company')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.tinNumber} label="TIN Number" name={[companyGroupForm, 'tinNumber']} rules={[validateRequiredInputField('TIN Number')]}>
                                <Input placeholder={preparePlaceholderText('TIN Number')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.tanNumber} label="TAN Number" name={[companyGroupForm, 'tanNumber']} rules={[validateRequiredInputField('TAN Number')]}>
                                <Input placeholder={preparePlaceholderText('TAN Number')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.panNumber} label="PAN Number" name={[companyGroupForm, 'panNumber']} rules={[validateRequiredInputField('PAN Number'), validatePanField('PAN Number')]}>
                                <Input placeholder={preparePlaceholderText('PAN Number')} maxLength={10} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={formData?.status} label="Status" name={[companyGroupForm, 'status']}>
                                <Switch defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)}  {...disabledProps} />
                                {/* checkedChildren="Active" unCheckedChildren="Inactive" */}
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : (
                <Row gutter={20}>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} className={styles.padLeft10}>
                        <Form.Item label="" name={companyGroupForm} initialValue={null}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            )}

            {seletedAttribute === DEALER_HIERARCHY.GSTIN.KEY ? (
                <div>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.code} label="Code" name={[gstinGroupForm, 'code']} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('code')]}>
                                <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.shortDescription} label="Short Description" name={[gstinGroupForm, 'shortDescription']} rules={[validateRequiredInputField('Short Description')]}>
                                <Input placeholder={preparePlaceholderText('Short Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.longDescription} label="Long Description" name={[gstinGroupForm, 'longDescription']} rules={[validateRequiredInputField('Long Description')]}>
                                <Input placeholder={preparePlaceholderText('Long Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.gstinNumber} label="GSTIN Number" name={[gstinGroupForm, 'gstinNumber']} rules={[validateRequiredInputField('GSTIN Number')]}>
                                <Input placeholder={preparePlaceholderText('GSTIN Number')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.centerJurisdiction} label="Centre Jurisdiction" name={[gstinGroupForm, 'centerJurisdiction']} rules={[validateRequiredInputField('Centre Jurisdiction')]}>
                                <Input placeholder={preparePlaceholderText('Centre Jurisdiction')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.stateJurisdiction} label="State Jurisdiction" name={[gstinGroupForm, 'stateJurisdiction']} rules={[validateRequiredInputField('State Jurisdiction')]}>
                                <Input placeholder={preparePlaceholderText('State Jurisdiction')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.dateOfRegistertion} label="Date of Registration" name={[gstinGroupForm, 'dateOfRegistertion']} rules={[validateRequiredInputField('Date of Registration')]}>
                                {/* <Input placeholder={preparePlaceholderSelect('Date of Registration')} className={styles.inputBox} {...disabledProps} /> */}
                                <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} placeholder={preparePlaceholderSelect('Date of Registration')} className={styles.inputBox} {...disabledProps} />
                                
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.consitutionOfBusiness} label="Constitution of Business" name={[gstinGroupForm, 'consitutionOfBusiness']} rules={[validateRequiredInputField('Constitution of Business')]}>
                                <Input placeholder={preparePlaceholderText('Constitution of Business')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.taxPayerType} label="Taxpayer Type" name={[gstinGroupForm, 'taxPayerType']} rules={[validateRequiredInputField('Taxpayer Type')]}>
                                <Input placeholder={preparePlaceholderText('Taxpayer Type')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={formData?.status} label="Status" name={[gstinGroupForm, 'status']}>
                            <Switch defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)}  {...disabledProps} />
                                {/* checkedChildren="Active" unCheckedChildren="Inactive" */}
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : (
                <Row gutter={20}>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} className={styles.padLeft10}>
                        <Form.Item label="" name={gstinGroupForm} initialValue={null}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            )}

            {seletedAttribute === DEALER_HIERARCHY.LOCTN.KEY ? (
                <div>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.code} label="Code" name={[branchGroupForm, 'code']} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                                <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.shortDescription} label="Short Description" name={[branchGroupForm, 'shortDescription']} rules={[validateRequiredInputField('Short Description')]}>
                                <Input placeholder={preparePlaceholderText('Short Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.longDescription} label="Long Description" name={[branchGroupForm, 'longDescription']} rules={[validateRequiredInputField('Long Description')]}>
                                <Input placeholder={preparePlaceholderText('Long Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.branchAddress} label="Branch Address" name={[branchGroupForm, 'branchAddress']} rules={[validateRequiredInputField('Branch Address')]}>
                                <Input placeholder={preparePlaceholderText('Branch Address')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.locality} label="Locality" name={[branchGroupForm, 'locality']}>
                                <Input placeholder={preparePlaceholderText('Locality')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.city} label="City/District" name={[branchGroupForm, 'city']} rules={[validateRequiredInputField('City')]}>
                                <Input placeholder={preparePlaceholderText('City/District')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.state} label="State" name={[branchGroupForm, 'state']} rules={[validateRequiredInputField('State')]}>
                                <Input placeholder={preparePlaceholderText('State')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.cityClassification} label="City Classification" name={[branchGroupForm, 'cityClassification']} rules={[validateRequiredInputField('City Classification')]}>
                                <Input placeholder={preparePlaceholderText('City Classification')} maxLength={6} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item initialValue={formData?.status} label="Status" name={[branchGroupForm, 'status']}>
                            <Switch defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)}  {...disabledProps} />
                                {/* checkedChildren="Active" unCheckedChildren="Inactive" */}
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : (
                <Row gutter={20}>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} className={styles.padLeft10}>
                        <Form.Item label="" name={branchGroupForm} initialValue={null}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            )}

            <Row gutter={20} className={styles.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                    <Button danger onClick={onCloseAction}>
                        Cancel
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                    <Button htmlType="submit" danger disabled={!isFormBtnActive}>
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
