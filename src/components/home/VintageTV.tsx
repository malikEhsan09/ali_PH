"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TVPhase = "boot" | "static" | "tuning" | "playing";

const PAINT_COLORS = [
  "var(--accent-brand)",
  "var(--success)",
  "var(--warning)",
  "var(--error)",
  "var(--accent-light)",
  "var(--accent-dark)",
];

function PaintWallFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#e8e0d0] dark:bg-[#1a1815]">
      <div className="absolute inset-0 flex">
        {PAINT_COLORS.map((color, i) => (
          <motion.div
            key={color}
            className="flex-1 origin-bottom"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1.4,
              delay: i * 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <motion.div
        className="absolute inset-y-0 left-1/3 w-16 bg-black/20 dark:bg-black/40"
        animate={{ x: ["-30%", "130%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
      />
    </div>
  );
}

export default function VintageTV() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameRef = useRef<number>(0);
  const [phase, setPhase] = useState<TVPhase>("boot");
  const [volumeLevel, setVolumeLevel] = useState(65);
  const [tuneLevel, setTuneLevel] = useState(42);
  const [videoOk, setVideoOk] = useState(true);

  const startPlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !videoOk) {
      setPhase("playing");
      return;
    }

    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    try {
      await video.play();
      setPhase("playing");
    } catch {
      setVideoOk(false);
      setPhase("playing");
    }
  }, [videoOk]);

  const drawStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);

    ctx.fillStyle = "rgba(0,0,0,0.12)";
    for (let y = 0; y < height; y += 3) {
      ctx.fillRect(0, y, width, 1);
    }

    if (Math.random() > 0.7) {
      ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.15})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      const sx = Math.random() * width;
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx + (Math.random() - 0.5) * 40, height);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onError = () => setVideoOk(false);
    const onCanPlay = () => {
      video.loop = true;
    };
    const onEnded = () => {
      video.currentTime = 0;
      void video.play();
    };

    video.addEventListener("error", onError);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("ended", onEnded);
    video.load();

    return () => {
      video.removeEventListener("error", onError);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const bootTimer = setTimeout(() => setPhase("static"), 400);
    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    if (phase !== "static" && phase !== "tuning") return;

    const loop = () => {
      drawStatic();
      animFrameRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase, drawStatic]);

  useEffect(() => {
    if (phase !== "static") return;
    const tuneTimer = setTimeout(() => setPhase("tuning"), 1800);
    return () => clearTimeout(tuneTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "tuning") return;
    const playTimer = setTimeout(() => void startPlayback(), 1200);
    return () => clearTimeout(playTimer);
  }, [phase, startPlayback]);

  const showStatic = phase === "static" || phase === "tuning";
  const isTuning = phase === "tuning";
  const showContent = phase === "playing";

  return (
    <div className="relative w-full max-w-md mx-auto select-none pt-14">
      {/* Antenna — taller rabbit ears */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ rotate: isTuning ? [-2, 2, -1, 1, 0] : [0, 1.5, -1, 0] }}
          transition={{
            duration: isTuning ? 0.3 : 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative h-[4.5rem]"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-bg-tertiary border-2 border-border dark:bg-[#333] dark:border-[#555]" />
          <div
            className="absolute bottom-2 left-1/2 origin-bottom"
            style={{ transform: "translateX(-50%) rotate(-34deg)" }}
          >
            <div className="w-0.5 h-[4.25rem] bg-linear-to-t from-text-muted to-text-secondary dark:from-[#555] dark:to-[#aaa]" />
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-text-muted border border-text-secondary dark:bg-[#777] dark:border-[#999]" />
          </div>
          <div
            className="absolute bottom-2 left-1/2 origin-bottom"
            style={{ transform: "translateX(-50%) rotate(34deg)" }}
          >
            <div className="w-0.5 h-[4.25rem] bg-linear-to-t from-text-muted to-text-secondary dark:from-[#555] dark:to-[#aaa]" />
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-text-muted border border-text-secondary dark:bg-[#777] dark:border-[#999]" />
          </div>
        </motion.div>
      </div>

      {/* TV on table */}
      <div className="relative mt-3">
        {/* TV body */}
        <div className="relative z-10 mx-4 p-5 pt-6 shadow-brutal-sm border-[3px] border-border bg-linear-to-br from-bg-card via-bg-secondary to-bg-tertiary dark:from-[#2a2520] dark:via-[#1a1815] dark:to-[#2d2820] dark:border-[#3d3830]">
          {/* Brand label */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
            <span className="text-[9px] tracking-[0.25em] uppercase text-text-muted font-mono">
              Ali Paint Co.
            </span>
          </div>

          {/* Screen bezel */}
          <div className="relative aspect-4/3 overflow-hidden bg-[#0a0a0a] border-4 border-text-primary/20 dark:border-[#1a1a1a] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
            {/* Video — auto-plays in loop after static */}
            <video
              ref={videoRef}
              src="/videos/paint-wall.mp4"
              muted
              loop
              autoPlay={false}
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                showContent && videoOk ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Fallback paint animation when video unavailable */}
            {showContent && !videoOk && <PaintWallFallback />}

            {/* Static canvas */}
            <AnimatePresence>
              {showStatic && (
                <motion.canvas
                  ref={canvasRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isTuning ? [1, 0.4, 1, 0.6, 1] : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: isTuning ? 1.2 : 0.5 }}
                  width={640}
                  height={480}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </AnimatePresence>

            {/* Screen glare */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-white/10 via-transparent to-white/5 dark:from-white/8 dark:to-white/3" />

            {/* CRT vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]" />

            {/* Scan lines when playing */}
            {showContent && (
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                }}
              />
            )}

            {/* Channel indicator */}
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 text-[8px] font-mono text-success tracking-wider">
              CH {isTuning ? "—" : "03"}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4 px-1">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] uppercase tracking-widest text-text-muted font-mono">Vol</span>
              <motion.button
                type="button"
                aria-label="Volume"
                animate={{ rotate: showContent ? volumeLevel * 2.7 : 0 }}
                className="relative w-8 h-8 rounded-full cursor-default bg-radial-[circle_at_35%_35%] from-bg-tertiary to-bg-secondary border-2 border-border shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.2)] dark:from-[#4a4540] dark:to-[#2a2520] dark:border-[#5a5550]"
                onClick={() => setVolumeLevel((v) => (v >= 100 ? 20 : v + 20))}
              >
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-text-secondary rounded-full" />
              </motion.button>
            </div>

            {/* Speaker grille */}
            <div className="flex-1 mx-4 flex flex-col gap-[3px]">
              {Array.from({ length: 5 }).map((_, row) => (
                <div key={row} className="flex gap-[3px] justify-center">
                  {Array.from({ length: 12 }).map((_, col) => (
                    <div
                      key={col}
                      className="w-1 h-1 rounded-full bg-text-muted/40 dark:bg-[#3a3530]"
                      style={{ opacity: 0.35 + (row + col) * 0.03 }}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] uppercase tracking-widest text-text-muted font-mono">Tune</span>
              <motion.button
                type="button"
                aria-label="Tune"
                animate={{
                  rotate: isTuning
                    ? [tuneLevel * 2.7, tuneLevel * 2.7 + 90, tuneLevel * 2.7 + 180, tuneLevel * 2.7 + 270]
                    : phase === "static"
                      ? 0
                      : tuneLevel * 2.7,
                }}
                transition={{ duration: isTuning ? 1.2 : 0.5, ease: "easeInOut" }}
                className="relative w-8 h-8 rounded-full cursor-default bg-radial-[circle_at_35%_35%] from-bg-tertiary to-bg-secondary border-2 border-border shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.2)] dark:from-[#4a4540] dark:to-[#2a2520] dark:border-[#5a5550]"
                onClick={() => setTuneLevel((t) => (t >= 100 ? 10 : t + 15))}
              >
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-accent-brand rounded-full" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Wooden table */}
        <div className="relative mx-1 -mt-1">
          {/* Tabletop — TV sits on this */}
          <div className="relative h-4 border-x border-t border-border bg-linear-to-b from-accent-light/70 via-accent-brand/50 to-accent-dark/80 dark:from-[#5a4a30] dark:via-[#3d3225] dark:to-[#2a2018] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <div className="absolute inset-x-3 top-1 h-px bg-white/20 dark:bg-white/10" />
            <div className="absolute inset-x-6 top-2.5 h-px bg-black/10 dark:bg-black/25" />
          </div>

          {/* Apron / drawer front */}
          <div className="mx-3 h-5 border-x border-b border-border bg-linear-to-b from-accent-dark/60 to-accent-brand/40 dark:from-[#2a2018] dark:to-[#1a1510] flex items-center justify-center gap-2">
            <div className="w-8 h-1 bg-accent-light/50 dark:bg-[#5a4a30] rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full bg-text-muted/40" />
          </div>

          {/* Table legs */}
          <div className="flex justify-between px-6 pb-1">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="w-4 h-14 border border-border bg-linear-to-b from-accent-brand/80 via-accent-dark/90 to-accent-dark dark:from-[#4a3a28] dark:via-[#2a2018] dark:to-[#1a1510] shadow-[2px_2px_0_rgba(0,0,0,0.12)]"
              />
            ))}
          </div>

          {/* Floor shadow */}
          <div className="mx-8 h-2 bg-black/10 dark:bg-black/30 blur-md rounded-full" />
        </div>
      </div>

      {/* Theme-aware glow */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-2xl opacity-30 dark:opacity-40 pointer-events-none bg-accent-brand" />
    </div>
  );
}
