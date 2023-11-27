/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { CopytoClipboard } from 'utils/CopytoClipboard';

const { Panel } = Collapse;

const expandIcon = ({ isActive }) =>
    isActive ? (
        <>
            <span>{translateContent('vehicleReceipt.heading.profileCard.seeLess')}</span>
            <SlArrowUp size={13} />
        </>
    ) : (
        <>
            <span>{translateContent('vehicleReceipt.heading.profileCard.seeMore')}</span>
            <SlArrowDown size={13} />
        </>
    );

const VehicleReceiptDetailCard = (props) => {
    const { selectedRecord, typeData, isLoading } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                            {translateContent('vehicleReceipt.heading.profileCard.grnNumber')}
                            <span className={styles.activeForm}>
                                {selectedRecord?.grnNumber || 'New'}
                                <CopytoClipboard text={selectedRecord?.grnNumber} />
                            </span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleReceipt.heading.profileCard.grnType')} : <span>{selectedRecord && checkAndSetDefaultValue(selectedRecord?.grnType, isLoading)}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleReceipt.heading.profileCard.grnDate')}: <span>{checkAndSetDefaultValue(selectedRecord?.grnDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleReceipt.heading.profileCard.grnState')}: <span>{getCodeValue(typeData, selectedRecord?.status) || 'NA'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default VehicleReceiptDetailCard;
