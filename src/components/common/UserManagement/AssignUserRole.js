import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Checkbox } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import style from 'components/common/DrawerAndTable.module.css';
import style3 from './UserManagement.module.css';
import styles from 'components/common/Common.module.css';

import { PlusOutlined } from '@ant-design/icons';
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';

const { Option } = Select;
const AssignUserRole = ({ userRoleOptions, DealerSearchvalue, finalFormdata, setfinalFormdata }) => {
    const [checked, setchecked] = useState([]);
    const [addroles, setaddroles] = useState();
    const FindRoleDetails = (option) => {
        return userRoleOptions?.filter((el) => {
            return el?.roleName === option;
        });
    };
    useEffect(() => {
        console.log('These are the Roles :', userRoleOptions);
        console.log('These checked :', checked);
        setfinalFormdata({ ...finalFormdata, AssignUserRole: checked });
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
                            console.log('This is the el', el['0']?.roleName);
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
            </Row>
        </Space>
    );
};

export default AssignUserRole;
