/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Typography, Card, Space, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RxCross2 } from 'react-icons/rx';

import { ApplicationTree } from './ApplicationTree';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const formActionType = { addMode: false, viewMode: false, editMode: true };
const RoleCard = (props) => {
    const { label, value } = props;
    const { openRoleAccordian, handleExpandCard, handleRemoveRole } = props;
    const { checkedKeys, setCheckedKeys, webApplications, setWebApplications, mobileApplications, setMobileApplications, deviceType, setDeviceType, defaultCheckedKeysMangement, setdefaultCheckedKeysMangement } = props;

    const appTreeProps = {
        roleCode: value,
        openRoleAccordian,
        formActionType,
        checkedKeys,
        setCheckedKeys,
        webApplications,
        setWebApplications,
        mobileApplications,
        setMobileApplications,
        deviceType,
        setDeviceType,
        defaultCheckedKeysMangement,
        setdefaultCheckedKeysMangement,
    };

    return (
        <>
            <Card key={'rid' + value} className="">
                <Row justify={'space-between'}>
                    <div>
                        <Text strong>{label}</Text>
                        <br />
                        <Text type="secondary">Role ID: {value} </Text>
                    </div>
                    <div>
                        <Button onClick={() => handleExpandCard(value)} type="link" icon={<PlusOutlined />}>
                            Application Access
                        </Button>
                        <Button onClick={() => handleRemoveRole(value)} type="link" icon={<RxCross2 />} />
                    </div>
                </Row>
                {openRoleAccordian === value && (
                    <>
                        <Divider />
                        <Space direction="vertical" style={{ width: '100%' }} className={styles.accordianContainer}>
                            <ApplicationTree {...appTreeProps} />
                        </Space>
                    </>
                )}
            </Card>
        </>
    );
};

export default RoleCard;
