import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Collapse, Avatar, Card, Timeline, Progress, Space } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';

import { FaChevronDown } from 'react-icons/fa';

import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';
import styles from 'components/common/Common.module.css';
import { OTF_FORM_ACTION_TYPE } from 'constants/otfActionType';

import FormProgressBar from './FormProgressBar';
import { CustomerDetailsMaster } from './CustomerDetails';
import { Otfbuttons } from 'components/common/Button';
import { VehicleDetailsMaster } from './VehicleDetails';
import { FinananceDetailsMaster } from './FinananceDetails';

const { Panel } = Collapse;
const AddEditFormMain = (props) => {
    const { onCloseAction, isViewModeVisible } = props;

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
        if (buttonAction == EDIT_ACTION) {
            console.log('edit');
        } else if (buttonAction == CANCEL_ACTION) {
            console.log('cancel');
        } else if (buttonAction == ALLOT_ACTION) {
            console.log('allot');
        } else if (buttonAction == INVOICE_ACTION) {
            console.log('rinvoice');
        } else if (buttonAction == TRANSFER_ACTION) {
            console.log('transfer');
        } else if (buttonAction == NEXT_ACTION) {
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

    const renderElement = () => {
        if (leftTimeline?.otfDetails) {
            return <CustomerDetailsMaster />;
        } else if (leftTimeline?.customerDetails) {
            return <CustomerDetailsMaster />;
        } else if (leftTimeline?.vehicleDetails) {
            return <VehicleDetailsMaster />;
        } else if (leftTimeline?.schemeDetails) {
            return;
        } else if (leftTimeline?.insuranceDetails) {
            return;
        } else if (leftTimeline?.exchangeVehicle) {
            return;
        } else if (leftTimeline.referrals) {
            return;
        } else if (leftTimeline.loyaltyScheme) {
            return;
        } else if (leftTimeline?.fiananceDetails) {
            return <FinananceDetailsMaster />;
        }
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.customerMasterDrawer}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.timelineBg}>
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
                        <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                            {renderElement()}
                            <Otfbuttons {...otfButtonProps} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 1200, footer: null });
