import { TablaEnfermeria } from "../FormatoEnfermeria/TablaEnfermeria"
import { useEffect, useState } from "react";

export function HomeEnfermeria() {

    return (
        <div>
            <div className="mt-3 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb ml-10">
                        <i className="bi bi-house-fill color-icono"></i>&nbsp;
                        <a href="/home_enfermeria">
                            <li className="breadcrumb-item active pag-actual" aria-current="page">Home</li>
                        </a>
                    </ol>
                </nav>
            </div>

            <TablaEnfermeria></TablaEnfermeria>

        </div>
    )
}