/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Divider } from 'antd';
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
    // const fullName = selectedRecord?.customerName?.split(' ');
    // const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1]?.slice(0, 1) : '') : '';
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <div className={styles.detailCardText} style={{ fontSize: '14px' }}>
                            VIN: <span>{selectedRecordId || 'NA'}</span>
                        </div>
                        <Divider />
                        <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                            Reg No: <span>{selectedRecord?.registrationNumber || 'NA'}</span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                {selectedRecord?.customerCode && (
                    <div className={styles.detailCardText}>
                        Customer ID: <span>{selectedRecord?.customerCode}</span>
                    </div>
                )}
                <Divider />
                <div className={styles.detailCardText}>
                    Mobile No.: <span>{selectedRecord?.mobileNumber || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Model: <span>{selectedRecord?.model || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Color: <span>{selectedRecord?.color || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    MFG Warranty: <span>{selectedRecord?.mfgWarranty || 'NA'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default VehicleDetailCard;
