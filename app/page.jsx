import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden"> 
      <div className="grid-background"></div>
      
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16 animate-fade-in-up">
            Powerful Features For Your Career Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              return (
                <div 
                  key={index}
                  className="glass-card rounded-xl p-6 group cursor-default animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-6 p-4 rounded-full bg-white/5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_transparent] group-hover:shadow-primary/30">
                      {React.cloneElement(feature.icon, { className: "w-8 h-8 text-primary group-hover:text-white transition-colors" })}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 bg-white/5 backdrop-blur-sm border-y border-white/10 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[
              { value: "50+", label: "Industries Covered" },
              { value: "1000+", label: "Interview Questions" },
              { value: "95%", label: "Success Rate" },
              { value: "24/7", label: "AI Support" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center space-y-3 p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <h3 className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground font-medium tracking-wide uppercase text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Four simple steps to accelerate your career growth and land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent -z-10" />
            
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-6 relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-24 h-24 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:shadow-primary/20 group-hover:-translate-y-2 transition-all duration-300 relative z-10">
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {React.cloneElement(item.icon, { className: "w-10 h-10 text-primary relative z-20" })}
                </div>
                <div>
                  <h3 className="font-bold text-2xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 md:py-32 bg-black/40 backdrop-blur-lg border-y border-white/5 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <div 
                key={index} 
                className="glass-card rounded-2xl p-8 relative animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Decorative quote mark */}
                <div className="absolute top-6 right-8 text-primary/20 text-6xl font-serif">"</div>
                
                <div className="flex flex-col space-y-6 h-full justify-between">
                  <p className="text-muted-foreground/90 leading-relaxed text-lg relative z-10">
                    {testimonial.quote}
                  </p>
                  
                  <div className="flex items-center space-x-4 pt-6 border-t border-white/10">
                    <div className="relative h-14 w-14 flex-shrink-0">
                      <Image
                        width={56}
                        height={56}
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="rounded-full object-cover border-2 border-primary/40 p-0.5"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-white">{testimonial.author}</p>
                      <p className="text-sm text-primary font-medium">
                        {testimonial.role} <span className="text-muted-foreground">@ {testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about Sensai and how it can help your career.
            </p>
          </div>

          <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6 md:p-10 animate-fade-in-up">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => {
                return (
                  <AccordionItem key={index} value={`item-${index}`} className="border-white/10 px-2">
                    <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 pb-32 relative z-10 px-4">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative shadow-[0_0_100px_rgba(139,92,246,0.3)] animate-fade-in-up">
          {/* Dynamic background for CTA */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-purple-600/80 to-secondary/80 backdrop-blur-xl z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10" />
          
          <div className="relative z-20 flex flex-col items-center justify-center space-y-8 text-center p-12 md:p-24">
            <h2 className="text-4xl font-extrabold tracking-tighter text-white sm:text-5xl md:text-6xl max-w-3xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/90 md:text-xl font-medium">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-10 text-lg font-bold rounded-full mt-4 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Start Your Journey Today <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
