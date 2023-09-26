import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/LessorCustomerCreation/AddEditForm';
import customRender from '@utils/test-utils';

describe('AddEditForm component render', ()=>{
    it('render', ()=>{
        customRender(<AddEditForm />);
    })
})