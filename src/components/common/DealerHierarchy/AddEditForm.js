import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, TreeSelect } from 'antd';
// import { FaSearch } from 'react-icons/fa';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';

import styles from 'pages/common/Common.module.css';
import { DEALER_HIERARCHY } from 'constants/modules/dealerHierarchy';

const { Option } = Select;

const AddEditFormMain = ({ isChecked, setSelectedTreeKey, setIsChecked, flatternData, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, geoData }) => {
    const fieldNames = { label: 'geoName', value: 'id', children: 'subGeo' };
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
                    <Form.Item label="Status" name="isActive">
                        <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.isActive === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
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

            {seletedAttribute === DEALER_HIERARCHY.PARNT.KEY ? (
                <div>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.attributeId} name={[parentGroupForm, 'attributeId']} label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                                <Select loading={!isDataAttributeLoaded} placeholder="Select" {...disabledProps} onChange={handleChange} showSearch allowClear>
                                    {attributeData?.map((item) => (
                                        <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={treeCodeId} label="Parent" placeholder="Please Select" name={[parentGroupForm, 'dealerParentCode']}>
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
                            <Form.Item initialValue={formData?.code} label="Code" name={[parentGroupForm, 'code']} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
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
                            <Form.Item initialValue={formData?.longDescription} label="Long Description" name={[parentGroupForm, 'longDescription']} rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.ownerName} label="Owner Name" name={[parentGroupForm, 'ownerName']} rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.contactNumber} label="Contact Number" name={[parentGroupForm, 'contactNumber']} rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.emailId} label="Email ID" name={[parentGroupForm, 'emailId']} rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item label="Status" name={[parentGroupForm, 'isActive']}>
                                <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.isActive === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : seletedAttribute === DEALER_HIERARCHY.COMP.KEY ? (
                <div>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.attributeId} name={[companyGroupForm, 'attributeId']} label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                                <Select loading={!isDataAttributeLoaded} placeholder="Select" {...disabledProps} onChange={handleChange} showSearch allowClear>
                                    {attributeData?.map((item) => (
                                        <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={treeCodeId} label="Parent" placeholder="Please Select" name={[companyGroupForm, 'dealerParentCode']}>
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
                            <Form.Item initialValue={formData?.regesteredAddressOfCompany} label="Registered Address of the Company" name="regesteredAddressOfCompany" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.tinNumber} label="TIN Number" name="tinNumber" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.tanNumber} label="TAN Number" name="tanNumber" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.panNumber} label="PAN Number" name="panNumber" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                                <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item label="Status" name="isActive">
                                <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.isActive === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : seletedAttribute === DEALER_HIERARCHY.GSTIN.KEY ? (
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
                            <Form.Item initialValue={formData?.centerJurisdiction} label="Centre Jurisdiction" name="centerJurisdiction" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.stateJurisdiction} label="State Jurisdiction" name="stateJurisdiction" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.dateOfRegistertion} label="Date of Registration" name="dateOfRegistertion" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.consitutionOfBusiness} label="Constitution of Business" name="consitutionOfBusiness" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.taxPayerType} label="Taxpayer Type" name="taxPayerType" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item label="Status" name="isActive">
                                <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.isActive === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : seletedAttribute === DEALER_HIERARCHY.LOCTN.KEY ? (
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
                            <Form.Item initialValue={formData?.gstin} label="GSTIN" name="gstin" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.branchAddress} label="Branch Address" name="branchAddress" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.locality} label="Locality" name="locality" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.city} label="City" name="city" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                            <Form.Item initialValue={formData?.state} label="State" name="state" rules={[validateRequiredInputField('Name')]}>
                                <Input placeholder="Enter Data" className={styles.inputBox} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.cityClassification} label="City Classification" name="cityClassification" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                                <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                            <Form.Item label="Status" name="isActive">
                                <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.isActive === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ) : null}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
