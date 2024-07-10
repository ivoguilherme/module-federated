import { lazy, Suspense } from "react";

// @ts-ignore
const Menu = lazy(() => import("menu/Menu"));

function App() {
  return (
    <div>
      <h1>App Shell</h1>
      <Suspense fallback={<div>Carregando Menu...</div>}>
        <Menu />
      </Suspense>
    </div>
  );
}

export default App;
