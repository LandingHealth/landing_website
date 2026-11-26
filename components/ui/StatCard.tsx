import Image from "next/image";

export default function StatCard({
  image,
  stat,
  label,
  className = "",
}: {
  image: { src: string; alt: string };
  stat: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={`relative isolate flex h-72 flex-col sm:aspect-[2/1] sm:h-auto justify-end overflow-hidden rounded-3xl bg-night p-6 text-white sm:p-8 ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-night/75 via-night/25 to-transparent" />
      <p className="text-[clamp(3rem,2.2rem+2.4vw,4rem)] leading-none font-semibold tracking-[-0.02em]">{stat}</p>
      <figcaption className="mt-3 text-base leading-[1.3]">{label}</figcaption>
    </figure>
  );
}
