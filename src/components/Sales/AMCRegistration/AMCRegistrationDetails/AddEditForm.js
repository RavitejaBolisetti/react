/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Collapse, Divider } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';

import RegistrationForm from './RegistrationForm';
import SchemeDetailsForm from './SchemeDetailsForm';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { activeKey, setActiveKey } = props;
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
                <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange('regKey')} expandIconPosition="end">
                    <Panel header="Registration Information" key="regKey">
                        <Divider />
                        <RegistrationForm {...props} />
                    </Panel>
                </Collapse>
                <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange('schemeKey')} expandIconPosition="end">
                    <Panel header="Scheme Details" key="schemeKey">
                        <Divider />
                        <SchemeDetailsForm {...props} />
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

const AddEditForm = AddEditFormMain;
export default AddEditForm;
