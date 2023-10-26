/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Descriptions, Space, Card } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { ServiceActivity } from './ServiceActivity';
import { FilterIcon } from 'Icons';
import { getCodeValue } from 'utils/getCodeValue';

import styles from 'assets/sass/app.module.scss';
import { DataTable } from 'utils/dataTable';
import { addRequestColumnsView } from './tableColumn';

const ViewDetailMain = (props) => {
    const { typeData, isLoading, chargerInstallationMasterData, onHandleModal, modal, setModal } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const onAdvanceSearchCloseAction = () => {
        setModal(false);
    };
    const serviceActivityProps = {
        ...props,
        isVisible: modal,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Service Activity:' + getCodeValue(typeData?.CHRGR_INST_STG_TYPE, chargerInstallationMasterData?.chargerInstDetails?.requestDetails[0].stageStatus),
        onCloseAction: onAdvanceSearchCloseAction,
        onAdvanceSearchCloseAction,
        setModal,
        typeData,
    };

    return (
        <>
            <div className={styles.viewDrawerContainer}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Request Id">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.requestId, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Request Date">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.requestDate, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Request Status">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.requestStatus, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelGroup, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Model Variant">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelVarient, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Seating Capacity">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.seatingCapacity, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Color">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.color, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelCode, isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </Card>
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <DataTable tableColumn={addRequestColumnsView(typeData, onHandleModal)} tableData={chargerInstallationMasterData?.chargerInstDetails?.requestDetails} pagination={false} scroll={{ x: '1000' }} />
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </div>
            <ServiceActivity {...serviceActivityProps} />
        </>
    );
};

export const ViewDetail = ViewDetailMain;
