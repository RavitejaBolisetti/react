/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('tableColumn', () => {
    it('should generate the correct table columns', () => {
        const props = {
            title: 'any',
            dataIndex: "ghgdf",
            width: "35",
            ellipsis: true,
            filters: jest.fn(),
            render: jest.fn(),
            filterMode: "test",
            filterSearch: true,
            onFilter: jest.fn(),
            sorter: jest.fn(),
            sortDirections:[],
        }

        const tableData = {
            entitlementsAndSchemeResponses:[{
                description:"description2",
                schemeType:"type2"
            }]
        }
        
        customRender(<tableColumn {...props} tblPrepareColumns={jest.fn()} tableColumn={[]} formattedCalendarDate={jest.fn()} tableData={tableData}/>);
    });

});




