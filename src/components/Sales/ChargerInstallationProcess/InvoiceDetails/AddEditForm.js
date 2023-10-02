/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Collapse, Typography, Divider, Button, Descriptions, Card, Space } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { expandIcon } from 'utils/accordianExpandIcon';

import { convertDateToCalender } from 'utils/formatDateTime';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { PlusOutlined } from '@ant-design/icons';
import { AddRequestModal } from './AddRequestModal';
import { FilterIcon } from 'Icons';

const { Search } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, invoiceDetailForm, formActionType } = props;
    const [chargerDetails, setChargerDetails] = useState(false);
    const [activeKey, setActiveKey] = useState([]);
    const [addRequestVisible, setAddRequestVisible] = useState(false);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const handleBookingNumberSearch = () => {
        setChargerDetails(true);
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };

    const onAdvanceSearchCloseAction = () => {
        setAddRequestVisible(false);
    };
    const addRequestProps = {
        isVisible: addRequestVisible,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Add Request',
        onCloseAction: onAdvanceSearchCloseAction,
        onAdvanceSearchCloseAction,
    };

    const handleAddRequestChange = () => {
        setAddRequestVisible(true);
    };

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={18}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.bookingNumber || formData?.otfNumber} label="Booking Number" name="otfNumber" rules={[validateRequiredSelectField('Booking Number')]}>
                                            <Search maxLength={50} placeholder={preparePlaceholderText('Booking Number')} onSearch={(value) => handleBookingNumberSearch(value)} allowClear />
                                        </Form.Item>
                                    </Col>
                                    {chargerDetails && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formData?.bookimgStatus} label="Booking Status" name="bookingStatus">
                                                <Input placeholder={preparePlaceholderText('Booking Status')} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                    )}
                                </Row>

                                {chargerDetails && (
                                    <>
                                        <Divider />
                                        <Descriptions {...viewProps}>
                                            <Descriptions.Item label="Model Group">XUV 400</Descriptions.Item>
                                            <Descriptions.Item label="Model Variant">W 10</Descriptions.Item>
                                            <Descriptions.Item label="Seating Capacity">5</Descriptions.Item>
                                            <Descriptions.Item label="Color">Pear White</Descriptions.Item>
                                            <Descriptions.Item label="Model Code">EV</Descriptions.Item>
                                        </Descriptions>
                                    </>
                                )}
                            </Card>
                            {chargerDetails && (
                                <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                                    <Panel
                                        header={
                                            <Row type="flex" justify="space-between" align="middle" size="large">
                                                <Row type="flex" justify="space-around" align="middle">
                                                    <Typography>Add Request</Typography>

                                                    {!formActionType?.viewMode && (
                                                        <Button type="primary" onClick={handleAddRequestChange} icon={<PlusOutlined />}>
                                                            Add
                                                        </Button>
                                                    )}
                                                </Row>
                                            </Row>
                                        }
                                        key="1"
                                    ></Panel>
                                </Collapse>
                            )}
                        </Space>
                    </Col>
                </Row>
            </div>
            <AddRequestModal {...addRequestProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
