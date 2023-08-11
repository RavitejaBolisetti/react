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

import styles from 'components/common/Common.module.css';

function FormDocTypeAcMapping(props) {
    const { docTypeHeadMappingForm, typeData, addDocHeadMapping, formEdit, editForm, financialAccount } = props;
    const fieldNames = { key: 'id', id: 'key', value: 'value' };
    return (
        <Form form={formEdit ? editForm : docTypeHeadMappingForm} id="myForm" autoComplete="off" layout="vertical">
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Other Charges" name="chargeCode" rules={[validateRequiredSelectField('Other Charges')]}>
                        {customSelectBox({ data: typeData, placeholder: preparePlaceholderSelect('Other Charges') })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Financial Account Head" name="financialAccountHeadId" initialValue={props?.financialAccountHeadId} rules={[validateRequiredSelectField('Financial Account Head')]}>
                        {customSelectBox({ data: financialAccount, fieldNames: fieldNames, placeholder: preparePlaceholderSelect('Financial Account Head') })}
                    </Form.Item>
                </Col>

                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item name="internalId" label="Internal Id" />
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item name="financialAccountHeadDesc" label="financialAccountHeadDesc" />
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

export default FormDocTypeAcMapping;
