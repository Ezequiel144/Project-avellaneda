import envVariants from "../../../../helpers/envVariants";
import type { PropCard } from "../../../../interface";

export default function ({
  imageLogo,
  title,
  tags,
  shortDescription,
}: PropCard) {
  const { URL_STRAPI } = envVariants();
  return (
    <li className="w-[282px] h-fit rounded-xl overflow-hidden flex flex-col gap-y-2 border border-black/20 shadow-xl">
      <a className="w-full h-[220px]" href={`/userid/${title}`}>
        {imageLogo ? (
          <img
            src={`${URL_STRAPI}${imageLogo}`}
            className="size-full object-cover "
            alt=""
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
      <div className="p-2 flex flex-col gap-y-2">
        <h3 className="font-semibold text-xl">{title}</h3>
        <ul className="flex flex-wrap gap-1">
          {tags.map((subItem, index) => (
            <li
              key={index}
              className="w-fit text-sm px-2 py-1 rounded-md bg-blue-500/10 text-blue-500/80 capitalize"
            >
              {subItem.itemtag}
            </li>
          ))}
        </ul>
        <p>{shortDescription}</p>
      </div>
      <a
        href={`/userid/${title}`}
        className="w-full py-4 bg-red-500 text-white text-xl font-semibold text-center rounded-xl"
      >
        Ver local
      </a>
    </li>
  );
}
