/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Select, Form } from 'antd';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

const URLFilterReportPageBase = (props) => {
    const [form] = Form.useForm();
    const [filter, setFlter] = useState();
    const reportLink = process.env.REACT_APP_POWER_BI_URL_FILTER_REPORT + ` eq '${filter}'`;
    const pageHeaderData = {
        pageTitle: 'URL Filter Report',
        showChangeHisoty: true,
        canMarkFavourite: true,
        visibleChangeHistory: false,
    };
    return (
        <>
            <Form colon={false} form={form}>
                <PageHeader {...pageHeaderData} />
                <Form.Item label="Select User">
                    <Select
                        showSearch
                        style={{
                            width: 200,
                        }}
                        placeholder="Select Name"
                        allowClear
                        optionFilterProp="children"
                        onChange={(value) => setFlter(value)}
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                        options={[
                            {
                                value: 'kartik',
                                label: 'Kartik',
                            },
                            {
                                value: 'pranjal',
                                label: 'Pranjal',
                            },
                            {
                                value: 'rahul',
                                label: 'Rahul',
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
            {filter ? (
                <object data={reportLink} width="100%" height="90%">
                    <embed src={reportLink} width="100%" height="90%"></embed>
                    Issue with report
                </object>
            ) : (
                <div style={{ textAlign: 'center' }}>Please select user to view the report</div>
            )}
        </>
    );
};

export const URLFilterReportPage = withLayoutMaster(URLFilterReportPageBase);
