/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState,useEffet  } from 'react';
import { Row, Col, Button, Space, TreeSelect } from 'antd';

import RoleCard from './RoleCard';
// import dummyMenuData from './../../RoleManagement/Treedata.json';

import { preparePlaceholderText } from 'utils/preparePlaceholder';

const dummyMenuData = [{}];
const roleList = [
    { roleName: 'role1', id: 'R001', disabled: false },
    { roleName: 'role2', id: 'R0l2', disabled: true },
    { roleName: 'role3', id: 'R0l3', disabled: false },
    { roleName: 'role4', id: 'R0l4', disabled: true },
];

const fieldNames = { label: 'roleName', value: 'id', disabled: 'status' };

const AssignUserRole = ({ userRoleOptions, DealerSearchvalue, finalFormdata, setfinalFormdata }) => {
    const [selectedRole, setSelectedRole] = useState([]);
    const [openRoleAccordian, setOpenRoleAccordian] = useState('');
    const [addedRoles, setAddedRoles] = useState([]);

    const [checkedKeys, setCheckedKeys] = useState([]);
    const [webApplications, setWebApplications] = useState({ roleId: { M: { parentApp: [] }, W: dummyMenuData } }); //{'roleId': {'M': {'parentApp' : [], 'W': dummyMenuData }}
    const [mobileApplications, setMobileApplications] = useState({ roleId: { M: [], W: [] } });
    const [deviceType, setDeviceType] = useState('W');
    const [defaultCheckedKeysMangement, setdefaultCheckedKeysMangement] = useState([]);
   
    // useEffet(() => {

    // },[])

    const handleAddRole = () => {
        setAddedRoles(selectedRole);
        //  on selection of role aip will call and role device type application will be fetch and stored in state
        
        let roleAppObj = {};
        let roleAppCheckedKeyObj = {};
        // selectedRole?.forEach((i) => (roleAppObj[i?.value] = { W: [...dummyMenuData], M: {} }));
        selectedRole?.forEach((i) => (roleAppObj[i?.value] = { deviceType: [...dummyMenuData], M: {} }));
        setWebApplications((prev) => ({ ...roleAppObj, ...prev }));
        setMobileApplications();

        selectedRole?.forEach((i) => (roleAppObj[i?.value] = { W: [...dummyMenuData], M: {} }));
        // setCheckedKeys()

    };


    const handleExpandCard = (key) => {
        setOpenRoleAccordian((prev) => (prev === key ? '' : key));
    };

    const onSelectRoles = (newValue) => {
        setSelectedRole(newValue);
    };

    const handleRemoveRole = (key) => {
        setAddedRoles((prev) => {
            const updatedRoles = [...prev];
            const index = prev?.findIndex((el) => el?.value === key);
            updatedRoles?.splice(index, 1);
            return updatedRoles;
        });
        setSelectedRole((prev) => {
            const updatedRoles = [...prev];
            const index = prev?.findIndex((el) => el?.value === key);
            updatedRoles?.splice(index, 1);
            return updatedRoles;
        });
    };

    const roleProps = {
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
        handleExpandCard,
        openRoleAccordian,
        handleRemoveRole
    };

    const roleSelectProp = {
        fieldNames,
        // allowSearch:true,
        showSearch: true,
        labelInValue: true,
        treeCheckable: true,
        treeData: roleList,
        value: selectedRole,
        onChange: onSelectRoles,
        onDeselect: handleRemoveRole,
        placeholder: preparePlaceholderText('select user Role'),
        style: {
            width: '100%',
        },
    };

    return (
        <Space
            direction="vertical"
            size="middle"
            style={{
                display: 'flex',
            }}
        >
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div>Assign User Roles</div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <TreeSelect {...roleSelectProp} />
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Button onClick={handleAddRole} form="myForm" key="Add" type="primary">
                        Add
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {addedRoles?.map((role, index) => (
                        <RoleCard {...role} {...roleProps} index={index}  />
                    ))}
                </Col>
            </Row>
            {/* <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {addroles &&
                        checked?.map((el) => {
                            return (
                                <Card className={style.usermanagementCard}>
                                    <Row gutter={20}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                    {el['0']?.roleName}
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                    <div>
                                                        Role id: <span>{DealerSearchvalue}</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <div className={styles.cardItemBtn}>
                                                <Button className={style3.dealerBtn} type="primary" ghost onClick={handleApplicationAccess}>
                                                    <PlusOutlined /> Application Access
                                                </Button>
                                                <Button className={style.crossButton} type="danger">
                                                    <AiOutlineClose />
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            );
                        })}
                </Col>
            </Row> */}
        </Space>
    );
};

export default AssignUserRole;
