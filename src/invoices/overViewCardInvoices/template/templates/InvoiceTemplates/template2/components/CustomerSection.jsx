import React from "react";
import Editable from "./Editable";

export default function CustomerSection({
    invoice,
    updateInvoice,
}) {
    const customer = invoice.customer || {};
    const shipping = invoice.shipping || {};

    const updateCustomer = (field, value) => {
        updateInvoice("customer", {
            ...customer,
            [field]: value,
        });
    };

    const updateShipping = (field, value) => {
        updateInvoice("shipping", {
            ...shipping,
            [field]: value,
        });
    };

    const SectionTitle = ({ children }) => (
        <div className="bg-gray-100 border-b px-3 py-2 font-semibold uppercase text-sm">
            {children}
        </div>
    );

    const Label = ({ children }) => (
        <div className="font-medium text-sm text-gray-700 mb-1">
            {children}
        </div>
    );

    return (
        <div className="grid grid-cols-2 border-t">

            {/* BILL TO */}

            <div className="border-r">

                <SectionTitle>
                    Bill To
                </SectionTitle>

                <div className="p-4 space-y-3">

                    <div>
                        <Label>Customer Name</Label>

                        <Editable
                            tag="div"
                            className="font-semibold text-base block"
                            value={customer.name}
                            placeholder="Customer Name"
                            onChange={(v) =>
                                updateCustomer("name", v)
                            }
                        />
                    </div>

                    <div>
                        <Label>GSTIN</Label>

                        <Editable
                            className="block"
                            value={customer.gstin}
                            placeholder="GST Number"
                            onChange={(v) =>
                                updateCustomer("gstin", v)
                            }
                        />
                    </div>

                    <div>
                        <Label>Address</Label>

                        <Editable
                            tag="div"
                            className="whitespace-pre-wrap min-h-[70px] block"
                            value={customer.address}
                            placeholder="Customer Address"
                            onChange={(v) =>
                                updateCustomer("address", v)
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <Label>Phone</Label>

                            <Editable
                                className="block"
                                value={customer.phone}
                                placeholder="+91 XXXXX XXXXX"
                                onChange={(v) =>
                                    updateCustomer("phone", v)
                                }
                            />
                        </div>

                        <div>
                            <Label>Email</Label>

                            <Editable
                                className="block"
                                value={customer.email}
                                placeholder="customer@email.com"
                                onChange={(v) =>
                                    updateCustomer("email", v)
                                }
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <Label>State</Label>

                            <Editable
                                className="block"
                                value={customer.state}
                                placeholder="Tamil Nadu"
                                onChange={(v) =>
                                    updateCustomer("state", v)
                                }
                            />
                        </div>

                        <div>
                            <Label>State Code</Label>

                            <Editable
                                className="block"
                                value={customer.stateCode}
                                placeholder="33"
                                onChange={(v) =>
                                    updateCustomer("stateCode", v)
                                }
                            />
                        </div>

                    </div>

                </div>

            </div>

            {/* SHIP TO */}

            <div>

                <SectionTitle>
                    Ship To
                </SectionTitle>

                <div className="p-4 space-y-3">

                    <div>
                        <Label>Consignee Name</Label>

                        <Editable
                            tag="div"
                            className="font-semibold text-base block"
                            value={shipping.name}
                            placeholder="Shipping Name"
                            onChange={(v) =>
                                updateShipping("name", v)
                            }
                        />
                    </div>

                    <div>
                        <Label>GSTIN</Label>

                        <Editable
                            className="block"
                            value={shipping.gstin}
                            placeholder="GST Number"
                            onChange={(v) =>
                                updateShipping("gstin", v)
                            }
                        />
                    </div>

                    <div>
                        <Label>Shipping Address</Label>

                        <Editable
                            tag="div"
                            className="whitespace-pre-wrap min-h-[70px] block"
                            value={shipping.address}
                            placeholder="Shipping Address"
                            onChange={(v) =>
                                updateShipping("address", v)
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <Label>Phone</Label>

                            <Editable
                                className="block"
                                value={shipping.phone}
                                placeholder="+91 XXXXX XXXXX"
                                onChange={(v) =>
                                    updateShipping("phone", v)
                                }
                            />
                        </div>

                        <div>
                            <Label>Email</Label>

                            <Editable
                                className="block"
                                value={shipping.email}
                                placeholder="shipping@email.com"
                                onChange={(v) =>
                                    updateShipping("email", v)
                                }
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <Label>State</Label>

                            <Editable
                                className="block"
                                value={shipping.state}
                                placeholder="Tamil Nadu"
                                onChange={(v) =>
                                    updateShipping("state", v)
                                }
                            />
                        </div>

                        <div>
                            <Label>State Code</Label>

                            <Editable
                                className="block"
                                value={shipping.stateCode}
                                placeholder="33"
                                onChange={(v) =>
                                    updateShipping("stateCode", v)
                                }
                            />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}