import Image from "next/image";
import { Plus } from "lucide-react";
import { HTMLAttributes } from "react";
import { motion } from "framer-motion";
export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: any;
  onClick: () => void;
  imageWidth?: string;
  imageheight?: string;
}

export function ProductCard({
  product,
  imageWidth,
  imageheight,
  onClick,
  ...props
}: ProductCardProps) {
  return (
    <div
      {...props}
      className={`flex flex-col gap-3 pb-4 md:min-h-78  cursor-pointer ${props.className}`}
      onClick={onClick}
    >
      <div className=" w-full bg-gray-50 overflow-hidden">
        <motion.div
          layoutId={`product-image-${product?._id}`}
          className="w-full h-full "
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <Image
            src={product?.images[0]}
            alt={product?.name}
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
            style={{
              width: imageWidth,
              height: imageheight,
            }}
          />
        </motion.div>
      </div>

      <button className="bg-[#D9D9D9] w-10 h-10 flex items-center justify-center rounded-none mx-auto cursor-pointer hover:bg-[#c4c4c4] transition-colors">
        <Plus size={16} />
      </button>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-gray-500">Name of Product</p>
        <div className="flex justify-between items-start text-base font-medium">
          <p>{product?.name}</p>
          <span>${product?.price}</span>
        </div>
      </div>
    </div>
  );
}
