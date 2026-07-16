import { useDispatch, useSelector } from "react-redux";

import {
    setField,
    clearFieldError,
} from "../../../slices/customers/customerSlices";


import FormInput from "../../../invoices/models/customerModel/components/FormInput";
import FormSelect from "../../../invoices/models/customerModel/components/FormSelect";
import FormRadioGroup from "../../../invoices/models/customerModel/components/FormRadioGroup";

import PhoneInput from "../../../invoices/models/customerModel/components/common/phone/PhoneInput";

import LanguageSelect from "../../../invoices/models/customerModel/components/common/LanguageSelect";
import { CircleHelp, Mail } from "lucide-react";
import SearchSelect from "./components/common/SearchSelect";


export default function CustomerBasicForm() {

    const dispatch = useDispatch();

    const customer = useSelector(
        (state) => state.customer.customerForm
    );

    const errors = useSelector(
        (state) => state.customer.errors
    );

    const handleChange = (field) => (e) => {

        dispatch(
            setField({
                field,
                value: e.target.value,
            })
        );

        dispatch(clearFieldError(field));

    };

    const currencyOptions = [
        { value: "INR", label: "🇮🇳 Indian Rupee (₹)" },
        { value: "USD", label: "🇺🇸 US Dollar ($)" },
        { value: "EUR", label: "🇪🇺 Euro (€)" },
        { value: "GBP", label: "🇬🇧 British Pound (£)" },
        { value: "AED", label: "🇦🇪 UAE Dirham" },
    ];

    return (

        <div className="space-y-6">

            {/* Customer Type */}

            <FormRadioGroup
                label="Customer Type"
                value={customer.customerType}
                onChange={handleChange("customerType")}
                options={[
                    {
                        value: "Business",
                        label: "Business",
                    },
                    {
                        value: "Individual",
                        label: "Individual",
                    },
                ]}
            />

            {/* Primary Contact */}

            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">

                <label className="pt-2 text-sm font-medium text-gray-400">

                    Primary Contact

                    <span className="ml-1 text-red-500">*</span>

                </label>

                <div className="grid grid-cols-3 gap-3">

                    <select
                        value={customer.salutation}
                        onChange={handleChange("salutation")}
                        className="
                            rounded-md
                            border
                            border-gray-300
                            px-3
                            py-2
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    >

                        <option value="">
                            Salutation
                        </option>

                        <option value="Mr.">
                            Mr.
                        </option>

                        <option value="Mrs.">
                            Mrs.
                        </option>

                        <option value="Ms.">
                            Ms.
                        </option>

                        <option value="Dr.">
                            Dr.
                        </option>

                    </select>

                    <input
                        type="text"
                        value={customer.firstName}
                        onChange={handleChange("firstName")}
                        placeholder="First Name"
                        className="
                            rounded-md
                            border
                            border-gray-300
                            px-3
                            py-2
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    />

                    <input
                        type="text"
                        value={customer.lastName}
                        onChange={handleChange("lastName")}
                        placeholder="Last Name"
                        className="
                            rounded-md
                            border
                            border-gray-300
                            px-3
                            py-2
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    />

                </div>

            </div>

            {/* Company Name */}

            <FormInput
                label="Company Name"
                value={customer.companyName}
                onChange={handleChange("companyName")}
                error={errors.companyName}
                placeholder="Company Name"
            />

            {/* Display Name */}

            <FormInput
                label="Display Name"
                required
                value={customer.displayName}
                onChange={handleChange("displayName")}
                error={errors.displayName}
                placeholder="Display Name"
            />

            {/* Currency */}
            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
                <label className="pt-2 text-sm font-medium text-gray-400">
                    Currency
                    <span className="ml-1 text-red-500">*</span>
                </label>

                <SearchSelect
                    value={customer.currency}
                    options={currencyOptions}
                    placeholder="Select Currency"
                    onChange={(value) =>
                        dispatch(
                            setField({
                                field: "currency",
                                value,
                            })
                        )
                    }
                    error={errors.currency}
                />
            </div>


            {/* Email */}

            <FormInput
                label="Email Address"
                type="email"
                value={customer.email}
                onChange={handleChange("email")}
                error={errors.email}
                placeholder="name@example.com"
                icon={Mail}
            />



            {/* Work Phone */}

            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">

                <label className="pt-2 text-sm font-medium text-gray-400">
                    Work Phone
                </label>

                <PhoneInput
                    countryCode={customer.workPhoneCode}
                    phone={customer.workPhone}
                    placeholder="Work Phone"

                    onCountryChange={(value) =>
                        dispatch(
                            setField({
                                field: "workPhoneCode",
                                value,
                            })
                        )
                    }

                    onPhoneChange={(value) =>
                        dispatch(
                            setField({
                                field: "workPhone",
                                value,
                            })
                        )
                    }

                />

            </div>

            {/* Mobile */}

            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">

                <label className="pt-2 text-sm font-medium text-gray-400">
                    Mobile
                </label>

                <PhoneInput
                    countryCode={customer.mobileCode}
                    phone={customer.mobile}
                    placeholder="Mobile Number"

                    onCountryChange={(value) =>
                        dispatch(
                            setField({
                                field: "mobileCode",
                                value,
                            })
                        )
                    }

                    onPhoneChange={(value) =>
                        dispatch(
                            setField({
                                field: "mobile",
                                value,
                            })
                        )
                    }

                />

            </div>

            {/* Customer Language */}

            <div className="grid grid-cols-[180px_1fr] gap-6 items-start">

                <label className="pt-2 text-sm font-medium text-gray-400">
                    Customer Language
                </label>

                <LanguageSelect
                    value={customer.language}
                    onChange={(value) =>
                        dispatch(
                            setField({
                                field: "language",
                                value,
                            })
                        )
                    }
                />

            </div>




        </div>

    );

}