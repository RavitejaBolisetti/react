/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Select, DatePicker, Card, Collapse, Divider, Space, Typography, Tooltip, Button } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import { InfoCircleOutlined } from '@ant-design/icons';

import { getCodeValue } from 'utils/getCodeValue';
import { formattedCalendarDate, dateFormat, formatDate } from 'utils/formatDateTime';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, vehicleStatusType, physicalStatusType, shortageType, vehicleDetailForm } = props;

    const [activeKey, setactiveKey] = useState([1]);

    // const [vehicleDetailList, setVehicleDetailList] = useState([]);

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
            formData?.map((item) => {
                if (item.id === value.id) {
                    item.demoVehicle = value.demoVehicle;
                    item.vehicleStatus = value.vehicleStatus;
                    item.physicalStatus = value.physicalStatus;
                    item.shortage = value.shortage;
                    item.mfgdate = formattedCalendarDate(value?.mfgdate);
                }
            });
            setactiveKey([]);
            console.log('🚀 ~ file: AddEditForm.js:57 ~ formData?.map ~ formData:', formData);
        });
    };

    const handleCancelFormEdit = () => {
        setactiveKey([]);
    };

    return (
        <>
            {formData?.map((item, key) => (
                <div className={styles.accessInfo}>
                    <Collapse defaultActiveKey={[key + 1]} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(key + 1)} expandIconPosition="end">
                        <Panel
                            header={
                                <Space direction="vertical">
                                    <Space>
                                        <Text className={styles.headText}> Model: {item?.modelDescription} </Text>
                                        <Text className={styles.headText}> {`|`}</Text>
                                        <Text className={styles.headText}> VIN: {item?.vin}</Text>
                                    </Space>
                                    <Text className={styles.subSection}> Vehicle Status: {getCodeValue(vehicleStatusType, item?.vehicleStatus)}</Text>
                                </Space>
                            }
                            key={key + 1}
                        >
                            {/* <AccessoriesInformationCard formData={element} /> */}
                            {/* </Panel> */}
                            {/* <Panel header="Model: Scorpio | VIN: 234254543453" key="1"> */}
                            <Divider />
                            <Form form={vehicleDetailForm} id="myAdd" onFinish={handleSave} autoComplete="off" layout="vertical">
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.infoWrapper}>
                                        <Form.Item initialValue={item?.modelDescription} label="Model Description" name="modelDescription">
                                            <Input maxLength={10} placeholder={preparePlaceholderText('Model Description')} disabled={true} />
                                        </Form.Item>
                                        {item?.modelDescription && (
                                            <div className={styles.modelTooltip}>
                                                {addToolTip(
                                                    <div>
                                                        <p>
                                                            Model Name: <span>{item?.name ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            Color: <span>{item?.color ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            Seating Capacity: <span>{item?.seatingCapacity ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            Fuel: <span>{item?.fuel ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            Variants: <span>{item?.variant ?? 'Na'}</span>
                                                        </p>
                                                    </div>,
                                                    'bottom',
                                                    '#FFFFFF',
                                                    styles.toolTip
                                                )(<AiOutlineInfoCircle size={13} />)}
                                            </div>
                                        )}
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vin} label="VIN" name="vin">
                                            <Input maxLength={10} placeholder={preparePlaceholderText('VIN')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.keyNumber} label="Key Number" name="keyNumber">
                                            <Input maxLength={10} placeholder={preparePlaceholderText('Key Number')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(item?.mfgdate)} label="MFG Date" name="mfgDate">
                                            <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(item?.receivedOn)} label="Received On" name="receivedOn">
                                            <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vehicleCost} label="Vehicle Cost" name="vehicleCost">
                                            <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Cost')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.demoVehicle} label="Demo Vehicle" name="demoVehicle">
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} showSearch allowClear>
                                                {shortageType?.map((item) => (
                                                    <Option key={'dv' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                            {/* <Select placeholder="Select" showSearch allowClear options={shortageType} {...selectProps} fieldNames={{ label: 'value', value: 'key' }} /> */}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vehicleStatus} label="Vehicle Status" name="vehicleStatus">
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} showSearch allowClear>
                                                {vehicleStatusType?.map((item) => (
                                                    <Option key={'vs' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                            {/* <Select placeholder="Select" showSearch allowClear options={vehicleStatusType} {...selectProps} fieldNames={{ label: 'value', value: 'key' }} /> */}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.physicalStatus} label="Physical Status" name="physicalStatus">
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} showSearch allowClear>
                                                {physicalStatusType?.map((item) => (
                                                    <Option key={'ps' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                            {/* <Select placeholder="Select" showSearch allowClear options={physicalStatusType} {...selectProps} fieldNames={{ label: 'value', value: 'key' }} /> */}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.shortage} label="Shortage" name="shortage">
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} showSearch allowClear>
                                                {shortageType?.map((item) => (
                                                    <Option key={'st' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                            {/* <Select placeholder="Select" showSearch allowClear options={shortageType} {...selectProps} fieldNames={{ label: 'value', value: 'key' }} /> */}
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vehicleRecieptCheckListNumber} label="Vehicle Receipt Checklist No." name="vehicleRecieptCheckListNumber">
                                            <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Receipt Checklist No.')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Form.Item hidden initialValue={item?.id} name="id">
                                        <Input />
                                    </Form.Item>
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
            ))}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
