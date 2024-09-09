import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export const Slider = () => {
  const imagesSlider = [
    {
      id: 1,
      image: "/img/banners/banner-promo-01.webp",
      alt: "Nike",
    },
    {
      id: 2,
      image: "/img/banners/banner-promo-02.webp",
      alt: "Nike",
    },
    {
      id: 3,
      image: "/img/banners/banner-promo-03.webp",
      alt: "Converse",
    },
  ];

  return (
    <div className="slider container mx-auto py-10">
      <Splide
        options={{
          rewind: true,
          gap: "1rem",
          perPage: 1,
          pagination: false,
          autoplay: true,
        }}
        aria-label="My Favorite Images"
      >
        {imagesSlider.map((image) => (
          <SplideSlide key={image.id}>
            <img src={image.image} alt={image.alt} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
