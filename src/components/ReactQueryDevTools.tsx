// import React, { Suspense, useEffect, useState } from "react";

// const ReactQueryDevtoolsProduction = React.lazy(() =>
//   import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
//     (d) => ({
//       default: d.ReactQueryDevtools,
//     })
//   )
// );

// const ReactQueryDevtools = () => {
//   const [showDevtools, setShowDevtools] = useState(false);

//   useEffect(() => {
//     window.toggleDevtools = () =>
//       setShowDevtools((previousState) => !previousState);
//   }, []);

//   return (
//     showDevtools && (
//       <Suspense fallback={null}>
//         <ReactQueryDevtoolsProduction />
//       </Suspense>
//     )
//   );
// };

// export default ReactQueryDevtools;
