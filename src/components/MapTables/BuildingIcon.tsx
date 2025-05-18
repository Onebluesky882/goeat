import React from "react";
import { Building, Factory, TreeDeciduous, TreePalm } from "lucide-react";

interface BuildingIconProps {
  icon: string;
  color: string;
  size?: number;
}

const BuildingIcon: React.FC<BuildingIconProps> = ({
  icon,
  color,
  size = 24,
}) => {
  const iconProps = {
    size,
    color,
    strokeWidth: 1.5,
  };

  switch (icon) {
    case "house":
    case "building":
      return <Building {...iconProps} />;
    case "factory":
      return <Factory {...iconProps} />;
    case "tree-deciduous":
      return <TreeDeciduous {...iconProps} />;
    case "tree-palm":
      return <TreePalm {...iconProps} />;
    case "building-2":
      return <Building {...iconProps} />;
    default:
      return <Building {...iconProps} />;
  }
};

export default BuildingIcon;
