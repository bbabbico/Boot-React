import {useQueryClient} from "@tanstack/react-query";
import useCustomMove from "../../hooks/useCustomMove";
import {API_SERVER_HOST} from "../../api/todoApi";
import PageComponent from "../common/PageComponent";

const host = API_SERVER_HOST;

const ListComponent = ({serverData}) => {
  const queryClient = useQueryClient();

  const {page, size, moveToList, moveToRead} = useCustomMove();

  const moveCheckPage = (pageParam) => {
    if (pageParam.page !== page) {
      moveToList(pageParam);
      return;
    }

    if (window.confirm("다시 페이지를 호출하시겠습니까?")) {
      queryClient.invalidateQueries({queryKey: ["products/list", page, size]});
    }
  };

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto p-6">
        {serverData.dtoList.map((product) => (
          <div
            key={product.pno}
            className="w-1/2 p-1 rounded shadow-md border-2"
            onClick={() => moveToRead(product.pno)}
          >
            <div className="flex flex-col h-full">
              <div className="font-extrabold text-2xl p-2 w-full">
                {product.pno}
              </div>
              <div className="text-1xl m-1 p-2 w-full flex flex-col">
                <div className="w-full overflow-hidden">
                  <img
                    alt="product"
                    className="m-auto rounded-md w-60"
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                  />
                </div>

                <div className="bottom-0 font-extrabold bg-white">
                  <div className="text-center p-1">이름: {product.pname}</div>
                  <div className="text-center p-1">가격: {product.price}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PageComponent serverData={serverData} movePage={moveCheckPage}/>
    </div>
  );
};

export default ListComponent;
