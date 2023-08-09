/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, Select, Card, Descriptions, DatePicker, InputNumber } from 'antd';

import styles from 'components/common/Common.module.css';
import { preparePlaceholderText, preparePlaceholderSelect, preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { validateRequiredSelectField, validateOnlyPositiveNumber, validationNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { checkAndSetDefaultValue, getStatus } from 'utils/checkAndSetDefaultValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import { VehiclePurchaseOrderFormButton } from '../VehiclePurchaseOrderFormButton';
import { convertCalenderDate } from 'utils/formatDateTime';
import { ViewDetail } from './ViewDetail';

import { disablePastDate } from 'utils/disableDate';
const { TextArea, Search } = Input;

const AddEditFormMain = (props) => {
    const { handleButtonClick, buttonData, setButtonData, userId, listShowLoading, showGlobalNotification, formActionType, onFinish, onFinishFailed, productHierarchyList, getDealerlocation, dealerLocationList } = props;
    const { form, formData, typeData, isReadOnly = true, onSearch } = props;
    const disabledProps = { disabled: isReadOnly };
    const [dealerFlag, setDealerFlag] = useState();

    const [dealerLoc, setDealerLoc] = useState();

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    const isLoading = false;

    const handleChangeOrderType = (value) => {
        console.log('order val', value);
        if (value === 'CDLR') {
            setDealerFlag(value);
        } else {
            setDealerFlag();
        }
    };
    useEffect(() => {
        if (formData?.orderTypeCode == 'CDLR') {
            setDealerFlag(formData?.orderTypeCode);
            
        }
    }, [formData]);

    // const getDealerlocation = (value) => {
    //     // setDealerLoc(value);
    //     console.log('value',value);
    //     form.setFieldValue('dealerLocation', value.target.value);
    // };

    // useEffect(() => {
    //     form.setFieldValue('dealerLocation', dealerLoc);
    // }, [dealerLoc]);

    return (
        <Form form={form} layout="vertical" autocomplete="off" colon="false" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {!formActionType?.viewMode ? (
                        <>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="orderTypeCode" label="Order Type" initialValue={formData?.orderTypeCode} rules={[validateRequiredSelectField('Order Type')]}>
                                        <Select onChange={handleChangeOrderType} placeholder="Select Order Type" allowClear options={typeData['PO_TYPE']} fieldNames={{ label: 'value', value: 'key' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                {dealerFlag && (
                                    <>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item name="dealerParentCode" label="Dealer Code" initialValue={formData?.dealerParentCode}>
                                                <Search maxLength={50} allowClear onSearch={getDealerlocation} placeholder="Enter Dealer Code" className={styles.headerSearchField} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item name="dealerLocation" label="Dealer Location" initialValue={formData?.dealerLocation}>
                                                <Select placeholder="Select Location" showSearch allowClear options={dealerLocationList} fieldNames={{ label: 'dealerLocationName', value: 'id' }} />
                                            </Form.Item>
                                        </Col>
                                    </>
                                )}
                                {formActionType?.editMode && (
                                    <>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item name="purchaseOrderNumber" label="Purchase Order Number" initialValue={formData?.purchaseOrderNumber}>
                                            <Input maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                               
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={convertCalenderDate(formData?.purchaseOrderDate ? formData?.purchaseOrderDate : new Date(), 'YYYY/MM/DD')} label="Purchase Order Date" name="purchaseOrderDate">
                                        <DatePicker disabledDate={disablePastDate} {...disabledProps}  format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item name="purchaseOrderStatus" label="Purchase Order Status" initialValue={formData?.purchaseOrderStatus}>
                                                <Input maxLength={50} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                    </>
                                )}
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <h3> Product Details </h3>
                                </Col>
                                <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
                                    <Form.Item name="modelCode" label="Model" initialValue={formData?.modelCode} rules={[validateRequiredSelectField('Model')]}>
                                        <Select placeholder="Select Model" allowClear options={productHierarchyList} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
                                    <Form.Item name="quantity" label="Quantity" initialValue={formData?.quantity} rules={[validateOnlyPositiveNumber('Quantity')]}>
                                        <InputNumber defaultValue={1} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <ViewDetail {...props} />
                        </>
                    )}
                </Col>
            </Row>
            <VehiclePurchaseOrderFormButton {...props} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
