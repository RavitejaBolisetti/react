/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateMonthYear, dateFormatView, timeFormatView, convertDateTimedayjs } from 'utils/formatDateTime';
import { ChargerSearchStatusTag, ChargerStatusTag } from '../ChargerStatusTag';
import { FiEye } from 'react-icons/fi';
import { getCodeValue } from 'utils/getCodeValue';

import * as IMAGES from 'assets';
import { translateContent } from 'utils/translateContent';
import { Button } from 'antd';

export const addRequestColumns = (typeData) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.requestChange'),
            dataIndex: 'stage',
            key: 'stage',
            width: '25%',
            render: (_, record) => getCodeValue(typeData?.CHRGR_INST_STG_TYPE, record?.requestStage || record?.stageType),
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.visitTimeSlot1'),
            dataIndex: 'visitTimeSlotOne',
            width: '25%',
            render: (_, record) => (
                <div>
                    {convertDateTimedayjs(record?.visitTimeSlotOne, dateFormatView, '-')}
                    <br />
                    {convertDateTimedayjs(record?.visitTimeSlotOne, timeFormatView, '-')}
                </div>
            ),
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.visitTimeSlot2'),
            dataIndex: 'visitTimeSlotTwo',
            width: '25%',
            render: (_, record) => [
                <div>
                    {convertDateTimedayjs(record?.visitTimeSlotTwo, dateFormatView, '-')}
                    <br />
                    {convertDateTimedayjs(record?.visitTimeSlotTwo, timeFormatView, '-')}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.visitTimeSlot3'),
            dataIndex: 'visitTimeSlotThree',
            width: '25%',
            render: (_, record) => [
                <div>
                    {convertDateTimedayjs(record?.visitTimeSlotThree, dateFormatView, '-')}
                    <br />
                    {convertDateTimedayjs(record?.visitTimeSlotThree, timeFormatView, '-')}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: translateContent('global.label.status'),
            dataIndex: 'response',
            width: '180px',
            render: (_, record) => ChargerStatusTag(record?.stageStatus, typeData),
        }),
    ];

    return tableColumn;
};
export const addRequestColumnsView = (typeData, onHandleModal) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.stageRequestDate'),
            dataIndex: 'stageRequestDate',
            key: 'stageRequestDate',
            width: '200px',
            render: (_, record) => (record?.stageRequestDate ? convertDateMonthYear(record?.stageRequestDate) : ''),
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.requestChange'),
            dataIndex: 'stage',
            width: '200px',
            render: (_, record) => getCodeValue(typeData?.CHRGR_INST_STG_TYPE, record?.stageType),
        }),

        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.visitTimeSlot1'),
            dataIndex: 'visitTimeSlotOne',
            key: 'visitTimeSlotOne',
            width: '180px',
            render: (text) => [
                <div>
                    {convertDateTimedayjs(text, dateFormatView)}
                    <br />
                    {convertDateTimedayjs(text, timeFormatView, '-')}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.visitTimeSlot2'),
            dataIndex: 'visitTimeSlotTwo',
            key: 'visitTimeSlotTwo',
            width: '180px',
            render: (text) => [
                <div>
                    {convertDateTimedayjs(text, dateFormatView)}
                    <br />
                    {convertDateTimedayjs(text, timeFormatView, '-')}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.visitTimeSlot3'),
            dataIndex: 'visitTimeSlotThree',
            key: 'visitTimeSlotThree',
            width: '180px',
            render: (text) => [
                <div>
                    {convertDateTimedayjs(text, dateFormatView)}
                    <br />
                    {convertDateTimedayjs(text, timeFormatView, '-')}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.status'),
            dataIndex: 'response',
            key: 'response',
            width: '180px',
            render: (_, record) => ChargerStatusTag(record?.stageStatus, typeData),
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.serviceId'),
            dataIndex: 'serviceId',
            key: 'serviceId',
            width: '200px',
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.scheduleDate'),
            dataIndex: 'date',
            key: 'date',
            width: '180px',
            render: (_, record) => (record?.scheduleDate ? convertDateMonthYear(record?.scheduleDate) : ''),
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.responseStatus'),
            dataIndex: 'response',
            width: '180px',
            key: 'response',
            render: (value) => ChargerSearchStatusTag(value, typeData),
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.responseRemark'),
            dataIndex: 'remark',
            key: 'remark',
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.activity'),
            width: '150px',
            render: (_, record) => <Button onClick={() => onHandleModal(record)} icon={<FiEye />} type="link"></Button>,
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.document'),
            dataIndex: 'document',
            key: 'document',
            width: '150px',
            render: (_, record) => (
                <a href={record?.supportingDocumentUrl} target="_blank" rel="noreferrer">
                    <img src={IMAGES.FILE} alt="document" />
                </a>
            ),
        }),
    ];

    return tableColumn;
};

export const serviceActivityColumns = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.serviceActivites'),
            dataIndex: 'key',
            key: 'key',
            width: '50%',
        }),

        tblPrepareColumns({
            title: translateContent('chargerInstallationDetailsTableColumn.label.response'),
            dataIndex: 'value',
            key: 'value',
            width: '50%',
        }),
    ];

    return tableColumn;
};
