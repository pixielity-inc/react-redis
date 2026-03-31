import { ContainerProvider } from "@abdokouta/react-di";
import { Refine } from "@refinedev/core";
import { useInject } from "@abdokouta/react-di";
import {
  REFINE_CONFIG,
  REFINE_DATA_PROVIDER,
  ResourceRegistry,
  type RefineConfig,
  type DataProvider,
} from "@abdokouta/refine";

import { AppModule } from "@/modules/app.module";

function RefineProvider({ children }: { children: React.ReactNode }) {
  const config = useInject<RefineConfig>(REFINE_CONFIG);
  const dataProvider = useInject<DataProvider>(REFINE_DATA_PROVIDER);
  const resourceRegistry = useInject<ResourceRegistry>(ResourceRegistry);

  const resources = resourceRegistry.getAll();

  return (
    <Refine
      dataProvider={dataProvider}
      resources={resources}
      options={config.options}
    >
      {children}
    </Refine>
  );
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ContainerProvider module={AppModule}>
      <RefineProvider>{children}</RefineProvider>
    </ContainerProvider>
  );
}
