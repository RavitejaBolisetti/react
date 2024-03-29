/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Button, Switch } from 'antd';
import TreeSelectField from '../../common/TreeSelectField';
import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { COA_ACCOUNT_TYPE } from 'constants/modules/ChartOfAccount/coaAccountType';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { withDrawer } from 'components/withDrawer';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { onCloseAction, chartOfAccountHierarchy, selectedTreeSelectKey, setSelectedTreeSelectKey, disableCheckBox } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, form, disable, accountTyp, setAccountTyp, formActionType } = props;
    const treeFieldNames = { label: 'accountDescription', value: 'accountCode', children: 'subGroup' };

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const onChange = (props) => {
        setAccountTyp(props);

        form.setFieldsValue({
            accountType: props,
            openingBalanceCredit: null,
            openingBalanceDebit: null,
        });
    };

    const handleSelectTreeClick = (value) => {
        setSelectedTreeSelectKey(value);
        setFormBtnActive(true);
        form.setFieldValue('parentAccountCode', value);
    };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: chartOfAccountHierarchy,
        treeDisabled: formActionType === FROM_ACTION_TYPE?.EDIT ? false : true,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: selectedTreeSelectKey?.[0],
        placeholder: preparePlaceholderSelect('Parent'),
    };

    return (
        <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={translateContent('chartOfAccount.label.attributeLevel')} name="accountType" rules={[validateRequiredSelectField(translateContent('chartOfAccount.validation.attributeLevel'))]}>
                                {customSelectBox({ data: Object.values(COA_ACCOUNT_TYPE), placeholder: translateContent('chartOfAccount.placeholder.attributeLevel'), onChange: onChange, disabled: !disable, fieldNames: { key: 'key', value: 'title' } })}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={translateContent('chartOfAccount.label.parent')} name="parentAccountCode">
                                <TreeSelectField {...treeSelectFieldProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={translateContent('chartOfAccount.label.code')} name="accountCode" rules={[validateRequiredInputField(translateContent('chartOfAccount.validation.code'))]}>
                                <Input placeholder={translateContent('chartOfAccount.placeholder.code')} maxLength={36} disabled={!disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={translateContent('chartOfAccount.label.description')} name="accountDescription" rules={[validateRequiredInputField(translateContent('chartOfAccount.validation.accountDescription'))]}>
                                <Input placeholder={translateContent('chartOfAccount.placeholder.accountdDescription')} maxLength={50} disabled={!disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {accountTyp === COA_ACCOUNT_TYPE?.LEDGER_ACCOUNT?.key && (
                        <>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item name="openingBalanceCredit" label={translateContent('chartOfAccount.label.openingBalanceCredit')} rules={[validateRequiredInputField(translateContent('chartOfAccount.validation.openingBalanceCredit')), validateNumberWithTwoDecimalPlaces(translateContent('chartOfAccount.validation.openingBalanceCredit'))]}>
                                        <Input placeholder={translateContent('chartOfAccount.placeholder.openingBalanceCredit')} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item name="openingBalanceDebit" label={translateContent('chartOfAccount.label.openingBalanceDebit')} rules={[validateRequiredInputField(translateContent('chartOfAccount.validation.openingBalanceDebit')), validateNumberWithTwoDecimalPlaces(translateContent('chartOfAccount.validation.openingBalanceCredit'))]}>
                                        <Input placeholder={translateContent('chartOfAccount.placeholder.openingBalanceDebit')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('chartOfAccount.label.status')}>
                                <Switch disabled={disableCheckBox} checkedChildren={translateContent('chartOfAccount.label.active')} unCheckedChildren={translateContent('chartOfAccount.label.inActive')} onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <div className={styles.formFooter}>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                        <Button danger onClick={onCloseAction}>
                            {translateContent('global.buttons.cancel')}
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                        <Button data-testid="isFormBtnActive" htmlType="submit" danger disabled={!isFormBtnActive}>
                            {translateContent('global.buttons.save')}
                        </Button>
                    </Col>
                </Row>
            </div>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
