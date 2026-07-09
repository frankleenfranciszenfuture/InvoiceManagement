import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: true,
  modal: { open: false, type: null, data: null }, // type: 'createInvoice' | 'createCustomer' | 'editCustomer' | 'viewInvoice'
  showQuickAddMenu: null,

  leaveDialog: { open: false, nextRoute: null },

  //quick modelview
  quickCreateOpen: false,

  // profile Menu
  profileMenuOpen: false,

  //NotificationMenuOpen
  notificationsOpen: false,

  // settingsMenuOpen
  settingsOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,

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

    // quick add menu
    openQuickCreate: (state) => {
      state.quickCreateOpen = true;
    },
    closeQuickCreate: (state) => {
      state.quickCreateOpen = false;
    },
    toggleQuickCreate: (state) => {
      state.quickCreateOpen = !state.quickCreateOpen;
    },

    // profile Menu

    toggleProfileMenu: (state) => {
      state.profileMenuOpen = !state.profileMenuOpen;
    },

    closeProfileMenu: (state) => {
      state.profileMenuOpen = false;
    },

    // NotificationMenu

    toggleNotifications: (state) => {
      state.notificationsOpen = !state.profileMenuOpen;
    },

    closeNotifications: (state) => {
      state.notificationsOpen = false;
    },

    // Settings

    toggleSettings: (state) => {
      state.settingsOpen = !state.settingsOpen;
    },

    closeSettingsMenu: (state) => {
      state.settingsOpen = false;
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

  // quick view menu
  openQuickCreate,
  closeQuickCreate,
  toggleQuickCreate,

  // profile menu
  toggleProfileMenu,
  closeProfileMenu,

  // toggleNotificationsMenu
  toggleNotifications,
  closeNotifications,

  // toggleSettings

  toggleSettings,
  closeSettingsMenu,
} = uiSlice.actions;
export default uiSlice.reducer;
