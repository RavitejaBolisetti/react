/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Button, Space, Card, Collapse } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { AiOutlinePlusSquare } from 'react-icons/ai';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';
import style4 from './UserManagementManufacturer.module.css';
import AssignUserRolesMunfacturer from './AssignUserRolesMunfacturer';
import AssignProducts from './AssignProducts';
import AdministrativeHierarchyAccess from './AdministrativeHierarchyAccess';

import { ViewUserManagementDealer } from './ViewUserManagementDealer';

const { Panel } = Collapse;
const AddEditFormMain = (props) => {
    const { onCloseAction, productHierarchyData, DealerSearchvalue, onFinishFailed, onFinish, form, formData, DealerData } = props;
    const { isFormBtnActive, setFormBtnActive, isViewModeVisible, setClosePanels } = props;

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const onChangeCollapse = (collapse) => {};

    const viewProps = {
        isVisible: isViewModeVisible,
        setClosePanels,
        formData,
        styles,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Card className={style4.usermanagementCard}>
                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                Token No
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <div className={style4.usermanagementCardTextLeft}> {DealerSearchvalue}</div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <div className={styles.floatRight}>User Name</div>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <div className={style4.usermanagementCardTextRight}> {DealerData.employeeName}</div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={style4.manageAccessHeader}>
                                <p>
                                    Access Management<span>*</span>
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Space
                                direction="vertical"
                                size="large"
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                }}
                            >
                                <Collapse onChange={onChangeCollapse} expandIcon={() => <AiOutlinePlusSquare />}>
                                    <Panel header="Assign User Roles" key="1">
                                        <AssignUserRolesMunfacturer userRoleOptions={DealerData?.employeeRoles} DealerSearchvalue={DealerSearchvalue} />
                                    </Panel>
                                </Collapse>
                                <Collapse onChange={onChangeCollapse} expandIcon={() => <AiOutlinePlusSquare />}>
                                    <Panel header="Administrative Hierarchy Access" key="2">
                                        <AdministrativeHierarchyAccess BranchMappingData={DealerData?.branches} />
                                    </Panel>
                                </Collapse>
                                <Collapse onChange={onChangeCollapse} expandIcon={() => <AiOutlinePlusSquare />}>
                                    <Panel header="Assign Products" key="3">
                                        <AssignProducts ProductMappingData={DealerData?.products} productHierarchyData={productHierarchyData} />
                                    </Panel>
                                </Collapse>
                            </Space>
                        </Col>
                    </Row>
                </Space>
            ) : (
                <ViewUserManagementDealer {...viewProps} />
            )}
            <Row gutter={20} className={styles.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                    <Button danger onClick={onCloseAction}>
                        Cancel
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                    <Button htmlType="submit" type="primary" disabled={!isFormBtnActive}>
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
