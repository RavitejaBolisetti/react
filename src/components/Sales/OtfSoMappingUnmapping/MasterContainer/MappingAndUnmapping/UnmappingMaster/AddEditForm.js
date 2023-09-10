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
        <div className={styles.drawerBodyNew}>
            <Form form={form} autoComplete="off" layout="vertical" colon={false} onFinish={onFinish}>
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
                            <Input {...disableProps} placeholder={preparePlaceholderText('modelDescription')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="chasisNumber" label="Chassis Number">
                            <Input {...disableProps} placeholder={preparePlaceholderText('chassisNumber')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="otfNumber" label="OTF Number">
                            <Input {...disableProps} placeholder={preparePlaceholderText('otfNumber')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customerName" label="Customer Name">
                            <Input {...disableProps} placeholder={preparePlaceholderText('customerName')} />
                        </Form.Item>
                    </Col>
                </Row>
                <DrawerFormButton {...props} />
            </Form>
        </div>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '50%' });
