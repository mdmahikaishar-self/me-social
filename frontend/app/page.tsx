import { Header, SidebarLeft, SidebarRight } from "@components/common";
import { Feed } from "@components/home";
import services from "@services";
import helpSSR from "@libs/helpSSR";
import { IPost } from "@Types/";

export default async function HomePage() {
  const posts = await helpSSR<IPost[]>(async (token?: string) => {
    try {
      const request = await services.getAllPosts(token);
      if (request.status !== 200) return [];
      return request.data.posts;
    } catch {
      return [];
    }
  });

  return (
    <>
      <Header />

      <main className="grid grid-cols-4 bg-gray-100">
        <SidebarLeft />
        <Feed posts={posts} />
        <SidebarRight />
      </main>
    </>
  );
}
