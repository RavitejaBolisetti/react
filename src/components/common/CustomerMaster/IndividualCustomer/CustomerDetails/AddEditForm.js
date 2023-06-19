
import { Col, Input, Form, Row, Select, Space, Typography, Card, Divider, Switch, Button } from 'antd';

import { FaRegUserCircle } from 'react-icons/fa';

import { validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewIndivisualCustomerDetails } from './ViewIndivisualCustomerDetails';

import styles from 'components/common/Common.module.css';


const { Text } = Typography;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { onCloseAction,form, setIsViewModeVisible, onChange, onFinish, onFinishFailed, onFieldsChange, formActionType, configurableTypedata } = props;
    const { activeKey, setactiveKey } = props;



    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        onCloseAction,
    };

    return (
        <>
            {!formActionType?.viewMode ? (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card
                                header={
                                    <div className={styles.alignUser}>
                                        <FaRegUserCircle className={styles.userCircle} />
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            Customer Information
                                        </Text>
                                    </div>
                                }
                            >
                                <Form id="form" onFinish={onFinish} autoComplete="off" layout="vertical" form={form} onFieldsChange={onFieldsChange} onFinishFailed={onFinishFailed}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Mobile Number" name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number')]}>
                                                <Input placeholder={preparePlaceholderText('mobile number')} maxLength={10}/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Customer Type" name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                                                <Select placeholder="Select" disabled={false} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['CUST_TYPE']}></Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <div className={styles.cardInsideBox}>
                                        <Text style={{ fontSize: '16px' }} strong>
                                            Customer Name
                                        </Text>
                                        <Divider />
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                <Form.Item label="Title" name="titleCode" data-testid="title" rules={[validateRequiredSelectField('title')]}>
                                                    <Select placeholder="Select" fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['TITLE']}></Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                <Form.Item label="First Name" name="firstName" data-testid="firstName" rules={[validateRequiredInputField('first name')]}>
                                                    <Input placeholder={preparePlaceholderText('first name')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                                <Form.Item label="Middle Name" name="middleName" data-testid="middleName">
                                                    <Input placeholder={preparePlaceholderText('middle name')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                                <Form.Item label="Last Name" name="lastName" data-testid="lastName">
                                                    <Input placeholder={preparePlaceholderText('last name')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Divider />

                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Email ID" name="emailId" data-testid="emailId">
                                                <Input placeholder={preparePlaceholderText('email id')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Do you want to contacted over whatsapp?" name="contactOnWhatsAppAllowed" data-testid="contactedOverWhatsapp">
                                                <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? 1 : 0)} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Want to use Mobile no as whatsapp no?" name="contactAsMobileOnWhatApp" data-testid="useMobileNumber">
                                                <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? 1 : 0)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Whatsapp Number" name="whatsAppNumber" data-testid="whatsappNumber">
                                                <Input placeholder={preparePlaceholderText('whatsapp number')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Corporate Type" name="corporateType" data-testid="corporateType">
                                                <Select disabled={false} loading={false} placeholder="Select" fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['CORP_TYPE']} allowClear></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Corporate Name" name="corporateName" data-testid="corporateName">
                                                <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                    <Option value="corporateName">Corporate ABC</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={222} label="Corporate Code" name="corporateCode" data-testid="corporate code">
                                                <Input placeholder={preparePlaceholderText('parent company name')} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Corporate Category" name="corporateCategory" data-testid="corporateCategory">
                                                <Select disabled={false} loading={false} placeholder="Select" fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['CORP_CATE']} allowClear></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Membership Type" name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                                                <Select disabled={false} loading={false} placeholder="Select" fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['MEM_TYPE']} allowClear></Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Button htmlType="submit" danger>
                                            Submit
                                        </Button>
                                    </Row>
                                </Form>
                            </Card>
                        </Space>
                    </Col>
                </Row>
            ) : (
                <ViewIndivisualCustomerDetails {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
