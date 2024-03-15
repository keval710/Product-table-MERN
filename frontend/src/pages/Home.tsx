import { useContext, useEffect } from "react";
import Table from "../components/Table";
import { ProductContext } from "../context/ProductDataContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const ProductData = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "product";
  }, []);

  //* navigate to addORUpdate page along with id
  const handleEditClick = (id: string) => navigate(`/addOrUpdate/${id}`);

  //* call deleteData fun
  const handleDeleteClick = (id: string) => {
    ProductData.deleteData(id);
  };

  //* navigate to details page along with id
  const handleViewClick = (id: number) => navigate(`/details/${id}`);

  return (
    <>
      <Table
        formData={ProductData?.formData}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleViewClick={handleViewClick}
      />
    </>
  );
};

export default Home;
