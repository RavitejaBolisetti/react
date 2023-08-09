/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Space, Tag } from 'antd';
import { tblPrepareColumns } from 'utils/tableColumn';
import { VehicleReceiptStatusTag } from './utils/VehicleReceiptStatusTag';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import { PlusOutlined } from '@ant-design/icons';

import styles from 'components/common/Common.module.css';

export const tblActionColumn = ({ styles, handleButtonClick, width = '10%', fixed = '' }) => {
    return {
        title: 'Action',
        dataIndex: '',
        width,
        fixed: fixed,
        render: (text, record, index) => [
            <Space wrap>
                {record?.grnNumber ? (
                    <>
                        <Button data-testid="view" className={styles.tableIcons} aria-label="ai-view" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                            <FiEye />
                        </Button>
                        <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.EDIT, record, index })}>
                            <FiEdit />
                        </Button>
                    </>
                ) : (
                    <Button data-testid="add" className={styles.tableIcons} aria-label="fa-add" icon={<PlusOutlined />} onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD, record, index })} />
                )}
            </Space>,
        ],
    };
};

export const tableColumn = ({ handleButtonClick, page, pageSize, tableIconsVisibility }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'GRN Type',
            dataIndex: 'grnType',
            width: '12%',
        }),

        tblPrepareColumns({
            title: 'GRN Number',
            dataIndex: 'grnNumber',
            width: '12%',
            render: (text) => text ?? 'NA',
        }),

        tblPrepareColumns({
            title: 'GRN Date',
            dataIndex: 'grnDate',
            width: '12%',
            render: (text) => (text ? convertDateMonthYear(text) : 'NA'),
        }),

        tblPrepareColumns({
            title: 'Supplier Name',
            dataIndex: 'supplierName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Supplier Invoice Number',
            dataIndex: 'supplierInvoiceNumber',
            width: '16%',
        }),

        tblPrepareColumns({
            title: 'Supplier Invoice Date',
            dataIndex: 'supplierInvoiceDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '12%', ...tableIconsVisibility }),
    ];

    return tableColumn;
};
