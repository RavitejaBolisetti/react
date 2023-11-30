/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Collapse, Divider } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { VoucherDetailsForm } from './VoucherDetailsForm';
import { PartyDetailsForm } from './PartyDetailsForm';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

const AddEditFormBase = (props) => {
    const { form } = props;
    const { activeKey, handleCollapse, handlePartySegmentChange, handleSearchParamSearch, handlePartyIdChange, requestPayload } = props;

    const voucherDetailsProp = { ...props, form, formType: 'voucherDetails', formData: requestPayload?.voucherDetailsDto };
    const partyDetailsProp = { ...props, form, formType: 'partyDetails', formData: requestPayload?.partyDetailsDto, handlePartySegmentChange, handleSearchParamSearch, handlePartyIdChange };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse collapsible="icon" onChange={(e) => handleCollapse(1)} activeKey={activeKey} expandIcon={expandIcon} expandIconPosition="end">
                        <Panel header={translateContent('creditDebitNote.label.voucherDetails')} key="1">
                            <Divider />
                            <VoucherDetailsForm key="1" {...voucherDetailsProp} />
                        </Panel>
                    </Collapse>
                    <Collapse collapsible="icon" onChange={() => handleCollapse(2)} activeKey={activeKey} expandIcon={expandIcon} expandIconPosition="end">
                        <Panel header={translateContent('creditDebitNote.label.partyDetails')} key="2">
                            <Divider />
                            <PartyDetailsForm key="2" {...partyDetailsProp} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormBase;
