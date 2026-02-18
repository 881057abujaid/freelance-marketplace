import { useAuth } from "../../hooks/useAuth";
import ClientDashboard from "./ClientDashboard";
import FreelancerDashboard from "./FreelancerDashboard";

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) return <p>Login first</p>

    return user.role === "freelancer"
        ? <FreelancerDashboard /> : <ClientDashboard />
}
export default Dashboard;