/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Divider } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { RSMApprovalButtons } from './RSMApprovalButtons';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';

import { RSM_APPROVAL_STATUS } from './utils/RSMApprovalStatus';
import { translateContent } from 'utils/translateContent';

const ViewDetailBase = ({ setRejectRequest, isLoading = false, formData, styles, handleButtonClick, onCloseAction, buttonData, setButtonData, handleRequest, queryButtons }) => {
    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        setRejectRequest,
        handleRequest,
    };

    const statusClassName = RSM_APPROVAL_STATUS?.REJECTED?.key === formData?.status ? styles.rejectedColor : RSM_APPROVAL_STATUS?.APPROVED?.key === formData?.status ? styles.approvedColor : styles?.warningColor;
    return (
        <>
            <Row gutter={20} className={styles?.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles?.rsmApproval}>
                    <p className={styles?.allowedTimingAlignment}>{translateContent('rsmApproval.label.rsmApprovalSummary')}</p>
                    <br />
                    <Card>
                        <>
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.tableTextColor54}>
                                    {translateContent('rsmApproval.label.fromDealerCode')}:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.buttonsGroupRight}>
                                    {checkAndSetDefaultValue(formData?.fromDealerCode, isLoading)}
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={`${styles?.buttonsGroupRight} ${styles?.tableTextColor85}`}>
                                    {checkAndSetDefaultValue(formData?.fromDealerName, isLoading)}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.tableTextColor54}>
                                    {translateContent('rsmApproval.label.toDealerCode')}:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.buttonsGroupRight}>
                                    {checkAndSetDefaultValue(formData?.toDealerCode, isLoading)}
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={`${styles?.buttonsGroupRight} ${styles?.tableTextColor85}`}>
                                    {checkAndSetDefaultValue(formData?.toDealerName, isLoading)}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.tableTextColor54}>
                                    {translateContent('rsmApproval.label.chassisNumber')}:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.buttonsGroupRight}>
                                    {checkAndSetDefaultValue(formData?.chassisNumber, isLoading)}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.tableTextColor54}>
                                    {translateContent('rsmApproval.label.vehicleAge')}:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.buttonsGroupRight}>
                                    {checkAndSetDefaultValue(formData?.vehicleAge, isLoading)}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.tableTextColor54}>
                                    {translateContent('rsmApproval.label.requestedDate')}:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.buttonsGroupRight}>
                                    {checkAndSetDefaultValue(formData?.requestedDate, isLoading, DATA_TYPE?.DATE?.key)}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.tableTextColor54}>
                                    {translateContent('rsmApproval.label.status')}:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={`${styles?.buttonsGroupRight} ${statusClassName}`}>
                                    {checkAndSetDefaultValue(formData?.status, isLoading)}
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.tableTextColor54}>
                                    {translateContent('rsmApproval.label.modelDescription')}:
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles?.buttonsGroupRight}>
                                    {checkAndSetDefaultValue(formData?.modelDescription, isLoading)}
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
