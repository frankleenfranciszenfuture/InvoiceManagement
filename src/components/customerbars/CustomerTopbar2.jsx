import {
  ChevronDown,
  Edit,
  FolderClock,
  MoreHorizontal,
  Paperclip,
  Plus,
  Square,
  SquarePenIcon,
  SquareX,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCustomer } from "../../slices/customerSlice";

export default function CustomerTopbar2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customer = useSelector((state) => state.customer.selectedCustomer);

  if (!customer) {
    return <h1>Customer not found</h1>;
  }

  const initials = (customerName) =>
    customerName
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 4)
      .toUpperCase() || "??";

  return (
    <div className="flex items-center justify-between px-5 py-5 bg-white border border-gray-100 ">
      {/* Left */}
      <div className="flex  items-center gap-1 cursor-pointer">
        <h1 className="text-4xl font-md leading-2 text-gray-900">
          {initials(customer.displayName || customer.customerName)}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* New Button Group */}
        <div className="flex overflow-hidden rounded-sm border border-blue-600  bg-blue-500 shadow-sm cursor-pointer">
          <button className="flex items-center gap-1  px-2.5 py-1 text-xs font-medium text-white rounded hover:bg-blue-400"

            onClick={() => {
              dispatch(setSelectedCustomer(customer));
              navigate(`/customers/edit/${customer.id}`);
            }}
          >
            <SquarePenIcon size={16} />
            <span>Edit</span>
          </button>
        </div>


        <div className="flex overflow-hidden rounded-sm border border-blue-600  bg-blue-500 shadow-sm cursor-pointer">
          <button className="flex items-center gap-1  px-2.5 py-1 text-xs font-medium text-white">
            <Paperclip size={16} />

          </button>
        </div>

        <div className="flex overflow-hidden rounded-sm border border-blue-600  bg-blue-500 shadow-sm cursor-pointer">
          <button className="flex items-center px-2.5 py-1 text-xs font-medium text-white">
            <FolderClock size={16} />
          </button>
        </div>

        <div className="flex overflow-hidden rounded-sm border border-blue-600  bg-blue-500 shadow-sm cursor-pointer">
          <button className="flex items-center px-2.5 py-1 text-xs font-medium text-white hover:bg-red-800">
            <SquareX size={16} />
          </button>
        </div>
      </div>
    </div >
  );
}
