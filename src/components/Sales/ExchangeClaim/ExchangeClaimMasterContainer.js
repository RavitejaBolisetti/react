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
import { DetailsMaster } from './ClaimDetails';
import { RECLAIM_REQUEST_SECTION } from 'constants/modules/ExchangeLoyalitySchemeAndClaim/ClaimGeneration';
import { OldVehicleDetailsMaster } from './OldVehicleDetails';
import { CreditDebitDetailsMaster } from './CreditDebitDetails';
import { TransferRCMaster } from './TransferRC/TransferRCMaster';
import { ClaimDetail } from './Claim';

const ExchangeClaimMasterContainerMain = (props) => {
    const { currentSection } = props;
    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case RECLAIM_REQUEST_SECTION.CLAIM.id: {
                return <DetailsMaster {...myProps} />;
            }
            case RECLAIM_REQUEST_SECTION.OLD_VEHICLE_DETAILS.id: {
                return <OldVehicleDetailsMaster {...myProps} />;
            }
            case RECLAIM_REQUEST_SECTION.DOCUMENTS.id: {
                return <SupportingDocumentMaster {...myProps} />;
            }
            case RECLAIM_REQUEST_SECTION.TRANSFER_RC.id: {
                return <TransferRCMaster {...myProps} />;
            }
            // case RECLAIM_REQUEST_SECTION.CLAIM_DETAILS.id: {
            //     return <ClaimDetail {...myProps} />;
            // }
            case RECLAIM_REQUEST_SECTION.CREDIT_DEBIT_DETIALS.id: {
                return <CreditDebitDetailsMaster {...myProps} />;
            }
            case RECLAIM_REQUEST_SECTION.APPROVAL_REQUEST.id: {
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

export const ExchangeClaimMasterContainer = withDrawer(ExchangeClaimMasterContainerMain, { width: '90%', footer: null });
