/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Collapse, Select, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { TaxAndChargesCalculationMaster } from './TaxAndChargesCalculation';
import { customSelectBox } from 'utils/customSelectBox';


import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Option } = Select;


const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed, stateData, saleData, taxChargeCategoryTypeData } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const [openAccordian, setOpenAccordian] = useState(1);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const fieldNames = { label: 'name', value: 'code' };
    const fieldSaleNames = { label: 'value', value: 'key' };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const masterTaxChargeCalProp = {
        taxChargeCategoryTypeData,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {viewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.taxCategoryCode} label="Code" name="taxCategoryCode" rules={[validateRequiredInputField('Code')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Code')} maxLength={6} disabled={editMode ? true : false} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Description" initialValue={formData?.taxCategoryDescription} rules={[validateRequiredInputField('Description')]} name="taxCategoryDesc">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Description')} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label="State" initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField('State')]}>
                                {customSelectBox({ data: stateData, fieldNames: { key: 'code', value: 'name' } ,placeholder: preparePlaceholderSelect('State') })}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label="Sale Type" name="saleTypeCode" rules={[validateRequiredSelectField('Sale Type')]}>
                                {customSelectBox({ data: saleData,placeholder: preparePlaceholderSelect('State') })}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Collapse className={openAccordian === 1 ? styles.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon}>
                        <Panel header="Tax & Charges Calculation" key="1">
                            <TaxAndChargesCalculationMaster {...masterTaxChargeCalProp} />
                        </Panel>
                    </Collapse>
                </>
            )}

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
