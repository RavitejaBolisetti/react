/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar, Typography, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';

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

const OTFDetailCard = (props) => {
    const { selectedOrder, typeData } = props;
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
                                <Text>{selectedOrder?.customerId || ''}</Text>
                            </div>
                        </Space>
                        <Divider />
                        <div className={styles.detailCardText}>
                            Booking No.: <span>{selectedOrder?.bookingNumber || selectedOrder?.otfNumber}</span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    Customer Type: <span>{selectedOrder && getCodeValue(typeData?.[PARAM_MASTER?.CUST_TYPE?.id], selectedOrder?.customerType)}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Mobile No.: <span>{selectedOrder?.mobileNumber ? selectedOrder?.mobileNumber : 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Booking Date: <span>{convertDateTime(selectedOrder?.otfDate, dateFormatView) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Model: <span>{selectedOrder?.model || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    CPD: <span>{convertDateTime(selectedOrder?.cpd, dateFormatView) || 'NA'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default OTFDetailCard;
