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

import styles from 'components/common/Common.module.css';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, setFinalData, buttonData, setButtonData, vehicleStatusType, physicalStatusType, shortageType, vehicleDetailForm } = props;

    const [activeKey, setactiveKey] = useState([]);

    useEffect(() => {
        if (formData) {
            formData && setFinalData(formData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

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
    const handleSave = (indexId) => {
        vehicleDetailForm
            .validateFields()
            .then(() => {
                const vehicleDetailData = vehicleDetailForm?.getFieldsValue();
                const filteredFormData = formData?.filter((element, i) => i !== indexId);
                const finalData = { ...filteredFormData, ...vehicleDetailData };
                setFinalData(finalData);
                setButtonData({ ...buttonData, formBtnActive: true });
                setactiveKey([]);
            })
            .catch((err) => console.log(err));
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
            <Form form={vehicleDetailForm} id="myAdd" onFinish={handleSave} autoComplete="off" layout="vertical">
                {formData?.map((item, index) => (
                    <div className={styles.accessInfo}>
                        <Collapse defaultActiveKey={index} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(index)} expandIconPosition="end" {...collapseProps}>
                            <Panel
                                header={
                                    <Space direction="vertical">
                                        <Space>
                                            <Text className={styles.headText}>
                                                {translateContent('gstIRNAuthentication.irnTransactionListMaster.label.model')}
                                                {item?.modelDescription}{' '}
                                            </Text>
                                            <Text className={styles.headText}> {`|`}</Text>
                                            <Text className={styles.headText}>
                                                {' '}
                                                {translateContent('gstIRNAuthentication.irnTransactionListMaster.label.vin')} {item?.vin}
                                            </Text>
                                        </Space>
                                        <Text className={styles.subSection}>
                                            {' '}
                                            {translateContent('gstIRNAuthentication.irnTransactionListMaster.label.vehicleStatus')}
                                            {getCodeValue(vehicleStatusType, item?.vehicleStatus)}
                                        </Text>
                                    </Space>
                                }
                                key={index}
                            >
                                {/* <AccessoriesInformationCard formData={element} /> */}
                                {/* </Panel> */}
                                {/* <Panel header="Model: Scorpio | VIN: 234254543453" key="1"> */}
                                <Divider />
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.infoWrapper}>
                                        <Form.Item initialValue={item?.modelDescription} label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.modelDescription')} name={[index, 'modelDescription']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText(translateContent('gstIRNAuthentication.irnTransactionListMaster.placeholder.modelDescription'))} disabled={true} />
                                        </Form.Item>
                                        {item?.modelDescription && (
                                            <div className={styles.modelTooltip}>
                                                {addToolTip(
                                                    <div>
                                                        <p>
                                                            {translateContent('global.tooltip.modelName')} <span>{item?.name ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            {translateContent('global.tooltip.color')} <span>{item?.color ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            {translateContent('global.tooltip.seating')} <span>{item?.seatingCapacity ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            {translateContent('global.tooltip.fuel')} <span>{item?.fuel ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            {translateContent('global.tooltip.variant')} <span>{item?.variant ?? 'Na'}</span>
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
                                        <Form.Item initialValue={item?.vin} label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.vin')} name={[index, 'vin']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText(translateContent('gstIRNAuthentication.irnTransactionListMaster.placeholder.vin'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.keyNumber} label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.keyNumber')} name={[index, 'keyNumber']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText(translateContent('gstIRNAuthentication.irnTransactionListMaster.placeholder.keyNumber'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(item?.mfgdate)} label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.mfg')} name={[index, 'mfgDate']}>
                                            <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(item?.receivedOn)} label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.recievedOn')} name={[index, 'receivedOn']}>
                                            <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vehicleCost} label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.vehicleCost')} name={[index, 'vehicleCost']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText(translateContent('gstIRNAuthentication.irnTransactionListMaster.placeholder.vehicleCost'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.demoVehicle} label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.demoVehicle')} name={[index, 'demoVehicle']} rules={[validateRequiredSelectField(translateContent('gstIRNAuthentication.irnTransactionListMaster.validation.demoVehicle'))]}>
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect(translateContent('global.placeholder.select'))} {...selectProps}>
                                                {shortageType?.map((item) => (
                                                    <Option key={'dv' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vehicleStatus} label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.vehicleStatus')} name={[index, 'vehicleStatus']} rules={[validateRequiredSelectField(translateContent('gstIRNAuthentication.irnTransactionListMaster.validation.vehicleStatus'))]}>
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect(translateContent('global.placeholder.select'))} {...selectProps}>
                                                {vehicleStatusType?.map((item) => (
                                                    <Option key={'vs' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.physicalStatus} label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.physicalStatus')} name={[index, 'physicalStatus']} rules={[validateRequiredSelectField(translateContent('gstIRNAuthentication.irnTransactionListMaster.validation.physicalStatus'))]}>
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect(translateContent('global.placeholder.select'))} {...selectProps}>
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
                                        <Form.Item initialValue={item?.shortage} label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.shortage')} name={[index, 'shortage']}>
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect(translateContent('global.placeholder.select'))} {...selectProps}>
                                                {shortageType?.map((item) => (
                                                    <Option key={'st' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vehicleRecieptCheckListNumber} label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.vehicleRecieptCheckListNumber')} name={[index, 'vehicleRecieptCheckListNumber']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText(translateContent('gstIRNAuthentication.irnTransactionListMaster.placeholder.vehicleRecieptCheckListNumber'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Form.Item hidden initialValue={item?.id} name={[index, 'id']}>
                                        <Input />
                                    </Form.Item>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Button className={styles.marR20} onClick={() => handleSave(index)} type="primary">
                                            {translateContent('global.buttons.save')}
                                        </Button>
                                        <Button className={styles.marB20} onClick={handleCancelFormEdit} danger>
                                            {translateContent('global.buttons.cancel')}
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
