import {useRef, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postAdd} from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  pname: "",
  pdesc: "",
  price: 0,
  files: [],
};

const AddComponent = () => {
  const [product, setProduct] = useState({...initState});
  const uploadRef = useRef();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postAdd,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["products/list"]}),
  });

  const {moveToList} = useCustomMove();

  const handleChangeProduct = (e) => {
    setProduct({...product, [e.target.name]: e.target.value});
  };

  const handleClickAdd = () => {
    const files = uploadRef.current.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);

    mutation.mutate(formData);
  };

  const closeModal = () => {
    moveToList({page: 1});
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {mutation.isPending ? <FetchingModal/> : null}

      {mutation.data ? (
        <ResultModal
          title="Product Add Result"
          content={`${mutation.data.result}번 등록 완료`}
          callbackFn={closeModal}
        />
      ) : null}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pname"
            type="text"
            value={product.pname}
            onChange={handleChangeProduct}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Desc</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="pdesc"
            rows="4"
            onChange={handleChangeProduct}
            value={product.pdesc}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChangeProduct}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type="file"
            multiple={true}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
