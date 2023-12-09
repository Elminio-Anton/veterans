import Link from "next/link";
import Image from "next/image";
import style from "./main.module.scss";
import clientPromise from "@/lib/mongodb";

type Tab = "all" | "mailing" | "analytics";

function getDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateWithoutTime = `${day}.${month}.${year}`;
  return dateWithoutTime;
}

export default async function Main({ params }: { params: { tab: Tab } }) {
  const client = await clientPromise;
  const db = await client.db("veterans");
  let users = await db.collection("users").find({}).toArray();
  //console.log(db)
  console.log(users);
  if (!["all", "mailing", "analytics"].includes(params.tab))
    throw new Error(`Wrong route:params.tab=${params.tab}`);
  return (
    <main className={style.main}>
      <nav className={style.nav}>
        <Link
          className={
            style.link +
            " " +
            style.linkAll +
            " " +
            (params.tab === "all" ? style.active : "")
          }
          href="all">
          Всі користувачі
        </Link>
        <Link
          className={
            style.link +
            " " +
            style.linkMailing +
            " " +
            (params.tab === "mailing" ? style.active : "")
          }
          href="mailing">
          Розсилки
        </Link>
        <Link
          className={
            style.link +
            " " +
            style.linkAnalytics +
            " " +
            (params.tab === "analytics" ? style.active : "")
          }
          href="analytics">
          Аналітика
        </Link>
      </nav>
      <div className={style.sortContainer}>
        <select className={style.select} name="sorting" id="sorting">
          <option value="acscending">Від новіших</option>
          <option value="descending">Від старіших</option>
        </select>
        <Image src="/delete.svg" alt="delete" width={53} height={51}></Image>
        <Image src="/copy.svg" alt="copy" width={53} height={51}></Image>
        <div className={style.filterContainer}></div>
      </div>
      <div className={style.contentContainer}>
        {/* headers */}
        <table>
          <thead></thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id.toString()}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td>{getDate(user.request)}</td>
                  <td>{user.requests}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
