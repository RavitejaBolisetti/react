/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Card, Row, Col, Divider, Typography, Descriptions } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';
import { DATA_TYPE } from 'constants/dataType';
import { AMCStatusTags } from '../utils/AMCStatusTags';

const ViewDetail = (props) => {
    const { formData, userType, selectedAMC, handleCancelRequest, handleMNMApproval, handleMNMRejection, isPendingForCancellation } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <>
            {formData &&
                formData?.map((data) => {
                    return (
                        <Card>
                            <Row type="flex" justify="space-between" align="middle" size="large">
                                <Row type="flex" justify="space-around" align="middle">
                                    <Typography>
                                        {translateContent('amcRegistration.label.registrationRequest')} | {checkAndSetDefaultValue(data?.customerName, false)} | {selectedAMC?.amcRegistrationNumber}
                                    </Typography>
                                </Row>
                                {AMCStatusTags(selectedAMC?.status)}
                            </Row>
                            <Row type="flex" align="middle" className={selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.key ? '' : styles.marB20}>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <div className={styles.tableTextColor85}>
                                        {translateContent('amcRegistration.label.requestedOn')}: {checkAndSetDefaultValue(data?.amcRegistrationDate, false, DATA_TYPE?.DATE?.key)}
                                    </div>
                                </Col>
                            </Row>

                            {selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.key && <Divider />}
                            {userType === AMC_CONSTANTS?.MNM?.key ? (
                                selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_APPROVAL?.key || AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.key ? (
                                    <>
                                        {selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.key && (
                                            <>
                                                <Divider className={styles.marB20} />
                                                <Descriptions {...viewProps} column={{ xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 }}>
                                                    <Descriptions.Item label={translateContent('amcRegistration.label.reasonForCancellationRquest')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.amcCancelRemarks)}</Descriptions.Item>
                                                    <Descriptions.Item label={translateContent('amcRegistration.label.otherReason')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.otherReason)}</Descriptions.Item>
                                                </Descriptions>
                                            </>
                                        )}

                                        <Row gutter={20} className={styles.marB20}>
                                            <Col xs={8} sm={8} md={8} lg={8}>
                                                <Button type="primary" onClick={handleMNMApproval}>
                                                    {translateContent('global.buttons.approve')}
                                                </Button>

                                                <span className={styles.marL5}>
                                                    <Button danger onClick={handleMNMRejection}>
                                                        {translateContent('global.buttons.reject')}
                                                    </Button>
                                                </span>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <>
                                        {isPendingForCancellation && (
                                            <>
                                                <Descriptions {...viewProps}>
                                                    <Descriptions.Item label={translateContent('amcRegistration.label.reasonForCancellationRquest')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.amcCancelRemarks)}</Descriptions.Item>
                                                    <Descriptions.Item label={translateContent('amcRegistration.label.otherReason')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.otherReason)}</Descriptions.Item>
                                                </Descriptions>
                                            </>
                                        )}
                                        <Divider />
                                        <Descriptions {...viewProps}>
                                            <Descriptions.Item label={translateContent('amcRegistration.label.approvedOrRejectedBy')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.approvedByOrRejectedBy)}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('amcRegistration.label.userId')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.userId)}</Descriptions.Item>

                                            <Descriptions.Item label={translateContent('amcRegistration.label.approvedDate')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.approvedDate, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                            {selectedAMC?.status !== AMC_CONSTANTS?.REJECTED?.key && <Descriptions.Item label={translateContent('amcRegistration.label.reasonForRejection')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.reasonForRejection)}</Descriptions.Item>}
                                        </Descriptions>
                                    </>
                                )
                            ) : (
                                selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.key && (
                                    <Row gutter={20} className={styles.marB20}>
                                        <Col xs={4} sm={4} md={4} lg={4}>
                                            <Button type="primary" onClick={handleCancelRequest}>
                                                {translateContent('global.buttons.cancel')}
                                            </Button>
                                        </Col>
                                    </Row>
                                )
                            )}
                        </Card>
                    );
                })}
        </>
    );
};

export default ViewDetail;
