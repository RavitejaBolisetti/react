/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { handleBtnVisibility } from '@components/Sales/StockTransferIndent/IssueIndent/utils/handleBtnVisibility';

describe("handleBtnVisibility component", ()=>{

    it("CNCL, INDNT_RAISED", ()=>{
        const props = {
            checkKey: 'CNCL',
            toggleButton: 'INDNT_RAISED'
        }
        handleBtnVisibility(props);
    });

    it("REC, INDNT_RAISED", ()=>{
        const props = {
            checkKey: 'REC',
            toggleButton: 'INDNT_RAISED'
        }
        handleBtnVisibility(props);
    });

    it("RET, INDNT_RAISED", ()=>{
        const props = {
            checkKey: 'RET',
            toggleButton: 'INDNT_RAISED'
        }
        handleBtnVisibility(props);
    });

    it("I, INDNT_RAISED", ()=>{
        const props = {
            checkKey: 'I',
            toggleButton: 'INDNT_RAISED'
        }
        handleBtnVisibility(props);
    });

    it("defaultVisibility, canAdd: false", ()=>{
        const props = {
            defaultVisibility : {
                canCancel: true,
                canReturn: false,
                canReceive: false,
                canPrint: true,
                canAdd: false,
            },
            toggleButton: 'INDNT_RAISED'
        }
        handleBtnVisibility(props);
    });

    it("CNCL", ()=>{
        const props = {
            checkKey: 'CNCL',
            toggleButton: 'INDNT_RECV'
        }
        handleBtnVisibility(props);
    });

    it("REC", ()=>{
        const props = {
            checkKey: 'REC',
            toggleButton: 'INDNT_RECV'
        }
        handleBtnVisibility(props);
    });

    it("RET", ()=>{
        const props = {
            checkKey: 'RET',
            toggleButton: 'INDNT_RECV'
        }
        handleBtnVisibility(props);
    });

    it("I", ()=>{
        const props = {
            checkKey: 'I',
            toggleButton: 'INDNT_RECV'
        }
        handleBtnVisibility(props);
    });

    it("defaultVisibility, canAdd: true", ()=>{
        const props = {
            defaultVisibility : {
                canCancel: true,
                canReturn: false,
                canReceive: false,
                canPrint: true,
                canAdd: true,
            },
            toggleButton: 'INDNT_RECV'
        }
        handleBtnVisibility(props);
    });

    it("defaultVisibility, canAdd: true", ()=>{
        const props = {
            defaultVisibility : {
                canCancel: true,
                canReturn: false,
                canReceive: false,
                canPrint: true,
                canAdd: true,
            }
        }
        handleBtnVisibility(props);
    });
})