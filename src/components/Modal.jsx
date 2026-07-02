import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../slices/uiSlice";
import { X } from "lucide-react";

import CreateInvoiceModal from "../pages/CreateInvoiceModal";
import CreateCustomerModal from "../pages/customers/Createcustomermodal";
import ViewInvoiceModal from "../pages/ViewInvoiceModal";
import ChangeTemplateModal from "../templateModel/ChangeTemplateModal";
import CustomerViewModal from "../pages/customers/CustomerViewModal";
import AddContactPersonModal from "../models/AddContactPersonModal";

export default function Modal() {
  const dispatch = useDispatch();
  const { type, data } = useSelector((s) => s.ui.modal);

  if (!type) return null; // ✅ restored — bails out completely when no modal is open

  if (type === "changeTemplate") {
    return <ChangeTemplateModal invoiceId={data?.invoiceId} />;
  }

  // const renderModal = () => {
  //   switch (type) {
  //     case "createInvoice":
  //       return null; // or <CreateInvoiceModal />

  //     case "createCustomer":
  //       return <CreateCustomerModal />;

  //     case "editCustomer":
  //       return <CreateCustomerModal mode="edit" data={data} />;

  //     case "viewCustomer":
  //       return <CustomerViewModal data={data} />;

  //     case "viewInvoice":
  //       return <ViewInvoiceModal invoice={data} />;

  //     case "addContactPerson":
  //       return <AddContactPersonModal customer={data} />;

  //     default:
  //       return null;
  //   }
  // };

  const modalMap = {
    createCustomer: CreateCustomerModal,
    editCustomer: CreateCustomerModal,
    viewCustomer: CustomerViewModal,
    viewInvoice: ViewInvoiceModal,
    addContactPerson: AddContactPersonModal,
  };

  const ModalComponent = modalMap[type];

  return ModalComponent ? <ModalComponent data={data} /> : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(closeModal());
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 z-10"
        >
          <X size={18} />
        </button>
        {renderModal()}
      </div>
    </div>
  );
}
