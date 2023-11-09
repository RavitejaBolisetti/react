/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar, Divider, Typography } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
const { Panel } = Collapse;
const { Text, Title } = Typography;

const expandIcon = ({ isActive }) =>
    isActive ? (
        <>
            <span>{translateContent('global.buttons.seeLess')}</span>
            <SlArrowUp size={13} />
        </>
    ) : (
        <>
            <span>{translateContent('global.buttons.seeMore')}</span>
            <SlArrowDown size={13} />
        </>
    );

const ProfileDetailCard = (props) => {
    const { selectedRecord, formData } = props;
    const fullName = formData?.manufacturerUserName?.split(' ') || formData?.userName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';

    return (
        <Collapse bordered={true} defaultActiveKey={[1]} accordion={true} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <Avatar size={50}>{userAvatar?.toUpperCase()}</Avatar>
                            <div>
                                <Title level={5}>{formData?.manufacturerUserName || formData?.userName}</Title>
                                {selectedRecord?.employeeCode && <Text>{`${translateContent('userManagement.label.tokenNumber')}:  ${selectedRecord?.employeeCode}`} </Text>}
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('userManagement.label.userName')}: <span>{selectedRecord?.manufacturerUserName || formData?.userName || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('userManagement.label.designation')}: <span>{selectedRecord?.designation || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('userManagement.label.mobileNumber')}: <span>{selectedRecord?.mobileNumber ? `${selectedRecord?.mobileNumber?.slice(selectedRecord?.mobileNumber?.length - 10, selectedRecord?.mobileNumber?.length)}` : 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('userManagement.label.emailId')}: <span>{selectedRecord?.email || 'NA'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default ProfileDetailCard;
