/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Select, DatePicker, Card, Collapse, Divider, Space, Typography, Tooltip, Button } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { InfoCircleOutlined } from '@ant-design/icons';

import { dateFormat } from 'utils/formatDateTime';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, typeData, vehicleStatusType, physicalStatusType, shortageType, vehicleDetailForm } = props;
    console.log('🚀 ~ file: AddEditForm.js:23 ~ AddEditFormMain ~ formData:', formData);

    const [activeKey, setactiveKey] = useState([1]);

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const handleSave = () => {
        vehicleDetailForm.validateFields().then((value) => {
            console.log('🚀 ~ file: AddEditForm.js:51 ~ handleSave ~ value:', value);
        });
    };

    const handleCancelFormEdit = () => {};

    return (
        <>
            {/* {formData?.map((item) => ( */}
            <div className={styles.accessInfo}>
                <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel
                        header={
                            <Space direction="vertical">
                                <Space>
                                    <Text className={styles.headText}> Model: Scorpio </Text>
                                    <Text className={styles.headText}> {`|`}</Text>
                                    <Text className={styles.headText}> VIN: 234254543453</Text>
                                </Space>
                                <Text className={styles.subSection}> Vehicle Status: Received</Text>
                            </Space>
                        }
                        key="1"
                    >
                        {/* <AccessoriesInformationCard formData={element} /> */}
                        {/* </Panel> */}
                        {/* <Panel header="Model: Scorpio | VIN: 234254543453" key="1"> */}
                        <Divider />
                        <Form form={vehicleDetailForm} id="myAdd" onFinish={handleSave} autoComplete="off" layout="vertical">
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.infoWrapper}>
                                    <Form.Item initialValue={formData?.modelDescription} label="Model Description" name="modelDescription">
                                        <Input
                                            maxLength={10}
                                            suffix={
                                                <Tooltip title="Extra information">
                                                    <InfoCircleOutlined
                                                        style={{
                                                            color: 'rgba(0,0,0,.45)',
                                                        }}
                                                    />
                                                </Tooltip>
                                            }
                                            placeholder={preparePlaceholderText('Model Description')}
                                            disabled={true}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.vin} label="VIN" name="vin">
                                        <Input maxLength={10} placeholder={preparePlaceholderText('VIN')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.keyNumber} label="Key Number" name="keyNumber">
                                        <Input maxLength={10} placeholder={preparePlaceholderText('Key Number')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.mfgDate} label="MFG Date" name="mfgDate">
                                        <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.receivedOn} label="Received On" name="receivedOn">
                                        <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.vehicleCost} label="Vehicle Cost" name="vehicleCost">
                                        <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Cost')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.demoVehicle} label="Demo Vehicle" name="demoVehicle">
                                        <Select placeholder="Select" showSearch allowClear options={shortageType} {...selectProps} fieldNames={{ label: 'value', value: 'key' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.vehicleStatus} label="Vehicle Status" name="vehicleStatus">
                                        <Select placeholder="Select" showSearch allowClear options={vehicleStatusType} {...selectProps} fieldNames={{ label: 'value', value: 'key' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.physicalStatus} label="Physical Status" name="physicalStatus">
                                        <Select placeholder="Select" showSearch allowClear options={physicalStatusType} {...selectProps} fieldNames={{ label: 'value', value: 'key' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.shortage} label="Shortage" name="shortage">
                                        <Select placeholder="Select" showSearch allowClear options={shortageType} {...selectProps} fieldNames={{ label: 'value', value: 'key' }} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.vehicleRecieptCheckListNumber} label="Vehicle Receipt Checklist No." name="vehicleRecieptCheckListNumber">
                                        <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Receipt Checklist No.')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Button className={styles.marR20} onClick={handleSave} type="primary">
                                        Save
                                    </Button>
                                    <Button className={styles.marB20} onClick={handleCancelFormEdit} danger>
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Panel>
                </Collapse>
            </div>
            {/* ))} */}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
