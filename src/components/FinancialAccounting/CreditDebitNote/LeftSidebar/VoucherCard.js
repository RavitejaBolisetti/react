/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { convertDate, dateFormatView } from 'utils/formatDateTime';
import dayjs from 'dayjs';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

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

const VoucherCard = (props) => {
    const { selectedRecord } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
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
                    {translateContent('creditDebitNote.leftSideBar.label.voucherType')}: <span>{selectedRecord?.voucherType || '-'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default VoucherCard;
