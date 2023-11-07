/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { PARAM_MASTER } from 'constants/paramMaster';
import { validateRequiredInputField, validateRequiredSelectField, noWhiteSpaceinBeginning } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;

export const PartyDetailsForm = (props) => {
    const { handlePartyIdChange, handlePartySegmentChange, formType, formData, typeData, formActionType, handleSearchParamSearch } = props;

    const disabledProps = { disabled: formActionType?.editMode };

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'partySegment']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.partySegment')} initialValue={formData?.partySegment} rules={[validateRequiredInputField(translateContent('creditDebitNote.voucherAndPartyDetails.validation.partySegment'))]}>
                        {customSelectBox({ disabled: formActionType?.editMode, data: typeData[PARAM_MASTER?.PARTY_CATEG?.id], placeholder: preparePlaceholderSelect(translateContent('creditDebitNote.voucherAndPartyDetails.placeholder.partySegment')), onChange: handlePartySegmentChange })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'partyId']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.partyId')} initialValue={formData?.partyId} rules={[validateRequiredSelectField(translateContent('creditDebitNote.voucherAndPartyDetails.validation.partyId')), noWhiteSpaceinBeginning(translateContent('creditDebitNote.voucherAndPartyDetails.validation.partyId'))]} validateTrigger={['onSearch', 'onChange']}>
                        {formActionType?.editMode ? <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherAndPartyDetails.placeholder.partyId'))} /> : <Search {...disabledProps} placeholder="Search" maxLength={25} allowClear onSearch={handleSearchParamSearch} onChange={handlePartyIdChange} className={styles.headerSearchField} />}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'partyName']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.partyName')} initialValue={formData?.partyName}>
                        <Input placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherAndPartyDetails.placeholder.partyName'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'address']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.address')} initialValue={formData?.address}>
                        <Input placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherAndPartyDetails.placeholder.address'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'city']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.city')} initialValue={formData?.city}>
                        <Input placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherAndPartyDetails.placeholder.city'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'state']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.state')} initialValue={formData?.state}>
                        <Input placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherAndPartyDetails.placeholder.state'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'mobileNumber']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.phoneNo')} initialValue={formData?.mobileNumber}>
                        <Input placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherAndPartyDetails.placeholder.phoneNo'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
