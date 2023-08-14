/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import styles from 'components/common/Common.module.css';
const { Panel } = Collapse;

const expandIcon = ({ isActive }) =>
    isActive ? (
        <>
            <span>See less</span>
            <SlArrowUp size={13} />
        </>
    ) : (
        <>
            <span>See more</span>
            <SlArrowDown size={13} />
        </>
    );

const VehicleDetailCard = (props) => {
    const { selectedRecord, selectedRecordId } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            {/* <Avatar size={50}>{userAvatar?.toUpperCase()}</Avatar> */}
                            <div>
                                {/* <Title level={5} style={{ textTransform: 'capitalize' }}>
                                    {selectedRecord?.customerName?.toLowerCase()}
                                </Title> */}
                                <div>
                                    VIN: <span className={styles.floatRight}>{selectedRecordId}</span>
                                </div>
                                <div>
                                    Reg No: <span className={styles.floatRight}>{selectedRecord?.registrationNumber}</span>
                                </div>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                {selectedRecord?.customerCode && (
                    <p>
                        Customer ID: <span className={styles.floatRight}>{selectedRecord?.customerCode}</span>
                    </p>
                )}
                <p>
                    Mobile No.: <span className={styles.floatRight}>{selectedRecord?.mobileNumber || 'NA'}</span>
                </p>
                <p>
                    Model: <span className={styles.floatRight}>{selectedRecord?.model || 'NA'}</span>
                </p>

                <p>
                    Color: <span className={styles.floatRight}>{selectedRecord?.color || 'NA'}</span>
                </p>
                <p>
                    MFG Warranty: <span className={styles.floatRight}>{selectedRecord?.mfgWarranty || 'NA'}</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default VehicleDetailCard;
