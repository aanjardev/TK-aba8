import { Clock, Mail, MapPin, Phone } from "lucide-react";
import WhatsAppContactForm from "@/components/WhatsAppContactForm";
import { Eyebrow, Hl } from "@/components/SharedUI";
import { contactAddress, getSchoolContact } from "@/lib/school-contact";

export default async function KontakPage() {
  const data = await getSchoolContact();
  const details = [
    { icon: MapPin, label: "Alamat", value: contactAddress(data) },
    {
      icon: Phone,
      label: "Telepon & WhatsApp",
      value: `${data.phone} / ${data.whatsapp}`,
    },
    { icon: Mail, label: "Email", value: data.email },
    { icon: Clock, label: "Waktu pelayanan", value: data.serviceHours },
  ];
  return (
    <main className="bg-white">
      <section className="border-b border-emerald-100 bg-[#eef5f1] py-20">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <Eyebrow>Hubungi Sekolah</Eyebrow>
          <h1 className="text-4xl font-extrabold text-[#0a1c12] md:text-5xl">
            {data.sectionTitle.includes("Kami") ? (
              <>
                <Hl>Kunjungi</Hl> Kami
              </>
            ) : (
              data.sectionTitle
            )}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#6b8077]">
            {data.sectionDescription}
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-3 shadow-sm">
              <iframe
                src={data.mapEmbedUrl}
                className="aspect-[16/11] w-full rounded-2xl border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta lokasi sekolah"
                allowFullScreen
              />
            </div>
            <a
              href={data.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-bold text-[#007f36] hover:underline"
            >
              Buka petunjuk arah di Google Maps
            </a>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-[#fff9eb] p-7 md:p-8">
            <h2 className="text-2xl font-extrabold text-[#0a1c12]">
              Tanyakan kepada kami
            </h2>
            <p className="mb-6 mt-2 text-sm leading-relaxed text-[#6b8077]">
              Isi data singkat berikut. Pesan akan diteruskan melalui WhatsApp
              sekolah.
            </p>
            <WhatsAppContactForm
              whatsapp={data.whatsapp}
              defaultMessage={data.whatsappDefaultMessage}
            />
          </div>
        </div>
        <div className="container mx-auto mt-10 grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ icon: Icon, label, value }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Icon size={21} className="mb-4 text-[#00923f]" />
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-[#0a1c12]">
                {label}
              </h3>
              <p className="mt-2 break-words text-sm leading-relaxed text-[#6b8077]">
                {value}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
