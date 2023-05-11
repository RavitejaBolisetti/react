import { Checkbox } from 'antd';
import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblApprovalStatusColumn, tblActionColumn } from 'utils/tableCloumn';
import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'PIN Category',
            dataIndex: 'pinCategory',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'PIN Code',
            dataIndex: 'pinCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Locality',
            dataIndex: 'localityName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Within 50Km from the GPO',
            dataIndex: 'withIn50KmFromGpo',
            width: '20%',
            render: (text, record) => {
                return <Checkbox disabled defaultChecked={text ? true : false} className={styles.registered}></Checkbox>;
            },
        }),

        tblApprovalStatusColumn({ styles }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
