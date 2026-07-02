import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addCustomer,
  editCustomer,
  setField,
  setAddressField,
  resetForm,
} from "../../slices/customerSlice";
import { closeModal } from "../../slices/uiSlice";
import toast from "react-hot-toast";

export default function CreateCustomerModal() {
  const dispatch = useDispatch();

  const {
    selectedCustomer,

    displayName,
    email,
    mobile,
    companyName,
    customerType,
    pan,

    billingAddress,
    shippingAddress,

    loading,
  } = useSelector((state) => state.customer);

  const editing = !!selectedCustomer;

  useEffect(() => {
    if (!selectedCustomer) return;

    dispatch(
      setAddressField({
        addressType: "billingAddress",
        field: "address",
        value: selectedCustomer.billingAddress?.address || "",
      }),
    );

    dispatch(
      setAddressField({
        addressType: "billingAddress",
        field: "city",
        value: selectedCustomer.billingAddress?.city || "",
      }),
    );
  }, [selectedCustomer, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      ...selectedCustomer,

      billingAddress: {
        ...selectedCustomer.billingAddress,
        ...billingAddress,
      },

      shippingAddress: {
        ...selectedCustomer.shippingAddress,
        ...shippingAddress,
      },
    };
    console.log("Updating Customer:", customerData);

    try {
      if (editing) {
        await dispatch(
          editCustomer({
            id: selectedCustomer.id,
            data: customerData,
          }),
        ).unwrap();

        toast.success("Customer updated");
      } else {
        await dispatch(addCustomer(customerData)).unwrap();

        toast.success("Customer created");
      }

      dispatch(resetForm());
      dispatch(closeModal());
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update customer");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-xl font-semibold mb-6">
        {editing ? "Edit Customer" : "New Customer"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Display Name */}
        <div>
          <label className="block mb-1">Display Name</label>

          <input
            className="input"
            value={displayName}
            onChange={(e) =>
              dispatch(
                setField({
                  field: "displayName",
                  value: e.target.value,
                }),
              )
            }
          />
        </div>

        {/* Company */}
        <div>
          <label className="block mb-1">Company</label>

          <input
            className="input"
            value={companyName}
            onChange={(e) =>
              dispatch(
                setField({
                  field: "companyName",
                  value: e.target.value,
                }),
              )
            }
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>

          <input
            className="input"
            value={email}
            onChange={(e) =>
              dispatch(
                setField({
                  field: "email",
                  value: e.target.value,
                }),
              )
            }
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block mb-1">Mobile</label>

          <input
            className="input"
            value={mobile}
            onChange={(e) =>
              dispatch(
                setField({
                  field: "mobile",
                  value: e.target.value,
                }),
              )
            }
          />
        </div>

        {/* Billing Address */}
        <div className="col-span-2">
          <h3 className="font-semibold mb-2">Billing Address</h3>

          <input
            className="input w-full mb-2"
            placeholder="Address"
            value={billingAddress.address}
            onChange={(e) =>
              dispatch(
                setAddressField({
                  addressType: "billingAddress",
                  field: "address",
                  value: e.target.value,
                }),
              )
            }
          />

          <input
            className="input w-full mb-2"
            placeholder="City"
            value={billingAddress.city}
            onChange={(e) =>
              dispatch(
                setAddressField({
                  addressType: "billingAddress",
                  field: "city",
                  value: e.target.value,
                }),
              )
            }
          />

          <input
            className="input w-full"
            placeholder="State"
            value={billingAddress.state}
            onChange={(e) =>
              dispatch(
                setAddressField({
                  addressType: "billingAddress",
                  field: "state",
                  value: e.target.value,
                }),
              )
            }
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => dispatch(closeModal())}
          className="btn-secondary"
        >
          Cancel
        </button>

        <button type="submit" className="btn-primary" disabled={loading}>
          {editing ? "Update Customer" : "Create Customer"}
        </button>
      </div>
    </form>
  );
}
