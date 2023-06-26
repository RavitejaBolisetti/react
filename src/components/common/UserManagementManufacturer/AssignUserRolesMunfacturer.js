/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Select, Button, Space, Card, Checkbox } from 'antd';
import style4 from './UserManagementManufacturer.module.css';

import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const AssignUserRolesMunfacturer = ({ userRoleOptions, DealerSearchvalue }) => {
    const [checked, setchecked] = useState([]);
    const [addroles, setaddroles] = useState();
    const FindRoleDetails = (option) => {
        return userRoleOptions?.filter((el) => {
            return el?.roleName === option;
        });
    };

    const onChange = (values) => {
        const newValues = [];
        Object.entries(values).forEach(([key, value]) => {
            const SelectedDetails = FindRoleDetails(value);
            newValues.push(SelectedDetails);
        });
        setchecked(newValues);
    };
    const onChanges = () => {};
    const handleApplicationAccess = () => {};
    const handleSelectAdd = () => {
        setaddroles(true);
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
                    <Select
                        mode="multiple"
                        style={{
                            width: '100%',
                        }}
                        placeholder="Select user Role"
                        onChange={onChange}
                        optionLabelProp="label"
                    >
                        {userRoleOptions?.map((el) => {
                            return (
                                <Option value={el?.roleName} label={el?.roleName}>
                                    <Checkbox name={el?.roleName} onChange={onChanges}>
                                        {el?.roleName}
                                    </Checkbox>
                                </Option>
                            );
                        })}
                    </Select>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Button onClick={handleSelectAdd} form="myForm" key="Add" type="primary">
                        Add
                    </Button>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {addroles &&
                        checked?.map((el) => {
                            return (
                                <Card className={style4.usermanagementCard}>
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
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                    <Button className={style4.dealerBtn} type="primary" ghost onClick={handleApplicationAccess}>
                                                        <PlusOutlined /> Application Access
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            );
                        })}
                </Col>
            </Row>
        </Space>
    );
};

export default AssignUserRolesMunfacturer;
