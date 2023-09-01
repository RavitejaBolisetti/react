/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { LeftSidebar } from './LeftSidebar';
import { USER_ACCESS_SECTION_DEALER, USER_ACCESS_SECTION_MANUFACTURER } from 'constants/modules/UserManagement/userAccessSection';
import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';

// import UserInfoCard from './common/UserInfoCard';
import { MacIdMaster } from './Dealer/MacIdComponent';
import AssignUserRole from './common/AssignUserRole';
import { ProductMapping } from './Dealer/ProductMapping';
import { BranchMapping } from './Dealer/BranchMapping';

import styles from 'assets/sass/app.module.scss';

const UserMainContainerMaster = (props) => {
    const { userType, currentSection } = props;

    const sideBarProps = {
        ...props,
    };
    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (userType) {
            case USER_TYPE_USER.DEALER.id: {
                switch (currentSection) {
                    case USER_ACCESS_SECTION_DEALER?.MAC_ID.id: {
                        return <MacIdMaster {...myProps} />;
                    }
                    case USER_ACCESS_SECTION_DEALER?.ASSIGN_USER_ROLES.id: {
                        return <AssignUserRole {...myProps} />;
                    }
                    case USER_ACCESS_SECTION_DEALER?.BRANCH_MAPPING.id: {
                        return <BranchMapping {...myProps} />; //
                    }
                    case USER_ACCESS_SECTION_DEALER?.PRODUCT_MAPPING.id: {
                        return <ProductMapping {...myProps} />;
                    }
                    default:
                        return;
                }
            }
            case USER_TYPE_USER.MANUFACTURER.id: {
                switch (currentSection) {
                    case USER_ACCESS_SECTION_MANUFACTURER?.ASSIGN_USER_ROLES.id: {
                        return <AssignUserRole {...myProps} />;
                    }
                    // case USER_ACCESS_SECTION_MANUFACTURER?.ADMINISTRATION_HIERARCHY_MAPPING.id: {
                    //     return <AdministrativeHierarchy {...myProps} />;
                    // }
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
        <>
            <Row gutter={0}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                    <LeftSidebar {...sideBarProps} />
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <div>{renderElement()}</div>
                </Col>
            </Row>
        </>
    );
};

export const UserMainContainer = withDrawer(UserMainContainerMaster, { width: '90%', footer: null });
