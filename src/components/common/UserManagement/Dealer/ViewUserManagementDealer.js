/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Descriptions, Row, Button, Space, Collapse } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';

import CommonCard from './../UserInfoCard';
// import MacIdCard from './../MacIdCard';
import AssignUserRole from './../AssignUserRole/AssignUserRole';
import BranchMapping from './../BranchMapping';
import ProductMapping from './../ProductMapping';

const { Panel } = Collapse;

const ViewUserManagementDealerMain = ({ formData, styles, DealerSearchvalue, handleCollapse, openAccordian, productHierarchyData, finalFormdata, AccessMacid, isViewModeVisible, handleDelete, DealerData, setfinalFormdata }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <>
            <div className={styles.viewContainer}>
                <Descriptions {...viewOneColProps}>
                    <Space direction="vertical">
                        <CommonCard DealerData={DealerData} />

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label="MAC ID" name="macid">
                                    <Input disabled={true} placeholder={preparePlaceholderText('MAC id')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Button disabled={true}>Add</Button>
                            </Col>
                        </Row>
                        {/* <MacIdCard AccessMacid={AccessMacid} handleDelete={handleDelete} isViewModeVisible={isViewModeVisible} /> */}
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                Access Management<span style={{ color: 'red' }}>*</span>
                            </Col>
                        </Row>

                        <Collapse onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} activeKey={openAccordian}>
                            <Panel header="Assign User Roles" key="1">
                                <AssignUserRole userRoleOptions={DealerData?.roles} DealerSearchvalue={DealerSearchvalue} finalFormdata={finalFormdata} setfinalFormdata={setfinalFormdata} />
                            </Panel>
                        </Collapse>

                        <Collapse onChange={() => handleCollapse(2)} expandIcon={accordianExpandIcon} activeKey={openAccordian}>
                            <Panel header="Branch Mapping" key="2">
                                <BranchMapping BranchMappingData={DealerData?.branches} finalFormdata={finalFormdata} setfinalFormdata={setfinalFormdata} />
                            </Panel>
                        </Collapse>

                        <Collapse onChange={() => handleCollapse(3)} expandIcon={accordianExpandIcon} activeKey={openAccordian}>
                            <Panel header="Product Mapping" key="3">
                                <ProductMapping ProductMappingData={DealerData?.products} productHierarchyData={productHierarchyData} finalFormdata={finalFormdata} setfinalFormdata={setfinalFormdata} />
                            </Panel>
                        </Collapse>
                    </Space>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewUserManagementDealer = ViewUserManagementDealerMain;
