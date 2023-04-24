import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Checkbox } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import style from 'components/common/DrawerAndTable.module.css';
const { Option } = Select;
const BranchMapping = ({ BranchMappingData }) => {
    const [checked, setchecked] = useState([]);
    useEffect(() => {
        console.log('BranchMappingData', BranchMappingData);
    }, [BranchMappingData]);
    const onChanges = (values) => {
        console.log(values);
    };

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
                    {BranchMappingData?.map((el, i) => {
                        return (
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <span>
                                        {i + 1}
                                        {'. '}
                                    </span>
                                    {el?.branchName}
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Checkbox.Group
                                        style={{
                                            width: '100%',
                                        }}
                                        onChange={onChanges}
                                    >
                                        <Row gutter={20}>
                                            <Col span={12}>
                                                <Checkbox value={'Accessible'.concat(el?.branchName)}>Accessible</Checkbox>
                                            </Col>
                                            <Col span={12}>
                                                <Checkbox value={'Default'.concat(el?.branchName)}>Default</Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Col>
                            </Row>
                        );
                    })}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Button onClick={handleSelectAdd} form="myForm" key="Add" type="primary">
                        Add
                    </Button>
                </Col>
            </Row>
        </Space>
    );
};

export default BranchMapping;
