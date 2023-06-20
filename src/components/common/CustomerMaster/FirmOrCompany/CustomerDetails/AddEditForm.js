/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Col, Input, Form, Row, Select, Space, Divider, Card, Button } from 'antd';
import { validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { FaRegUserCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';
import { DrawerFormButton } from 'components/common/Button';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { onCloseAction, onFinish, onFieldsChange, onFinishFailed, configurableTypedata, form } = props;

    const customerMasterBtnProps = {
        buttonData: { closeBtn: true, saveBtn: true },
        onCloseAction,
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Card
                            header={
                                <div className={styles.alignUser}>
                                    <FaRegUserCircle className={styles.userCircle} />
                                    <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Customer Information</div>
                                </div>
                            }
                        >
                            <Form autoComplete="off" layout="vertical" form={form} onFinish={onFinish} onFieldsChange={onFieldsChange} onFinishFailed={onFinishFailed}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Mobile Number" name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number')]}>
                                            <Input placeholder={preparePlaceholderText('mobile number')} maxLength={10} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Customer Type" name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                                            <Select placeholder="Select" disabled={false} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['CUST_TYPE']}></Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider />

                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Company Name" name="companyName" data-testid="companyName" rules={[validateRequiredInputField('company name')]}>
                                            <Input placeholder={preparePlaceholderText('company name')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Parent Company Code" name="parentCompanyCode" data-testid="parentCode" rules={[validateRequiredInputField('parent company code')]}>
                                            <Input placeholder={preparePlaceholderText('parent company code')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Parent Company Name" name="parentCompanyName" data-testid="parentName">
                                            <Input placeholder={preparePlaceholderText('parent company name')} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Corporate Type" name="corporateType" data-testid="corporateType">
                                            <Select placeholder="Select" disabled={false} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['CORP_TYPE']}></Select>
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
                                            <Select placeholder="Select" disabled={false} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['CORP_CATE']}></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Membership Type" name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                                            <Select placeholder="Select" disabled={false} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['MEM_TYPE']}></Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Button htmlType="submit" danger>
                                    Submit
                                </Button>
                            </Form>
                        </Card>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <DrawerFormButton {...customerMasterBtnProps} />
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
