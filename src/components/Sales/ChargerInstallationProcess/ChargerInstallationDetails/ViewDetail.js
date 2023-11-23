/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Descriptions, Space, Card, Collapse, Typography } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { ServiceActivity } from './ServiceActivity';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import { expandIcon } from 'utils/accordianExpandIcon';
import styles from 'assets/sass/app.module.scss';
import { DataTable } from 'utils/dataTable';
import { addRequestColumnsView } from './tableColumn';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

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
        titleOverride: translateContent('chargerInstallationDetails.label.serviceActivity') + getCodeValue(typeData?.[PARAM_MASTER.CHRGR_INST_HDR_STAT.id], chargerInstallationMasterData?.chargerInstDetails?.requestStatus),
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
                        <Card style={{ backgroundColor: '#F2F2F2' }}>
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('chargerInstallationDetails.label.requestId')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.requestId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('chargerInstallationDetails.label.requestDate')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.requestDate, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('chargerInstallationDetails.label.requestStatus')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.CHRGR_INST_HDR_STAT.id], chargerInstallationMasterData?.chargerInstDetails?.requestStatus), isLoading)}</Descriptions.Item>

                                <Descriptions.Item label={translateContent('chargerInstallationDetails.label.modelGroup')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelGroup, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('chargerInstallationDetails.label.modelVariant')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelVarient, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('chargerInstallationDetails.label.seatingCapacity')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.seatingCapacity, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('chargerInstallationDetails.label.color')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.color, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('chargerInstallationDetails.label.modelCode')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelCode, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                        {/* <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <DataTable tableColumn={addRequestColumnsView(typeData, onHandleModal)} tableData={chargerInstallationMasterData?.chargerInstDetails?.requestDetails} pagination={false} scroll={{ x: 2400 }} />
                            </Card> */}

                        <Collapse collapsible="icon" expandIcon={expandIcon} expandIconPosition="end">
                            <Panel
                                header={
                                    <Row type="flex" justify="space-between" align="middle" size="large">
                                        <Row type="flex" justify="space-around" align="middle">
                                            <Typography>{translateContent('chargerInstallationDetails.label.requestDetails')}</Typography>
                                        </Row>
                                    </Row>
                                }
                                key="1"
                            >
                                <DataTable tableColumn={addRequestColumnsView(typeData, onHandleModal)} tableData={chargerInstallationMasterData?.chargerInstDetails?.requestDetails} pagination={false} scroll={{ x: 2400 }} />
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
            </div>
            <ServiceActivity {...serviceActivityProps} />
        </>
    );
};

export const ViewDetail = ViewDetailMain;
