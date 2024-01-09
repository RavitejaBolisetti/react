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
import { RECLAIM_REQUEST_SECTION } from 'constants/modules/ExchangeLoyalitySchemeAndClaim/ReclaimRequest';
import VehicleDetailsCurrentMaster from './VehicleDetailsCurrent';
import VehicleDetailsNewMaster from './VehicleDetailsNew';
import { CurrentVehicleDetailsMaster } from './CurrentVehicleDetails';
import { NewVehicleDetailsMaster } from './NewVehicleDetails';

const ExchangeLoyaltyReclaimRequestContainerMain = (props) => {
    const { currentSection } = props;
    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case RECLAIM_REQUEST_SECTION.REQUEST_DETAILS.id: {
                return <DetailsMaster {...myProps} />;
            }
            case RECLAIM_REQUEST_SECTION.CURRENT_VEHICLE_DETAILS.id: {
                return <CurrentVehicleDetailsMaster {...myProps} />;
                // return <VehicleDetailsCurrentMaster {...myProps} />;
                
            }
            case RECLAIM_REQUEST_SECTION.NEW_VEHICLE_DETAILS.id: {
                return <NewVehicleDetailsMaster {...myProps} />;
                // return <VehicleDetailsNewMaster {...myProps} />;
            }
            case RECLAIM_REQUEST_SECTION.DOCUMENTS.id: {
                return <SupportingDocumentMaster {...myProps} />;
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

export const ExchangeLoyaltyReclaimRequestContainer = withDrawer(ExchangeLoyaltyReclaimRequestContainerMain, { width: '90%', footer: null });
