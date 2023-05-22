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
            width: '150px',
        }),

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

        tblPrepareColumns({
            title: 'Country',
            dataIndex: 'countryName',
            width: '200px',
        }),

        // tblPrepareColumns({
        //     title: 'Detail',
        //     width: '300px',
        //     render: (text, record) => {
        //         let $sDetail = 'Country:' + record?.countryName;
        //         $sDetail += 'District:' + record?.districtName;

        //         return $sDetail;
        //     },
        // }),

        tblPrepareColumns({
            title: 'Within 50Km from the GPO',
            dataIndex: 'withIn50KmFromGpo',
            width: '250px',
            render: (text, record) => {
                return <Checkbox disabled defaultChecked={text ? true : false} className={styles.registered}></Checkbox>;
            },
        }),

        tblApprovalStatusColumn({ styles }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles, fixed: 'right', width: '10%' })
    );

    return tableColumn;
};
