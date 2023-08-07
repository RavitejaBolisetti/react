/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Col, Row } from 'antd';
import styles from 'components/common/Common.module.css';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { SearchBox } from 'components/utils/SearchBox';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { DataTable } from 'utils/dataTable';

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, salesConsultantLov } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction } = props;

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
        // searchForm,
        // filterString,
        // optionType: typeData?.[PARAM_MASTER.OTF_SER.id],
        // setFilterString,
    };

    const tableColumn = [
        tblPrepareColumns({
            title: 'OTF No.',
            dataIndex: 'source',
        }),
        tblPrepareColumns({
            title: 'OTF Date',
            dataIndex: 'fieldName',
        }),
        tblPrepareColumns({
            title: 'Cust. Name',
            dataIndex: 'oldValue',
        }),
        tblPrepareColumns({
            title: 'CPD',
            dataIndex: 'newValue',
        }),
    ];

    const tableProps = {
        //isChangeHistoryLoading,
        tableColumn,
        //tableData: changeHistoryData?.otfChangeHistoryListResponse || [],
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h4>Vehicle Summary</h4>
                    <Card className={styles.ExchangeCard}>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="VIN/Chassis">{checkAndSetDefaultValue(formData?.initialPromiseDeliveryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label="Age In Days">{checkAndSetDefaultValue(formData?.custExpectedDeliveryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label="PDI Done?">{checkAndSetDefaultValue(getCodeValue(typeData?.SALE_TYP, formData?.saleType), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Status">{checkAndSetDefaultValue(getCodeValue(typeData?.PRC_TYP, formData?.priceType), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="M&M Invoices Date">{checkAndSetDefaultValue(formData?.bookingAmount, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="M&M Invoices No.">{checkAndSetDefaultValue(formData?.loyaltyScheme ? <span className={styles.activeText}>Yes</span> : 'No', isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(formData?.loyaltyScheme ? <span className={styles.activeText}>Yes</span> : 'No', isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    <h4>Allot OTF</h4>
                    <Card>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.marB20}>
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
