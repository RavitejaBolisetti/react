/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Col, Row, Divider } from 'antd';
import styles from 'components/common/Common.module.css';
import style from 'components/utils/SearchBox/SearchBox.module.css';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { SearchBox } from 'components/utils/SearchBox';
import { tblPrepareColumns } from 'utils/tableColumn';
import { DataTable } from 'utils/dataTable';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { PARAM_MASTER } from 'constants/paramMaster';

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, salesConsultantLov, searchForm, filterString, setFilterString } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, handleSearchParamSearch } = props;


    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 6, xl: 6, xxl: 6 },
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const serachBoxProps = {
        searchForm,
        filterString,
        optionType: typeData?.[PARAM_MASTER.OTF_SER.id].filter(searchType => searchType.key !== 'mobileNumber'),
        setFilterString,
        handleSearchParamSearch,
    };

    const tableColumn = [
        tblPrepareColumns({
            title: '',

        }),
        tblPrepareColumns({
            title: 'OTF No.',
            dataIndex: 'otfNumber',
        }),
        tblPrepareColumns({
            title: 'OTF Date',
            dataIndex: 'otfDate',
            render: (text) => convertDateMonthYear(text),
        }),
        tblPrepareColumns({
            title: 'Cust. Name',
            dataIndex: 'custName',
        }),
        tblPrepareColumns({
            title: 'CPD',
            dataIndex: 'custCd',
        }),
    ];

    const tableProps = {
        //isChangeHistoryLoading,
        tableColumn,
        tableData: [formData?.vehicleOTFDetails] || [],
        pagination: false,
        srl: false,
        rowSelection: true,
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h4>Vehicle Summary</h4>
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="VIN/Chassis">{checkAndSetDefaultValue(formData?.vehicleIdentificationNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Age In Days">{checkAndSetDefaultValue(formData?.ageInDays, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="PDI Done?">{checkAndSetDefaultValue(getCodeValue(typeData?.SALE_TYP, formData?.pdiDone), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Status">{checkAndSetDefaultValue(getCodeValue(typeData?.PRC_TYP, formData?.status), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="M&M Invoices Date">{checkAndSetDefaultValue(formData?.mnmInvoiceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label="M&M Invoices No.">{checkAndSetDefaultValue(formData?.mnmInvoiceNo, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(formData?.modelDescription, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <Divider className={styles.marT20} />
                    <h4>Allot OTF</h4>
                    <Card>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={`${styles.marB20} ${style.viewAllotment}`}>
                                <SearchBox {...serachBoxProps} />
                            </Col>
                        </Row>
                        <DataTable {...tableProps} />
                    </Card>
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(ViewDetailMain, { width: '90%', footer: null });
