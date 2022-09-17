import type { NextPage } from "next";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Events = () => {
  const { data: events, isLoading } = trpc.useQuery(["event.getAll"])

  if (isLoading) return <div>Fetching Events...</div>

  return (
    <div>
      {events?.map((event, index: number) => {
        if(!event.private) {
          return (
            <div key={index}>
              <h2>{event.name}</h2>
              <p>{event.description}</p>
            </div>
          )
        }
      })}
    </div>
  )
}

const Home: NextPage = () => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const { data: session, status } = useSession();

  const ctx = trpc.useContext()
  const postEvent = trpc.useMutation("event.postEvent", {
    onMutate: () => {
      ctx.cancelQuery(["event.getAll"]);

      const optimisticUpdate = ctx.getQueryData(["event.getAll"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["event.getAll"], optimisticUpdate)
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["event.getAll"])
    }
  })

  return (
    <div>
      <h1>Home page</h1>
      <div>
      <form 
        onSubmit={(event) => {
          event.preventDefault()

          postEvent.mutate({
            name,
            description,
            location: 'TKE HOUSE',
            contactEmail: 'contact@tke.org',
            contactPhone: '911',
            private: false
          });

          setName("");
          setDescription("");
        }}
      >
        <input
          type="text"
          value={name}
          placeholder="Event title..."
          minLength={2}
          maxLength={128}
          onChange={(event) => setName(event.target.value)}
        />
        <input 
          type="text"
          value={description}
          placeholder="Event description..."
          minLength={2}
          maxLength={128}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      </div>
      <div>
        <Events />
      </div>
      <div>
        { session ? (
          <div>
            <h1>hello {session.user?.name}</h1>

            <button onClick={() => signOut()}>
              Log out
            </button>
          </div>
        ):(
          <div>
            <button onClick={() => signIn("discord")}>
              Log in with Discord
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;