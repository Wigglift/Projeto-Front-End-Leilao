import ProfileCard from "../../components/profileCard/ProfileCard";
import LoggedInTemplate from "../../templates/loggedInTemplate/LoggedInTemplate";

export default function Profile() {
  return (
    <LoggedInTemplate>
      <ProfileCard />
    </LoggedInTemplate>
  );
}
