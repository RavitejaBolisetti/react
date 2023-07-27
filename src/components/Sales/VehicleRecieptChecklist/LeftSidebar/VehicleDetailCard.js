/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar, Typography } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import styles from 'components/common/Common.module.css';
const { Panel } = Collapse;
const { Title } = Typography;

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
    const { selectedRecord, selectedCheckListNumber = 'CH67667' } = props;
    const fullName = selectedRecord?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1]?.slice(0, 1) : '') : '';
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <Space>
                        <div>
                            <div>
                                CheckList Number: <span className={styles.floatRight}>{selectedCheckListNumber}</span>
                            </div>
                        </div>
                    </Space>
                }
                key={1}
            >
                {selectedRecord?.customerCode && (
                    <p>
                        Checklist Date: <span className={styles.floatRight}>{selectedRecord?.checklistDate}</span>
                    </p>
                )}
                <p>
                    Checklist Status: <span className={styles.floatRight}>{selectedRecord?.mobileNumber || 'NA'}</span>
                </p>
                <p>
                    GRN Number: <span className={styles.floatRight}>{selectedRecord?.model || 'NA'}</span>
                </p>

                <p>
                    GRN Date: <span className={styles.floatRight}>{selectedRecord?.color || 'NA'}</span>
                </p>
                <p>
                    GRN Status: <span className={styles.floatRight}>{selectedRecord?.mfgWarranty || 'NA'}</span>
                </p>
                <p>
                    VIN: <span className={styles.floatRight}>{selectedRecord?.color || 'NA'}</span>
                </p>
                <p>
                    MODEL: <span className={styles.floatRight}>{selectedRecord?.mfgWarranty || 'NA'}</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default VehicleDetailCard;
