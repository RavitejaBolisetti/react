import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { AddEditForm } from 'components/common/Geo/Pincode/AddEditForm';
import { screen, fireEvent } from '@testing-library/react';
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
            districtCode: 106
        };
        const districtData = [{parentKey: 106, "key":"106","value":"TestDistrict",}];
        const typeData = [{parentKey: 106, "key":"106","value":"TestDistrict",}];
        const cityData = [{parentKey: 106}];
        const tehsilData = [{parentKey: 106}];
        const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}];
        const stateData = [{"key":"106","value":"TestState","parentKey":"IND", "status":true}];
        
        customRender(<FormWrapper formActionType={formActionType} typeData={typeData} stateData={stateData} countryData={countryData} formData={formData} districtData={districtData} cityData={cityData} tehsilData={tehsilData} setButtonData={jest.fn()} isVisible={true}/>);

        const countrySelect=screen.getByRole('combobox', { name: /Country/i });
            fireEvent.change(countrySelect, { target: { value: 'IND' } });
            const countryOptionSelect= screen.getByText(/INDIA/i);
            fireEvent.click(countryOptionSelect);

        const stateSelect=screen.getByRole('combobox', { name: /State/i });

            fireEvent.change(stateSelect, { target: { value: 'TestState' } });
            const stateOptionSelect= screen.getByText(/TestState/i);
            fireEvent.click(stateOptionSelect);


        const locality=screen.getByRole('switch', { name: 'Is Locality Under 50Km of GPO' });
        fireEvent.click(locality);

        // const status=screen.getByRole('switch', { name: 'Status' });
        // fireEvent.click(status);

    });

});