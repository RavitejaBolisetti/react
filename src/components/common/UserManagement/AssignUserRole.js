import React from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import style from 'components/common/DrawerAndTable.module.css';

const AssignUserRole = () => {
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={sty}>Assign User Roles</div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Select
                        showSearch
                        style={{
                            width: 200,
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                        options={[
                            {
                                value: '1',
                                label: 'Not Identified',
                            },
                            {
                                value: '2',
                                label: 'Closed',
                            },
                            {
                                value: '3',
                                label: 'Communicated',
                            },
                            {
                                value: '4',
                                label: 'Identified',
                            },
                            {
                                value: '5',
                                label: 'Resolved',
                            },
                            {
                                value: '6',
                                label: 'Cancelled',
                            },
                        ]}
                    />
                </Col>
            </Row>
        </>
    );
};

export default AssignUserRole;
