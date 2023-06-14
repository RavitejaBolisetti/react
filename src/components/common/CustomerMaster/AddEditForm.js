import React, { useState } from 'react';
import { Col, Row, Collapse, Avatar, Space } from 'antd';
import { withDrawer } from 'components/withDrawer';
import './Demo.css'
import { FaChevronDown } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';

import { IndivisualCustomerDetailsMaster, IndividualContact, IndividualProfileMaster, IndividualAccountRelatedMaster, IndividualAddressMaster, FamilyDetails } from './IndividualCustomer';
import { CompanyAddressMaster, CompanyProfile, CompanyContact, AccountRelatedMaster } from './FirmOrCompany';
import { CompanyCustomerDetailsMaster } from './FirmOrCompany';
import FormProgressBar from './FormProgressBar';

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
        CustomerDetails: true,
        FamilyDetails: false,
        IndividualProfile: false,
        CustomerProfile: false,
    });

    const TimelineProps = {
        leftTimeline,
        setleftTimeline,
        toggleButton,
        settoggleButton,
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
            }
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
                                    <Collapse bordered={true} defaultActiveKey={['1']} expandIcon={expandIcon}>
                                        <Panel
                                            header={
                                                <>
                                                    <div className="userProfile"/>
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
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 1200 });
