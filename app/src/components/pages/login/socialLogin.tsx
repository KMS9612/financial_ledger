import Image from "next/image";
import { MouseEvent } from "react";

interface SocialItemsType {
  socialName: string;
  imgRoute: string;
  imgAlt: string;
}

interface IPropsSocialLogin {
  onClickSocialLogin: (
    event: MouseEvent<HTMLImageElement>,
    socialType: string
  ) => void;
}

export default function SocialLogin(props: IPropsSocialLogin) {
  const socialItems = [
    {
      socialName: "Naver",
      imgRoute: "/naverImg/btnG_아이콘사각.png",
      imgAlt: "Naver Social Login Button",
    },
    {
      socialName: "Kakao",
      imgRoute: "/kktImg/kakaotalk_sharing_btn_medium.png",
      imgAlt: "KakaoTalk Social Login Button",
    },
  ];
  return (
    <div className="w-full h-[100px] flex flex-col justify-center items-center items-center gap-6">
      <div className="w-full flex justify-center items-center relative text-gray-500">
        <p className="absolute w-2/3 min-w-[200px] border rounded-full"></p>
        <p className="w-1/6 min-w-[90px] absolute z-100 bg-white text-center">
          소셜 로그인
        </p>
      </div>
      <div className="w-full flex justify-center items-center gap-10">
        {socialItems.map((items: SocialItemsType) => {
          return (
            <Image
              onClick={(event) =>
                props.onClickSocialLogin(event, items.socialName)
              }
              key={items.imgRoute}
              className="cursor-pointer"
              src={items.imgRoute}
              width={50}
              height={50}
              alt={items.imgAlt}
            ></Image>
          );
        })}
      </div>
    </div>
  );
}
