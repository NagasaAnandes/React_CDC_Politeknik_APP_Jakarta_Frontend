import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const RouteLogger: React.FC = () => {
  const loc = useLocation();
  useEffect(() => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[router] navigation", loc.pathname + loc.search);
    }
  }, [loc]);
  return null;
};

export default RouteLogger;
