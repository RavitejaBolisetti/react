/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Space, Typography, Card, Divider, Switch, Button, Empty } from 'antd';

import { validateEmailField, validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { FiEye, FiTrash } from 'react-icons/fi';

import { PARAM_MASTER } from 'constants/paramMaster';
import { NameChangeHistory } from './NameChangeHistory';

import styles from 'components/common/Common.module.css';
import Svg from 'assets/images/Filter.svg';
import Dragger from 'antd/es/upload/Dragger';

const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { form, typeData, formData, corporateLovData, formActionType: { editMode } = undefined, customerType } = props;
    const { setUploadedFileName, downloadFileFromList, fileList, setFileList, handleFormValueChange, userId, uploadDocumentFile, setUploadedFile, listShowLoading, showGlobalNotification, setEmptyList } = props;

    const { whatsAppConfiguration, setWhatsAppConfiguration } = props;
    const { contactOverWhatsApp, contactOverWhatsAppActive, sameMobileNoAsWhatsApp, sameMobileNoAsWhatsAppActive } = whatsAppConfiguration;

    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [corporateType, setCorporateType] = useState('');

    const [showStatus, setShowStatus] = useState('');
    useEffect(() => {
        if (showStatus.status === 'done') {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: `${showStatus.name} file uploaded successfully` });
        } else if (showStatus.status === 'error') {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Error' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showStatus]);

    useEffect(() => {
        setCorporateType(formData?.corporateType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.corporateType]);

    useEffect(() => {

        setWhatsAppConfiguration({ contactOverWhatsApp: formData?.whatsappCommunicationIndicator, sameMobileNoAsWhatsApp: formData?.mobileNumberAsWhatsappNumber });
        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[formData])

    const onDrop = (e) => {};

    const uploadProps = {
        multiple: false,
        accept: 'image/png, image/jpeg, application/pdf',
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            removeIcon: <FiTrash />,
            downloadIcon: <FiEye onClick={() => downloadFileFromList()} style={{ color: '#ff3e5b' }} />,
            showProgress: true,
        },
        progress: { strokeWidth: 3, showInfo: true },
        onDrop,
        onChange: (info) => {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            setFileList(fileList);
            handleFormValueChange();
            const { status } = info.file;
            setShowStatus(info.file);
            if (status === 'done') {
                setUploadedFile(info?.file?.response?.docId);
                setUploadedFileName(info?.file?.response?.documentName);
            }
        },
    };

    const handleUpload = (options) => {
        const { file, onSuccess, onError } = options;
        setEmptyList(true);

        const data = new FormData();
        data.append('applicationId', 'app');
        data.append('file', file);

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        uploadDocumentFile(requestData);
    };

    const handleCorporateChange = (value) => {
        setCorporateType(value);
        if (value === 'NON-LIS') {
            form.setFieldsValue({
                corporateName: null,
            });
        } else if (value === 'LIS') {
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

    const validateSameNumber = (_, value) => {
        const { mobileNumber } = form.getFieldsValue();
        if (value === mobileNumber && contactOverWhatsApp && !sameMobileNoAsWhatsApp) {
            return Promise.reject('whatsapp number same as mobile number');
        } else {
            return Promise.resolve('');
        }
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
                                    <Select disabled={true} placeholder={preparePlaceholderSelect('customer type')} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.[PARAM_MASTER?.CUST_TYPE?.id]} allowClear></Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.cardInsideBox}>
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Text style={{ fontSize: '16px' }} strong>
                                    Customer Name
                                </Text>
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
                                        <div className={styles.uploadContainer} style={{ opacity: '100' }}>
                                            <Dragger fileList={fileList} customRequest={handleUpload} {...uploadProps}>
                                                <div>
                                                    <img src={Svg} alt="" />
                                                </div>
                                                <Empty
                                                    description={
                                                        <>
                                                            <span>Upload supporting documents</span>
                                                            <span>
                                                                <br />
                                                                File type should be .png and .jpg and max file size to be 5MB
                                                            </span>
                                                        </>
                                                    }
                                                />

                                                <Button type="primary">Upload File</Button>
                                            </Dragger>
                                        </div>
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
                                <Form.Item label="Contact over WhatsApp?" initialValue={formData?.whatsappCommunicationIndicator} name="whatsappCommunicationIndicator" data-testid="contactedOverWhatsapp">
                                    <Switch
                                        onChange={(prev) => {
                                            if (!prev) {
                                                form.setFieldsValue({ whatsAppNumber: null });
                                                setWhatsAppConfiguration({ contactOverWhatsAppActive: true, sameMobileNoAsWhatsApp: false, sameMobileNoAsWhatsAppActive: true });
                                            }
                                        }}
                                        checked={contactOverWhatsApp}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Want to use mobile no as WhatsApp no?" initialValue={formData?.mobileNumberAsWhatsappNumber} name="mobileNumberAsWhatsappNumber" data-testid="useMobileNumber">
                                    <Switch
                                        disabled={sameMobileNoAsWhatsAppActive}
                                        onChange={() => {
                                            form.validateFields(['whatsAppNumber']);
                                        }}
                                        checked={sameMobileNoAsWhatsApp}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Whatsapp Number" initialValue={formData?.whatsAppNumber} name="whatsAppNumber" data-testid="whatsAppNumber" rules={[validateMobileNoField('whatsapp number'), { validator: validateSameNumber }]}>
                                    <Input placeholder={preparePlaceholderText('WhatsApp Number')} disabled={contactOverWhatsAppActive} maxLength={10} />
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
