import Image from "next/image";
import Link from "next/link";
import mc, { KEY } from "@/data/mc-cli.mjs";
import { type SomeForm } from "@/actions/handleAction";

async function getData(): Promise<SomeForm[]> {
  const data = await mc.get(KEY)
  return data ?? []
}

const Entry = ({ text, amount, status }: SomeForm) => {
  return (
    <ul className="m-8 bg-white p-10 rounded-md">
      <li>Quest: {text}</li>
      <li>Value: {amount}</li>
      <li>Status: {status ?? 'off'}</li>
    </ul>
  )
}

export default async function Home() {

  const data = await getData();

  return (<>
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex">
      <h1 className="text-black flex justify-center border-b border-gray-300 pb-6 pt-8 w-auto rounded-xl border bg-gray-200 p-4">
        Quest for Next Level
      </h1>
    </div>

    <div>
      {data?.map((d: SomeForm) => <Entry {...d} key={`key-{d.id}`} />)}
    </div>

    <div className="mb-0 w-full max-w-5xl text-left">
      <Link
        href="/demoaction"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <h2 className="mb-3 text-2xl font-semibold bg-dark-trans text-white p-8">
          Show me what you got to Quest For
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          Add your own valued quest
        </p>
      </Link>
    </div>
  </>
  );
}
