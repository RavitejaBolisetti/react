import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Checkbox } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import style from 'components/common/DrawerAndTable.module.css';
const { Option } = Select;
const AssignUserRole = ({ userRoleOptions }) => {
    const [checked, setchecked] = useState([]);
    const FindRoleDetails = (option) => {
        return userRoleOptions?.filter((el) => {
            return el?.roleName === option;
        });
    };
    useEffect(() => {
        console.log('These are the Roles :', userRoleOptions);
        console.log('These checked :', checked);
    }, [userRoleOptions, checked]);
    const onChange = (values) => {
        console.log('Values : ', values, 'Type of Values', typeof values);
        const newValues = [];
        Object.entries(values).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
            const SelectedDetails = FindRoleDetails(value);
            newValues.push(SelectedDetails);
        });
        setchecked(newValues);
    };
    const onChanges = () => {};
    const handleSelectAdd = () => {};
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
                    {/* <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'tom',
                                label: 'Tom',
                            },
                        ]}
                    /> */}
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
                    {checked?.map((el) => {
                        return (
                            <Card className={style.usermanagementCard}>
                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                Employee Code
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}></Col>
                                        </Row>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}></Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}></Col>
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

export default AssignUserRole;
