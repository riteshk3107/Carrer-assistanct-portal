"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10 overflow-hidden">
      <div className="space-y-6 text-center relative z-10">
        
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          className="space-y-6 mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex justify-center space-x-4 pt-4 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Subtle glow behind buttons */}
          <div className="absolute inset-0 bg-primary/20 blur-2xl animate-glow pointer-events-none rounded-full" />
          
          <Link href="/dashboard">
            <Button size="lg" className="px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
              Get Started
            </Button>
          </Link>
          <Link href="https://youtu.be/apyIBhWY_HI?si=0kC9AvMsYQD3HI29">
            <Button size="lg" variant="outline" className="px-8 border-white/10 hover:bg-white/5 backdrop-blur-md">
              Watch Demo
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          className="hero-image-wrapper mt-10 md:mt-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <div ref={imageRef} className="hero-image relative">
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background via-background/20 to-transparent z-10 pointer-events-none h-1/2" />
            <Image
              src="/bannerc1.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg border border-white/10 mx-auto"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
