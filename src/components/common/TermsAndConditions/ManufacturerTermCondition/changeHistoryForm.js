import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Input, Form, Col, Row, Button, Select, DatePicker } from 'antd';

import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import { withDrawer } from 'components/withDrawer';
import { ListDataTable } from 'utils/ListDataTable';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';
import { convertDate } from 'utils/formatDateTime';
import { convertCalenderDate } from 'utils/formatDateTime';

const { Option } = Select;

const ChangeHistoryMain = (props) => {
    const { tableChangeHistoryProps, ChangeHistoryTermsConditionsData } = props;

    const [page, setPage] = useState(1);
    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'productName',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Document Type',
            dataIndex: 'documentTypeCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Language',
            dataIndex: 'languageDesc',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Description',
            dataIndex: 'termsconditiondescription',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Version',
            dataIndex: 'version',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Effective From',
            dataIndex: 'effectiveFrom',
            width: '15%',
            render: (text) => convertDate(text),
        }),
        tblPrepareColumns({
            title: 'Effective To',
            dataIndex: 'effectiveTo',
            width: '15%',
            render: (text) => convertDate(text),
        })
        // tblPrepareColumns({
        //     title: 'MFG T&C',
        //     width: '15%',
        //     sorter: false,
        //     render: (text, record, index) => {
        //         return (
        //             <Space>
        //                 {
        //                     <Button className={styles.tableIcons} danger ghost aria-label="ai-view">
        //                         {/* onClick={() => handleView(record)} */}
        //                         <ViewEyeIcon />
        //                     </Button>
        //                 }
        //             </Space>
        //         );
        //     },
        // }),

        // tblActionColumn({ handleButtonClick, styles, fixed: 'right', width: '10%' })
    );

    const tableProps = {
        tableColumn,
        tableData: ChangeHistoryTermsConditionsData,
        setPage,
    };
    console.log('ChangeHistoryTermsConditionsData', ChangeHistoryTermsConditionsData);
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
        </>
    );
};

export const ChangeHistory = withDrawer(ChangeHistoryMain, { title: 'Change History', width: '90%' });
