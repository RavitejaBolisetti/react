/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Card, Typography, Divider } from 'antd';

import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';

import styles from 'components/common/Common.module.css';
// import style from './UserManagement.module.css';

const { Text } = Typography;
// Manufacturer Summary
const selectedRecord = {
    'Token No': 'B6G431',

    'User Name:': 'John Doe',
    ' Designation': 'Chief Sales Officer',
    'Mobile Number': '9664321226',
    'Email ID': 'john doe@mahindra.com',
};

const ddata = {
    'Employee Code:': 'D6G431',
    'Dealer Name:': 'Dealer 1',

    'User Name:': 'John Doe',
    'Designation:': 'Chief Sales Officer',
    'Mobile Number:': '9664321226',
    'Email ID:': 'john@mahindra.com',
};

const UserInfoCard = ({ selectedRecord, userType }) => {
    return (
        <Card className={styles.userManagementCard}>
            {userType === USER_TYPE_USER?.DEALER?.id ? (
                <>
                    <p>
                        Employee Code: <span>{selectedRecord?.employeeCode}</span>
                    </p>

                    <Divider />
                    <p>
                        Token No: <span>{selectedRecord?.tokenNumber}</span>
                    </p>
                </>
            ) : (
                <p>
                    Token No  : <span>{selectedRecord?.tokenNumber}</span>
                </p>
            )}
            <Divider />
            <p>
                User Name: <span>{selectedRecord?.userName}</span>
            </p>
            <Divider />
            <p>
                Designation: <span>{selectedRecord?.designation}</span>
            </p>
            <Divider />
            <p>
                Mobile Number: <span>{selectedRecord?.employeeCode}</span>
            </p>
            <Divider />
            <p>
                Email ID: <span>{selectedRecord?.employeeCode}</span>
            </p>
        </Card>
    );
};

export default UserInfoCard;
