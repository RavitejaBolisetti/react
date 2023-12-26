/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, Card, Space, Switch } from 'antd';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';


const AddEditFormMain = (props) => {
    const { formData, onHandleSelect } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };

    const assosiateType = [
        {
            key: 1,
            value: 'Broker',
        },
        {
            key: 2,
            value: 'MFCW RD',
        },
    ];

    const mmtType = [
        {
            key: 1,
            value: '3*',
        },
        {
            key: 2,
            value: '4*',
        },
    ];


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
                                        <Form.Item initialValue={formData?.assosiateType} label={'Assosiate Type'} name="assosiateType" className={styles?.datePicker}>
                                            {customSelectBox({ data: assosiateType, placeholder: preparePlaceholderSelect('Assosiate Type' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                            <Form.Item name="assosiateName" label={'Assosiate Name'} initialValue={formData?.financierName}>
                                                <Input placeholder={preparePlaceholderText('Assosiate Name')} maxLength={50} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                            <Form.Item name="assosiateContactNo" label={'Assosiate Contact No'} initialValue={formData?.assosiateContacNo}>
                                                <Input placeholder={preparePlaceholderText('Assosiate Contact No')} maxLength={50} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={false} labelAlign="left" wrapperCol={{ span: 24 }} name="isQualified" label={'Status' || translateContent('applicationMaster.label.documentNumRequired')} valuePropName="checked">
                                            <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="aadharNo" label={'Aadhar No'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Aadhar No')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="panNo" label={'PAN No'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('PAN No')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.assosiateType} label={'MMT Type'} name="mmtType" className={styles?.datePicker}>
                                            {customSelectBox({ data: mmtType, placeholder: preparePlaceholderSelect('MMT Type' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col>
                                  
                                    {/* generate post submittion */}
                                    {/* <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item name="Assosiate ID" label={'Assosiate ID'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Assosiate ID')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col> */}
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.assosiateType} label={'State'} name="state" className={styles?.datePicker}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('State' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.assosiateType} label={'District'} name="district" className={styles?.datePicker}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('District' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.assosiateType} label={'Tehsil'} name="tehsil" className={styles?.datePicker}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Tehsil' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="village" label={'Village'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Village')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="latitude" label={'Latitude'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Latitude')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="longitude" label={'Longitude'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Longitude')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={false} labelAlign="left" wrapperCol={{ span: 24 }} name="isPrimaryDealer" label={'Primary Dealer' || translateContent('applicationMaster.label.documentNumRequired')} valuePropName="checked">
                                        <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                                        </Form.Item>
                                    </Col> */}
                                    {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.modalGroup} label={'Active'} name="modalGroup" className={styles?.datePicker}>
                                            {customSelectBox({ data: activeStatusData, placeholder: preparePlaceholderSelect('Active' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col> */}
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={false} labelAlign="left" wrapperCol={{ span: 24 }} name="isQualified" label={'Qualified' || translateContent('applicationMaster.label.documentNumRequired')} valuePropName="checked">
                                            <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="Qualification" label={'Qualification'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Qualification')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>{' '}
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="Occupation" label={'Occupation'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Occupation')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>{' '}
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="Vehicle Registration No" label={'Vehicle Registration No'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Vehicle Registration No')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.assosiateType} label={'Segment'} name="segment" className={styles?.datePicker}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Segment' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.modalGroup} label={'Modal Group'} name="modalGroup" className={styles?.datePicker}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Modal Group' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.modalGroup} label={'Model'} name="model" className={styles?.datePicker}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Model' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
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
