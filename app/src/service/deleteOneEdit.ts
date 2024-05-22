import api from "./instance";

export const deleteOneEdit = async (body: {
  email: string;
  monthID: string;
  dayID: string;
}) => {
  try {
    const response = await api.delete("/edit/deleteOneEdit", { data: body });

    return response;
  } catch (err) {
    return err;
  }
};
