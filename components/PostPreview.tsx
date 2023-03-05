import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const postPreview = (props: PostMetadata) => {
  return (
    <div className="border border-slate-300 p-4 rounded-md shadow-xl bg-white hover:scale-105 ease-in duration-200">
      <Link href={`/posts/${props.slug}`}>
        <h2 className="font-bold text-pink-700 hover:underline">
          {props.title}
        </h2>
      </Link>
      <p className="text-sm text-slate-400 mb-4">{props.date}</p>
      <p className=" text-slate-800 ">{props.subtitle}</p>
    </div>
  );
};

export default postPreview;
