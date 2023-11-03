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
import { QUERY_BUTTONS_CONSTANTS, QUERY_BUTTONS_MNM_USER } from '../utils/ShieldRegistrationContant';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { SchemeStatusTag } from '../utils/schemeStatusTag';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
const { Text } = Typography;

const ViewDetail = (props) => {
    const { formData, typeData, userType, selectedOrder, handleCancelRequest, handleMNMApproval, handleMNMRejection, isPendingForCancellation } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const RejectionView = (
        <>
            <Divider className={styles?.marT20} />
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Approved/Rejected By">{checkAndSetDefaultValue(formData?.approvedByOrRejectedBy)}</Descriptions.Item>
                <Descriptions.Item label="User ID">{checkAndSetDefaultValue(formData?.userId)}</Descriptions.Item>
                <Descriptions.Item label="Approved Date">{checkAndSetDefaultValue(formData?.approvedDate, false, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                {selectedOrder?.status === QUERY_BUTTONS_CONSTANTS?.REJECTED?.key && <Descriptions.Item label="Reason for Rejection">{checkAndSetDefaultValue(formData?.shieldCancelRemarks)}</Descriptions.Item>}
            </Descriptions>
        </>
    );
    return (
        <>
            {/* {formData &&
                formData?.map((data) => {
                    return ( */}
            <Card>
                <Row type="flex" align="middle">
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Text strong>Registration Request</Text>
                        <Divider type="vertical" />
                        <Text strong>{checkAndSetDefaultValue(formData?.customerName)}</Text>
                        <Divider type="vertical" />
                        <Text strong>{selectedOrder?.shieldRegistrationNumber}</Text>
                        <div style={{ float: 'right' }}>{SchemeStatusTag(selectedOrder?.status)}</div>
                        {/* <Tag style={{ float: 'right' }}>{getCodeValue(typeData?.AMC_REG_APRVL_STAT, selectedOrder?.status)}</Tag> */}
                    </Col>
                </Row>
                <Row type="flex" align="middle" className={styles?.marB20}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <div className={styles.tableTextColor85}>Requested On: {convertDateMonthYear(formData?.shieldRegistrationDate)}</div>
                    </Col>
                </Row>
                {selectedOrder?.status === QUERY_BUTTONS_MNM_USER?.PENDING_FOR_APPROVAL?.key && <Divider className={styles.marT20} />}
                {userType === AMC_CONSTANTS?.MNM?.key ? (
                    selectedOrder?.status === QUERY_BUTTONS_MNM_USER?.PENDING_FOR_APPROVAL?.key || AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.title ? (
                        <>
                            {selectedOrder?.status === QUERY_BUTTONS_MNM_USER?.PENDING_FOR_CANCELLATION?.key && (
                                <>
                                    <Divider className={styles.marT20} />
                                    {/* <div className={styles.marB20}> */}
                                    <Descriptions {...viewProps}>
                                        <Descriptions.Item label="Reason for Cancellation Request">{checkAndSetDefaultValue(formData?.shieldCancelRemarks)}</Descriptions.Item>
                                    </Descriptions>
                                    <Descriptions {...viewProps}>
                                        <Descriptions.Item label="Remark for Cancellation">{checkAndSetDefaultValue(formData?.otherReason)}</Descriptions.Item>
                                    </Descriptions>
                                    {/* </div> */}
                                </>
                            )}

                            <Row gutter={20} className={styles.marB20}>
                                <span>
                                    <Button type="primary" onClick={handleMNMApproval}>
                                        Approve
                                    </Button>
                                </span>
                                <span className={styles.marL5}>
                                    <Button danger onClick={handleMNMRejection}>
                                        Reject
                                    </Button>
                                </span>
                            </Row>
                        </>
                    ) : (
                        <>
                            {isPendingForCancellation && (
                                <>
                                    <Descriptions>
                                        <Descriptions.Item label="Reason for Cancellation Request">{checkAndSetDefaultValue(formData?.shieldCancelRemarks)}</Descriptions.Item>
                                        <Descriptions.Item label="Remark for Cancellation">{checkAndSetDefaultValue(formData?.otherReason)}</Descriptions.Item>
                                    </Descriptions>
                                </>
                            )}
                            <Divider />
                            {RejectionView}
                        </>
                    )
                ) : (
                    <>
                        {(selectedOrder?.status === QUERY_BUTTONS_CONSTANTS?.APPROVED?.key || selectedOrder?.status === QUERY_BUTTONS_CONSTANTS?.REJECTED?.key) && RejectionView}
                        {selectedOrder?.status === QUERY_BUTTONS_MNM_USER?.PENDING_FOR_APPROVAL?.key && (
                            <Row gutter={20} className={styles.marB20}>
                                <Col xs={4} sm={4} md={4} lg={4}>
                                    <Button type="primary" onClick={handleCancelRequest}>
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </>
                )}
            </Card>
            {/* ); })} */}
        </>
    );
};

export default ViewDetail;
