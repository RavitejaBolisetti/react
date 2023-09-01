/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Dropdown, Menu } from 'antd';
import Icon from '@ant-design/icons';

import styles from 'utils/tableColumn.module.scss';
const myMenuAction = (actions, moduleType) => (props) => (record) => {
    return (
        <Menu>
            {actions.map((action, index) => {
                return (
                    <Menu.Item key={index} onClick={action.handler(props)(record)}>
                        {action.title}
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};

const customActionDropDown = (actions, moduleType) => (props) => (record) => {
    const myAction = myMenuAction(actions, moduleType)(props)(record);

    return record.isReadOnly ? (
        <>
            {<span className={styles.mobData}>{'Actions'} :</span>}
            <Icon type="ellipsis" style={{ fontSize: '36px' }} />
        </>
    ) : (
        <Dropdown overlay={myAction} trigger={['click']}>
            <a className="ant-dropdown-link" href="/">
                {<span className={styles.mobData}>{'Actions'} :</span>}
                <Icon type="ellipsis" style={{ fontSize: '36px' }} />
            </a>
        </Dropdown>
    );
};

export const tableColumnActions =
    ({ title, customActions, moduleType }) =>
    (props) => {
        const myActionDropDown = customActionDropDown(customActions, moduleType)(props);

        return {
            title,
            render: (record) => myActionDropDown(record),
        };
    };
