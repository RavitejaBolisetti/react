/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Link } from 'react-router-dom';
import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateMonthYear, converDateDayjs, convertDateTime, dateFormatView, timeFormatView } from 'utils/formatDateTime';
import { ChargerStatusTag } from '../ChargerStatusTag';
import { FiEye } from 'react-icons/fi';
import { getCodeValue } from 'utils/getCodeValue';
import * as IMAGES from 'assets';

export const addRequestColumns = (typeData) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Request Change',
            dataIndex: 'stage',
            key: 'stage',
            width: '25%',
            render: (_, record) => getCodeValue(typeData?.CHRGR_INST_STG_TYPE, record?.requestStage || record?.stageType),
        }),

        tblPrepareColumns({
            title: 'Visit TimeSlot 1',
            dataIndex: 'visitTimeSlotOne',
            width: '25%',
            render: (_, record) => (record?.visitTimeSlotOne ? converDateDayjs(record?.visitTimeSlotOne) : ''),
        }),
        tblPrepareColumns({
            title: 'Visit TimeSlot 2',
            dataIndex: 'visitTimeSlotTwo',
            width: '25%',
            render: (_, record) => (record?.visitTimeSlotTwo ? converDateDayjs(record?.visitTimeSlotTwo) : ''),
        }),
        tblPrepareColumns({
            title: 'Visit TimeSlot 3',
            dataIndex: 'visitTimeSlotThree',
            width: '25%',
            render: (_, record) => (record?.visitTimeSlotThree ? converDateDayjs(record?.visitTimeSlotThree) : ''),
        }),
    ];

    return tableColumn;
};
export const addRequestColumnsView = (typeData, onHandleModal) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Stage Request Date',
            dataIndex: 'stageRequestDate',
            key: 'stageRequestDate',
            width: '200px',
            render: (_, record) => (record?.stageRequestDate ? convertDateMonthYear(record?.stageRequestDate) : ''),
        }),
        tblPrepareColumns({
            title: 'Request Change',
            dataIndex: 'stage',
            width: '200px',
            render: (_, record) => getCodeValue(typeData?.CHRGR_INST_STG_TYPE, record?.stageType),
        }),

        tblPrepareColumns({
            title: 'Visit TimeSlot 1',
            dataIndex: 'visitTimeSlotOne',
            key: 'visitTimeSlotOne',
            width: '180px',
            render: (text) => [
                <div>
                    {convertDateTime(text, dateFormatView)}
                    <br />
                    {convertDateTime(text, timeFormatView)}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: 'Visit TimeSlot 2',
            dataIndex: 'visitTimeSlotTwo',
            key: 'visitTimeSlotTwo',
            width: '180px',
            render: (text) => [
                <div>
                    {convertDateTime(text, dateFormatView)}
                    <br />
                    {convertDateTime(text, timeFormatView)}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: 'Visit TimeSlot 3',
            dataIndex: 'visitTimeSlotThree',
            key: 'visitTimeSlotThree',
            width: '180px',
            render: (text) => [
                <div>
                    {convertDateTime(text, dateFormatView)}
                    <br />
                    {convertDateTime(text, timeFormatView)}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'response',
            key: 'response',
            width: '180px',
            render: (_, record) => ChargerStatusTag(record?.response),
        }),
        tblPrepareColumns({
            title: 'Service Id',
            dataIndex: 'serviceId',
            key: 'serviceId',
            width: '200px',
        }),
        tblPrepareColumns({
            title: 'Schedule Date',
            dataIndex: 'date',
            key: 'date',
            width: '180px',
            render: (_, record) => (record?.scheduleDate ? convertDateMonthYear(record?.scheduleDate) : ''),
        }),
        tblPrepareColumns({
            title: 'Response Status',
            dataIndex: 'response',
            width: '180px',
            key: 'response',
        }),
        tblPrepareColumns({
            title: 'Response Remark',
            dataIndex: 'remark',
            key: 'remark',
        }),
        tblPrepareColumns({
            title: 'Activity',
            width: '150px',
            render: (_, record) => <FiEye onClick={() => onHandleModal(record)} style={{ color: '#ff3e5b' }} />,
        }),
        tblPrepareColumns({
            title: 'Document',
            dataIndex: 'document',
            key: 'document',
            width: '150px',
            render: (_, record) => (
                <a href={record?.supportingDocumentUrl} target="_blank" rel="noreferrer">
                    <img src={IMAGES.FILE} alt="logo-images" href={record?.supportingDocumentUrl} />
                </a>
            ),
        }),
    ];

    return tableColumn;
};

export const serviceActivityColumns = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Service Activities',
            dataIndex: 'key',
            key: 'key',
            width: '50%',
        }),

        tblPrepareColumns({
            title: 'Response',
            dataIndex: 'value',
            key: 'value',
            width: '50%',
        }),
    ];

    return tableColumn;
};
