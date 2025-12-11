import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#F5F5F5] w-full py-20 px-4">
      <div className="max-w-7xl w-full flex md:flex-row flex-col gap-8 justify-around">
        <div className="flex md:flex-col flex-row  md:justify-normal md:gap-10 gap-24">
          <div className="flex flex-col gap-6">
            <span className="text-sm font-light">INFO</span>
            <ul className="flex flex-col gap-1">
              <li>PRICING</li>
              <li>ABOUT</li>
              <li>CONTACTS</li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-sm font-light">LANGUAGES</span>
            <ul className="flex flex-col gap-1">
              <li>ENG</li>
              <li>ESP</li>
              <li>SVE</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-light">TECHNOLOGIES</p>
          <div className="flex flex-col gap-3">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={100}
              height={100}
              className="h-12 w-12"
            ></Image>
            <div className="flex justify-normal items-start gap-4">
              <div className="flex flex-col gap-0 leading-19 font-black text-[5rem]">
                <span>XIV</span>
                <span>QR</span>
              </div>
              <p className="text-sm font-light">NEAR FIELD COMMUNICATIONS </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
