import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import styles from 'components/common/Common.module.css';
import { OTF_FORM_ACTION_TYPE } from 'constants/otfActionType';
import { OTF_SECTION } from 'constants/OTFSection';

import { CustomerDetailsMaster } from './CustomerDetails';
import { SchemeDetailsMaster } from './SchemeDetails';
import { InsuranceDetailsMaster } from './InsuranceDetails';
import { VehicleDetailsMaster } from './VehicleDetails';
import { FinananceDetailsMaster } from './FinananceDetails';
import { LoyaltySchemeMaster } from './LoyaltyScheme';
import { ReferralsMaster } from './Referrals';
import { ExchangeVehiclesMaster } from './ExchangeVehicles';
import { AddOnDetailsMaster } from './AddOnDetails';
import { OtfDetailsMaster } from './OtfDetails';
import { InvoiceDetailsMaster } from './InvoiceDetails';
import { OTFDrawerFormButton } from 'components/common/Button';

import OTFStatusBar from './utils/OTFStatusBar';
import { MovetoNextForm } from './utils/OTFUtils';

import { LeftSidebar } from './LeftSidebar';

const AddEditFormMain = (props) => {
    const { onCloseAction, isViewModeVisible, formActionType, setFormActionType, isVisible } = props;
    const [currentSection, setCurrentSection] = useState(OTF_SECTION.OTF_DETAILS.id);
    const [section, setSection] = useState();

    useEffect(() => {
        const section = Object.values(OTF_SECTION)?.find((i) => i.id === currentSection);
        setSection(section);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection]);

    const EDIT_ACTION = OTF_FORM_ACTION_TYPE?.EDIT;
    const TRANSFER_ACTION = OTF_FORM_ACTION_TYPE?.TRANSFER;
    const CANCEL_ACTION = OTF_FORM_ACTION_TYPE?.CANCEL;
    const ALLOT_ACTION = OTF_FORM_ACTION_TYPE?.ALLOT;
    const UNALLOT_ACTION = OTF_FORM_ACTION_TYPE?.UNALLOT;
    const INVOICE_ACTION = OTF_FORM_ACTION_TYPE?.INVOICE;
    const DELIVER_ACTION = OTF_FORM_ACTION_TYPE?.DELIVERYNOTE;
    const NEXT_ACTION = OTF_FORM_ACTION_TYPE?.NEXT;
    const SAVEPROCEED_ACTION = OTF_FORM_ACTION_TYPE?.SAVEPROCEED;

    const [leftTimeline, setleftTimeline] = useState({
        otfDetails: true,
        customerDetails: false,
        vehicleDetails: false,
        schemeDetails: false,
        insuranceDetails: false,
        fiananceDetails: false,
        exchangeVehicle: false,
        invoiceDetails: false,
        referrals: false,
        loyaltyScheme: false,
        addOnDetails: false,
    });

    const [buttonData, setbuttonData] = useState({
        editBtn: true,
        transferBtn: true,
        cancelBtn: true,
        allotBtn: true,
        unallotBtn: true,
        invoiceBtn: true,
        deliverBtn: true,
        nextBtn: true,
        saveNext: false,
    });

    const handleOtfButtonClick = ({ buttonAction, record }) => {
        switch (buttonAction) {
            case EDIT_ACTION: {
                setFormActionType({ editMode: buttonAction === EDIT_ACTION });
                setbuttonData({ ...buttonData, editBtn: false, transferBtn: false, cancelBtn: false, allotBtn: false, unallotBtn: false, invoiceBtn: false, deliverBtn: false, nextBtn: false, saveNext: true });
                break;
            }
            case TRANSFER_ACTION: {
                break;
            }
            case CANCEL_ACTION: {
                break;
            }
            case ALLOT_ACTION: {
                break;
            }
            case UNALLOT_ACTION: {
                break;
            }
            case INVOICE_ACTION: {
                break;
            }
            case DELIVER_ACTION: {
                break;
            }
            case NEXT_ACTION: {
                MovetoNextForm(leftTimeline, setleftTimeline, setCurrentSection);
                break;
            }
            case SAVEPROCEED_ACTION: {
                break;
            }
            default: {
                break;
            }
        }
    };
    const otfButtonProps = {
        buttonData,
        setbuttonData,
        onCloseAction,
        handleButtonClick: handleOtfButtonClick,
        formActionType,
    };

    const LeftSidebarProps = {
        leftTimeline,
        setleftTimeline,
        setCurrentSection,
        currentSection,
        isVisible,
    };

    const RenderElementCommonProps = {
        formActionType,
        buttonData,
        setbuttonData,
        leftTimeline,
        setleftTimeline,
        isViewModeVisible,
    };

    const renderElement = () => {
        switch (currentSection) {
            case OTF_SECTION.OTF_DETAILS.id: {
                return <OtfDetailsMaster {...RenderElementCommonProps} />;
            }
            case OTF_SECTION.CUSTOMER_DETAILS.id: {
                return <CustomerDetailsMaster {...RenderElementCommonProps} />;
            }
            case OTF_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...RenderElementCommonProps} />;
            }
            case OTF_SECTION.SCHEME_AND_OFFER_DETAILS.id: {
                return <SchemeDetailsMaster {...RenderElementCommonProps} />;
            }
            case OTF_SECTION.INSURANCE_DETAILS.id: {
                return <InsuranceDetailsMaster {...RenderElementCommonProps} />;
            }
            case OTF_SECTION.FINANCE_DETAILS.id: {
                return <FinananceDetailsMaster {...RenderElementCommonProps} />;
            }
            case OTF_SECTION.EXCHANGE_VEHICLE.id: {
                return <ExchangeVehiclesMaster {...RenderElementCommonProps} />;
            }
            case OTF_SECTION.REFERRALS.id: {
                return <ReferralsMaster {...RenderElementCommonProps} />;
            }
            case OTF_SECTION.LOYALITY_SCHEME.id: {
                return <LoyaltySchemeMaster {...RenderElementCommonProps} />;
            }
            case OTF_SECTION.INVOICE_INFORMATION.id: {
                return <InvoiceDetailsMaster {...RenderElementCommonProps} />;
            }
            case OTF_SECTION.ADDON_DETAIL.id: {
                return <AddOnDetailsMaster {...RenderElementCommonProps} />;
            }
            default: {
                return <CustomerDetailsMaster {...RenderElementCommonProps} />;
            }
        }
    };

    return (
        <>
            <Row gutter={0}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <LeftSidebar {...LeftSidebarProps} />
                        </Col>
                    </Row>
                </Col>

                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.drawerBodyRight}>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <span className={styles.drawerBodyHeading}>{section?.title}</span>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <OTFStatusBar status={1} />
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <div className={styles.marginBottom60}>{renderElement()}</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <OTFDrawerFormButton {...otfButtonProps} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%', footer: null });
