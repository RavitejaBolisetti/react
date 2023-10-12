/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Card, Row, Col, Divider, Typography } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
const { Text } = Typography;

const ViewDetail = (props) => {
    const { formData, userType, selectedAMC, handleCancelRequest, handleMNMApproval, handleMNMRejection } = props;

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
                                </Col>
                            </Row>
                            <Row type="flex" align="middle">
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <div className={styles.tableTextColor85}>Requested On: {convertDateMonthYear(data?.amcRegistrationDate)}</div>
                                </Col>
                            </Row>

                            <Divider className={styles.marT20} />
                            {userType === AMC_CONSTANTS?.MNM?.key ? (
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
                            ) : (
                                <Row gutter={20} className={styles.marB20}>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <Button type="primary" onClick={handleCancelRequest}>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </Card>
                    );
                })}
        </>
    );
};

export default ViewDetail;
