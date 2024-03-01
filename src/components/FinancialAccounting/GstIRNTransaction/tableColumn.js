/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';
import { GST_IRN_TRANSACTION_STATUS } from './GstIRNStatus';
import { Button } from 'antd';
import { addToolTip } from 'utils/customMenuLink';
import { FiUpload } from 'react-icons/fi';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PARAM_MASTER } from 'constants/paramMaster';
import { getCodeValue } from 'utils/getCodeValue';

const tooltipText = (status) => {
    if (status === GST_IRN_TRANSACTION_STATUS?.PENDING?.key) {
        return 'global.buttons.generateIRN';
    } else if (status === GST_IRN_TRANSACTION_STATUS?.REJECTED?.key || status === GST_IRN_TRANSACTION_STATUS?.FAILED?.key) {
        return 'global.buttons.reGenerateIRN';
    } else if (!status) {
        return 'global.buttons.irnStatusNotPresent';
    }
    return '';
};
export const tableColumn = ({ handleButtonClick, typeData, isDataLoading }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('gstIrnTransaction.heading.documentType'),
            dataIndex: 'invoiceDocumentType',
            width: '18%',
        }),
        tblPrepareColumns({
            title: translateContent('gstIrnTransaction.heading.documentNumber'),
            dataIndex: 'invoiceDocumentNumber',
            width: '18%',
        }),

        tblPrepareColumns({
            title: translateContent('gstIrnTransaction.heading.documentDate'),
            dataIndex: 'invoiceDocumentDate',
            width: '16%',
            render: (_, record) => (record?.invoiceDocumentDate ? convertDateMonthYear(record?.invoiceDocumentDate) : ''),
        }),

        tblPrepareColumns({
            title: translateContent('gstIrnTransaction.heading.location'),
            dataIndex: 'location',
            width: '17%',
        }),
        tblPrepareColumns({
            title: translateContent('gstIrnTransaction.heading.irnResponse'),
            dataIndex: 'irnStatus',
            width: '16%',
            render: (status) => getCodeValue(typeData?.[PARAM_MASTER?.IRN_GEN_STATUS?.id] || [], status, 'value', false, 'key'),
        }),
        tblPrepareColumns({
            title: translateContent('gstIrnTransaction.heading.action'),
            render: (_, record, index) => {
                if ([GST_IRN_TRANSACTION_STATUS.PENDING.key, GST_IRN_TRANSACTION_STATUS.REJECTED.key, GST_IRN_TRANSACTION_STATUS.FAILED.key]?.includes(record?.irnStatus))
                    return (
                        <Button disabled={!record?.irnStatus} data-testid="upload" type="link" aria-label="fa-upload" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.UPLOAD, record, index })}>
                            {addToolTip(translateContent(tooltipText(record?.irnStatus)))(<FiUpload />)}
                        </Button>
                    );
            },
        }),
    ];

    return tableColumn;
};
