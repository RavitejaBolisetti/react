/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Card, Row, Col, Divider, Typography, Descriptions } from 'antd';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { QUERY_BUTTONS_CONSTANTS, QUERY_BUTTONS_MNM_USER } from '../utils/ShieldRegistrationContant';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { SchemeStatusTag } from '../utils/schemeStatusTag';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';

const ViewDetail = (props) => {
    const { screenType, formData, userType, selectedOrder, handleCancelRequest, handleMNMApproval, handleMNMRejection, workflowDetails, typeData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const RejectionView = (
        <>
            <Divider className={styles?.marB20} />
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.approvedRejectedBy')}>{checkAndSetDefaultValue(formData?.approvedByOrRejectedBy)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.userId')}>{checkAndSetDefaultValue(formData?.userId)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.approvedDate')}>{checkAndSetDefaultValue(formData?.approvedDate, false, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                {selectedOrder?.status === QUERY_BUTTONS_CONSTANTS?.REJECTED?.key && <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.reasonForRejection')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], formData?.reasonForRejection))}</Descriptions.Item>}
            </Descriptions>
        </>
    );
    return (
        <>
            {/* {formData &&
                formData?.map((data) => {
                    return ( */}
            <Card>
                <Row type="flex" justify="space-between" align="middle" size="large">
                    <Row type="flex" justify="space-around" align="middle">
                        <Typography>
                            {translateContent('shieldSchemeRegistration.label.registrationRequest')} | {checkAndSetDefaultValue(formData?.customerName)} | {selectedOrder?.shieldRegistrationNumber}
                        </Typography>
                    </Row>
                    {SchemeStatusTag(selectedOrder?.status)}
                </Row>
                <Row type="flex" align="middle" className={selectedOrder?.status === QUERY_BUTTONS_MNM_USER?.PENDING_FOR_CANCELLATION?.key ? '' : styles.marB20}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <div className={styles.tableTextColor85}>
                            {translateContent('amcRegistration.label.requestedOn')}: {convertDateMonthYear(screenType === 'RSA' ? formData?.rsaRegistrationDate : formData?.shieldRegistrationDate)}
                        </div>
                    </Col>
                </Row>

                {userType === AMC_CONSTANTS?.MNM?.key ? (
                    <>
                        {selectedOrder?.status === QUERY_BUTTONS_MNM_USER?.PENDING_FOR_CANCELLATION?.key && (
                            <>
                                {/* <Divider className={styles.marT20} /> */}
                                {/* <div className={styles.marB20}> */}
                                <Divider className={styles.marB20} />

                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.reasonForCancellationRequest')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], screenType === 'RSA' ? formData?.rsaCancelRemarks : formData?.shieldCancelRemarks))}</Descriptions.Item>
                                </Descriptions>
                                <Descriptions {...viewProps}>{(screenType === 'RSA' ? formData?.rsaCancelRemarks : formData?.shieldCancelRemarks) === AMC_CONSTANTS?.OTHERS?.key && <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.otherReason')}>{checkAndSetDefaultValue(formData?.otherReason)}</Descriptions.Item>}</Descriptions>
                                {/* </div> */}
                            </>
                        )}

                        <Row gutter={20} className={styles.marB20}>
                            <Col xs={8} sm={8} md={8} lg={8}>
                                {workflowDetails?.allowedActions?.map((element, i) => {
                                    return (
                                        <Button className={i && styles.marL5} onClick={element?.actionCode === AMC_CONSTANTS?.WORKFLOW_APPROVE?.key ? () => handleMNMApproval() : () => handleMNMRejection()} type="primary" key={i}>
                                            {element?.actionName}
                                        </Button>
                                    );
                                })}
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>
                        {(selectedOrder?.status === AMC_CONSTANTS?.APPROVED?.key || selectedOrder?.status === AMC_CONSTANTS?.REJECTED?.key) && (
                            <>
                                {selectedOrder?.status === AMC_CONSTANTS?.CANCELLATION_REQUEST?.key && (
                                    <>
                                        <Divider className={styles.marB20} />

                                        <Descriptions>
                                            <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.reasonForCancellationRequest')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], screenType === 'RSA' ? formData?.rsaCancelRemarks : formData?.shieldCancelRemarks))}</Descriptions.Item>
                                            {(screenType === 'RSA' ? formData?.rsaCancelRemarks : formData?.shieldCancelRemarks) === AMC_CONSTANTS?.OTHERS?.key && <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.otherReason')}>{checkAndSetDefaultValue(formData?.otherReason)}</Descriptions.Item>}
                                        </Descriptions>
                                    </>
                                )}
                                {selectedOrder?.approvedByOrRejectedBy && RejectionView}
                            </>
                        )}
                        {selectedOrder?.status === QUERY_BUTTONS_MNM_USER?.PENDING_FOR_CANCELLATION?.key && (
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
            {/* ); })} */}
        </>
    );
};

export default ViewDetail;
