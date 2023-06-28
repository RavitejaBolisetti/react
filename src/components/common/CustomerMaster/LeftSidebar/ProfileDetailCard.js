/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

const { Panel } = Collapse;
const expandIcon = ({ isActive }) => (isActive ? <SlArrowUp size={13} /> : <SlArrowDown size={13} />);

const ProfileDetailCard = (props) => {
    const { selectedCustomer } = props;
    const fullName = selectedCustomer?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';
    return (
        <Collapse collapsible={'icon'} bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon}>
            <Panel
                header={
                    <>
                        <Space direction="vertical">
                            <Avatar size={60}>{userAvatar?.toUpperCase()}</Avatar>
                            <div>
                                <p>
                                    <span>{selectedCustomer?.customerName}</span>
                                </p>
                                <p>{selectedCustomer?.customerId}</p>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                <p>
                    Customer Type: <span>{selectedCustomer?.customerTypeName}</span>
                </p>
                <p>
                    Mobile No.: <span>{selectedCustomer?.mobileNumber}</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default ProfileDetailCard;
