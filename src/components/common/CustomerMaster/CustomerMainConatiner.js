/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col } from 'antd';

import { IndivisualCustomerDetailMaster, IndividualProfileMaster, IndividualAddressMaster, IndividualContactMaster, IndividualFamilyDetailMaster, IndividualAccountRelatedMaster, IndividualSupportingDocument } from './IndividualCustomer';
import { CorporateCustomerDetailMaster, CorporateCompanyProfileMaster, CorporateCompanyAddressMaster, CorporateContactMaster, CorporateAccountRelatedMaster } from './CorporateCustomer';
import { LeftSidebar } from './LeftSidebar';

import { CUSTOMER_INDIVIDUAL_SECTION } from 'constants/CustomerIndividualSection';
import { CUSTOMER_CORPORATE_SECTION } from 'constants/CustomerCorporateSection';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import { withDrawer } from 'components/withDrawer';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const CustomerMainConatinerMain = (props) => {
    const { customerType, currentSection, resetViewData } = props;

    useEffect(() => {
        resetViewData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, resetViewData]);

    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (customerType) {
            case CUSTOMER_TYPE?.INDIVIDUAL.id: {
                switch (currentSection) {
                    case CUSTOMER_INDIVIDUAL_SECTION?.CUSTOMER_DETAILS.id: {
                        return <IndivisualCustomerDetailMaster {...myProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.INDIVIDUAL_PROFILE.id: {
                        return <IndividualProfileMaster {...myProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.ADDRESS.id: {
                        return <IndividualAddressMaster {...myProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.CONTACTS.id: {
                        return <IndividualContactMaster {...myProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.FAMILY_DETAILS.id: {
                        return <IndividualFamilyDetailMaster {...myProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.ACCOUNT_RELATED.id: {
                        return <IndividualAccountRelatedMaster {...myProps} />;
                    }
                    case CUSTOMER_INDIVIDUAL_SECTION?.SUPPORTING_DOCUMENT.id: {
                        return <IndividualSupportingDocument {...myProps} />;
                    }
                    default: {
                        return;
                    }
                }
            }
            case CUSTOMER_TYPE?.CORPORATE.id: {
                switch (currentSection) {
                    case CUSTOMER_CORPORATE_SECTION?.CUSTOMER_DETAILS.id: {
                        return <CorporateCustomerDetailMaster {...myProps} />;
                    }
                    case CUSTOMER_CORPORATE_SECTION?.COMPANY_RPOFILE.id: {
                        return <CorporateCompanyProfileMaster {...myProps} />;
                    }
                    case CUSTOMER_CORPORATE_SECTION?.ADDRESS.id: {
                        return <CorporateCompanyAddressMaster {...myProps} />;
                    }
                    case CUSTOMER_CORPORATE_SECTION?.CONTACTS.id: {
                        return <CorporateContactMaster {...myProps} />;
                    }
                    case CUSTOMER_CORPORATE_SECTION?.ACCOUNT_RELATED.id: {
                        return <CorporateAccountRelatedMaster {...myProps} />;
                    }
                    case CUSTOMER_CORPORATE_SECTION?.SUPPORTING_DOCUMENT.id: {
                        return <IndividualSupportingDocument {...myProps} />;
                    }
                    default: {
                        return;
                    }
                }
            }
            default: {
                return;
            }
        }
    };

    return (
        <Row gutter={0}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                <LeftSidebar {...myProps} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                <div>{renderElement()}</div>
            </Col>
        </Row>
    );
};

export const CustomerMainConatiner = withDrawer(CustomerMainConatinerMain, { width: '90%', footer: null });
