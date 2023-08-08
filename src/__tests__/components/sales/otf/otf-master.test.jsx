import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { OtfMaster } from "@components/Sales/OTF/OtfMaster";
import { OTFMainConatiner } from "@components/Sales/OTF/OTFMainConatiner";
import { AdvancedSearch } from "@components/Sales/OTF/AdvancedSearch";
import { CancellationMaster } from "@components/Sales/OTF/OTFCancellation/CancellationMaster";
import { TransferMaster } from "@components/Sales/OTF/OTFTransfer/TransferMaster";
import { ChangeHistory } from "@components/Sales/OTF/ChangeHistory";



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
   describe("AdvancedSearch component render",()=>{
    it("should render AdvancedSearch component ",()=>{
      customRender(<AdvancedSearch />)
    });
  });
  describe("CancellationMaster component render",()=>{
    it("should render CancellationMaster component ",()=>{
      customRender(<CancellationMaster />)
    });
  });
  describe("TransferMaster component render",()=>{
    it("should render TransferMaster component ",()=>{
      customRender(<TransferMaster />)
    });
  });
  describe("showGlobalNotification component render",()=>{
    it("should render showGlobalNotification component ",()=>{
      customRender(<showGlobalNotification />)
    });
  });
  describe("ChangeHistory component render",()=>{
    it("should render ChangeHistory component ",()=>{
      customRender(<ChangeHistory />)
    });
  });
