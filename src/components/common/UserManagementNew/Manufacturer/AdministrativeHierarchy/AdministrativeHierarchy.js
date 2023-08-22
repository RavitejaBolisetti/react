/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useMemo } from 'react';
import { Input, Form, Row, Col, Space, Collapse, Tabs, Typography, Card } from 'antd';
import LeftPanel from 'components/common/LeftPanel';

import { generateList } from 'utils/generateList';
import styles from 'components/common/TreeView.module.css';
import style from 'components/common/Common.module.css';
import { DEVICE_TYPE } from 'constants/modules/UserManagement/deviceType';

import { UserManagementFormButton } from '../../UserManagementFormButton/UserManagementFormButton';

const { Search } = Input;
const fieldNames = { title: 'adminName', key: 'adminCode', children: 'children' };


const APPLICATION_WEB = DEVICE_TYPE?.WEB?.key;
const APPLICATION_MOBILE = DEVICE_TYPE?.MOBILE?.key;

const AdministrativeHierarchy = (props) => {
    const { adminDataTree, deviceType, finalFormdata, setfinalFormdata, formActionType, section } = props;
    const [searchValue, setSearchValue] = useState();
    const [adminData, setAdminData] = useState();
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [defaultCheckedKeysMangement, setdefaultCheckedKeysMangement] = useState([]);

    const flattenAdmnList = useMemo(() => generateList(adminDataTree), [adminDataTree]);
    const checkKey = (data, key) => data?.includes(key);

    const fnMapData = ({ data, fieldNames, selectedKeys }) =>
        data?.map((item) =>
            item?.[fieldNames?.children]
                ? {
                      ...item,
                      checked: checkKey(selectedKeys, item?.[fieldNames?.key]),
                      children: fnMapData({ data: item?.[fieldNames?.children], fieldNames, selectedKeys }),
                  }
                : {
                      ...item,
                      checked: checkKey(selectedKeys, item?.[fieldNames?.key]),
                  }
        );

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    // const onCheck = (checkVal) => {
    //     if (formActionType?.viewMode) return;
    //     setCheckedKeys(checkVal);
    // };
    const onCheck =
        // (currentKey) =>
        (checkedKeysValue, { halfCheckedKeys }) => {
            setdefaultCheckedKeysMangement({ ...defaultCheckedKeysMangement, ...checkedKeysValue });
            // handleFormValueChange();
            const selectedKeys = [...checkedKeysValue, ...halfCheckedKeys] || [];
            // const deviceTypePrev = checkedKeys?.[deviceType] ? checkedKeys[deviceType] : {};
            // setCheckedKeys(selectedKeys.length !== 0 ? { ...checkedKeys, [deviceType]: { ...deviceTypePrev, [currentKey]: [currentKey, ...selectedKeys] } } : []);
            setCheckedKeys(checkedKeysValue);

            // const mapSelectedKeyData = (data) =>
            //     data?.map((item) =>
            //         item.value === currentKey
            //             ? {
            //                   ...item,
            //                   checked: true,
            //                   children: item?.children && fnMapData({ data: item?.children, fieldNames, selectedKeys }),
            //               }
            //             : { ...item }
            //     );

            setAdminData(fnMapData({ data: adminDataTree, fieldNames, selectedKeys }));

            // if (deviceType === APPLICATION_WEB) {
            //     setWebApplications(mapSelectedKeyData(webApplications));
            // } else if (deviceType === APPLICATION_MOBILE) {
            //     setMobileApplications(mapSelectedKeyData(mobileApplications));
            // }
        };

    const handleDefaultCheckedKeys = (Mode, keys, checkedMenuKeys) => {
        console.log('🚀 ~ file: AdministrativeHierarchy.js:82 ~ ProductMapping ~ Mode, keys, checkedMenuKeys:', Mode, keys, checkedMenuKeys);
    };

    const myProps = {
        fieldNames,
        treeData: adminDataTree,
        searchValue,
        setSearchValue,
        checkable: true,
        isTreeViewVisible: true,
        onCheck: onCheck,
        disableCheckbox: formActionType?.viewMode,
        checkedKeys: checkedKeys,
    };

    const buttonProps = {...props};

    return (
        <>
            <Row gutter={20} className={style.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title}</h2>
                    <Card>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label={''} name="search" validateTrigger={['onSearch']}>
                                    <Search placeholder="Search" initialValue={searchValue} onChange={handleSearchValue} allowClear />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={`${styles.roleTree} ${style.marB20}`}>
                                <LeftPanel {...myProps} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <UserManagementFormButton {...buttonProps}/>
        </>
    );
};

export default AdministrativeHierarchy;
