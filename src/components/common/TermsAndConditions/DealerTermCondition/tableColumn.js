/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { Button, Space } from 'antd';
import { FiEye } from 'react-icons/fi';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { convertDateMonthYear } from 'utils/formatDateTime';

export const tableColumn = (handleButtonClick, handleManufacturerButtonClick, page, pageSize) => {
    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('termConditionDealer.label.productHierarchy'),
            dataIndex: 'productName',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('termConditionDealer.label.documentType'),
            dataIndex: 'documentTypeCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('termConditionDealer.label.language'),
            dataIndex: 'language',
            width: '10%',
        }),

        tblPrepareColumns({
            title: translateContent('termConditionDealer.label.effectiveFrom'),
            dataIndex: 'effectiveFrom',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),
        tblPrepareColumns({
            title: translateContent('termConditionDealer.label.effectiveTo'),
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
            title: translateContent('termConditionDealer.label.version'),
            dataIndex: 'version',
            width: '5%',
        }),
        tblPrepareColumns({
            title: translateContent('termConditionDealer.label.mfgT&c'),
            width: '2%',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {record?.manufracturerTnCId !== 'NA' ? (
                            <Button data-testid="view" type="link" aria-label="ai-view" onClick={(e) => handleManufacturerButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
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
