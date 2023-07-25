import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { act } from 'react-dom/test-utils';
import { Dashboard } from "@components/Dashboard/Dashboard";
import { DashboardSkelton } from "@components/Dashboard/DashboardSkelton";
const LeftSideBar= { collapsed: false }
describe("dashboard component render",()=>{
    it("should render dashboard component ",()=>{
      customRender(<Dashboard />)
      expect(screen.getByText(/Home/i)).toBeInTheDocument();
    });
    it("should check button events", async()=>{
      customRender(<Dashboard LeftSideBar={LeftSideBar}/>)
       const viewMore = screen.getAllByText(/View More/i);
        expect(viewMore).toBeTruthy();
    })
  });
  
describe("DashboardSkelton component render",()=>{
    it("should render DashboardSkelton component ",()=>{
      customRender(<DashboardSkelton />)
    });
  });