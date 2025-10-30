import { WalletCards, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCard";
import { useUser } from "../hooks/useUser";
import { addThousandsSeparator } from '../utils/utils';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";

const Home = () => {
    useUser();

    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
            if (response.status === 200) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error(error.response?.data?.message||"Error fetching dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect (() => {
        fetchDashboardData();
        return () => {};
    }, [])

    return (
        <div>
            <Dashboard activeMenu="Dashboard">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Display the cards here */}
                        <InfoCard
                        icon = {<WalletCards />}
                        label = "Total Balance"
                        value = {addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color = "bg-purple-800"
                        />
                        <InfoCard
                        icon={<ArrowDownCircle />}
                        label = "Total Income"
                        value = {addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color = "bg-green-800"
                        />
                        <InfoCard
                        icon={<ArrowUpCircle />}
                        label = "Total Expense"
                        value = {addThousandsSeparator(dashboardData?.totalExpenses || 0)}
                        color = "bg-red-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Recent transactions*/}
                        <RecentTransactions
                        transactions={dashboardData?.recentTransactions}
                        onMore={() => navigate("/expense")}
                        />
                        {/* Finance overview chart*/}
                        <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpenses || 0}
                        />
                        {/* Expense transactions*/}

                        {/* Income transactions*/}
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}

export default Home;