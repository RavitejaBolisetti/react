/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer, useEffect } from 'react';
import { Col, Form, Row, Space, Collapse, Divider } from 'antd';

import { expandIcon } from 'utils/accordianExpandIcon';

import { DrawerFormButton } from 'components/common/Button';
import { withDrawer } from 'components/withDrawer';

import AssignUserRole from './AssignUserRole/AssignUserRole';
import BranchMapping from './BranchMapping';
// import {ProductMapping} from './Dealer/ProductMapping';
import ProductMapping from './ProductMapping';
import UserInfoCard from './UserInfoCard';
import MacIdMain from './MacIdComponent/MacIdMain';

import AdministrativeHierarchy from './Manufacturer/AdministrativeHierarchy';

import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

import style3 from './UserManagement.module.scss';
//import style3 from './UserManagement.module.css';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { handleButtonClick, onCloseAction, buttonData, setButtonData, formData } = props;
    const { productHierarchyData, onFinishFailed, onFinish, form, dealerData } = props;
    const { setFormBtnActive, isViewModeVisible, setClosePanels, AccessMacid, formActionType } = props;
    const { selectedRecord, finalFormdata, setfinalFormdata, userType, productDataTree, adminDataTree } = props;

    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [openAccordian, setOpenAccordian] = useState(1);

    // useEffect(() => {
    //     setfinalFormdata({ ...finalFormdata, Macid: AccessMacid });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [AccessMacid]);

    const handleFormFieldChange = () => {
        setButtonData((prev) => ({ ...prev, formBtnActive: true }));
    };

    const handleFormValueChange = () => {
        setButtonData((prev) => ({ ...prev, formBtnActive: true }));
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    // const viewProps = {
    //     isVisible: isViewModeVisible,
    //     handleCollapse,
    //     openAccordian,
    //     setClosePanels,
    //     finalFormdata,
    //     dealerData,
    //     setfinalFormdata,
    //     styles,
    //     isViewModeVisible,
    //     AccessMacid,
    //     productHierarchyData,
    // };

    const accordianProps = {
        formActionType,
        finalFormdata,
        setfinalFormdata,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <UserInfoCard userType={userType} selectedRecord={selectedRecord} />

                    {userType === USER_TYPE_USER?.DEALER?.id && <MacIdMain {...accordianProps} />}

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={style3.manageAccessHeader}>
                                <p>
                                    Access Management<span>*</span>
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian}>
                                <Panel header="Assign User Roles" key="1">
                                    <Divider />
                                    <AssignUserRole {...accordianProps} userRoleOptions={dealerData?.roles} />
                                </Panel>
                            </Collapse>

                            {userType === USER_TYPE_USER?.DEALER?.id ? (
                                <Collapse onChange={() => handleCollapse(2)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian}>
                                    <Panel header="Branch Mapping" key="2">
                                        <Divider />
                                        <BranchMapping {...accordianProps} forceUpdate={forceUpdate} />
                                    </Panel>
                                </Collapse>
                            ) : (
                                <Collapse onChange={() => handleCollapse(2)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian}>
                                    <Panel header="Administrative Hierarchy Mapping" key="2">
                                        <Divider />
                                        <AdministrativeHierarchy {...accordianProps} adminDataTree={adminDataTree} />
                                    </Panel>
                                </Collapse>
                            )}

                            <Collapse onChange={() => handleCollapse(3)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian}>
                                <Panel header="Product Mapping" key="3">
                                    <Divider />
                                    <ProductMapping {...accordianProps} productDataTree={productDataTree} />
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
