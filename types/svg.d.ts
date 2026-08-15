declare module "*.svg" {
  import type { SVGProps } from "react";
  const Component: React.ComponentType<SVGProps<SVGSVGElement>>;
  export default Component;
}
