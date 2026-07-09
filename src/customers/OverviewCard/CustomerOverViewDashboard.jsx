import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomerById } from "../../slices/customers/thunks/customerThunks"
import { openModal } from '../../slices/Ui/uiSlice';

import toast from 'react-hot-toast';
import CustomerOverViewSiderTopbar from '../../customers/OverviewCard/CustomerOverViewSiderTopbar';
import CustomerOverViewSiderDetails from '../../customers/OverviewCard/CustomerOverViewSiderDetails';
import CustomerOverviewTabTopbar from '../../customers/OverviewCard/CustomerOverviewTabTopbar';
import CustomerOverViewTabsTopbardown from '../../customers/OverviewCard/CustomerOverViewTabsTopbardown';

export default function CustomerOverViewDashboard() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.selectedCustomer);


  useEffect(() => {
    if (id) {
      dispatch(getCustomerById(id));
    }
  }, [id, dispatch]);

  return (

    <div className="h-screen flex">
      {/* Left Sidebar */}
      <div className="w-[440px] border border-gray-200 ">
        <div className="sticky top-0 z-40 bg-white border border-gray-200">
          <CustomerOverViewSiderTopbar />
        </div>

        <div className="flex-1 ">
          <CustomerOverViewSiderDetails />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Sticky Header — fixed from accidental modal backdrop classes */}
        <div className="sticky top-0 z-40 bg-white flex flex-col">
          <CustomerOverviewTabTopbar />
          <CustomerOverViewTabsTopbardown />
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          {/* <CustomerTabContent /> */}

        </div>
      </div>
    </div>
  );
}
