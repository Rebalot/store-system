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
import { fetchProducts } from "../services/inventoryApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import CardLoader from "../components/CardsPlaceholderLoader";
import { Modal } from "react-bootstrap";

const CATEGORIES = [
  { name: 'Electronics',    value: 'ELECTRONICS',   image: 'https://picsum.photos/seed/electronics/600/400' },
  { name: 'Clothes',        value: 'CLOTHES',        image: 'https://picsum.photos/seed/clothes/600/400' },
  { name: 'Furniture',      value: 'FURNITURE',      image: 'https://picsum.photos/seed/furniture/600/400' },
  { name: 'Shoes',          value: 'SHOES',          image: 'https://picsum.photos/seed/shoes/600/400' },
  { name: 'Miscellaneous',  value: 'MISCELLANEOUS',  image: 'https://picsum.photos/seed/miscellaneous/600/400' },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [destacadosData, setDestacadosData] = useState([]);
  const navigate = useNavigate();
  const { handleRoutesLoadComplete } = useLoading();

  useEffect(() => {
    setLoading(true);
    async function loadAllData() {
      try {
        const data = await fetchProducts({ page: 0, limit: 20 });
        console.log("Featured products data:", data);
        setDestacadosData(data.items ?? []);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
        handleRoutesLoadComplete();
      }
    }
    loadAllData();
  }, []);

  const handleCategoryClick = (category) => {
    navigate('/catalog', { state: { category } });
  };

  return (
    <>
      <main className="space-y-8 py-5">
        {/* Hero */}
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

          {/* Categories modal */}
          <Modal
            size="xl"
            aria-labelledby="modal-categories"
            centered
            show={modalShow}
            onHide={() => setModalShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title id="modal-categories">Categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="grid-category">
                {CATEGORIES.map((category) => (
                  <div
                    key={category.value}
                    className="relative rounded-md overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => handleCategoryClick(category.value)}
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
                ))}
              </div>
            </Modal.Body>
          </Modal>
        </section>

        {/* Featured products */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 ml-5">Featured products</h2>
          <Swiper
            slidesPerView="auto"
            centeredSlides={false}
            spaceBetween={20}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            className="destacados pb-5"
          >
            {loading
              ? Array(10).fill().map((_, i) => (
                  <SwiperSlide key={i} style={{ width: "auto" }}>
                    <Card>
                      <CardLoader />
                    </Card>
                  </SwiperSlide>
                ))
              : destacadosData.map((producto) => (
                  <SwiperSlide key={producto.id} style={{ width: "auto" }}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{producto.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={producto.image}
                          alt={producto.name}
                          className="max-w-full h-auto mb-4"
                          style={{ maxWidth: "300px" }}
                        />
                        <p className="text-gray-600 h-[72px] overflow-y-auto card-scrollbar pr-2">
                          {producto.description}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="dark"
                          onClick={() => navigate('/catalog', { state: { search: producto.name } })}
                        >
                          View details
                        </Button>
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
