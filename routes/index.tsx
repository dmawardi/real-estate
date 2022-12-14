import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import User from "../db/models/user.ts";
import userService from "../db/services/users.ts";

export const handler: Handlers<User[] | null> = {
  async GET(_, ctx) {
    // const { username } = ctx.params;
    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }
    const resp: User[] = await userService.getAllUsers();
    // const user: [User] = await resp.json();
    return ctx.render(resp);
  },
};

export default function Home({ data }: PageProps<User | null>) {
  if (!data) {
    return <h1>User not found</h1>;
  }

  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>

      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <h1>{data[0].username}</h1>
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
        <Counter start={3} />
      </div>
    </>
  );
}
