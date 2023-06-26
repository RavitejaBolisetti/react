/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { useState } from 'react';
import { Col, Input, Form, Row, Select, Space, Typography, Card, Divider, Switch, Button } from 'antd';

import { validateEmailField, validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { BiTimeFive } from 'react-icons/bi';
import UploadUtils from '../../Common/UploadUtils';

import { NameChangeHistory } from './NameChangeHistory';
import styles from 'components/common/Common.module.css';

const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { form, typeData, formData, corporateLovData, setUploadImgDocId, isViewModeVisible, formActionType: { editMode } = undefined, customerType } = props;
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [mobileLoader, setmobileLoader] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [corporateType, setCorporateType] = useState('');

    const handleToggle = () => {
        setIsEnabled(!isEnabled);
    };

    const handleCorporateChange = (value) => {
        setCorporateType(value);
        if(value === 'NON-LIS'){
            form.setFieldsValue({
                corporateName: null,
            });
        }
    
    };

    const copyWhatsNo = (props) => {
        if (props) {
            let number = form.getFieldsValue();
            form.setFieldsValue({
                whatsAppNumber: number?.mobileNumber,
            });
        } else {
            form.setFieldsValue({
                whatsAppNumber: null,
            });
        }
    };

    // const handleNumberValidation = (event) => {
    //     const Mno = event.target.value;
    //     const regex = new RegExp('^([5-9]){1}([0-9]){9}$');
    //     if (Mno?.length === 10 && regex.test(Mno)) {
    //         setmobileLoader(true);
    //         setTimeout(() => {
    //             setIsModalOpen(true);
    //         }, 1000);
    //     } else {
    //         setmobileLoader(false);
    //     }
    // };
    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    //     setmobileLoader(false);
    // };

    const onHandleSelect = (value) => {
        form.setFieldsValue({
            corporateCode: value,
        });
    };

    // const modalProps = {
    //     isVisible: isModalOpen,
    //     icon: <BiLockAlt />,
    //     titleOverride: 'Mobile Number Validation',
    //     closable: false,
    //     onCloseAction: handleCancel,
    // };

    const changeHistoryClose = () => {
        setIsHistoryVisible(false);
    };

    const changeHistoryProps = {
        isVisible: isHistoryVisible,
        onCloseAction: changeHistoryClose,
    };

    return (
        <>
            <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                <Card style={{ backgroundColor: '#F2F2F2' }}>
                    <div className={styles.blockSection}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                {/* {editMode ? (
                                <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber} name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number')]}>
                                    <Input
                                        placeholder={preparePlaceholderText('mobile number')}
                                        onChange={handleNumberValidation}
                                        maxLength={10}
                                        size="small"
                                        suffix={
                                            <>
                                                {false ? (
                                                    <Button loading={mobileLoader} onClick={showModal} type="link">
                                                        Validate
                                                    </Button>
                                                ) : (
                                                    <CheckOutlined style={{ color: '#70c922', fontSize: '16px', fotWeight: 'bold' }} />
                                                )}
                                                <ValidateMobileNumberModal {...modalProps} />
                                            </>
                                        }
                                    />
                                </Form.Item>
                            ) : (
                               
                            )} */}
                                <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber} name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number'), validateRequiredInputField('mobile number')]}>
                                    <Input placeholder={preparePlaceholderText('mobile number')} maxLength={10} size="small" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={customerType} label="Customer Type" name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                                    <Select disabled={true} placeholder={preparePlaceholderSelect('customer type')} fieldNames={{ label: 'value', value: 'key' }} options={typeData['CUST_TYPE']} allowClear></Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    {/* <Divider /> */}
                    <div className={styles.cardInsideBox}>
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Text style={{ fontSize: '16px' }} strong>
                                    Customer Name
                                </Text>
                            </Col>

                            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
                                {editMode && (
                                    <Button type="link" icon={<BiTimeFive />}>
                                        View History
                                    </Button>
                                )}
                            </Col>
                        </Row>

                        <Divider />
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                <Form.Item label="Title" initialValue={formData?.titleCode} name="titleCode" data-testid="title" rules={[validateRequiredSelectField('title')]}>
                                    <Select placeholder={preparePlaceholderSelect('title')} fieldNames={{ label: 'value', value: 'key' }} options={typeData['TITLE']}></Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                <Form.Item label="First Name" initialValue={formData?.firstName} name="firstName" data-testid="firstName" rules={[validateRequiredInputField('first name')]}>
                                    <Input placeholder={preparePlaceholderText('first name')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                <Form.Item label="Middle Name" initialValue={formData?.middleName} name="middleName" data-testid="middleName">
                                    <Input placeholder={preparePlaceholderText('middle name')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                <Form.Item label="Last Name" initialValue={formData?.lastName} name="lastName" data-testid="lastName" rules={[validateRequiredInputField('last name')]}>
                                    <Input placeholder={preparePlaceholderText('last name')} />
                                </Form.Item>
                            </Col>

                            {editMode && (
                                <>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <UploadUtils {...props} isViewModeVisible={isViewModeVisible} setUploadImgDocId={setUploadImgDocId} />
                                    </Col>
                                </>
                            )}
                        </Row>
                    </div>
                    <Divider />
                    <div className={styles.blockSection}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Email ID" initialValue={formData?.emailId} name="emailId" data-testid="emailId" rules={[validateEmailField('email id'), validateRequiredInputField('email id')]}>
                                    <Input placeholder={preparePlaceholderText('email id')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                {/* value={formData?.whatsappCommunicationIndicator === null || false ? false : true}  */}
                                <Form.Item label="Do you want to contact over whatsapp?" initialValue={editMode ? formData?.whatsappCommunicationIndicator : false} name="whatsappCommunicationIndicator" data-testid="contactedOverWhatsapp">
                                    <Switch
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                        onChange={(e) => {
                                            handleToggle(e);
                                            copyWhatsNo();
                                        }}
                                        defaultChecked={editMode ? true : formData?.whatsappCommunicationIndicator === true || null || undefined ? true : false}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Want to use Mobile no as whatsapp no?" initialValue={editMode ? formData?.mobileNumberAsWhatsappNumber : false} name="mobileNumberAsWhatsappNumber" data-testid="useMobileNumber">
                                    <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={copyWhatsNo || handleToggle} defaultChecked={editMode ? true : formData?.mobileNumberAsWhatsappNumber === true || null || undefined ? true : false} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Whatsapp Number" initialValue={formData?.whatsAppNumber} name="whatsAppNumber" data-testid="whatsAppNumber" rules={[validateMobileNoField('whatsapp number')]}>
                                    <Input placeholder={preparePlaceholderText('whatsapp number')} disabled={editMode ? isEnabled : !isEnabled} maxLength={10} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    {/* <Divider /> */}
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item label="Corporate Type" initialValue={formData?.corporateType} name="corporateType" data-testid="corporateType" rules={[validateRequiredSelectField('corporate type')]}>
                                <Select placeholder={preparePlaceholderSelect('corporate type')} fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_TYPE']} onChange={handleCorporateChange} allowClear></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item label="Corporate Name" initialValue={corporateType === 'NON-LIS' ? '' : formData?.corporateName} name="corporateName" data-testid="corporateName" rules={[validateRequiredSelectField('corporate name')]}>
                                {corporateType === 'NON-LIS' ? <Input placeholder={preparePlaceholderText('corporate name')} /> : <Select onSelect={onHandleSelect} disabled={false} loading={false} placeholder={preparePlaceholderSelect('corporate name')} fieldNames={{ label: 'value', value: 'key' }} options={corporateLovData} allowClear></Select>}
                            </Form.Item>
                        </Col>

                        {(corporateType === 'LIS' || corporateType === '') && (
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={corporateType === 'LIS' ?  formData?.corporateCode : ''} label="Corporate Code" name="corporateCode" data-testid="corporate code" rules={[validateRequiredInputField('corporate name')]}>
                                    <Input placeholder={preparePlaceholderText('parent company name')} disabled />
                                </Form.Item>
                            </Col>
                        )}

                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item label="Corporate Category" initialValue={formData?.corporateCategory} name="corporateCategory" data-testid="corporateCategory">
                                <Select placeholder={preparePlaceholderSelect('corporate category')} disabled={editMode} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_CATE']}></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item label="Membership Type" initialValue={formData?.membershipType} name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                                <Select placeholder={preparePlaceholderSelect('membership type')} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['MEM_TYPE']}></Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Space>
            <NameChangeHistory {...changeHistoryProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
