/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Row, Collapse, AutoComplete, Divider } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { AddressCommonForm } from './AddressCommonForm';
import { expandIconWithText } from 'utils/accordianExpandIcon';
import { VehicleCustomerSearch } from './VehicleCustomerSearch';
import { translateContent } from 'utils/translateContent';

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

    const handleOnChange = (e) => {
        if (e.target.checked) {
            setSameAsBookingCustomer(true);
            let ownerCustomer = formData?.ownerCustomer;
            form?.setFieldsValue({ billingCustomer: { ...ownerCustomer } });
        } else {
            setSameAsBookingCustomer(false);
            form?.resetFields();
            form?.setFieldsValue({ billingCustomer: null });
        }
    };

    const ownerCustomerProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.ownerCustomer,
        formType: 'ownerCustomer',
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

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const modalProps = {
        isVisible: isModalOpen,
        titleOverride: 'Customer Search Details',
        closable: false,
        onCloseAction: handleCancel,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse onChange={(e) => handleCollapse(1)} activeKey={activeKey} expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('vehicleDetail.customerDetails.heading.ownerDetails')} key="1">
                            <Divider />
                            <AddressCommonForm key="1" {...ownerCustomerProps} isBillingCustmrForm={false} />
                        </Panel>
                    </Collapse>
                    <Collapse onChange={() => handleCollapse(2)} activeKey={activeKey} expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('vehicleDetail.customerDetails.heading.billingDetails')} key="2">
                            <Divider />
                            <AddressCommonForm key="2" {...bilingCustomerProps} isBillingCustmrForm={true} />
                        </Panel>
                    </Collapse>
                    {/* <Collapse onChange={() => handleCollapse(3)} activeKey={activeKey} expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end" collapsible="icon">
                        <Panel header=" Key Account Details" key="3">
                            <Divider />
                            <KeyAccountDetails key="3" {...keyAccountDetailsProps} />
                        </Panel>
                    </Collapse> */}
                    {/* <Collapse expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end" collapsible="icon" onChange={() => handleCollapse(4)} activeKey={activeKey}>
                        <Panel header="Loyalty Details" key="4">
                            <Divider />
                            <LoyalityDetails key="4" {...loyaltyProps} />
                        </Panel>
                    </Collapse> */}
                    {/* <Collapse expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end" collapsible="icon" onChange={() => handleCollapse(5)} activeKey={activeKey}>
                        <Panel header=" Ownership Change Request" key="5">
                            <Divider />
                            <Card>Coming Soon</Card>
                        </Panel>
                    </Collapse> */}
                </Col>
            </Row>
            <VehicleCustomerSearch {...modalProps} />
        </>
    );
};

export const AddEditForm = AddEditFormBase;
