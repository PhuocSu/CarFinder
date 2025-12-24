"use client";

import { useRecoilState } from "recoil";
import { compareOpenState } from "../store/compareStore";
import { useEffect } from "react";

export const useCompare = () => {
    const [isOpen, setIsOpen] = useRecoilState(compareOpenState);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    // Lock scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return { 
        isOpen, 
        open, 
        close 
    };
};