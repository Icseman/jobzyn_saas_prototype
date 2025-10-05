/// <reference types="vite/client" />

declare module "*.svg?react" {
  import React from "react";
  const SVGComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default SVGComponent;
}

declare module "@/Assets/*.svg?react" {
  import React from "react";
  const SVGComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default SVGComponent;
}
