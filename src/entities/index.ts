import { URL } from "url";

export interface Scene {
  sceneId: string;
  createdAt: Date;
  likes: number;
  screenshotURL: URL;
  tags: string[];
  title: string;
  updatedAt: Date;
}
