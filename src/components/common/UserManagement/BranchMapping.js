/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Space, Checkbox } from 'antd';

const BranchMapping = ({ BranchMappingData, finalFormdata, setfinalFormdata }) => {
    const onChanges = (values) => {};

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
        </Space>
    );
};

export default BranchMapping;
