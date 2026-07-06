import { createSlice } from "@reduxjs/toolkit";

const views = ["All Items", "Active Items", "Inactive Items", "Draft Items"];

const initialState = {
  selectedItemView: "All Items",
  itemStatus: "ALL",
  search: "",
  views: [
    { label: "All Items", value: "ALL" },
    { label: "Active Items", value: "ACTIVE" },
    { label: "Inactive Items", value: "INACTIVE" },
    { label: "Draft Items", value: "DRAFT" },
  ],
};

const ItemViewSlice = createSlice({
  name: "itemView",
  initialState,
  reducers: {
    setOpenItemView(state, action) {
      state.openItemView = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },

    setSelectedItemView(state, action) {
      state.selectedItemView = action.payload;
    },

    setItemStatus: (state, action) => {
      state.itemStatus = action.payload;
    },
  },
});

export const { setSelectedItemView, setSearch, setItemStatus } =
  ItemViewSlice.actions;
export default ItemViewSlice.reducer;
