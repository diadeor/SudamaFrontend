import { MapPin, Phone } from "lucide-react";

const InPerson = ({
  maps,
  address,
  phone,
  extraClass,
}: {
  maps: string;
  address: string;
  phone: string;
  extraClass: string;
}) => {
  return (
    <div
      className={`${extraClass} space-y-1 rounded-2xl border border-outline-variant p-5 text-sm`}
    >
      <p className="mb-2 font-semibold text-on-surface">Prefer to see it in person?</p>
      <a
        href={maps}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg py-1.5 text-on-surface-variant hover:text-primary"
      >
        <MapPin size={16} aria-hidden="true" />
        {address}
        <span className="ml-auto text-xs font-semibold text-primary">Directions</span>
      </a>
      <a
        href={`tel:+977${phone}`}
        className="flex items-center gap-2 rounded-lg py-1.5 text-on-surface-variant hover:text-primary"
      >
        <Phone size={16} aria-hidden="true" />
        +977 {phone}
        <span className="ml-auto text-xs font-semibold text-primary">Call</span>
      </a>
    </div>
  );
};

export default InPerson;
