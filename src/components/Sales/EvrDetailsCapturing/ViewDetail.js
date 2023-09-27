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
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="VIN">{checkAndSetDefaultValue(formData?.vin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(formData?.modelGroup, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(formData?.modelCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(formData?.modelDescription, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="GRN ID">{checkAndSetDefaultValue(formData?.grnId, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="GRN Date">{checkAndSetDefaultValue(formData?.grnDate, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="GRN Status">{checkAndSetDefaultValue(formData?.grnStatus, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Vehicle Status">{checkAndSetDefaultValue(formData?.vehicleStatus, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Age In Days">{checkAndSetDefaultValue(formData?.ageInDays, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Date of Last Charge">{checkAndSetDefaultValue(formData?.dateOfLastCharge, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Charging Due Date">{checkAndSetDefaultValue(formData?.chargingDueDate, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Charging Status">{checkAndSetDefaultValue(formData?.chargingStatus, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(formData?.remarks)}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status ? 'Charged' : 'UnCharged'}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
