/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { useEffect, useState } from 'react';
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
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [corporateType, setCorporateType] = useState('');

    const [firstToggle, setFirstToggle] = useState(false);
    const [secondToggle, setSecondToggle] = useState(false);
    const [disableWhatsapp, setDisableWhatsapp] = useState(true);


    const firstToggleFun = () => {
        setFirstToggle(!firstToggle);
    };

    const secondToggleFun = () => {
        setSecondToggle(!secondToggle);
    }

    const handleCorporateChange = (value) => {
        setCorporateType(value);
        if (value === 'NON-LIS') {
            form.setFieldsValue({
                corporateName: null,
            });
        }else if(value === 'LIS') {
            form.setFieldsValue({
                corporateCode: null,
            });
        }
    };

    const onHandleSelect = (value) => {
        form.setFieldsValue({
            corporateCode: value,
        });
    };

    const changeHistoryClose = () => {
        setIsHistoryVisible(false);
    };

    const changeHistoryProps = {
        isVisible: isHistoryVisible,
        onCloseAction: changeHistoryClose,
    };
    useEffect(() => {
        setCorporateType(formData?.corporateType);

         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formData?.corporateType])

    useEffect( () => {
        setFirstToggle(formData?.whatsappCommunicationIndicator);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formData])

    useEffect( () => {
        setSecondToggle(formData?.mobileNumberAsWhatsappNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formData])

    useEffect( () => {
        
        if(firstToggle && !secondToggle){
            setDisableWhatsapp(false)
        } else if(!firstToggle && !secondToggle){
            setDisableWhatsapp(true);
            form.setFieldsValue({
                whatsAppNumber: null,
            });
        } else if(!firstToggle && secondToggle){
            setSecondToggle(false);
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[firstToggle] );

    useEffect( () => {
        if(secondToggle && firstToggle){
            setDisableWhatsapp(true);
            let number = form.getFieldsValue();
            form.setFieldsValue({
                whatsAppNumber: number?.mobileNumber,
            });
        }else if(firstToggle && !secondToggle){
            setDisableWhatsapp(false);
        } else{
            form.setFieldsValue({
                whatsAppNumber: null,
            });
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondToggle] )
console.log("corporateType",corporateType)
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
                                <Form.Item label="Contact over WhatsApp?" initialValue={formData?.whatsappCommunicationIndicator} name="whatsappCommunicationIndicator" data-testid="contactedOverWhatsapp">
                                    <Switch
                                        onChange={firstToggleFun}
                                        defaultChecked={formData?.whatsappCommunicationIndicator}
                                        checked={firstToggle}
                                        // defaultChecked={editMode ? true : formData?.whatsappCommunicationIndicator === true || null || undefined ? true : false}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Want to use mobile no as WhatsApp no?" initialValue={formData?.mobileNumberAsWhatsappNumber} name="mobileNumberAsWhatsappNumber" data-testid="useMobileNumber">
                                    <Switch
                                        onChange={secondToggleFun}
                                        disabled={!firstToggle}
                                        checked={secondToggle}
                                        defaultChecked={formData?.whatsappCommunicationIndicator}
                                        // defaultChecked={editMode ? true : formData?.mobileNumberAsWhatsappNumber === true || null || undefined ? true : false}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Whatsapp Number" initialValue={editMode ? formData?.whatsAppNumber : false} name="whatsAppNumber" data-testid="whatsAppNumber" rules={[validateMobileNoField('whatsapp number')]}>
                                    <Input placeholder={preparePlaceholderText('WhatsApp Number')} disabled={disableWhatsapp} maxLength={10} />
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
                                <Form.Item initialValue={corporateType === 'LIS' ? formData?.corporateCode : ''} label="Corporate Code" name="corporateCode" data-testid="corporate code" rules={[validateRequiredInputField('corporate code')]}>
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
