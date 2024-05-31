import api from "./instance";

export const deleteOneEdit = async (body: {
  email: string;
  monthID: string;
  dayID: string;
}) => {
  try {
    if (!body.email || !body.monthID || !body.dayID) {
      alert(
        "삭제에 필요한 데이터가 누락되었습니다, 같은 에러가 반복된다면 관리자에게 문의하세요"
      );
      return;
    }
    const response = await api.delete("/edit/deleteOneEdit", { data: body });

    return response;
  } catch (err) {
    return err;
  }
};
