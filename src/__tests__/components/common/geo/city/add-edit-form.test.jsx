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

const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}];
const stateData = [{"key":"106","value":"TestState","parentKey":"IND", "status":true}];
const districtData = [{"key":"106","value":"TestDistrict","parentKey":"106", "status":true}];

describe('Add Edit Form Component', () => {

    it('should render add edit form component', async () => {
        const formActionType={
            viewMode: true,
        }
        customRender(<AddEditForm formActionType={formActionType} isVisible={true}/>);
    });

    it('all fields select should work', async () => {
        const formActionType={
            editMode: true,
        };
        const formData={
            status: 'Active',
            countryCode: 'TEST'
        };
        customRender(<FormWrapper formActionType={formActionType} formData={formData} countryData={countryData} stateData={stateData} districtData={districtData} setButtonData={jest.fn()} isVisible={true}/>);

        const countrySelect=screen.getByRole('combobox', { name: /Country/i });
        act(() => {
            fireEvent.change(countrySelect, { target: { value: 'IND' } });
            const countryOptionSelect= screen.getByText(/INDIA/i);
            fireEvent.click(countryOptionSelect);
        });

        const stateSelect=screen.getByRole('combobox', { name: /State/i });
        act(() => {
            fireEvent.change(stateSelect, { target: { value: 'TestState' } });
            const stateOptionSelect= screen.getByText(/TestState/i);
            fireEvent.click(stateOptionSelect);
        });

        const districtSelect=screen.getByRole('combobox', { name: /District/i });
        act(() => {
            fireEvent.change(districtSelect, { target: { value: 'TestDistrict' } });
            const districtOptionSelect= screen.getByText(/TestDistrict/i);
            fireEvent.click(districtOptionSelect);
        });

        const cityName=screen.getByRole('textbox', { name: "City Name" });
        fireEvent.change(cityName, { target: { value: 'TestCity' } });

        const status=screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);
        
    });

});