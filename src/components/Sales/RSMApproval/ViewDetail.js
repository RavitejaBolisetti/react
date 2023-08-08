/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Divider } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { RSMApprovalButtons } from './RSMApprovalButtons';
import { convertDate } from 'utils/formatDateTime';

const ViewDetailBase = ({ setRejectRequest, formData, styles, handleButtonClick, onCloseAction, buttonData, setButtonData, handleRequest, queryButtons }) => {
    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        setRejectRequest,
        handleRequest,
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.rsmApproval}>
                    <p className={styles.allowedTimingAlignment}>RSM Approval Summary</p>
                    <br />
                    <Card>
                        <>
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.tableTextColor54}>
                                    From Dealer Code:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.addGroup}>
                                    {formData?.fromDealerCode}
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={`${styles.addGroup} ${styles.tableTextColor85}`}>
                                    {formData?.fromDealerName}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.tableTextColor54}>
                                    To Dealer Code:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.addGroup}>
                                    {formData?.toDealerCode}
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={`${styles.addGroup} ${styles.tableTextColor85}`}>
                                    {formData?.toDealerName}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.tableTextColor54}>
                                    Chassis Number:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.addGroup}>
                                    {formData?.chassisNumber}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.tableTextColor54}>
                                    Vehicle Age:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.addGroup}>
                                    {formData?.vehicleAge}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.tableTextColor54}>
                                    Requested Date:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.addGroup}>
                                    {convertDate(formData?.requestedDate, 'DD MMM YYYY')}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.tableTextColor54}>
                                    Status:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={queryButtons?.pending ? `${styles.addGroup} ${styles.warningColor}` : queryButtons?.approved ? `${styles.addGroup} ${styles.approvedColor}` : `${styles.addGroup} ${styles.rejectedColor}`}>
                                    {formData?.status}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.tableTextColor54}>
                                    Model Description:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.addGroup}>
                                    {formData?.modelDescription}
                                </Col>
                            </Row>
                        </>
                    </Card>
                </Col>
            </Row>

            <RSMApprovalButtons {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(ViewDetailBase, {});
