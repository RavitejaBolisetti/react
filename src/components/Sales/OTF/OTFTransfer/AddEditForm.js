/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Card, Descriptions } from 'antd';

import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { checkAndSetDefaultValue, getStatus } from 'utils/checkAndSetDefaultValue';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, isLoading, selectedOrder, salesConsultantLov, dealerLocations, isSalesConsultantLoading, defaultDealerLocationCode } = props;
    const { otfTransferForm, onFinishOTFTansfer, handleOtfTransferLocationChange } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, typeData } = props;

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        onFinishOTFTansfer,
        disabled: isLoading,
        isLoadingOnSave: isLoading,
    };

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 2, lg: 2, xl: 2, xxl: 2 },
    };

    const viewTwoProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 },
    };

    return (
        <>
            <Form form={otfTransferForm} data-testid="test" onFinish={onFinishOTFTansfer} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Card className={styles.ExchangeCard}>
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('bookingManagement.profileCard.bookingNumber')}>{checkAndSetDefaultValue(selectedOrder?.bookingNumber || selectedOrder?.otfNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('bookingManagement.profileCard.bookingDate')}>{checkAndSetDefaultValue(convertDateTime(selectedOrder?.otfDate, dateFormatView), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.customerName')}>{checkAndSetDefaultValue(selectedOrder?.customerName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('bookingManagement.profileCard.mobileNumber')}>{checkAndSetDefaultValue(selectedOrder?.mobileNumber, isLoading)}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions {...viewTwoProps}>
                                <Descriptions.Item label={translateContent('bookingManagement.profileCard.model')}>{checkAndSetDefaultValue(selectedOrder?.model, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('bookingManagement.label.orderStatus')}>{getStatus(selectedOrder?.orderStatus)}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item name="otfTransferLocation" label={translateContent('bookingManagement.label.transferToLocation')} initialValue={formData?.otfTransferLocation} rules={[validateRequiredSelectField(translateContent('bookingManagement.label.transferToLocation'))]}>
                                    {customSelectBox({
                                        data: dealerLocations?.filter((location) => location?.locationCode !== defaultDealerLocationCode),
                                        fieldNames: { key: 'locationCode', value: 'dealerLocationName' },
                                        placeholder: preparePlaceholderSelect(''),
                                        onChange: handleOtfTransferLocationChange,
                                    })}
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item name="salesConsultant" label={translateContent('bookingManagement.label.saleConsultant')} initialValue={formData?.salesConsultant} rules={[validateRequiredSelectField(translateContent('bookingManagement.label.saleConsultant'))]}>
                                    <Select placeholder={translateContent('bookingManagement.label.saleConsultant')} loading={isSalesConsultantLoading} showSearch allowClear>
                                        {salesConsultantLov?.map((item) => (
                                            <Option value={item.key}>{item.value}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item name="transferReason" label={translateContent('bookingManagement.label.transferReason')} initialValue={formData?.transferReason} rules={[validateRequiredSelectField(translateContent('bookingManagement.label.transferReason'))]}>
                                    {customSelectBox({ data: typeData, placeholder: preparePlaceholderSelect(translateContent('bookingManagement.label.transferReason')) })}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
