import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ProductCard";
import { useLoading } from "../contexts/LoadingContext";
import { fetchCategorias, fetchData } from "../services/faketstoreApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import CardLoader from "../components/CardsPlaceholderLoader";
import { Modal } from "react-bootstrap";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [categoriasData, setCategoriasData] = useState();
  const [destacadosData, setDestacadosData] = useState();
  const navigate = useNavigate();
  const { handleRoutesLoadComplete, handleRoutesLoading } = useLoading();
  useEffect(() => {
    setLoading(true); // Inicia la carga
    async function loadAllData() {
      try {
        const [categorias, destacados] = await Promise.all([
          fetchCategorias(),
          fetchData('https://api.escuelajs.co/api/v1/products?offset=0&limit=50'),
        ]);
        console.log("categorias: ", categorias);
        console.log("destacados: ", destacados);

        setCategoriasData(categorias);
        setDestacadosData(destacados);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        handleRoutesLoadComplete();
      }
    }

    loadAllData();
  }, []);
  //////////////////////////

  return (
    <>
      <main className="space-y-8 py-5">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to My<span className="text-gray-500">Store</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Discover our amazing products...
          </p>
          <Button size="lg" variant="dark" onClick={() => setModalShow(true)}>
            View catalog
          </Button>
          <Modal
            size="xl"
            aria-labelledby="modal-categories"
            centered
            show={modalShow}
            onHide={() => setModalShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title id="modal-categories">
                Categories
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="grid-category">
                {loading ? (
                  <></>
                ) : (
                  categoriasData.length > 0 &&
                  categoriasData.slice(0, 5).map((category, i) => (
                    <div
                      key={category.name}
                      className="relative rounded-md overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() =>
                        navigate(`${category.navlink}`, { state: { id: category.id } })
                      }
                    >
                      <img
                        src={category.image}
                        alt={`Category: ${category.name}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <h3 className="font-medium text-xl text-center text-white">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Modal.Body>
          </Modal>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4 ml-5">
            Featured products
          </h2>
          <Swiper
            slidesPerView="auto"
            centeredSlides={false}
            spaceBetween={20}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="destacados pb-5"
          >
            {loading
              ? Array(10)
                  .fill()
                  .map((_, i) => (
                    <SwiperSlide key={i} style={{ width: "auto" }}>
                      <Card>
                        <CardLoader></CardLoader>
                      </Card>
                    </SwiperSlide>
                  ))
              : destacadosData.length > 0 &&
                destacadosData.map((producto, i) => (
                  <SwiperSlide key={i} style={{ width: "auto" }}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{producto.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={producto.images}
                          alt={`Producto ${i}`}
                          className="max-w-full h-auto mb-4"
                          style={{ maxWidth: "300px" }}
                        />
                        <p className="text-gray-600 h-[72px] overflow-y-auto card-scrollbar pr-2">
                          {producto.description}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="dark">View details</Button>
                      </CardFooter>
                    </Card>
                  </SwiperSlide>
                ))}
          </Swiper>
        </section>
      </main>
    </>
  );
};

export default Home;
