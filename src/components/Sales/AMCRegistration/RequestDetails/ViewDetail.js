/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Card, Row, Col, Divider, Typography, Tag, Descriptions } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';
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
                                    <Text strong>{translateContent('amcRegistration.label.registrationRequest')}</Text>
                                    <Divider type="vertical" />
                                    <Text strong>{data?.customerName}</Text>
                                    <Divider type="vertical" />
                                    <Text strong>{selectedAMC?.amcRegistrationNumber}</Text>
                                    <Tag style={{ float: 'right' }}>{selectedAMC?.status}</Tag>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle">
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <div className={styles.tableTextColor85}>{translateContent('amcRegistration.label.requestedOn')}: {convertDateMonthYear(data?.amcRegistrationDate)}</div>
                                </Col>
                            </Row>

                            {selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_APPROVAL?.title && <Divider className={styles.marT20} />}
                            {userType === AMC_CONSTANTS?.MNM?.key ? (
                                selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_APPROVAL?.title || AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.title ? (
                                    <>
                                        {selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.title && (
                                            <>
                                                <Divider className={styles.marB20} />
                                                <Descriptions {...viewProps} column={{ xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 }}>
                                                    <Descriptions.Item label={translateContent('amcRegistration.label.reasonForCancellationRquest')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.amcCancelRemarks)}</Descriptions.Item>
                                                    <Descriptions.Item label={translateContent('amcRegistration.label.remarkForCancellation')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.otherReason)}</Descriptions.Item>
                                                </Descriptions>
                                            </>
                                        )}

                                        <Row gutter={20} className={styles.marB20}>
                                            <Col xs={8} sm={8} md={8} lg={8}>
                                                <Button type="primary" onClick={handleMNMApproval}>
                                                    Approve
                                                </Button>

                                                <span className={styles.marL5}>
                                                    <Button danger onClick={handleMNMRejection}>
                                                        Reject
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
                                                    <Descriptions.Item label={translateContent('amcRegistration.label.remarkForCancellation')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.otherReason)}</Descriptions.Item>
                                                </Descriptions>
                                            </>
                                        )}
                                        <Divider />
                                        <Descriptions {...viewProps}>
                                            <Descriptions.Item label={translateContent('amcRegistration.label.approvedOrRejectedBy')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.approvedByOrRejectedBy)}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('amcRegistration.label.userId')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.userId)}</Descriptions.Item>

                                            <Descriptions.Item label={translateContent('amcRegistration.label.approvedDate')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.approvedDate, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                            {selectedAMC?.status !== AMC_CONSTANTS?.REJD?.value && <Descriptions.Item label={translateContent('amcRegistration.label.reasonForRejection')}>{checkAndSetDefaultValue(formData?.amcRequestDetails?.reasonForRejection)}</Descriptions.Item>}
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
