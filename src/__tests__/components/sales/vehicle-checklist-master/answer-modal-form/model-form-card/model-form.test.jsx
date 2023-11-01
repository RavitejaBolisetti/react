/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import ModelForm from '@components/Sales/VehicleChecklistMaster/AnswerModelForm/ModelFormCard/ModelForm';

describe('model form card component', () => {
    it('should render model form component', () => {
        customRender(<ModelForm />);
    });

    it('button should work', () => {
        customRender(<ModelForm onFinishModelForm={jest.fn()} setModelSwitch={jest.fn()} />);
        const modelGroupCode = screen.getByRole('combobox', { name: 'Model Group Code' });
        fireEvent.change(modelGroupCode, { target: { value: 'test12' } });

        const modelGroupStatus = screen.getByRole('switch', { name: 'Model Group Status' });
        fireEvent.click(modelGroupStatus);

        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
    });
});
