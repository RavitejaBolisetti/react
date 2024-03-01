/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Descriptions, Collapse, Divider, Space, Typography } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import { InputSkeleton } from 'components/common/Skeleton';
import { translateContent } from 'utils/translateContent';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
import dayjs from 'dayjs';
import { dateFormat, mmYYYYFormat } from 'utils/formatDateTime';
import { YES_NO_FLAG } from 'constants/yesNoFlag';
import { PHYSICAL_STATUS } from 'constants/PhysicalStatus';
import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, isLoading, physicalStatusType, vehicleStatusType, shortageType, defectStatusType } = props;

    const [activeKey, setactiveKey] = useState([]);

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

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const checkDefectStatus = (type) => [PHYSICAL_STATUS?.MAJOR_DAMAGE?.key, PHYSICAL_STATUS?.MINOR_DAMAGE?.key].includes(type);
    const checkShortageStatus = (type) => type === YES_NO_FLAG?.YES?.key;
    return (
        <>
            {formData &&
                formData?.map((item, index) => (
                    <div className={styles.innerCollapse}>
                        <Collapse defaultActiveKey={index} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(index)} expandIconPosition="end" collapsible="icon">
                            <Panel
                                header={
                                    <>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Space size="small">
                                                    <Text className={styles.headText}>
                                                        {translateContent('vehicleReceipt.label.vehicleDetails.model')} : {checkAndSetDefaultValue(item?.modelDescription, isLoading)}{' '}
                                                    </Text>
                                                    <Text className={styles.headText}> {`|`}</Text>
                                                    <Text className={styles.headText}>
                                                        {translateContent('vehicleReceipt.label.vehicleDetails.VIN')} : {checkAndSetDefaultValue(item?.vin, isLoading)}
                                                    </Text>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Text type="secondary" className={styles.subSection}>
                                                    {translateContent('vehicleReceipt.label.vehicleDetails.vehicleStatus')}: {checkAndSetDefaultValue(getCodeValue(vehicleStatusType, item?.vehicleStatus), isLoading)}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </>
                                }
                                key={index}
                            >
                                <Divider />
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.modelDescription')}>
                                        {isLoading ? (
                                            <InputSkeleton width={'100px'} height={20} theme={'card'} />
                                        ) : (
                                            <div className={styles?.tooltipAlign}>
                                                <div title={item?.modelDescription} className={`${styles.contentData} ${styles.txtEllipsis}`}>
                                                    {item?.modelDescription}
                                                </div>
                                                {!item?.modelDescription
                                                    ? 'NA'
                                                    : addToolTip(
                                                          <div>
                                                              <p>
                                                                  {translateContent('vehicleReceipt.label.vehicleDetails.modelName')} : <span>{item?.name ?? 'Na'}</span>
                                                              </p>
                                                              <p>
                                                                  {translateContent('vehicleReceipt.label.vehicleDetails.color')} : <span>{item?.color ?? 'Na'}</span>
                                                              </p>
                                                              <p>
                                                                  {translateContent('vehicleReceipt.label.vehicleDetails.seatingCapacity')} : <span>{item?.seatingCapacity ?? 'Na'}</span>
                                                              </p>
                                                              <p>
                                                                  {translateContent('vehicleReceipt.label.vehicleDetails.fuel')} : <span>{item?.fuel ?? 'Na'}</span>
                                                              </p>
                                                              <p>
                                                                  {translateContent('vehicleReceipt.label.vehicleDetails.variants')} : <span>{item?.variant ?? 'Na'}</span>
                                                              </p>
                                                          </div>,
                                                          'bottom',
                                                          '#FFFFFF',
                                                          styles.toolTip
                                                      )(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                                            </div>
                                        )}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.VIN')}>{checkAndSetDefaultValue(item?.vin, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.keyNumber')}>{checkAndSetDefaultValue(item?.keyNumber, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.mfgDate')}>{checkAndSetDefaultValue(item?.mfgdate ? dayjs(item?.mfgdate, [mmYYYYFormat, dateFormat])?.format(dateFormat) : null, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.receivedOn')}>{checkAndSetDefaultValue(item?.receivedOn, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.vehicleCost')}>{checkAndSetDefaultValue(item?.vehicleCost, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.demoVehicle')}>{checkAndSetDefaultValue(getCodeValue(shortageType, item?.demoVehicle), isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.vehicleStatus')}>{checkAndSetDefaultValue(getCodeValue(vehicleStatusType, item?.vehicleStatus), isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.physicalStatus')}>{checkAndSetDefaultValue(getCodeValue(physicalStatusType, item?.physicalStatus), isLoading)}</Descriptions.Item>
                                    {checkDefectStatus(item?.physicalStatus) && (
                                        <>
                                            <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.defectType')}>{checkAndSetDefaultValue(getCodeValue(defectStatusType, item?.physicalStatusDetail?.defectType), isLoading)}</Descriptions.Item>
                                            {item?.physicalStatusDetail?.otherDefectType && <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.otherDefectType')}>{checkAndSetDefaultValue(item?.physicalStatusDetail?.otherDefectType, isLoading)}</Descriptions.Item>}
                                            <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.defectLocation')}>{checkAndSetDefaultValue(item?.physicalStatusDetail?.defectLocation, isLoading)}</Descriptions.Item>
                                            {item?.physicalStatusDetail?.otherDefectLocation && <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.otherDefectLocation')}>{checkAndSetDefaultValue(item?.physicalStatusDetail?.otherDefectLocation, isLoading)}</Descriptions.Item>}
                                            <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.defectDescription')}>{checkAndSetDefaultValue(item?.physicalStatusDetail?.defectDescription, isLoading)}</Descriptions.Item>
                                            {item?.physicalStatusDetail?.otherDefectDescription && <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.otherDefectDescription')}>{checkAndSetDefaultValue(item?.physicalStatusDetail?.otherDefectDescription, isLoading)}</Descriptions.Item>}
                                            <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.remarks')}>{checkAndSetDefaultValue(item?.physicalStatusDetail?.remarks, isLoading)}</Descriptions.Item>
                                        </>
                                    )}
                                    <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.shortage')}>{checkAndSetDefaultValue(getCodeValue(shortageType, item?.shortage), isLoading)}</Descriptions.Item>
                                    {checkShortageStatus(item.shortage) && (
                                        <>
                                            <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.shortageType')}>{checkAndSetDefaultValue(item?.shortageDetail?.shortageType, isLoading)}</Descriptions.Item>
                                            {item?.shortageDetail?.otherShortageType && <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.otherShortageType')}>{checkAndSetDefaultValue(item?.shortageDetail?.otherShortageType, isLoading)}</Descriptions.Item>}
                                            <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.shortageDescription')}>{checkAndSetDefaultValue(item?.shortageDetail?.shortageDescription, isLoading)}</Descriptions.Item>
                                            {item?.shortageDetail?.otherShortageDescription && <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.otherShortageDescription')}>{checkAndSetDefaultValue(item?.shortageDetail?.otherShortageDescription, isLoading)}</Descriptions.Item>}

                                            <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.remarks')}>{checkAndSetDefaultValue(item?.shortageDetail?.remarks, isLoading)}</Descriptions.Item>
                                        </>
                                    )}

                                    <Descriptions.Item label={translateContent('vehicleReceipt.label.vehicleDetails.vehicleReceiptChecklistNumber')}>{checkAndSetDefaultValue(item?.vehicleReceiptChecklistNumber, isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </Panel>
                        </Collapse>
                    </div>
                ))}
        </>
    );
};

export const ViewDetail = ViewDetailMain;
