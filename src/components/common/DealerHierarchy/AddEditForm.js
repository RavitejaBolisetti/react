import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateMobileNoField, validateEmailField, validatePanField } from 'utils/validation';
import styles from 'pages/common/Common.module.css';
import TreeSelectField from '../TreeSelectField';
import { DEALER_HIERARCHY } from 'constants/modules/dealerHierarchy';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

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

const AddEditFormMain = ({ isChecked, treeData, form, setSelectedTreeKey, setSelectedTreeSelectKey, setIsChecked, flatternData, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, geoData, fieldNames }) => {
    const [seletedAttribute, setSeletedAttribute] = useState(checkType(formData?.type));
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    console.log('🚀 ~ file: AddEditForm.js:27 ~ AddEditFormMain ~ seletedAttribute:', seletedAttribute);
    const disabledProps = { disabled: isReadOnly };

    useEffect(() => {
        formData && setSeletedAttribute(attributeData?.find((i) => i.id === formData?.attributeId)?.hierarchyAttribueCode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleChange = (event) => {
        form?.resetFields();
        setSeletedAttribute(attributeData?.find((i) => i.id === event)?.hierarchyAttribueCode);
    };

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    if (formActionType === 'edit' || formActionType === 'view') {
        treeCodeId = formData?.parentId;
    } else if (formActionType === 'child') {
        treeCodeId = selectedTreeKey;
        treeCodeReadOnly = true;
    } else if (formActionType === 'sibling') {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = treeCodeData && treeCodeData?.data?.parentId;
    }

    useEffect(() => {
        if (formActionType === 'sibling') {
            setSelectedTreeKey([treeCodeId]);
        }
        setSelectedTreeSelectKey(treeCodeId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);
    
    const treeSelectFieldProps = {
        treeFieldNames,
        treeData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('Parent', 'select'),
    };

    const parentGroupForm = 'parentGroup';
    const companyGroupForm = 'companyGroup';
    const gstinGroupForm = 'gstinGroup';
    const branchGroupForm = 'branchGroup';

    const parentIdFormName = seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ? parentGroupForm : seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ? companyGroupForm : seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ? gstinGroupForm : seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ? branchGroupForm : 'parentId';

    const defaultForm = (
        <div>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.code} label="Code" name="code" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                        <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={formData?.shortDescription} label="Short Description" name="shortDescription" rules={[validateRequiredInputField('Name')]}>
                        <Input placeholder={preparePlaceholderText('Short Description')} className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={formData?.longDescription} label="Long Description" name="longDescription" rules={[validateRequiredInputField('Name')]}>
                        <Input placeholder={preparePlaceholderText('Long Description')} className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item label="Status" name="status">
                        <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.status === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.attributeId} name="attributeId" label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('Attribute Level')} {...disabledProps} onChange={handleChange} showSearch allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item?.id}>{item?.hierarchyAttribueName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={formData?.treeCodeId} label="Parent" name={[parentIdFormName, 'parentId']}>
                        <TreeSelectField {...treeSelectFieldProps} />
                    </Form.Item>
                </Col>
            </Row>
            {!seletedAttribute && defaultForm}
            {seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ? (
                <div>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.parentGroupCode} label="Code" name={[parentGroupForm, 'code']} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('code')]}>
                                <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.shortDescription} label="Short Description" name={[parentGroupForm, 'shortDescription']} rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder={preparePlaceholderText('Short Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.longDescription} label="Long Description" name={[parentGroupForm, 'longDescription']} rules={[validateRequiredInputField('Long Description')]}>
                                <Input placeholder={preparePlaceholderText('Long Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.ownerName} label="Owner Name" name={[parentGroupForm, 'ownerName']} rules={[validateRequiredInputField('Owner Name')]}>
                                <Input placeholder={preparePlaceholderText('Owner Name')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.contactNo} label="Contact Number" name={[parentGroupForm, 'contactNumber']} rules={[validateRequiredInputField('Contact Number'), validateMobileNoField('Contact Number')]}>
                                <Input placeholder={preparePlaceholderText('Contact Number')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.emailId} label="Email ID" name={[parentGroupForm, 'emailId']} rules={[validateRequiredInputField('Email ID'), validateEmailField('Email ID')]}>
                                <Input placeholder={preparePlaceholderText('Email ID')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item label="Status" name={[parentGroupForm, 'status']}>
                                <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.status === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : (
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                        <Form.Item label="" name={parentGroupForm} initialValue={null}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            )}
            {seletedAttribute === DEALER_HIERARCHY.COMP.KEY ? (
                <div>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.code} label="Code" name={[companyGroupForm, 'code']} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('code')]}>
                                <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.shortDescription} label="Short Description" name={[companyGroupForm, 'shortDescription']} rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder={preparePlaceholderText('Short Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.longDescription} label="Long Description" name="longDescription" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder={preparePlaceholderText('Long Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.registeredAddressOfCompany} label="Registered Address of the Company" name={[companyGroupForm, 'regesteredAddressOfCompany']} rules={[validateRequiredInputField('Registered Address of the Company')]}>
                                <Input placeholder={preparePlaceholderText('Registered Address of the Company')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.tinNumber} label="TIN Number" name={[companyGroupForm, 'tinNumber']} rules={[validateRequiredInputField('TIN Number')]}>
                                <Input placeholder={preparePlaceholderText('TIN Number')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.tanNumber} label="TAN Number" name={[companyGroupForm, 'tanNumber']} rules={[validateRequiredInputField('TAN Number')]}>
                                <Input placeholder={preparePlaceholderText('TAN Number')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.panNumber} label="PAN Number" name={[companyGroupForm, 'panNumber']} rules={[validateRequiredInputField('PAN Number'), validatePanField('PAN Number')]}>
                                <Input placeholder={preparePlaceholderText('PAN Number')} maxLength={10} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item label="Status" name={[companyGroupForm, 'status']}>
                                <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.status === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : (
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                        <Form.Item label="" name={companyGroupForm} initialValue={null}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            )}

            {seletedAttribute === DEALER_HIERARCHY.GSTIN.KEY ? (
                <div>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.code} label="Code" name={[gstinGroupForm, 'code']} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('code')]}>
                                <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.shortDescription} label="Short Description" name={[gstinGroupForm, 'shortDescription']} rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder={preparePlaceholderText('Short Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.longDescription} label="Long Description" name={[gstinGroupForm, 'longDescription']} rules={[validateRequiredInputField('Long Description')]}>
                                <Input placeholder={preparePlaceholderText('Long Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.centerJurisdiction} label="Centre Jurisdiction" name={[gstinGroupForm, 'centerJurisdiction']} rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder={preparePlaceholderText('Centre Jurisdiction')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.stateJurisdiction} label="State Jurisdiction" name={[gstinGroupForm, 'stateJurisdiction']} rules={[validateRequiredInputField('State Jurisdiction')]}>
                                <Input placeholder={preparePlaceholderText('State Jurisdiction')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.dateOfRegistertion} label="Date of Registration" name={[gstinGroupForm, 'dateOfRegistertion']} rules={[validateRequiredInputField('Date of Registration')]}>
                                <Input placeholder={preparePlaceholderSelect('Date of Registration')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.consitutionOfBusiness} label="Constitution of Business" name={[gstinGroupForm, 'consitutionOfBusiness']} rules={[validateRequiredInputField('Constitution of Business')]}>
                                <Input placeholder={preparePlaceholderText('Constitution of Business')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.taxPayerType} label="Taxpayer Type" name={[gstinGroupForm, 'taxPayerType']} rules={[validateRequiredInputField('Taxpayer Type')]}>
                                <Input placeholder={preparePlaceholderText('Taxpayer Type')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item label="Status" name={[gstinGroupForm, 'status']}>
                                <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.status === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : (
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                        <Form.Item label="" name={gstinGroupForm} initialValue={null}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            )}

            {seletedAttribute === DEALER_HIERARCHY.LOCTN.KEY ? (
                <div>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.geoCode} label="Code" name={[branchGroupForm, 'longDescription']} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                                <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.shortDescription} label="Short Description" name={[branchGroupForm, 'shortDescription']} rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder={preparePlaceholderText('Short Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.longDescription} label="Long Description" name={[branchGroupForm, 'longDescription']} rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder={preparePlaceholderText('Long Description')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.branchAddress} label="Branch Address" name={[branchGroupForm, 'branchAddress']} rules={[validateRequiredInputField('Branch Address')]}>
                                <Input placeholder={preparePlaceholderText('Branch Address')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.locality} label="Locality" name={[branchGroupForm, 'locality']}>
                                <Input placeholder={preparePlaceholderText('Locality')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.city} label="City/District" name={[branchGroupForm, 'city']} rules={[validateRequiredInputField('City')]}>
                                <Input placeholder={preparePlaceholderText('City/District')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.state} label="State" name={[branchGroupForm, 'state']} rules={[validateRequiredInputField('State')]}>
                                <Input placeholder={preparePlaceholderText('State')} className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.cityClassification} label="City Classification" name={[branchGroupForm, 'cityClassification']} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                                <Input placeholder={preparePlaceholderText('City Classification')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item label="Status" name={[branchGroupForm, 'status']}>
                                <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.status === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : (
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                        <Form.Item label="Branch Group" name={branchGroupForm} initialValue={null}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
