import { Search } from "@/components/common/Search";
import { TopicCard } from "@/components/pages/TopicCard";
import { useGetListTopic } from "@/features/tasks/api/getListTopic";
import Head from "next/head";

const TopicPage = () => {
  const {data: topics} = useGetListTopic()

  return (
    <>
      <Head>
        <title>Daily Strive</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main className="p-3">
        <header className="py-3">
          <h1 className="text-center text-xl font-semibold">Habits</h1>
        </header>
        <Search inputClassName="bg-softGrey" />

        <div className="mt-6">
          {topics?.data?.map((item: any) => (
            <TopicCard key={item._id} id={item._id} name={item.name} summary={item.description} image={item.imageURL as any}/>
          ))}
        </div>
      </main>
    </>
  );
};

export default TopicPage;
