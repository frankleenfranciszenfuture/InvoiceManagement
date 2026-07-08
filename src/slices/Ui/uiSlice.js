import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarOpen: true,
    modal: { open: false, type: null, data: null }, // type: 'createInvoice' | 'createCustomer' | 'editCustomer' | 'viewInvoice'
    showQuickAddMenu: null,

    leaveDialog: {
      open: false,
      nextRoute: null,
    },
  },

  reducers: {
    toggleSidebar: (s) => {
      s.sidebarOpen = !s.sidebarOpen;
    },

    showLeaveDialog: (state, action) => {
      state.leaveDialog.open = true;
      state.leaveDialog.nextRoute = action.payload;
    },

    hideLeaveDialog: (state) => {
      state.leaveDialog.open = false;
      state.leaveDialog.nextRoute = null;
    },

    openModal: (state, action) => {
      state.modal.open = true;
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data || null;
    },

    closeModal: (state) => {
      state.modal.open = false;
      state.modal.type = null;
      state.modal.data = null;
    },

    toggleQuickAddMenu: (state, action) => {
      if (state.showQuickAddMenu === action.payload) {
        state.showQuickAddMenu = null;
      } else {
        state.showQuickAddMenu = action.payload;
      }
    },

    closeQuickAddMenu: (state) => {
      state.showQuickAddMenu = null;
    },
  },
});

export const {
  toggleSidebar,
  openModal,
  closeModal,
  toggleQuickAddMenu,
  closeQuickAddMenu,
  showLeaveDialog,
  hideLeaveDialog,
} = uiSlice.actions;
export default uiSlice.reducer;
