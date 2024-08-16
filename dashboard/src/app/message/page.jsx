import dynamic from "next/dynamic";

const Chat = dynamic(() => import("./chat"), {
  ssr: false,
});

function page() {
  return (
    <main>
      <h1 className="title">Next.js Chat Demo</h1>
      <Chat />
    </main>
  );
}

export default page;
