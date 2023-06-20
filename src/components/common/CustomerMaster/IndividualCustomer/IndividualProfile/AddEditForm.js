import { Button, Collapse, Form, Typography, Upload, message, Row, Col, Space, Select, Input, DatePicker, Checkbox, Empty, Divider } from 'antd';
import { useEffect, useState } from 'react';
import Svg from 'assets/images/Filter.svg';

import { validateAadhar, validateDrivingLicenseNo, validateGSTIN, validateRequiredInputField, validateRequiredSelectField, validatePanField, validateVoterId } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { applicationCategory, applicationSubCategory, customerCategory, gender, income, maritialStatus, memberShip, occupation, religion, tongue, vehicle } from 'constants/modules/CustomerMaster/individualProfile';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewIndividualProfileDetails';
import { FiTrash } from 'react-icons/fi';

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { formActionType, onIndiviualFinish, individualForm, indiviualData, onFieldsChange, onFinishFailed } = props;
    const { isReadOnly = false } = props;
    const [uploadCustomerForm] = Form.useForm();

    const [done, setDone] = useState();
    const [customer, setCustomer] = useState(false);

    const [activeKey, setactiveKey] = useState([1]);

    const onCustomerCategoryChange = (values) => {
        setCustomer(values);
    };
    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        action: '',
        progress: { strokeWidth: 10 },
        success: { percent: 100 },

        onChange(info) {
            const { status } = info.file;

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const viewProps = {
        activeKey,
        onChange,
        styles,
    };

    const showUploadList = {
        showRemoveIcon: false,
        showPreviewIcon: true,
        showDownloadIcon: true,
        previewIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
    };

    const disabledProps = { disabled: isReadOnly };
    return (
        <>
            {!formActionType?.viewMode ? (
                <Form autoComplete="off" id="form" layout="vertical" form={individualForm} onFieldsChange={onFieldsChange} onFinish={onIndiviualFinish} onFinishFailed={onFinishFailed}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space direction="vertical" size="small" className={styles.accordianContainer}>
                                <Collapse
                                    expandIcon={() => {
                                        if (activeKey.includes(1)) {
                                            return <MinusOutlined className={styles.iconsColor} />;
                                        } else {
                                            return <PlusOutlined className={styles.iconsColor} />;
                                        }
                                    }}
                                    activeKey={activeKey}
                                    onChange={() => onChange(1)}
                                    expandIconPosition="end"
                                >
                                    <Panel
                                        header={
                                            <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                                Individual Information
                                            </Text>
                                        }
                                        key="1"
                                    >
                                        <Row gutter={16}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <div className={styles.uploadDragger}>
                                                    <Dragger showUploadList={showUploadList} {...uploadProps}>
                                                        <Empty
                                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                            imageStyle={{
                                                                height: 100,
                                                            }}
                                                            description={
                                                                <>
                                                                    <span>
                                                                        Click or drop your file here to upload the signed and <br />
                                                                        scanned customer form.
                                                                    </span>
                                                                    <span>
                                                                        <br />
                                                                        File type should be png, jpg or pdf and max file size to be 5Mb
                                                                    </span>
                                                                </>
                                                            }
                                                        />

                                                        <Button type="primary">Upload File</Button>
                                                    </Dragger>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Date of Birth" name="dateOfBirth" rules={[validateRequiredInputField('date')]}>
                                                    <DatePicker disabled={isReadOnly} className={styles.datepicker} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Gender" name="gender" rules={[validateRequiredSelectField('gender')]}>
                                                    <Select value={null} placeholder={preparePlaceholderSelect('gender')} {...disabledProps}>
                                                        {gender?.map((item) => (
                                                            <Option key={'ge' + item.key} value={item.key}>
                                                                {item.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Maritial Status" name="martialStatus">
                                                    <Select value={null} placeholder={preparePlaceholderSelect('maritial status')} {...disabledProps}>
                                                        {maritialStatus?.map((item) => (
                                                            <Option key={'ms' + item.key} value={item.key}>
                                                                {item.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label=" Wedding Anniversary Date" name="weddingAnniversary">
                                                    <DatePicker className={styles.datepicker} disabled={isReadOnly} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Occupation" name="occupation">
                                                    <Select value={null} placeholder={preparePlaceholderSelect('occupation')} {...disabledProps}>
                                                        {occupation?.map((item) => (
                                                            <Option key={'occ' + item.key} value={item.key}>
                                                                {item.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Annual Income" name="annualIncome">
                                                    <Select value={null} placeholder={preparePlaceholderSelect('annual income')} {...disabledProps}>
                                                        {income?.map((item) => (
                                                            <Option value={item.key}>{item.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Driving License No" name="drivingLicenseNumber" rules={[validateDrivingLicenseNo('driving license no ')]}>
                                                    <Input value={null} maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('driving license no')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Aadhar No." name="adharNumber" rules={[validateAadhar('aadhar')]}>
                                                    <Input value={null} maxLength={12} className={styles.inputBox} placeholder={preparePlaceholderText('aadhar number')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Voter ID" name="voterid" rules={[validateVoterId('voter id')]}>
                                                    <Input value={null} maxLength={10} className={styles.inputBox} placeholder={preparePlaceholderText('voter id')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Vehicle Used" name="vehicleUsed">
                                                    <Select value={null} placeholder={preparePlaceholderSelect('vehicle used')} {...disabledProps}>
                                                        {vehicle?.map((item) => (
                                                            <Option value={item.key}>{item.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Mother Tongue" name="preferredLanguage">
                                                    <Select value={null} placeholder={preparePlaceholderSelect('mother tongue')} {...disabledProps}>
                                                        {tongue?.map((item) => (
                                                            <Option value={item.key}>{item.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Religion" name="religion">
                                                    <Select value={null} placeholder={preparePlaceholderSelect('religion')} {...disabledProps}>
                                                        {religion?.map((item) => (
                                                            <Option value={item.key}>{item.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="PAN" name="panNumber" rules={[validatePanField('pan')]}>
                                                    <Input value={null} maxLength={10} className={styles.inputBox} placeholder={preparePlaceholderText('pan')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="GSTIN" name="gstin" rules={[validateGSTIN('gstin')]}>
                                                    <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('gstin')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Usage/Application Categorization" name="applicationCategorization">
                                                    <Select value={null} placeholder={preparePlaceholderSelect('usage/application category')} {...disabledProps}>
                                                        {applicationCategory?.map((item) => (
                                                            <Option value={item.key}>{item.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Usage/Application Sub-Category" name="applicationSubCategory">
                                                    <Select value={null} placeholder={preparePlaceholderSelect('annual income')} {...disabledProps}>
                                                        {applicationSubCategory?.map((item) => (
                                                            <Option value={item.key}>{item.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Customer Category" name="customerCategory">
                                                    <Select value={null} placeholder={preparePlaceholderSelect('annual income')} {...disabledProps} onChange={onCustomerCategoryChange}>
                                                        {customerCategory?.map((item) => (
                                                            <Option value={item.key}>{item.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        
                                        {customer === 'fleet' && (
                                            <>
                                            <Divider/>
                                                <Row gutter={20}>
                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item label="Business Details" name="businessDetails">
                                                            <Input value={null} maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('business details')} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item label="Vehicle Deployment Details" name="vechileDeploymentDetails">
                                                            <Input value={null} maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('vehicle deployment details')} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item label="Key Role Details" name="keyRoleDetails">
                                                            <Input value={null} maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('key role details')} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item label="Major Route Details" name="majorRouteDetails">
                                                            <Input value={null} maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('major route details')} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </>
                                        )}
                                    </Panel>
                                </Collapse>

                                <Collapse
                                    expandIcon={() => {
                                        if (activeKey.includes(2)) {
                                            return <MinusOutlined className={styles.iconsColor} />;
                                        } else {
                                            return <PlusOutlined className={styles.iconsColor} />;
                                        }
                                    }}
                                    activeKey={activeKey}
                                    onChange={() => onChange(2)}
                                    expandIconPosition="end"
                                >
                                    <Panel
                                        header={
                                            <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                                Social Profile
                                            </Text>
                                        }
                                        key="2"
                                    >
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="M1-MMFSL" name="mmfsl">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Facebook Link" name="facebookLink">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Twitter Link" name="twitterLink">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Instagram Link" name="instagramLink">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Youtube Channel" name="youtubeChannelLink">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Team BHP Link" name="teamBhpLink">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                                <Collapse
                                    expandIcon={() => {
                                        if (activeKey.includes(3)) {
                                            return <MinusOutlined className={styles.iconsColor} />;
                                        } else {
                                            return <PlusOutlined className={styles.iconsColor} />;
                                        }
                                    }}
                                    activeKey={activeKey}
                                    onChange={() => onChange(3)}
                                    expandIconPosition="end"
                                >
                                    <Panel
                                        header={
                                            <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                                Key Account details
                                            </Text>
                                        }
                                        key="3"
                                    >
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Code" name="accountCode" initialValue={'CFG464787'}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter account code')} disabled />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Name" name="accountName" initialValue={'Koncept'}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} disabled />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Segement" name="accountSegment" initialValue={'Individual'}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} disabled />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Client Name" name="accountClientName" initialValue={'Pal Singh'}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} disabled />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Mapping Date" name="accountMappingDate" initialValue={'12-11-2022'}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} disabled />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                                <Collapse
                                    expandIcon={() => {
                                        if (activeKey.includes(4)) {
                                            return <MinusOutlined className={styles.iconsColor} />;
                                        } else {
                                            return <PlusOutlined className={styles.iconsColor} />;
                                        }
                                    }}
                                    activeKey={activeKey}
                                    onChange={() => onChange(4)}
                                    expandIconPosition="end"
                                >
                                    <Panel
                                        header={
                                            <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                                Authority Details (Who Knowns Whom)
                                            </Text>
                                        }
                                        key="4"
                                    >
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Name of Person" name="personName">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter name of person')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Position" name="position">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter position')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Company Name" name="companyName">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter company name')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Form.Item label="Remarks" name="remarks">
                                                    <TextArea placeholder={preparePlaceholderText('remarks')} showCount maxLength={100} autoSize={{ minRows: 1, maxRows: 1 }} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>

                                <Collapse
                                    expandIcon={() => {
                                        if (activeKey.includes(5)) {
                                            return <MinusOutlined className={styles.iconsColor} />;
                                        } else {
                                            return <PlusOutlined className={styles.iconsColor} />;
                                        }
                                    }}
                                    activeKey={activeKey}
                                    onChange={() => onChange(5)}
                                    expandIconPosition="end"
                                >
                                    <Panel
                                        header={
                                            <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                                Upload Customer Form
                                            </Text>
                                        }
                                        key="5"
                                    >
                                        <Form autoComplete="off" layout="vertical">
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Checkbox value="customerConsent">I Consent to share my details with Mahindra & Mahindra. </Checkbox>
                                                </Col>
                                            </Row>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Dragger {...uploadProps} className={styles.uploadContainer}>
                                                        <div>
                                                            <img src={Svg} alt="" />
                                                        </div>
                                                        <div className={styles.uploadtext}>
                                                            Click or drop your file here to upload the signed and <br /> scanned customer form.
                                                        </div>
                                                        <div>File type should be png, jpg or pdf and max file size to be 5Mb</div>
                                                        <Button {...disabledProps} type="primary" style={{ marginLeft: '30px', marginTop: '16px' }}>
                                                            Upload File
                                                        </Button>
                                                    </Dragger>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Panel>
                                </Collapse>
                            </Space>
                        </Col>
                    </Row>

                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                </Form>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};
export default AddEditForm;
