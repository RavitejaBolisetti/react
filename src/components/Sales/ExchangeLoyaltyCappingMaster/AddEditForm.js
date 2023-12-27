/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Switch, DatePicker } from 'antd';
import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';


import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { disableFutureDate } from 'utils/disableDate';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { customSelectBox } from 'utils/customSelectBox';

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed,selectedOrder, formActionType } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

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

    const modelGroup = [
        { key: 1, value: 'BOLERO' },
        { key: 2, value: 'XYLO' },
        { key: 3, value: 'ALPHA LOAD' },
        { key: 4, value: 'XUV700' },
        { key: 4, value: 'All' },
    ];
    
    const modelVariant = [
        { key: 1, value: 'B2 OPT DEMO BS6' },
        { key: 2, value: 'B6 OPT DEMO BS6' },
        { key: 3, value: 'B4 OPT DEMO BS6' },
        { key: 4, value: 'All' },
    ];
    
    const zone = [
        { key: 1, value: 'East' },
        { key: 2, value: 'West' },
        { key: 3, value: 'North' },
        { key: 4, value: 'South' },
        { key: 4, value: 'All' },
    ];
    
    const areaOffice
    = [
        { key: 1, value: 'Kolkata' },
        { key: 2, value: 'Patna' },
        { key: 3, value: 'Durgapur' },
        { key: 4, value: 'Bhubaneswar' },
        { key: 4, value: 'All' },
    ];
    const dealerCode
    = [
        { key: 1, value: 'SCH0001' },
        { key: 2, value: 'SCH0002' },
        { key: 3, value: 'SCH0003' },
        { key: 4, value: 'SCH0004' },
        { key: 4, value: 'All' },
    ];
    
    const fieldNames = { value: 'value', key: 'value' }
    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={selectedOrder?.modelGroup} label={translateContent('ExchangeLoyaltyCappingMaster.label.modelGroup')} name="modelGroup">
                          {customSelectBox({ disabled: formActionType?.viewMode, disableOptionsKey: 'modelGroup', data: modelGroup, fieldNames: fieldNames, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.modelGroup')) })}                       
                        </Form.Item> 




                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>

                                <Form.Item initialValue={selectedOrder?.modelVariant} label={translateContent('ExchangeLoyaltyCappingMaster.label.modelVariant')} name="modelVariant">
                          {customSelectBox({ disabled: formActionType?.viewMode, disableOptionsKey: 'modelVariant', data: modelVariant, fieldNames: fieldNames, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.modelVariant')) })}                       
                        </Form.Item> 


                                    
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={selectedOrder?.zone} label={translateContent('ExchangeLoyaltyCappingMaster.label.zone')} name="zone">
                          {customSelectBox({ disabled: formActionType?.viewMode, disableOptionsKey: 'zone', data: zone, fieldNames: fieldNames, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.zone')) })}                       
                        </Form.Item> 


                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>

                                <Form.Item initialValue={selectedOrder?.areaOffice} label={translateContent('ExchangeLoyaltyCappingMaster.label.areaOffice')} name="areaOffice">
                          {customSelectBox({ disabled: formActionType?.viewMode, disableOptionsKey: 'areaOffice', data: areaOffice, fieldNames: fieldNames, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.areaOffice')) })}                       
                        </Form.Item> 


                                
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>

                                <Form.Item initialValue={selectedOrder?.dealerCode} label={translateContent('ExchangeLoyaltyCappingMaster.label.dealerCode')} name="dealerCode">
                          {customSelectBox({ disabled: formActionType?.viewMode, disableOptionsKey: 'dealerCode', data: dealerCode, fieldNames: fieldNames, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.dealerCode')) })}                       
                        </Form.Item> 

                                   
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.dealerName')} initialValue={formData?.dealerName} 
                                    // rules={
                                    //     [validateRequiredInputField(translateContent('ExchangeLoyaltyCappingMaster.validation.dealerName'))]
                                    //     } 
                                        name="dealerName">
                                        <Input value={dealerCode?.[form?.getFieldsValue(['dealerCode'])]} placeholder={preparePlaceholderText(translateContent('ExchangeLoyaltyCappingMaster.placeholder.dealerName'))} maxLength={250} disabled={ true } />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.capping} label={translateContent('ExchangeLoyaltyCappingMaster.label.capping')} name="capping" rules={[validateRequiredInputField(translateContent('ExchangeLoyaltyCappingMaster.validation.capping'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('ExchangeLoyaltyCappingMaster.placeholder.capping'))} maxLength={250} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.retailSlabFrom')} initialValue={formData?.retailSlabFrom} rules={[validateRequiredInputField(translateContent('ExchangeLoyaltyCappingMaster.validation.retailSlabFrom'))]} name="retailSlabFrom">
                                        <Input placeholder={preparePlaceholderText(translateContent('ExchangeLoyaltyCappingMaster.placeholder.retailSlabFrom'))} maxLength={250} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.retailSlabTo')} initialValue={formData?.retailSlabTo} rules={[validateRequiredInputField(translateContent('ExchangeLoyaltyCappingMaster.placeholder.retailSlabTo'))]} name="retailSlabTo">
                                        <Input placeholder={preparePlaceholderText(translateContent('ExchangeLoyaltyCappingMaster.placeholder.retailSlabTo'))} maxLength={250} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.validFrom')} initialValue={formattedCalendarDate(formData?.validFrom)} rules={[validateRequiredInputField(translateContent('ExchangeLoyaltyCappingMaster.validation.validFrom'))]} name="validFrom">
                                    <DatePicker disabledDate={disableFutureDate} format={dateFormat} placeholder={preparePlaceholderText(translateContent('ExchangeLoyaltyCappingMaster.placeholder.validFrom'))} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.validTo')} initialValue={formattedCalendarDate(formData?.validTo)} rules={[validateRequiredInputField(translateContent('ExchangeLoyaltyCappingMaster.validation.validTo'))]} name="validTo">
                                          <DatePicker disabledDate={disableFutureDate} format={dateFormat}  placeholder={preparePlaceholderText(translateContent('ExchangeLoyaltyCappingMaster.placeholder.validTo'))} disabled={editMode ? true : false} />
                                    </Form.Item>

                                  

                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('ExchangeLoyaltyCappingMaster.label.status')}>
                                        <Switch checkedChildren={translateContent('ExchangeLoyaltyCappingMaster.label.active')} unCheckedChildren={translateContent('ExchangeLoyaltyCappingMaster.label.inactive')} onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>
                            </Row>
{/* 
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('LoyaltyDocumentMaster.label.status')}>
                                        <Switch checkedChildren={translateContent('LoyaltyDocumentMaster.label.active')} unCheckedChildren={translateContent('LoyaltyDocumentMaster.label.inactive')} onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>
                            </Row> */}
                        </>
                    )}
                </Col>
            </Row>

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
