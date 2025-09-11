import type { PropCardGalery } from "../../../interface";

export default function ReactCardGalery({
  id,
  title,
  imageLogo,
  tags,
  shortDescription,
}: PropCardGalery) {
  /* const { URL_STRAPI } = envVariants(); */
  return (
    <li className="w-full sm:w-fit h-fit rounded-xl overflow-hidden flex flex-row gap-5 border border-black/20 shadow-xl p-6 mb-3 sm:mb-0">
      <a
        className="size-[100px] sm:size-[180px] rounded-lg overflow-hidden"
        href={`/userid/${id}`}
      >
        {imageLogo ? (
          <img
            src={`${imageLogo.url}`}
            className="size-full object-cover "
            alt={title}
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = "/image/no-image.png";
            }}
          />
        ) : (
          <div className="size-full bg-gray-300" />
        )}
      </a>
      <div className="flex flex-col gap-y-2 w-full sm:max-w-[224px]">
        <div className=" flex flex-col gap-y-2">
          <h3 className="font-semibold text-xl">{title}</h3>
          <ul className="flex flex-wrap gap-1 overflow-auto w-full">
            {tags.map((subItem, index) => (
              <li
                key={index}
                className={`w-fit text-sm px-2 py-1 rounded-md ${
                  (index + 1) % 2 === 0 && (index + 1) % 4 !== 0
                    ? "bg-sky-500/10 text-sky-500/80"
                    : (index + 1) % 3 === 0
                    ? "bg-fuchsia-500/10 text-fuchsia-500/80"
                    : (index + 1) % 4 === 0
                    ? "bg-amber-500/10  text-amber-500/80"
                    : (index + 1) % 5 === 0
                    ? "bg-emerald-500/10 text-emerald-500/80"
                    : "bg-blue-500/10 text-blue-500/80"
                } capitalize`}
              >
                {subItem.itemtag}
              </li>
            ))}
          </ul>
          <p className="text-sm">{shortDescription}</p>
        </div>
        <a
          href={`/userid/${id}`}
          className="w-full py-4 hidden sm:block bg-red-500 text-white text-base font-semibold text-center rounded-xl px-4"
        >
          Ver más
        </a>
      </div>
    </li>
  );
}
