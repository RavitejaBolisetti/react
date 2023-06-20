/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

const { Panel } = Collapse;
const expandIcon = ({ isActive }) => (isActive ? <SlArrowUp size={18} /> : <SlArrowDown size={18} />);

const ProfileDetailCard = (props) => {
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon}>
            <Panel
                header={
                    <>
                        <Space direction="vertical">
                            <Avatar size={80}>JM</Avatar>
                            <div>
                                <p>
                                    <span>John Michael</span>
                                </p>
                                <p>4962946</p>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                <p>
                    Customer Type: <span>Corporate</span>
                </p>
                <p>
                    Mobile No.: <span>9893473843</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default ProfileDetailCard;
