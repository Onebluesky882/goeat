export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  [key: string]: string | undefined;
};

export type RestaurantData = {
  name: string;
  address?: string;
  phone?: string;
  googleMaps?: string;
  website?: string;
  socials: SocialLinks;
};
