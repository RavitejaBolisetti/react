import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblApprovalStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize, width: '10%', fixed: 'left' }),

        tblPrepareColumns({
            title: 'PIN Code',
            dataIndex: 'pinCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Locality',
            dataIndex: 'localityName',
            width: '200px',
        }),

        tblStatusColumn({ styles }),

        tblApprovalStatusColumn({ styles }),

        tblPrepareColumns({
            title: 'Tehsil',
            dataIndex: 'tehsilName',
            width: '200px',
        }),

        tblPrepareColumns({
            title: 'City',
            dataIndex: 'cityName',
            width: '200px',
        }),

        tblPrepareColumns({
            title: 'District',
            dataIndex: 'districtName',
            width: '200px',
        }),

        tblPrepareColumns({
            title: 'State',
            dataIndex: 'stateName',
            width: '200px',
        }),

        tblActionColumn({ handleButtonClick, styles, fixed: 'right', width: '10%' })
    );

    return tableColumn;
};
