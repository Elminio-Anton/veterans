import Link from "next/link";
import Image from "next/image";
import style from "./main.module.scss";
import clientPromise from "@/lib/mongodbb";

type Tab = "all" | "mailing" | "analytics";

function getDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateWithoutTime = `${day}.${month}.${year}`;
  return dateWithoutTime;
}

export default async function Main({ params }: { params: { tab: Tab } }) {
  if (!["all", "mailing", "analytics"].includes(params.tab))
    throw new Error(`Wrong route:params.tab=${params.tab}`);
  const client = await clientPromise;
  const db = await client.db("veterans");
  let users = await db.collection("users").find({}).toArray();
  let mailing = await db.collection("mailing").find({}).toArray();
  //console.log(db)
  //console.log(users);
  function All() {
    return (
      <div className={style.contentContainer}>
        <table>
          <thead>
            <th className={style.th}>Ім'я користувача</th>
            <th className={style.th}>Група користувачів</th>
            <th className={style.th}>Вік</th>
            <th className={style.th}>Географічна локалізація</th>
            <th className={style.th}>Дата реєстрації запита</th>
            <th className={style.th}>Кількість звернень</th>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id.toString()}>
                  <td className={style.td}>{user.name}</td>
                  <td className={style.td}>{user.role}</td>
                  <td className={style.td}>{user.age}</td>
                  <td className={style.td}>{user.city}</td>
                  <td className={style.td}>{getDate(user.request)}</td>
                  <td className={style.td}>{user.requests}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  function Mailing() {
    return(
      <div className={style.contentContainer}>
      <table>
        <thead>
          <th className={style.th}>Група розсилок для</th>
          <th className={style.th}>Вид розсилки</th>
          <th className={style.th}>Період розсилки</th>
          <th className={style.th}>Направлення розсилки</th>
          <th className={style.th}>Редагувати</th>
          <th className={style.th}>Видалити</th>
        </thead>
        <tbody>
          {mailing.map((mail) => {
            return (
              <tr key={mail._id.toString()}>
                <td className={style.td}>{mail.group}</td>
                <td className={style.td}>{mail.type}</td>
                <td className={style.td}>{mail.period}</td>
                <td className={style.td}>{mail.app}</td>
                <td className={style.td}><Image width={24} height={24} src="/edit-icon.svg" alt="edit"></Image></td>
                <td className={style.td}><Image width={24} height={24} src="/delete-icon.svg" alt="delete"></Image></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    )
  }

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
      {params.tab === "all" ? (
        <All />
      ) : params.tab === "mailing" ? (
        <Mailing />
      ) : (
        "404"
      )}
    </main>
  );
}
