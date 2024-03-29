/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Collapse, Descriptions, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';
import { expandIcon } from 'utils/accordianExpandIcon';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, activeKey, handleCollapse } = props;
    const { voucherDetailsDto, partyDetailsDto } = formData;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    console.log('isLoading', isLoading);
    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse activeKey={activeKey} onChange={() => handleCollapse(1)} collapsible="icon" expandIcon={expandIcon} expandIconPosition="end" className={styles.collapseContainer}>
                        <Panel header={translateContent('creditDebitNote.label.voucherDetails')} key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.totalSettledAmount')}>{checkAndSetDefaultValue(voucherDetailsDto?.totalSettledAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.totalWrite-OffAmount')}>{checkAndSetDefaultValue(voucherDetailsDto?.totalWriteOffAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.totalApportionedAmount')}>{checkAndSetDefaultValue(voucherDetailsDto?.totalApportionedAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.totalAmount')}>{checkAndSetDefaultValue(voucherDetailsDto?.totalAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.totalBalancedAmount')}>{checkAndSetDefaultValue(voucherDetailsDto?.totalBalancedAmount, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => handleCollapse(2)} expandIconPosition="end" className={styles.collapseContainer}>
                        <Panel header={translateContent('creditDebitNote.label.partyDetails')} key="2">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.partySegment')}>{checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER?.PARTY_CATEG?.id], partyDetailsDto?.partySegment), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.partyId')}>{checkAndSetDefaultValue(partyDetailsDto?.partyId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.partyName')}>{checkAndSetDefaultValue(partyDetailsDto?.partyName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.address')}>{checkAndSetDefaultValue(partyDetailsDto?.address, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.city')}>{checkAndSetDefaultValue(partyDetailsDto?.city, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.state')}>{checkAndSetDefaultValue(partyDetailsDto?.state, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.phoneNo')}>{checkAndSetDefaultValue(partyDetailsDto?.mobileNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('creditDebitNote.voucherAndPartyDetails.label.remarks')}>{checkAndSetDefaultValue(partyDetailsDto?.remarks, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
