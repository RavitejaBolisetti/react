/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Card, Descriptions, Row, Col } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DataTable } from 'utils/dataTable';
import { tblPrepareColumns } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

const ViewDetailMain = (props) => {
    const { formData = { modelDealerMapResponse: `` }, isLoading, viewProductData, modelGroupArr, setViewProductData, hoPriceDetailData, formActionType } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const dealerSelected = formData?.dealerSelectOnRoadPrice === false ? 'InActive' : formData?.dealerSelectOnRoadPrice === true ? 'Active' : null;

    const tableColumn = [
        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'prodctShrtName',
        }),
        tblPrepareColumns({
            title: 'Select',
            dataIndex: 'yesNo',
        }),
    ];

    useEffect(() => {
        setViewProductData(() => []);
        if (formActionType?.viewMode && modelGroupArr?.length ) {
            let distinctArr = modelGroupArr.map((item) => item.prodctCode).filter((value, index, self) => self.indexOf(value) === index);
            for (let i = 0; i < distinctArr?.length; i++) {
                let key = hoPriceDetailData?.modelDealerMapResponse?.find((e) => e?.modelGroupCode === distinctArr[i]);
                if (key && key?.id && key?.status) {
                    setViewProductData((prev) => [...prev, { prodctShrtName: modelGroupArr?.find((e) => e?.prodctCode === distinctArr[i])?.prodctShrtName, yesNo: `Yes` }]);
                } else {
                    setViewProductData((prev) => [...prev, { prodctShrtName: modelGroupArr?.find((e) => e?.prodctCode === distinctArr[i])?.prodctShrtName, yesNo: `No` }]);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelGroupArr]);

    const tableProps = {
        isLoading,
        tableColumn,
        tableData: viewProductData,
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <h4>Dealer List</h4>
                </Col>
            </Row>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="State">{checkAndSetDefaultValue(formData?.state, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="City">{checkAndSetDefaultValue(formData?.city, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Dealer Parent">{checkAndSetDefaultValue(formData?.dealerParent, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Dealer Location">{checkAndSetDefaultValue(formData?.dealerBranch, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Dealer Selected for on Road Price">{checkAndSetDefaultValue(dealerSelected, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <h4>Model Details</h4>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <DataTable {...tableProps} pagination={false} />
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
