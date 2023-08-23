/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Switch, DatePicker, Input, Collapse, Divider, Card, Space } from 'antd';
import { dateFormat } from 'utils/formatDateTime';
import { validateRequiredSelectField, validateRequiredInputField, validationNumber } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'components/common/Common.module.css';

const { TextArea, Search } = Input;
const { Panel } = Collapse;
const { Option } = Select;

const AddEditForm = (props) => {
    const { formData, finance, setFinance } = props;

    const handleChange = (value) => {
        setFinance(value);
    };

    // const RenderForm = (formInstance) => {
    //     // if (!formInstance) return undefined;
    //     switch (formInstance) {
    //         case 'Cash': {
    //             return <></>;
    //         }
    //         case 'Dealer': {
    //             return;
    //         }
    //         case 'Customer Arranged': {
    //             return;
    //         }

    //         default:
    //             return '';
    //     }
    // };

    const financeArrangedBy = [
        {
            value: 'Dealer',
            label: 'Dealer',
        },
        {
            value: 'Customer Arranged',
            label: 'Customer Arranged',
        },
        {
            value: 'Cash',
            label: 'Cash',
        },
    ];

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={16}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.otfNumber} label="Finance Arranged By" name="financeArrangedBy" rules={[validateRequiredSelectField('Finance Arranged By')]}>
                                            <Select options={financeArrangedBy} maxLength={50} placeholder={preparePlaceholderSelect('Select')} onChange={handleChange} {...selectProps}></Select>
                                            {/* {customSelectBox({ data: financeArrangedBy, placeholder: preparePlaceholderSelect('otf number'), onChange: { handleChange } })} */}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label="Status" name="active">
                                            <Switch checkedChildren="Yes" unCheckedChildren="No" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {/* {RenderForm(formData?.finance || finance)} */}
                                {finance && (
                                    <div>
                                        <Divider />
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={formData?.totalApportionAmount} label="Financer" name="financer">
                                                    <DatePicker format={dateFormat} placeholder={preparePlaceholderText('financer')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={formData?.totalReceivedAmount} label="Branch" name="branch">
                                                    <Input placeholder={preparePlaceholderText('branch')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={formData?.totalReceivedAmount} label="File Number" name="fileNumber">
                                                    <Input placeholder={preparePlaceholderText('File Number')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={formData?.totalReceivedAmount} label="Loan Amount" name="loanAmount">
                                                    <Input placeholder={preparePlaceholderText('Loan Amount')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={formData?.totalReceivedAmount} label="EMI" name="emi">
                                                    <Input placeholder={preparePlaceholderText('emi')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={formData?.totalWriteOffAmount} label="Finance Done" name="finaceDone">
                                                    {customSelectBox({ placeholder: preparePlaceholderSelect('Finance Done') })}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={formData?.totalWriteOffAmount} label="D.O. Received" name="doReceived">
                                                    {customSelectBox({ placeholder: preparePlaceholderSelect('D.O. Received') })}
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={formData?.totalReceivedAmount} label="D.O. Number" name="doNumber">
                                                    <Input placeholder={preparePlaceholderText('D.O. Number')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={formData?.totalReceivedAmount} label="D.O. Date" name="doDate">
                                                    <Input placeholder={preparePlaceholderText('D.O. Date')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default AddEditForm;
