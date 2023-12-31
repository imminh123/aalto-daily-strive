import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Navbar } from "@/components/common/Navbar";
import { Header } from "@/components/common/Header";
import { Search } from "@/components/common/Search";
import { HabitCard } from "@/components/pages/HabitCard";
import { TaskItem } from "@/components/pages/TaskItem";
import { useGetListTask } from "@/features/tasks/api/getListTask";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const { data: listTask } = useGetListTask();
  const [completedTasks, setCompletedTask] = useState('0');

  useEffect(() => {
    const completedTasks = listTask?.data?.reduce((acc, element) => {
      if (element.completed) {
        return ++acc;
      }
      return acc;
    }, 0);

    setCompletedTask(
      ((completedTasks * 100) / listTask?.data?.length).toFixed(0),
    );
  }, [listTask]);
  return (
    <>
      <Head>
        <title>Daily Strive</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        UNSKIN PITKÄ | UNSKI'S LONG
      </Head>
      <main className="relative flex min-h-screen flex-col bg-gradient-to-b from-[#fff] to-[#734ACC]">
        <section className="px-3 pb-1 pt-5">
          <Header />
          <h1 className="mb-5 mt-2 w-2/3 text-left text-2xl">
            Create your goal for your future
          </h1>
          <Search />

          <div className="mt-5">
            <div className="carousel w-full">
              {listTask?.data?.map((item, index) => (
                <div id={`item${index}`} className="carousel-item w-full">
                  <HabitCard data={item} />
                </div>
              ))}
            </div>
            <div className="flex w-full justify-center gap-2 py-2">
              {listTask?.data?.map((item, index) => (
                <a
                  href={`#item${index}`}
                  className="h-2 w-2 rounded-full bg-white"
                ></a>
              ))}
            </div>
          </div>
        </section>

        <section
          // style={{ height: "calc(58vh)" }}
          className="h-full overflow-hidden rounded-t-3xl bg-softTeal p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-light">
              You’re almost done, go ahead!
            </span>
            <span className="text-sm font-light">{`${completedTasks}%`}</span>
          </div>
          <progress
            className="progress progress-secondary "
            value={completedTasks}
            max="100"
          ></progress>

          <div className="mt-3 h-3/4 overflow-y-auto">
            {listTask?.data.map((item: any) => (
              <TaskItem
                key={item._id}
                id={item._id}
                streak={item.streak}
                title={item.name}
                complete={item.completed}
              />
            ))}
          </div>
        </section>

        <nav className="absolute bottom-1 mt-auto w-full p-2">
          <Navbar />
        </nav>
      </main>
    </>
  );
}
