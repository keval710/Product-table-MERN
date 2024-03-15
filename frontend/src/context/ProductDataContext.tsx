import { SetStateAction, createContext, useEffect, useState } from "react";
import { formDataInterface } from "../interface/interface";
import axios from "axios";
import toast from "react-hot-toast";

interface context {
  formData: formDataInterface[];
  setFormData: React.Dispatch<SetStateAction<never[]>>;
  addData: (obj: formDataInterface) => void;
  deleteData: (id: string) => void;
  updateData: (obj: formDataInterface) => void;
}

export const ProductContext = createContext<context>({
  formData: [],
  setFormData: function (): void {
    throw new Error("Function not implemented.");
  },
  addData: function (): void {
    throw new Error("Function not implemented.");
  },
  deleteData: function (): void {
    throw new Error("Function not implemented.");
  },
  updateData: function (): void {
    throw new Error("Function not implemented.");
  },
});

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const [formData, setFormData] = useState([]);
  const [data, setData] = useState(false);

  const fetchData = async () => {
    await axios
      .get("http://localhost:5000/products")
      .then((data) => setFormData(data.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const addData = async (obj: formDataInterface) => {
    const formDataToSend = new FormData();
    // Append form data
    formDataToSend.append("id", obj.id);
    formDataToSend.append("productName", obj.productName);
    formDataToSend.append("description", obj.description);
    formDataToSend.append("price", obj.price);
    formDataToSend.append("image", obj.image);

    await axios
      .post("http://localhost:5000/addProduct", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 201) {
          setData(!data);
          toast.success("Successfully added Product 🙂");
        } else if (res.status === 422) {
          toast.error("product is not added");
        }
      })
      .catch((error) => {
        if (error) throw error(error);
      });
  };

  const updateData = async (obj: formDataInterface) => {
    // const stringifyData = JSON.stringify(obj);
    const formDataToSend = new FormData();
    // Append form data
    formDataToSend.append("id", obj.id);
    formDataToSend.append("productName", obj.productName);
    formDataToSend.append("description", obj.description);
    formDataToSend.append("price", obj.price);
    formDataToSend.append("image", obj.image);
    await axios
      .put(`http://localhost:5000/updateProduct`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 200) {
          setData(!data);
          toast.success("Successfully Product updated 🙂");
        }
      })
      .catch((error) => {
        if (error) throw error(error);
      });
  };

  const deleteData = async (id: string) => {
    await axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setData(!data);
          toast.success("Successfully Deleted!");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <ProductContext.Provider
      value={{
        formData,
        setFormData,
        addData,
        deleteData,
        updateData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
