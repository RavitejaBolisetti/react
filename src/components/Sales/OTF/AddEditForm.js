import React, { useState } from 'react';
import { Col, Row, Collapse, Space } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import styles from 'components/common/Common.module.css';
import { OTF_FORM_ACTION_TYPE } from 'constants/otfActionType';

import FormProgressBar from './FormProgressBar';
import { CustomerDetailsMaster } from './CustomerDetails';
import { SchemeDetailsMaster } from './SchemeDetails';
import { InsuranceDetailsMaster } from './InsuranceDetails';
import { Otfbuttons } from 'components/common/Button';
import { VehicleDetailsMaster } from './VehicleDetails';
import { FinananceDetailsMaster } from './FinananceDetails';
import { LoyaltySchemeMaster } from './LoyaltyScheme';
import { ReferralsMaster } from './Referrals';
import { ExchangeVehiclesMaster } from './ExchangeVehicles';
import { AddOnDetailsMaster } from './AddOnDetails';
import { OtfDetailsMaster } from './OtfDetails';
import { InvoiceDetailsMaster } from './InvoiceDetails';
import { MovetoNextForm } from './OtfUtils';
import OtfStatusBar from './OtfStatusBar';

const { Panel } = Collapse;
const expandIcon = ({ isActive }) => (isActive ? <SlArrowUp size={18} /> : <SlArrowDown size={18} />);

const AddEditFormMain = (props) => {
    const { onCloseAction, isViewModeVisible, formActionType, setFormActionType, isVisible } = props;
    const [moduleName, setmoduleName] = useState('OTF Details');
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
                MovetoNextForm(leftTimeline, setleftTimeline, setmoduleName);
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

    const TimelineProps = {
        leftTimeline,
        setleftTimeline,
        setmoduleName,
        moduleName,
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
        switch (moduleName) {
            case 'OTF Details': {
                return <OtfDetailsMaster {...RenderElementCommonProps} />;
            }
            case 'Customer Details': {
                return <CustomerDetailsMaster {...RenderElementCommonProps} />;
            }
            case 'Vehicle Details': {
                return <VehicleDetailsMaster {...RenderElementCommonProps} />;
            }
            case 'Scheme and Offer Details': {
                return <SchemeDetailsMaster {...RenderElementCommonProps} />;
            }
            case 'Insurance Details': {
                return <InsuranceDetailsMaster {...RenderElementCommonProps} />;
            }
            case 'Finance Details': {
                return <FinananceDetailsMaster {...RenderElementCommonProps} />;
            }
            case 'Exchange vehicle': {
                return <ExchangeVehiclesMaster {...RenderElementCommonProps} />;
            }
            case 'Referrals': {
                return <ReferralsMaster {...RenderElementCommonProps} />;
            }
            case 'Loyalty scheme': {
                return <LoyaltySchemeMaster {...RenderElementCommonProps} />;
            }
            case 'Invoice Information': {
                return <InvoiceDetailsMaster {...RenderElementCommonProps} />;
            }
            case 'Add On Details': {
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
                            <Collapse bordered={true} defaultActiveKey={['1']} expandIcon={expandIcon}>
                                <Panel
                                    header={
                                        <>
                                            <Space direction="vertical">
                                                <p>
                                                    Name - <span>John Michael</span>
                                                </p>
                                                <p>
                                                    OTF No. - <span>4962946</span>
                                                </p>
                                            </Space>
                                        </>
                                    }
                                    key="1"
                                >
                                    <p>
                                        Customer Type: <span>Corporate</span>
                                    </p>
                                    <p>
                                        Mobile No.: <span>9893473843</span>
                                    </p>
                                    <p>
                                        OTF Date: <span>01 Dec 2021</span>
                                    </p>
                                    <p>
                                        Model: <span>SCORPIO</span>
                                    </p>
                                    <p>
                                        CPD: <span>13 April 2023</span>
                                    </p>
                                </Panel>
                            </Collapse>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <FormProgressBar {...TimelineProps} />
                        </Col>
                    </Row>
                </Col>

                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.drawerBodyRight}>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <span className={styles.drawerBodyHeading}>{moduleName}</span>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <OtfStatusBar />
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <div className={styles.marginBottom60}>{renderElement()}</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Otfbuttons {...otfButtonProps} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%', footer: null });
