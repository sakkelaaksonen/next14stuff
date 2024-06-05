import Image from "next/image";
import Link from "next/link";
import  mc, { KEY } from "@/data/mc-cli.mjs";
import { type SomeForm } from "@/actions/handleAction";

async function getData(): Promise<SomeForm[]> {
  const data = await mc.get(KEY)
  return data ?? []
}

const Entry= ({text,amount,status}: SomeForm)=> {
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
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-black fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Quest for Next Level
        </h1>
      </div>

      <div className="">
     {data?.map( (d:SomeForm) => <Entry {...d} />)}

      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
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
