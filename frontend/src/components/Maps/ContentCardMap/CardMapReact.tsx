import type { PropCardMap } from "../../../interface";

export default function CardMapReact({
  id,
  title,
  tags,
  shortDescription,
  imageLogo,
  direction,
}: PropCardMap) {
  //const { URL_STRAPI } = envVariants();

  const fullAddress = `${direction.street} ${direction.number.toString()}, ${
    direction.locality
  }, ${direction.province}, ${direction.country}`;

  // 2. Codificamos la dirección para la URL
  const encodedAddress = encodeURIComponent(fullAddress);

  // 3. Creamos la URL para la página del mapa con el query 'q'
  const mapPageUrl = `/maps?q=${encodedAddress}`;

  return (
    <li className="bg-white rounded-xl w-fit h-fit shadow-lg flex gap-x-6 p-3">
      <a className="" href={`/userid/${id}`}>
        <div className="size-[180px] rounded-lg overflow-hidden">
          {imageLogo ? (
            <img
              src={`${imageLogo}`}
              className="size-full object-cover"
              alt={`image-${title}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/image/no-image.png";
              }}
            />
          ) : (
            <div className="size-full bg-gray-300" />
          )}
        </div>
      </a>
      <div className="w-[240px] flex flex-col gap-y-3">
        <h3 className="font-semibold text-xl tracking-normal truncate">
          {title}
        </h3>
        <ul className="flex gap-1 flex-wrap w-full">
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
        <a
          href={mapPageUrl}
          className="w-full py-2 bg-red-500 text-white rounded-xl text-base font-semibold text-center"
        >
          Ver ubicacion
        </a>
      </div>
    </li>
  );
}
