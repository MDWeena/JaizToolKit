import type { Href } from "expo-router";
import React from "react";

export interface PageItem {
  id: number;
  text: string;
  icon: React.ReactNode;
  route: Href;
  keywords?: string[];
  class?: string;
}

export type StarredItem = Pick<PageItem, "id" | "text" | "route" | "icon">;

export type PageSection = Pick<PageItem, "id" | "icon"> & {
  section: string;
  content: string[];
};