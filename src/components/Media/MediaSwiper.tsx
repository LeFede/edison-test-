import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useRef } from "react";
import { media } from "./media";

export default function MediaSwiper() {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const swiperElement = swiperRef.current;
    if (!swiperElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            swiperElement.classList.add("opacity-100");
            observer.unobserve(swiperElement);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(swiperElement);

    return () => {
      if (swiperElement) {
        observer.unobserve(swiperElement);
      }
    };
  }, []);

  return (
    <>
      <Swiper
        modules={[Autoplay, Pagination]}
        className="
          max-w-[100%] opacity-0 transition-opacity
          mx-auto relative overflow-hidden p-0 block z-10
        "
        ref={swiperRef as any}
        pagination={{
          el: ".pagination",
          clickable: true,
        }}
        spaceBetween={24}
        navigation
        autoplay={{ delay: 4000 }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
          },
        }}
        wrapperClass="relative w-full h-full z-10 flex"
      >
        {media.map(([image, alt, href]) => {
          return (
            <SwiperSlide
              className="h-auto flex shrink-0 w-full relative transition-transform"
              style={{ height: `auto`, display: "flex" }}
              key={typeof image === "string" ? image : image.src}
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 justify-center flex"
              >
                <img
                  src={typeof image === "string" ? image : image.src}
                  alt={alt}
                  className="max-w-32 object-contain"
                  width={100}
                  height={50}
                />
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="pagination w-full h-auto flex gap-5 justify-center my-8"></div>
    </>
  );
}

// {
//   media.map((testimonial) => {
//     return (
//       <SwiperSlide
//         className="h-auto flex shrink-0 w-full relative transition-transform"
//         style={{ height: `auto`, display: "flex" }}
//         key={testimonial.testimonial}
//       >
//         <Testimonial
//           stars={testimonial.stars}
//           author={testimonial.author}
//           charge={testimonial.charge}
//           company={testimonial.company}
//         >
//           {testimonial.testimonial}
//         </Testimonial>
//       </SwiperSlide>
//     );
//   });
// }
