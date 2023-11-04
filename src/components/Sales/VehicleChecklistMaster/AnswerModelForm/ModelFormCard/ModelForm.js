/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Col, Row, Button, Switch, Select } from 'antd';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { translateContent } from 'utils/translateContent';
import { PlusOutlined } from '@ant-design/icons';

const ModelForm = (props) => {
    const { modelForm, onFinishModelForm, modelEdit, modelEditForm, modelSwitch, setModelSwitch, mainFomEdit, modelGroupData, disabledModelGroupData } = props;

    return (
        <>
            <Form form={modelEdit ? modelEditForm : modelForm} id="myForm" autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label={translateContent('vehicleCheckListMaster.label.modelGroupCode')} name="modelGroupCode" rules={[validateRequiredSelectField(translateContent('vehicleCheckListMaster.label.modelGroupCode'))]}>
                            <Select options={disabledModelGroupData} fieldNames={{ value: 'modelGroupCode', label: 'modelGroupDescription' }} disabled={mainFomEdit} placeholder={preparePlaceholderSelect(translateContent('vehicleCheckListMaster.label.modelGroupCode'))} showSearch filterOption={(input, option) => option?.modelGroupCode?.toLowerCase()?.includes(input?.toLowerCase()) || option?.modelGroupDescription?.toLowerCase()?.includes(input?.toLowerCase())} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ marginBottom: '12px' }}>
                        <Row justify="space-between" align="middle">
                            <Form.Item label={translateContent('vehicleCheckListMaster.label.modelGroupStatus')} name="status" initialValue={modelSwitch}>
                                <Switch value={modelSwitch} onChange={() => setModelSwitch(!modelSwitch)} defaultChecked={modelSwitch} disabled={mainFomEdit} checkedChildren={translateContent('vehicleCheckListMaster.label.active')} unCheckedChildren={translateContent('vehicleCheckListMaster.label.inactive')} />
                            </Form.Item>
                            {!props?.internalId && (
                                <Button
                                    disabled={modelEdit}
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        onFinishModelForm();
                                    }}
                                >
                                    {translateContent('global.buttons.add')}
                                </Button>
                            )}
                        </Row>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="internalId" label="Internal Id" />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="id" label="Id" />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default ModelForm;
