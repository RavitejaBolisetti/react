import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

import styles from 'components/common/Common.module.css';
import { withDrawer } from 'components/withDrawer';

import { IndivisualCustomerDetailsMaster, IndividualContact, IndividualProfileMaster, IndividualAccountRelatedMaster, IndividualAddressMaster, FamilyDetails } from './IndividualCustomer';
import { CompanyAddressMaster, CompanyProfile, CompanyContact, AccountRelatedMaster } from './FirmOrCompany';
import { CompanyCustomerDetailsMaster } from './FirmOrCompany';
import { SupportingDocument } from './IndividualCustomer';
import { LeftSidebar } from './LeftSidebar';

import { CUSTOMER_INDIVIDUAL_SECTION } from 'constants/CustomerIndividualSection';
import { CUSTOMER_FIRM_SECTION } from 'constants/CustomerFirmSection';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import { DrawerFormButton } from '../Button';

const AddEditFormMain = (props) => {
    const { onCloseAction, formData } = props;
    const { isViewModeVisible, setIsViewModeVisible, formActionType } = props;
    const { customerType, setCustomerType } = props;
    const [currentSection, setCurrentSection] = useState(customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION.CUSTOMER_DETAILS.id : CUSTOMER_FIRM_SECTION.CUSTOMER_DETAILS.id);
    const [section, setSection] = useState();

    useEffect(() => {
        const sectionList = customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION : CUSTOMER_FIRM_SECTION;
        const section = Object.values(sectionList)?.find((i) => i.id === currentSection);
        setSection(section);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection]);

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

    const LeftSidebarProps = {
        leftTimeline,
        setleftTimeline,
        setCurrentSection,
        currentSection,
        customerType,
        setCustomerType,
    };

    const [buttonData, setbuttonData] = useState({
        closeBtn: true,
        saveBtn: true,
    });
    const handleButtonClick = ({ buttonAction, record }) => {};
    const customerMasterBtnProps = {
        buttonData,
        setbuttonData,
        onCloseAction,
        isViewModeVisible,
        formActionType,
        handleButtonClick,
        formData,
        saveButtonName: leftTimeline?.CustomerDetails && formActionType === 'add' ? 'Create Customer Id' : 'Save',
    };
    const commonModuleProps = {
        onCloseAction,
        isViewModeVisible,
        setIsViewModeVisible,
        customerType,
        styles,
    };

    const renderElement = () => {
        switch (customerType) {
            case CUSTOMER_TYPE?.INDIVIDUAL.id: {
                switch (currentSection) {
                    case CUSTOMER_INDIVIDUAL_SECTION?.CUSTOMER_DETAILS.id: {
                        return <IndivisualCustomerDetailsMaster {...commonModuleProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.INDIVIDUAL_PROFILE.id: {
                        return <IndividualProfileMaster {...commonModuleProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.ADDRESS.id: {
                        return <IndividualAddressMaster {...commonModuleProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.CONTACTS.id: {
                        return <IndividualContact {...commonModuleProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.FAMILY_DETAILS.id: {
                        return <FamilyDetails />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.ACCOUNT_RELATED.id: {
                        return <IndividualAccountRelatedMaster {...commonModuleProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.SUPPORTING_DOCUMENT.id: {
                        return <SupportingDocument />;
                    }
                    default: {
                        return <IndivisualCustomerDetailsMaster {...commonModuleProps} />;
                    }
                }
            }
            case CUSTOMER_TYPE?.FIRM.id: {
                switch (currentSection) {
                    case CUSTOMER_FIRM_SECTION?.CUSTOMER_DETAILS.id: {
                        return <CompanyCustomerDetailsMaster {...commonModuleProps} />;
                    }
                    case CUSTOMER_FIRM_SECTION?.COMPANY_RPOFILE.id: {
                        return <CompanyProfile {...commonModuleProps} />;
                    }
                    case CUSTOMER_FIRM_SECTION?.ADDRESS.id: {
                        return <CompanyAddressMaster />;
                    }
                    case CUSTOMER_FIRM_SECTION?.CONTACTS.id: {
                        return <CompanyContact {...commonModuleProps} />;
                    }
                    case CUSTOMER_FIRM_SECTION?.ACCOUNT_RELATED.id: {
                        return <AccountRelatedMaster {...commonModuleProps} />;
                    }
                    case CUSTOMER_FIRM_SECTION?.CUSTOMER_INDIVIDUAL_SECTION.id: {
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
                            <LeftSidebar {...LeftSidebarProps} />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.drawerBodyRight}>
                            <h2>{section?.title}</h2>
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
