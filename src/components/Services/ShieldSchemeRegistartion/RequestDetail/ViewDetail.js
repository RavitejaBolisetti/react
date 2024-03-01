/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Card, Row, Col, Divider, Typography, Descriptions } from 'antd';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { QUERY_BUTTONS_CONSTANTS, QUERY_BUTTONS_MNM_USER } from '../utils/ShieldRegistrationContant';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import { RSARegistrationStatusTag } from 'components/Sales/RSARegistration/utils/RSARegistrationStatusTag';
import { REQUEST_CONSTANT } from 'components/Sales/AMCRegistration/utils/AMCConstants';
import RequestedOnDate from './RequestedOnDate';
import RequestedOnDateRSA from './RequestdateRSA';
import { SchemeStatusTag } from '../utils/schemeStatusTag';

const ViewDetail = (props) => {
    const { registrationPriceType, screenType, formData, userType, selectedOrder, handleCancelRequest, handleMNMApproval, handleMNMRejection, workflowDetails, typeData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    return (
        <>
            {formData?.length > 0 &&
                formData?.map((data, i) => {
                    const requestType = data?.requestType;
                    return (
                        <Card>
                            <Row type="flex" justify="space-between" align="middle" size="large">
                                <Row type="flex" justify="space-around" align="middle">
                                    <Typography>
                                        {REQUEST_CONSTANT?.[requestType]} | {checkAndSetDefaultValue(data?.customerName)} | {selectedOrder?.shieldRegistrationNumber}
                                    </Typography>
                                </Row>
                                {screenType === 'RSA' ? RSARegistrationStatusTag(data?.requestStatus) : SchemeStatusTag(data?.requestStatus)}
                            </Row>
                            <Row type="flex" align="middle" className={data?.requestStatus === QUERY_BUTTONS_MNM_USER?.PENDING_FOR_CANCELLATION?.key ? '' : styles.marB20}>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <div className={styles.tableTextColor85}>
                                        {translateContent('amcRegistration.label.requestedOn')}: {screenType !== 'RSA' ? checkAndSetDefaultValue(RequestedOnDate(data, data?.requestStatus, registrationPriceType), false, DATA_TYPE?.DATE_TIME?.key) : checkAndSetDefaultValue(RequestedOnDateRSA(data, data?.requestStatus, registrationPriceType), false, DATA_TYPE?.DATE_TIME?.key)}
                                    </div>
                                </Col>
                            </Row>

                            {userType === AMC_CONSTANTS?.MNM?.key ? (
                                <>
                                    {data?.requestType === AMC_CONSTANTS?.CANCELLED?.key && data?.requestStatus === QUERY_BUTTONS_MNM_USER?.PENDING_FOR_APPROVAL?.key && (
                                        <>
                                            {/* <Divider className={styles.marT20} /> */}
                                            {/* <div className={styles.marB20}> */}
                                            <Divider className={styles.marB20} />

                                            <Descriptions {...viewProps}>
                                                <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.reasonForCancellationRequest')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], screenType === 'RSA' ? data?.rsaCancelRemarks : data?.shieldCancelRemarks))}</Descriptions.Item>
                                            </Descriptions>
                                            <Descriptions {...viewProps}>{(screenType === 'RSA' ? data?.rsaCancelRemarks : data?.shieldCancelRemarks) === AMC_CONSTANTS?.OTHERS?.key && <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.otherReason')}>{checkAndSetDefaultValue(data?.otherReason)}</Descriptions.Item>}</Descriptions>
                                            {/* </div> */}
                                        </>
                                    )}

                                    {i === 0 && (
                                        <Row gutter={20} className={styles.marB20}>
                                            <Col xs={8} sm={8} md={8} lg={8}>
                                                {workflowDetails?.allowedActions?.map((element, i) => {
                                                    return (
                                                        <Button className={i && styles.marL5} onClick={element?.actionCode === AMC_CONSTANTS?.WORKFLOW_APPROVE?.key ? () => handleMNMApproval() : () => handleMNMRejection()} type="primary" key={i + 'SC'}>
                                                            {element?.actionName}
                                                        </Button>
                                                    );
                                                })}
                                            </Col>
                                        </Row>
                                    )}
                                </>
                            ) : (
                                <>
                                    {(data?.requestStatus === (screenType === 'RSA' ? AMC_CONSTANTS?.APPROVED?.key : AMC_CONSTANTS?.RSA_APPROVED?.key) || data?.requestStatus === AMC_CONSTANTS?.REJECTED?.key) && (
                                        <>
                                            {data?.requestStatus === AMC_CONSTANTS?.CANCELLATION_REQUEST?.key && (
                                                <>
                                                    <Divider className={styles.marB20} />

                                                    <Descriptions>
                                                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.reasonForCancellationRequest')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], screenType === 'RSA' ? data?.rsaCancelRemarks : data?.shieldCancelRemarks))}</Descriptions.Item>
                                                        {(screenType === 'RSA' ? data?.rsaCancelRemarks : data?.shieldCancelRemarks) === AMC_CONSTANTS?.OTHERS?.key && <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.otherReason')}>{checkAndSetDefaultValue(data?.otherReason)}</Descriptions.Item>}
                                                    </Descriptions>
                                                </>
                                            )}
                                            {data?.approvedByOrRejectedBy && (
                                                <>
                                                    <Divider className={styles?.marB20} />
                                                    <Descriptions {...viewProps}>
                                                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.approvedRejectedBy')}>{checkAndSetDefaultValue(data?.approvedByOrRejectedBy)}</Descriptions.Item>
                                                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.userId')}>{checkAndSetDefaultValue(data?.userId)}</Descriptions.Item>
                                                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.approvedDate')}>{checkAndSetDefaultValue(data?.approvedDate, false, DATA_TYPE?.DATE_TIME?.key)}</Descriptions.Item>
                                                        {data?.requestStatus === QUERY_BUTTONS_CONSTANTS?.REJECTED?.key && <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.reasonForRejection')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], data?.reasonForRejection))}</Descriptions.Item>}
                                                    </Descriptions>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {data?.requestType === AMC_CONSTANTS?.CANCELLED?.key && data?.requestStatus === QUERY_BUTTONS_MNM_USER?.PENDING_FOR_APPROVAL?.key && (
                                        <>
                                            <Divider />
                                            <Row gutter={20} className={styles.marB20}>
                                                <Col xs={4} sm={4} md={4} lg={4}>
                                                    <Button type="primary" onClick={handleCancelRequest}>
                                                        {translateContent('global.buttons.cancel')}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </>
                                    )}
                                </>
                            )}
                        </Card>
                    );
                })}
        </>
    );
};

export default ViewDetail;
