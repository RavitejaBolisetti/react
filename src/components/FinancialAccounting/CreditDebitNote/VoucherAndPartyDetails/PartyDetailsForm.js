/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { PARAM_MASTER } from 'constants/paramMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

export const PartyDetailsForm = (props) => {
    const { handlePartyIdChange, handlePartySegmentChange, formType, formData, typeData, formActionType, handleSearchParamSearch } = props;

    const disabledProps = { disabled: formActionType?.editMode };

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'partySegment']} label="Party Segment" initialValue={formData?.partySegment} rules={[validateRequiredInputField('Party Segment')]}>
                        {customSelectBox({ disabled: formActionType?.editMode, data: typeData[PARAM_MASTER?.PARTY_CATEG?.id], placeholder: preparePlaceholderSelect('Party Segment'), onChange: handlePartySegmentChange })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'partyId']} label="Party ID" initialValue={formData?.partyId} rules={[validateRequiredSelectField('parameter')]} validateTrigger={['onSearch']}>
                        {formActionType?.editMode ? <Input {...disabledProps} placeholder={preparePlaceholderText('Party ID')} /> : <Search {...disabledProps} placeholder="Search" maxLength={25} allowClear onSearch={handleSearchParamSearch} onChange={handlePartyIdChange} className={styles.headerSearchField} />}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'partyName']} label="Party Name" initialValue={formData?.partyName}>
                        <Input placeholder={preparePlaceholderText('Party Name')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'address']} label="Address" initialValue={formData?.address}>
                        <Input placeholder={preparePlaceholderText('Address')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'city']} label="City" initialValue={formData?.city}>
                        <Input placeholder={preparePlaceholderText('City')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'state']} label="State" initialValue={formData?.state}>
                        <Input placeholder={preparePlaceholderText('State')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'mobileNumber']} label="Phone No." initialValue={formData?.mobileNumber}>
                        <Input placeholder={preparePlaceholderText('Phone No.')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
