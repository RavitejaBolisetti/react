/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar, Typography, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

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

const ProfileDetailCard = (props) => {
    const { selectedRecord, userType, USER_TYPE_USER, formData  } = props;
    const fullName = formData?.userName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';

    return (
        <Collapse bordered={true} defaultActiveKey={[1]} accordion={true} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <Avatar size={50}>{userAvatar?.toUpperCase()}</Avatar>
                            <div>
                                <Title level={5}>{selectedRecord?.customerName || 'NA'}</Title>
                                <Text>{selectedRecord?.customerId || 'NA'}</Text>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
               {userType === USER_TYPE_USER?.DEALER?.id ? (
                <>
                    <p>
                        Employee Code: <span>{selectedRecord?.employeeCode || 'NA'}</span>
                    </p>

                    <Divider />
                    <p>
                        Token No: <span>{selectedRecord?.employeeCode  || 'NA'}</span>
                    </p>
                </>
            ) : (
                <p>
                    Token No  : <span>{selectedRecord?.employeeCode || 'NA'}</span>
                </p>
            )}
            <Divider />
            <p>
                User Name: <span>{selectedRecord?.userName || 'NA'}</span>
            </p>
            <Divider />
            <p>
                Designation: <span>{selectedRecord?.designation || 'NA'}</span>
            </p>
            <Divider />
            <p>
                Mobile Number: <span>{selectedRecord?.mobileNumber || 'NA'}</span>
            </p>
            <Divider />
            <p>
                Email ID: <span>{selectedRecord?.email || 'NA'}</span>
            </p>
            </Panel>
        </Collapse>
    );
};

export default ProfileDetailCard;
