import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const postPreview = (props: PostMetadata) => {
  return (
    <div className="border border-slate-200 p-4 rounded-md shadow-xl bg-white">
      <Link href={`/posts/${props.slug}`}>
        <h2 className="font-bold text-pink-700 hover:underline">
          {props.title}
        </h2>
      </Link>
      <p className="text-sm text-slate-400">{props.date}</p>
      <p className="text-sm text-slate-800 font-bold">{props.subtitle}</p>
    </div>
  );
};

export default postPreview;
