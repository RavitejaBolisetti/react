/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, Card } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';

const claimTypetData = [
    { key: 1, value: 'Corporate Claim' },
    { key: 2, value: 'Exchange Claim' },
    { key: 3, value: 'Loyalty Claim' },
    { key: 4, value: 'All' },
];

const reasonData = [
    { key: 1, value: 'Forgot to punch/Manpower issue' },
    { key: 2, value: 'Kit was not available for generating VDN' },
    { key: 3, value: 'Loyalty ClaimNegligence in claim generations' },
        { key: 3, value: 'Required Docs missing' },
        { key: 4, value: 'Others' },
];


const AddEditFormMain = (props) => {
    const { buttonData, setButtonData, partySegmentType, setPartySegment, handleChange, handleSearch, partyDetailForm, formActionType, selectedOrder } = props;
    const { isLoading } = props;

    console.log('selectedOrder', selectedOrder);

    useEffect(() => {
        partyDetailForm.setFieldsValue({
            ...selectedOrder,
        });
        partyDetailForm.setFieldsValue({
            partyName: selectedOrder?.partyName ?? selectedOrder?.customerName,
            address: selectedOrder?.address,
            city: selectedOrder?.city,
            state: selectedOrder?.state,
            mobileNumber: selectedOrder?.mobileNumber,
            mitraType: selectedOrder?.mitraType,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrder]);


    return (
        <Card>

                <Row gutter={20}>
               
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={selectedOrder?.claimType} label={translateContent('claimEmpowerment.label.empowerDetails.claimType')} name="claimType">
                          {customSelectBox({ disabled: formActionType?.viewMode, disableOptionsKey: 'claimType', data: claimTypetData, fieldNames: { value: 'value', key: 'key' }, placeholder: preparePlaceholderSelect(translateContent('claimEmpowerment.label.empowerDetails.claimType')) })}                       
                        </Form.Item>  
                    </Col>

                     <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={selectedOrder?.invoiceID} label={translateContent('claimEmpowerment.label.empowerDetails.invoiceID')} name="invoiceID">
                            {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('claimEmpowerment.placeholder.invoiceID'))}/>}
                        </Form.Item>
                        </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={selectedOrder?.invoiceDate} label={translateContent('claimEmpowerment.label.empowerDetails.invoiceDate')} name="invoiceDate">
                            {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('claimEmpowerment.placeholder.invoiceDate'))} disabled={true} />}
                        </Form.Item>
                    </Col>   
                </Row>

                <Row gutter={20}> 
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={selectedOrder?.chassisNo} label={translateContent('claimEmpowerment.label.empowerDetails.chassisNo')} name="chassisNo">
                            {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('claimEmpowerment.placeholder.chassisNo'))} disabled={true} />}
                        </Form.Item>
                    </Col>  

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={selectedOrder?.segment} label={translateContent('claimEmpowerment.label.empowerDetails.segment')} name="segment">
                        {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('claimEmpowerment.placeholder.segment'))} disabled={true} />}
                        
                       
                           
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={selectedOrder?.modelDescription} label={translateContent('claimEmpowerment.label.empowerDetails.modelDescription')} name="modelDescription">
                            {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('claimEmpowerment.placeholder.modelDescription'))} disabled={true} />}
                        </Form.Item>
                    </Col>                   
                </Row>
                 <Row gutter={20}>                 
                 <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                 <Form.Item initialValue={selectedOrder?.vDNID} label={translateContent('claimEmpowerment.label.empowerDetails.vDNID')} name="vDNID">
                 {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('claimEmpowerment.placeholder.vDNID'))} disabled={true} />}
                </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={selectedOrder?.vDNDate} label={translateContent('claimEmpowerment.label.empowerDetails.vDNDate')} name="vDNDate">
                            {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('claimEmpowerment.placeholder.vDNDate'))} disabled={true} />}
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={selectedOrder?.customerName} label={translateContent('claimEmpowerment.label.empowerDetails.customerName')} name="customerName">
                            {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('claimEmpowerment.placeholder.customerName'))} disabled={true} />}
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={20}>
                  
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} >
                        <Form.Item initialValue={selectedOrder?.reasonforDelay} label={translateContent('claimEmpowerment.label.empowerDetails.reasonforDelay')} name="reasonforDelay">
                          {customSelectBox({ disabled: formActionType?.viewMode, disableOptionsKey: 'reasonforDelay', data: reasonData, fieldNames: { value: 'value', key: 'key' }, placeholder: preparePlaceholderSelect(translateContent('claimEmpowerment.label.empowerDetails.reasonforDelay')) })}
                            </Form.Item>                                            
                    </Col>                 
                </Row>
           
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
