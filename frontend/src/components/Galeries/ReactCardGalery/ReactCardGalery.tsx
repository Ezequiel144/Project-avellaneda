
interface Prop {
  title: string;
  imageLogo?: string;
  tags: string[];
  shortDescription: string;
}

export default function ReactCardGalery({
  title,
  imageLogo,
  tags,
  shortDescription,
}: Prop) {
  return (
    <li className="w-fit max-h-[320px] rounded-xl overflow-hidden flex gap-5 border border-black/20 shadow-xl p-6">
      <a
        className="size-[180px] rounded-lg overflow-hidden"
        href={`/userid/${title}`}
      >
        {imageLogo ? (
          <img
            src={`../image/${imageLogo}`}
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
      <div className="flex flex-col gap-y-2 max-w-[224px]">
        <div className="p-2 flex flex-col gap-y-2">
          <h3 className="font-semibold text-xl">{title}</h3>
          <ul className="flex flex-wrap gap-1">
            {tags.map((subItem) => (
              <li className="w-fit text-sm px-2 py-1 rounded-md bg-blue-500/10 text-blue-500/80 capitalize">
                {subItem}
              </li>
            ))}
          </ul>
          <p className="text-sm">{shortDescription}</p>
        </div>
        <a
          href={`/userid/${title}`}
          className="w-full py-4 bg-red-500 text-white text-base font-semibold text-center rounded-xl px-4"
        >
          Ver más
        </a>
      </div>
    </li>
  );
}
