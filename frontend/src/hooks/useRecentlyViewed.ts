"use client"

import { useState } from "react";

export const useRecentlyViewed = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);  // Only need to open when clicking the badge
    const close = () => setIsOpen(false); // Close when clicking the close icon

    return { 
        isOpen, 
        open, 
        close 
    };
};