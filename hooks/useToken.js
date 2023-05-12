import { useEffect, useState } from "react";

function useToken() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  return token;
}

export default useToken;
