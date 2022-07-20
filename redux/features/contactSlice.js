import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "No user",
  status: "idle",
  currentSelectedId: "",
  currentSelectedContact: null,
  snackBarMessage: "", // if string is not empty, show the snackbar
  refreshContactList: false,
  currentScreen: "Home", // Home | ""
  formData: { firstName: "", lastName: "", age: 0 },
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    setCurrentSelectedId: (state, action) => {
      state.currentSelectedId = action.payload;
    },
    setCurrentSelectedContact: (state, action) => {
      state.currentSelectedContact = action.payload;
    },
    setSnackBarMessage: (state, action) => {
      state.snackBarMessage = action.payload;
    },
    setRefreshContactList: (state, action) => {
      state.refreshContactList = action.payload;
    },
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    emptyFormData: (state) => {
      state.formData = { firstName: "", lastName: "", age: 0 };
    },
    copyFromSelectedToFormData: (state) => {
      console.log(state.currentSelectedContact);
      state.formData = { ...state.formData, ...state.currentSelectedContact };
    },
  },
});

export const selectUser = (state) => state.contact.name;
export const selectUserFetchStatus = (state) => state.contact.status;
export const getCurrentSelectedId = (state) => state.contact.currentSelectedId;
export const getCurrentSelectedContact = (state) =>
  state.contact.currentSelectedContact;
export const getSnackBarMessage = (state) => state.contact.snackBarMessage;
export const getRefreshContactList = (state) =>
  state.contact.refreshContactList;
export const getCurrentScreen = (state) => state.contact.currentScreen;
export const getFormData = (state) => state.contact.formData;

export const {
  updateName,
  setCurrentSelectedId,
  setCurrentSelectedContact,
  setSnackBarMessage,
  setRefreshContactList,
  setCurrentScreen,
  setFormData,
  emptyFormData,
  copyFromSelectedToFormData,
} = contactSlice.actions;

export default contactSlice.reducer;
