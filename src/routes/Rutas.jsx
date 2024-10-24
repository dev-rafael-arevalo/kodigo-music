import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from '../components/Home'
import SubscriptionForm from '../components/SubscriptionForm'
/**
 * 
 * 2 rutas
 * 1 ruta para el home
 * 1 para el subscriptionForm
 */
export default function Rutas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/home' element={<Home />}/>
                    <Route path='/subs' element={<SubscriptionForm />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}