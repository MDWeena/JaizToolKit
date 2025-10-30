import React from "react";

export interface PageItem {
  id: number;
  text: string;
  icon: React.ReactNode;
  route: string;
  keywords?: string[];
  class?: string;
}

export type PageSection = Pick<PageItem, "id" | "icon"> & {
  section: string;
  content: string[];
};