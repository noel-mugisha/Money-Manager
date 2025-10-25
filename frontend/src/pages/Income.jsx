import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Income = () => {
    useUser();
    return (
        <Dashboard activeMenu="Income">
            Income Page
        </Dashboard>
    )
}

export default Income;