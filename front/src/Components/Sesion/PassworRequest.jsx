import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetRequest = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/password_reset_request/', { email });
            setMessage(response.data.success);
            setError('');
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
                                        <h2>Recuperar Contraseña</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <label style={{ width: '500px' }}>Ingrese el correo electronico que se dio de alta en el sistema y donde se le enviara un link para cambiar la contraseña</label>
                                                <input className="form-control form-control-lg entrada"
                                                    placeholder='Ingrese su correo electronico'
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className='col'>
                                                <button className="btn btn-guardar btn-lg btn-block" type="submit">Enviar correo de restablecimiento</button>

                                            </div>
                                        </form>
                                        <div className='col'>
                                            <a class="btn btn-secondary btn-guardar btn-lg btn-block" href="/">Cancelar</a>
                                        </div>
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

export default PasswordResetRequest;
