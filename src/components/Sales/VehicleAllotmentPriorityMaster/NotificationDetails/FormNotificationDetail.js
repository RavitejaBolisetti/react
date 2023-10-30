/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Col, Row, Button } from 'antd';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'assets/sass/app.module.scss';

function FormNotificationDetail(props) {
    const { notificationDetailForm, addDocHeadMapping, formEdit, editForm } = props;
    const { roleData, handleRoleFunction, filterDesignationList } = props;

    return (
        <Form form={formEdit ? editForm : notificationDetailForm} id="myForm" autoComplete="off" layout="vertical">
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Role Name" name="roleCode" initialValue={props?.roleCode} rules={[validateRequiredSelectField('role')]}>
                        {customSelectBox({ data: roleData, placeholder: preparePlaceholderSelect('role name'), onChange: handleRoleFunction })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Designation Name" name="designationCode" initialValue={props?.designationCode} rules={[validateRequiredSelectField('Designation')]}>
                        {customSelectBox({ data: filterDesignationList, fieldNames: { key: 'designationCode', value: 'designationDescription' }, placeholder: preparePlaceholderSelect('designation') })}
                    </Form.Item>
                </Col>

                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item name="internalId" label="Internal Id" />
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item name="id" label="Id" />
                </Col>
                {!formEdit && (
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Button
                            type="primary"
                            className={styles.marB20}
                            onClick={() => {
                                addDocHeadMapping();
                            }}
                        >
                            Add
                        </Button>
                    </Col>
                )}
            </Row>
        </Form>
    );
}

export default FormNotificationDetail;
