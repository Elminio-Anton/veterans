import Image from "next/image";
import { mongoDb } from "@/lib/mongodb";

type Tab = "all" | "mailing" | "analytics";

export default async function Page({params,searchParams}:{params:Tab,searchParams:String}) {
  console.log(params,searchParams);
  const db = await mongoDb;
  return <span>PlaceHolder</span>
  ;
}
