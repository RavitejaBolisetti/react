import { React, useEffect, useState } from 'react';

import { Col, Input, Collapse, Row, Button, Space, Spin, Form, Select, Upload, message, Checkbox ,Progress} from 'antd';
import { FaUserCircle } from 'react-icons/fa';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import style from 'components/common/Common.module.css';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { MEMBERSHIP_TYPE } from './MembershipType';
import Svg from 'assets/images/Filter.svg';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetails';
import { TiMinusOutline } from 'react-icons/ti';

const { TextArea } = Input;
const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;

// const onChange = (e) => {
//     console.log(`checked = ${e.target.checked}`);
// };
const apiKey = 'vipDealerInd';
const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    console.log('API Key:', apiKey);
    console.log('Checkbox value:', isChecked);
};

const { Search } = Input;

const AddEditFormMain = ({ setSelectedTreeKey, selectedTreeKey, showGlobalNotification, setparentAppCode, parentAppCode, applicationForm, forceUpdate, setFinalFormdata, finalFormdata, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, isVisible, setisVisible, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, isLoadingOnSave, criticalityGroupData, configurableParamData, actions, menuData, isApplicatinoOnSaveLoading, isFieldDisable }) => {
    const [openAccordian, setOpenAccordian] = useState('');
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const onClose = () => {
        setisVisible(false);
        setFormBtnDisable(false);
        forceUpdate();
        setIsBtnDisabled(false);
    };

    const uploadProps = {
        name: 'file',

        multiple: true,

        action: '',

        onChange(info) {
            const { status } = info.file;

            if (status !== 'uploading') {
                return (
                    <>
                        <Progress percent={70} status="exception" />
                    </>
                );
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        // onDrop(e) {

        //   console.log('Dropped files', e.dataTransfer.files);

        // },
    };

    return (
        <>
            <Form form={form} id="myForm" autoComplete="off" layout="vertical">
                <Space direction="vertical" size="small" className={style.accordianContainer}>
                    <Collapse defaultActiveKey={['1']} expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus /> : <AiOutlinePlus />)} expandIconPosition="end">
                        <Panel
                            header={
                                <>
                                    <BiUserCircle />
                                    Company Information
                                </>
                            }
                            key="1"
                        >
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Firm/Company Name" name="firmName" rules={[validateRequiredInputField('Firm/Company Name')]}>
                                        <Input maxLength={50} placeholder={preparePlaceholderText('Enter Name')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Parent Firm/Company Code" name="companyCode" rules={[validateRequiredInputField('Parent Firm/Company Code')]}>
                                        <Input maxLength={50} placeholder={preparePlaceholderText('Enter Code')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Parent Firm/Company Name" name="parentFirm">
                                        <Input maxLength={50} disabled placeholder={preparePlaceholderText('Parent Concept')} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="PAN" name="PAN">
                                        <Input maxLength={50} placeholder={preparePlaceholderText('PAN')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="GSTIN" name="GSTIN">
                                        <Input maxLength={50} placeholder={preparePlaceholderText('GSTIN')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Membership Type" name="membership" rules={[validateRequiredInputField('Membership Type')]}>
                                        <Select maxLength={50} placeholder={preparePlaceholderText('Membership Type')}>
                                            <Option>Select</Option>
                                            <Option value={MEMBERSHIP_TYPE.GOLD.KEY}>{MEMBERSHIP_TYPE.GOLD.TITLE}</Option>
                                            <Option value={MEMBERSHIP_TYPE.SILVER.KEY}>{MEMBERSHIP_TYPE.SILVER.TITLE}</Option>
                                            <Option value={MEMBERSHIP_TYPE.PLATINUM.KEY}>{MEMBERSHIP_TYPE.PLATINUM.TITLE}</Option>
                                            <Option value={MEMBERSHIP_TYPE.NEW_CUSTOMER.KEY}>{MEMBERSHIP_TYPE.NEW_CUSTOMER.TITLE}</Option>
                                        </Select>{' '}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>

                    <Collapse defaultActiveKey={['2']} expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus /> : <AiOutlinePlus />)} expandIconPosition="end">
                        <Panel
                            key="2"
                            header={
                                <>
                                    <BiUserCircle />
                                    Social Profiles
                                </>
                            }
                        >
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="M1-MMFSL" name="mmfsl">
                                        <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Facebook Link" name="fb">
                                        <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Twitter Link" name="twitter">
                                        <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>

                    <Collapse defaultActiveKey={['3']} expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus /> : <AiOutlinePlus />)} expandIconPosition="end">
                        <Panel
                            key="3"
                            header={
                                <>
                                    <BiUserCircle />
                                    Upload Customer Form
                                </>
                            }
                        >
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Checkbox value="sentOnMobile">I Consent to share my details with Mahindra & Mahindra. </Checkbox>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                {' '}
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Dragger
                                        {...uploadProps}
                                        style={{
                                            // margin: '1.5rem 0 0 0',

                                            background: '#F2F2F2',

                                            border: '1px dashed #B5B5B5',

                                            borderRadius: '6px',

                                            minHeight: '172px',

                                            padding: '1rem 0 0 0',
                                        }}
                                    >
                                        <p className="ant-upload-drag-icon" style={{ textAlign: 'center' }}>
                                            <img src={Svg} alt="" />
                                        </p>

                                        <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '500', fontSize: '14px', lineHeight: '23px', color: '#0B0B0C' }}>
                                            Click or drop your file here to upload the signed and <br />
                                            scanned customer form.
                                        </p>

                                        <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '400', fontSize: '12px', lineHeight: '23px', color: '#0B0B0C' }}>
                                            File type should be png, jpg or pdf and max file size to be 5Mb
                                        </p>
                                        <Button danger>Upload File</Button>
                                    </Dragger>{' '}
                                </Col>{' '}
                            </Row>
                        </Panel>
                    </Collapse>
                </Space>

                <Row gutter={20} className={style.formFooter}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnLeft}>
                        <Button danger onClick={onClose}>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnRight}>
                        <Button htmlType="submit" danger key="saveBtm" type="primary">
                            Save and Procced
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
