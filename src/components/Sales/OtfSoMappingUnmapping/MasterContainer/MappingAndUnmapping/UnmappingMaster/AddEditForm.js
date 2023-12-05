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
import { translateContent } from 'utils/translateContent';

const AddEditFormMain = (props) => {
    const { isReadOnly = true, formData, form, onFinish } = props;
    const disableProps = { disabled: isReadOnly };
    useEffect(() => {
        if (formData) {
            form.setFieldsValue({ ...formData, soDate: converDateDayjs(formData?.soDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <>
            <div>
                <Form form={form} autoComplete="off" layout="vertical" colon={false} onFinish={onFinish}>
                    <Row gutter={20} className={styles.drawerBody}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <Form.Item name="soNumber" label={translateContent('bookingSoMappUnmapp.label.soNumber')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.soNumber'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <Form.Item name="poNumber" label={translateContent('bookingSoMappUnmapp.label.poNumber')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.poNumber'))} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <Form.Item name="soDate" label={translateContent('bookingSoMappUnmapp.label.soDate')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.soDate'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <Form.Item name="modelDescription" label={translateContent('bookingSoMappUnmapp.label.modelDescription')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.modelDescription'))} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <Form.Item name="chasisNumber" label={translateContent('bookingSoMappUnmapp.label.chassisNumber')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.chassisNumber'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <Form.Item name="otfNumber" label={translateContent('bookingSoMappUnmapp.label.bookingNumber')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.bookingNumber'))} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <Form.Item name="customerName" label={translateContent('bookingSoMappUnmapp.label.customerName')}>
                                <Input {...disableProps} placeholder={preparePlaceholderText(translateContent('bookingSoMappUnmapp.label.customerName'))} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <DrawerFormButton {...props} />
                </Form>
            </div>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { footer: null });
