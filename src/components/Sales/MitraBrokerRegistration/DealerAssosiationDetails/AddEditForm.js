/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Collapse, Divider, Switch, Space } from 'antd';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';

import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon } from 'utils/accordianExpandIcon';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };
    const [openAccordian, setOpenAccordian] = useState(1);


    const handleCollapse = (key) => {
        setOpenAccordian(prev => prev === key ? "" : key);
    };

    return (
        <>
            <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Request Detail' || translateContent('applicationMaster.text.applicationActions')} key="1">
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                                <Row gutter={20}>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.modalGroup} label={'Zone'} name="zone" className={styles?.datePicker}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Zone' || translateContent('customerMaster.placeholder.corporateName')) })}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.modalGroup} label={'Area Office'} name="areaOffice" className={styles?.datePicker}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Area Office' || translateContent('customerMaster.placeholder.corporateName')) })}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.modalGroup} label={'Dealer Name'} name="dealerName" className={styles?.datePicker}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Dealer Name' || translateContent('customerMaster.placeholder.corporateName')) })}
                                        </Form.Item>
                                    </Col>
                                   
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={false} labelAlign="left" wrapperCol={{ span: 24 }} name="isActive" label={'Primary Dealer' || translateContent('applicationMaster.label.documentNumRequired')} valuePropName="checked">
                                            <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="Zone" label={'Zone'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Zone')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Space>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
