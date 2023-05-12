import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblApprovalStatusColumn, tblActionColumn } from 'utils/tableCloumn';
import { Checkbox } from 'antd';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize, width: '10%', fixed: 'left' }),

        tblPrepareColumns({
            title: 'PIN Category',
            dataIndex: 'pinCategory',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'PIN Code',
            dataIndex: 'pinCode',
            width: '35%',
        }),

        tblPrepareColumns({
            title: 'Locality',
            dataIndex: 'localityName',
            width: '35%',
        }),

        tblPrepareColumns({
            title: 'Within 50Km from the GPO',
            dataIndex: 'withIn50KmFromGpo',
            width: '35%',
            render: (text, record) => {
                return <Checkbox disabled defaultChecked={text ? true : false} className={styles.registered}></Checkbox>;
            },
        }),

        tblPrepareColumns({
            title: 'Approval Status',
            dataIndex: 'approvalStatus',
            render: (text, record) => <>{text ? <div className={styles.activeText}>Approved</div> : <div className={styles.inactiveText}>Not Approved</div>}</>,
            width: '15%',
        }),

        tblApprovalStatusColumn({ styles }),

        tblStatusColumn({ styles, fixed: 'right' }),

        tblActionColumn({ handleButtonClick, styles, fixed: 'right', width: '15%' })
    );

    return tableColumn;
};
