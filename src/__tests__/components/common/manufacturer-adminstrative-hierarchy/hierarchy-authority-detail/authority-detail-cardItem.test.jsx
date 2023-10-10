import '@testing-library/jest-dom/extend-expect';
import AuthorityDetailCardItem from '@components/common/ManufacturerAdminstrativeHierarchy/HierarchyAuthorityDetail/AuthorityDetailCardItem';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [actionForm] = Form.useForm();
    return <AuthorityDetailCardItem actionForm={actionForm} {...props} />;
};

describe('Authority Detail CardItem components', () => {
    it('save button should work', () => {
        customRender( <FormWrapper isVisible={true} resetData={jest.fn()} setFormType={jest.fn()} setErrorMessage={jest.fn()} setIsBtnDisabled={jest.fn()} /> );

        const editBtn = screen.getAllByRole('button', { name: '' });
        fireEvent.click(editBtn[0]);

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

    });

    it('cancel button should work', () => {

        customRender( <FormWrapper isVisible={true} resetData={jest.fn()} setFormType={jest.fn()} setErrorMessage={jest.fn()} setIsBtnDisabled={jest.fn()} /> );

        const editBtn = screen.getAllByRole('button', { name: '' });
        fireEvent.click(editBtn[0]);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

    });


});
