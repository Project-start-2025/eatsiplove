import { AppBuildManifestPlugin } from "next/dist/build/webpack/plugins/app-build-manifest-plugin";
import { AppDataSource } from "./typeorm";

export async function getDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
