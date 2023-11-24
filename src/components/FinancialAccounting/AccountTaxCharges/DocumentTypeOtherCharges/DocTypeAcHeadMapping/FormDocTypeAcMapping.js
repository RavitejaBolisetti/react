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
import { PlusOutlined } from '@ant-design/icons';

import styles from 'assets/sass/app.module.scss';
import TreeSelectField from 'components/common/TreeSelectField';
import { translateContent } from 'utils/translateContent';

function FormDocTypeAcMapping(props) {
    const { docTypeHeadMappingForm, typeData, addDocHeadMapping, formEdit, editForm, financialAccHeadData, handleSelectTreeClick, selectedTreeSelectKey } = props;

    const fieldNames = { title: 'accountDescription', key: 'id', children: 'subGroup' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: financialAccHeadData,
        handleSelectTreeClick,
        selectedTreeSelectKey,
        defaultParent: false,
        placeholder: preparePlaceholderSelect(translateContent('documentTypeOtherChargesMaster.placeholder.financialAccountHead')),
    };
    return (
        <Form form={formEdit ? editForm : docTypeHeadMappingForm} id="myForm" autoComplete="off" layout="vertical">
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('documentTypeOtherChargesMaster.label.otherCharges')} name="chargeCode" rules={[validateRequiredSelectField(translateContent('documentTypeOtherChargesMaster.label.otherCharges'))]}>
                        {customSelectBox({ data: typeData, placeholder: preparePlaceholderSelect(translateContent('documentTypeOtherChargesMaster.label.otherCharges')) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('documentTypeOtherChargesMaster.placeholder.financialAccountHead')} name="financialAccountHeadId" initialValue={props?.financialAccountHeadId} rules={[validateRequiredSelectField(translateContent('documentTypeOtherChargesMaster.placeholder.financialAccountHead'))]}>
                        <TreeSelectField {...treeSelectFieldProps} />
                    </Form.Item>
                </Col>

                <Form.Item name="internalId" label="Internal Id" hidden />
                <Form.Item name="financialAccountHeadDesc" label="financialAccountHeadDesc" hidden />
                <Form.Item name="id" label="Id" hidden />

                {!props?.internalId && (
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Button
                            disabled={formEdit}
                            type="primary"
                            icon={<PlusOutlined />}
                            className={styles.marB20}
                            onClick={() => {
                                addDocHeadMapping();
                            }}
                        >
                            {translateContent('global.buttons.add')}
                        </Button>
                    </Col>
                )}
            </Row>
        </Form>
    );
}

export default FormDocTypeAcMapping;
