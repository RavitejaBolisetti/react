import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";

import { ViewDetail } from "@components/Sales/OTF/ExchangeVehicles/ViewDetail"

describe("ViewDetail component render", ()=>{
    const props = {
        styles:{},
        isLoading:true,
        exchangeData:[{make:'test', modelGroup:'test1'}],
        financeLovData:[{ label: 'value', value: 'key' }],
        schemeLovData:[{ label: 'value', value: 'key' }],
        makeData:[{ label: 'value', value: 'key' }],
        modelData:[{ label: 'value', value: 'key' }],
        variantData:[{ label: 'value', value: 'key' }]
    }
   

    const viewMode = true;
    const styles = {}
    it("should veiw detail main component rendr", ()=>{
        const { getByRole } = customRender(<ViewDetail isVisible={true} viewMode={viewMode} {...props}/>)
        expect(screen.getByRole('table', {name:"", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('rowgroup', {name:"", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('row', {name:"Customer ID Customer Name Make", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('columnheader', {name:"Customer ID", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('columnheader', {name:"Customer Name", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('cell', {name:"-", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('columnheader', {name:"Make", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('columnheader', {name:"Hypothecated To", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('columnheader', {name:"Hypothecated To", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('columnheader', {name:"Hypothecated To", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('columnheader', {name:"Hypothecated To", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('columnheader', {name:"Hypothecated To", exact:false})).toBeInTheDocument();

        expect(screen.getByRole('columnheader', {name:"Hypothecated To", exact:false})).toBeInTheDocument();

        // screen.getByRole('view-comp-id');
        // screen.debug()
    })
})