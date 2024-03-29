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
import { translateContent } from 'utils/translateContent';

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
            title: translateContent('hoPriceMapping.label.productHierarchy'),
            dataIndex: 'prodctShrtName',
        }),
        tblPrepareColumns({
            title: translateContent('hoPriceMapping.label.select'),
            dataIndex: 'yesNo',
        }),
    ];

    useEffect(() => {
        setViewProductData(() => []);
        if (formActionType?.viewMode && modelGroupArr?.length) {
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
                    <h2 className={styles.marT0}>{translateContent('hoPriceMapping.heading.dealerList')}</h2>
                </Col>
            </Row>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('hoPriceMapping.label.state')}>{checkAndSetDefaultValue(formData?.state, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('hoPriceMapping.label.city')}>{checkAndSetDefaultValue(formData?.city, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('hoPriceMapping.label.dealerParent')}>{checkAndSetDefaultValue(formData?.dealerParent, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('hoPriceMapping.label.dealerLocation')}>{checkAndSetDefaultValue(formData?.dealerBranch, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('hoPriceMapping.label.dealerSelectOnRoadPrice')}>{checkAndSetDefaultValue(dealerSelected, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <h2>{translateContent('hoPriceMapping.heading.modelDetails')}</h2>
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
