/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Descriptions, Card, Divider } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { RSMApprovalButtons } from './RSMApprovalButtons';

const ViewDetailBase = ({ setRejectRequest, handleReject, formData, styles, parameterType, handleButtonClick, onCloseAction, buttonData, setButtonData, handleApprove }) => {
    const viewProps = {
        bordered: false,
        colon: true,
        layout: 'horizontal',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        handleReject,
        setRejectRequest,
        handleApprove,
    };

    return (
        <>
            <Row className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Card className={styles.userManagementCard}>
                        <>
                            <p>
                                From Dealer Code: <span>{formData?.employeeCode}</span>
                            </p>

                            <Divider />
                            <p>
                                From Dealer Code: <span>{formData?.tokenNumber}</span>
                            </p>
                            <Divider />
                            <p>
                                Chassis Number: <span>{formData?.employeeCode}</span>
                            </p>

                            <Divider />
                            <p>
                                Vehicle Age: <span>{formData?.tokenNumber}</span>
                            </p>
                            <Divider />

                            <p>
                                Requested Date: <span>{formData?.employeeCode}</span>
                            </p>

                            <Divider />
                            <p>
                                Status: <span>{formData?.tokenNumber}</span>
                            </p>
                            <Divider />
                            <p>
                                Model Description: <span>{formData?.tokenNumber}</span>
                            </p>
                        </>
                    </Card>
                </Col>
            </Row>
            <RSMApprovalButtons {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(ViewDetailBase, {});
