import React, { useState } from 'react';
import { Col, Row, Collapse, Space } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { FaChevronDown } from 'react-icons/fa';
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
// import CommonTimeline from './Timeline';

const { Panel } = Collapse;
const expandIcon = ({ isActive }) => <FaChevronDown size={18} rotate={isActive ? -90 : 90} />;

const AddEditFormMain = (props) => {
    const { onCloseAction, isViewModeVisible, formActionType, isVisible } = props;
    const [moduleName, setmoduleName] = useState('OTF Details');
    const EDIT_ACTION = OTF_FORM_ACTION_TYPE?.EDIT;
    const CANCEL_ACTION = OTF_FORM_ACTION_TYPE?.CANCEL;
    const ALLOT_ACTION = OTF_FORM_ACTION_TYPE?.ALLOT;
    const INVOICE_ACTION = OTF_FORM_ACTION_TYPE?.INVOICE;
    const TRANSFER_ACTION = OTF_FORM_ACTION_TYPE?.TRANSFER;
    const NEXT_ACTION = OTF_FORM_ACTION_TYPE?.NEXT;

    const [leftTimeline, setleftTimeline] = useState({
        otfDetails: true,
        customerDetails: false,
        vehicleDetails: false,
        fiananceDetails: false,
        schemeDetails: false,
        insuranceDetails: false,
        exchangeVehicle: false,
        referrals: false,
        loyaltyScheme: false,
        addOnDetails: false,
        invoiceDetails: false,
    });

    const [buttonData, setbuttonData] = useState({
        closeBtn: true,
        editBtn: true,
        cancelBtn: true,
        allotbtn: true,
        invoiceBtn: true,
        transferBtn: true,
        nextBtn: true,
    });

    const handleOtfButtonClick = ({ buttonAction, record }) => {
        if (buttonAction === EDIT_ACTION) {
            console.log('edit');
        } else if (buttonAction === CANCEL_ACTION) {
            console.log('cancel');
        } else if (buttonAction === ALLOT_ACTION) {
            console.log('allot');
        } else if (buttonAction === INVOICE_ACTION) {
            console.log('rinvoice');
        } else if (buttonAction === TRANSFER_ACTION) {
            console.log('transfer');
        } else if (buttonAction === NEXT_ACTION) {
            console.log('next');
        }
    };
    const otfButtonProps = {
        buttonData,
        setbuttonData,
        onCloseAction,
        handleButtonClick: handleOtfButtonClick,
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
            case 'Scheme Details': {
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
            case 'Invoice/Delivery Information': {
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
                                            {/* <Avatar size={40}>USER</Avatar> */}
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
                            <h2>{moduleName}</h2>
                            {renderElement()}
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
