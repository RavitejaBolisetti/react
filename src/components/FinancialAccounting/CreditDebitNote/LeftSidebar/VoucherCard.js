/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { convertDate, monthDateFormat } from 'utils/formatDateTime';
import dayjs from 'dayjs';
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

const VoucherCard = (props) => {
    const { selectedRecord } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <div>
                                <div>
                                    Voucher No: <span className={`${styles.floatRight} ${styles.textEllipsis}`} style={{width:138, textAlign: 'right'}} >{selectedRecord?.voucherNumber}</span>
                                </div>
                                <div>
                                    Voucher Date: <span className={styles.floatRight}>{selectedRecord?.voucherDate ? convertDate(selectedRecord?.voucherDate, monthDateFormat) : dayjs().format(monthDateFormat)}</span>
                                </div>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                <p>
                    Voucher Type: <span className={styles.floatRight}>{selectedRecord?.voucherType}</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default VoucherCard;
