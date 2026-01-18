"use client";

import { Expand, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const Excalidraw = dynamic(
    async () => {
        const component = await import("@excalidraw/excalidraw");
        return component.Excalidraw;
    },
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-xl">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-6 h-6 text-neutral-500 animate-spin" />
                    <div className="text-neutral-500 font-medium text-xs uppercase tracking-[0.15em]">
                        Initializing Studio...
                    </div>
                </div>
            </div>
        ),
    }
);

// Library files to load
const LIBRARY_FILES = [
    '/excalidraw-libraries/architecture-diagram-components.excalidrawlib',
    '/excalidraw-libraries/awesome-icons.excalidrawlib',
    '/excalidraw-libraries/basic-ux-wireframing-elements.excalidrawlib',
    '/excalidraw-libraries/dev_ops.excalidrawlib',
    '/excalidraw-libraries/drwnio.excalidrawlib',
    '/excalidraw-libraries/icons.excalidrawlib',
    '/excalidraw-libraries/software-architecture.excalidrawlib',
    '/excalidraw-libraries/system-design-template.excalidrawlib',
    '/excalidraw-libraries/system-design.excalidrawlib',
];

interface ArchitectureEditorProps {
    data?: string;
    onChange: (data: string, image: string) => void;
}

export default function ArchitectureEditor({ data, onChange }: ArchitectureEditorProps) {
    const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [libraryItems, setLibraryItems] = useState<any[]>([]);
    const [libraryLoading, setLibraryLoading] = useState(true);
    const [libraryCount, setLibraryCount] = useState(0);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    // Load all library files on mount
    useEffect(() => {
        const loadLibraries = async () => {
            setLibraryLoading(true);
            const allItems: any[] = [];

            for (const file of LIBRARY_FILES) {
                try {
                    const res = await fetch(file);
                    if (!res.ok) continue;

                    const lib = await res.json();

                    // Handle both formats: { library: [...] } and { libraryItems: [...] }
                    const items = lib.library || lib.libraryItems || [];

                    // Convert to proper format if needed
                    items.forEach((item: any) => {
                        if (Array.isArray(item)) {
                            // Old format: array of elements
                            allItems.push({
                                id: crypto.randomUUID(),
                                status: "published",
                                elements: item,
                                created: Date.now(),
                            });
                        } else if (item.elements) {
                            // New format: already has elements property
                            allItems.push({
                                id: item.id || crypto.randomUUID(),
                                status: item.status || "published",
                                elements: item.elements,
                                created: item.created || Date.now(),
                            });
                        }
                    });
                } catch (err) {
                    console.warn(`Failed to load library: ${file}`, err);
                }
            }

            setLibraryItems(allItems);
            setLibraryCount(allItems.length);
            setLibraryLoading(false);
        };

        loadLibraries();
    }, []);

    // Update library when API is ready
    useEffect(() => {
        if (excalidrawAPI && libraryItems.length > 0) {
            excalidrawAPI.updateLibrary({
                libraryItems,
                merge: true,
                openLibraryMenu: false,
            });
        }
    }, [excalidrawAPI, libraryItems]);

    const initialData = useMemo(() => {
        if (!data) return { elements: [], appState: { theme: 'dark' as const } };
        try {
            return {
                elements: JSON.parse(data),
                appState: { theme: 'dark' as const }
            };
        } catch (e) {
            return { elements: [], appState: { theme: 'dark' as const } };
        }
    }, [data]);

    const handleExcalidrawChange = useCallback((elements: any, appState: any, files: any) => {
        if (!excalidrawAPI) return;

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(async () => {
            const json = JSON.stringify(elements);
            try {
                const { exportToCanvas } = await import("@excalidraw/excalidraw");
                const canvas = await exportToCanvas({
                    elements,
                    appState: {
                        ...appState,
                        exportWithDarkMode: true,
                        viewBackgroundColor: "#0a0a0a"
                    },
                    files,
                    getDimensions: (width: number, height: number) => ({ width: width * 1.5, height: height * 1.5 })
                });

                const imageData = canvas.toDataURL("image/png");
                onChange(json, imageData);
            } catch (err) {
                console.error("Export failure:", err);
                onChange(json, "");
            }
        }, 1000);
    }, [excalidrawAPI, onChange]);

    // Reference to the container for fullscreen
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Toggle native browser fullscreen (like YouTube)
    const toggleFullscreen = useCallback(async () => {
        if (!containerRef.current) return;

        try {
            if (!document.fullscreenElement) {
                // Enter fullscreen
                await containerRef.current.requestFullscreen();
            } else {
                // Exit fullscreen
                await document.exitFullscreen();
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    }, []);

    // Listen for fullscreen changes (including ESC key)
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const containerClasses = isFullscreen
        ? "w-full h-full bg-neutral-950"
        : "w-full h-full rounded-xl overflow-hidden border border-white/5 bg-neutral-950 relative";

    return (
        <div ref={containerRef} className={containerClasses}>

            {/* Custom toolbar - bottom left to avoid Excalidraw's UI */}
            <div className="absolute bottom-4 left-4 z-[100] flex items-center gap-2">

                {/* Fullscreen toggle - only show when NOT in fullscreen */}
                {!isFullscreen && (
                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center gap-2 px-3 py-2 bg-neutral-900/95 backdrop-blur-sm rounded-lg border border-white/10 
                                   hover:bg-neutral-800 hover:border-white/20 transition-all duration-200
                                   text-neutral-400 hover:text-white shadow-lg group"
                        title="Open in fullscreen"
                    >
                        <Expand className="w-4 h-4" />
                        <span className="text-xs font-medium">Fullscreen</span>
                    </button>
                )}
            </div>

            {/* Fullscreen footer - at bottom center */}
            {isFullscreen && (
                <div className="absolute bottom-0 left-0 right-0 h-12 z-[99] pointer-events-none flex items-center justify-center">
                    <span className="text-lg font-bold text-neutral-500 uppercase tracking-[0.2em]">
                        Architecture Studio • Press ESC to exit
                    </span>
                </div>
            )}

            <Excalidraw
                theme="dark"
                excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
                initialData={initialData}
                onChange={handleExcalidrawChange}
                UIOptions={{
                    canvasActions: {
                        loadScene: false,
                        saveToActiveFile: false,
                        export: false,
                        saveAsImage: false,
                        toggleTheme: false,
                    },
                }}
            />
        </div>
    );
}
