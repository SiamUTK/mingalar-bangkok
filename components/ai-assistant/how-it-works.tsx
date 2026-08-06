"use client";

import { Container, Card } from "@/components/ui";
import { CheckCircle } from "lucide-react";

export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface HowItWorksProps {
  steps?: Step[];
}

export function HowItWorks({
  steps = [
    {
      id: "1",
      number: 1,
      title: "Ask Your Question",
      description: "Type any question or prompt you want help with. Be as specific as you need." },
    {
      id: "2",
      number: 2,
      title: "AI Processes Your Request",
      description: "Our advanced AI analyzes your input and prepares a comprehensive response." },
    {
      id: "3",
      number: 3,
      title: "Get Instant Results",
      description: "Receive detailed, accurate answers tailored to your needs in seconds." },
  ] }: HowItWorksProps) {
  return (
    <section className="py-16 bg-muted/20">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">Simple, intuitive, and powerful</p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={step.id} className="relative">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-linear-to-r from-primary/50 to-transparent translate-x-1/2" />
                )}

                {/* Card */}
                <Card className="p-6 text-center relative z-10">
                  {/* Number circle */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-4">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>

          {/* Bottom benefits */}
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-8 space-y-6">
            <h3 className="text-xl font-semibold text-center">Why Choose Our AI?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-sm">Built for Myanmar Community</p>
                  <p className="text-xs text-muted-foreground">
                    Understands local context and needs
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-sm">Always Learning</p>
                  <p className="text-xs text-muted-foreground">
                    Continuously improving from interactions
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-sm">Expert Knowledge</p>
                  <p className="text-xs text-muted-foreground">
                    Trained on specialized information
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-sm">24/7 Support</p>
                  <p className="text-xs text-muted-foreground">Available whenever you need help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
