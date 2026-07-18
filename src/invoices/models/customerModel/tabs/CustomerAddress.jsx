import { useDispatch, useSelector } from "react-redux";
import {
    setAddressField,
    setField,
    clearFieldError,
} from "../../../../slices/customers/customerSlices";

const emptyAddress = {
    attention: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    phoneCode: "+91",
    phone: "",
    fax: "",
};

function AddressSection({
    title,
    address,
    addressType,
    dispatch,
    showCopy,
    copyBillingAddress,
}) {
    const safeAddress = address || emptyAddress;

    const handleChange = (field) => (e) => {
        dispatch(
            setAddressField({
                addressType,
                field,
                value: e.target.value,
            })
        );

        dispatch(clearFieldError(addressType));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold">{title}</h3>

                {showCopy && (
                    <button
                        type="button"
                        onClick={copyBillingAddress}
                        className="text-blue-600 text-sm hover:underline"
                    >
                        Copy Billing Address
                    </button>
                )}
            </div>

            <div className="space-y-4">

                <input
                    type="text"
                    placeholder="Attention"
                    value={safeAddress.attention}
                    onChange={handleChange("attention")}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />

                <textarea
                    rows={3}
                    placeholder="address"
                    value={safeAddress.address1}
                    onChange={handleChange("address1")}
                    className="w-full border border-gray-300  rounded px-3 py-2"
                />



                <input
                    type="text"
                    placeholder="City"
                    value={safeAddress.city}
                    onChange={handleChange("city")}
                    className="w-full border border-gray-300  rounded px-3 py-2"
                />

                <input
                    type="text"
                    placeholder="State"
                    value={safeAddress.state}
                    onChange={handleChange("state")}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />

                <input
                    type="text"
                    placeholder="Zip Code"
                    value={safeAddress.zipCode}
                    onChange={handleChange("zipCode")}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />

                <input
                    type="text"
                    placeholder="Country"
                    value={safeAddress.country}
                    onChange={handleChange("country")}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />

                <div className="flex">
                    <input
                        type="text"
                        value={safeAddress.phoneCode}
                        onChange={handleChange("phoneCode")}
                        className="w-20 border border-gray-300  rounded-l px-2 py-2"
                    />

                    <input
                        type="text"
                        placeholder="Phone"
                        value={safeAddress.phone}
                        onChange={handleChange("phone")}
                        className="flex-1 border border-gray-300  border-l-0 rounded-r px-3 py-2"
                    />
                </div>

                <input
                    type="text"
                    placeholder="Fax"
                    value={safeAddress.fax}
                    onChange={handleChange("fax")}
                    className="w-full border border-gray-300  rounded px-3 py-2"
                />

            </div>
        </div>
    );
}

export default function CustomerAddress() {
    const dispatch = useDispatch();

    const customer = useSelector(
        (state) => state.customer.customerForm
    );

    const billingAddress =
        customer.billingAddress || emptyAddress;

    const shippingAddress =
        customer.shippingAddress || emptyAddress;

    const copyBillingAddress = () => {
        dispatch(
            setField({
                field: "shippingAddress",
                value: { ...billingAddress },
            })
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            <AddressSection
                title="Billing Address"
                address={billingAddress}
                addressType="billingAddress"
                dispatch={dispatch}
            />

            <AddressSection
                title="Shipping Address"
                address={shippingAddress}
                addressType="shippingAddress"
                dispatch={dispatch}
                showCopy
                copyBillingAddress={copyBillingAddress}
            />

        </div>
    );
}