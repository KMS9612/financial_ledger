import GradientBtn from "../../commons/buttons/gradientBtn";

export default function NoDataPage() {
  const onClickOpenModal = () => {};
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <div className="w-[300px] h-[400px] flex flex-col justify-between p-4 rounded-xl shadow-2xl shadow-gray-300 bg-white">
        <div className="w-full">
          <h2 className="font-bold text-xl">알림</h2>
        </div>
        <div className="flex justify-center items-center">
          <p className=" font-semibold">
            고정 비용 데이터와 일일 지출 / 수입 내용을 등록 한 후 이용 할 수
            있습니다.
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <GradientBtn
            onClickEvent={onClickOpenModal}
            btnInnerText="고정 비용 등록"
          ></GradientBtn>
          <GradientBtn
            onClickEvent={onClickOpenModal}
            btnInnerText="일일 지출 / 수입 등록"
          ></GradientBtn>
        </div>
      </div>
    </div>
  );
}
