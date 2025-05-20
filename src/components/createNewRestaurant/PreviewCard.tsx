import React from "react";
import { MapPin, Phone, Link, Facebook, Instagram } from "lucide-react";
import type { RestaurantData } from "types/createShop";

const getSocialIcon = (key: string) => {
  switch (key) {
    case "facebook":
      return <Facebook size={18} className="text-blue-600" />;
    case "instagram":
      return <Instagram size={18} className="text-pink-500" />;
    default:
      return <Link size={18} />;
  }
};

const RestaurantPreviewCard: React.FC<{ data: RestaurantData }> = ({
  data,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg mx-auto mt-8 border border-gray-100">
      <h2 className="font-bold text-xl mb-3 text-gray-900">{data.name}</h2>
      {data.address && (
        <div className="flex items-center space-x-2 mb-2">
          <MapPin size={18} className="text-violet-600" />
          <span className="text-gray-700">{data.address}</span>
        </div>
      )}
      {data.phone && (
        <div className="flex items-center space-x-2 mb-2">
          <Phone size={18} className="text-green-600" />
          <span className="text-gray-700">{data.phone}</span>
        </div>
      )}
      {data.googleMaps && (
        <div className="flex items-center space-x-2 mb-2">
          <MapPin size={18} className="text-blue-500" />
          <a
            href={data.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            Google Maps
          </a>
        </div>
      )}
      {data.website && (
        <div className="flex items-center space-x-2 mb-2">
          <Link size={18} className="text-cyan-500" />
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 underline break-all"
          >
            {data.website}
          </a>
        </div>
      )}
      {Object.values(data.socials).some(Boolean) && (
        <div className="mb-2">
          <div className="font-semibold text-sm mb-1 text-gray-700">
            Socials
          </div>
          <div className="flex gap-4">
            {Object.entries(data.socials).map(
              ([key, link]) =>
                link && (
                  <a
                    key={key}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-700 hover:text-primary"
                  >
                    {getSocialIcon(key)}
                    <span className="underline text-xs break-all">{link}</span>
                  </a>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPreviewCard;
