import React from 'react';
import { ViewDetail } from 'components/Sales/VehicleAllotment/ViewDetail';
import { tableColumnSearchOTF } from 'components/Sales/VehicleAllotment/tableColumnSearchOTF';
import customRender from '@utils/test-utils';
import { screen, fireEvent, render } from "@testing-library/react";
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [searchForm] = Form.useForm();
    return <ViewDetail searchForm={searchForm} {...props} />;
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Vehicle Allotment Master Component', () => {

    it('Should render view details', () => {
        const formData = { allotmentStatus: "", vehicleOTFDetails: {} }
        const buttonData = {
            allotBtn: true
        }
        const tableDataItem = [{key: 1, value: 'test'}, {key: 2, value: 'test'}]

        customRender(
            <FormWrapper isVisible={true} handleButtonClick={jest.fn()} tableData={tableDataItem} buttonData={buttonData} setFilterStringOTFSearch={jest.fn()} setSelectedOrderOTFDetails={jest.fn()} formData={formData} />
        )

        const searchBtn = screen.getByRole("button", { name: 'search' })
        fireEvent.click(searchBtn)

        const search = screen.getByPlaceholderText("Search")
        fireEvent.change(search, { target: { value: "test" } })

        const searchDrop = screen.getAllByRole("combobox")
        fireEvent.change(searchDrop[0], { target: { value: "test" } })

        const allot = screen.getByRole("button", { name: 'Allot' })
        fireEvent.click(allot)

        const radio = screen.getAllByRole("radio")
        fireEvent.click(radio[0])

        const closeBtn = screen.getByRole("button", { name: 'Close' })
        fireEvent.click(closeBtn)
    })

    it('Should render table column', () => {
        const columns = tableColumnSearchOTF();
        render(<div>{columns[1].render('Test')}</div>);
        render(<div>{columns[3].render('Test')}</div>);
    })
});