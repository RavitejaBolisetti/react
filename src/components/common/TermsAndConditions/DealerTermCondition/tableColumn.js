/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { Button, Space } from 'antd';
import { FiEye } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { convertDateMonthYear } from 'utils/formatDateTime';

export const tableColumn = (handleButtonClick, handleManufacturerButtonClick, page, pageSize) => {
    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'productName',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Document Type',
            dataIndex: 'documentTypeCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Language',
            dataIndex: 'language',
            width: '10%',
        }),

        tblPrepareColumns({
            title: 'Effective From',
            dataIndex: 'effectiveFrom',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),
        tblPrepareColumns({
            title: 'Effective To',
            dataIndex: 'effectiveTo',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),
        // tblPrepareColumns({
        //     title: 'Description',
        //     dataIndex: 'termConditionDescription',
        //     width: '15%',
        //     render: (dataIndex) => dataIndex.substring(0, 25) + (dataIndex.length > 25 ? '...' : ''),
        // }),
        tblPrepareColumns({
            title: 'Version',
            dataIndex: 'version',
            width: '5%',
        }),
        tblPrepareColumns({
            title: 'MFG T&C',
            width: '2%',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {record?.manufracturerTnCId !== 'NA' ? (
                            <Button data-testid="view" className={styles.tableIcons} aria-label="ai-view" onClick={(e) => handleManufacturerButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                                <FiEye />
                            </Button>
                        ) : null}
                    </Space>
                );
            },
        }),
        tblActionColumn({ styles, handleButtonClick, width: '10%' })
    );

    return tableColumn;
};
