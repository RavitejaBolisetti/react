/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { withDrawer } from 'components/withDrawer';
import styles from 'assets/sass/app.module.scss';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { Row, Col, Form, Input } from 'antd';
import { DrawerFormButton } from 'components/common/Button';
import { converDateDayjs } from 'utils/formatDateTime';
import { validateRequiredInputField } from 'utils/validation';
import { BUTTON_NAME } from 'components/Sales/OtfSoMappingUnmapping/Constants';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { isReadOnly = true, formData, form, handleFormValueChange, onFinish, buttonType } = props;
    const disableProps = { disabled: isReadOnly };
    const showFields = BUTTON_NAME?.CANCEL?.key === buttonType;
    useEffect(() => {
        if (formData) {
            form.setFieldsValue({ ...formData, soDate: converDateDayjs(formData?.soDate), CancellationDate: converDateDayjs(Date()) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <Form form={form} id="myForm" autoComplete="off" layout="vertical" colon={false} onValuesChange={handleFormValueChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="soNumber" label={translateContent('bookingSoMappUnmapp.label.soNumber')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.soNumber'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="poNumber" label={translateContent('bookingSoMappUnmapp.label.poNumber')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.poNumber'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="soDate" label={translateContent('bookingSoMappUnmapp.label.soDate')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.soDate'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="modelDescription" label={translateContent('bookingSoMappUnmapp.label.modelDescription')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.modelDescription'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="chasisNumber" label={translateContent('bookingSoMappUnmapp.label.chassisNumber')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.chassisNumber'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="otfNumber" label={translateContent('bookingSoMappUnmapp.label.otfNumber')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.otfNumber'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="customerName" label={translateContent('bookingSoMappUnmapp.label.customerName')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.customerName'))} />
                            </Form.Item>
                        </Col>
                        {showFields && (
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item name="CancellationDate" label={translateContent('bookingSoMappUnmapp.label.cancellationDate')}>
                                    <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.cancellationDate'))} />
                                </Form.Item>
                            </Col>
                        )}
                    </Row>

                    {showFields && (
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label={translateContent('bookingSoMappUnmapp.label.remarks')} rules={[validateRequiredInputField(translateContent('bookingSoMappUnmapp.label.remarks'))]} name="cancellationRemarks">
                                    <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.remarks'))} showCount />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
            <DrawerFormButton {...props} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
