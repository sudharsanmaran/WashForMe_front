import { useEffect, useState } from "react";
import { api } from "../../api/axios";


function WashCategories() {
  const CATEGORIES_URL = '/core/api/categories'
  const [categories, setCategories] = useState([{}]);


  const getCategories = async () => {
    try {
      const response = await api.get(
        CATEGORIES_URL,
      )
      console.log(response, 'inside getCategories');
      setCategories(response.data)
    }
    catch (e) {
        console.log(e.message)
    }
  }

  useEffect(() => {
    getCategories()
  }, []);

  return <div>WashCategories</div>;
}

export default WashCategories;
