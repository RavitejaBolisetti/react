/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';

// import { SupportingDocumentMaster } from './SupportingDocument';
import { LeftSidebar } from './LeftSidebar';

import styles from 'assets/sass/app.module.scss';
import { DEALER_CORPORATE_SECTION } from 'constants/modules/DealerCorporateClaim/dealerClaimSections';
import { CorporateClaimMaster } from './CorporateClaim';
import { ClaimDetailsMaster } from './ClaimDetails';

const DealerCorporateClaimMasterMainContainerMain = (props) => {
    const { currentSection } = props;
    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            // case DEALER_CORPORATE_SECTION.DEALER_CORPORATE_CLAIM.id: {
            //     return <CorporateClaimMaster {...myProps} />;
            // }
            case DEALER_CORPORATE_SECTION.CLAIM_DETAILS.id: {
                return <ClaimDetailsMaster {...myProps} />;

            }
            case DEALER_CORPORATE_SECTION.DOCUMENTS.id: {
                // return <SupportingDocumentMaster {...myProps} />;
                return <>Supporting Document</>;

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

export const DealerCorporateClaimMasterMainContainer = withDrawer(DealerCorporateClaimMasterMainContainerMain, { width: '90%', footer: null });
