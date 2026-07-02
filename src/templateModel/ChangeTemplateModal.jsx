import { X, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../slices/uiSlice";
import { setInvoiceTemplate } from "../slices/invSlice";
import invoiceTemplates from "../templateModel/templateRegistry";

export default function ChangeTemplateModal() {
  const dispatch = useDispatch();

  const currentTemplate = useSelector((state) => state.invoice.invoiceTemplate);
  const previewInvoice = useSelector((state) => state.invoice.customers[0]);

  const handleSelect = (id) => {
    dispatch(setInvoiceTemplate(id));
    // don't close here — let user see the selection highlighted
  };

  return (
    // ChangeTemplateModal.jsx and Modal.jsx — change z-50 to z-[100] (or similar) on the backdrop
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => dispatch(closeModal())}
    >
      <div
        className="w-full max-w-5xl rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Choose Invoice Template</h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="rounded-md p-2 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 p-6">
          {invoiceTemplates.map((t) => {
            const isActive = currentTemplate === t.id;
            const TemplateComponent = t.component;

            return (
              <div
                key={t.id}
                className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                  isActive
                    ? "border-blue-500 shadow-lg shadow-blue-100"
                    : "border-gray-200 hover:border-blue-400 hover:shadow-lg"
                }`}
                onClick={() => handleSelect(t.id)}
              >
                {/* Active badge */}
                {isActive && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white shadow">
                    <Check size={12} />
                    Selected
                  </div>
                )}

                {/* Hover overlay with Choose button */}
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/20 group-hover:opacity-100">
                  <button
                    className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:bg-blue-600 active:scale-95 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(t.id);
                    }}
                  >
                    {isActive ? "✓ Already Selected" : "Choose Template"}
                  </button>
                </div>

                {/* Preview */}
                <div className="h-[320px] overflow-hidden bg-gray-100">
                  <div
                    style={{
                      transform: "scale(0.45)",
                      transformOrigin: "top left",
                      width: "222%",
                      height: "222%",
                      pointerEvents: "none",
                    }}
                  >
                    <TemplateComponent invoice={previewInvoice} />
                  </div>
                </div>

                {/* Title */}
                <div
                  className={`border-t p-4 text-center font-medium transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-gray-700"
                  }`}
                >
                  {t.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer confirm button */}
        <div className="flex justify-end border-t p-4">
          <button
            onClick={() => dispatch(closeModal())}
            className="rounded-md bg-blue-500 px-8 py-2 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
