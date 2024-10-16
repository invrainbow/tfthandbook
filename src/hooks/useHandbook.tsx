import { Handbook } from "@/handbook/types";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
} from "react";

const HandbookContext = createContext<Handbook>(null as unknown as Handbook);

type Props = PropsWithChildren & {
  loadingView: ReactNode;
};

export function HandbookProvider({ loadingView, children }: Props) {
  const { data, isLoading, error } = useQuery({
    retry: false,
    queryKey: ["get-handbook"],
    queryFn: async () => {
      const resp = await fetch("/api/fetch-handbook");
      return (await resp.json()) as Handbook;
    },
  });

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  if (isLoading) return loadingView;
  if (!data) return null;

  return (
    <HandbookContext.Provider value={data}>{children}</HandbookContext.Provider>
  );
}

export const useHandbook = () => useContext(HandbookContext);
