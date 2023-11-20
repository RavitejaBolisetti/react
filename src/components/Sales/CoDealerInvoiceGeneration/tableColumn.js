/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { IRN_CONSTANTS, NO_DATA_AVALAIBLE } from './constants';

import styles from 'assets/sass/app.module.scss';
import { Tag, Typography } from 'antd';
const { Text } = Typography;

const IrnStatus = ({ children }) => {
    let tagColor = '';
    let tagDesc = '';
    switch (children) {
        case IRN_CONSTANTS?.PENDING?.key: {
            tagColor = IRN_CONSTANTS?.PENDING?.tagColor;
            tagDesc = IRN_CONSTANTS?.PENDING?.tagDesc;
            break;
        }
        case IRN_CONSTANTS?.CANCELLED?.key: {
            tagColor = IRN_CONSTANTS?.CANCELLED?.tagColor;
            tagDesc = IRN_CONSTANTS?.CANCELLED?.tagDesc;
            break;
        }
        case IRN_CONSTANTS?.SUCCESS?.key: {
            tagColor = IRN_CONSTANTS?.SUCCESS?.tagColor;
            tagDesc = IRN_CONSTANTS?.SUCCESS?.tagDesc;
            break;
        }
        default: {
            tagColor = '';
            tagDesc = 'NA';
            break;
        }
    }
    return <Tag color={tagColor}>{tagDesc}</Tag>;
};

export const tableColumnDeliveryNoteMaster = ({ handleButtonClick, actionButtonVisiblity, deliveryType }) => {
    return [
        tblPrepareColumns({
            title: 'Invoice No. & Date',
            dataIndex: 'invoiceNumber',
            width: '14%',
            render: (_, record) => {
                return (
                    <>
                        <div>{record?.invoiceNumber}</div>
                        {record?.invoiceDate ? <div className={styles.tableTextColor85}> {convertDateMonthYear(record?.invoiceDate)}</div> : NO_DATA_AVALAIBLE}
                    </>
                );
            },
        }),
        tblPrepareColumns({
            title: 'Dealer Name',
            dataIndex: 'dealerName',
            width: '18%',
            render: (_, record) => {
                return (
                    <>
                        <Text strong>{record?.dealerName}</Text>
                        {record?.location ? (
                            <div className={styles.tableTextColor85}>
                                <Tag color="processing">{record?.location}</Tag>
                            </div>
                        ) : (
                            NO_DATA_AVALAIBLE
                        )}
                    </>
                );
            },
        }),

        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelDescription',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Indent No. & Date',
            dataIndex: 'indentNumber',
            width: '14%',
            render: (_, record) => {
                return (
                    <>
                        <div>{record?.indentNumber}</div>
                        {record?.indentDate ? <div className={styles.tableTextColor85}> {convertDateMonthYear(record?.indentDate)}</div> : NO_DATA_AVALAIBLE}
                    </>
                );
            },
        }),
        tblPrepareColumns({
            title: 'IRN Status',
            dataIndex: 'irnStatus',
            width: '14%',
            render: (_, record) => {
                return (
                    <>
                        <IrnStatus>{record?.irnStatus}</IrnStatus>
                    </>
                );
            },
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', ...actionButtonVisiblity }),
    ];
};
