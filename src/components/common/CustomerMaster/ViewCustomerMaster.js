import React from 'react';
import { Col, Input, Form, Descriptions, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse } from 'antd';
import styles from 'components/common/Common.module.css';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { MinusBorderedIcon, PlusBorderedIcon } from 'Icons';
const { Panel } = Collapse;

const ViewCustomerMasterMain = ({ formData, styles, DealerSearchvalue, handleCollapse, openAccordian, productHierarchyData, finalFormdata, AccessMacid, isViewModeVisible, handleDelete, DealerData, setfinalFormdata }) => {
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
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            Access Management<span styles={{ color: 'red' }}>*</span>
                        </Col>
                    </Row>
                </Space>
            </>
        </div>
    );
};

export const ViewCustomerMaster = ViewCustomerMasterMain;
