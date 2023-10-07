/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import styles from 'assets/sass/app.module.scss';
import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';

const { Panel } = Collapse;

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
    const { selectedRecord, userType, formData } = props;
    const fullName = formData?.manufacturerUserName?.split(' ') || formData?.userName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';

    return (
        <Collapse bordered={true} defaultActiveKey={[1]} accordion={true} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <Avatar size={50}>{userAvatar?.toUpperCase()}</Avatar>
                            {/* <Title level={5}>{formData?.manufacturerUserName || formData?.userName}</Title> */}
                        </Space>
                    </>
                }
                key={1}
            >
                <Divider />
                {userType === USER_TYPE_USER?.DEALER?.id ? (
                    <div className={styles.detailCardText}>
                        Employee Code: <span>{selectedRecord?.employeeCode || 'NA'}</span>
                    </div>
                ) : (
                    <div className={styles.detailCardText}>
                        Token No: <span>{selectedRecord?.employeeCode || 'NA'}</span>
                    </div>
                )}
                <Divider />
                <div className={styles.detailCardText}>
                    User Name: <span>{selectedRecord?.manufacturerUserName ||formData?.userName ||  'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Designation: <span>{selectedRecord?.designation || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Mobile Number: <span>{selectedRecord?.mobileNumber ? `${selectedRecord?.mobileNumber?.slice(selectedRecord?.mobileNumber?.length - 10, selectedRecord?.mobileNumber?.length)}` : 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Email ID: <span>{selectedRecord?.email || 'NA'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default ProfileDetailCard;
