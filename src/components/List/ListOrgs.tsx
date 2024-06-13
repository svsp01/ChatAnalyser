import { getAllOrg } from "@/services/orgservice/orgservice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate()

  const handleOrgClick = (item: any) =>{
navigate(`getOrgById/${item._id}`)
  }
  return (
<div className="flex flex-wrap">
      {data.map((org: any) => (
        <div key={org.org_id} onClick={()=>handleOrgClick(org)} className="cursor-pointer hover:scale-105 m-4  rounded-full  shadow-md shadow-textColor overflow-hidden w-24 h-24">
          {org.image_url ? (
            <img src={org.image_url} alt={org.org_id} className="org-image object-cover rounded-full w-full h-full" />
          ) : (
            <div className="org-gradient bg-darkBackground font-robotoMono  text-textColor flex items-center justify-center rounded-full w-full h-full">
              <p className="truncate">{org.org_id}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListOrgs;
