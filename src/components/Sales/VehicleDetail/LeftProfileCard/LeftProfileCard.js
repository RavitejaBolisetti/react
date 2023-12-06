/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Divider } from 'antd';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';
import { seeMoreLessIcon } from 'utils/seeMoreLessIcon';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const LeftProfileCard = (props) => {
    const { selectedRecord, selectedRecordId } = props;
    return (
        <Collapse bordered={true} expandIcon={seeMoreLessIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <div className={styles.detailCardText} style={{ fontSize: '14px' }}>
                            {translateContent('vehicleDetail.profileCard.vin')} <span>{selectedRecordId || 'NA'}</span>
                        </div>
                        <Divider />
                        <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                            {translateContent('vehicleDetail.profileCard.regNo')} <span>{selectedRecord?.registrationNumber || 'NA'}</span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                {selectedRecord?.customerCode && (
                    <div className={styles.detailCardText}>
                        {translateContent('vehicleDetail.profileCard.customerId')} <span>{selectedRecord?.customerCode}</span>
                    </div>
                )}
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleDetail.profileCard.mobileNo')} <span>{selectedRecord?.mobileNumber || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleDetail.profileCard.model')} <span>{selectedRecord?.model || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleDetail.profileCard.color')}
                    <span>{selectedRecord?.color || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleDetail.profileCard.mfgWarrenty')} <span>{selectedRecord?.mfgWarranty === 'Expired' ? selectedRecord?.mfgWarranty : convertDateTime(selectedRecord?.mfgWarranty, dateFormatView) || 'NA'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default LeftProfileCard;
