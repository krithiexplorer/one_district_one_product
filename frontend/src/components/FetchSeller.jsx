import { useRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";
import { FetchSellerDetails } from "../store/selectors/FetchSellerDetails"; // Adjust the path accordingly

const FetchSeller = () => {
  const [sellerDetails, setSellerDetails] = useRecoilState(FetchSellerDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/sellers/details", {
          headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
          }
        });
        setSellerDetails(response.data.details);
      } catch (error) {
        console.error("Error fetching seller details:", error);
      }
    };

    fetchData();

    // Optionally, you can include cleanup logic here if needed

  }, [setSellerDetails]);

  // Your component logic

  return (
    <div>
      {/* Your component content here */}
    </div>
  );
};

export default FetchSeller;
