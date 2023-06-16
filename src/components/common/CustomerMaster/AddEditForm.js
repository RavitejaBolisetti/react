import React, { useState } from 'react';
import { Col, Row, Collapse, Space } from 'antd';
import { withDrawer } from 'components/withDrawer';
import './Demo.css';

import { FaChevronDown } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';

import { IndivisualCustomerDetailsMaster, IndividualContact, IndividualProfileMaster, IndividualAccountRelatedMaster, IndividualAddressMaster, FamilyDetails } from './IndividualCustomer';
import { CompanyAddressMaster, CompanyProfile, CompanyContact, AccountRelatedMaster } from './FirmOrCompany';
import { CompanyCustomerDetailsMaster } from './FirmOrCompany';
import { SupportingDocument } from './IndividualCustomer';

import FormProgressBar from './FormProgressBar';
import { DrawerFormButton } from '../Button';
const { Panel } = Collapse;

const expandIcon = ({ isActive }) => <FaChevronDown size={18} rotate={isActive ? -90 : 90} />;

const AddEditFormMain = (props) => {
    const { onCloseAction, formActionType, formData, onFieldsChange, buttonData, setbuttonData } = props;
    const { isViewModeVisible, setIsViewModeVisible } = props;
    const { toggleButton, settoggleButton } = props;
    const [moduleName, setmoduleName] = useState('Customer Details');
    const [Activekey, setActivekey] = useState([1]);
    const [leftTimeline, setleftTimeline] = useState({
        CustomerDetails: true,
        IndividualProfile: false,
        CompanyProfile: false,
        Address: false,
        Contacts: false,
        FamilyDetails: false,
        AccountRelated: false,
        SupportingDocument: false,
    });

    const TimelineProps = {
        leftTimeline,
        setleftTimeline,
        toggleButton,
        settoggleButton,
        setmoduleName,
        moduleName,
    };

    const handleButtonClick = ({ buttonAction, record }) => {};
    const customerMasterBtnProps = {
        buttonData,
        setbuttonData,
        onCloseAction,
        handleButtonClick,
        formData,
        saveButtonName: leftTimeline?.CustomerDetails && formActionType === 'add' ? 'Create Customer Id' : 'Save & Proceed',
    };
    const commonModuleProps = {
        onCloseAction,
        isViewModeVisible,
        setIsViewModeVisible,
        styles,
        onFieldsChange,
    };

    const renderElement = () => {
        switch (toggleButton) {
            case 'Individual': {
                switch (moduleName) {
                    case 'Customer Details': {
                        return <IndivisualCustomerDetailsMaster {...commonModuleProps} />;
                    }
                    case 'Individual profile': {
                        return <IndividualProfileMaster {...commonModuleProps} />;
                    }
                    case 'Address': {
                        return <IndividualAddressMaster {...commonModuleProps} />;
                    }
                    case 'Contacts': {
                        return <IndividualContact />;
                    }
                    case 'Family Details': {
                        return <FamilyDetails />;
                    }
                    case 'Account Related': {
                        return <IndividualAccountRelatedMaster {...commonModuleProps} />;
                    }
                    case 'Supporting Document': {
                        return <SupportingDocument />;
                    }
                    default: {
                        return <IndivisualCustomerDetailsMaster {...commonModuleProps} />;
                    }
                }
            }
            case 'Firm/Company': {
                switch (moduleName) {
                    case 'Customer Details': {
                        return <CompanyCustomerDetailsMaster {...commonModuleProps} />;
                    }
                    case 'Company Profile': {
                        return <CompanyProfile {...commonModuleProps} />;
                    }
                    case 'Address': {
                        return <CompanyAddressMaster />;
                    }
                    case 'Contacts': {
                        return <CompanyContact />;
                    }
                    case 'Account Related': {
                        return <AccountRelatedMaster {...commonModuleProps} />;
                    }
                    case 'Supporting Document': {
                        return <SupportingDocument />;
                    }
                    default: {
                        return <CompanyCustomerDetailsMaster {...commonModuleProps} />;
                    }
                }
            }
            default: {
                return;
            }
        }
    };

    return (
        <>
            <Row gutter={0}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Collapse bordered={true} activeKey={Activekey} expandIcon={expandIcon}>
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
                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.drawerBodyRight}>
                            <h2>{moduleName}</h2>
                            <div className={styles.marginBottom60}>{renderElement()}</div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <DrawerFormButton {...customerMasterBtnProps} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%', footer: null });
