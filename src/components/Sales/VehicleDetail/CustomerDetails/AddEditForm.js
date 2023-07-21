/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Row, Space, Collapse, AutoComplete, Divider } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { AddressCommonForm } from './AddressCommonForm';
import { KeyAccountDetails } from './KeyAccountDetails';
import { LoyalityDetails } from './LoyalityDetails';
import { expandIconWithText } from 'utils/accordianExpandIcon';
import { VehicleCustomerSearch } from './VehicleCustomerSearch';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;

const AddEditFormBase = (props) => {
    const { form, sameAsBookingCustomer, formData, setSameAsBookingCustomer, fnSetData } = props;
    const { typeData, activeKey, handleCollapse, searchForm } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
                ownerCustomer: { ...formData?.ownerCustomer },
                billingCustomer: { ...formData?.billingCustomer },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
    const onSearch = (event) => {
        console.log('THIS IS SEARCH', event?.target?.value);
    };

    const handleOnChange = (e) => {
        if (e.target.checked) {
            setSameAsBookingCustomer(true);
            let ownerCustomer = formData?.ownerCustomer;
            form?.setFieldsValue({ billingCustomer: { ...ownerCustomer } });
        } else {
            setSameAsBookingCustomer(false);
            form?.resetFields();
        }
    };

    const ownerCustomerProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.ownerCustomer,
        formType: 'ownerCustomer',
        onSearch,
        searchForm,
        fnSetData: (data) => fnSetData(data, 'ownerCustomer'),
    };

    const bilingCustomerProps = {
        ...props,
        AutoComplete,
        typeData,

        formData: formData?.billingCustomer,
        formType: 'billingCustomer',
        searchForm,
        disabledProps: { disabled: sameAsBookingCustomer },
        handleOnChange,
        fnSetData: (data) => fnSetData(data, 'billingCustomer'),
    };

    const keyAccountDetailsProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.vehicleKeyAccountDetails,
        formType: 'vehicleKeyAccountDetails',
    };

    const loyaltyProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.vehicleCustomerLoyaltyDetails,
        formType: 'vehicleCustomerLoyaltyDetails',
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const modalProps = {
        isVisible: isModalOpen,
        titleOverride: 'Customer Search Details',
        closable: false,
        onCloseAction: handleCancel,
    };

    // const handleOnChange = (vall) => {
    //     if (vall.target.checked) {
    //         setSameAsOwner(true);
    //         let ownerCustomer = form.getFieldsValue()?.ownerCustomer;
    //         let billingCustomer = form.getFieldsValue()?.billingCustomer;
    //         billingCustomer = { ...ownerCustomer };
    //         form?.setFieldsValue({ billingCustomer: { ...ownerCustomer } });
    //     } else setSameAsOwner(false);
    // };

    // const handleDataSet = () => {
    //     form.setFieldsValue(data.ownerCustomer);
    //     billCstmForm.setFieldsValue(data.billingCustomer);
    // };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Collapse onChange={(e) => handleCollapse(1)} activeKey={activeKey} expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end">
                            <Panel header=" Owner Details" key="1">
                                <Divider />
                                <AddressCommonForm key="1" {...ownerCustomerProps} isBillingCustmrForm={false} />
                            </Panel>
                        </Collapse>
                        <Collapse onChange={() => handleCollapse(2)} activeKey={activeKey} expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end">
                            <Panel header=" Booking Customer" key="2">
                                <Divider />
                                <AddressCommonForm key="2" {...bilingCustomerProps} isBillingCustmrForm={true} />
                            </Panel>
                        </Collapse>
                        <Collapse onChange={() => handleCollapse(3)} activeKey={activeKey} expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end">
                            <Panel header="Key Account Details" key="3">
                                <Divider />
                                <KeyAccountDetails key="3" {...keyAccountDetailsProps} />
                            </Panel>
                        </Collapse>
                        <Collapse expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end" onChange={() => handleCollapse(4)} activeKey={activeKey}>
                            <Panel header=" Loyalty Details" key="4">
                                <Divider />
                                <LoyalityDetails key="4" {...loyaltyProps} />
                            </Panel>
                        </Collapse>
                        <Collapse expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end" onChange={() => handleCollapse(5)} activeKey={activeKey}>
                            <Panel header=" Ownership Change Request" key="5">
                                <Divider />
                                <div className={styles.viewNoDataFound}>Coming Soon</div>
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
            <VehicleCustomerSearch {...modalProps} />
        </>
    );
};

export const AddEditForm = AddEditFormBase;