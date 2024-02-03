/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Card, Row, Col, Divider, Typography, Descriptions } from 'antd';
import { AMC_CONSTANTS, REQUEST_CONSTANT } from '../utils/AMCConstants';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';
import { DATA_TYPE } from 'constants/dataType';
import { AMCStatusTags } from '../utils/AMCStatusTags';
import styles from 'assets/sass/app.module.scss';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import RequestedOnDate from '../utils/RequestedOnDate';

const ViewDetail = (props) => {
    const { workflowMasterDetails, amcRegistration, formData, userType, selectedAMC, handleCancelRequest, handleMNMApproval, handleMNMRejection, typeData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <>
            {formData &&
                formData?.map((data, i) => {
                    return (
                        <Card>
                            <Row type="flex" justify="space-between" align="middle" size="large">
                                <Row type="flex" justify="space-around" align="middle">
                                    <Typography>
                                        {REQUEST_CONSTANT?.[data?.requestType]} | {checkAndSetDefaultValue(data?.customerName, false)} | {selectedAMC?.amcRegistrationNumber}
                                    </Typography>
                                </Row>
                                {AMCStatusTags(data?.requestStatus)}
                            </Row>
                            <Row type="flex" align="middle" className={data?.requestStatus === AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.key ? '' : styles.marB20}>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <div className={styles.tableTextColor85}>
                                        {translateContent('amcRegistration.label.requestedOn')}: {checkAndSetDefaultValue(RequestedOnDate(data, data?.requestStatus, amcRegistration?.priceType), false, DATA_TYPE?.DATE_TIME?.key)}
                                    </div>
                                </Col>
                            </Row>

                            {userType === AMC_CONSTANTS?.MNM?.key ? (
                                <>
                                    {data?.requestType === AMC_CONSTANTS?.CANCELLED && data?.requestStatus === AMC_CONSTANTS?.PENDING_FOR_APPROVAL?.key && (
                                        <>
                                            <Divider className={styles.marB20} />
                                            <Descriptions {...viewProps} column={{ xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 }}>
                                                <Descriptions.Item label={translateContent('amcRegistration.label.reasonForCancellationRquest')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], data?.amcCancelRemarks))}</Descriptions.Item>
                                                {data?.amcCancelRemarks === AMC_CONSTANTS?.OTHERS?.key && <Descriptions.Item label={translateContent('amcRegistration.label.otherReason')}>{checkAndSetDefaultValue(data?.otherReason)}</Descriptions.Item>}
                                            </Descriptions>
                                        </>
                                    )}

                                    <Row gutter={20} className={styles.marB20}>
                                        <Col xs={8} sm={8} md={8} lg={8}>
                                            {i === 0 &&
                                                workflowMasterDetails?.allowedActions?.map((element, i) => {
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
                                    {(data?.requestStatus === AMC_CONSTANTS?.APPROVED?.key || data?.requestStatus === AMC_CONSTANTS?.REJECTED?.key) && (
                                        <>
                                            {data?.requestType === AMC_CONSTANTS?.CANCELLATION_REQUEST?.key && (
                                                <>
                                                    <Divider className={styles.marB20} />
                                                    <Descriptions {...viewProps}>
                                                        <Descriptions.Item label={translateContent('amcRegistration.label.reasonForCancellationRquest')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], data?.amcCancelRemarks))}</Descriptions.Item>
                                                        {data?.amcCancelRemarks === AMC_CONSTANTS?.OTHERS?.key && <Descriptions.Item label={translateContent('amcRegistration.label.otherReason')}>{checkAndSetDefaultValue(data?.otherReason)}</Descriptions.Item>}
                                                    </Descriptions>
                                                </>
                                            )}
                                            {data?.approvedByOrRejectedBy && (
                                                <>
                                                    <Divider className={styles.marB20} />

                                                    <Descriptions {...viewProps}>
                                                        <Descriptions.Item label={translateContent('amcRegistration.label.approvedOrRejectedBy')}>{checkAndSetDefaultValue(data?.approvedByOrRejectedBy)}</Descriptions.Item>
                                                        <Descriptions.Item label={translateContent('amcRegistration.label.userId')}>{checkAndSetDefaultValue(data?.userId)}</Descriptions.Item>
                                                        <Descriptions.Item label={translateContent('amcRegistration.label.approvedDate')}>{checkAndSetDefaultValue(data?.approvedDate, false, DATA_TYPE?.DATE_TIME?.key)}</Descriptions.Item>
                                                        {data?.requestStatus === AMC_CONSTANTS?.REJECTED?.key && <Descriptions.Item label={translateContent('amcRegistration.label.reasonForRejection')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], data?.reasonForRejection))}</Descriptions.Item>}
                                                    </Descriptions>
                                                </>
                                            )}
                                        </>
                                    )}

                                    {data?.requestType === AMC_CONSTANTS?.CANCELLED && data?.requestStatus === AMC_CONSTANTS?.PENDING_FOR_APPROVAL?.key && (
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
