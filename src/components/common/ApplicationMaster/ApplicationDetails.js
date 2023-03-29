import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { connect } from 'react-redux';

import { Col, Form, Row } from 'antd';
import { Input, Select, Switch } from 'antd';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        data: {
            applicationDetailsData: applicationDetailsData,
            ApplicationMaster: { applicationCriticalityGroupData: criticalityGroup },
        },
    } = state;

    let returnValue = {
        criticalityGroup,
        applicationDetailsData,
    };
    return returnValue;
};

const ApplicationDetailsMain = ({ form, isReadOnly, formActionType, setSelectedLocaationAccessiblity, criticalityGroup }) => {
    // const [form] = Form.useForm();
    const disabledProps = { disabled: isReadOnly };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const onFinish = (values) => {
        // console.log('Values', values);
    };

    const handleChangeLocatons = (value) => {
        setSelectedLocaationAccessiblity(value);
    };

    return (
        <div>
            {/* <Form layout="vertical" handledetails={handledetails}> */}
            <Form scrollToFirstError={true} form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="applicationId" label="Application ID" rules={[validateRequiredInputField('Application ID')]}>
                            <Input placeholder="Type code here" {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="applicationName" label="Application Name" rules={[validateRequiredInputField('Application Name')]}>
                            <Input placeholder="Type code here" {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="applicationTitle" label="Application Title" rules={[validateRequiredInputField('Application Title')]}>
                            <Input placeholder="Type title here" {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="applicationType" label="Application Type" rules={[validateRequiredSelectField('Application Type')]}>
                            <Select {...disabledProps}>
                                <Option value="Module">Module</Option>
                                <Option value="Group">Group</Option>
                                <Option value="Transaction">Transaction</Option>
                                <Option value="Report">Report</Option>
                                <Option value="Query">Query</Option>
                                <Option value="Master">Master</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="parentApplicationId" label="Parent Application ID" rules={[validateRequiredSelectField('Parent Application ID')]}>
                            <Select {...disabledProps} placeholder={preparePlaceholderSelect('Group Application ID/Name')}>
                                <Option value="">Select</Option>
                                <Option value="1">parent application id 1</Option>
                                <Option value="2">parent application id 2</Option>
                                <Option value="3">parent application id 2</Option>
                                <Option value="4">apl id</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="criticalityGroupCode" label="Application Criticality Group" rules={[validateRequiredSelectField('Application Criticality Group')]}>
                            <Select placeholder={preparePlaceholderSelect('Application Criticality Group')} {...disabledProps} showSearch allowClear>
                                {criticalityGroup?.map((item) => (
                                    <Option value={item?.critcltyGropCode}>{item?.critcltyGropDesc}</Option>
                                ))}
                                <Option value="1">Application Criticality Group </Option>
                                <Option value="2">Application Criticality Group</Option>
                                <Option value="3">Application Criticality Group</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="accessibleLocations" label="Accessible Locations" rules={[validateRequiredSelectField('Accessible Locations')]}>
                            <Select onChange={handleChangeLocatons} selected="" {...disabledProps} placeholder={preparePlaceholderSelect('Accessible Location')}>
                                <Option value="">Select</Option>
                                <Option value="all">Accessible to all</Option>
                                <Option value="notAccessable">Not accessible to all</Option>
                                <Option value="restrictedAccessible">Restricted Accessible</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="documentNumRequired" label="Document No to be generated">
                            <Switch defaultChecked checkedChildren="Yes" unCheckedChildren="No" {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="status" label="Status">
                            <Switch defaultChecked checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export const ApplicationDetails = connect(mapStateToProps, null)(ApplicationDetailsMain);
