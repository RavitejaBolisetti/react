/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { RSA_LEFTMENU_SECTION } from 'components/Sales/RSARegistration/constant/RSALeftMenuSection';

import { LeftSidebar } from './LeftSidebar';
// import { RSARegistrationDetailMaster } from 'components/Sales/RSARegistration/RSARegistrationDetails';
// import { VehicleAndCustomerDetailsMaster } from 'components/Sales/RSARegistration/VehicleAndCustomerDetails';

import { SHIELD_REGISTRATION_SECTION } from 'constants/ShieldSchemeRegistrationSection';
import { ShieldRegistrationDetailMaster } from 'components/Services/ShieldSchemeRegistartion/ShieldRegistrationDetail';
import { VehicleCustomerDetailMaster } from 'components/Services/ShieldSchemeRegistartion/VehicleCustomerDetail';
import { RequestDetailMaster } from 'components/Services/ShieldSchemeRegistartion/RequestDetail';

import styles from 'assets/sass/app.module.scss';
const RSAMainConatinerMain = (props) => {
    const { currentSection } = props;
    const [workFlowDetails, setWorkFlowDetails] = useState({});

    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            // case RSA_LEFTMENU_SECTION.RSA_REGISTRATION_DETAILS.id: {
            //     return <RSARegistrationDetailMaster {...myProps} />;
            // }
            // case RSA_LEFTMENU_SECTION.VEHICLE_AND_CUSTOMER_DETAILS.id: {
            //     return <VehicleAndCustomerDetailsMaster {...myProps} />;
            // }
            // default: {
            //     return;
            // }

            case SHIELD_REGISTRATION_SECTION.SHIELD_REGISTRATION_DETAILS.id: {
                return <ShieldRegistrationDetailMaster {...myProps} />;
            }
            case SHIELD_REGISTRATION_SECTION.VEHICLE_CUSTOMER_DETAILS.id: {
                return <VehicleCustomerDetailMaster {...myProps} />;
            }
            case SHIELD_REGISTRATION_SECTION.REQUEST_DETAILS.id: {
                return <RequestDetailMaster {...myProps} />;
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
