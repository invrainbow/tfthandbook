import { IndexView } from "@/components/IndexView";
import _handbookData from "@/data.json";
import { HandbookData } from "../../data/types";

const handbookData: HandbookData = _handbookData;

export default function Home() {
  return <IndexView handbookData={handbookData} />;
}
