import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, TreeSelect } from 'antd';
// import { FaSearch } from 'react-icons/fa';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateMobileNoField, validateEmailField, validatePanField } from 'utils/validation';

import styles from 'pages/common/Common.module.css';
import TreeSelectField from '../TreeSelectField';
import { DEALER_HIERARCHY } from 'constants/modules/dealerHierarchy';
import { dealerData } from './test';

const { Option } = Select;

const AddEditFormMain = ({ isChecked, setSelectedTreeKey, setIsChecked, flatternData, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, geoData,fieldNames }) => {
    console.log(fieldNames,'NameCheck')
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const disabledProps = { disabled: isReadOnly };

    // const [ active, setActive ] = useState(activeStatus);
    const [seletedAttribute, setSeletedAttribute] = useState(null);

    const handleChange = (event) => {
        setSeletedAttribute(event);
    };

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    if (formActionType === 'edit' || formActionType === 'view') {
        treeCodeId = formData?.geoParentCode;
    } else if (formActionType === 'child') {
        treeCodeId = selectedTreeKey;
        treeCodeReadOnly = true;
    } else if (formActionType === 'sibling') {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = treeCodeData && treeCodeData?.data?.geoParentCode;
    }

    useEffect(() => {
        if (formActionType === 'sibling') {
            setSelectedTreeKey([treeCodeId]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    attributeData = [
        { hierarchyAttribueId: 'PARNT', hierarchyAttribueName: 'Parent Group' },
        { hierarchyAttribueId: 'COMP', hierarchyAttribueName: 'Dealer Company' },
        { hierarchyAttribueId: 'GSTIN', hierarchyAttribueName: 'GSTIN' },
        { hierarchyAttribueId: 'LOCTN', hierarchyAttribueName: 'Dealer Branch' },
    ];

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: dealerData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
    };

    const defaultForm = (
        <div>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.attributeId} name="attributeId" label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder="Select" {...disabledProps} onChange={handleChange} showSearch allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={treeCodeId} label="Parent" placeholder="Please Select" name="dealerParentCode">
                        <TreeSelectField {...treeSelectFieldProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.code} label="Code" name="code" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                        <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={formData?.shortDescription} label="Short Description" name="shortDescription" rules={[validateRequiredInputField('Name')]}>
                        <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={formData?.longDescription} label="Long Description" name="longDescription" rules={[validateRequiredInputField('Name')]}>
                        <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
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

    const parentGroupForm = 'parentGroup';
    const companyGroupForm = 'companyGroup';
    const gstinGroupForm = 'gstinGroup';
    const branchGroupForm = 'branchGroup';

    

    return (
        <>
            {!seletedAttribute && defaultForm}

            {seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ?
                <div>
                    <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.attributeId} name={[parentGroupForm, 'id']} label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder="Select" {...disabledProps} onChange={handleChange} showSearch allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={treeCodeId} label="Parent" placeholder="Please Select" name={[parentGroupForm, 'parentId']}>
                        <TreeSelect
                            treeLine={true}
                            treeIcon={true}
                            onChange={handleSelectTreeClick}
                            defaultValue={treeCodeId}
                            showSearch
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            placeholder="Select"
                            allowClear
                            treeDefaultExpandAll
                            fieldNames={fieldNames}
                            treeData={geoData}
                            disabled={treeCodeReadOnly || isReadOnly}
                        />
                    </Form.Item>
                </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.code} label="Code" name={[parentGroupForm, 'code']} rules={[validateRequiredInputField('Code'),validationFieldLetterAndNumber('code')]}>
                                <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.shortDescription} label="Short Description" name={[parentGroupForm, 'shortDescription']} rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.longDescription} label="Long Description" name={[parentGroupForm, 'longDescription']} rules={[validateRequiredInputField('Long Description')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.ownerName} label="Owner Name" name={[parentGroupForm, 'ownerName']} rules={[validateRequiredInputField('Owner Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.contactNumber} label="Contact Number" name={[parentGroupForm, 'contactNumber']} rules={[validateRequiredInputField('Contact Number'),validateMobileNoField('Contact Number')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.emailId} label="Email ID" name={[parentGroupForm, 'emailId']} rules={[validateRequiredInputField('Email ID'),validateEmailField('Email ID')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
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
                </div> :
                seletedAttribute === DEALER_HIERARCHY.COMP.KEY ?
                    <div>
                        <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item initialValue={formData?.attributeId} name={[companyGroupForm, 'id']} label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                            <Select loading={!isDataAttributeLoaded} placeholder="Select" {...disabledProps} onChange={handleChange} showSearch allowClear>
                                {attributeData?.map((item) => (
                                    <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                        <Form.Item initialValue={treeCodeId} label="Parent" placeholder="Please Select" name={[companyGroupForm, 'parentId']}>
                            <TreeSelect
                                treeLine={true}
                                treeIcon={true}
                                onChange={handleSelectTreeClick}
                                defaultValue={treeCodeId}
                                showSearch
                                dropdownStyle={{
                                    maxHeight: 400,
                                    overflow: 'auto',
                                }}
                                placeholder="Select"
                                allowClear
                                treeDefaultExpandAll
                                fieldNames={fieldNames}
                                treeData={geoData}
                                disabled={treeCodeReadOnly || isReadOnly}
                            />
                        </Form.Item>
                    </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.code} label="Code" name={[companyGroupForm, 'code']} rules={[validateRequiredInputField('Code'),validationFieldLetterAndNumber('code')]}>
                                    <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                <Form.Item initialValue={formData?.shortDescription} label="Short Description" name={[companyGroupForm, 'shortDescription']} rules={[validateRequiredInputField('Name')]}>
                                    <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                <Form.Item initialValue={formData?.longDescription} label="Long Description" name="longDescription" rules={[validateRequiredInputField('Name')]}>
                                    <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                <Form.Item initialValue={formData?.regesteredAddressOfCompany} label="Registered Address of the Company" name={[companyGroupForm, 'regesteredAddressOfCompany']} rules={[validateRequiredInputField('Registered Address of the Company')]}>
                                    <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                <Form.Item initialValue={formData?.tinNumber} label="TIN Number" name={[companyGroupForm, 'tinNumber']} rules={[validateRequiredInputField('TIN Number')]}>
                                    <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                <Form.Item initialValue={formData?.tanNumber} label="TAN Number" name={[companyGroupForm, 'tanNumber']} rules={[validateRequiredInputField('TAN Number')]}>
                                    <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.panNumber} label="PAN Number" name={[companyGroupForm, 'panNumber']} rules={[validateRequiredInputField('PAN Number'),validatePanField('PAN Number')]}>
                                    <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                                <Form.Item label="Status" name={[companyGroupForm, 'status']}>
                                    <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.status === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div> :
                    seletedAttribute === DEALER_HIERARCHY.GSTIN.KEY ?
                        <div>
                            <Row gutter={20}>  
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item initialValue={formData?.attributeId} name={[gstinGroupForm, 'id']} label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                            <Select loading={!isDataAttributeLoaded} placeholder="Select" {...disabledProps} onChange={handleChange} showSearch allowClear>
                                {attributeData?.map((item) => (
                                    <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                        <Form.Item initialValue={treeCodeId} label="Parent" placeholder="Please Select" name={[gstinGroupForm, 'parentId']}>
                            <TreeSelect
                                treeLine={true}
                                treeIcon={true}
                                onChange={handleSelectTreeClick}
                                defaultValue={treeCodeId}
                                showSearch
                                dropdownStyle={{
                                    maxHeight: 400,
                                    overflow: 'auto',
                                }}
                                placeholder="Select"
                                allowClear
                                treeDefaultExpandAll
                                fieldNames={fieldNames}
                                treeData={geoData}
                                disabled={treeCodeReadOnly || isReadOnly}
                            />
                        </Form.Item>
                    </Col>
                            </Row>
                            <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.code} label="Code" name="code" rules={[validateRequiredInputField('Code'),validationFieldLetterAndNumber('code')]}>
                                    <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                <Form.Item initialValue={formData?.shortDescription} label="Short Description" name="shortDescription" rules={[validateRequiredInputField('Name')]}>
                                    <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                </Form.Item>
                            </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                    <Form.Item initialValue={formData?.longDescription} label="Long Description" name="longDescription" rules={[validateRequiredInputField('Long Description')]}>
                                        <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                    <Form.Item initialValue={formData?.centerJurisdiction} label="Centre Jurisdiction" name={[gstinGroupForm, 'centerJurisdiction']} rules={[validateRequiredInputField('Name')]}>
                                        <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                    <Form.Item initialValue={formData?.stateJurisdiction} label="State Jurisdiction" name={[gstinGroupForm, 'stateJurisdiction']} rules={[validateRequiredInputField('State Jurisdiction')]}>
                                        <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                    <Form.Item initialValue={formData?.dateOfRegistertion} label="Date of Registration" name={[gstinGroupForm, 'dateOfRegistertion']} rules={[validateRequiredInputField('Date of Registration')]}>
                                        <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                    <Form.Item initialValue={formData?.consitutionOfBusiness} label="Constitution of Business" name={[gstinGroupForm, 'consitutionOfBusiness']} rules={[validateRequiredInputField('Constitution of Business')]}>
                                        <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                    <Form.Item initialValue={formData?.taxPayerType} label="Taxpayer Type" name={[gstinGroupForm, 'taxPayerType']} rules={[validateRequiredInputField('Taxpayer Type')]}>
                                        <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
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
                        </div> :
                        seletedAttribute === DEALER_HIERARCHY.LOCTN.KEY ?
                            <div>
                                    
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.attributeId} name={[branchGroupForm, 'id']} label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                                            <Select loading={!isDataAttributeLoaded} placeholder="Select" {...disabledProps} onChange={handleChange} showSearch allowClear>
                                                {attributeData?.map((item) => (
                                                    <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                        <Form.Item initialValue={treeCodeId} label="Parent" placeholder="Please Select" name={[branchGroupForm, 'parentId']}>
                                            <TreeSelect
                                                treeLine={true}
                                                treeIcon={true}
                                                onChange={handleSelectTreeClick}
                                                defaultValue={treeCodeId}
                                                showSearch
                                                dropdownStyle={{
                                                    maxHeight: 400,
                                                    overflow: 'auto',
                                                }}
                                                placeholder="Select"
                                                allowClear
                                                treeDefaultExpandAll
                                                fieldNames={fieldNames}
                                                treeData={geoData}
                                                disabled={treeCodeReadOnly || isReadOnly}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.geoCode} label="Code" name="code" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                                            <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                        <Form.Item initialValue={formData?.shortDescription} label="Short Description" name="shortDescription" rules={[validateRequiredInputField('Name')]}>
                                            <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                        <Form.Item initialValue={formData?.longDescription} label="Long Description" name="longDescription" rules={[validateRequiredInputField('Name')]}>
                                            <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                        <Form.Item initialValue={formData?.gstin} label="GSTIN" name={[branchGroupForm, 'gstin']} rules={[validateRequiredInputField('GSTIN')]}>
                                            <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                        <Form.Item initialValue={formData?.branchAddress} label="Branch Address" name={[branchGroupForm, 'branchAddress']} rules={[validateRequiredInputField('Branch Address')]}>
                                            <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                        <Form.Item initialValue={formData?.locality} label="Locality" name={[branchGroupForm, 'locality']} rules={[validateRequiredInputField('Locality')]}>
                                            <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                        <Form.Item initialValue={formData?.city} label="City" name={[branchGroupForm, 'city']} rules={[validateRequiredInputField('City')]}>
                                            <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                                        <Form.Item initialValue={formData?.state} label="State" name={[branchGroupForm, 'state']} rules={[validateRequiredInputField('State')]}>
                                            <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>


                                <Row gutter={20}>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.cityClassification} label="City Classification" name={[branchGroupForm, 'cityClassification']} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                                            <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                                        <Form.Item label="Status" name={[branchGroupForm, 'status']}>
                                            <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.status === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div> :
                            null
            }

        </>
    );
};

export const AddEditForm = AddEditFormMain;
