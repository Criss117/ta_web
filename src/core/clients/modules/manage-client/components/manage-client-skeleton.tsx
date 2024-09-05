import BackButton from "@/components/ui/back-button";
import { Skeleton } from "@/components/ui/skeleton";
import ActionsNav from "./actions-nav";

const ManageClientSkeleton = () => {
  return (
    <section className="w-full px-10 h-full">
      <header className="mt-5  relative">
        <BackButton className="absolute -translate-y-1/2 top-1/2 m-0" />
        <div className="flex mx-auto justify-between w-[70%]">
          <div className="flex items-end ">
            <p className="text-xl">Saldo Actual: </p>
            <Skeleton className="w-60 h-9 bg-lightbg-100" />
          </div>
          <div className="flex items-end">
            <p className="text-xl">Límite de crédito: </p>
            <Skeleton className="w-60 h-9 bg-lightbg-100" />
          </div>
        </div>
      </header>
      <ActionsNav disabled clientId={-1} />
      <div className="flex mt-5 gap-x-10 h-52">
        <Skeleton className="w-1/5 h-52 bg-lightbg-100" />

        <Skeleton className="w-4/5 h-52 bg-lightbg-100" />
      </div>
    </section>
  );
};

export default ManageClientSkeleton;
