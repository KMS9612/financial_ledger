"use client";
import useCheckLogin from "../functions/checkLogin";
import ResultBoxLarge from "../src/components/box/resultBoxLg";
import ResultBoxSmall from "../src/components/box/resultBoxSm";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  useCheckLogin(router);
  const lorem =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  return (
    <div className="h-full mx-auto pt-20">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <ResultBoxSmall title={"ResultBoxSmall"} subText={lorem} />
          <ResultBoxSmall title={"ResultBoxSmall"} subText={lorem} />
          <ResultBoxSmall title={"ResultBoxSmall"} subText={lorem} />
        </div>
        <div className="">
          <ResultBoxLarge title={"ResultBoxLarge"} subText={lorem} />
        </div>
      </div>
    </div>
  );
}
