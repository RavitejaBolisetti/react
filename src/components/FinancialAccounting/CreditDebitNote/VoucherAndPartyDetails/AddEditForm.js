/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Space, Collapse, Divider } from 'antd';
import { FiEdit } from 'react-icons/fi';

import { expandIconWithText } from 'utils/accordianExpandIcon';

import { VoucherDetailsForm } from './VoucherDetailsForm';
import { PartyDetailsForm } from './PartyDetailsForm';

const { Panel } = Collapse;

const AddEditFormBase = (props) => {
    const { form, formData} = props;
    const { activeKey, handleCollapse } = props;
 
    const voucherDetailsProp = { ...props, form, formType: 'voucherDetails', formData: formData?.voucherDetailsDto };
    const partyDetailsProp = { ...props, form, formType: 'partyDetails', formData: formData?.partyDetailsDto };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Collapse collapsible="icon" onChange={(e) => handleCollapse(1)} activeKey={activeKey} expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end">
                            <Panel header="Voucher Details" key="1">
                                <Divider />
                                <VoucherDetailsForm key="1" {...voucherDetailsProp} />
                            </Panel>
                        </Collapse>
                        <Collapse collapsible="icon" onChange={() => handleCollapse(2)} activeKey={activeKey} expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} expandIconPosition="end">
                            <Panel header="Party Details" key="2">
                                <Divider />
                                <PartyDetailsForm key="2" {...partyDetailsProp} />
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormBase;
