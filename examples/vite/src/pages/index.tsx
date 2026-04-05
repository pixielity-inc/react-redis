import { Link } from "react-router-dom";
import { Button } from "@heroui/react";

import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Refine&nbsp;</span>
          <span className={title({ color: "blue" })}>+ DI&nbsp;</span>
          <br />
          <span className={title()}>for React</span>
          <div className={subtitle({ class: "mt-4" })}>
            Built with @abdokouta/refine and HeroUI
          </div>
        </div>

        <div className="flex gap-3">
          <Link to="/posts">
            <Button variant="primary" size="lg">
              View Posts Demo
            </Button>
          </Link>
          <a
            href="https://github.com/pixielity-inc/refine"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button size="lg" variant="outline">
              <GithubIcon size={20} />
              GitHub
            </Button>
          </a>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 rounded-xl bg-surface shadow-surface px-4 py-2">
            <pre className="text-sm font-medium font-mono">
              npm install{" "}
              <code className="px-2 py-1 h-fit font-mono font-normal inline whitespace-nowrap rounded-sm bg-accent/20 text-accent text-sm">
                @abdokouta/refine @refinedev/core
              </code>
            </pre>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
