import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(-1, { replace: true });
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div>Page Not Found</div>
  )
}

export default PageNotFound