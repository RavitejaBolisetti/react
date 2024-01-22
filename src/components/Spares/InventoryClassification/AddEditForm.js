/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, DatePicker, Collapse, Divider } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;
    const [activeKey, setActiveKey] = useState('');

    const onChange = (key) => {
        setActiveKey((prev) => (prev === key ? '' : key));
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Form
            layout="vertical"
            autoComplete="off"
            form={form}
            onValuesChange={handleFormValueChange}
            onFieldsChange={handleFormFieldChange}
            onFinish={onFinish}
        >
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="make" label={'Make' || translateContent('applicationMaster.label.accessibleLocation')} rules={[validateRequiredSelectField('Make' || translateContent('applicationMaster.validation.accessibleLocation'))]}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Make' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="productDivision" label={'Product Division' || translateContent('applicationMaster.label.accessibleLocation')} rules={[validateRequiredSelectField('Product Division' || translateContent('applicationMaster.validation.accessibleLocation'))]}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Product Division' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                                    </Form.Item>
                                </Col>
                               
                            </Row>
                            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                                <Panel header={'ABC1C2 Classification - Consumption Value'} key="1">
                                    <Divider />

                                    <Row gutter={20}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'A Class From %'} initialValue={formData?.panNumber} name="aClassFrom" rules={[validateRequiredInputField('A Class From %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('A Class From %'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'A Class To %'} initialValue={formData?.panNumber} name="aClassTo" rules={[validateRequiredInputField('A Class To %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('A Class To %'))} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'B Class From %'} initialValue={formData?.panNumber} name="bClassFrom" rules={[validateRequiredInputField('B Class From %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('B Class From %'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'B Class To %'} initialValue={formData?.panNumber} name="bClassTo" rules={[validateRequiredInputField('B Class To %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('B Class To %'))} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'C1 Class From %'} initialValue={formData?.panNumber} name="c1ClassFrom" rules={[validateRequiredInputField('C1 Class From %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('C1 Class From %'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'C1 Class To %'} initialValue={formData?.panNumber} name="c1ClassTo" rules={[validateRequiredInputField('C1 Class To %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('C1 Class To %'))} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'C2 Class From %'} initialValue={formData?.panNumber} name="c2ClassFrom" rules={[validateRequiredInputField('C2 Class From %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('C2 Class From %'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'C2 Class To %'} initialValue={formData?.panNumber} name="c2ClassTo" rules={[validateRequiredInputField('C2 Class To %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('C2 Class To %' || translateContent('customerMaster.placeholder.pan'))} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" collapsible="icon">
                                <Panel header={'RIS Classification - Part Movement in Last 12 Months'} key="2">
                                    <Divider />
                                    <Row gutter={20}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'Regular Class From %'} initialValue={formData?.panNumber} name="regularClassFrom" rules={[validateRequiredInputField('Regular Class From %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Regular Class From %' || translateContent('customerMaster.placeholder.pan'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'Regular Class To %'} initialValue={formData?.panNumber} name="regularClassTo" rules={[validateRequiredInputField('Regular Class To %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Regular Class To %' || translateContent('customerMaster.placeholder.pan'))} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'Irregular Class From %'} initialValue={formData?.panNumber} name="irregularClassFrom" rules={[validateRequiredInputField('Irregular Class From %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Irregular Class From %' || translateContent('customerMaster.placeholder.pan'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'Irregular Class To %'} initialValue={formData?.panNumber} name="irregularClassTo" rules={[validateRequiredInputField('Irregular Class To %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Irregular Class To %' || translateContent('customerMaster.placeholder.pan'))} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'Sporadic Class From %'} initialValue={formData?.panNumber} name="sporadicClassFrom" rules={[validateRequiredInputField('Sporadic Class From %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('Sporadic Class From %'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'Sporadic Class To %'} initialValue={formData?.panNumber} name="sporadicClassTo" rules={[validateRequiredInputField('Sporadic Class To %')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Sporadic Class To %' || translateContent('customerMaster.placeholder.pan'))} />
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                </Panel>
                            </Collapse>
                            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end" collapsible="icon">
                                <Panel header={'HML Classification - Price Per Unit'} key="3">
                                    <Divider />
                                    <Row gutter={20}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'High Class From'} initialValue={formData?.panNumber} name="highClassFrom" rules={[validateRequiredInputField('High Class From')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('High Class From' || translateContent('customerMaster.placeholder.pan'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'High Class To'} initialValue={formData?.panNumber} name="highClassTo" rules={[validateRequiredInputField('High Class To')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('High Class To' || translateContent('customerMaster.placeholder.pan'))} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'Medium Class From'} initialValue={formData?.panNumber} name="mediumClassFrom" rules={[validateRequiredInputField('Medium Class From')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('Medium Class From'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'Medium Class To'} initialValue={formData?.panNumber} name="mediumClassTo" rules={[validateRequiredInputField('Medium Class To')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Medium Class To' || translateContent('customerMaster.placeholder.pan'))} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'Low Class From'} initialValue={formData?.panNumber} name="lowClassFrom" rules={[validateRequiredInputField('Low Class From')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Low Class From' || translateContent('customerMaster.placeholder.pan'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={'Low Class To'} initialValue={formData?.panNumber} name="lowClassTo" rules={[validateRequiredInputField('Low Class To')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Low Class To' || translateContent('customerMaster.placeholder.pan'))} />
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                </Panel>
                            </Collapse>
                        </>
                    )}
                </Col>
            </Row>

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 600 });
