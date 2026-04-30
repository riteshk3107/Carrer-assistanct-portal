import React from 'react';

export default function AuthLayout({ children }) {
    return (
        <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-background">
            {/* Background ambient light */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* Glass container */}
            <div className="relative z-10 p-1 md:p-2 rounded-2xl glass-card shadow-[0_0_50px_rgba(139,92,246,0.15)] animate-fade-in-up">
                {children}
            </div>
        </div>
    );
}
