/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';

import { withModal } from 'components/withModal';
import { DataTable } from 'utils/dataTable';
import { serviceActivityColumns } from './tableColumn';

export const ServiceActivityModalForm = (props) => {
    return <DataTable tableColumn={serviceActivityColumns()} pagination={false} scroll={{ x: '1000' }} />;
};

export const ServiceActivity = withModal(ServiceActivityModalForm, {});
