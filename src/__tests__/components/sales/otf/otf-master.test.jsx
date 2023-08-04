import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { act } from 'react-dom/test-utils';
import { OtfMaster } from "@components/Sales/OTF/OtfMaster";
import { OTFMainConatiner } from "@components/Sales/OTF/OTFMainConatiner";
import { ListDataTable } from "@utils/ListDataTable";
import { AdvancedSearch } from "@components/Sales/OTF/AdvancedSearch";

describe("OtfMaster component render",()=>{
    it("should render OtfMaster component ",()=>{
      customRender(<OtfMaster />)
    });
  });
  
describe("OTFMainConatiner component render",()=>{
    it("should render OTFMainConatiner component ",()=>{
      customRender(<OTFMainConatiner />)
    });
  });
  describe("ListDataTable component render",()=>{
    it("should render ListDataTable component ",()=>{
      customRender(<ListDataTable />)
    });
  });
  describe("AdvancedSearch component render",()=>{
    it("should render AdvancedSearch component ",()=>{
      customRender(<AdvancedSearch />)
    });
  });
