import { IoMdCloseCircle } from "react-icons/io";

export default function SidebarMenu({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: (x: boolean) => void;
}) {
  const listMenu = [
    { title: "Galeria", link: "/galeries" },
    { title: "Locales", link: "/locals" },
    { title: "Mapa", link: "/maps" },
    { title: "Contactar", link: "#" },
  ];

  return (
    <aside
      className={` bg-red-500 absolute top-0 w-full h-screen ${
        !isActive ? "-right-full opacity-0" : "right-0 opacity-100"
      } sm:hidden rounded-xl transition-all duration-300 flex flex-col items-center justify-center`}
    >
      <ul className="flex flex-col gap-y-4 w-full h-fit items-center justify-center">
        {listMenu.map((item) => (
          <li key={item.title} className="text-2xl font-normal">
            <a href={item.link}>{item.title}</a>
          </li>
        ))}
      </ul>
      <button
        className="text-2xl cursor-pointer absolute right-6 top-5"
        onClick={() => setIsActive(false)}
      >
        <IoMdCloseCircle className="text-3xl"/>
      </button>
    </aside>
  );
}
