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
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.schemeType} label={'Scheme Type'} name="schemeType" className={styles?.datePicker}>
                                        {customSelectBox({ data: assosiateType, placeholder: preparePlaceholderSelect('Scheme Type' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="SchemeNo" label={'Scheme No'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Scheme No')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Form.Item label={'Scheme Date' || translateContent('customerMaster.label.dateOfBirth')} name="schemeDate">
                                    <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                </Form.Item>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="schemeStatus" label={'Scheme Status'} initialValue={formData?.assosiateContacNo}>
                                        <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="proposedBy" label={'Proposed By'} initialValue={formData?.financierName}>
                                        {customSelectBox({ data: mmtType, placeholder: preparePlaceholderSelect('Proposed By' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.assosiateType} label={'Budget'} name="Budget" className={styles?.datePicker}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Budget' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.assosiateType} label={'Given To'} name="Given To" className={styles?.datePicker}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Given To' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.assosiateType} label={'Incentive On'} name="Incentive On" className={styles?.datePicker}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Incentive On' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.assosiateType} label={'Incentive Type'} name="Incentive Type" className={styles?.datePicker}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Incentive Type' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="durationType" label={'Duration Type'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Duration Type')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.assosiateType} label={'Finencial Year'} name="Finencial Year" className={styles?.datePicker}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Finencial Year' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>{' '}
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.assosiateType} label={'From Month'} name="From Month" className={styles?.datePicker}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('From Month' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>{' '}
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.assosiateType} label={'To Month'} name="To Month" className={styles?.datePicker}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('To Month' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>{' '}
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.assosiateType} label={'From Date'} name="From Date" className={styles?.datePicker}>
                                    {/* <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} /> */}
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('From Date' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.assosiateType} label={'To Date'} name="To Date" className={styles?.datePicker}>
                                    {/* <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} /> */}
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('To Date' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
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
