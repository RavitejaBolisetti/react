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
// import { InvoiceDetailsMaster } from './InvoiceDetails';

import { AMCRegistrationFormButton } from './AMCRegistrationFormButton';

import styles from 'assets/sass/app.module.scss';

const AMCRegistrationDetailsMaster = React.lazy(() => import('./AMCRegistrationDetails'));
const CustomerDetailsMaster = React.lazy(() => import('./CustomerDetails'));
const VehicleDetailsMaster = React.lazy(() => import('./VehicleDetails'));

const AMCRegistrationMainContainerMain = (props) => {
    const { currentSection, handleIRNGeneration, selectedOtfNumber, requestPayload, setRequestPayload } = props;

    const onFinishCustom = ({ key, values }) => {
        setRequestPayload({ ...requestPayload, [key]: values });
    };

    const myProps = {
        ...props,
        wrapForm: false,
        handleIRNGeneration,
        onFinishCustom,
        selectedOrderId: selectedOtfNumber,
        FormActionButton: AMCRegistrationFormButton,
        vehicleInvoiceMasterData: requestPayload,
    };

    const renderElement = () => {
        switch (currentSection) {
            case AMC_REGISTRATION_SECTION.AMC_REGISTRATION_DETAILS.id: {
                return <AMCRegistrationDetailsMaster {...myProps} />;
            }
            case AMC_REGISTRATION_SECTION.CUSTOMER_DETAILS.id: {
                return <CustomerDetailsMaster {...myProps} formData={requestPayload?.customerDetails} formKey={'customerDetails'} />;
            }
            case AMC_REGISTRATION_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...myProps} formData={requestPayload?.vehicleDetails} formKey={'vehicleDetails'} />;
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
