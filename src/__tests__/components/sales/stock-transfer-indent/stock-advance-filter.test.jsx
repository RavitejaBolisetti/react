/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdvanceOTFFilter from '@components/Sales/StockTransferIndent/AdvanceFilter';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) =>{
    const [searchForm] = Form.useForm();
    const myMock = {
        ...searchForm,
        resetFields:jest.fn()
    }
    return <AdvanceOTFFilter searchForm={myMock} {...props} />
}

describe("AdvanceOTFFilter",()=>{

        it("Indent Raised Button", ()=>{
            customRender(<FormWrapper setToggleButton={jest.fn()} />);
    
            const raisedBtn = screen.getByRole('button', {name:'Indent Raised'});
            fireEvent.click(raisedBtn);
        });
    
    
        it("Indent Received", ()=>{
            customRender(<FormWrapper setToggleButton={jest.fn()} />);
    
            const receivedBtn = screen.getByRole('button', {name:'Indent Received'});
            fireEvent.click(receivedBtn);
        });

        it("Advance Filters Button", ()=>{
            customRender(<FormWrapper setAdvanceSearchVisible={jest.fn()} advanceFilter={true} />);
    
            const advancedBtn = screen.getByRole('button', {name:'Advance Filters'});
            fireEvent.click(advancedBtn);
        });

        it("removeBtn", ()=>{
            const extraParams = [
                {
                    name:'test1',
                    key: 'searchType',
                    title: 'Type',
                    value: 'status',
                    canRemove: true,
                    filter: {
                        canRemove:true
                    },
                },
            ];
    
            const filterString = {
                searchType:'T',
                dealerLocation:'test',
                advanceFilter:true
            };
            customRender(<FormWrapper removeFilter={jest.fn()} advanceFilter={true} extraParams={extraParams} filterString={filterString}/>);

            const removeBtn = screen.getByTestId('removeBtn');
            fireEvent.click(removeBtn);
        })

        it("Clear button", ()=>{

            customRender(<FormWrapper removeFilter={jest.fn()} advanceFilter={true} extraParams={[{name:'test1'}]} filterString={{advanceFilter:true}} handleResetFilter={jest.fn()} />);

            const clearBtn = screen.getByRole('button', {name:'Clear'});
            fireEvent.click(clearBtn);
        })

        it("searchImg", ()=>{
            const filterString={advanceFilter:true}

            customRender(<FormWrapper extraParams = { [{name: 'test',value:'1',filter:'tes',canRemove:true}] } advanceFilter={true} filterString={filterString} removeFilter={jest.fn()} />);

            const searchIndent = screen.getAllByRole('textbox');
            fireEvent.change(searchIndent[0], {target:{value:test}});

            const searchImg = screen.getByRole('img', {name:'search'});
            fireEvent.click(searchImg);
        })
});