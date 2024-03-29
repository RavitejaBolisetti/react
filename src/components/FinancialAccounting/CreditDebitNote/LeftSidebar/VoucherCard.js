/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Divider } from 'antd';
import { convertDate, dateFormatView } from 'utils/formatDateTime';
import dayjs from 'dayjs';
import { translateContent } from 'utils/translateContent';
import { VOUCHER_TYPE } from 'constants/VoucherType';

import { seeMoreLessIcon } from 'utils/seeMoreLessIcon';
import styles from 'assets/sass/app.module.scss';
const { Panel } = Collapse;

const VoucherCard = (props) => {
    const { selectedRecord } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={seeMoreLessIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <div className={styles.detailCardText} style={{ fontSize: '14px' }}>
                            {translateContent('creditDebitNote.leftSideBar.label.voucherNumber')}: <span>{selectedRecord?.voucherNumber || '-'}</span>
                        </div>
                        <Divider />
                        <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                            {translateContent('creditDebitNote.leftSideBar.label.voucherDate')}: <span>{selectedRecord?.voucherDate ? convertDate(selectedRecord?.voucherDate, dateFormatView) : dayjs().format(dateFormatView)}</span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('creditDebitNote.leftSideBar.label.voucherType')}: <span>{selectedRecord.voucherType === VOUCHER_TYPE?.DEBIT_TYPE?.type ? VOUCHER_TYPE?.DEBIT_TYPE?.key : VOUCHER_TYPE?.CREDIT_TYPE?.key || '-'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default VoucherCard;
