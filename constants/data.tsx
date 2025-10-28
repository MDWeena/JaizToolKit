import { ResourceIcon, AccountIcon, FunctionIcon, ProductIcon } from "@/assets/images/svgs/category-icons";

export const categoriesData = [
  {
    id: 1,
    icon: <AccountIcon width={44} height={44} />,
    text: "Account",
    route: "/(tabs)/(home)/(categories)/accounts" as const,
    keywords: ["accounts"],
    class: "border-error/40 bg-error/20"
  },
  {
    id: 2,
    icon: <FunctionIcon width={44} height={44} />,
    text: "Function",
    route: "/(tabs)/(home)/(categories)/functions" as const,
    keywords: ["functions"],
    class: "border-secondary/40 bg-secondary/20"
  },
  {
    id: 3,
    icon: <ProductIcon width={44} height={44} />,
    text: "Product",
    route: "/(tabs)/(home)/(categories)/products" as const,
    keywords: ["products"],
    class: "border-primary/40 bg-primary/20"
  },
  {
    id: 4,
    icon: <ResourceIcon width={44} height={44} />,
    text: "Resource",
    route: "/(tabs)/(home)/(categories)/resources" as const,
    keywords: ["resources", "help", "support"],
    class: "border-success/40 bg-success/20"
  },
];