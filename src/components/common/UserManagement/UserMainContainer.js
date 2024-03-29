/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { LeftSidebar } from './LeftSidebar';

import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';
import { DEALER_USER_SECTION } from 'constants/modules/UserManagement/DealerUserSection';
import { MANUFACTURER_USER_SECTION } from 'constants/modules/UserManagement/ManufacturerUserSection';

import { MacIdMaster } from './Dealer/MacIdComponent';
import AssignUserRole from './common/AssignUserRole';
import { ProductMapping } from './Dealer/ProductMapping';
import { BranchMapping } from './Dealer/BranchMapping';

import styles from 'assets/sass/app.module.scss';

const UserMainContainerMaster = (props) => {
    const { userType, currentSection } = props;

    const RenderUserManagementSections = () => {
        switch (userType) {
            case USER_TYPE_USER.DEALER.id: {
                switch (currentSection) {
                    case DEALER_USER_SECTION?.MAC_ID.id: {
                        return <MacIdMaster {...props} />;
                    }
                    case DEALER_USER_SECTION?.ASSIGN_USER_ROLES.id: {
                        return <AssignUserRole {...props} />;
                    }
                    case DEALER_USER_SECTION?.BRANCH_MAPPING.id: {
                        return <BranchMapping {...props} />; //
                    }
                    case DEALER_USER_SECTION?.PRODUCT_MAPPING.id: {
                        return <ProductMapping {...props} />;
                    }
                    default:
                        return <></>;
                }
            }
            case USER_TYPE_USER.MANUFACTURER.id: {
                switch (currentSection) {
                    case MANUFACTURER_USER_SECTION?.ASSIGN_USER_ROLES.id: {
                        return <AssignUserRole {...props} />;
                    }

                    default: {
                        return <></>;
                    }
                }
            }
            default: {
                return <></>;
            }
        }
    };

    return (
        <Row gutter={0}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                <LeftSidebar {...props} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                {RenderUserManagementSections()}
            </Col>
        </Row>
    );
};
export const UserMainContainer = withDrawer(UserMainContainerMaster, { width: '90%', footer: null });
