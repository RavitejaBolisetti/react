/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { convertDateTime } from 'utils/formatDateTime';

const { Panel } = Collapse;
const expandIcon = ({ isActive }) => (isActive ? <SlArrowUp size={18} /> : <SlArrowDown size={18} />);

const OTFDetailCard = (props) => {
    const { selectedOrder } = props;
    const fullName = selectedOrder?.customerName?.split('');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon}>
            <Panel
                header={
                    <>
                        <Space direction="vertical">
                            <Avatar size={60}>{userAvatar?.toUpperCase()}</Avatar>
                            <div>
                                <p>
                                    <span>{selectedOrder?.otfNumber}</span>
                                </p>
                                <p>{selectedOrder?.customerId}</p>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                <p>
                    Customer Type: <span>{selectedOrder?.customerType || 'NA'}</span>
                </p>
                <p>
                    Mobile No.: <span>{selectedOrder?.mobileNumber || 'NA'}</span>
                </p>
                <p>
                    OTF Date: <span>{convertDateTime(selectedOrder?.otfDate, 'DD MMM YYYY') || 'NA'}</span>
                </p>
                <p>
                    Model: <span>{selectedOrder?.model || 'NA'}</span>
                </p>
                <p>
                    CPD: <span>{selectedOrder?.cpd || 'NA'}</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default OTFDetailCard;
