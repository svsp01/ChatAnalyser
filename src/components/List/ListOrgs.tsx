import { getAllOrg } from "@/services/orgservice/orgservice";
import { useEffect, useState } from "react";

function ListOrgs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getAllOrg();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromApi();
  }, []);
  return (
<div className="flex flex-wrap">
      {data.map((org: any) => (
        <div key={org.org_id} className="org-bubble m-4 p-2 rounded-full shadow-md overflow-hidden w-24 h-24">
          {org.image_url ? (
            <img src={org.image_url} alt={org.org_id} className="org-image object-cover rounded-full w-full h-full" />
          ) : (
            <div className="org-gradient bg-gradient-to-r from-red-500 to-yellow-500 text-white flex items-center justify-center rounded-full w-full h-full">
              <p className="truncate">{org.org_id}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListOrgs;
