import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Form } from 'antd'; // Mock Form component if needed
import { BindFormItems, FORMTYPE_CONSTANTS, MakeCheckResult } from '@components/VehicleDeliveryNote/DeliverableChecklist/CheckListUtils'; // Replace 'YourComponent' with your actual component path

import { FORMTYPE_CONSTANTS } from '';
describe('BindFormItems', () => {
    it('should render Input field for answerType "Input"', () => {
        const AdvanceformData = { answerType: FORMTYPE_CONSTANTS.INPUT.key };
        const aggregateForm = render(
            <Form>
                <BindFormItems AdvanceformData={AdvanceformData} />
            </Form>
        );

        const inputField = aggregateForm.getByLabelText('Check Result');
        expect(inputField).toBeInTheDocument();
    });

    it('should render Number fields for answerType "Number"', () => {
        const AdvanceformData = { answerType: FORMTYPE_CONSTANTS.NUMBER.key };
        const aggregateForm = render(
            <Form>
                <BindFormItems AdvanceformData={AdvanceformData} />
            </Form>
        );

        const minRangeInput = aggregateForm.getByLabelText('Min Range');
        const maxRangeInput = aggregateForm.getByLabelText('Max Range');
        expect(minRangeInput).toBeInTheDocument();
        expect(maxRangeInput).toBeInTheDocument();
    });

    it('should render Date fields for answerType "Date"', () => {
        const AdvanceformData = { answerType: FORMTYPE_CONSTANTS.DATE.key };
        const aggregateForm = render(
            <Form>
                <BindFormItems AdvanceformData={AdvanceformData} />
            </Form>
        );

        const fromDateInput = aggregateForm.getByLabelText('From Date');
        const toDateInput = aggregateForm.getByLabelText('To Date');
        expect(fromDateInput).toBeInTheDocument();
        expect(toDateInput).toBeInTheDocument();
    });

    it('should render Select field for answerType "Boolean"', () => {
        const AdvanceformData = { answerType: FORMTYPE_CONSTANTS.BOOLEAN.key };
        const aggregateForm = render(
            <Form>
                <BindFormItems AdvanceformData={AdvanceformData} />
            </Form>
        );

        const selectField = aggregateForm.getByLabelText('Check Result');
        expect(selectField).toBeInTheDocument();
    });

    it('should render Select field for answerType "Fixed"', () => {
        const AdvanceformData = { answerType: FORMTYPE_CONSTANTS.FIXED.key };
        const data = {
            checklistAnswerResponses: [
                { answerCode: '1', answerDescription: 'Option 1' },
                { answerCode: '2', answerDescription: 'Option 2' },
            ],
        };
        const aggregateForm = render(
            <Form>
                <BindFormItems AdvanceformData={AdvanceformData} data={data} />
            </Form>
        );

        const selectField = aggregateForm.getByLabelText('Check Result');
        expect(selectField).toBeInTheDocument();
    });
});

describe('MakeCheckResult', () => {
    it('should return date range for type "Date"', () => {
        const props = {
            type: FORMTYPE_CONSTANTS.DATE.key,
            data: {
                answerFromDate: '2023-Sep-12',
                answerToDate: '2023-Sep-15',
            },
        };

        const { container } = render(<MakeCheckResult {...props} />);
        expect(container.textContent).toBe('12-Sep-2023 - 15-Sep-2023');
    });

    it('should return "NA" for type "Date" when no dates are provided', () => {
        const props = {
            type: FORMTYPE_CONSTANTS.DATE.key,
            data: {},
        };

        const { container } = render(<MakeCheckResult {...props} />);
        expect(container.textContent).toBe('NA');
    });

    it('should return "Yes" for type "Boolean" when data.answerBoolean is true', () => {
        const props = {
            type: FORMTYPE_CONSTANTS.BOOLEAN.key,
            data: {
                answerBoolean: true,
            },
        };

        const { container } = render(<MakeCheckResult {...props} />);
        expect(container.textContent).toBe('Yes');
    });

    it('should return "No" for type "Boolean" when data.answerBoolean is false', () => {
        const props = {
            type: FORMTYPE_CONSTANTS.BOOLEAN.key,
            data: {
                answerBoolean: false,
            },
        };

        const { container } = render(<MakeCheckResult {...props} />);
        expect(container.textContent).toBe('No');
    });

    it('should return "NA" for type "Boolean" when data.answerBoolean is undefined', () => {
        const props = {
            type: FORMTYPE_CONSTANTS.BOOLEAN.key,
            data: {
                answerBoolean: undefined,
            },
        };

        const { container } = render(<MakeCheckResult {...props} />);
        expect(container.textContent).toBe('NA');
    });
    it('should return number range for type "Number"', () => {
        const props = {
            type: FORMTYPE_CONSTANTS.NUMBER.key,
            data: {
                answerFromNumber: 10,
                answerToNumber: 20,
            },
        };

        const { container } = render(<MakeCheckResult {...props} />);
        expect(container.textContent).toBe('10-20');
    });

    it('should return "NA" for type "Number" when no numbers are provided', () => {
        const props = {
            type: FORMTYPE_CONSTANTS.NUMBER.key,
            data: {},
        };

        const { container } = render(<MakeCheckResult {...props} />);
        expect(container.textContent).toBe('NA');
    });

    it('should return the answer description for type "Fixed"', () => {
        const props = {
            type: FORMTYPE_CONSTANTS.FIXED.key,
            data: {
                answerText: 'A',
                checklistAnswerResponses: [
                    { answerCode: 'A', answerDescription: 'Option A' },
                    { answerCode: 'B', answerDescription: 'Option B' },
                ],
            },
        };

        const { container } = render(<MakeCheckResult {...props} />);
        expect(container.textContent).toBe('Option A');
    });

    it('should return the answer text for type "Input"', () => {
        const props = {
            type: FORMTYPE_CONSTANTS.INPUT.key,
            data: {
                answerText: 'Sample Answer',
            },
        };

        const { container } = render(<MakeCheckResult {...props} />);
        expect(container.textContent).toBe('Sample Answer');
    });
});
