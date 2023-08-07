import { tableColumn } from '@components/common/CriticalityGroup/tableColumn';

import React from 'react';

jest.mock('antd', () => {
    const actualAntd = jest.requireActual('antd');
    return {
        ...actualAntd,
        Tag: jest.fn(({ color, children }) => (
            <span data-testid="tag" style={{ color }}>
                {children}
            </span>
        )),
    };
});

describe('tableColumn', () => {
    // Mock handleButtonClick function
    const handleButtonClick = jest.fn();

    it('renders the table columns correctly', () => {
        const columns = tableColumn(handleButtonClick);

        expect(columns).toHaveLength(5);

        // Check each column's properties
        expect(columns[0]).toHaveProperty('title', 'Criticality Group ID');
        expect(columns[0]).toHaveProperty('dataIndex', 'criticalityGroupCode');
        expect(columns[0]).toHaveProperty('width', '15%');

        expect(columns[1]).toHaveProperty('title', 'Criticality Group Name');
        expect(columns[1]).toHaveProperty('dataIndex', 'criticalityGroupName');
        expect(columns[1]).toHaveProperty('width', '25%');

        expect(columns[2]).toHaveProperty('title', 'Default Group');
        expect(columns[2]).toHaveProperty('dataIndex', 'criticalityDefaultGroup');
        expect(columns[2]).toHaveProperty('width', '15%');
        expect(columns[2].render(true)).toEqual(
            <span data-testid="tag" style={{ color: 'success' }}>
                Active
            </span>
        );
        expect(columns[2].render(false)).toEqual(
            <span data-testid="tag" style={{ color: 'error' }}>
                Inactive
            </span>
        );

        expect(columns[3]).toHaveProperty('title', 'Status');
        expect(columns[3]).toHaveProperty('dataIndex', 'activeIndicator');
        expect(columns[3]).toHaveProperty('width', '15%');
        expect(columns[3].render(true)).toEqual(
            <span data-testid="tag" style={{ color: 'success' }}>
                Active
            </span>
        );
        expect(columns[3].render(false)).toEqual(
            <span data-testid="tag" style={{ color: 'error' }}>
                Inactive
            </span>
        );

        expect(columns[4]).toHaveProperty('title', 'Action');
        expect(columns[4]).toHaveProperty('dataIndex', '');
        expect(columns[4]).toHaveProperty('width', '12%');
    });
});
