import { generic_img_h } from "../assets";
export default function Home() {
  return (
    <div className="h-full w-full">
      <div className={`relatve -z-10 h-[75vh] w-full overflow-hidden`}>
        <img
          className="h-full w-full object-cover object-center"
          src={generic_img_h.banner_2.src}
          alt={generic_img_h.banner_2.alt}
        />
      </div>
      <h1>This is home</h1>
    </div>
  );
}
