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
// import { INITIAL_DEALER_COMMUNICATION_SCHEME_SECTION } from 'constants/modules/IncentiveScheme/SpecialIncentiveSchemeSections';
import { HeaderDetailsMaster } from './HeaderDetails';
import { SchemeDetailsMaster } from './SchemeDetails';
import SupportingDocumentMaster from './SupportingDocument';
import ApplicableModelMaster from './ApplicableModel';
import { INITIAL_DEALER_COMMUNICATION_SCHEME_SECTION } from 'constants/modules/IncentiveScheme/InitateDealerCommunicationSection';

const SpecialIncentiveSchemesContainerMain = (props) => {
    const { currentSection } = props;
    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case INITIAL_DEALER_COMMUNICATION_SCHEME_SECTION.DETAILS.id: {
                return <HeaderDetailsMaster {...myProps} />;
            }
            case INITIAL_DEALER_COMMUNICATION_SCHEME_SECTION.SCHEME_DETAILS.id: {
                return <SchemeDetailsMaster {...myProps} />;
            }
            // case INITIAL_DEALER_COMMUNICATION_SCHEME_SECTION.APPLICABLE_MODEL.id: {
            //     return <ApplicableModelMaster {...myProps} />;
            // }
            // case INITIAL_DEALER_COMMUNICATION_SCHEME_SECTION.DOCUMENTS.id: {
            //     return <SupportingDocumentMaster {...myProps} />;
            // }
            case INITIAL_DEALER_COMMUNICATION_SCHEME_SECTION.APPROVAL_REQUEST.id: {
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

export const SpecialIncentiveSchemesContainer = withDrawer(SpecialIncentiveSchemesContainerMain, { width: '90%', footer: null });
