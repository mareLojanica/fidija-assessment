import { FC, Suspense } from "react";
import SuspenseLoader from "..";

export const Loader =
  <P extends object>(Component: FC<P>) =>
  (props: P) =>
    (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );
