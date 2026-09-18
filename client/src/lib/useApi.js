import { useEffect, useState } from "react";

export function useApi(load, dependencies = []) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });

  useEffect(() => {
    let active = true;
    load()
      .then((data) => active && setState({ data, loading: false, error: "" }))
      .catch((error) => active && setState({ data: null, loading: false, error: error.message }));
    return () => {
      active = false;
    };
  // The caller controls reloads through the supplied dependency list.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}
