import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useRef } from "react";
import "swiper/css/pagination";
import "swiper/css";
// import "./uwu.css";

interface Review {
  stars: number;
  author: string;
  charge: string;
  company: string;
  testimonial: string;
}

const reviews: Review[] = [
  {
    stars: 5,
    author: "Darío Dalmas",
    charge: "Project Manager",
    company: "Agroads",
    testimonial:
      "El curso me pareció muy práctico, útil y llevado a la realidad. Trabajamos con ejemplos concretos de situaciones reales. Las clases fueron super dinámicas, muy claras y continuamente enlazando lo que es la teoría con la práctica lo cuál hace que uno se lleve la capacidad de implementar realmente lo que vio, en su trabajo.",
  },
  {
    stars: 5,
    author: "Roberto Chaile",
    charge: "UX Designer",
    company: "Teachaway",
    testimonial: `
    Lo que más me gusto ha sido la metodología de trabajar en grupo con
    colegas del mismo rubro dónde conocés más sobre la realidad de otras
    personas y podés intercambiar ideas y experencias para llegar a la
    mejor solución.Aprender junto a otros siempre es muy enriquecedor.
    `,
  },
  {
    stars: 5,
    author: "Máximo Geraci",
    charge: "UX Designer",
    company: "Epsilon",
    testimonial:
      "Hace tiempo que estaba buscando una capacitación que sea más avanzada en mi disciplina y el curso que hice con ustedes fue el primero que cumplió en ese sentido. Aprender de personas con tanta experiencia en el rubro suma un montón.",
  },
  {
    stars: 5,
    author: "Camila Buscaglia",
    charge: "UX Content Writer",
    company: "Banco Galicia",
    testimonial:
      "El curso me encantó. Desde el dinamismo de los contenidos hasta la manera de explicarlos y la duración que tuvo me parece que fueron excelentes y los recontra recomiendo. Las herramientas que aprendí son las que uso hoy en el trabajo.",
  },
  {
    stars: 5,
    author: "Gloria Alcayaga",
    charge: "Ux Researcher",
    company: "",
    testimonial:
      "Fueron clases muy prácticas, dinámicas y entretenidas. Los instructores explican todo con muchísima claridad y también aportan muchos ejemplos que luego puedes poner en práctica en tu trabajo diario. Tuve una gran experiencia en Edison, la súper recomiendo.",
  },
  {
    stars: 5,
    author: "Christian Montiel",
    charge: "Ux designer",
    company: "Caja los Andes",
    testimonial:
      "Lo que más me gustó fue la parte práctica del curso. El instructor te ayuda con herramientas y el espacio para poder bajar lo aprendido lo cual es clave a la hora de aprender. Lo recomendaría porque eso es algo super fundamental.",
  },
];

const Testimonial = ({
  stars = 5,
  author = "{SIN_AUTOR}",
  children,
  charge,
  company,
}: {
  stars: number;
  author: string;
  children: string;
  charge?: string;
  company?: string;
}) => {
  return (
    <article className="bg-hero bg-review rounded-xl text-light p-4 flex flex-col gap-4 justify-between">
      <header className="flex justify-between">
        <img
          src="/legacy/ticks.svg"
          alt="tilde"
          width={20}
          height={20}
          loading="lazy"
        />
        <div className="flex">
          {Array.from({ length: stars }).map((_, i) => (
            <img
              key={i}
              src="/legacy/star.svg"
              alt="star"
              width={20}
              height={20}
              loading="lazy"
            />
          ))}
        </div>
      </header>
      <p className="mb-auto">{children}</p>
      <footer>
        <h4 className="font-bold">{author}</h4>
        <p>
          {charge}
          {company && `, ${company}`}
        </p>
      </footer>
    </article>
  );
};

export default function ReviewsSwiper() {
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
      { threshold: 0.1 },
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
          dynamicBullets: true,

          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
        }}
        spaceBetween={24}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
          },
          "@0.70": {
            slidesPerView: 2,
          },
          "@1.3": {
            slidesPerView: 3,
          },
        }}
        wrapperClass="relative w-full h-full z-10 flex"
      >
        {reviews.map((testimonial) => {
          return (
            <SwiperSlide
              className="h-auto flex shrink-0 w-full relative transition-transform"
              style={{ height: `auto`, display: "flex" }}
              key={testimonial.testimonial}
            >
              <Testimonial
                stars={testimonial.stars}
                author={testimonial.author}
                charge={testimonial.charge}
                company={testimonial.company}
              >
                {testimonial.testimonial}
              </Testimonial>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="pagination w-full h-auto flex gap-5 justify-center my-8"></div>
    </>
  );
}
