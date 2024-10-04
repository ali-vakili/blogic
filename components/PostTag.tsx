import { PostType } from "@/types";

const PostTag = ({ categories }: { categories: PostType["categories"] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <div
          key={category.id}
          className="text-xs text-gray-800 bg-indigo-300 rounded-full py-1 px-2"
        >
          # {category.name}
        </div>
      ))}
    </div>
  );
};

export default PostTag;
