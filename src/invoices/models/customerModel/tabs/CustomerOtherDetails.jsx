import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
    setField,
    clearFieldError,
} from "../../../../slices/customers/customerSlices";
import FormSelect from "../../../../invoices/models/customerModel/components/FormSelect";
import FormInput from "../components/FormInput";
import { Globe, Mail, MessageCircle, Minus, Plus } from "lucide-react";


const TwitterIcon = ({ className, size = 18 }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        width={size}
        height={size}
        fill="currentColor"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117Z" />
    </svg>
);

const Facebook = ({ className, size = 18 }) => (
    <svg viewBox="0 0 24 24"
        className={className}
        width={size}
        height={size}
        fill="currentColor"
    >
        <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.018 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.493-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.773-1.63 1.567v1.883h2.773l-.443 2.91h-2.33V22c4.78-.756 8.438-4.922 8.438-9.94Z" />
    </svg>
);

const InfoIcon = () => (
    <HelpCircle className="inline w-3.5 h-3.5 text-gray-400 ml-1 -mt-0.5" />
);

const Label = ({ children, required }) => (
    <label className="text-sm text-gray-700 flex items-center">
        {required && <span className="text-red-500 mr-0.5">*</span>}
        <span className={required ? "text-red-500" : ""}>{children}</span>
    </label>
);



export default function CustomerOtherDetails() {

    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState(false);

    const customer = useSelector(
        state => state.customer.customerForm
    );

    const errors = useSelector(
        state => state.customer.errors
    );

    const handleChange = (field) => (e) => {

        dispatch(setField({
            field,
            value: e.target.value,
        }));

        dispatch(clearFieldError(field));
    };

    return (

        <div className="mt-6 space-y-6">

            {/* Payment Terms */}

            <FormSelect
                label="Payment Terms"
                value={customer.paymentTerms}
                onChange={handleChange("paymentTerms")}
                options={[
                    {
                        value: "Due on Receipt",
                        label: "Due on Receipt",
                    },
                    {
                        value: "Net 15",
                        label: "Net 15",
                    },
                    {
                        value: "Net 30",
                        label: "Net 30",
                    },
                    {
                        value: "Net 45",
                        label: "Net 45",
                    },
                    {
                        value: "Net 60",
                        label: "Net 60",
                    },
                ]}
                error={errors.paymentTerms}
            />





            {/* PAN */}

            <FormInput
                label="Pan"
                value={customer.pan}
                onChange={handleChange("pan")}
                error={errors.pan}
                placeholder="pan number"
            />

            {/* Documents */}

            <FormInput
                label="Documents"
                type="file"
                // value={customer.pan}
                // onChange={handleChange("pan")}
                error={errors.pan}
                placeholder="Documents"
            />



            {/* Add More Button */}
            <button
                type="button"
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
                {showMore ? (
                    <>
                        <Minus size={16} />
                        Hide More
                    </>
                ) : (
                    <>
                        <Plus size={16} />
                        Add More
                    </>
                )}
            </button>

            {/* Show / Hide Fields */}
            {showMore && (
                <>
                    {/* Web site */}
                    <FormInput
                        label="Website URL"
                        type="text"
                        value={customer.websiteUrl}
                        onChange={handleChange("websiteUrl")}
                        error={errors.websiteUrl}
                        placeholder="ex: www.zylker.com"
                        icon={Globe}
                    />

                    {/* Department */}
                    <FormInput
                        label="Department"
                        value={customer.department}
                        onChange={handleChange("department")}
                        error={errors.department}
                        placeholder=" "
                    />

                    {/* Designation */}
                    <FormInput
                        label="Designation"
                        value={customer.designation}
                        onChange={handleChange("designation")}
                        error={errors.designation}
                        placeholder=""
                    />

                    {/* Twitter */}

                    <FormInput
                        label="X"
                        type="text"
                        value={customer.twitter}
                        onChange={handleChange("twitter")}
                        error={errors.twitter}
                        placeholder=""
                        icon={TwitterIcon}
                        iconSize={16}
                    />

                    {/* Skype name/numer */}
                    <FormInput
                        label="Skype Name/Number"
                        type="text"
                        value={customer.skype}
                        onChange={handleChange("skype")}
                        error={errors.skype}
                        placeholder=""
                        icon={MessageCircle}

                    />


                    {/* facebook */}

                    <FormInput
                        label="Facebook"
                        type="text"
                        value={customer.facebook}
                        onChange={handleChange("facebook")}
                        error={errors.facebook}
                        placeholder=""
                        icon={Facebook}
                        iconSize={18}
                        description="http://www.facebook.com/"
                    />
                </>
            )}


        </div>



    );
}