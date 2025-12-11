import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";

export default function SearchInput({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full md:max-w-92">
      <div
        className="
        flex items-center gap-3
        bg-[#e3e3e3]/60 
        border border-transparent
        rounded-none px-4 py-3
        focus-within:border-black/40
        transition-all
      "
      >
        <Search size={20} className=" text-black/70" />

        <input
          {...props}
          type="text"
          placeholder="Search"
          className="
            w-full bg-transparent outline-none
            placeholder:text-black/50
            text-black/80
            focus:text-black
          "
        />
      </div>
    </div>
  );
}
