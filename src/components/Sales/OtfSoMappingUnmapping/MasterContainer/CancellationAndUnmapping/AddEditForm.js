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

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { isReadOnly = true, formData, form, handleFormValueChange, onFinish, onFinishFailed, buttonType } = props;
    const disableProps = { disabled: isReadOnly };
    const showFields = BUTTON_NAME?.CANCEL?.key === buttonType;
    useEffect(() => {
        if (formData) {
            form.setFieldsValue({ ...formData, soDate: converDateDayjs(formData?.soDate), CancellationDate: converDateDayjs(Date()) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <>
            <div className={styles.drawerBodyNew}>
                <Form form={form} id="myForm" autoComplete="off" layout="vertical" colon={false} onValuesChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="soNumber" label="SO Number">
                                <Input {...disableProps} placeholder={preparePlaceholderText('soNumber')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="poNumber" label="PO Number">
                                <Input {...disableProps} placeholder={preparePlaceholderText('poNumber')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="soDate" label="Date">
                                <Input {...disableProps} placeholder={preparePlaceholderText('date')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="modelDescription" label="Model Description">
                                <Input {...disableProps} placeholder={preparePlaceholderText('model Description')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="chasisNumber" label="Chassis Number">
                                <Input {...disableProps} placeholder={preparePlaceholderText('chassisNumber')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="otfNumber" label="Booking Number">
                                <Input {...disableProps} placeholder={preparePlaceholderText('otfNumber')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerName" label="Customer Name">
                                <Input {...disableProps} placeholder={preparePlaceholderText('modelDescription')} />
                            </Form.Item>
                        </Col>
                        {showFields && (
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="CancellationDate" label="Cancellation Date">
                                    <Input {...disableProps} placeholder={preparePlaceholderText('cancellationDate')} />
                                </Form.Item>
                            </Col>
                        )}
                    </Row>

                    {showFields && (
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label="Remarks" rules={[validateRequiredInputField('remarks')]} name="cancellationRemarks">
                                    <TextArea maxLength={300} placeholder={preparePlaceholderText('remarks')} showCount />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
                    <DrawerFormButton {...props} />
                </Form>
            </div>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
