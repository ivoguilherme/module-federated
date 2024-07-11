import React, { Suspense } from "react";
import useDynamicScript from "../hooks/useDynamicScript";

declare global {
  const __webpack_init_sharing__: (parameter: string) => Promise<void>;
  const __webpack_share_scopes__: { default: any };
}

function loadComponent(scope: string, module: string) {
  return async () => {
    // await new Promise((resolve) => {
    //   setTimeout(() => resolve(null), 5000);
    // });

    await __webpack_init_sharing__("default");
    const container = (window as any)[scope];
    await container.init(__webpack_share_scopes__.default);
    const factory = await (window as any)[scope].get(module);
    const Module = factory();
    return Module;
  };
}

type ModuleLoaderProps = {
  module: string;
  url: string;
  scope: string;
};

function ModuleLoader(props: ModuleLoaderProps) {
  const { ready, failed } = useDynamicScript(props.module && props.url);

  if (!props.module) {
    console.error("Not system specified");
    return null;
  }

  if (!ready) {
    console.info(`Loading dynamic script: ${props.url}`);
    return null;
  }

  if (failed) {
    console.error(`Failed to load dynamic script: ${props.url}`);
    return null;
  }

  const Component = React.lazy(loadComponent(props.scope, props.module));

  return (
    ready && (
      <Suspense fallback="Loading Module">
        <Component />
      </Suspense>
    )
  );
}

export default ModuleLoader;
