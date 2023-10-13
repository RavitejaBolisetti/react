/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Select, DatePicker, Collapse, Divider, Space, Typography, Button } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';

import { getCodeValue } from 'utils/getCodeValue';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { VEHICLE_RECEIPT_STATUS } from 'constants/VehicleReceiptStatus';
import { PHYSICAL_STATUS } from 'constants/PhysicalStatus';
import { YES_NO_FLAG } from 'constants/yesNoFlag';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, setFinalData, buttonData, setButtonData, vehicleStatusType, physicalStatusType, shortageType, vehicleDetailForm, receiptType } = props;

    const [activeKey, setactiveKey] = useState([]);
    const [statusType, setstatusType] = useState([]);
    // const [vehicleDetailList, setVehicleDetailList] = useState([]);

    useEffect(() => {
        if (formData) {
            formData && setFinalData(formData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
    useEffect(() => {
        if (vehicleStatusType?.length) {
            setstatusType(
                vehicleStatusType?.map((item) => {
                    if (receiptType === VEHICLE_RECEIPT_STATUS?.RECEIVED?.key) {
                        if (item?.key === VEHICLE_RECEIPT_STATUS?.IN_TRANSIT?.key) {
                            return { ...item, disabled: true };
                        } else {
                            return { ...item, disabled: false };
                        }
                    } else if (receiptType === VEHICLE_RECEIPT_STATUS?.RETURNED?.key) {
                        if (item?.key === VEHICLE_RECEIPT_STATUS?.IN_TRANSIT?.key || item?.key === VEHICLE_RECEIPT_STATUS?.RECEIVED?.key) {
                            return { ...item, disabled: true };
                        } else {
                            return { ...item, disabled: false };
                        }
                    }
                    return { ...item, disabled: false };
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleStatusType]);

    const onChange = (values) => {
        const isPresent = activeKey?.includes(values);

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

    const onFinishFailed = (errorInfo) => {
        vehicleDetailForm.validateFields().then((values) => {}).catch(err => console.error(err));
    };

    const handleSave = (indexId) => {
        vehicleDetailForm.validateFields().then(() => {
            const vehicleDetailData = vehicleDetailForm?.getFieldsValue();
            const filteredFormData = formData?.filter((element, i) => i !== indexId);
            const finalData = { ...filteredFormData, ...vehicleDetailData };
            setFinalData(finalData);
            setButtonData({ ...buttonData, formBtnActive: true });
            setactiveKey([]);
        }).catch(err => console.error(err));;
    };

    const handleCancelFormEdit = () => {
        setactiveKey([]);
    };
    const collapseProps = {
        collapsible: 'icon',
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    return (
        <>
            <Form form={vehicleDetailForm} id="myAdd" onFinish={handleSave} autoComplete="off" layout="vertical" onFinishFailed={onFinishFailed}>
                {formData?.map((item, index) => (
                    <div className={styles.innerCollapse}>
                        <Collapse defaultActiveKey={index} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(index)} expandIconPosition="end" collapsible="icon" {...collapseProps}>
                            <Panel
                                header={
                                    <>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Space size="small">
                                                    <Text className={styles.headText}> Model: {item?.modelDescription} </Text>
                                                    <Text className={styles.headText}> {`|`}</Text>
                                                    <Text className={styles.headText}> VIN: {item?.vin}</Text>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Text type="secondary" className={styles.subSection}>
                                                    Vehicle Status: {getCodeValue(vehicleStatusType, item?.vehicleStatus)}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </>
                                }
                                key={index}
                            >
                                <Divider />
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.infoWrapper}>
                                        <Form.Item initialValue={item?.modelDescription} label="Model Description" name={[index, 'modelDescription']}>
                                            <Input title={item?.modelDescription} maxLength={10} placeholder={preparePlaceholderText('Model Description')} disabled={true} />
                                        </Form.Item>
                                        {item?.modelDescription && (
                                            <div className={styles.modelTooltipView}>
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
                                                )(<AiOutlineInfoCircle size={15} />)}
                                            </div>
                                        )}
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vin} label="VIN" name={[index, 'vin']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText('VIN')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.keyNumber} label="Key Number" name={[index, 'keyNumber']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText('Key Number')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(item?.mfgdate)} label="MFG Date" name={[index, 'mfgDate']}>
                                            <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(item?.receivedOn)} label="Received On" name={[index, 'receivedOn']}>
                                            <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vehicleCost} label="Vehicle Cost" name={[index, 'vehicleCost']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Cost')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.demoVehicle ?? YES_NO_FLAG?.NO?.key} label="Demo Vehicle" name={[index, 'demoVehicle']} rules={[validateRequiredSelectField('Demo Vehicle')]}>
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps}>
                                                {shortageType?.map((item) => (
                                                    <Option key={'dv' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vehicleStatus ?? VEHICLE_RECEIPT_STATUS.RECEIVED.key} label="Vehicle Status" name={[index, 'vehicleStatus']} rules={[validateRequiredSelectField('Vehicle Status')]}>
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps}>
                                                {statusType?.map((item) => (
                                                    <Option disabled={item?.disabled} key={'vs' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.physicalStatus ?? PHYSICAL_STATUS?.NO_DAMAGE?.key} label="Physical Status" name={[index, 'physicalStatus']} rules={[validateRequiredSelectField('Physical Status')]}>
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps}>
                                                {physicalStatusType?.map((item) => (
                                                    <Option key={'ps' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.shortage ?? YES_NO_FLAG?.NO?.key} label="Shortage" name={[index, 'shortage']}>
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps}>
                                                {shortageType?.map((item) => (
                                                    <Option key={'st' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vehicleRecieptCheckListNumber} label="Vehicle Receipt Checklist No." name={[index, 'vehicleRecieptCheckListNumber']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Receipt Checklist No.')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Form.Item hidden initialValue={item?.id} name={[index, 'id']}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item hidden initialValue={item?.modelCode} name={[index, 'modelCode']}>
                                        <Input />
                                    </Form.Item>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Button className={styles.marR20} onClick={() => handleSave(index)} type="primary">
                                            Save
                                        </Button>
                                        <Button className={styles.marB20} onClick={handleCancelFormEdit} danger>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </div>
                ))}
            </Form>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
