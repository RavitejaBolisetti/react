/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Button, Card, Row, Col, Divider, Typography, Tag, Descriptions } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
const { Text } = Typography;

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
                            <Row type="flex" align="middle">
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <Text strong>Registration Request</Text>
                                    <Divider type="vertical" />
                                    <Text strong>{data?.customerName}</Text>
                                    <Divider type="vertical" />
                                    <Text strong>{selectedAMC?.amcRegistrationNumber}</Text>
                                    <Tag style={{ float: 'right' }}>{selectedAMC?.status}</Tag>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle">
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <div className={styles.tableTextColor85}>Requested On: {convertDateMonthYear(data?.amcRegistrationDate)}</div>
                                </Col>
                            </Row>

                            {selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_APPROVAL?.title && <Divider className={styles.marT20} />}
                            {userType === AMC_CONSTANTS?.MNM?.key ? (
                                selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_APPROVAL?.title || AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.title ? (
                                    <>
                                        {selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.title && (
                                            <>
                                                <Descriptions>
                                                    <Descriptions.Item label="Reason for Cancellation Request">{checkAndSetDefaultValue(formData?.amcRequestDetails?.amcCancelRemarks)}</Descriptions.Item>
                                                    <Descriptions.Item label="Remark for Cancellation">{checkAndSetDefaultValue(formData?.amcRequestDetails?.otherReason)}</Descriptions.Item>
                                                </Descriptions>
                                            </>
                                        )}

                                        <Row gutter={20} className={styles.marB20}>
                                            <Col xs={4} sm={4} md={4} lg={4}>
                                                <Button type="primary" onClick={handleMNMApproval}>
                                                    Approve
                                                </Button>
                                            </Col>
                                            <Col xs={4} sm={4} md={4} lg={4}>
                                                <Button type="danger" onClick={handleMNMRejection}>
                                                    Reject
                                                </Button>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <>
                                        {isPendingForCancellation && (
                                            <>
                                                <Descriptions>
                                                    <Descriptions.Item label="Reason for Cancellation Request">{checkAndSetDefaultValue(formData?.amcRequestDetails?.amcCancelRemarks)}</Descriptions.Item>
                                                    <Descriptions.Item label="Remark for Cancellation">{checkAndSetDefaultValue(formData?.amcRequestDetails?.otherReason)}</Descriptions.Item>
                                                </Descriptions>
                                            </>
                                        )}
                                        <Divider />
                                        <Descriptions {...viewProps}>
                                            <Descriptions.Item label="Approved/Rejected By">{checkAndSetDefaultValue(formData?.amcRequestDetails?.approvedByOrRejectedBy)}</Descriptions.Item>
                                            <Descriptions.Item label="User ID">{checkAndSetDefaultValue(formData?.amcRequestDetails?.userId)}</Descriptions.Item>

                                            <Descriptions.Item label="Approved Date">{checkAndSetDefaultValue(formData?.amcRequestDetails?.approvedDate, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                            {selectedAMC?.status !== AMC_CONSTANTS?.REJD?.value && <Descriptions.Item label="Reason for Rejection">{checkAndSetDefaultValue(formData?.amcRequestDetails?.reasonForRejection)}</Descriptions.Item>}
                                        </Descriptions>
                                    </>
                                )
                            ) : (
                                selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_APPROVAL?.title && (
                                    <Row gutter={20} className={styles.marB20}>
                                        <Col xs={4} sm={4} md={4} lg={4}>
                                            <Button type="primary" onClick={handleCancelRequest}>
                                                Cancel
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
