"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Terminal from "./ui/terminal";
import AiChat from "./ui/ai-chat";
import LiveActivity from "./ui/live-activity";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill, SkillNames, SKILLS } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Section, getKeyboardState } from "./animated-background-config";
import { useSounds } from "./realtime/hooks/use-sounds";
import { useAchievements } from "@/contexts/achievement-context";

gsap.registerPlugin(ScrollTrigger);

const AnimatedBackground = () => {
  const { isLoading, bypassLoading } = usePreloader();
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const selectedSkillRef = useRef<Skill | null>(null);

  const { playPressSound, playReleaseSound } = useSounds();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [nearProjectsHint, setNearProjectsHint] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState(false);

  const [ambientOn, setAmbientOn] = useState(false);
  const [ambientVolume, setAmbientVolume] = useState(0.03);
  const [ambientMuted, setAmbientMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const oscRefs = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);

  // Animation controllers refs
  const bongoAnimationRef = useRef<{ start: () => void; stop: () => void }>();
  const keycapAnimationsRef = useRef<{ start: () => void; stop: () => void }>();

  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  const router = useRouter();
  const { unlockAchievement } = useAchievements();

  // Unlock Explorer on section change
  useEffect(() => {
    if (activeSection === "projects" || activeSection === "contact") {
      unlockAchievement("explorer");
    }
  }, [activeSection]);

  // --- Event Handlers ---

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp || selectedSkillRef.current?.name === e.target.name) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      if (selectedSkillRef.current) playReleaseSound();
      setSelectedSkill(null);
      selectedSkillRef.current = null;
      if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
    } else {
      if (!selectedSkillRef.current || selectedSkillRef.current.name !== e.target.name) {
        const skill = SKILLS[e.target.name as SkillNames];
        if (skill) {
          if (selectedSkillRef.current) playReleaseSound();
          playPressSound();
          setSelectedSkill(skill);
          selectedSkillRef.current = skill;
        }
      }
    }
  };

  const handleSplineInteractions = () => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    splineApp.addEventListener("keyUp", () => {
      if (!splineApp || isInputFocused()) return;
      playReleaseSound();
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    });
    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp || isInputFocused()) return;
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) {
        playPressSound();
        setSelectedSkill(skill);
        selectedSkillRef.current = skill;
        splineApp.setVariable("heading", skill.label);
        splineApp.setVariable("desc", skill.shortDescription);
      }
    });
    splineApp.addEventListener("mouseDown", (e) => {
      if (!splineApp || isInputFocused()) return;
      const targetName = e.target.name;
      console.log("Clicked 3D Object:", targetName);

      const skill = SKILLS[targetName as SkillNames];
      if (skill && skill.url) {
        window.open(skill.url, "_blank");
        return;
      }

      // Interactive Laptop/Screen -> Scroll to Projects
      if (targetName.toLowerCase().includes("laptop") || targetName.toLowerCase().includes("screen")) {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Interactive Terminal -> Open CLI
      if (targetName.toLowerCase().includes("terminal") || targetName.toLowerCase().includes("console")) {
        setIsTerminalOpen(true);
        return;
      }
    });
    splineApp.addEventListener("mouseHover", handleMouseHover);
  };

  // --- Animation Setup Helpers ---

  const createSectionTimeline = (
    triggerId: string,
    targetSection: Section,
    prevSection: Section,
    start: string = "top 50%",
    end: string = "bottom bottom"
  ) => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end,
        scrub: true,
        onEnter: () => {
          setActiveSection(targetSection);
          const state = getKeyboardState({ section: targetSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection(prevSection);
          const state = getKeyboardState({ section: prevSection, isMobile, });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
      },
    });
  };

  const setupScrollAnimations = () => {
    if (!splineApp || !splineContainer.current) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    // Initial state
    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);

    // Section transitions
    createSectionTimeline("#skills", "skills", "hero");
    createSectionTimeline("#projects", "projects", "skills", "top 70%");
    createSectionTimeline("#contact", "contact", "projects", "top 30%");
  };

  const getBongoAnimation = () => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");

    if (!frame1 || !frame2 || !framesParent) {
      return { start: () => { }, stop: () => { } };
    }

    let interval: NodeJS.Timeout;
    const start = () => {
      let i = 0;
      framesParent.visible = true;
      interval = setInterval(() => {
        if (i % 2) {
          frame1.visible = false;
          frame2.visible = true;
        } else {
          frame1.visible = true;
          frame2.visible = false;
        }
        i++;
      }, 100);
    };
    const stop = () => {
      clearInterval(interval);
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };
    return { start, stop };
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => { }, stop: () => { } };

    let tweens: gsap.core.Tween[] = [];
    const removePrevTweens = () => tweens.forEach((t) => t.kill());

    const start = () => {
      removePrevTweens();
      Object.values(SKILLS)
        .sort(() => Math.random() - 0.5)
        .forEach((skill, idx) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (!keycap) return;
          const t = gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          });
          tweens.push(t);
        });
    };

    const stop = () => {
      removePrevTweens();
      Object.values(SKILLS).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        const t = gsap.to(keycap.position, {
          y: 0,
          duration: 4,
          repeat: 1,
          ease: "elastic.out(1,0.7)",
        });
        tweens.push(t);
      });
      setTimeout(removePrevTweens, 1000);
    };

    return { start, stop };
  };

  const updateKeyboardTransform = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    kbd.visible = false;
    await sleep(400);
    kbd.visible = true;
    setKeyboardRevealed(true);

    const currentState = getKeyboardState({ section: activeSection, isMobile });
    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        ...currentState.scale,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }
    );

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");

    await sleep(900);

    if (isMobile) {
      const mobileKeyCaps = allObjects.filter((obj) => obj.name === "keycap-mobile");
      mobileKeyCaps.forEach((keycap) => { keycap.visible = true; });
    } else {
      const desktopKeyCaps = allObjects.filter((obj) => obj.name === "keycap-desktop");
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        keycap.visible = true;
      });
    }

    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 70);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
      );
    });
  };

  // --- Effects ---

  // Initialize GSAP and Spline interactions
  useEffect(() => {
    if (!splineApp) return;
    // Clamp renderer device pixel ratio when available
    try {
      const renderer = (splineApp as any).renderer || (splineApp as any).scene?.renderer;
      if (renderer && typeof renderer.setPixelRatio === "function") {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      }
    } catch (e) {
      // ignore if renderer not exposed
    }


    handleSplineInteractions();
    setupScrollAnimations();
    bongoAnimationRef.current = getBongoAnimation();
    keycapAnimationsRef.current = getKeycapsAnimation();
    // Proximity & shortcut handlers
    let proximityInterval: number | undefined;
    const setupProximity = () => {
      try {
        // try common names used in the scene; fallback to first matching name
        const candidates = ["laptop", "projects", "project-laptop", "project_laptop", "terminal", "wall", "hologram", "sphere", "ai-core", "core"];
        let laptop: any = null;
        for (const c of candidates) {
          const o = splineApp.findObjectByName(c);
          if (o) {
            laptop = o;
            break;
          }
        }
        if (!laptop) {
          // fallback: pick an object named 'keyboard' sibling or any object containing 'project'
          const all = (splineApp as any).getAllObjects ? (splineApp as any).getAllObjects() : [];
          laptop = all.find((o: any) => /project|laptop|terminal|terminal/i.test(o.name));
        }
        if (!laptop) return;

        proximityInterval = window.setInterval(() => {
          try {
            const camPos = (splineApp as any).camera?.position || (splineApp as any).getCameraPosition?.();
            const objPos = laptop.position || laptop.transform?.position || null;
            if (!camPos || !objPos) return;
            const dx = camPos.x - objPos.x;
            const dy = camPos.y - objPos.y;
            const dz = camPos.z - objPos.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 400) {
              setNearProjectsHint("Press E to explore Projects");
            } else {
              setNearProjectsHint(null);
            }
          } catch (e) {
            // ignore runtime errors
          }
        }, 500);
      } catch (e) {
        // ignore
      }
    };
    setupProximity();

    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key.toLowerCase() === "e") {
        if (nearProjectsHint) {
          // jump to projects section
          router.push("/#projects", { scroll: false });
        }
      }
      if (ev.key.toLowerCase() === "f") {
        // Toggle focus mode
        setFocusMode((s) => !s);
      }
      if (ev.key === "Escape") {
        setFocusMode(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      bongoAnimationRef.current?.stop();
      keycapAnimationsRef.current?.stop();
      window.removeEventListener("keydown", onKeyDown);
      if (proximityInterval) clearInterval(proximityInterval);
    };

  }, [splineApp, isMobile]);

  // Handle keyboard text visibility based on theme and section
  useEffect(() => {
    if (!splineApp) return;
    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");

    if (!textDesktopDark || !textDesktopLight || !textMobileDark || !textMobileLight) return;

    const setVisibility = (
      dDark: boolean,
      dLight: boolean,
      mDark: boolean,
      mLight: boolean
    ) => {
      textDesktopDark.visible = dDark;
      textDesktopLight.visible = dLight;
      textMobileDark.visible = mDark;
      textMobileLight.visible = mLight;
    };

    if (activeSection !== "skills") {
      setVisibility(false, false, false, false);
    } else if (theme === "dark") {
      isMobile
        ? setVisibility(false, false, false, true)
        : setVisibility(false, true, false, false);
    } else {
      isMobile
        ? setVisibility(false, false, true, false)
        : setVisibility(true, false, false, false);
    }
  }, [theme, splineApp, isMobile, activeSection]);

  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    // console.log(selectedSkill)
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill]);

  // Handle rotation and teardown animations based on active section
  useEffect(() => {
    if (!splineApp) return;

    let rotateKeyboard: gsap.core.Tween | undefined;
    let teardownKeyboard: gsap.core.Tween | undefined;

    const kbd = splineApp.findObjectByName("keyboard");

    if (kbd) {
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
        paused: true, // Start paused
      });

      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        { y: 0, x: -Math.PI, z: 0 },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          delay: 2.5,
          immediateRender: false,
          paused: true,
        }
      );
    }

    const manageAnimations = async () => {
      // Reset text if not in skills
      if (activeSection !== "skills") {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }

      // Handle Rotate/Teardown Tweens
      if (activeSection === "hero") {
        rotateKeyboard?.restart();
        teardownKeyboard?.pause();
      } else if (activeSection === "contact") {
        rotateKeyboard?.pause();
      } else {
        rotateKeyboard?.pause();
        teardownKeyboard?.pause();
      }

      // Handle Bongo Cat
      if (activeSection === "projects") {
        await sleep(300);
        bongoAnimationRef.current?.start();
      } else {
        await sleep(200);
        bongoAnimationRef.current?.stop();
      }

      // Handle Contact Section Animations
      if (activeSection === "contact") {
        await sleep(600);
        teardownKeyboard?.restart();
        keycapAnimationsRef.current?.start();
      } else {
        await sleep(600);
        teardownKeyboard?.pause();
        keycapAnimationsRef.current?.stop();
      }
    };

    manageAnimations();

    return () => {
      rotateKeyboard?.kill();
      teardownKeyboard?.kill();
    };
  }, [activeSection, splineApp]);

  // AI Core Pulse animation
  useEffect(() => {
    if (!splineApp) return;
    let pulseTween: gsap.core.Tween | undefined;
    const findCore = () => {
      const names = ["ai-core", "ai_core", "core", "hologram-sphere", "hologram", "sphere", "holo"];
      for (const n of names) {
        const o = splineApp.findObjectByName(n);
        if (o) return o;
      }
      const all = (splineApp as any).getAllObjects ? (splineApp as any).getAllObjects() : [];
      return all.find((o: any) => /core|holo|hologram|sphere/i.test(o.name));
    };

    const core = findCore();
    if (core) {
      try {
        // pulse scale
        pulseTween = gsap.to(core.scale, {
          x: core.scale.x * 1.05,
          y: core.scale.y * 1.05,
          z: core.scale.z * 1.05,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // try to flicker emissive if material exists
        const mat = (core as any).material || (core as any).materials?.[0];
        if (mat && typeof mat.emissive !== "undefined") {
          gsap.to(mat, {
            emissiveIntensity: (mat.emissiveIntensity || 0.5) * 1.2,
            duration: 0.9,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      } catch (e) {
        // ignore animation errors
      }
    }

    return () => {
      pulseTween?.kill();
    };
  }, [splineApp]);

  // Ambient hum setup using WebAudio (muted by default). Start on user toggle.
  useEffect(() => {
    if (!ambientOn) {
      // stop nodes if running
      try {
        lfoRef.current?.stop();
      } catch (e) { }
      oscRefs.current.forEach((o) => {
        try {
          o.stop();
        } catch (e) { }
      });
      oscRefs.current = [];
      try { filterRef.current?.disconnect(); } catch (e) { }
      filterRef.current = null;
      if (mainGainRef.current) {
        try { mainGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current?.currentTime || 0, 0.02); } catch (e) { }
      }
      return;
    }

    // create audio context lazily
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;

    // main gain (create lazily)
    if (!mainGainRef.current) {
      mainGainRef.current = ctx.createGain();
      mainGainRef.current.gain.value = 0.0001; // start nearly silent
    }

    // gentle lowpass filter to soften timbre
    if (!filterRef.current) {
      filterRef.current = ctx.createBiquadFilter();
      filterRef.current.type = "lowpass";
      filterRef.current.frequency.value = 800;
      filterRef.current.Q.value = 0.8;
      filterRef.current.connect(mainGainRef.current);
      mainGainRef.current.connect(ctx.destination);
    }

    // create two detuned oscillators for a rich hum
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    o1.type = "sine";
    o2.type = "sine";
    o1.frequency.value = 70;
    o2.frequency.value = 95;
    o1.connect(filterRef.current as BiquadFilterNode);
    o2.connect(filterRef.current as BiquadFilterNode);
    oscRefs.current = [o1, o2];

    // LFO to gently modulate amplitude
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.12; // slow pulse
    lfoGain.gain.value = 0.02; // small modulation
    lfo.connect(lfoGain);
    lfoGain.connect(mainGainRef.current.gain);
    lfoRef.current = lfo;

    // ramp to audible but subtle volume
    const now = ctx.currentTime;
    try {
      mainGainRef.current.gain.cancelScheduledValues(now);
      mainGainRef.current.gain.setValueAtTime(0.0001, now);
      const target = ambientMuted ? 0 : ambientVolume;
      mainGainRef.current.gain.linearRampToValueAtTime(target, now + 1.2);
    } catch (e) { }

    // start nodes with user gesture requirement handled where toggle is triggered
    try {
      oscRefs.current.forEach((o) => o.start());
      lfoRef.current?.start();
    } catch (e) {
      // might already be started — ignore
    }

    return () => {
      try {
        lfoRef.current?.stop();
      } catch (e) { }
      oscRefs.current.forEach((o) => {
        try { o.stop(); } catch (e) { }
      });
      oscRefs.current = [];
      try { filterRef.current?.disconnect(); } catch (e) { }
      filterRef.current = null;
    };
  }, [ambientOn, ambientMuted]);

  // react to volume or mute changes
  useEffect(() => {
    if (!mainGainRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx?.currentTime || 0;
    try {
      const target = ambientMuted ? 0 : ambientVolume;
      mainGainRef.current.gain.cancelScheduledValues(now);
      mainGainRef.current.gain.setTargetAtTime(target, now, 0.05);
    } catch (e) { }
  }, [ambientVolume, ambientMuted]);

  // Reveal keyboard on load/route change
  useEffect(() => {
    const hash = activeSection === "hero" ? "#" : `#${activeSection}`;
    router.push("/" + hash, { scroll: false });

    if (!splineApp || isLoading || keyboardRevealed) return;
    updateKeyboardTransform();
  }, [splineApp, isLoading, activeSection]);

  // Terminal State
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Toggle on Tilda (~)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        setIsTerminalOpen((prev) => !prev);
        unlockAchievement("hacker");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Unlock Audiophile
  useEffect(() => {
    if (ambientOn) {
      setTimeout(() => unlockAchievement("audiophile"), 10000); // 10s delay
    }
  }, [ambientOn]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <AiChat />
      <LiveActivity />
      {nearProjectsHint && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] bg-black/80 text-white px-4 py-2 rounded-md text-sm pointer-events-none">
          {nearProjectsHint}
        </div>
      )}

      <div className="fixed bottom-6 left-6 z-[99999] flex items-center gap-2">
        <button
          onClick={async () => {
            if (!audioCtxRef.current) {
              audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            try {
              // user gesture to resume audio context
              await audioCtxRef.current.resume();
            } catch (e) { }
            setAmbientOn((s) => !s);
          }}
          className="bg-black/80 text-white px-3 py-2 rounded-md text-sm"
          aria-pressed={ambientOn}
        >
          {ambientOn ? "Ambient: On" : "Ambient: Off"}
        </button>
        <button
          onClick={() => setAmbientMuted((m) => !m)}
          className="bg-black/60 text-white px-2 py-2 rounded-md text-sm"
          title="Mute"
        >
          {ambientMuted ? "Muted" : "Mute"}
        </button>
        <input
          aria-label="Ambient volume"
          type="range"
          min={0}
          max={0.2}
          step={0.005}
          value={ambientVolume}
          onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
          className="w-36"
        />
      </div>
      {focusMode && (
        <div className="fixed inset-0 z-[99998] flex items-center justify-center pointer-events-none">
          <div className="bg-black/60 backdrop-blur-sm rounded-md p-6 text-white max-w-xl mx-4">
            <h3 className="text-xl font-bold">Focus Mode</h3>
            <p className="mt-2 text-sm">Movement disabled. Press ESC to exit.</p>
          </div>
        </div>
      )}
      <Spline
        className="w-full h-full fixed"
        ref={splineContainer}
        onLoad={(app: Application) => {
          setSplineApp(app);
          bypassLoading();
        }}
        scene="/assets/skills-keyboard.spline"
      />
    </Suspense>
  );
};

export default AnimatedBackground;
