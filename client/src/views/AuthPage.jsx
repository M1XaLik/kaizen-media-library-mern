import React from "react";
import { Link } from "react-router-dom";

const AuthPageCard = () => {
    return (
        <div className="auth-page-card">
            <div className="above-auth-text">KAIZEN 改善</div>
            <hr />
            <div className="login-form">
                <p>
                    Ласкаво просимо до нашої онлайн-бібліотеки аудіозаписів - вашого безкоштовного
                    ресурсу для прослуховування музики, аудіокниг, подкастів та інших
                    аудіоматеріалів.
                </p>
                <div className="login-form-button-container">
                    <button>
                        <Link to="/register">Реєстрація</Link>
                    </button>
                    <button>
                        <Link to="/login">Логін</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPageCard;
