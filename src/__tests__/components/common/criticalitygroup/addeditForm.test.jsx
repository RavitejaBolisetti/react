import '@testing-library/jest-dom/extend-expect';
import { render, form, Form, screen, fireEvent, getByTestId } from '@testing-library/react';
import customRender from '@utils/test-utils';
// import { find } from 'enzyme';
import { generateRandomNumber } from 'utils/generateRandomNumber';

import { AddEditForm } from '@components/common/CriticalityGroup/AddEditForm';

const onFinishFailed = (errorInfo) => {
    form.validateFields().then((values) => {});
};

describe('AddEditForm Components', () => {
    it('should render AddEditForm components', () => {
        render(<AddEditForm />);
    });
});

describe('AddEdit Fields', () => {
    it('should render fields', () => {
        render(<AddEditForm generateRandomNumber={generateRandomNumber} isVisible={true} formActionType={{ addMode: true, editMode: false, viewMode: false }} />);
        const field = screen.findByTestId('groupId');
        const field2 = screen.findByTestId('name');
        expect(field).toBeTruthy();
        expect(field2).toBeTruthy();
    });
});

describe('should toggle switch', () => {
    it('should render the toggle switch', () => {
        render(<AddEditForm isVisible={true} formActionType={{ addMode: true, editMode: false, viewMode: false }} />);
        expect(screen.getByTestId('toggle')).toBeInTheDocument();
        expect(screen.getByTestId('default-toggle')).toBeInTheDocument();
        const value = screen.getByText(/allowed timings/i);
        expect(value).toBeInTheDocument();
    });

    //.......Working Test if Enzyme Loads...........//

    // test('should render finish function', () => {
    //     const wrapper = render(<AddEditForm />);
    //     const form = wrapper.find(Form);
    //     form.setFields({
    //         criticalityGroupCode: {
    //             errors: ['This is a required field'],
    //         },
    //     });
    //     expect(onFinishFailed).toBeCalledWith({
    //         name: 'This is a required field',
    //     });
    // });
});
