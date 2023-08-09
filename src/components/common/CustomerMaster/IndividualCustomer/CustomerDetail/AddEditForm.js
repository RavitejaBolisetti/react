/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Space, Typography, Card, Divider, Switch, Button, Tag, Collapse } from 'antd';
import { validateEmailField, validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';
import { UploadUtil } from 'utils/Upload';

import { FiDownload } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';
import { BiTimeFive } from 'react-icons/bi';

import { PARAM_MASTER } from 'constants/paramMaster';
import { STATUS } from './statusConstant';
import { NameChangeHistory } from './NameChangeHistory';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { form, typeData, formData, corporateLovData, formActionType: { editMode } = undefined, customerType } = props;

    const { nameChangeRequestform, editedMode, setCustomerNameList, data, activeKey, setactiveKey, customerNameList, fileList, setFileList, selectedCustomerId, setEditedMode, isHistoryVisible, onViewHistoryChange, downloadFileFromButton, changeHistoryClose, setButtonData, buttonData, status, setStatus, showGlobalNotification } = props;
    const { whatsAppConfiguration, setWhatsAppConfiguration, handleFormFieldChange } = props;
    const { contactOverWhatsApp, contactOverWhatsAppActive, sameMobileNoAsWhatsApp, sameMobileNoAsWhatsAppActive } = whatsAppConfiguration;

    // const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [corporateType, setCorporateType] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [onSave, setOnSave] = useState(false);
    const [showStatus, setShowStatus] = useState('');
    const [singleDisabled, setSingleDisabled] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

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
        form.setFieldsValue({
            mobileNumber: data?.mobileNumber,
        });
    }, [data?.mobileNumber, form]);

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
        form: nameChangeRequestform,
        messageText: <>Upload supporting documents</>,
        single: true,
        singleDisabled,
        setSingleDisabled,
        flag: true,
        ...props,
    };

    const onEdit = () => {
        setEditedMode(true);
        setactiveKey(1);
    };

    const onChange = () => {
        const key1 = Object.keys(formData);
        const key2 = Object.keys(nameChangeRequestform.getFieldsValue());

        if (key1.some((key) => key2.includes(key))) {
            setHasChanges(true);
        }
    };

    const onHandleSave = () => {
        nameChangeRequestform
            .validateFields()
            .then(() => {
                if (fileList.length === 0 && formData?.supportingDocuments === null) {
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Kindly Upload Document' });
                } else {
                    onChange();
                    if (hasChanges) {
                        setHasChanges(false);
                        setCustomerNameList(nameChangeRequestform.getFieldsValue());
                        setStatus(STATUS?.PENDING?.title);
                        setactiveKey([]);
                        setEditedMode(false);
                        setOnSave(true);
                        setButtonData({ ...buttonData, formBtnActive: true });
                    } else {
                        showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Current and Previous Name cannot be same' });
                    }
                }
            })
            .catch((err) => console.error(err));
    };

    const handleResetChange = () => {
        nameChangeRequestform.setFieldsValue({ titleCode: null });
        nameChangeRequestform.setFieldsValue({ middleName: null });
        nameChangeRequestform.setFieldsValue({ firstName: null });
        nameChangeRequestform.setFieldsValue({ lastName: null });
        setFileList([]);
        setSingleDisabled(false);
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
    };
    const changeHistoryProps = {
        isVisible: isHistoryVisible,
        onCloseAction: changeHistoryClose,
        selectedCustomerId,
        downloadFileFromButton,
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
            <Card>
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
                <Form form={nameChangeRequestform} id="myNameForm" autoComplete="off" layout="vertical">
                    <div className={styles.cardInsideBox}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.verticallyCentered}>
                                <Text style={{ fontSize: '16px' }} strong>
                                    Customer Name
                                </Text>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.addGroup}>
                                <Button type="link" className={styles.verticallyCentered} onClick={onViewHistoryChange} icon={<BiTimeFive />}>
                                    View History
                                </Button>
                            </Col>
                        </Row>
                        <Divider />
                        <Collapse expandIcon={expandIcon} activeKey={activeKey} expandIconPosition="end" onChange={() => onCollapseChange(1)}>
                            <Panel
                                header={
                                    <>
                                        <Row type="flex" justify="space-between" align="middle" size="large">
                                            <Row type="flex" justify="space-around" align="middle">
                                                <div>
                                                    <Typography>
                                                        {customerNameList?.titleCode} {customerNameList?.firstName} {customerNameList?.middleName} {customerNameList?.lastName}
                                                    </Typography>
                                                    {editedMode || onSave || formData?.pendingNameChangeRequest?.status === STATUS?.PENDING?.title ? <Text type="secondary">Current Name</Text> : null}
                                                </div>
                                                <Button
                                                    type="link"
                                                    icon={<FiEdit />}
                                                    className={styles.verticallyCentered}
                                                    onClick={() => {
                                                        onEdit();
                                                    }}
                                                    disabled={disabled}
                                                    style={{ color: disabled ? 'grey' : 'red' }}
                                                >
                                                    Edit
                                                </Button>
                                            </Row>
                                            {formData?.pendingNameChangeRequest?.status === STATUS?.PENDING?.title ? (
                                                <Tag style={{ textAlign: 'right' }} color="warning">
                                                    Pending
                                                </Tag>
                                            ) : null}
                                        </Row>
                                    </>
                                }
                                key={1}
                            >
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
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <UploadUtil {...uploadProps} />
                                    </Col>
                                </Row>
                                {formData?.supportingDocuments?.map((item) => (
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Card className={styles.viewDocumentStrip} key={item?.documentId} title={item?.documentName} extra={<FiDownload />} onClick={downloadFileFromButton}></Card>
                                        </Col>
                                    </Row>
                                ))}
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonsGroup}>
                                        <Button type="primary" form="myNameForm" onClick={onHandleSave}>
                                            Save
                                        </Button>
                                        <Button onClick={handleResetChange} danger>
                                            Reset
                                        </Button>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                        {(formData?.pendingNameChangeRequest?.status === STATUS?.PENDING?.title || onSave) && (
                            <Card
                                title={
                                    <>
                                        <Row type="flex" justify="space-between" align="middle" size="large">
                                            <Row type="flex" justify="space-around" align="middle">
                                                <div>
                                                <Typography>
                                                    {formData?.titleCode} {formData?.firstName} {formData?.middleName} {formData?.lastName}
                                                </Typography>
                                                <Text type="secondary">Previous Name</Text>
                                                </div>
                                            </Row>
                                        </Row>
                                    </>
                                }
                            />
                        )}
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
            <NameChangeHistory {...changeHistoryProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
