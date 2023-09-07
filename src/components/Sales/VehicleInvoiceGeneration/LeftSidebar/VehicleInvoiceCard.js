/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar, Typography, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { monthDateFormat, convertDateTime } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text, Title } = Typography;

const expandIcon = ({ isActive }) =>
    isActive ? (
        <>
            <span>See less</span>
            <SlArrowUp size={13} />
        </>
    ) : (
        <>
            <span>See more</span>
            <SlArrowDown size={13} />
        </>
    );

const VehicleInvoiceCard = (props) => {
    const { selectedOrder } = props;
    const fullName = selectedOrder?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <Avatar size={50}>{userAvatar?.toUpperCase()}</Avatar>
                            <div>
                                <Title level={5}>{selectedOrder?.customerName?.toLowerCase()}</Title>
                                <Text>{selectedOrder?.customerId || 'NA'}</Text>
                            </div>
                        </Space>
                        <Divider />
                        <div className={styles.detailCardText}>
                            Invoice No.: <span>{selectedOrder?.invoiceNumber}</span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    Invoice Date: <span>{convertDateTime(selectedOrder?.invoiceDate, monthDateFormat) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    OTF No.: <span>{selectedOrder?.otfNumber || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    OTF Date: <span>{convertDateTime(selectedOrder?.otfDate, monthDateFormat) || 'NA'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default VehicleInvoiceCard;
