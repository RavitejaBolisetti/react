/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { OnRoadPriceStatusTag } from './utils/OnRoadPriceStatusTag';
import styles from 'assets/sass/app.module.scss';
import { FiEdit, FiEye } from 'react-icons/fi';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ONROAD_PRICE_MASTER_STATUS } from 'constants/OnRoadPriceMasterStatus';
import { translateContent } from 'utils/translateContent';
import { Button, Space } from 'antd';

export const tblActionColumn = ({ handleButtonClick, width = '10%', fixed = '' }) => {
    return {
        title: 'Action',
        dataIndex: '',
        width,
        fixed: fixed,
        render: (text, record, index) => [
            <Space size="middle">
                {record?.status === ONROAD_PRICE_MASTER_STATUS?.ACTIONED?.title ? (
                    <>
                        <Button data-testid="view" type="link" aria-label="ai-view" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                            <FiEye />
                        </Button>
                        <Button data-testid="edit" type="link" aria-label="fa-edit" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.EDIT, record, index })}>
                            <FiEdit />
                        </Button>
                    </>
                ) : (
                    <Button data-testid="view" type="link" aria-label="ai-view" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                        <FiEye />
                    </Button>
                )}
            </Space>,
        ],
    };
};

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('onRoadPriceMaster.label.pricingType'),
            dataIndex: 'priceType',
            width: '15%',
        }),
        tblPrepareColumns({
            title: translateContent('onRoadPriceMaster.label.model'),
            dataIndex: 'model',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('onRoadPriceMaster.label.pricingCity'),
            dataIndex: 'pricingCity',
            width: '15%',
        }),
        tblPrepareColumns({
            title: translateContent('onRoadPriceMaster.label.changeEXShowroomORG'),
            dataIndex: 'changeInExShowroomOrg',
            width: '15%',
        }),
        tblPrepareColumns({
            title: translateContent('onRoadPriceMaster.label.status'),
            dataIndex: 'status',
            width: '15%',
            render: (_, record) => OnRoadPriceStatusTag(record.status),
        }),

        tblActionColumn({ handleButtonClick, styles }),
    ];

    return tableColumn;
};
