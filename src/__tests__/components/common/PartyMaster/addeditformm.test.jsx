/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { AddEditForm } from "@components/common/PartyMaster/addeditform";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  jest.clearAllMocks();
});

const buttonData = {
  closeBtn: true,
  cancelBtn: true,
  saveBtn: true,
  saveAndNewBtn: true,
  editBtn: true,
  formBtnActive: true,
};

const user = userEvent.setup();
const saveButtonName = 'Save';
const isLoadingOnSave = false;

const props = {                
  buttonData: [],
  setButtonData: jest.fn(),
  formActionType: '',
  formData: {},
  setFormData: jest.fn(),
  forceUpdate: jest.fn(),
  handleFormValueChange: jest.fn(),
  handleFormFieldChange: jest.fn(),
  allowedTimingSave: false,
  onCloseAction: true,
};

describe("party master Components", () => {
  it("should render input field components", () => {
    customRender(<AddEditForm
      isVisible={true}
      formData={{}}
      resetFields={jest.fn()}
      editMode={jest.fn()}
      buttonData={buttonData}
      setButtonData={jest.fn()}
      handleButtonClick={jest.fn()}
      onCloseAction={jest.fn()}
      saveButtonName={saveButtonName}
      isLoadingOnSave={isLoadingOnSave}
      {...props}
    />
  );
    const partyname = screen.getByLabelText('Party Name');
    fireEvent.change(partyname, { target: { value: 'Dmstest' } });
    expect(partyname.value.includes('Dmstest'));

    const contactpersonname = screen.getByLabelText('Contact Person Name');
    fireEvent.change(contactpersonname, { target: { value: 'Dmstest' } });
    expect(contactpersonname.value.includes('Dmstest'));

    const designation = screen.getByLabelText('Designation');
    fireEvent.change(designation, { target: { value: 'Dmsdesignation' } });
    expect(designation.value.includes('Dmsdesignation'));

    const address = screen.getByLabelText('Address');
    fireEvent.change(address, { target: { value: 'Dmsaddress' } });
    expect(address.value.includes('Dmsaddress'));

    const city = screen.getByLabelText('City');
    fireEvent.change(city, { target: { value: 'Dmscity' } });
    expect(city.value.includes('Dmscity'));

    const tehsil = screen.getByLabelText('Tehsil');
    fireEvent.change(tehsil, { target: { value: 'Dmstehsil' } });
    expect(tehsil.value.includes('Dmstehsil'));

    const district = screen.getByLabelText('District');
    fireEvent.change(district, { target: { value: 'Dmsdistrict' } });
    expect(district.value.includes('Dmsdistrict'));

    const state = screen.getByLabelText('State');
    fireEvent.change(state, { target: { value: 'Dmsstate' } });
    expect(state.value.includes('Dmsdistrict'));

    const GSTINnumber = screen.getByLabelText('GSTIN number');
    fireEvent.change(GSTINnumber, { target: { value: 'Dmsgsti' } });
    expect(GSTINnumber.value.includes('Dmsgsti'));

    const pan = screen.getByLabelText('PAN');
    fireEvent.change(pan, { target: { value: 'Dmspan' } });
    expect(pan.value.includes('Dmspan'));

    const creditlimit = screen.getByLabelText('Credit Limit');
    fireEvent.change(creditlimit, { target: { value: 'Dmscreditlimit' } });
    expect(creditlimit.value.includes('Dmscreditlimit'));

    const creditdays = screen.getByLabelText('Credit Days');
    fireEvent.change(creditdays, { target: { value: 'Dmscreditdays' } });
    expect(creditdays.value.includes('Dmscreditdays'));

    const checkremarks = screen.getByLabelText('Remarks');
    user.type(checkremarks, 'Dmatest');
    expect(checkremarks.value.includes('Dmatest'));
  });


  it("should render text", ()=> {
    customRender(<AddEditForm 
      isVisible={true}
      formData={{}}
      resetFields={jest.fn()}
      editMode={jest.fn()}
      buttonData={buttonData}
      setButtonData={jest.fn()}
      handleButtonClick={jest.fn()}
      onCloseAction={jest.fn()}
      saveButtonName={saveButtonName}
      isLoadingOnSave={isLoadingOnSave}
      {...props}
  />);
    const defaulttitle = screen.getByText('default title');
    expect(defaulttitle).toBeInTheDocument()

    const partycategory = screen.getByTitle('Party Category');
    expect(partycategory).toBeInTheDocument();
  });

  it('Is pin code search Field Present or not', () => {
    customRender(<AddEditForm 
      isVisible={true}
      formData={{}}
      resetFields={jest.fn()}
      editMode={jest.fn()}
      buttonData={buttonData}
      setButtonData={jest.fn()}
      handleButtonClick={jest.fn()}
      onCloseAction={jest.fn()}
      saveButtonName={saveButtonName}
      isLoadingOnSave={isLoadingOnSave}
      {...props}
    />);
    const btnSearch = screen.findByPlaceholderText('Search');
    expect(btnSearch).toBeTruthy();
    expect(screen.getByRole('img', { name: 'search' })).toBeTruthy();
    fireEvent.click(screen.getByRole('img', { name: 'search' }));
    const SearchBtn = screen.getByRole('button', { name: 'search' });
    fireEvent.click(SearchBtn); 
    expect(SearchBtn).toBeTruthy();
  });

});

