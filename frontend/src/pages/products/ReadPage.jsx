import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getOne} from "../../api/productsApi";
import FetchingModal from "../../components/common/FetchingModal";
import ReadComponent from "../../components/products/ReadComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

function ReadPage() {
  const {pno} = useParams();

  const {exceptionHandle} = useCustomLogin();

  const {data, error, isPending} = useQuery({
    queryKey: ["product", pno],
    queryFn: () => getOne(pno),
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (error) {
      exceptionHandle(error);
    }
  }, [error]);

  return (
    <div className="p-4 w-full bg-white">
      {isPending ? <FetchingModal/> : null}

      <div className="text-3xl font-extrabold">Products Read Page</div>

      {data ? <ReadComponent product={data}/> : null}
    </div>
  );
}

export default ReadPage;
