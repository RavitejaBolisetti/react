/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Collapse, Divider } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';

import VehicleInfoForm from './VehicleInfoForm';
import BatteryInfoForm from './BatteryInfoForm';
import { NoDataFound } from 'utils/noDataFound';

const { Panel } = Collapse;

const formTypeName = 'vehicle';

const AddEditFormMain = (props) => {
    const { formData, form } = props;

    const vehicleDetailsProps = { ...props, form, formType: formTypeName, formData };

    useEffect(() => {
        if (formData && Object?.keys(formData)?.length && Object?.values(formData)?.length) {
            form.setFieldsValue({ ...formData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse collapsible="icon" expandIcon={expandIcon} defaultActiveKey={['VI1']} expandIconPosition="end">
                    <Panel header="Vehicle Information" key="VI1">
                        <Divider />
                        <VehicleInfoForm {...vehicleDetailsProps} />
                    </Panel>
                </Collapse>
                <Collapse collapsible="icon" expandIcon={expandIcon} defaultActiveKey={['BD1']} expandIconPosition="end">
                    <Panel header="Battery Details" key="BD1">
                        <Divider />
                        <Row gutter={20}>
                            {formData?.batteryDetail?.length ? (
                                formData?.batteryDetail?.map((battery) => (
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <BatteryInfoForm battery={battery} {...props} />
                                    </Col>
                                ))
                            ) : (
                                <NoDataFound />
                            )}
                        </Row>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
