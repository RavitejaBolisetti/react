/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Descriptions, Collapse, Divider, Space, Typography } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import { InputSkeleton } from 'components/common/Skeleton';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, isLoading, physicalStatusType, vehicleStatusType, shortageType } = props;

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

    return (
        <>
            {formData?.map((item, index) => (
                <div className={styles.innerCollapse}>
                    <Collapse defaultActiveKey={index} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(index)} expandIconPosition="end">
                        <Panel
                            header={
                                <>
                                    <Space>
                                        <Text className={styles.headText}> Model: {checkAndSetDefaultValue(item?.modelDescription, isLoading)} </Text>
                                        <Text className={styles.headText}> {`|`}</Text>
                                        <Text className={styles.headText}> VIN: {checkAndSetDefaultValue(item?.vin, isLoading)}</Text>
                                    </Space>
                                    <Text className={styles.subSection}> Vehicle Status: {checkAndSetDefaultValue(getCodeValue(vehicleStatusType, item?.vehicleStatus), isLoading)}</Text>
                                </>
                            }
                            key={index}
                        >
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Model Description">
                                    {isLoading ? (
                                        <InputSkeleton width={'100px'} height={20} theme={'card'} />
                                    ) : (
                                        <div className={styles.tooltipAlign}>
                                            {item?.modelDescription}
                                            {!item?.modelDescription
                                                ? 'NA'
                                                : addToolTip(
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
                                                  )(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                                        </div>
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label="VIN">{checkAndSetDefaultValue(item?.vin, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Key Number">{checkAndSetDefaultValue(item?.keyNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="MFG Date">{checkAndSetDefaultValue(item?.mfgdate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                <Descriptions.Item label="Received On">{checkAndSetDefaultValue(item?.receivedOn, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                <Descriptions.Item label="Vehicle Cost">{checkAndSetDefaultValue(item?.vehicleCost, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Demo Vehicle">{checkAndSetDefaultValue(getCodeValue(shortageType, item?.demoVehicle), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Vehicle Status">{checkAndSetDefaultValue(getCodeValue(vehicleStatusType, item?.vehicleStatus), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Physical Status">{checkAndSetDefaultValue(getCodeValue(physicalStatusType, item?.physicalStatus), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Shortage">{checkAndSetDefaultValue(getCodeValue(shortageType, item?.shortage), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Vehicle Receipt Checklist No.">
                                    {/* <a style={{ color: 'ff3e5b' }} href={item?.vehicleReceiptChecklistNumber} target="_blank" rel="noreferrer"> */}
                                    {checkAndSetDefaultValue(item?.vehicleReceiptChecklistNumber, isLoading)}
                                    {/* </a> */}
                                </Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </div>
            ))}
        </>
    );
};

export const ViewDetail = ViewDetailMain;
