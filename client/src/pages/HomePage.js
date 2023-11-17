import { useLocation } from "react-router-dom";

const HomePage = () => {
    const location = useLocation();

    return (
        <main>
            <p>This is the home page.</p>
            <p>Email: {location.state?.email} </p>
        </main>
    );
};

export default HomePage;
