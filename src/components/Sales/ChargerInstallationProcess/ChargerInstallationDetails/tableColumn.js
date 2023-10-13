/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear, converDateDayjs } from 'utils/formatDateTime';
import { ChargerStatusTag } from '../ChargerStatusTag';
import { FiEye } from 'react-icons/fi';
import { getCodeValue } from 'utils/getCodeValue';
export const addRequestColumns = (typeData) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Request Change',
            dataIndex: 'stage',
            key: 'stage',
            width: '25%',
            render: (_, record) => getCodeValue(typeData?.CHRGR_INST_STG_TYPE, record?.requestStage),
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
            width: '40%',
            render: (_, record) => (record?.stageRequestDate ? convertDateMonthYear(record?.stageRequestDate) : ''),
        }),
        tblPrepareColumns({
            title: 'Request Change',
            dataIndex: 'stage',
            width: '40%',
            render: (_, record) => getCodeValue(typeData?.CHRGR_INST_STG_TYPE, record?.requestStage),
        }),

        tblPrepareColumns({
            title: 'Visit TimeSlot 1',
            dataIndex: 'visitTimeSlotOne',
            key: 'visitTimeSlotOne',
            width: '40%',
            render: (_, record) => (record?.visitTimeSlotOne ? convertDateMonthYear(record?.visitTimeSlotOne) : ''),
        }),
        tblPrepareColumns({
            title: 'Visit TimeSlot 2',
            dataIndex: 'visitTimeSlotTwo',
            key: 'visitTimeSlotTwo',
            width: '40%',
            render: (_, record) => (record?.visitTimeSlotTwo ? convertDateMonthYear(record?.visitTimeSlotTwo) : ''),
        }),
        tblPrepareColumns({
            title: 'Visit TimeSlot 3',
            dataIndex: 'visitTimeSlotThree',
            key: 'visitTimeSlotThree',
            width: '40%',
            render: (_, record) => (record?.visitTimeSlotThree ? convertDateMonthYear(record?.visitTimeSlotThree) : ''),
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: '40%',
            render: (_, record) => ChargerStatusTag(record?.requestStatus),
        }),
        tblPrepareColumns({
            title: 'Service Id',
            dataIndex: 'serviceId',
            key: 'serviceId',
            width: '40%',
        }),
        tblPrepareColumns({
            title: 'Schedule Date',
            dataIndex: 'date',
            key: 'date',
            width: '40%',
            render: (_, record) => (record?.scheduleDate ? convertDateMonthYear(record?.scheduleDate) : ''),
        }),
        tblPrepareColumns({
            title: 'Response Status',
            dataIndex: 'status',
            key: 'status',
            width: '40%',
        }),
        tblPrepareColumns({
            title: 'Response Remark',
            dataIndex: 'remark',
            key: 'remark',
            width: '40%',
        }),
        tblPrepareColumns({
            title: 'Activity',
            width: '40%',
            render: (_, record) => <FiEye onClick={onHandleModal} style={{ color: '#ff3e5b' }} />,
        }),
        tblPrepareColumns({
            title: 'Document',
            dataIndex: 'document',
            key: 'document',
            width: '40%',
            // render: (_, record) => record?.serviceId,
        }),
    ];

    return tableColumn;
};

export const serviceActivityColumns = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Service Activities',
            dataIndex: 'activity',
            key: 'activity',
            width: '50%',
        }),

        tblPrepareColumns({
            title: 'Response',
            dataIndex: 'response',
            key: 'response',
            width: '50%',
        }),
    ];

    return tableColumn;
};