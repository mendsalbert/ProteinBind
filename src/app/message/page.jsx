import dynamic from "next/dynamic";

const Chat = dynamic(() => import("./chat"), {
  ssr: false,
});

function page() {
  return (
    <main>
      <Chat />
    </main>
  );
}

export default page;
