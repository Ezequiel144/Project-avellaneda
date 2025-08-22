import { useEffect, useState } from "react";
export default function Map({ addressQuery }: any) {
  const [address, setAddress] = useState<string | null>(addressQuery);

  useEffect(() => {
    if (!addressQuery) {
      const params = new URLSearchParams(window.location.search);
      setAddress(params.get("q"));
    }
  }, [addressQuery]);

  const finalAddress = address || "Avellaneda, Buenos Aires, Argentina";
  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    finalAddress
  )}&output=embed`;
  return (
    <iframe
      title="Mapa"
      src={src}
      //width="100%"
      className="w-full h-[60%] md:h-full"
      //height="100%"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
