/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { AMC_REGISTRATION_SECTION } from 'constants/AMCRegistrationSection';

import { LeftSidebar } from './LeftSidebar';

import { AMCRegistrationFormButton } from './AMCRegistrationFormButton';
import AMCRegistrationDetailsMaster from './AMCRegistrationDetails';
import CustomerDetailsMaster from './CustomerDetails';
import VehicleDetailsMaster from './VehicleDetails';
import RequestDetailsMaster from './RequestDetails';
import { ThankYouMaster } from './ThankYou';

import styles from 'assets/sass/app.module.scss';

const AMCRegistrationMainContainerMain = (props) => {
    const { customerForm, currentSection, requestPayload, registrationForm } = props;

    const myProps = {
        ...props,
        wrapForm: false,
        FormActionButton: AMCRegistrationFormButton,
    };

    const renderElement = () => {
        switch (currentSection) {
            case AMC_REGISTRATION_SECTION.AMC_REGISTRATION_DETAILS.id: {
                return <AMCRegistrationDetailsMaster form={registrationForm} {...myProps} />;
            }
            case AMC_REGISTRATION_SECTION.CUSTOMER_DETAILS.id: {
                return <CustomerDetailsMaster {...myProps} form={customerForm} formData={requestPayload?.customerDetails} formKey={'customerDetails'} />;
            }
            case AMC_REGISTRATION_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...myProps} formData={requestPayload?.amcVehicleDetails} formKey={'vehicleDetails'} />;
            }
            case AMC_REGISTRATION_SECTION.REQUEST_DETAILS.id: {
                return <RequestDetailsMaster {...myProps} formData={requestPayload?.requestDetails} formKey={'requestDetails'} />;
            }
            case AMC_REGISTRATION_SECTION.THANK_YOU_PAGE.id: {
                return <ThankYouMaster {...myProps} />;
            }
            default: {
                return <AMCRegistrationDetailsMaster {...myProps} />;
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

export const AMCRegistrationMainContainer = withDrawer(AMCRegistrationMainContainerMain, { width: '90%', footer: null });
