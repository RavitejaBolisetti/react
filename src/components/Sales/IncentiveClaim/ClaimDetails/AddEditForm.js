/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, DatePicker, Card, Space, Collapse, Divider, Switch } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { prepareDatePickerText, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, onHandleSelect } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };
    const [openAccordian, setOpenAccordian] = useState(1);

    const activeStatusData = [];

    const assosiateType = [];

    const mmtType = [];

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <>
            {/* <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Request Detail' || translateContent('applicationMaster.text.applicationActions')} key="1">
                    <Divider /> */}
            <Card>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Row gutter={20}>
                                {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.schemeType} label={'Scheme Type'} name="schemeType" className={styles?.datePicker}>
                                        {customSelectBox({ data: assosiateType, placeholder: preparePlaceholderSelect('Scheme Type' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="SchemeNo" label={'Scheme No'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Scheme No')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col> */}
                                {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item label={'Scheme Date' || translateContent('customerMaster.label.dateOfBirth')} name="schemeDate">
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col> */}
                                {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="schemeStatus" label={'Scheme Status'} initialValue={formData?.assosiateContacNo}>
                                        <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                                    </Form.Item>
                                </Col> */}
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="dealerName" label={'Dealer Name'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Dealer Name')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="dealerBranch" label={'Dealer Branch'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Dealer Branch')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="claimNo" label={'Claim No'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Claim No')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="claimDate" label={'Claim Date'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Claim Date')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="claimStatus" label={'Claim Status'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Claim Status')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="schemeName" label={'Scheme Name'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Scheme Name')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="againstSchemeNo" label={'Against Scheme No'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Against Scheme No')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="schemeDate" label={'Scheme Date'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Scheme Date')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="schemeStatus" label={'Scheme Status'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Scheme Status')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                               
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="budget" label={'Budget'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Budget')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="givenTo" label={'Given To'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Given To')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="financialYear" label={'Financial Year'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Financial Year')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="fromMonth" label={'From Month'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('From Month')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="toMonth" label={'To Month'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('To Month')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="formDate" label={'Form Date'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Form Date')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="toDate" label={'To Date'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('To Date')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Space>
                    </Col>
                </Row>
            </Card>
            {/* </Panel>
            </Collapse> */}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
