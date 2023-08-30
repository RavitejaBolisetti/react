/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Button, Switch } from 'antd';
import TreeSelectField from '../../common/TreeSelectField';
import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { ATTRIBUTE_TYPE } from 'constants/modules/ChartOfAccount/attributeType';
import { withDrawer } from 'components/withDrawer';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'components/common/Common.module.css';

const AddEditFormMain = (props) => {
    const { onCloseAction, chartOfAccountHierarchy, selectedTreeSelectKey, setSelectedTreeSelectKey } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed, form, disable, accountTyp, setAccountTyp } = props;
    const treeFieldNames = { label: 'accountDescription', value: 'accountCode', children: 'subGroup' };

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const onChange = (props) => {
        setAccountTyp(props);
        form.setFieldValue('accountType', props);
    };

    const handleSelectTreeClick = (value) => {
        setSelectedTreeSelectKey(value);
        setFormBtnActive(true);
        form.setFieldValue('parentAccountCode', value);
    };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: chartOfAccountHierarchy,
        treeDisabled: disable,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: selectedTreeSelectKey?.[0],
        placeholder: preparePlaceholderSelect('Parent'),
    };

    return (
        <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Attribute Level" name="accountType" rules={[validateRequiredSelectField('Attribute Level')]}>
                                {customSelectBox({ data: ATTRIBUTE_TYPE, placeholder: preparePlaceholderSelect('Attribute Level'), onChange: onChange, disabled: !disable })}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Parent" name="parentAccountCode">
                                <TreeSelectField {...treeSelectFieldProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Code" name="accountCode" rules={[validateRequiredInputField('code')]}>
                                <Input placeholder={preparePlaceholderText('code')} maxLength={6} disabled={!disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Description" name="accountDescription" rules={[validateRequiredInputField('Account description')]}>
                                <Input placeholder={preparePlaceholderText('Account description')} maxLength={50} disabled={!disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {accountTyp === ATTRIBUTE_TYPE?.[1]?.key && (
                        <>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item name="openingBalanceCredit" label="Opening Balance Cr." rules={[validateRequiredInputField('Opening Balance Credit'), validateNumberWithTwoDecimalPlaces('Opening Balance Credit')]}>
                                        <Input placeholder={preparePlaceholderText('Opening Balance Credit')} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item name="openingBalanceDebit" label="Opening Balance Debit" rules={[validateRequiredInputField('Opening Balance Debit'), validateNumberWithTwoDecimalPlaces('Opening Balance Credit')]}>
                                        <Input placeholder={preparePlaceholderText('Opening Balance Debit')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <div className={styles.formFooter}>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                        <Button danger onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                        <Button data-testid="isFormBtnActive" htmlType="submit" danger disabled={!isFormBtnActive}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </div>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
