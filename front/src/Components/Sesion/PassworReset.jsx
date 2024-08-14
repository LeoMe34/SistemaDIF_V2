import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { uidb64, token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/reset_password/${uidb64}/${token}/`, { new_password: newPassword, confirm_password: confirmPassword });
            setMessage(response.data.success);
            setError('');
            navigate('/');  // Redirige al login tras el éxito
        } catch (error) {
            setError(error.response.data.error);
            setMessage('');
        }
    };

    return (
        <section className="vh-100" style={{ background: '#812A71' }}>
            <div className="container py-4 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <h2>Restablecer Contraseña</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <label>Nueva contraseña:</label>
                                                <input
                                                    className="form-control form-control-lg entrada"
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label>Confirmar contraseña:</label>
                                                <input
                                                    className="form-control form-control-lg entrada"
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <button class="btn btn-secondary btn-guardar btn-lg btn-block" type="submit">Restablecer contraseña</button>
                                        </form>
                                        {message && <label style={{ backgroundColor: '#812A71', color: '#ffffff', width: '400px', borderRadius: '10px' }}>{message}</label>}
                                        {error && <label style={{ color: '#ffffff', backgroundColor: 'red', width: '400px', borderRadius: '10px' }}> {error}</label>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
};

export default ResetPassword;


