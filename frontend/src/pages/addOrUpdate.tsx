import { ChangeEvent, useContext, useEffect, useState } from "react";
import Form from "../components/Form";
import { ProductContext } from "../context/ProductDataContext";
import { formDataInterface } from "../interface/interface";
import { useNavigate, useParams } from "react-router-dom";

const AddOrUpdate = () => {
  const navigate = useNavigate();
  const Product = useContext(ProductContext);
  const { id } = useParams();

  useEffect(() => {
    if (id) document.title = "product - update Product";
    else document.title = "product - add product";
  }, [id]);

  //* form state
  const [tempFormData, setTempFormData] = useState<formDataInterface>({
    id: "",
    productName: "",
    price: "",
    description: "",
    image: "",
  });

  const [updateState, setUpdateState] = useState<formDataInterface>({
    id: "",
    productName: "",
    price: "",
    description: "",
    image: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      const data = Product.formData.filter((val) => val.id === id);
      setUpdateState(data[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //* handle input change
  const handleChangeInput = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    const data = {
      ...tempFormData,
      id: new Date().getTime().toString(),
      [name]: value,
    };
    setTempFormData(data);
  };

  //* add file change
  const handleFileInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { name, files } = e.target;
    setTempFormData({ ...tempFormData, [name]: files[0] });
  };

  //* update File
  const handleUpdateFileInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { name, files } = e.target;
    console.log(files[0]);
    setUpdateState({ ...updateState, [name]: files[0] });
  };

  //* handle form submit
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    //* stores all keys
    const field: string[] = Object.keys(tempFormData);

    //* stores formaStateData to new var
    let newFormValues = { ...tempFormData };
    let errorFlag: boolean = false;

    for (let i: number = 0; i < field.length; i++) {
      //* empty value validation
      if (newFormValues[field[i]] === "") {
        newFormValues = {
          ...newFormValues,
          [field[i]]: { ...[tempFormData[field[i]]], error: true },
        };
        errorFlag = true;
      }
    }

    if (errorFlag) {
      setTempFormData(newFormValues);
      console.log(newFormValues);
    } else {
      //* call addData fun
      Product.addData(tempFormData);
      setTempFormData({
        id: "",
        productName: "",
        price: "",
        description: "",
        image: "",
      });
      setTimeout(() => {
        navigate("/");
      }, 800);
    }
  };

  //* handle Update form Change Event
  const handleUpdateChangeInput = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setUpdateState({ ...updateState, [name]: value });
  };

  //* handle update submit
  const handleUpdateSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsUpdate(false);
    Product.updateData(updateState);
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <>
      {isUpdate ? (
        <Form
          handleChangeInput={handleUpdateChangeInput}
          handleSubmit={handleUpdateSubmit}
          tempFormData={updateState}
          isUpdate={isUpdate}
          handleFileInput={handleUpdateFileInput}
        />
      ) : (
        <Form
          handleChangeInput={handleChangeInput}
          handleSubmit={handleSubmit}
          tempFormData={tempFormData}
          isUpdate={isUpdate}
          handleFileInput={handleFileInput}
        />
      )}
    </>
  );
};

export default AddOrUpdate;
