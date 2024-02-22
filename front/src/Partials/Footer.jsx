import React from 'react';

export function Footer() {
    return (
        <footer className="div-footer text-white text-center py-3 mt-2" style={{ marginTop: 'auto', marginleft: '0' }}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} DIF COATZACOALCOS</p>
            </div>
        </footer>
    );
}