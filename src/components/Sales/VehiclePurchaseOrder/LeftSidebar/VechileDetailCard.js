/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar, Typography } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

const { Panel } = Collapse;
const { Title } = Typography;

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

const VechileDetailCard = (props) => {
    const { selectedRecord, selectedRecordId } = props;
    const fullName = selectedRecord?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1]?.slice(0, 1) : '') : '';
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <Avatar size={50}>{userAvatar?.toUpperCase()}</Avatar>
                            <div>
                                <Title level={5} style={{ textTransform: 'capitalize' }}>
                                    {selectedRecord?.customerName?.toLowerCase()}
                                </Title>
                                <div>
                                    VIN.: <span>{selectedRecordId}</span>
                                </div>
                                <div>
                                    Reg No.: <span>{selectedRecord?.registrationNumber}</span>
                                </div>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                <p>
                    Customer ID: <span>{selectedRecord?.customerCode}</span>
                </p>
                <p>
                    Mobile No.: <span>{selectedRecord?.mobileNumber || 'NA'}</span>
                </p>
                <p>
                    Model: <span>{selectedRecord?.model || 'NA'}</span>
                </p>

                <p>
                    Color: <span>{selectedRecord?.color || 'NA'}</span>
                </p>
                <p>
                    MFG Warrenty: <span>{selectedRecord?.mfgWarranty || 'NA'}</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default VechileDetailCard;
