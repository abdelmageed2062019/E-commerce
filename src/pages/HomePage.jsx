import ProductsList from "../components/ProdutcsList/ProductsList";
import Pagination from "./../components/Pagination/Pagination";

const HomePage = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center flex-column">
      <ProductsList />
      <Pagination />
    </div>
  );
};

export default HomePage;
