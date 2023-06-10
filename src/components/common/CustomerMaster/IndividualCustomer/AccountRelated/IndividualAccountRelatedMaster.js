import React, { useState } from 'react';

import { Row, Col, Collapse, Form, Select, Button, Space, Typography } from 'antd';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from '../../FirmOrCompany/AccountRelated/ViewAccountDetails';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const AccountRelatedBase = (props) => {
    const { onCloseAction, isViewModeVisible } = props;

    const [openAccordian, setOpenAccordian] = useState([1]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };
    const viewProps = {
        styles,
    };

    return (
        <>
            <h2>Account Related</h2>
            {!isViewModeVisible ? (
                <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                    <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus /> : <AiOutlinePlus />)} activeKey={openAccordian} expandIconPosition="end">
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <FaRegUserCircle className={styles.userCircle} />
                                    <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                        Individual Account
                                    </Text>
                                </div>
                            }
                            key="1"
                        >
                            <AddEditForm {...props} />
                        </Panel>
                    </Collapse>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Button danger onClick={onCloseAction}>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Button type="primary" className={styles.floatRight}>
                                Save & Proceed
                            </Button>
                        </Col>
                    </Row>
                </Space>
            ) : (
                <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus /> : <AiOutlinePlus />)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel
                        header={
                            <div className={styles.alignUser}>
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Indivisual Account
                                </Text>
                            </div>
                        }
                        key="1"
                    >
                        <ViewDetail {...viewProps} />
                    </Panel>
                </Collapse>
            )}
        </>
    );
};

export const IndividualAccountRelatedMaster = AccountRelatedBase;
