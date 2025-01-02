import { animateScroll } from "react-scroll";
import { isScrolling } from "../store";

export const scrollToMarket = () => {
  const isMobile = window.innerWidth < 1024;

  const input = document.querySelector("#market-input");
  const { y } = input!.getBoundingClientRect();
  const body = document.querySelector("html");
  const scrollY = body!.scrollTop;
  const scrollTotal = y > 20 ? scrollY + y : 0;

  if (scrollTotal == 0) return;
  if (isScrolling.get()) return;
  animateScroll.scrollTo(isMobile ? 620 : scrollTotal, {
    duration: 200,
    smooth: false,
  });
};
