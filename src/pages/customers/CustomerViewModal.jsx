import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../slices/uiSlice";

export default function CustomerViewModal() {
  const dispatch = useDispatch();

  const customer = useSelector((state) => state.customer.selectedCustomer);

  const loading = useSelector((state) => state.customer.loading);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!customer) {
    return <div className="p-6">Customer not found</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6 w-[700px]">
      <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

      <pre className="text-xs bg-gray-100 p-4 rounded mt-4">
        {JSON.stringify(customer, null, 2)}
      </pre>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Name</label>
          <p>{customer.displayName}</p>
        </div>

        <div>
          <label>Customer Code</label>
          <p>{customer.customerCode}</p>
        </div>

        <div>
          <label>Mobile</label>
          <p>{customer.mobile}</p>
        </div>

        <div>
          <label>Email</label>
          <p>{customer.email}</p>
        </div>

        <div>
          <label>GSTIN</label>
          <p>{customer.gstin}</p>
          {/* <pre className="text-xs bg-gray-100 p-4 rounded mt-4">
            {JSON.stringify(customer, null, 2)}
          </pre> */}
        </div>

        <div>
          <label className="font-semibold">Billing Address</label>

          <p>{customer.billingAddress?.attention}</p>
          <p>{customer.billingAddress?.address}</p>
          <p>
            {customer.billingAddress?.city}, {customer.billingAddress?.state}
          </p>
          <p>
            {customer.billingAddress?.country} -{" "}
            {customer.billingAddress?.zipCode}
          </p>
          <p>{customer.billingAddress?.phone}</p>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={() => dispatch(closeModal())}
          className="btn-secondary"
        >
          Close
        </button>
      </div>
    </div>
  );
}
