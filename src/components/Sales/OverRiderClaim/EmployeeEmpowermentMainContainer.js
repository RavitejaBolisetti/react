/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';

import { LeftSidebar } from './LeftSidebar';

import styles from 'assets/sass/app.module.scss';
import { ClaimApprovalRequestMaster } from './ClaimApprovalRequest/ClaimApprovalRequestMaster';
import { SupportingDocumentMaster } from './SupportingDocument';
import { EmployeeEmpowermentDetailsMaster } from './EmployeeEmpowermentDetails/EmployeeEmpowermentDetailsMaster';
import { DeliveryChallanNvrDetailsMaster } from './deliveryChallanNvrDetails';
import { OVER_RIDER_CLAIM_SECTION } from 'constants/modules/OverRiderClaim/OverRiderClaimSection';

const EmployeeEmpowermentMainContainerMain = (props) => {
    const { currentSection } = props;
    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case OVER_RIDER_CLAIM_SECTION.CLAIM_DETAILS.id: {
                return <EmployeeEmpowermentDetailsMaster {...myProps} />;
            }
            case OVER_RIDER_CLAIM_SECTION.DELIVERY_CHALLAN_NVR_DETAIL.id: {
                return <DeliveryChallanNvrDetailsMaster {...myProps} />;
            }
            case OVER_RIDER_CLAIM_SECTION.DOCUMENTS.id: {
                return <SupportingDocumentMaster {...myProps} />;
            }
            case OVER_RIDER_CLAIM_SECTION.APPROVAL_REQUEST.id: {
                return <ClaimApprovalRequestMaster {...myProps} />;
            }
            default: {
                return false;
            }
        }
    };

    return (
        <Row gutter={0}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                <LeftSidebar {...myProps} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18} className={styles.drawerRightMainContainer}>
                <div>{renderElement()}</div>
            </Col>
        </Row>
    );
};

export const EmployeeEmpowermentMainContainer = withDrawer(EmployeeEmpowermentMainContainerMain, { width: '90%', footer: null });
