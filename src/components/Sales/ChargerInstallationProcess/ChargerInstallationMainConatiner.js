/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { CHARGER_INSTALLATION_SECTION } from 'constants/ChargerInstallationConstant';
import { ChargerStatusBar } from './ChargerStatusBar';
import { LeftSidebar } from './LeftSidebar';
import { ChargerInstallationDetailsMaster } from './ChargerInstallationDetails'; //Own Menu
import { InstallationAddressDetailsMaster } from './InstallationAddressDetails'; //Own Menu

import { ChargerInstallationFormButton } from './ChargerInstallationFormButton';

import styles from 'assets/sass/app.module.scss';

const ChargerInstallationMainConatinerMain = (props) => {
    const { currentSection, handleIRNGeneration, selectedOtfNumber, chargerInstallationMasterData, requestPayload, setRequestPayload } = props;

    const onFinishCustom = ({ key, values }) => {
        setRequestPayload({ ...requestPayload, [key]: values });
    };

    const myProps = {
        ...props,
        wrapForm: false,
        StatusBar: ChargerStatusBar,
        handleIRNGeneration,
        onFinishCustom,
        selectedOrderId: selectedOtfNumber,
        FormActionButton: ChargerInstallationFormButton,
        chargerInstallationMasterData,
    };

    const renderElement = () => {
        switch (currentSection) {
            case CHARGER_INSTALLATION_SECTION.CHARGER_DETAILS.id: {
                return <ChargerInstallationDetailsMaster {...myProps} />;
            }
            default: {
                return <InstallationAddressDetailsMaster {...myProps} formKey={'insuranceDetails'} />;
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

export const ChargerInstallationMainConatiner = withDrawer(ChargerInstallationMainConatinerMain, { width: '90%', footer: null });
