/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import AnswerForm from '@components/Sales/VehicleChecklistMaster/AnswerModelForm/AnswerFormCard/AnswerForm';

describe('answer form card component', () => {
    it('should render answer form component', () => {
        customRender(<AnswerForm />);
    });

    it('button should work', () => {
        customRender(<AnswerForm onFinishAnswerForm={jest.fn()} setAnswerSwitch={jest.fn()} />);
        const answerCode = screen.getByRole('textbox', { name: 'Answer Code' });
        fireEvent.change(answerCode, { target: { value: 'test12' } });

        const answerDescription = screen.getByRole('textbox', { name: 'Answer Description' });
        fireEvent.change(answerDescription, { target: { value: 'test123' } });

        const AanswerStatus = screen.getByRole('switch', { name: 'Answer Status' });
        fireEvent.click(AanswerStatus);

        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
    });
});
