import { animateScroll } from "react-scroll";
import { isScrolling } from "../store";

export const scrollToMarket = () => {
  const isMobile = window.innerWidth < 1024;

  const capo = document.querySelector("#market-section");
  const { y: capoY } = capo!.getBoundingClientRect();
  const body = document.querySelector("html");
  const scrollY = body!.scrollTop;
  const scrollTotal = scrollY + capoY;

  if (scrollTotal == 0) return;
  if (isScrolling.get()) return;
  animateScroll.scrollTo(isMobile ? scrollTotal : scrollTotal, {
    duration: 200,
    smooth: false,
  });
};
