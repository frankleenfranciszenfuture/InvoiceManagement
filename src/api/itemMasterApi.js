import api from "./api";

// itemMaster

export const fetchItemMasters = async (params) => {
  const response = await api.get("/item-master", { params });
  return response.data;
};

export const fetchItemMasterById = async (id) => {
  const response = await api.get(`/item-master/${id}`);
  return response.data;
};

export const createItemMaster = async (item, image) => {
  const formData = new FormData();

  formData.append(
    "item",
    new Blob([JSON.stringify(item)], {
      type: "application/json",
    }),
  );

  if (image) {
    formData.append("image", image);
  }

  const response = await api.post("/item-master", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateItemMaster = async (id, item, image) => {
  const formData = new FormData();

  formData.append(
    "item",
    new Blob([JSON.stringify(item)], {
      type: "application/json",
    }),
  );

  if (image) {
    formData.append("image", image);
  }

  const response = await api.put(`/item-master/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteItemMaster = async (id) => {
  const response = await api.delete(`/item-master/${id}`);
  return response.data;
};
