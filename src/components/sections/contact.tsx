"use client";
import React from "react";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { Mail, MapPin, Send } from "lucide-react";
import { useSound } from "@/hooks/use-sound";

const ContactSection = () => {
  const playSound = useSound("/assets/keycap-sounds/press.mp3");

  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto py-20">
      <SectionHeader
        id='contact'
        className="relative mb-14"
        title={
          <>
            LET&apos;S WORK <br />
            TOGETHER
          </>}
        desc="Ready to start your next project?"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mx-4">

        {/* Visual / Info Side */}
        <div className="flex flex-col gap-8 mt-10">
          <div className="relative group" onMouseEnter={() => playSound()}>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-8 bg-zinc-900 ring-1 ring-gray-900/5 rounded-2xl leading-none flex items-top justify-start space-x-6">
              <Mail className="w-8 h-8 text-blue-400" />
              <div className="space-y-2">
                <p className="text-slate-300">Email me directly</p>
                <a href={`mailto:${config.email}`} className="block text-xl font-bold text-white hover:text-blue-400 transition-colors">
                  {config.email}
                </a>
              </div>
            </div>
          </div>

          <div className="relative group" onMouseEnter={() => playSound()}>
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-8 bg-zinc-900 ring-1 ring-gray-900/5 rounded-2xl leading-none flex items-top justify-start space-x-6">
              <MapPin className="w-8 h-8 text-pink-400" />
              <div className="space-y-2">
                <p className="text-slate-300">Based in</p>
                <p className="text-xl font-bold text-white">
                  Mumbai, India
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">Open for Opportunities</h3>
            <p className="text-zinc-400 leading-relaxed">
              I&apos;m currently available for freelance work and full-time positions.
              Calculated decisions, clean code, and user-centric design are what I bring to the table.
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="relative">
          {/* Decor */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-zinc-500 text-sm">I usually respond within 24 hours.</p>
            </div>
            <ContactForm />
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
