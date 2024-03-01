/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Button, Switch, Select } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { withDrawer } from 'components/withDrawer';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { onCloseAction, formData, selectedProductName, zoneMasterData, areaOfficeData, handleZoneChange } = props;
    const { handleDealer, isAreaOfficeLoading, isFormBtnActive, setFormBtnActive, onFinish, dealerBlockData, form } = props;

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({ status: formData?.status });
            form.setFieldsValue({ hierarchyMstId: formData?.hierarchyMstName });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const customTitle = (key, value) => {
        return `${value} - (${key})`;
    };
    return (
        <>
            <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={selectedProductName} label={translateContent('bookingBlockMaster.label.productHierarchy')} name="modelGroupCode" rules={[validateRequiredSelectField(translateContent('bookingBlockMaster.validation.productHierarchy'))]}>
                                    <Input placeholder={preparePlaceholderText(translateContent('bookingBlockMaster.placeholder.productHierarchy'))} disabled={true} />
                                </Form.Item>
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label={translateContent('vehicleSalesSchemeMaster.label.zone')} name="zoneCode" initialValue={formData?.zoneCode} rules={[validateRequiredSelectField(translateContent('vehicleSalesSchemeMaster.validation.zone'))]}>
                                    <Select placeholder={translateContent('global.placeholder.select')} onChange={handleZoneChange} allowClear>
                                        {zoneMasterData?.map((item) => (
                                            <Option value={item?.zoneCode}>{item?.zoneDescription}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label={translateContent('vehicleSalesSchemeMaster.label.area')} name="areaCode" initialValue={formData?.areaCode} rules={[validateRequiredSelectField(translateContent('vehicleSalesSchemeMaster.validation.area'))]}>
                                    <Select loading={isAreaOfficeLoading} placeholder={translateContent('global.placeholder.select')} onChange={handleDealer} allowClear>
                                        {areaOfficeData?.map((item) => (
                                            <Option value={item?.areaCode}>{item?.areaDescription}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.dealerCode} label={translateContent('bookingBlockMaster.label.dealerName')} name="dealerCode" rules={[validateRequiredInputField(translateContent('bookingBlockMaster.label.dealerName'))]}>
                                    {customSelectBox({
                                        data: dealerBlockData,
                                        fieldNames: { key: 'dealerCode', value: 'dealerName' },
                                        customTitle,
                                        placeholder: preparePlaceholderSelect(translateContent('bookingBlockMaster.label.dealerName')),
                                    })}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={0} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.status} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('global.label.status')}>
                                    <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} onChange={(checked) => (checked ? 1 : 0)} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row gutter={20} className={styles.formFooterNew}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                        <Button danger onClick={onCloseAction}>
                            {translateContent('global.buttons.cancel')}
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                        <Button htmlType="submit" type="primary" disabled={!isFormBtnActive}>
                            {translateContent('global.buttons.save')}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
