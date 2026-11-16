import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {getList} from "../../api/productsApi";
import FetchingModal from "../../components/common/FetchingModal";
import ListComponent from "../../components/products/ListComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomMove from "../../hooks/useCustomMove";

function ListPage() {
  const {page, size} = useCustomMove();

  const {exceptionHandle} = useCustomLogin();

  const {data, error, isPending} = useQuery({
    queryKey: ["products/list", page, size],
    queryFn: () => getList({page, size}),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (error) {
      exceptionHandle(error);
    }
  }, [error]);

  return (
    <div className="p-4 w-full bg-white">
      {isPending ? <FetchingModal/> : null}

      <div className="text-3xl font-extrabold">Products List Page</div>

      {data ? <ListComponent serverData={data}/> : null}
    </div>
  );
}

export default ListPage;
