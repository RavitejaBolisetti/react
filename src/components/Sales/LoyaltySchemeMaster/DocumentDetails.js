/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, DatePicker, Switch,Button} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from 'assets/sass/app.module.scss';

import { disableFutureDate } from 'utils/disableDate';

import { validateRequiredInputField } from 'utils/validation';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';

function DocumentDetails({ form, onFieldsChange, onFinish, formData, editMode, finalFormdata, documentTypeDescription, documentTypeCode }) {
    const onFinishFailed = (err) => {
        console.error(err);
    };

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.documentId} label={translateContent('LoyaltySchemeMaster.label.documentId')} name="documentId" rules={[validateRequiredInputField(translateContent('LoyaltySchemeMaster.validation.documentId'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('LoyaltySchemeMaster.placeholder.documentId'))} maxLength={6} disabled={editMode ? true : false} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('LoyaltySchemeMaster.label.documentName')} initialValue={formData?.documentName} rules={[validateRequiredInputField(translateContent('LoyaltySchemeMaster.validation.documentName'))]} name="documentName">
                        <Input placeholder={preparePlaceholderText(translateContent('LoyaltySchemeMaster.placeholder.documentName'))} maxLength={250} disabled={editMode ? true : false} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('LoyaltySchemeMaster.label.validFrom')} initialValue={formattedCalendarDate(formData?.validFrom)} rules={[validateRequiredInputField(translateContent('LoyaltySchemeMaster.validation.validFrom'))]} name="validFrom">
                        <DatePicker disabledDate={disableFutureDate} format={dateFormat} placeholder={preparePlaceholderText(translateContent('LoyaltySchemeMaster.placeholder.validFrom'))} disabled={editMode ? true : false} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>               
               
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('LoyaltySchemeMaster.label.validTo')} initialValue={formattedCalendarDate(formData?.validTo)} rules={[validateRequiredInputField(translateContent('LoyaltySchemeMaster.validation.validTo'))]} name="validTo">
                        <DatePicker disabledDate={disableFutureDate} format={dateFormat} placeholder={preparePlaceholderText(translateContent('LoyaltySchemeMaster.placeholder.validTo'))} disabled={editMode ? true : false} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="documentstatus" label={translateContent('LoyaltySchemeMaster.label.documentstatus')}>
                        <Switch checkedChildren={translateContent('LoyaltySchemeMaster.label.activesheme')} unCheckedChildren={translateContent('LoyaltySchemeMaster.label.inactivesheme')} onChange={(checked) => (checked ? 1 : 0)} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="documentmandatory" label={translateContent('LoyaltySchemeMaster.label.documentmandatory')}>
                        <Switch checkedChildren={translateContent('LoyaltySchemeMaster.label.documentyes')} unCheckedChildren={translateContent('LoyaltySchemeMaster.label.documentno')} onChange={(checked) => (checked ? 1 : 0)} />
                    </Form.Item>
                </Col>
            </Row>

                <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                    <Button form="applicationActionsForm"  icon={<PlusOutlined />} htmlType="submit" type="primary">
                        {translateContent('global.buttons.add')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default DocumentDetails;
