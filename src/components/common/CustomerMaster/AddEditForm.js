import React, { useState } from 'react';
import { Col, Row, Collapse, Space } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { OTF_FORM_ACTION_TYPE } from 'constants/otfActionType';

import { FaChevronDown } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';

import { IndivisualCustomerDetailsMaster, IndividualContact, IndividualProfileMaster, IndividualAccountRelatedMaster, IndividualAddressMaster, FamilyDetails } from './IndividualCustomer';
import { CompanyAddressMaster, CompanyProfile, CompanyContact, AccountRelatedMaster } from './FirmOrCompany';
import { CompanyCustomerDetailsMaster } from './FirmOrCompany';
import { SupportingDocument } from './IndividualCustomer';

import FormProgressBar from './FormProgressBar';
import { Otfbuttons } from '../Button';

const { Panel } = Collapse;

const expandIcon = ({ isActive }) => <FaChevronDown size={18} rotate={isActive ? -90 : 90} />;

const AddEditFormMain = (props) => {
    const { onCloseAction } = props;
    const { isViewModeVisible, setIsViewModeVisible } = props;
    const { toggleButton, settoggleButton } = props;
    const [leftTimeline, setleftTimeline] = useState({
        AccountRelated: false,
        Address: false,
        Contacts: false,
        CustomerDetails: false,
        FamilyDetails: false,
        IndividualProfile: false,
        CustomerProfile: false,
        SupportingDocument: true,
    });

    const EDIT_ACTION = OTF_FORM_ACTION_TYPE?.EDIT;
    const CANCEL_ACTION = OTF_FORM_ACTION_TYPE?.CANCEL;
    const NEXT_ACTION = OTF_FORM_ACTION_TYPE?.NEXT;

    const TimelineProps = {
        leftTimeline,
        setleftTimeline,
        toggleButton,
        settoggleButton,
    };
    const [buttonData, setbuttonData] = useState({
        cancelBtn: true,
        saveNext: true,
    });
    const handleOtfButtonClick = ({ buttonAction, record }) => {
        if (buttonAction === EDIT_ACTION) {
            console.log('edit');
        } else if (buttonAction === CANCEL_ACTION) {
            console.log('cancel');
        } else if (buttonAction === NEXT_ACTION) {
            console.log('next');
        }
    };
    const customerMasterBtnProps = {
        buttonData,
        setbuttonData,
        onCloseAction,
        handleButtonClick: handleOtfButtonClick,
    };
    const CustomerProfileMasterProps = {
        onCloseAction,
        isViewModeVisible,
    };

    const CustomerDetailsMasterProps = {
        onCloseAction,
        isViewModeVisible,
        setIsViewModeVisible,
    };
    const CustomerAccountMasterProps = {
        onCloseAction,
        isViewModeVisible,
        setIsViewModeVisible,
    };
    const IndividualProfileMasterProps = {
        onCloseAction,
        isViewModeVisible,
    };
    const IndividualAccountRelatedMasterProps = {
        onCloseAction,
        isViewModeVisible,
    };
    const individualAddressMasterProps = {
        onCloseAction,
        isViewModeVisible,
        styles,
    };

    const renderElement = () => {
        if (toggleButton?.individual) {
            if (leftTimeline?.AccountRelated) {
                return <IndividualAccountRelatedMaster {...IndividualAccountRelatedMasterProps} />;
            } else if (leftTimeline?.CustomerDetails) {
                return <IndivisualCustomerDetailsMaster {...CustomerDetailsMasterProps} />;
            } else if (leftTimeline?.Address) {
                return <IndividualAddressMaster {...individualAddressMasterProps} />;
            } else if (leftTimeline?.Contacts) {
                return <IndividualContact />;
            } else if (leftTimeline?.IndividualProfile) {
                return <IndividualProfileMaster {...IndividualProfileMasterProps} />;
            } else if (leftTimeline?.FamilyDetails) {
                return <FamilyDetails />;
            } else if (leftTimeline?.SupportingDocument) {
                return <SupportingDocument />;
            }
        } else {
            if (leftTimeline?.CustomerDetails) {
                return <CompanyCustomerDetailsMaster {...CustomerDetailsMasterProps} />;
            } else if (leftTimeline?.CustomerProfile) {
                return <CompanyProfile {...CustomerProfileMasterProps} />;
            } else if (leftTimeline?.AccountRelated) {
                return <AccountRelatedMaster {...CustomerAccountMasterProps} />;
            } else if (leftTimeline?.Contacts) {
                return <CompanyContact />;
            } else if (leftTimeline?.Address) {
                return <CompanyAddressMaster />;
            } else if (leftTimeline?.IndividualProfile) {
                return <IndividualProfileMaster {...IndividualProfileMasterProps} />;
            } else if (leftTimeline?.SupportingDocument) {
                return <SupportingDocument />;
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
                                                    <span>4962946</span>
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
                    {/* <Otfbuttons {...customerMasterBtnProps} /> */}
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%', footer: null });
