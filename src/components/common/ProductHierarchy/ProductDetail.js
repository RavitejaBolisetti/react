/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, Switch, Select, Button } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateAlphanumericWithSpaceHyphenPeriod } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';

import TreeSelectField from '../TreeSelectField';

const { Option } = Select;
const { TextArea } = Input;

const ProductDetail = (props) => {
    const { mainFrom, handleFormValueChange, handleFormFieldChange, onMainFormFinish, onFinishFailed, formData, handleAttributeChange, handleProductchange, isDataAttributeLoaded, disabledProps, attributeData, treeCodeId, treeSelectProps, formActionType, onCloseAction, isFormBtnActive, isReadOnly } = props;
    return (
        <Form form={mainFrom} id="myForm" autoComplete="off" layout="vertical" onFinish={onMainFormFinish} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Attribute Level" rules={[validateRequiredSelectField('attribute level')]}>
                        <Select onChange={handleAttributeChange} onClick={handleProductchange} loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('attribute level')} disabled={formData?.id || isReadOnly} showSearch allowClear>
                            {attributeData?.map((item) => (
                                <Option key={item?.id} value={item?.id}>
                                    {item?.hierarchyAttribueName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padRight18}>
                    <Form.Item initialValue={treeCodeId} label="Parent" name="parentCode">
                        <TreeSelectField {...treeSelectProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label="Code" name="prodctCode" initialValue={formData?.prodctCode} rules={[validateRequiredInputField('code'), validationFieldLetterAndNumber('code')]}>
                        <Input placeholder={preparePlaceholderText('code')} maxLength={6} disabled={formData?.id || isReadOnly} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item name="prodctShrtName" label="Short Description" initialValue={formData?.prodctShrtName} rules={[validateRequiredInputField('short description'), validateAlphanumericWithSpaceHyphenPeriod('short description')]}>
                        <Input placeholder={preparePlaceholderText('short description')} maxLength={50} disabled={formData?.id || isReadOnly} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                    <Form.Item name="prodctLongName" label="Long Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('long description'), validateAlphanumericWithSpaceHyphenPeriod('long description')]}>
                        <TextArea rows={1} placeholder={preparePlaceholderText('long description')} maxLength={300} disabled={formData?.id || isReadOnly} showCount />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active ? true : false} label="Status" name="active">
                        <Switch value={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active ? true : false} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active === true || null || undefined ? true : false} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20} className={styles.formFooter}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                    <Button danger onClick={onCloseAction}>
                        Cancel
                    </Button>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                    <Button htmlType="submit" form="myForm" disabled={!isFormBtnActive} type="primary">
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
        // </Fragment>
    );
};

export default ProductDetail;
