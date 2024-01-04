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
import VehicleDetailsMaster from './VehicleDetails';
import CorporateCustomerDetailsMaster from './CorporateCustomerDetails';
import SharedByDetailsMaster from './SharedBy';
import ClaimDetailsDetailsMaster from './ClaimDetails';
import { INCENTIVE_CLAIM_SECTION } from 'constants/modules/IncentiveSchemeAndClaim/IncentiveScheme';
import { ClaimSettelmentDetailsMastersss } from './ClaimSettelmentDetails/ClaimSettelmentDetailsMaster';
import ProductsTargetAndAchievementMaster from './ProductsTargetAndAchievement';
import { SupportingDocumentMaster } from './SupportingDocument';
import IncentiveBreakupMaster from './IncentiveBreakup';

const IncentiveClaimMasterContainerMain = (props) => {
    const { currentSection } = props;
    const myProps = {
        ...props,
    };
    
    const renderElement = () => {
        switch (currentSection) {
            case INCENTIVE_CLAIM_SECTION.DETAILS.id: {
                return <ClaimDetailsDetailsMaster {...myProps} />;
            }
            case INCENTIVE_CLAIM_SECTION.CLAIM_SETTELMENT_DETAILS.id: {
                return <ClaimSettelmentDetailsMastersss {...myProps} />;
            }
            case INCENTIVE_CLAIM_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...myProps} />;
            }
            case INCENTIVE_CLAIM_SECTION.CORPORATE_CUSTOMER_DETAILS.id: {
                return <CorporateCustomerDetailsMaster {...myProps} />;
            }
            case INCENTIVE_CLAIM_SECTION.PRODUCT_TARGETS_AND_ACHEIEVEMENT.id: {
                return <ProductsTargetAndAchievementMaster {...myProps} />;
            }
            case INCENTIVE_CLAIM_SECTION.SHARED_BY.id: {
                return <SharedByDetailsMaster {...myProps} />;
            }


            case INCENTIVE_CLAIM_SECTION.INCENTIVE_BREAKUP.id: {
                return <IncentiveBreakupMaster {...myProps} />;
            }

            case INCENTIVE_CLAIM_SECTION.DOCUMENTS.id: {
                return <SupportingDocumentMaster {...myProps} />;
            }


            case INCENTIVE_CLAIM_SECTION.APPROVAL_REQUEST.id: {
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

export const IncentiveClaimMasterContainer = withDrawer(IncentiveClaimMasterContainerMain, { width: '90%', footer: null });
