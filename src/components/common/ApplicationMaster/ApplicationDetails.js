import React, { Fragment } from 'react';
import { Input, Form, Col, Row, Switch, Select } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';

import style from 'components/common/DrawerAndTable.module.css';

const { Option } = Select;

const ApplicationDetails = ({ form, footerEdit = false, onFinish = () => {}, onFinishFailed = () => {}, isReadOnly = false, setSelectedLocaationAccessiblity }) => {
    const disabledProps = { disabled: isReadOnly };

    const handleChangeLocations = (value) => {
        setSelectedLocaationAccessiblity(value);
    };

    return (
        <Fragment>
            <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application ID" name="ApplicationId" rules={[validateRequiredInputField('Application ID'), validationFieldLetterAndNumber('Application ID')]}>
                            {!footerEdit ? <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} /> : <p className={style.viewModeText}>{form.getFieldValue('ApplicationName')}</p>}
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Name" name="ApplicationName" rules={[validateRequiredInputField('Application Name'), validationFieldLetterAndNumber('Application Name')]}>
                            {!footerEdit ? <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} /> : <p className={style.viewModeText}>{form.getFieldValue('ApplicationName')}</p>}
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Title" name="ApplicationTitle" rules={[validateRequiredInputField('Application Title'), validationFieldLetterAndNumber('Application Title')]}>
                            {!footerEdit ? <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} /> : <p className={style.viewModeText}>{form.getFieldValue('ApplicationName')}</p>}
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Type" name="ApplicationType" rules={[validateRequiredInputField('Application Type'), validationFieldLetterAndNumber('Application Type')]}>
                            {!footerEdit ? <Select maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} /> : <p className={style.viewModeText}>{form.getFieldValue('ApplicationName')}</p>}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {/* parent application id */}
                        <Form.Item name="parentApplication" label="Parent Application" rules={[validateRequiredSelectField('Parent Application ID')]}>
                            <Select {...disabledProps} placeholder={preparePlaceholderSelect('Parent Application')}>
                                <Option value="all"></Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="accessibleLocations" label="Accessible Location" rules={[validateRequiredSelectField('Accessible Locations')]}>
                            <Select onChange={handleChangeLocations} {...disabledProps} placeholder={preparePlaceholderSelect('Accessible Location')}>
                                <Option value="all">Accessible to all</Option>
                                <Option value="notAccessable">Not accessible to all</Option>
                                <Option value="restrictedAccessible">Restricted Accessible</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Application Criticality Group" name="applicationCriticalityGroup" rules={[validateRequiredInputField('Application Criticality Group'), validationFieldLetterAndNumber('Application Criticality Group')]}>
                            <Select maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    {/* <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="MenuType" label="Menu Type" rules={[validateRequiredSelectField('Accessible Locations')]}>
                            <Select {...disabledProps} placeholder={preparePlaceholderSelect('Accessible Location')}></Select>
                        </Form.Item>
                    </Col> */}
                </Row>

                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="doc" label="Document not to be generated" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Status" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    );
};

export default ApplicationDetails;
