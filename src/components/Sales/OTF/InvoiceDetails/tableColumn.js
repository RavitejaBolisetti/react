import { tblPrepareColumns } from 'utils/tableCloumn';

export const tableColumnInvoice = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Invoice Number',
            dataIndex: 'invoiceNumber',
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Invoice Date',
            dataIndex: 'invoiceDate',
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Invoice Status',
            dataIndex: 'invoiceStatus',
            sorter: false,
        }),
    ];

    return tableColumn;
};

export const tableColumnDelivery = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Delivery Note Number',
            dataIndex: 'deliveryNoteNumber',
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Delivery Note Date',
            dataIndex: 'deliveryNoteDate',
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Delivery Note Status',
            dataIndex: 'deliveryNoteStatus',
            sorter: false,
        }),
    ];

    return tableColumn;
};
