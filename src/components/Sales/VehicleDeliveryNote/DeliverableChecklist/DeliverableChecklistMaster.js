/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col } from 'antd';

import { connect } from 'react-redux';

import { tableColumn } from './tableColumn';
import styles from 'assets/sass/app.module.scss';
import { ListDataTable } from 'utils/ListDataTable';
import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';

export const DeliverableChecklistMasterBase = (props) => {
    const { section } = props;
    // const [selectionType, setSelectionType] = useState('checkbox');

    // const extraParams = [
    //     {
    //         key: 'vin',
    //         title: 'vin',
    //         value: selectedRecordId,
    //         name: 'VIN ',
    //     },
    // ];
    // const errorAction = (message) => {
    //     showGlobalNotification(message);
    // };

    // const onSuccessAction = (res) => {
    //     showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    // };

    // useEffect(() => {
    //     if (userId && selectedRecordId) {
    //         fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, selectedRecordId]);

    const myProps = {
        ...props,
        buttonData: { ...props.buttonData, editBtn: false, nextBtn: true, saveBtn: false },
    };

    const tableData = [{}];

    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>

                    <ListDataTable pagination={false} tableColumn={tableColumn()} tableData={tableData} />
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDeliveryNoteFormButton {...myProps} />
                </Col>
            </Row>
        </>
    );
};

export const DeliverableChecklistMaster = connect(null, null)(DeliverableChecklistMasterBase);
