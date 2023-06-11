import React, { useState } from 'react';
import { Col, Row, Collapse, Avatar, Space } from 'antd';
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

const { Panel } = Collapse;
const AddEditFormMain = (props) => {
    const { onCloseAction, isViewModeVisible, formActionType } = props;

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
        if (leftTimeline?.otfDetails) {
            return <CustomerDetailsMaster {...RenderElementCommonProps} />;
        } else if (leftTimeline?.customerDetails) {
            return <CustomerDetailsMaster {...RenderElementCommonProps} />;
        } else if (leftTimeline?.vehicleDetails) {
            return <VehicleDetailsMaster {...RenderElementCommonProps} />;
        } else if (leftTimeline?.schemeDetails) {
            return <SchemeDetailsMaster {...RenderElementCommonProps} />;
        } else if (leftTimeline?.insuranceDetails) {
            return <InsuranceDetailsMaster {...RenderElementCommonProps} />;
        } else if (leftTimeline?.exchangeVehicle) {
            return <ExchangeVehiclesMaster {...RenderElementCommonProps} />;
        } else if (leftTimeline.referrals) {
            return <ReferralsMaster {...RenderElementCommonProps} />;
        } else if (leftTimeline.loyaltyScheme) {
            return <LoyaltySchemeMaster {...RenderElementCommonProps} />;
        } else if (leftTimeline?.fiananceDetails) {
            return <FinananceDetailsMaster {...RenderElementCommonProps} />;
        } else if (leftTimeline?.addOnDetails) {
            return <AddOnDetailsMaster {...RenderElementCommonProps} />;
        }
    };

    return (
        <>
            <Row gutter={0}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Collapse bordered={true} defaultActiveKey={['1']} expandIcon={({ isActive }) => <FaChevronDown size={18} rotate={isActive ? -90 : 90} />}>
                                <Panel
                                    header={
                                        <>
                                            <Avatar size={40}>USER</Avatar>
                                            <Space direction="vertical">
                                                <span>John Michael</span>
                                                <span>C200615396</span>
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
                                </Panel>
                            </Collapse>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <FormProgressBar {...TimelineProps} />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18} className={styles.drawerBodyRight}>
                    {renderElement()}
                    <Otfbuttons {...otfButtonProps} />
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 1200, footer: null });
