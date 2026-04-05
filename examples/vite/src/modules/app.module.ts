/**
 * App Module
 *
 * Root module that configures the application with Refine integration.
 */

import { Module } from "@abdokouta/react-di";
import { RefineModule } from "@abdokouta/refine";
import { refineConfig } from "@/config/refine.config";
import { PostsModule } from "./posts.module";

@Module({
  imports: [
    // Configure Refine at root level
    RefineModule.forRoot(refineConfig),
    // Feature modules with resources
    PostsModule,
  ],
})
export class AppModule {}
