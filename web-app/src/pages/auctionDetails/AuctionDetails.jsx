import { useSearchParams } from "react-router-dom";
import LoggedInTemplate from "../../templates/loggedInTemplate/LoggedInTemplate";
import AuctionDetailsCard from "../../components/auctionDetails/AuctionDetailsCard";

export default function AuctionDetails() {
  const [searchParams] = useSearchParams();

  return (
    <LoggedInTemplate>
      <AuctionDetailsCard id={searchParams.get('id')} />
    </LoggedInTemplate>
  );
}
