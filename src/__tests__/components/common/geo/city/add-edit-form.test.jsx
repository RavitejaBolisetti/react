import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { AddEditForm } from 'components/common/Geo/City/AddEditForm';
import { screen, fireEvent, act } from '@testing-library/react';
import { Form } from 'antd';


const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldValue: jest.fn(),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};

describe('Add Edit Form Component', () => {

    it('should render add edit form component', async () => {
        const formActionType={
            viewMode: true,
        }
        customRender(<AddEditForm formActionType={formActionType} isVisible={true}/>);
    });

    it('country select should work', async () => {
        const formActionType={
            editMode: true,
        };
        const formData={
            status: 'Active',
            countryCode: 'TEST'
        };
        const stateData=[{
            parentKey: 'IND'
        }];
        const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}];
        customRender(<FormWrapper formActionType={formActionType} formData={formData} countryData={countryData} stateData={stateData} setButtonData={jest.fn()} isVisible={true}/>);

        const countrySelect=screen.getByRole('combobox', { name: /Country/i });
        act(() => {
            fireEvent.change(countrySelect, { target: { value: 'IND' } });
            const countryOptionSelect= screen.getByText(/INDIA/i);
            fireEvent.click(countryOptionSelect);
        });
    });

});