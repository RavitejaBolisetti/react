/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Space, Typography, Card, Divider, Switch, Button, Tag, Upload, Collapse } from 'antd';
import { validateEmailField, validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { UploadUtil } from 'utils/Upload';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';

import { FiEye, FiTrash, FiEdit } from 'react-icons/fi';
import { BiTimeFive } from 'react-icons/bi';

import { PARAM_MASTER } from 'constants/paramMaster';
import { NameChangeHistory } from './NameChangeHistory';

import styles from 'components/common/Common.module.css';
import Svg from 'assets/images/Filter.svg';

const { Dragger } = Upload;
const { Panel } = Collapse;
const { Text, Title } = Typography;

const AddEditFormMain = (props) => {
    const { form, typeData, formData, corporateLovData, formActionType: { editMode } = undefined, customerType } = props;
    const { nameChangeHistoryForm, editedMode, setCustomerNameList, activeKey, setactiveKey, customerNameList, setEditedMode, isHistoryVisible, onViewHistoryChange, changeHistoryClose, setButtonData, buttonData, status, setStatus, showGlobalNotification, setEmptyList } = props;

    const { whatsAppConfiguration, setWhatsAppConfiguration, handleFormFieldChange } = props;
    const { contactOverWhatsApp, contactOverWhatsAppActive, sameMobileNoAsWhatsApp, sameMobileNoAsWhatsAppActive } = whatsAppConfiguration;

    const [corporateType, setCorporateType] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [onSave, setOnSave] = useState(false);
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
        handleFormFieldChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        if (editedMode) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editedMode]);

    const uploadProps = {
        // supportingDocs: true,
        messageText: <>Upload supporting documents</>,
        ...props,
    };

    const onEdit = () => {
        setEditedMode(true);
        setactiveKey(1);
    };

    const onHandleChange = () => {
        nameChangeHistoryForm.validateFields()
            .then(() => {
                setCustomerNameList(nameChangeHistoryForm.getFieldsValue());
                setStatus("Pending");
                setactiveKey([]);
                setEditedMode(false);
                setOnSave(true);
                setButtonData({ ...buttonData, formBtnActive: true });

            })
            .catch((err) => console.error(err));

    }

    const handleResetChange = () => {
        nameChangeHistoryForm.setFieldsValue({ titleCode: null });
        nameChangeHistoryForm.setFieldsValue({ middleName: null });
        nameChangeHistoryForm.setFieldsValue({ firstName: null });
        nameChangeHistoryForm.setFieldsValue({ lastName: null });
    }
    
    const handleCorporateChange = (value) => {
        setCorporateType(value);
        if (value === 'NON-LIS') {
            form.setFieldsValue({
                corporateName: null,
            });
        } else if (value === 'LIS') {
            form.setFieldsValue({
                corporateCode: null,
                corporateName: null,
            });
        }
    };

    const onHandleSelect = (value) => {
        form.setFieldsValue({
            corporateCode: value,
        });
    };

    const onCollapseChange = (value) => {
        setactiveKey(1);
        setEditedMode(true);
    }
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

    // const ImageProps = {
    //     viewDocument,
    //     handleUpload,
    //     uploadProps,
    //     formData,
    // };

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
                    <Form form={nameChangeHistoryForm} id="myForm" autoComplete="off" layout="vertical">
                        <div className={styles.cardInsideBox}>
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Text style={{ fontSize: '16px' }} strong>
                                        Customer Name
                                    </Text>

                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
                                    <Button type="link" onClick={onViewHistoryChange} icon={<BiTimeFive />}>
                                        View History
                                    </Button>
                                </Col>
                            </Row>
                            <Divider />
                            <Collapse expandIcon={expandIcon} activeKey={activeKey} expandIconPosition="end" onChange={() => onCollapseChange(1)} >
                                <Panel header={
                                    <>
                                        <Row type="flex" justify="space-between" align="middle" size="large">
                                            <Row type="flex" justify="space-around" align="middle">
                                                <Typography>
                                                    {customerNameList?.titleCode} {customerNameList?.firstName} {customerNameList?.middleName} {customerNameList?.lastName}
                                                </Typography>
                                                <Button
                                                    type="link"
                                                    icon={<FiEdit />}
                                                    onClick={() => {
                                                        onEdit();
                                                    }}
                                                    disabled={disabled}
                                                    style={{ color: disabled ? 'grey' : 'red' }}
                                                >
                                                    Edit
                                                </Button>
                                            </Row>
                                            {status === 'Pending' ? (
                                                <Tag style={{ textAlign: 'right' }} color="warning">Pending</Tag>) : (status === 'Approved') ? <Tag style={{ textAlign: 'right' }} color="warning">Pending</Tag> : null}
                                        </Row>
                                        {editedMode || onSave ? (
                                            <Text type="secondary">Current Name</Text>
                                        ) :
                                            null
                                        }
                                    </>
                                }
                                    key={1}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                            <Form.Item label="Title" initialValue={customerNameList?.titleCode} name="titleCode" data-testid="title" rules={[validateRequiredSelectField('title')]}>
                                                <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('title')} fieldNames={{ label: 'value', value: 'key' }} options={typeData['TITLE']}></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                            <Form.Item label="First Name" initialValue={customerNameList?.firstName} name="firstName" data-testid="firstName" rules={[validateRequiredInputField('first name')]}>
                                                <Input placeholder={preparePlaceholderText('first name')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                            <Form.Item label="Middle Name" initialValue={customerNameList?.middleName} name="middleName" data-testid="middleName">
                                                <Input placeholder={preparePlaceholderText('middle name')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                            <Form.Item label="Last Name" initialValue={customerNameList?.lastName} name="lastName" data-testid="lastName" rules={[validateRequiredInputField('last name')]}>
                                                <Input placeholder={preparePlaceholderText('last name')} />
                                            </Form.Item>
                                        </Col>

                                        {/* {editMode && (
                                        <>
                                            <div className={styles.uploadDragger}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Space direction="vertical">
                                                        <div className={styles.uploadContainer} style={{ opacity: '100' }}>
                                                            <Dragger customRequest={handleUpload} {...uploadProps} fileList={fileList}>
                                                                <Empty
                                                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                                    description={
                                                                        <>
                                                                            <Title level={5}>Upload supporting documents</Title>
                                                                            <Text>File type should be .png and .jpg and max file size to be 5MB</Text>
                                                                        </>
                                                                    }
                                                                />
                                                                <Button className={styles.marB20} type="primary">
                                                                    Upload File
                                                                </Button>
                                                            </Dragger>
                                                        </div>
                                                    </Space>
                                                </Col>
                                            </div>
                                        </>
                                    )} */}

                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <UploadUtil {...uploadProps} />
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button type="primary" className={styles.marR20} onClick={onHandleChange}>
                                                Save
                                            </Button>
                                            <Button className={styles.marB20} onClick={handleResetChange} danger>
                                                Reset
                                            </Button>
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                            {status === 'Pending' && (
                                <Card title={<>
                                    <Row type="flex" justify="space-between" align="middle" size="large">
                                        <Row type="flex" justify="space-around" align="middle">
                                            <Typography>
                                                {formData?.titleCode} {formData?.firstName} {formData?.middleName} {formData?.lastName}
                                            </Typography>
                                        </Row>
                                    </Row>

                                    <Text type="secondary">Previous Name</Text>

                                </>} />)}
                        </div>
                    </Form>
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
                                <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('corporate type')} fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_TYPE']} onChange={handleCorporateChange} allowClear></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item label="Corporate Name" initialValue={corporateType === 'NON-LIS' ? '' : formData?.corporateName} name="corporateName" data-testid="corporateName" rules={[validateRequiredSelectField('corporate name')]}>
                                {corporateType === 'NON-LIS' ? <Input placeholder={preparePlaceholderText('corporate name')} /> : <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} onSelect={onHandleSelect} disabled={false} loading={false} placeholder={preparePlaceholderSelect('corporate name')} fieldNames={{ label: 'value', value: 'key' }} options={corporateLovData} allowClear></Select>}
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
                                <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('corporate category')} disabled={editMode} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_CATE']}></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item label="Membership Type" initialValue={formData?.membershipType} name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                                <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('membership type')} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['MEM_TYPE']}></Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Space >
            <NameChangeHistory {...changeHistoryProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
