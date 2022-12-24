// import styles from "@styles/components/home/styles.module.scss";
import { Header, SidebarLeft, SidebarRight } from "@components/common";
import { Feed } from "@components/profile";
import helpSSR from "@libs/helpSSR";
import services from "@services";
import { IUserLong } from "@Types/";
import { ProfileContextProvider } from "context/profile";
import { cookies } from "next/headers";

export default async function ProfilePage({ params: { userId } }: any) {
  const token = cookies().get("accessToken")?.value;
  const _auth = await helpSSR(async () => {});

  const user = await (async () => {
    try {
      const request = await services.getUserLong(userId, token);
      if (request.status !== 200) {
        return {} as IUserLong;
      }
      return request.data.user;
    } catch {
      return {} as IUserLong;
    }
  })();
  const following = await (async () => {
    try {
      const request = await services.isFollowing(userId, token);
      if (request.status !== 200) {
        return false;
      }
      return request.data.following;
    } catch {
      return false;
    }
  })();
  const posts = await (async () => {
    try {
      const request = await services.getAllUserPosts(userId, token);
      if (request.status !== 200) {
        return [];
      }
      return request.data.posts;
    } catch {
      return [];
    }
  })();

  return (
    <ProfileContextProvider user={user} following={following} posts={posts}>
      <Header />
      <main className="grid grid-cols-4 bg-gray-100">
        <SidebarLeft />
        <Feed />
        <SidebarRight />
      </main>
    </ProfileContextProvider>
  );
}
