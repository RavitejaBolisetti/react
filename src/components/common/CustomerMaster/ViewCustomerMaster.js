import React from 'react';
import CommonCard from './CommonCard';
import { Col, Input, Form, Descriptions, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse } from 'antd';
import styles from 'components/common/Common.module.css';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import MacIdCard from './MacIdCard';
import AssignUserRole from './AssignUserRole';
import BranchMapping from './BranchMapping';
import ProductMapping from './ProductMapping';
import { MinusBorderedIcon, PlusBorderedIcon } from 'Icons';
const { Panel } = Collapse;

const ViewCustomerMasterMain = ({ formData, styles, DealerSearchvalue, handleCollapse, openAccordian, productHierarchyData, finalFormdata, AccessMacid, isViewModeVisible, handleDelete, DealerData, setfinalFormdata }) => {
    console.log('AccessMacid in View', AccessMacid);
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        // title: <div className={viewStyle.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    {/* <Descriptions.Item label="Role ID">{formData?.roleId}</Descriptions.Item>
                    <Descriptions.Item label="Role Name">{formData?.roleName}</Descriptions.Item>
                    <Descriptions.Item label="Role Description">{formData?.roleDesceription}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.active === '1' ? 'Active' : 'InActive'}</Descriptions.Item> */}
                </Descriptions>
                <Space
                    direction="vertical"
                    size="middle"
                    styles={{
                        display: 'flex',
                    }}
                >
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
                    <MacIdCard AccessMacid={AccessMacid} handleDelete={handleDelete} isViewModeVisible={isViewModeVisible} />
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            Access Management<span styles={{ color: 'red' }}>*</span>
                        </Col>
                    </Row>

                    <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                        <Panel header={<span className={openAccordian === 1 ? styles.accordianHeader : ''}>Assign User Roles</span>} key="1">
                            <AssignUserRole userRoleOptions={DealerData?.roles} DealerSearchvalue={DealerSearchvalue} finalFormdata={finalFormdata} setfinalFormdata={setfinalFormdata} />
                        </Panel>
                    </Collapse>
                    <Collapse onChange={() => handleCollapse(2)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                        <Panel header={<span className={openAccordian === 2 ? styles.accordianHeader : ''}>Branch Mapping</span>} key="2">
                            <BranchMapping BranchMappingData={DealerData?.branches} finalFormdata={finalFormdata} setfinalFormdata={setfinalFormdata} />
                        </Panel>
                    </Collapse>
                    <Collapse onChange={() => handleCollapse(3)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                        <Panel header={<span className={openAccordian === 3 ? styles.accordianHeader : ''}>Product Mapping</span>} key="3">
                            <ProductMapping ProductMappingData={DealerData?.products} productHierarchyData={productHierarchyData} finalFormdata={finalFormdata} setfinalFormdata={setfinalFormdata} />
                        </Panel>
                    </Collapse>
                </Space>
            </>
        </div>
    );
};

export const ViewCustomerMaster = ViewCustomerMasterMain;
