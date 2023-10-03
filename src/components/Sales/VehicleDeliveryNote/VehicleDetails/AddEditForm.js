/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Collapse, Divider } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';

import VehicleInfoForm from './VehicleInfoForm';
import BatteryInfoForm from './BatteryInfoForm';
import { NoDataFound } from 'utils/noDataFound';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { activeKey, setActiveKey, formData, form } = props;

    const vehicleDetailsProps = { ...props, form, formType: 'vehicle', formData };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel header="Vehicle Information" key="1">
                        <Divider />
                        <VehicleInfoForm {...vehicleDetailsProps} />
                    </Panel>
                </Collapse>
                <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                    <Panel header="Battery Details" key="2">
                        <Divider />
                        {formData?.batteryDetail?.length ? formData?.batteryDetail?.map((battery) => <BatteryInfoForm battery={battery} {...props} />) : <NoDataFound />}
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
