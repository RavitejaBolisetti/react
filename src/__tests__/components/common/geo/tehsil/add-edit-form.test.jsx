import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { AddEditForm } from 'components/common/Geo/Tehsil/AddEditForm';
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

    it('form fields should work', async () => {
        const formActionType={
            editMode: true,
        };
        const formData={
            stateCode: 106,
            countryCode: "TEST"
        };
        const tehsilCategoryData=[{key: 106, value: 'Kai'}]
        const stateData = [{"key":"106","value":"TestState","parentKey":"IND", "status":true}];
        const districtData = [{parentKey: 106, "key":"106","value":"TestDistrict",}];
        const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}];
        customRender(<FormWrapper formActionType={formActionType} tehsilCategoryData={tehsilCategoryData} defaultCountry={"IND"} formData={formData} districtData={districtData} countryData={countryData} stateData={stateData} setButtonData={jest.fn()} isVisible={true}/>);

        const districtSelect=screen.getByRole('combobox', { name: /District/i });
        act(() => {
            fireEvent.change(districtSelect, { target: { value: 'TestDistrict' } });
            const districtOptionSelect= screen.getByText(/TestDistrict/i);
            fireEvent.click(districtOptionSelect);
        });

        const stateSelect=screen.getByRole('combobox', { name: /State Name/i });
        act(() => {
            fireEvent.change(stateSelect, { target: { value: 'TestState' } });
            const stateOptionSelect= screen.getByText(/TestState/i);
            fireEvent.click(stateOptionSelect);
        });

        const countrySelect=screen.getByRole('combobox', { name: /Country/i });
        act(() => {
            fireEvent.change(countrySelect, { target: { value: 'IND' } });
            const countryOptionSelect= screen.getByText(/INDIA/i);
            fireEvent.click(countryOptionSelect);
        });

        const status=screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);
    });

});