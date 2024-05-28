import { useEffect, useRef } from "react";

export default function CircleCheckAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const circle = svgRef.current.querySelector(".circle");
      const check = svgRef.current.querySelector(".check");
      if (circle && check) {
        circle.classList.add("animate-circle");
        check.classList.add("animate-check");
      }
    }
  }, []);

  return (
    <svg
      ref={svgRef}
      width="30"
      height="30"
      viewBox="0 0 100 100"
      className="m-auto"
    >
      <circle
        className="circle"
        cx="50"
        cy="50"
        r="45"
        stroke="white"
        strokeWidth="10"
        fill="none"
      />
      <polyline
        className="check"
        points="25,50 45,70 75,35"
        stroke="white"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
