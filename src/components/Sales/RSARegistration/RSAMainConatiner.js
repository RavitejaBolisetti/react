/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { LeftSidebar } from './LeftSidebar';

import { SHIELD_REGISTRATION_SECTION } from 'constants/ShieldSchemeRegistrationSection';
import { ShieldRegistrationDetailMaster } from 'components/Services/ShieldSchemeRegistartion/ShieldRegistrationDetail';
import { VehicleCustomerDetailMaster } from 'components/Services/ShieldSchemeRegistartion/VehicleCustomerDetail';
import { RequestDetailMaster } from 'components/Services/ShieldSchemeRegistartion/RequestDetail';
import { ThankYouMaster } from 'components/Services/ShieldSchemeRegistartion/ThankYou';

import styles from 'assets/sass/app.module.scss';
const RSAMainConatinerMain = (props) => {
    const { currentSection } = props;

    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case SHIELD_REGISTRATION_SECTION.SHIELD_REGISTRATION_DETAILS.id: {
                return <ShieldRegistrationDetailMaster {...myProps} />;
            }
            case SHIELD_REGISTRATION_SECTION.VEHICLE_CUSTOMER_DETAILS.id: {
                return <VehicleCustomerDetailMaster {...myProps} />;
            }
            case SHIELD_REGISTRATION_SECTION.REQUEST_DETAILS.id: {
                return <RequestDetailMaster {...myProps} />;
            }
            case SHIELD_REGISTRATION_SECTION.THANK_YOU_PAGE.id: {
                return <ThankYouMaster {...myProps} />;
            }
            default: {
                return <ShieldRegistrationDetailMaster {...myProps} />;
            }
        }
    };

    return (
        <Row gutter={0} data-testid="logRole">
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                <LeftSidebar {...myProps} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18} className={styles.drawerRightMainContainer}>
                <div>{renderElement()}</div>
            </Col>
        </Row>
    );
};

export const RSAMainConatiner = withDrawer(RSAMainConatinerMain, { width: '90%', footer: null });
