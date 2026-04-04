"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { motion } from "framer-motion";
import { UserCircle2 } from "lucide-react";

export function ResumeButton() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="fixed bottom-8 right-8 z-50 text-noir-bg"
        >
            <a
                href={PORTFOLIO_DATA.profile.resume}
                target="_blank"
                className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all group"
            >
                <UserCircle2 size={14} className="group-hover:translate-y-0.5 transition-transform" />
                Hire Me
            </a>
        </motion.div>
    );
}
