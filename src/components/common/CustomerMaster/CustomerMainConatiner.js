/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

import { IndivisualCustomerDetailsMaster, IndividualContact, IndividualProfileMaster, IndividualAccountRelatedMaster, IndividualAddressMaster, FamilyDetails } from './IndividualCustomer';
import { CompanyAddressMaster, CompanyProfile, CompanyContact, AccountRelatedMaster } from './FirmOrCompany';
import { CompanyCustomerDetailsMaster } from './FirmOrCompany';
import { SupportingDocument } from './IndividualCustomer';
import { LeftSidebar } from './LeftSidebar';

import { CUSTOMER_INDIVIDUAL_SECTION } from 'constants/CustomerIndividualSection';
import { CUSTOMER_CORPORATE_SECTION } from 'constants/CustomerCorporateSection';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import { withDrawer } from 'components/withDrawer';
import styles from 'components/common/Common.module.css';

const CustomerMainConatinerMain = (props) => {
    const { customerType } = props;
    const [section, setSection] = useState();
    const [currentSection, setCurrentSection] = useState(customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION.CUSTOMER_DETAILS.id : CUSTOMER_CORPORATE_SECTION.CUSTOMER_DETAILS.id);

    useEffect(() => {
        const sectionList = customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION : CUSTOMER_CORPORATE_SECTION;
        const section = Object.values(sectionList)?.find((i) => i.id === currentSection);
        setSection(section);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection]);

    const myProps = {
        ...props,
        section,
        currentSection,
        setCurrentSection,
    };

    const renderElement = () => {
        switch (customerType) {
            case CUSTOMER_TYPE?.INDIVIDUAL.id: {
                switch (currentSection) {
                    case CUSTOMER_INDIVIDUAL_SECTION?.CUSTOMER_DETAILS.id: {
                        return <IndivisualCustomerDetailsMaster {...myProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.INDIVIDUAL_PROFILE.id: {
                        return <IndividualProfileMaster {...myProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.ADDRESS.id: {
                        return <IndividualAddressMaster {...myProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.CONTACTS.id: {
                        return <IndividualContact {...myProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.FAMILY_DETAILS.id: {
                        return <FamilyDetails />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.ACCOUNT_RELATED.id: {
                        return <IndividualAccountRelatedMaster {...myProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.SUPPORTING_DOCUMENT.id: {
                        return <SupportingDocument />;
                    }
                    default: {
                        return <IndivisualCustomerDetailsMaster {...myProps} />;
                    }
                }
            }
            case CUSTOMER_TYPE?.CORPORATE.id: {
                switch (currentSection) {
                    case CUSTOMER_CORPORATE_SECTION?.CUSTOMER_DETAILS.id: {
                        return <CompanyCustomerDetailsMaster {...myProps} />;
                    }
                    case CUSTOMER_CORPORATE_SECTION?.COMPANY_RPOFILE.id: {
                        return <CompanyProfile {...myProps} />;
                    }
                    case CUSTOMER_CORPORATE_SECTION?.ADDRESS.id: {
                        return <CompanyAddressMaster />;
                    }
                    case CUSTOMER_CORPORATE_SECTION?.CONTACTS.id: {
                        return <CompanyContact {...myProps} />;
                    }
                    case CUSTOMER_CORPORATE_SECTION?.ACCOUNT_RELATED.id: {
                        return <AccountRelatedMaster {...myProps} />;
                    }
                    case CUSTOMER_CORPORATE_SECTION?.CUSTOMER_INDIVIDUAL_SECTION.id: {
                        return <SupportingDocument />;
                    }
                    default: {
                        return <CompanyCustomerDetailsMaster {...myProps} />;
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
                            <LeftSidebar {...myProps} />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={styles.marginBottom60}>{renderElement()}</div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export const CustomerMainConatiner = withDrawer(CustomerMainConatinerMain, { width: '90%', footer: null });
