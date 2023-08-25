import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { VehicleDetailsMaster } from '@components/Sales/VehicleDetail/VehicleDetails/VehicleDetailsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';


afterEach(() => {
    jest.restoreAllMocks();
});


const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn()
    }
    return <VehicleDetailsMaster form={myFormMock}  {...props} />;
};


describe('Vehicle details master render', () => {

    it('should render vehicle detals master components', async () => {
        customRender(<VehicleDetailsMaster selectedRecordId="testID" />)
    })

    it('should render vehicle detals master click minus and plus button', () => {
        const formActionType = { viewMode: true }
        customRender(<VehicleDetailsMaster
            formActionType={formActionType}
            onChange={jest.fn()}
            selectedRecordId={"test"}
        />)

        const minusBtn = screen.getAllByRole('img');
        fireEvent.click(minusBtn[0]);
        const vehicleDetails = screen.getByText('Vehicle Details');
        fireEvent.click(vehicleDetails);

        fireEvent.click(minusBtn[1]);
        const number = screen.getByText('Registration Number Change Request');
        fireEvent.click(number);
    })

    it('should render vehicle detals master view details button', () => {
        const formActionType = { viewMode: true }
        customRender(<VehicleDetailsMaster
            formActionType={formActionType}
            fetchList={jest.fn()}
        />)

        const endDate = screen.getByRole('columnheader', { name: 'Manufacturer Warranty End Date', exact: false });
        expect(endDate).toBeTruthy();

        const deliveryDate = screen.getByRole('columnheader', { name: 'Delivery Date', exact: false });
        expect(deliveryDate).toBeTruthy();

        const saleDate = screen.getByRole('columnheader', { name: 'Sale Date', exact: false });
        expect(saleDate).toBeTruthy();

        const soldBy = screen.getByRole('columnheader', { name: 'Sold By', exact: false });
        expect(soldBy).toBeTruthy();

        const odometerReading = screen.getByRole('columnheader', { name: 'Last Odometer Reading', exact: false });
        expect(odometerReading).toBeTruthy();

        const averageRun = screen.getByRole('columnheader', { name: 'Average Run', exact: false });
        expect(averageRun).toBeTruthy();

        const nextDue = screen.getByRole('columnheader', { name: 'Next Due Service', exact: false });
        expect(nextDue).toBeTruthy();

        const manager = screen.getByRole('columnheader', { name: 'Relationship Manager', exact: false });
        expect(manager).toBeTruthy();

        const serviceDueDate = screen.getByRole('columnheader', { name: 'Next Service Due Date', exact: false });
        expect(serviceDueDate).toBeTruthy();

        const expireDate = screen.getByRole('columnheader', { name: 'PUC Expiry Date', exact: false });
        expect(expireDate).toBeTruthy();

        const insuranceExpiryDate = screen.getByRole('columnheader', { name: 'Insurance Expiry Date', exact: false });
        expect(insuranceExpiryDate).toBeTruthy();

        const customerCategory = screen.getByRole('columnheader', { name: 'Customer Category-SSI', exact: false });
        expect(customerCategory).toBeTruthy();

        const customerCategoryCSI = screen.getByRole('columnheader', { name: 'Customer Category-CSI', exact: false });
        expect(customerCategoryCSI).toBeTruthy();

        const customerCategoryIQS = screen.getByRole('columnheader', { name: 'Customer Category-IQS', exact: false });
        expect(customerCategoryIQS).toBeTruthy();

        const oemPriviledgeCustomer = screen.getByRole('columnheader', { name: 'OEM Priviledge Customer', exact: false });
        expect(oemPriviledgeCustomer).toBeTruthy();

        const keyAccountVehicle = screen.getByRole('columnheader', { name: 'Key Account Vehicle', exact: false });
        expect(keyAccountVehicle).toBeTruthy();

        const theftVehicle = screen.getByRole('columnheader', { name: 'Theft Vehicle', exact: false });
        expect(theftVehicle).toBeTruthy();

        const pdiDone = screen.getByRole('columnheader', { name: 'PDI Done', exact: false });
        expect(pdiDone).toBeTruthy();

        const buyBackVehicle = screen.getByRole('columnheader', { name: 'Buy Back Vehicle', exact: false });
        expect(buyBackVehicle).toBeTruthy();

        const governmentVehicle = screen.getByRole('columnheader', { name: 'Government Vehicle', exact: false });
        expect(governmentVehicle).toBeTruthy();

        const taxiNonTaxi = screen.getByRole('columnheader', { name: 'Taxi/Non Taxi', exact: false });
        expect(taxiNonTaxi).toBeTruthy();

        const ctcVehicleMM = screen.getByRole('columnheader', { name: 'M&M CTC Vehicle', exact: false });
        expect(ctcVehicleMM).toBeTruthy();

        const managedBy = screen.getByRole('columnheader', { name: 'Managed By', exact: false });
        expect(managedBy).toBeTruthy();

    })

    it('should render vehicle detals master addEdit form button', () => {
        const formActionType = { viewMode: false }
        const props = {
            onFinish: jest.fn(),
            onFinishFailed: jest.fn(),
            fetchList: jest.fn(),
            typeData: [{ key: 1, value: 'test' }],
            userId: 63456,
            isDataLoaded: false,
            formData: { key: 1, value: 'test' },
            isLoading: false,
            setMnmCtcVehicleFlag: jest.fn(),
            onChange: jest.fn(),
            setactiveKey: jest.fn(),
            selectedRecordId: 'test'
        }
        customRender(<VehicleDetailsMaster
            {...props}
            formActionType={formActionType}
            userId={'123'} selectedRecordId={'123'}
        />)

        const minusBtn = screen.getAllByRole('img');
        fireEvent.click(minusBtn[0]);
        const vehicleDetails = screen.getByText('Vehicle Details');
        fireEvent.click(vehicleDetails);

        fireEvent.click(minusBtn[7]);
        const change = screen.getByText('Registration Number Change Request');
        fireEvent.click(change);


        const endDate = screen.getByRole('textbox', { name: 'Manufacturer Warranty End Date', exact: false });
        fireEvent.change(endDate, { target: { value: 'Hello World' } });

        const deliveryDate = screen.getByRole('textbox', { name: 'Delivery Date', exact: false });
        fireEvent.change(deliveryDate, { target: { value: 'Hello World' } });

        const saleDate = screen.getByRole('textbox', { name: 'Sale Date', exact: false });
        fireEvent.change(saleDate, { target: { value: 'Hello World' } });

        const soldBy = screen.getByRole('textbox', { name: 'Sold By', exact: false });
        fireEvent.change(soldBy, { target: { value: 'Hello World' } });

        const odometerReading = screen.getByRole('textbox', { name: 'Last Odometer Reading', exact: false });
        fireEvent.change(odometerReading, { target: { value: 'Hello World' } });

        const averageRun = screen.getByRole('textbox', { name: 'Average Run', exact: false });
        fireEvent.change(averageRun, { target: { value: 'Hello World' } });

        const nextDue = screen.getByRole('textbox', { name: 'Next Due Service', exact: false });
        fireEvent.change(nextDue, { target: { value: 'Hello World' } });

        const manager = screen.getByRole('textbox', { name: 'Relationship Manager', exact: false });
        fireEvent.change(manager, { target: { value: 'Hello World' } });

        const serviceDueDate = screen.getByRole('textbox', { name: 'Next Service Due Date', exact: false });
        fireEvent.change(serviceDueDate, { target: { value: 'Hello World' } });

        const expireDate = screen.getByRole('textbox', { name: 'PUC Expiry Date', exact: false });
        fireEvent.change(expireDate, { target: { value: 'Hello World' } });

        const insuranceExpiryDate = screen.getByRole('textbox', { name: 'Insurance Expiry Date', exact: false });
        fireEvent.change(insuranceExpiryDate, { target: { value: 'Hello World' } });

        const customerCategory = screen.getByRole('textbox', { name: 'Customer Category-SSI', exact: false });
        fireEvent.change(customerCategory, { target: { value: 'Hello World' } });

        const customerCategoryCSI = screen.getByRole('textbox', { name: 'Customer Category-CSI', exact: false });
        fireEvent.change(customerCategoryCSI, { target: { value: 'Hello World' } });

        const customerCategoryIQS = screen.getByRole('textbox', { name: 'Customer Category-IQS', exact: false });
        fireEvent.change(customerCategoryIQS, { target: { value: 'Hello World' } });

        const oemPriviledgeCustomer = screen.getByRole('checkbox', { name: 'OEM Privileged Customer', exact: false });
        fireEvent.click(oemPriviledgeCustomer);
        // expect(oemPriviledgeCustomer).toBeChecked();

        const keyAccountVehicle = screen.getByRole('checkbox', { name: 'Key Account Vehicle', exact: false });
        fireEvent.click(keyAccountVehicle);
        // expect(keyAccountVehicle).toBeChecked();

        const refurbished = screen.getByRole('checkbox', { name: 'Refurbished', exact: false });
        fireEvent.click(refurbished);
        // expect(refurbished).toBeChecked();

        const theftVehicle = screen.getByRole('checkbox', { name: 'Theft Vehicle', exact: false });
        fireEvent.click(theftVehicle);
        // expect(theftVehicle).toBeChecked();

        const pdiDone = screen.getByRole('checkbox', { name: 'PDI Done', exact: false });
        fireEvent.click(pdiDone);
        // expect(pdiDone).toBeChecked();

        const governmentVehicle = screen.getByRole('checkbox', { name: 'Government Vehicle', exact: false });
        fireEvent.click(governmentVehicle);
        // expect(governmentVehicle).toBeChecked();        

        const ctcVehicleMM = screen.getByRole('checkbox', { name: 'M&M CTC Vehicle', exact: false });
        fireEvent.click(ctcVehicleMM);
        // expect(ctcVehicleMM).toBeChecked();

        const taxiNonTaxi = screen.getByRole('combobox', { name: 'Taxi/Non Taxi', exact: false });
        fireEvent.change(taxiNonTaxi, { target: { value: 'Hello World' } });
    })


    it('should render vehicle detals master addEdit form user type button', () => {
        const formActionType = { viewMode: false }
        const mockStore = {
            data: {
                ConfigurableParameterEditing: { filteredListData: [{ key: 1, value: 'test' }] },
                Vehicle: {
                    ViewVehicleDetail: { isLoaded: true, isLoading: true, data: { key: 1, value: 'test', id: 2 } },
                },
            },
            selectedRecordId: '7565'
        }

        const formData = {
            key:12,
            value: "test"
        }

        const vehicleDetails = {
            vehicleDetails:{
                id: 3,
                registrationNumber: "65656",
                vin: '73467'
            }            
        }

        const defaultBtnVisiblity = {
            editBtn: true,
            saveBtn: true,
            cancelBtn: true,
            saveAndNewBtn: true,
            saveAndNewBtnClicked: true,
            closeBtn: true,
            formBtnActive: true,
            cancelOTFBtn: true,
            transferOTFBtn: true,
            allotBtn: true,
            unAllotBtn: true,
            invoiceBtn: true,
            deliveryNote: true,
            changeHistory: true,
        };

        customRender(<FormWrapper
            formActionType={formActionType}
            selectedRecordId="MAKGF1F57A9193179"
            fetchList={jest.fn()}
            saveButtonName={'Save & Next'}
            onSuccessAction={jest.fn()} 
            showGlobalNotification={jest.fn()} 
            onError={jest.fn()} 
            buttonData={defaultBtnVisiblity} 
            onCloseAction={jest.fn()} 
            resetData={jest.fn()} 
            onSuccess={jest.fn()} 
            handleFormValueChange={jest.fn()} 
            handleFieldsChange={jest.fn()} 
            onFinish={jest.fn()} 
            onFinishFailed={jest.fn()}
            formData={formData}
            userType={"MNM"}
            checked={true}
            setButtonData={jest.fn()}
        />, {
            initialState: mockStore,
        })

        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    })
})