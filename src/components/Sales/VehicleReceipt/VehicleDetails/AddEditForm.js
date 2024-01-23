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
import { translateContent } from 'utils/translateContent';
import { getCodeValue } from 'utils/getCodeValue';
import { formattedCalendarDate, dateFormat, mmYYYYFormat } from 'utils/formatDateTime';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { VEHICLE_RECEIPT_STATUS } from 'constants/VehicleReceiptStatus';
import { PHYSICAL_STATUS } from 'constants/PhysicalStatus';
import { YES_NO_FLAG } from 'constants/yesNoFlag';
import { GRN_TYPE_CONSTANT } from '../utils/GrnTypeConstant';
import { DEFECT_SHORTAGE_OTHER_CONSTANT } from './defectShortageOtherConstant';
import { BASE_URL_INVOICE_DEFECT_LOCATION as defectCustomURL, BASE_URL_INVOICE_DEFECT_SHORTAGE as shortageCustomURL } from 'constants/routingApi';
import { CardSkeleton } from 'components/common/Skeleton';
import dayjs from 'dayjs';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { isLoading, formData, setFormData, selectedRecord, setFinalData, buttonData, setButtonData, vehicleStatusType, physicalStatusType, shortageType, vehicleDetailForm, receiptType, defectStatusType, defactTypeData, shortTypeData } = props;
    const { fetchDefectAndShortageDependentData, checkPhysicalStatus, checkShortage } = props;

    const [activeKey, setactiveKey] = useState([]);
    const [statusType, setstatusType] = useState([]);
    const [defectDescription, setDefectDescription] = useState([]);
    const [shortageDescription, setShortageDescription] = useState([]);

    const [otherShortageAndDefectType, setOtherShortageAndDefectType] = useState({});

    useEffect(() => {
        if (formData) {
            formData && setFinalData(formData);
            if (formData) {
                formData.forEach((element, index) => {
                    element?.physicalStatusDetail?.defectLocation &&
                        fetchDefectAndShortageDependentData({
                            value: element?.physicalStatusDetail?.defectLocation,
                            extraParams: [
                                {
                                    key: 'defectLocationCode',
                                    value: element?.physicalStatusDetail?.defectLocation,
                                },
                            ],
                            successAction: setDefectDescription,
                            dataItem: defectDescription,
                            index,
                            customURL: defectCustomURL,
                        });

                    element?.shortageDetail?.shortageType &&
                        fetchDefectAndShortageDependentData({
                            value: element?.shortageDetail?.shortageType,
                            extraParams: [
                                {
                                    key: 'shortageType',
                                    value: element?.shortageDetail?.shortageType,
                                },
                            ],
                            successAction: setShortageDescription,
                            dataItem: shortageDescription,
                            index,
                            customURL: shortageCustomURL,
                        });

                    setOtherShortageAndDefectType((prev) => {
                        return {
                            ...prev,
                            [index]: {
                                otherDefectType: element?.physicalStatusDetail?.otherDefectType,
                                otherDefectLocation: element?.physicalStatusDetail?.otherDefectLocation,
                                otherDefectDescription: element?.physicalStatusDetail?.otherDefectDescription,
                                otherShortageType: element?.shortageDetail?.otherShortageType,
                                otherShortageDescription: element?.shortageDetail?.otherShortageDescription,
                            },
                        };
                    });
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        if (vehicleStatusType?.length) {
            const skippable = selectedRecord?.grnType === GRN_TYPE_CONSTANT?.CO_DEALER?.desc || selectedRecord?.grnType === GRN_TYPE_CONSTANT?.CO_DEALER?.key;
            setstatusType(
                vehicleStatusType?.map((item) => {
                    if (receiptType === VEHICLE_RECEIPT_STATUS?.RECEIVED?.key) {
                        if (item?.key === VEHICLE_RECEIPT_STATUS?.IN_TRANSIT?.key) {
                            return { ...item, disabled: true };
                        } else {
                            if (item?.key === VEHICLE_RECEIPT_STATUS?.RETURNED?.key && skippable) {
                                return { ...item, disabled: true };
                            } else {
                                return { ...item, disabled: false };
                            }
                        }
                    } else if (receiptType === VEHICLE_RECEIPT_STATUS?.RETURNED?.key) {
                        if (item?.key === VEHICLE_RECEIPT_STATUS?.IN_TRANSIT?.key || item?.key === VEHICLE_RECEIPT_STATUS?.RECEIVED?.key) {
                            return { ...item, disabled: true };
                        } else {
                            if (item?.key === VEHICLE_RECEIPT_STATUS?.RETURNED?.key && skippable) {
                                return { ...item, disabled: true };
                            } else {
                                return { ...item, disabled: false };
                            }
                        }
                    } else {
                        if (item?.key === VEHICLE_RECEIPT_STATUS?.RETURNED?.key && skippable) {
                            return { ...item, disabled: true };
                        } else {
                            return { ...item, disabled: false };
                        }
                    }
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleStatusType]);

    useEffect(() => {
        vehicleDetailForm.resetFields();
        setFormData([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const onFinishFailed = () => {
        vehicleDetailForm
            .validateFields()
            .then((values) => {})
            .catch((err) => console.error(err));
    };

    const handleSave = (indexId) => {
        vehicleDetailForm
            .validateFields()
            .then(() => {
                const vehicleDetailData = vehicleDetailForm?.getFieldsValue();
                const filteredFormData = formData?.filter((element, i) => i !== indexId);
                const finalData = [...filteredFormData, ...Object.values(vehicleDetailData)];
                setFinalData(finalData);
                setButtonData({ ...buttonData, formBtnActive: true });
                setactiveKey([]);
            })
            .catch((err) => console.error(err));
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

    const handleDataChange = ({ value, index, type }) => {
        if (type === 'shortage') {
            vehicleDetailForm.setFieldsValue({ [index]: { ...vehicleDetailForm.getFieldsValue()[index], shortageDetail: { ...vehicleDetailForm.getFieldsValue()[index].shortageDetail, shortageType: null, otherShortageType: null, shortageDescription: null, otherShortageDescription: null, remarks: null } } });
        }
        setFormData((data) => {
            return data?.map((item, i) => (i === index ? { ...item, [type]: value } : item));
        });
    };

    const handleDefectShortageChange = ({ value, index, type }) => {
        if (type === 'shortage') {
            fetchDefectAndShortageDependentData({
                value,
                extraParams: [
                    {
                        key: 'shortageType',
                        value: value,
                    },
                ],
                successAction: setShortageDescription,
                dataItem: shortageDescription,
                index,
                customURL: shortageCustomURL,
            });
            setOtherShortageAndDefectType((prev) => {
                return { ...prev, [index]: { ...prev?.[index], otherShortageType: value === DEFECT_SHORTAGE_OTHER_CONSTANT?.SHORTAGE_TYPE?.key } };
            });

            vehicleDetailForm.setFieldsValue({ [index]: { ...vehicleDetailForm.getFieldsValue()[index], shortageDetail: { ...vehicleDetailForm.getFieldsValue()[index].shortageDetail, shortageDescription: null } } });
        } else {
            fetchDefectAndShortageDependentData({
                value,
                extraParams: [
                    {
                        key: 'defectLocationCode',
                        value: value,
                    },
                ],
                successAction: setDefectDescription,
                dataItem: defectDescription,
                index,
                customURL: defectCustomURL,
            });
            setOtherShortageAndDefectType((prev) => {
                return { ...prev, [index]: { ...prev?.[index], otherDefectLocation: value === DEFECT_SHORTAGE_OTHER_CONSTANT?.DEFECT_DESCRIPTION?.key } };
            });
            vehicleDetailForm.setFieldsValue({ [index]: { ...vehicleDetailForm.getFieldsValue()[index], physicalStatusDetail: { ...vehicleDetailForm.getFieldsValue()[index].physicalStatusDetail, defectDescription: null } } });
        }
    };

    const handleOtherDefectAndShortage = ({ value, typeKey, index }) => {
        if (typeKey?.id === DEFECT_SHORTAGE_OTHER_CONSTANT?.DEFECT_TYPE?.id) {
            vehicleDetailForm.setFieldsValue({ [index]: { ...vehicleDetailForm.getFieldsValue()[index], physicalStatusDetail: { ...vehicleDetailForm.getFieldsValue()[index].physicalStatusDetail, defectLocation: null, defectDescription: null } } });
        }

        setOtherShortageAndDefectType((prev) => {
            return { ...prev, [index]: { ...prev?.[index], [typeKey?.mapKey]: value === typeKey?.key } };
        });
    };

    return !isLoading ? (
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
                                                    <Text className={styles.headText}>
                                                        {translateContent('vehicleReceipt.label.vehicleDetails.model')}: {item?.modelDescription}{' '}
                                                    </Text>
                                                    <Text className={styles.headText}> {`|`}</Text>
                                                    <Text className={styles.headText}>
                                                        {translateContent('vehicleReceipt.label.vehicleDetails.VIN')}: {item?.vin}
                                                    </Text>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Text type="secondary" className={styles.subSection}>
                                                    {translateContent('vehicleReceipt.label.vehicleDetails.vehicleStatus')}: {getCodeValue(vehicleStatusType, item?.vehicleStatus)}
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
                                                            {translateContent('vehicleReceipt.label.vehicleDetails.modelName')}: <span>{item?.name ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            {translateContent('vehicleReceipt.label.vehicleDetails.color')} : <span>{item?.color ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            {translateContent('vehicleReceipt.label.vehicleDetails.seatingCapacity')}: <span>{item?.seatingCapacity ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            {translateContent('vehicleReceipt.label.vehicleDetails.fuel')}: <span>{item?.fuel ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            {translateContent('vehicleReceipt.label.vehicleDetails.variants')}: <span>{item?.variant ?? 'Na'}</span>
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
                                        <Form.Item initialValue={item?.vin} label={translateContent('vehicleReceipt.label.vehicleDetails.VIN')} name={[index, 'vin']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText('VIN')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.keyNumber} label={translateContent('vehicleReceipt.label.vehicleDetails.keyNumber')} name={[index, 'keyNumber']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText('Key Number')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.mfgdate ? dayjs(item?.mfgdate, [dateFormat, mmYYYYFormat]) : null} label={translateContent('vehicleReceipt.label.vehicleDetails.mfgDate')} name={[index, 'mfgdate']}>
                                            <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(item?.receivedOn, dateFormat)} label={translateContent('vehicleReceipt.label.vehicleDetails.receivedOn')} name={[index, 'receivedOn']}>
                                            <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vehicleCost} label={translateContent('vehicleReceipt.label.vehicleDetails.vehicleCost')} name={[index, 'vehicleCost']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Cost')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.demoVehicle ?? YES_NO_FLAG?.NO?.key} label={translateContent('vehicleReceipt.label.vehicleDetails.demoVehicle')} name={[index, 'demoVehicle']} rules={[validateRequiredSelectField(translateContent('vehicleReceipt.label.vehicleDetails.demoVehicle'))]}>
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
                                        <Form.Item initialValue={item?.vehicleStatus ?? VEHICLE_RECEIPT_STATUS.RECEIVED.key} label={translateContent('vehicleReceipt.label.vehicleDetails.vehicleStatus')} name={[index, 'vehicleStatus']} rules={[validateRequiredSelectField(translateContent('vehicleReceipt.label.vehicleDetails.vehicleStatus'))]}>
                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps}>
                                                {statusType?.map((item) => (
                                                    <Option disabled={item?.disabled} key={'vs' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    {selectedRecord?.grnType !== GRN_TYPE_CONSTANT?.CO_DEALER?.desc && (
                                        <>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={item?.physicalStatus ?? PHYSICAL_STATUS?.NO_DAMAGE?.key} label={translateContent('vehicleReceipt.label.vehicleDetails.physicalStatus')} name={[index, 'physicalStatus']} rules={[validateRequiredSelectField(translateContent('vehicleReceipt.label.vehicleDetails.physicalStatus'))]}>
                                                    <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps} onChange={(value) => handleDataChange({ value, index, type: 'physicalStatus' })}>
                                                        {physicalStatusType?.map((item) => (
                                                            <Option key={'ps' + item.key} value={item.key}>
                                                                {item.value}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            {checkPhysicalStatus(item?.physicalStatus) && (
                                                <>
                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item initialValue={item?.physicalStatusDetail?.defectType} label={translateContent('vehicleReceipt.label.vehicleDetails.defectType')} name={[index, 'physicalStatusDetail', 'defectType']} rules={[validateRequiredSelectField(translateContent('vehicleReceipt.label.vehicleDetails.defectType'))]}>
                                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps} onChange={(value) => handleOtherDefectAndShortage({ value, typeKey: DEFECT_SHORTAGE_OTHER_CONSTANT?.DEFECT_TYPE, index })}>
                                                                {defectStatusType?.map((item) => (
                                                                    <Option key={'df' + item.key} value={item.key}>
                                                                        {item.value}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    {otherShortageAndDefectType?.[index]?.otherDefectType && (
                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                            <Form.Item initialValue={item?.physicalStatusDetail?.otherDefectType} label={translateContent('vehicleReceipt.label.vehicleDetails.otherDefectType')} name={[index, 'physicalStatusDetail', 'otherDefectType']} rules={[validateRequiredInputField(translateContent('vehicleReceipt.label.vehicleDetails.otherDefectType'))]}>
                                                                <Input placeholder={preparePlaceholderText(translateContent('vehicleReceipt.label.vehicleDetails.otherDefectType'))} />
                                                            </Form.Item>
                                                        </Col>
                                                    )}
                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item initialValue={item?.physicalStatusDetail?.defectLocation} label={translateContent('vehicleReceipt.label.vehicleDetails.defectLocation')} name={[index, 'physicalStatusDetail', 'defectLocation']} rules={[validateRequiredSelectField(translateContent('vehicleReceipt.label.vehicleDetails.defectLocation'))]}>
                                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps} onChange={(value) => handleDefectShortageChange({ value, index, type: 'defect' })}>
                                                                {defactTypeData?.map((item) => (
                                                                    <Option key={'df' + item.key} value={item.key}>
                                                                        {item.value}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    {otherShortageAndDefectType?.[index]?.otherDefectLocation && (
                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                            <Form.Item initialValue={item?.physicalStatusDetail?.otherDefectLocation} label={translateContent('vehicleReceipt.label.vehicleDetails.otherDefectLocation')} name={[index, 'physicalStatusDetail', 'otherDefectLocation']} rules={[validateRequiredInputField(translateContent('vehicleReceipt.label.vehicleDetails.otherDefectLocation'))]}>
                                                                <Input placeholder={preparePlaceholderText(translateContent('vehicleReceipt.label.vehicleDetails.otherDefectLocation'))} />
                                                            </Form.Item>
                                                        </Col>
                                                    )}
                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item initialValue={item?.physicalStatusDetail?.defectDescription} label={translateContent('vehicleReceipt.label.vehicleDetails.defectDescription')} name={[index, 'physicalStatusDetail', 'defectDescription']} rules={[validateRequiredSelectField(translateContent('vehicleReceipt.label.vehicleDetails.defectDescription'))]}>
                                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps} onChange={(value) => handleOtherDefectAndShortage({ value, typeKey: DEFECT_SHORTAGE_OTHER_CONSTANT?.DEFECT_DESCRIPTION, index })}>
                                                                {defectDescription?.[index]?.map((item) => (
                                                                    <Option key={'ds' + item.key} value={item.key}>
                                                                        {item.value}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    {otherShortageAndDefectType?.[index]?.otherDefectDescription && (
                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                            <Form.Item initialValue={item?.physicalStatusDetail?.otherDefectDescription} label={translateContent('vehicleReceipt.label.vehicleDetails.otherDefectDescription')} name={[index, 'physicalStatusDetail', 'otherDefectDescription']} rules={[validateRequiredInputField(translateContent('vehicleReceipt.label.vehicleDetails.otherDefectDescription'))]}>
                                                                <Input placeholder={preparePlaceholderText(translateContent('vehicleReceipt.label.vehicleDetails.otherDefectDescription'))} />
                                                            </Form.Item>
                                                        </Col>
                                                    )}
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                        <Form.Item initialValue={item?.physicalStatusDetail?.remarks} label={translateContent('vehicleReceipt.label.vehicleDetails.remarks')} name={[index, 'physicalStatusDetail', 'remarks']} rules={[validateRequiredSelectField(translateContent('vehicleReceipt.label.vehicleDetails.remarks'))]}>
                                                            <TextArea maxLength={400} placeholder={preparePlaceholderText(translateContent('configurableParameter.placeholder.controlDescriptionPlaceHolder'))} disabled={''} showCount />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                                                        <Form.Item hidden label="" initialValue={item?.physicalStatusDetail?.id} name={[index, 'physicalStatusDetail', 'id']} />
                                                    </Col>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {selectedRecord?.grnType !== GRN_TYPE_CONSTANT?.CO_DEALER?.desc && (
                                        <>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={item?.shortage ?? YES_NO_FLAG?.NO?.key} label={translateContent('vehicleReceipt.label.vehicleDetails.shortage')} name={[index, 'shortage']} rules={[validateRequiredSelectField(translateContent('vehicleReceipt.label.vehicleDetails.shortage'))]}>
                                                    <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps} onChange={(value) => handleDataChange({ value, index, type: 'shortage' })}>
                                                        {shortageType?.map((item) => (
                                                            <Option key={'st' + item.key} value={item.key}>
                                                                {item.value}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            {checkShortage(item?.shortage) && (
                                                <>
                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item initialValue={item?.shortageDetail?.shortageType} label={translateContent('vehicleReceipt.label.vehicleDetails.shortageType')} name={[index, 'shortageDetail', 'shortageType']} rules={[validateRequiredSelectField(translateContent('vehicleReceipt.label.vehicleDetails.shortageType'))]}>
                                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps} onChange={(value) => handleDefectShortageChange({ value, index, type: 'shortage' })}>
                                                                {shortTypeData?.map((item) => (
                                                                    <Option key={'st' + item.key} value={item.key}>
                                                                        {item.value}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    {otherShortageAndDefectType?.[index]?.otherShortageType && (
                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                            <Form.Item initialValue={item?.shortageDetail?.otherShortageType} label={translateContent('vehicleReceipt.label.vehicleDetails.otherShortageType')} name={[index, 'shortageDetail', 'otherShortageType']} rules={[validateRequiredInputField(translateContent('vehicleReceipt.label.vehicleDetails.otherShortageType'))]}>
                                                                <Input placeholder={preparePlaceholderText(translateContent('vehicleReceipt.label.vehicleDetails.otherShortageType'))} />
                                                            </Form.Item>
                                                        </Col>
                                                    )}
                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item initialValue={item?.shortageDetail?.shortageDescription} label={translateContent('vehicleReceipt.label.vehicleDetails.shortageDescription')} name={[index, 'shortageDetail', 'shortageDescription']} rules={[validateRequiredSelectField(translateContent('vehicleReceipt.label.vehicleDetails.shortageDescription'))]}>
                                                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps} onChange={(value) => handleOtherDefectAndShortage({ value, typeKey: DEFECT_SHORTAGE_OTHER_CONSTANT?.SHORTAGE_TYPE, index })}>
                                                                {shortageDescription?.[index]?.map((item) => (
                                                                    <Option key={'st' + item.key} value={item.key}>
                                                                        {item.value}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    {otherShortageAndDefectType?.[index]?.otherShortageDescription && (
                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                            <Form.Item initialValue={item?.shortageDetail?.otherShortageDescription} label={translateContent('vehicleReceipt.label.vehicleDetails.otherShortageDescription')} name={[index, 'shortageDetail', 'otherShortageDescription']} rules={[validateRequiredInputField(translateContent('vehicleReceipt.label.vehicleDetails.otherShortageDescription'))]}>
                                                                <Input placeholder={preparePlaceholderText(translateContent('vehicleReceipt.label.vehicleDetails.otherShortageDescription'))} />
                                                            </Form.Item>
                                                        </Col>
                                                    )}
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                        <Form.Item initialValue={item?.shortageDetail?.remarks} label={translateContent('vehicleReceipt.label.vehicleDetails.remarks')} name={[index, 'shortageDetail', 'remarks']} rules={[validateRequiredSelectField(translateContent('vehicleReceipt.label.vehicleDetails.remarks'))]}>
                                                            <TextArea maxLength={400} placeholder={preparePlaceholderText(translateContent('configurableParameter.placeholder.controlDescriptionPlaceHolder'))} showCount />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                                                        <Form.Item hidden label="" initialValue={item?.shortageDetail?.id} name={[index, 'shortageDetail', 'id']} />
                                                    </Col>
                                                </>
                                            )}
                                        </>
                                    )}
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={item?.vehicleRecieptCheckListNumber} label={translateContent('vehicleReceipt.label.vehicleDetails.vehicleReceiptChecklistNumber')} name={[index, 'vehicleRecieptCheckListNumber']}>
                                            <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Receipt Checklist No.')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Form.Item hidden initialValue={item?.id} name={[index, 'id']} />
                                    <Form.Item hidden initialValue={item?.modelCode} name={[index, 'modelCode']} />
                                    <Form.Item hidden initialValue={item?.engineNumber} name={[index, 'engineNumber']} />
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
    ) : (
        <CardSkeleton title={false} contentHeight={350} />
    );
};

export const AddEditForm = AddEditFormMain;
