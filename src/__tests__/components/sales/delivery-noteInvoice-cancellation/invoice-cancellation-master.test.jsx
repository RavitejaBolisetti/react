import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import InvoiceCancellationMaster  from 'components/Sales/DeliveryNoteInvoiceCancellation/InvoiceCancellationMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const data={"pageSize":10,"pageNumber":1,"totalRecords":2,"paginationData":[{"id":"617fa4fa-b3e3-4027-aaa0-aecb0704ef9e","requestType":"DNCA","requestNumber":"REQ003","invoiceId":"INV11000004","requestStatus":"O","invoiceDate":"2011-02-18","requestDate":"2021-12-07","dealerName":null,"status":"Pending"},{"id":"2b2f5284-f822-4605-a69f-b61cba2134fb","requestType":"INCA","requestNumber":"REQ001","invoiceId":"INV11000003","requestStatus":"O","invoiceDate":"2016-12-27","requestDate":"2017-04-08","dealerName":null,"status":"Pending"}]};

describe('InvoiceCancellationMaster Component', () => {
    it('should render InvoiceCancellationMaster component UI', () => {
        customRender(<InvoiceCancellationMaster />);
    });

    it('pending, approved, and rejected buttons should work', async () => {
      const mockStore = createMockStore({
          auth: { userId: 106 },
          data: { 
            Sales: {
                DeliveryNoteInvoice: { isDetailLoaded: true, data: data },
            },
        },
      });
      customRender(
          <Provider store={mockStore}>
              <InvoiceCancellationMaster />
          </Provider>
      );
      const pending=screen.getByRole('button', { name: 'Pending' });
      fireEvent.click(pending);
      const approved=screen.getByRole('button', { name: 'Approved' });
      fireEvent.click(approved);
      const rejected=screen.getByRole('button', { name: 'Rejected' });
      fireEvent.click(rejected);
  });

  it('advanced filters, search, and close buttons should work', () => {
      customRender(<InvoiceCancellationMaster />)
      const advanceFilters=screen.getByRole('button', { name: 'Advanced Filters' });
      fireEvent.click(advanceFilters);
      const searchBtn=screen.getByRole('button', { name: 'Search' });
      fireEvent.click(searchBtn);
      const closeBtn=screen.getByRole('button', { name: 'Close' });
      fireEvent.click(closeBtn);
  });

  it('search should work with remove filter', () => {
      customRender(<InvoiceCancellationMaster />)
      const searchBox=screen.getByRole('textbox', { name: '' });
      fireEvent.change(searchBox, { target: { value: 'Test' } });
      const searchBtn=screen.getByRole('button', { name: 'search' });
      fireEvent.click(searchBtn);
      const removeFilter=screen.getByTestId('removeFilter');
      fireEvent.click(removeFilter);
  });

  it('search should work with clear button', () => {
      customRender(<InvoiceCancellationMaster />)
      const searchBox=screen.getByRole('textbox', { name: '' });
      fireEvent.change(searchBox, { target: { value: 'REQ003' } });
      const searchBtn=screen.getByRole('button', { name: 'search' });
      fireEvent.click(searchBtn);
      const clearBtn=screen.getByRole('button', { name: 'Clear' });
      fireEvent.click(clearBtn);
  });

  it('advanced filters should work', async () => {
      customRender(<InvoiceCancellationMaster />)
      const advanceFilters=screen.getByRole('button', { name: 'Advanced Filters' });
      fireEvent.click(advanceFilters);

      const fromDate=screen.getByRole('textbox', { name: 'From Date' });
      fireEvent.click(fromDate);
      const todayForFromDate=await screen.findByText('Today');
      fireEvent.click(todayForFromDate);

      const toDate=screen.getByRole('textbox', { name: 'To Date' });
      fireEvent.click(toDate);
      const todayToFromDate=await screen.findAllByText('Today');
      fireEvent.click(todayToFromDate[1]);
      
      const searchBtn=screen.getByRole('button', { name: 'Search' });
      fireEvent.click(searchBtn);
  });

});
