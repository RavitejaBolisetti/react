import React, { useState, Fragment, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography, Input } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const { Text } = Typography;
const { TextArea } = Input;

const CollapseTaxInfo = (props) => {
    return (
        <>
            <Form autoComplete="off" layout="vertical" id="myForm">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={props.type} label="Tax/Charges Type" name="type">
                            <Input placeholder={preparePlaceholderText('Type')} disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Tax/Charges Code" name="code" initialValue={props.code}>
                            <Input placeholder={preparePlaceholderText('Code')} disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Rate" name="rate" initialValue={props.rate}>
                            <Input placeholder={preparePlaceholderText('Rate')} disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Rate Type" name="rateType" initialValue={props.rateType}>
                            <Input placeholder={preparePlaceholderText('Rate Type')} disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Charge Description" name="description" initialValue={props.description}>
                            <TextArea placeholder={preparePlaceholderText('description')} showCount maxLength={100} autoSize={{ minRows: 2, maxRows: 5 }} disabled />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default CollapseTaxInfo;
