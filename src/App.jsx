import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WORKOUT_QUOTES } from './quotes';

const PR_QUOTES = [
  {
    author: 'LT. CMDR. WORF',
    text: 'A glorious new Personal Record, Captain! Kahless himself would raise a bloodwine goblet to that display of strength.',
  },
  {
    author: 'MASTER YODA',
    text: 'Stronger with the Force, you have become! A new personal record, logged it is!',
  },
  {
    author: 'GIMLI',
    text: 'BARUK KHAZÂD! A mighty new Personal Record worthy of the halls of Erebor!',
  },
  {
    author: 'FINN THE HUMAN',
    text: 'ALGEBRAIC! You just shattered your all-time Personal Record, Captain Matt!',
  },
];

const LCARS_THEMES = {
  bridge25: {
    label: '25TH CENTURY BRIDGE (TITANIUM)',
    universe: 'Star Trek',
    isModern: true,
    shipType: 'enterprise',
    registryTop: 'REG // NCC-1701-G',
    registrySub: 'ALLOY-HULL',
    coreLabel: 'WARP INTERMIX',
    corePrefix: 'WARP',
    bgMain: '#0A0D13',
    gridColor: 'rgba(180, 210, 240, 0.05)',
    metalGrad: 'linear-gradient(145deg, #2D3646 0%, #19202B 48%, #242C3A 52%, #121720 100%)',
    metalSheen: 'rgba(210, 230, 255, 0.28)',
    metalShadow: 'rgba(0, 0, 0, 0.88)',
    tableBg: 'rgba(13, 17, 25, 0.95)',
    elbowPrimary: '#E89B3C',
    elbowSecondary: '#526178',
    accentCool: '#7B9BC4',
    accentWarm: '#F5B041',
    highlight: '#38E8FF',
    plasma: '#38E8FF',
    textMain: '#F2D29B',
    tickHot: '#FF5722',
  },
  tng: {
    label: 'TNG LCARS (ANODIZED BRONZE)',
    universe: 'Star Trek',
    isModern: false,
    shipType: 'enterprise',
    registryTop: 'SEC //',
    registrySub: 'NCC-1701-D',
    coreLabel: 'WARP INTERMIX',
    corePrefix: 'WARP',
    bgMain: '#070605',
    gridColor: 'rgba(255, 175, 60, 0.045)',
    metalGrad: 'linear-gradient(145deg, #33271B 0%, #1C150E 48%, #291F15 52%, #120E09 100%)',
    metalSheen: 'rgba(255, 215, 150, 0.26)',
    metalShadow: 'rgba(0, 0, 0, 0.9)',
    tableBg: 'rgba(12, 10, 9, 0.95)',
    elbowPrimary: '#FF9900',
    elbowSecondary: '#CC99CC',
    accentCool: '#9999FF',
    accentWarm: '#FFCC66',
    highlight: '#00E5FF',
    plasma: '#00E5FF',
    textMain: '#FFCC66',
    tickHot: '#FF5722',
  },
  adventureTime: {
    label: 'ADVENTURE TIME (LAND OF OOO)',
    universe: 'Adventure Time',
    isModern: true,
    shipType: 'adventure',
    registryTop: 'LAND OF OOO // BMO-1',
    registrySub: 'CANDY-ALLOY',
    coreLabel: 'BMO BATTERY CORE',
    corePrefix: 'ALGEBRAIC',
    bgMain: '#07111A',
    gridColor: 'rgba(72, 245, 196, 0.06)',
    metalGrad: 'linear-gradient(145deg, #1E3B58 0%, #102336 48%, #18324B 52%, #0B1826 100%)',
    metalSheen: 'rgba(140, 230, 255, 0.34)',
    metalShadow: 'rgba(0, 0, 0, 0.88)',
    tableBg: 'rgba(10, 22, 34, 0.95)',
    elbowPrimary: '#FFD13B',
    elbowSecondary: '#FF69B4',
    accentCool: '#3FA7F5',
    accentWarm: '#FFE066',
    highlight: '#48F5C4',
    plasma: '#48F5C4',
    textMain: '#EBF8FF',
    tickHot: '#FF69B4',
  },
  lotr: {
    label: 'LORD OF THE RINGS (MITHRIL)',
    universe: 'Lord of the Rings',
    isModern: true,
    shipType: 'lotr',
    registryTop: 'GONDOR // MINAS TIRITH',
    registrySub: 'MITHRIL-STEEL',
    coreLabel: 'FORGE OF MOUNT DOOM',
    corePrefix: 'MITHRIL',
    bgMain: '#080C0A',
    gridColor: 'rgba(244, 185, 66, 0.055)',
    metalGrad: 'linear-gradient(145deg, #27332D 0%, #141C18 48%, #202B25 52%, #0D1310 100%)',
    metalSheen: 'rgba(220, 235, 228, 0.3)',
    metalShadow: 'rgba(0, 0, 0, 0.92)',
    tableBg: 'rgba(11, 16, 13, 0.95)',
    elbowPrimary: '#F4B942',
    elbowSecondary: '#3E594C',
    accentCool: '#9BB0C1',
    accentWarm: '#FAD375',
    highlight: '#52E5A8',
    plasma: '#F4B942',
    textMain: '#E8ECEA',
    tickHot: '#FF5E1A',
  },
  borg: {
    label: 'BORG CUBE (OBSIDIAN STEEL)',
    universe: 'Star Trek',
    isModern: true,
    shipType: 'borg',
    registryTop: 'UNIMATRIX // 01',
    registrySub: 'NANO-ALLOY',
    coreLabel: 'VINCOLUM CORE',
    corePrefix: 'REGEN',
    bgMain: '#040906',
    gridColor: 'rgba(57, 255, 20, 0.06)',
    metalGrad: 'linear-gradient(145deg, #172B20 0%, #0B1610 48%, #13241B 52%, #070E0A 100%)',
    metalSheen: 'rgba(110, 255, 150, 0.24)',
    metalShadow: 'rgba(0, 0, 0, 0.92)',
    tableBg: 'rgba(6, 15, 10, 0.95)',
    elbowPrimary: '#39FF14',
    elbowSecondary: '#234D38',
    accentCool: '#388E68',
    accentWarm: '#00F5D4',
    highlight: '#39FF14',
    plasma: '#39FF14',
    textMain: '#B7E4C7',
    tickHot: '#00F5D4',
  },
  klingon: {
    label: 'KLINGON BIRD OF PREY (FORGED IRON)',
    universe: 'Star Trek',
    isModern: true,
    shipType: 'klingon',
    registryTop: "IKS ROTARRAN // QAPla'",
    registrySub: 'IRON-HULL',
    coreLabel: 'DISRUPTOR CORE',
    corePrefix: 'THRUST',
    bgMain: '#0B0505',
    gridColor: 'rgba(230, 57, 70, 0.06)',
    metalGrad: 'linear-gradient(145deg, #361C1C 0%, #1C0D0D 48%, #2B1515 52%, #120707 100%)',
    metalSheen: 'rgba(255, 160, 140, 0.24)',
    metalShadow: 'rgba(0, 0, 0, 0.92)',
    tableBg: 'rgba(16, 7, 7, 0.95)',
    elbowPrimary: '#E63946',
    elbowSecondary: '#662222',
    accentCool: '#A83234',
    accentWarm: '#FFB703',
    highlight: '#FF6B00',
    plasma: '#FF5400',
    textMain: '#FAD2A5',
    tickHot: '#FFB703',
  },
  imperial: {
    label: 'STAR DESTROYER (DURASTEEL)',
    universe: 'Star Wars',
    isModern: true,
    shipType: 'imperial',
    registryTop: 'ISD-II // IMPERIAL NAVY',
    registrySub: 'DURASTEEL',
    coreLabel: 'HYPERMATTER CORE',
    corePrefix: 'OUTPUT',
    bgMain: '#0C0F14',
    gridColor: 'rgba(200, 220, 240, 0.05)',
    metalGrad: 'linear-gradient(145deg, #384150 0%, #1E242E 48%, #2D3542 52%, #141820 100%)',
    metalSheen: 'rgba(241, 250, 238, 0.32)',
    metalShadow: 'rgba(0, 0, 0, 0.9)',
    tableBg: 'rgba(14, 18, 25, 0.95)',
    elbowPrimary: '#E63946',
    elbowSecondary: '#4B5769',
    accentCool: '#74859C',
    accentWarm: '#F1FAEE',
    highlight: '#72EFDD',
    plasma: '#72EFDD',
    textMain: '#E2E8F0',
    tickHot: '#E63946',
  },
  tactical: {
    label: 'SOVEREIGN CLASS (BRUSHED CHROME)',
    universe: 'Star Trek',
    isModern: false,
    shipType: 'enterprise',
    registryTop: 'SEC //',
    registrySub: 'NCC-1701-E',
    coreLabel: 'WARP INTERMIX',
    corePrefix: 'WARP',
    bgMain: '#070A10',
    gridColor: 'rgba(120, 175, 245, 0.05)',
    metalGrad: 'linear-gradient(145deg, #28354A 0%, #141C29 48%, #202B3D 52%, #0D121B 100%)',
    metalSheen: 'rgba(190, 220, 255, 0.28)',
    metalShadow: 'rgba(0, 0, 0, 0.9)',
    tableBg: 'rgba(9, 13, 21, 0.95)',
    elbowPrimary: '#4A89DC',
    elbowSecondary: '#3BAFDA',
    accentCool: '#8FAADC',
    accentWarm: '#FF7700',
    highlight: '#00F0FF',
    plasma: '#38EF7D',
    textMain: '#DCE6F2',
    tickHot: '#FF5722',
  },
  battle: {
    label: 'BATTLE BRIDGE (ARMORED ALLOY)',
    universe: 'Star Trek',
    isModern: false,
    shipType: 'enterprise',
    registryTop: 'ALERT //',
    registrySub: 'NCC-1701-D',
    coreLabel: 'WARP INTERMIX',
    corePrefix: 'WARP',
    bgMain: '#0A0505',
    gridColor: 'rgba(217, 56, 58, 0.06)',
    metalGrad: 'linear-gradient(145deg, #331919 0%, #1A0C0C 48%, #291313 52%, #100707 100%)',
    metalSheen: 'rgba(255, 170, 150, 0.25)',
    metalShadow: 'rgba(0, 0, 0, 0.9)',
    tableBg: 'rgba(13, 6, 6, 0.95)',
    elbowPrimary: '#D9383A',
    elbowSecondary: '#FF7700',
    accentCool: '#CC6666',
    accentWarm: '#FFCC00',
    highlight: '#FF9900',
    plasma: '#FF4444',
    textMain: '#FFD699',
    tickHot: '#FFCC00',
  },
};

const DEFAULT_TABS = [
  {
    id: 'tab-1',
    name: 'UPPER POWER',
    activeWeekId: 'w-1',
    weeks: [
      { id: 'w-1', date: '11/24/2026' },
      { id: 'w-2', date: '12/1/2026' },
      { id: 'w-3', date: '12/8/2026' },
    ],
    hiddenWeekIds: [],
    hideNotesCols: false,
    hiddenRowIds: [],
    exercises: [
      {
        id: 'ex-1',
        name: 'Incline Chest Press',
        trackPR: true,
        sets: [
          {
            id: 's-1',
            entries: {
              'w-1': { scheme: '135 x 10 x 1', notes: 'warm up set', isGhost: false },
              'w-2': { scheme: '', notes: '', isGhost: false },
              'w-3': { scheme: '', notes: '', isGhost: false },
            },
          },
          {
            id: 's-2',
            entries: {
              'w-1': { scheme: '225 x 8 x 1', notes: '', isGhost: false },
              'w-2': { scheme: '', notes: '', isGhost: false },
              'w-3': { scheme: '', notes: '', isGhost: false },
            },
          },
          {
            id: 's-3',
            entries: {
              'w-1': { scheme: '315 x 5 x 4', notes: 'working set', isGhost: false },
              'w-2': { scheme: '', notes: '', isGhost: false },
              'w-3': { scheme: '', notes: '', isGhost: false },
            },
          },
        ],
      },
      {
        id: 'ex-2',
        name: 'Bicep Curl',
        trackPR: false,
        sets: [
          {
            id: 's-4',
            entries: {
              'w-1': { scheme: '70 x 10 x 4', notes: '', isGhost: false },
              'w-2': { scheme: '', notes: '', isGhost: false },
              'w-3': { scheme: '', notes: '', isGhost: false },
            },
          },
        ],
      },
      {
        id: 'ex-3',
        name: 'Decline Bench Press',
        trackPR: true,
        sets: [
          {
            id: 's-5',
            entries: {
              'w-1': { scheme: '148 x 10 x 1', notes: '', isGhost: false },
              'w-2': { scheme: '', notes: '', isGhost: false },
              'w-3': { scheme: '', notes: '', isGhost: false },
            },
          },
          {
            id: 's-6',
            entries: {
              'w-1': { scheme: '198 x 8 x 4', notes: '', isGhost: false },
              'w-2': { scheme: '', notes: '', isGhost: false },
              'w-3': { scheme: '', notes: '', isGhost: false },
            },
          },
        ],
      },
    ],
  },
  {
    id: 'tab-2',
    name: 'LOWER / CONDITIONING',
    activeWeekId: 'w-4',
    weeks: [
      { id: 'w-4', date: '11/24/2026' },
      { id: 'w-5', date: '12/1/2026' },
    ],
    hiddenWeekIds: [],
    hideNotesCols: false,
    hiddenRowIds: [],
    exercises: [
      {
        id: 'ex-4',
        name: 'Leverage Belt Squat',
        trackPR: true,
        sets: [
          {
            id: 's-7',
            entries: {
              'w-4': { scheme: '180 x 10 x 1', notes: 'warm up', isGhost: false },
              'w-5': { scheme: '', notes: '', isGhost: false },
            },
          },
          {
            id: 's-8',
            entries: {
              'w-4': { scheme: '360 x 8 x 4', notes: 'deep pause', isGhost: false },
              'w-5': { scheme: '', notes: '', isGhost: false },
            },
          },
        ],
      },
    ],
  },
];

const playLcarsChirp = (freq = 880, duration = 0.07, type = 'sine') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio blocked until user gesture
  }
};

const getNextWeekDateStr = (lastDateStr) => {
  const parts = (lastDateStr || '').split('/');
  if (parts.length === 3) {
    const d = new Date(parseInt(parts[2], 10), parseInt(parts[0], 10) - 1, parseInt(parts[1], 10));
    if (!isNaN(d.getTime())) {
      d.setDate(d.getDate() + 7);
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }
  }
  const now = new Date();
  return `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
};

const parseSchemeMetrics = (schemeStr) => {
  if (!schemeStr) return { weight: 0, reps: 0, sets: 0, tonnage: 0, est1RM: 0 };
  const nums = schemeStr
    .toLowerCase()
    .split(/[x×*]/)
    .map((part) => parseFloat(part.trim()))
    .filter((n) => !isNaN(n));

  if (nums.length >= 2) {
    const weight = nums[0];
    const reps = nums[1];
    const sets = nums.length >= 3 ? nums[2] : 1;
    const tonnage = weight * reps * sets;
    const est1RM = reps === 1 ? weight : Math.round(weight * (1 + reps / 30));
    return { weight, reps, sets, tonnage, est1RM };
  }
  return { weight: 0, reps: 0, sets: 0, tonnage: 0, est1RM: 0 };
};

const FactionShipWireframe = ({ shipType, primaryColor, highlightColor }) => {
  if (shipType === 'adventure') {
    return (
      <svg width="110" height="36" viewBox="0 0 120 40" fill="none" style={{ filter: `drop-shadow(0 0 6px ${highlightColor})` }}>
        <rect x="10" y="4" width="26" height="32" rx="4" stroke={highlightColor} strokeWidth="1.8" fill="rgba(72,245,196,0.1)" />
        <rect x="14" y="8" width="18" height="12" rx="2" stroke={primaryColor} strokeWidth="1.3" />
        <circle cx="19" cy="13" r="1.3" fill={highlightColor} />
        <circle cx="27" cy="13" r="1.3" fill={highlightColor} />
        <path d="M20 16 Q23 18.5 26 16" stroke={highlightColor} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M17 24 V29 M14.5 26.5 H19.5" stroke={primaryColor} strokeWidth="1.5" />
        <circle cx="28" cy="25" r="1.6" fill="#FF69B4" />
        <circle cx="25" cy="29" r="1.6" fill={highlightColor} />
        <path d="M48 20 L98 20 L108 16 L114 20 L108 24 L98 20" stroke={primaryColor} strokeWidth="1.8" fill="rgba(255,209,59,0.14)" className="holo-engine-pulse" />
        <line x1="60" y1="13" x2="60" y2="27" stroke={primaryColor} strokeWidth="2.4" />
        <circle cx="46" cy="20" r="2.5" stroke={highlightColor} strokeWidth="1.5" />
      </svg>
    );
  }

  if (shipType === 'lotr') {
    return (
      <svg width="116" height="36" viewBox="0 0 130 40" fill="none" style={{ filter: `drop-shadow(0 0 6px ${primaryColor})` }}>
        <circle cx="24" cy="20" r="13" stroke={primaryColor} strokeWidth="2.4" fill="rgba(244,185,66,0.1)" className="holo-engine-pulse" />
        <circle cx="24" cy="20" r="9.5" stroke={highlightColor} strokeWidth="1" strokeDasharray="3 2" />
        <polygon points="52,20 116,16 125,20 116,24" stroke="#E8ECEA" strokeWidth="1.7" fill="rgba(232,236,234,0.1)" />
        <line x1="64" y1="20" x2="112" y2="20" stroke={highlightColor} strokeWidth="1.1" />
        <path d="M62 10 Q66 20 62 30" stroke={primaryColor} strokeWidth="2.2" fill="none" />
        <line x1="46" y1="20" x2="62" y2="20" stroke={primaryColor} strokeWidth="2.6" />
        <circle cx="44" cy="20" r="2.6" stroke={primaryColor} strokeWidth="1.6" />
      </svg>
    );
  }

  if (shipType === 'borg') {
    return (
      <svg width="74" height="36" viewBox="0 0 80 40" fill="none" style={{ filter: `drop-shadow(0 0 6px ${primaryColor})` }}>
        <polygon points="40,3 64,13 64,31 40,39 16,31 16,13" stroke={primaryColor} strokeWidth="1.6" fill="rgba(57,255,20,0.08)" />
        <polyline points="16,13 40,22 64,13" stroke={primaryColor} strokeWidth="1.4" />
        <line x1="40" y1="22" x2="40" y2="39" stroke={primaryColor} strokeWidth="1.4" />
        <line x1="28" y1="8" x2="52" y2="17" stroke={highlightColor} strokeWidth="0.9" strokeDasharray="3 2" />
        <line x1="52" y1="8" x2="28" y2="17" stroke={highlightColor} strokeWidth="0.9" strokeDasharray="3 2" />
        <rect x="35" y="17" width="10" height="8" stroke={highlightColor} strokeWidth="1.2" className="holo-engine-pulse" />
      </svg>
    );
  }

  if (shipType === 'klingon') {
    return (
      <svg width="108" height="36" viewBox="0 0 220 64" fill="none" style={{ filter: `drop-shadow(0 0 6px ${primaryColor})` }}>
        <path d="M110 24 L22 10 L8 28 L76 34" stroke={primaryColor} strokeWidth="2" fill="rgba(214,40,40,0.14)" />
        <path d="M110 24 L198 10 L212 28 L144 34" stroke={primaryColor} strokeWidth="2" fill="rgba(214,40,40,0.14)" />
        <line x1="8" y1="18" x2="8" y2="36" stroke={highlightColor} strokeWidth="2.5" className="holo-engine-pulse" />
        <line x1="212" y1="18" x2="212" y2="36" stroke={highlightColor} strokeWidth="2.5" className="holo-engine-pulse" />
        <polygon points="96,24 124,24 118,46 102,46" stroke={primaryColor} strokeWidth="1.8" />
        <ellipse cx="110" cy="49" rx="14" ry="6" stroke={highlightColor} strokeWidth="2" fill="rgba(255,183,3,0.22)" />
      </svg>
    );
  }

  if (shipType === 'imperial') {
    return (
      <svg width="114" height="36" viewBox="0 0 220 64" fill="none" style={{ filter: `drop-shadow(0 0 6px ${highlightColor})` }}>
        <polygon points="16,38 192,16 206,38 192,50" stroke={highlightColor} strokeWidth="1.8" fill="rgba(114,239,221,0.08)" />
        <polygon points="84,33 176,22 184,36 92,41" stroke="#F1FAEE" strokeWidth="1.4" />
        <polygon points="126,28 172,23 176,33 130,35" stroke="#F1FAEE" strokeWidth="1.2" />
        <rect x="164" y="13" width="12" height="10" stroke="#F1FAEE" strokeWidth="1.5" />
        <circle cx="166" cy="11" r="2.5" stroke={primaryColor} strokeWidth="1.5" />
        <circle cx="174" cy="11" r="2.5" stroke={primaryColor} strokeWidth="1.5" />
        <line x1="206" y1="24" x2="206" y2="44" stroke={primaryColor} strokeWidth="3.5" className="holo-engine-pulse" />
      </svg>
    );
  }

  return (
    <svg width="108" height="34" viewBox="0 0 220 64" fill="none" style={{ filter: `drop-shadow(0 0 6px ${primaryColor})` }}>
      <ellipse cx="148" cy="24" rx="56" ry="12" stroke={primaryColor} strokeWidth="2" fill="rgba(232,155,60,0.08)" />
      <ellipse cx="148" cy="24" rx="26" ry="5" stroke={primaryColor} strokeWidth="1.3" />
      <path d="M58 38 L128 32 L134 42 L68 46 Z" stroke={primaryColor} strokeWidth="1.8" />
      <path d="M122 33 L134 27" stroke={primaryColor} strokeWidth="2" />
      <rect x="14" y="14" width="76" height="7" rx="3.5" stroke={primaryColor} strokeWidth="1.8" />
      <line x1="20" y1="17.5" x2="84" y2="17.5" stroke={highlightColor} strokeWidth="2" className="holo-engine-pulse" />
      <path d="M62 21 L76 37" stroke={primaryColor} strokeWidth="1.8" />
      <path d="M131 35 Q138 39 132 43" stroke={highlightColor} strokeWidth="2.2" fill="none" />
    </svg>
  );
};

const GyroChronometerGauge = ({ secondsLeft, totalSeconds, activeColor, secondaryColor, isRunning }) => {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const ratio = totalSeconds > 0 ? Math.max(0, Math.min(1, secondsLeft / totalSeconds)) : 0;
  const dashOffset = circumference * (1 - ratio);

  return (
    <div style={{ position: 'relative', width: '88px', height: '88px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="88" height="88" viewBox="0 0 88 88" style={{ filter: `drop-shadow(0 0 8px ${activeColor}66)` }}>
        <circle
          cx="44"
          cy="44"
          r="41"
          fill="none"
          stroke={secondaryColor}
          strokeWidth="1"
          strokeDasharray="6 4 2 4"
          className={isRunning ? 'gyro-spin-fast' : 'gyro-spin-slow'}
          style={{ transformOrigin: '44px 44px', opacity: 0.75 }}
        />
        <circle
          cx="44"
          cy="44"
          r="27"
          fill="none"
          stroke={activeColor}
          strokeWidth="1"
          strokeDasharray="2 5"
          className="gyro-spin-reverse"
          style={{ transformOrigin: '44px 44px', opacity: 0.55 }}
        />
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="rgba(0,0,0,0.65)"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="5"
        />
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke={activeColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 44 44)"
          style={{ transition: 'stroke-dashoffset 0.35s linear, stroke 0.3s ease' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '15px',
          fontWeight: 700,
          color: activeColor,
          textShadow: `0 0 8px ${activeColor}88`,
          letterSpacing: '-0.5px',
        }}
      >
        {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
      </div>
    </div>
  );
};

const TonnageTelemetryChart = ({ weeklyData, selectedWeekId, onSelectWeek, primaryColor, highlightColor }) => {
  const maxVal = Math.max(1, ...weeklyData.map((w) => w.tonnage));

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '54px', padding: '4px 6px', background: 'rgba(0,0,0,0.55)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.14)', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.85)' }}>
      {weeklyData.map((wk) => {
        const isSelected = wk.id === selectedWeekId;
        const barHeightPct = wk.tonnage > 0 ? Math.max(16, Math.round((wk.tonnage / maxVal) * 100)) : 8;
        const barColor = isSelected ? highlightColor : primaryColor;

        return (
          <div
            key={wk.id}
            onClick={() => onSelectWeek(wk.id)}
            title={`${wk.date}: ${wk.tonnage.toLocaleString()} LBS (Click to select)`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: '100%',
              minWidth: '34px',
              cursor: 'pointer',
              gap: '3px',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                color: isSelected ? highlightColor : '#8899AA',
                fontWeight: isSelected ? 700 : 400,
              }}
            >
              {wk.tonnage > 0 ? `${(wk.tonnage / 1000).toFixed(1)}k` : '0'}
            </span>
            <div
              style={{
                width: '18px',
                height: `${barHeightPct}%`,
                background: `linear-gradient(180deg, ${barColor} 0%, ${barColor}44 100%)`,
                borderTop: `2px solid #FFF`,
                boxShadow: isSelected ? `0 0 10px ${highlightColor}` : 'none',
                borderRadius: '2px 2px 0 0',
                transition: 'height 0.35s ease, background 0.3s ease',
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                color: isSelected ? '#FFF' : '#778899',
              }}
            >
              {wk.shortDate}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [missionTitle, setMissionTitle] = useState(() => {
    return localStorage.getItem('lcars_mission_title_v1') || 'Mission: Get Captain Matt Shredded';
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [themeKey, setThemeKey] = useState(() => {
    const saved = localStorage.getItem('lcars_theme_v1');
    return saved && LCARS_THEMES[saved] ? saved : 'bridge25';
  });

  const [tabs, setTabs] = useState(() => {
    const saved = localStorage.getItem('lcars_workout_matrix_v8');
    return saved ? JSON.parse(saved) : DEFAULT_TABS;
  });
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || 'tab-1');
  const [editingTabId, setEditingTabId] = useState(null);
  const [editingTabName, setEditingTabName] = useState('');
  const [draggedTabIdx, setDraggedTabIdx] = useState(null);
  const [showHiddenDrawer, setShowHiddenDrawer] = useState(false);
  const [quoteFilter, setQuoteFilter] = useState('ALL');
  const [hailBanner, setHailBanner] = useState(WORKOUT_QUOTES[0]);
  const [sectorCode, setSectorCode] = useState('47-1701');
  const [tickSeed, setTickSeed] = useState(0);

  // Google Drive Sync State
  const [driveWebhookUrl, setDriveWebhookUrl] = useState(() => {
    return localStorage.getItem('lcars_drive_webhook_v1') || '';
  });
  const [autoDriveSync, setAutoDriveSync] = useState(() => {
    const saved = localStorage.getItem('lcars_drive_autosync_v1');
    return saved !== null ? saved === 'true' : true;
  });
  const [showDriveDrawer, setShowDriveDrawer] = useState(false);
  const [driveSyncStatus, setDriveSyncStatus] = useState('IDLE');
  const [lastSyncTime, setLastSyncTime] = useState('');
  const hasMountedRef = useRef(false);
  const autoSyncTimerRef = useRef(null);

  // Rest & HIIT Chronometer State
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [hiitMode, setHiitMode] = useState(false);
  const [hiitPhase, setHiitPhase] = useState('WORK');
  const [hiitRound, setHiitRound] = useState(1);
  const [warpFactor, setWarpFactor] = useState(1);
  const [redAlertFlash, setRedAlertFlash] = useState(false);
  const timerRef = useRef(null);

  // Screen Wake Lock State
  const [wakeLockEnabled, setWakeLockEnabled] = useState(false);
  const wakeLockSentinel = useRef(null);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const palette = LCARS_THEMES[themeKey] || LCARS_THEMES.bridge25;
  const isModern = palette.isModern;
  const isRedAlert = redAlertFlash || (hiitMode && hiitPhase === 'WORK' && timerActive);

  const exColWidth = isMobile ? 114 : 185;
  const setColWidth = isMobile ? 44 : 58;

  const pickRandomHail = (overrideFilter) => {
    const activeMode = overrideFilter || quoteFilter;
    const pool =
      activeMode === 'THEME'
        ? WORKOUT_QUOTES.filter((q) => q.universe === palette.universe)
        : WORKOUT_QUOTES;
    const source = pool.length > 0 ? pool : WORKOUT_QUOTES;
    return source[Math.floor(Math.random() * source.length)];
  };

  useEffect(() => {
    localStorage.setItem('lcars_mission_title_v1', missionTitle);
  }, [missionTitle]);

  useEffect(() => {
    localStorage.setItem('lcars_theme_v1', themeKey);
  }, [themeKey]);

  useEffect(() => {
    localStorage.setItem('lcars_workout_matrix_v8', JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    localStorage.setItem('lcars_drive_webhook_v1', driveWebhookUrl.trim());
  }, [driveWebhookUrl]);

  useEffect(() => {
    localStorage.setItem('lcars_drive_autosync_v1', String(autoDriveSync));
  }, [autoDriveSync]);

  const syncToGoogleDrive = useCallback(
    async (isManual = false) => {
      const cleanUrl = driveWebhookUrl.trim();
      if (!cleanUrl) {
        setDriveSyncStatus('NO_URL');
        if (isManual) {
          setShowDriveDrawer(true);
        }
        return;
      }

      if (!navigator.onLine) {
        setDriveSyncStatus('ERROR');
        return;
      }

      setDriveSyncStatus('SYNCING');
      if (isManual) playLcarsChirp(1174, 0.08);

      const currentVisibleWeeks = activeTab.weeks.filter(
        (w) => !activeTab.hiddenWeekIds.includes(w.id)
      );
      const currentSelectedWeek =
        currentVisibleWeeks.find((w) => w.id === activeTab.activeWeekId) ||
        currentVisibleWeeks[0] ||
        activeTab.weeks[0];
      const targetWeekDate = currentSelectedWeek?.date || 'Current_Week';

      const tabsPayload = tabs.map((tab) => {
        const matchingWeek =
          tab.weeks.find((w) => w.date === targetWeekDate) ||
          tab.weeks.find((w) => w.id === tab.activeWeekId) ||
          tab.weeks[0];
        const wId = matchingWeek?.id;

        const rows = [];
        tab.exercises.forEach((ex) => {
          if (tab.hiddenRowIds.includes(ex.id)) return;
          ex.sets.forEach((s, sIdx) => {
            if (tab.hiddenRowIds.includes(s.id)) return;
            const entry = wId ? s.entries[wId] : null;
            rows.push({
              exercise: ex.name || 'Unnamed Exercise',
              setNum: sIdx + 1,
              scheme: entry && !entry.isGhost ? entry.scheme : '',
              notes: entry ? entry.notes : '',
            });
          });
        });

        return {
          name: tab.name,
          rows,
        };
      });

      try {
        await fetch(cleanUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({
            missionTitle,
            weekDate: targetWeekDate,
            syncedAt: new Date().toISOString(),
            tabs: tabsPayload,
          }),
        });

        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastSyncTime(nowStr);
        setDriveSyncStatus('SYNCED');
        if (isManual) playLcarsChirp(1567, 0.12, 'triangle');
      } catch (err) {
        setDriveSyncStatus('ERROR');
      }
    },
    [driveWebhookUrl, activeTab, tabs, missionTitle]
  );

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      if (!driveWebhookUrl.trim()) setDriveSyncStatus('NO_URL');
      return;
    }

    if (!autoDriveSync || !driveWebhookUrl.trim()) return;

    setDriveSyncStatus('PENDING');
    if (autoSyncTimerRef.current) clearTimeout(autoSyncTimerRef.current);
    autoSyncTimerRef.current = setTimeout(() => {
      syncToGoogleDrive(false);
    }, 4000);

    return () => clearTimeout(autoSyncTimerRef.current);
  }, [tabs, autoDriveSync, driveWebhookUrl, syncToGoogleDrive]);

  useEffect(() => {
    const interval = setInterval(() => {
      const prefix = String(Math.floor(10 + Math.random() * 89));
      const suffix = String(Math.floor(1000 + Math.random() * 8999));
      setSectorCode(`${prefix}-${suffix}`);
      setTickSeed((s) => s + 1);
    }, timerActive ? 750 : 2800);
    return () => clearInterval(interval);
  }, [timerActive]);

  const toggleWakeLock = async () => {
    playLcarsChirp(1046, 0.06);
    if (!wakeLockEnabled) {
      try {
        if ('wakeLock' in navigator) {
          wakeLockSentinel.current = await navigator.wakeLock.request('screen');
          setWakeLockEnabled(true);
          wakeLockSentinel.current.addEventListener('release', () => {
            setWakeLockEnabled(false);
          });
        } else {
          alert('Screen Wake Lock is not supported in this browser, Captain.');
        }
      } catch (err) {
        alert('Unable to engage Screen Wake Lock (ensure page is active).');
      }
    } else {
      if (wakeLockSentinel.current) {
        await wakeLockSentinel.current.release();
        wakeLockSentinel.current = null;
      }
      setWakeLockEnabled(false);
    }
  };

  useEffect(() => {
    if (timerActive && secondsLeft > 0) {
      if (hiitMode) {
        setWarpFactor(hiitPhase === 'WORK' ? 9 : 3);
      } else {
        setWarpFactor(6);
      }
      timerRef.current = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    } else if (timerActive && secondsLeft === 0) {
      if (hiitMode) {
        if (hiitPhase === 'WORK') {
          playLcarsChirp(659, 0.2, 'sine');
          setHiitPhase('REST');
          setSecondsLeft(40);
          setTotalDuration(40);
          setWarpFactor(3);
        } else {
          playLcarsChirp(1318, 0.15, 'triangle');
          setTimeout(() => playLcarsChirp(1567, 0.2, 'triangle'), 160);
          setHiitPhase('WORK');
          setHiitRound((r) => r + 1);
          setSecondsLeft(20);
          setTotalDuration(20);
          setWarpFactor(9);
        }
      } else {
        setTimerActive(false);
        setWarpFactor(9);
        setRedAlertFlash(true);
        playLcarsChirp(1174, 0.15, 'triangle');
        setTimeout(() => playLcarsChirp(1567, 0.25, 'triangle'), 160);
        setHailBanner(pickRandomHail());
        setTimeout(() => {
          setWarpFactor(1);
          setRedAlertFlash(false);
        }, 4000);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [timerActive, secondsLeft, hiitMode, hiitPhase]);

  const startStandardTimer = (sec) => {
    playLcarsChirp(987, 0.06);
    setHiitMode(false);
    setRedAlertFlash(false);
    setSecondsLeft(sec);
    setTotalDuration(sec);
    setTimerActive(true);
  };

  const startHiit2040 = () => {
    playLcarsChirp(1318, 0.1, 'triangle');
    setHiitMode(true);
    setHiitPhase('WORK');
    setHiitRound(1);
    setSecondsLeft(20);
    setTotalDuration(20);
    setTimerActive(true);
    setWarpFactor(9);
  };

  const stopTimer = () => {
    playLcarsChirp(523, 0.08);
    setTimerActive(false);
    setHiitMode(false);
    setRedAlertFlash(false);
    setSecondsLeft(0);
    setTotalDuration(0);
    setWarpFactor(1);
  };

  // --- TAB MANAGEMENT ---
  const addNewTab = () => {
    playLcarsChirp(1174, 0.08);
    const newId = `tab-${Date.now()}`;
    const firstWeekId = `w-${Date.now()}`;
    const now = new Date();
    const todayStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    const newTab = {
      id: newId,
      name: `DAY ${tabs.length + 1}`,
      activeWeekId: firstWeekId,
      weeks: [{ id: firstWeekId, date: todayStr }],
      hiddenWeekIds: [],
      hideNotesCols: false,
      hiddenRowIds: [],
      exercises: [
        {
          id: `ex-${Date.now()}`,
          name: '',
          trackPR: false,
          sets: [
            {
              id: `s-${Date.now()}`,
              entries: { [firstWeekId]: { scheme: '', notes: '', isGhost: false } },
            },
          ],
        },
      ],
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
    setEditingTabId(newId);
    setEditingTabName(newTab.name);
  };

  const deleteTab = (tabId, tabName) => {
    if (tabs.length <= 1) {
      alert('Cannot delete the final remaining workout tab, Captain.');
      return;
    }
    if (!window.confirm(`Permanently delete the entire "${tabName}" tab and all logged weeks inside it?`)) {
      return;
    }
    playLcarsChirp(440, 0.12, 'sawtooth');
    const remaining = tabs.filter((t) => t.id !== tabId);
    setTabs(remaining);
    if (activeTabId === tabId) {
      setActiveTabId(remaining[0].id);
    }
  };

  const startRenamingTab = (tab) => {
    setEditingTabId(tab.id);
    setEditingTabName(tab.name);
  };

  const commitTabRename = () => {
    if (editingTabId && editingTabName.trim()) {
      setTabs((prev) =>
        prev.map((t) =>
          t.id === editingTabId ? { ...t, name: editingTabName.trim().toUpperCase() } : t
        )
      );
      playLcarsChirp(1046, 0.05);
    }
    setEditingTabId(null);
  };

  const moveTab = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= tabs.length) return;
    playLcarsChirp(987, 0.05);
    const updated = [...tabs];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIdx, 0, moved);
    setTabs(updated);
  };

  const handleTabDrop = (targetIdx) => {
    if (draggedTabIdx === null || draggedTabIdx === targetIdx) return;
    playLcarsChirp(987, 0.05);
    const updated = [...tabs];
    const [moved] = updated.splice(draggedTabIdx, 1);
    updated.splice(targetIdx, 0, moved);
    setTabs(updated);
    setDraggedTabIdx(null);
  };

  // --- WEEK COLUMN BLOCKS ---
  const selectActiveWeek = (weekId) => {
    if (activeTab.activeWeekId === weekId) return;
    setTabs((prev) =>
      prev.map((tab) => (tab.id === activeTab.id ? { ...tab, activeWeekId: weekId } : tab))
    );
  };

  const addWeekColumn = (copyPreviousSchemes = true) => {
    playLcarsChirp(1174, 0.07);
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        const lastWeek = tab.weeks[tab.weeks.length - 1];
        const nextDate = getNextWeekDateStr(lastWeek?.date);
        const newWeekId = `w-${Date.now()}`;
        return {
          ...tab,
          activeWeekId: newWeekId,
          weeks: [...tab.weeks, { id: newWeekId, date: nextDate }],
          exercises: tab.exercises.map((ex) => ({
            ...ex,
            sets: ex.sets.map((s) => {
              const prevScheme =
                copyPreviousSchemes && lastWeek ? s.entries[lastWeek.id]?.scheme || '' : '';
              return {
                ...s,
                entries: {
                  ...s.entries,
                  [newWeekId]: {
                    scheme: prevScheme,
                    notes: '',
                    isGhost: Boolean(prevScheme),
                  },
                },
              };
            }),
          })),
        };
      })
    );
  };

  const deleteWeekColumn = (weekId, weekDate) => {
    if (activeTab.weeks.length <= 1) {
      alert('Cannot delete the only remaining date column on this tab, Captain.');
      return;
    }
    if (!window.confirm(`Permanently delete the date column "${weekDate}" and all logged sets inside it?`)) {
      return;
    }
    playLcarsChirp(440, 0.12, 'sawtooth');
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        const remainingWeeks = tab.weeks.filter((w) => w.id !== weekId);
        const nextActiveWeekId =
          tab.activeWeekId === weekId ? remainingWeeks[0]?.id || '' : tab.activeWeekId;
        return {
          ...tab,
          activeWeekId: nextActiveWeekId,
          weeks: remainingWeeks,
          hiddenWeekIds: tab.hiddenWeekIds.filter((id) => id !== weekId),
          exercises: tab.exercises.map((ex) => ({
            ...ex,
            sets: ex.sets.map((s) => {
              const updatedEntries = { ...s.entries };
              delete updatedEntries[weekId];
              return { ...s, entries: updatedEntries };
            }),
          })),
        };
      })
    );
  };

  const updateWeekDate = (weekId, newDate) => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        return {
          ...tab,
          weeks: tab.weeks.map((w) => (w.id === weekId ? { ...w, date: newDate } : w)),
        };
      })
    );
  };

  const toggleHideWeek = (weekId) => {
    playLcarsChirp(784, 0.05);
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        const isHidden = tab.hiddenWeekIds.includes(weekId);
        return {
          ...tab,
          hiddenWeekIds: isHidden
            ? tab.hiddenWeekIds.filter((id) => id !== weekId)
            : [...tab.hiddenWeekIds, weekId],
        };
      })
    );
  };

  const unhideSingleWeek = (weekId) => {
    playLcarsChirp(1318, 0.07);
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTab.id
          ? { ...tab, hiddenWeekIds: tab.hiddenWeekIds.filter((id) => id !== weekId) }
          : tab
      )
    );
  };

  const unhideSingleExercise = (exId) => {
    playLcarsChirp(1318, 0.07);
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTab.id
          ? { ...tab, hiddenRowIds: tab.hiddenRowIds.filter((id) => id !== exId) }
          : tab
      )
    );
  };

  const toggleHideNotes = () => {
    playLcarsChirp(784, 0.05);
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTab.id ? { ...tab, hideNotesCols: !tab.hideNotesCols } : tab
      )
    );
  };

  // --- EXERCISES & SUB-ROWS ---
  const addExercise = () => {
    playLcarsChirp(1046, 0.06);
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        const initialEntries = {};
        tab.weeks.forEach((w) => {
          initialEntries[w.id] = { scheme: '', notes: '', isGhost: false };
        });
        const newEx = {
          id: `ex-${Date.now()}`,
          name: '',
          trackPR: false,
          sets: [{ id: `s-${Date.now()}`, entries: initialEntries }],
        };
        return { ...tab, exercises: [...tab.exercises, newEx] };
      })
    );
  };

  const moveExercise = (exIdx, direction) => {
    const targetIdx = exIdx + direction;
    if (targetIdx < 0 || targetIdx >= activeTab.exercises.length) return;
    playLcarsChirp(987, 0.05);
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        const updated = [...tab.exercises];
        const [moved] = updated.splice(exIdx, 1);
        updated.splice(targetIdx, 0, moved);
        return { ...tab, exercises: updated };
      })
    );
  };

  const toggleExercisePR = (exerciseId) => {
    playLcarsChirp(1318, 0.07);
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        return {
          ...tab,
          exercises: tab.exercises.map((ex) =>
            ex.id === exerciseId ? { ...ex, trackPR: !ex.trackPR } : ex
          ),
        };
      })
    );
  };

  const deleteExercise = (exerciseId, exerciseName) => {
    const label = exerciseName.trim() || 'this exercise';
    if (!window.confirm(`Delete "${label}" and all of its set rows from this tab?`)) return;
    playLcarsChirp(440, 0.12, 'sawtooth');
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        return {
          ...tab,
          exercises: tab.exercises.filter((ex) => ex.id !== exerciseId),
          hiddenRowIds: tab.hiddenRowIds.filter((id) => id !== exerciseId),
        };
      })
    );
  };

  const addSubSetRow = (exerciseId) => {
    playLcarsChirp(1318, 0.06);
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        const initialEntries = {};
        tab.weeks.forEach((w) => {
          initialEntries[w.id] = { scheme: '', notes: '', isGhost: false };
        });
        return {
          ...tab,
          exercises: tab.exercises.map((ex) =>
            ex.id === exerciseId
              ? {
                  ...ex,
                  sets: [
                    ...ex.sets,
                    {
                      id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
                      entries: initialEntries,
                    },
                  ],
                }
              : ex
          ),
        };
      })
    );
  };

  const deleteSubSetRow = (exerciseId, setId) => {
    playLcarsChirp(440, 0.09, 'sawtooth');
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        return {
          ...tab,
          exercises: tab.exercises.map((ex) => {
            if (ex.id !== exerciseId || ex.sets.length <= 1) return ex;
            return {
              ...ex,
              sets: ex.sets.filter((s) => s.id !== setId),
            };
          }),
        };
      })
    );
  };

  const updateExerciseName = (exerciseId, newName) => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        return {
          ...tab,
          exercises: tab.exercises.map((ex) =>
            ex.id === exerciseId ? { ...ex, name: newName } : ex
          ),
        };
      })
    );
  };

  const getExerciseBest1RMDetails = (ex) => {
    let max1RM = 0;
    let bestSetLabel = '';
    let weekDate = '';
    ex.sets.forEach((s) => {
      Object.entries(s.entries || {}).forEach(([wId, entry]) => {
        if (entry && !entry.isGhost && entry.scheme) {
          const { weight, reps, est1RM } = parseSchemeMetrics(entry.scheme);
          if (est1RM > max1RM) {
            max1RM = est1RM;
            bestSetLabel = `${weight}×${reps}`;
            const wk = activeTab.weeks.find((w) => w.id === wId);
            weekDate = wk ? wk.date : '';
          }
        }
      });
    });
    return { est1RM: max1RM, bestSetLabel, weekDate };
  };

  const updateSetCell = (exerciseId, setId, weekId, field, value) => {
    const targetEx = activeTab.exercises.find((e) => e.id === exerciseId);
    const prevBest1RM = targetEx && targetEx.trackPR ? getExerciseBest1RMDetails(targetEx).est1RM : 0;

    if (field === 'scheme' && targetEx && targetEx.trackPR) {
      const { est1RM } = parseSchemeMetrics(value);
      if (est1RM > prevBest1RM && prevBest1RM > 0) {
        playLcarsChirp(1318, 0.1, 'triangle');
        setTimeout(() => playLcarsChirp(1760, 0.2, 'triangle'), 120);
        const prQuote = PR_QUOTES[Math.floor(Math.random() * PR_QUOTES.length)];
        setHailBanner({
          universe: 'NEW PR',
          author: `${prQuote.author} // NEW PR (${est1RM} LB EST. 1RM)`,
          text: prQuote.text,
        });
      }
    }

    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        return {
          ...tab,
          activeWeekId: weekId,
          exercises: tab.exercises.map((ex) => {
            if (ex.id !== exerciseId) return ex;
            return {
              ...ex,
              sets: ex.sets.map((s) => {
                if (s.id !== setId) return s;
                const currentWeekEntry = s.entries[weekId] || {
                  scheme: '',
                  notes: '',
                  isGhost: false,
                };
                return {
                  ...s,
                  entries: {
                    ...s.entries,
                    [weekId]: {
                      ...currentWeekEntry,
                      [field]: value,
                      isGhost: field === 'scheme' ? false : currentWeekEntry.isGhost,
                    },
                  },
                };
              }),
            };
          }),
        };
      })
    );
  };

  const toggleHideRow = (id) => {
    playLcarsChirp(784, 0.05);
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id) return tab;
        const isHidden = tab.hiddenRowIds.includes(id);
        return {
          ...tab,
          hiddenRowIds: isHidden
            ? tab.hiddenRowIds.filter((item) => item !== id)
            : [...tab.hiddenRowIds, id],
        };
      })
    );
  };

  const visibleWeeks = activeTab.weeks.filter((w) => !activeTab.hiddenWeekIds.includes(w.id));
  const hiddenWeeksList = activeTab.weeks.filter((w) => activeTab.hiddenWeekIds.includes(w.id));
  const hiddenExercisesList = activeTab.exercises.filter((ex) =>
    activeTab.hiddenRowIds.includes(ex.id)
  );

  const trackedPRExercises = activeTab.exercises
    .filter((ex) => ex.trackPR && !activeTab.hiddenRowIds.includes(ex.id))
    .map((ex) => ({
      id: ex.id,
      name: ex.name || 'Unnamed Lift',
      ...getExerciseBest1RMDetails(ex),
    }));

  const selectedWeek =
    visibleWeeks.find((w) => w.id === activeTab.activeWeekId) || visibleWeeks[0] || activeTab.weeks[0];

  const hiddenCount =
    hiddenWeeksList.length + hiddenExercisesList.length + (activeTab.hideNotesCols ? 1 : 0);

  const getWeekTonnage = (weekId) =>
    activeTab.exercises.reduce((exSum, ex) => {
      if (activeTab.hiddenRowIds.includes(ex.id)) return exSum;
      const setSum = ex.sets.reduce((sAcc, s) => {
        if (activeTab.hiddenRowIds.includes(s.id)) return sAcc;
        const entry = s.entries[weekId];
        if (!entry || entry.isGhost) return sAcc;
        return sAcc + parseSchemeMetrics(entry.scheme).tonnage;
      }, 0);
      return exSum + setSum;
    }, 0);

  const selectedWeekTonnage = selectedWeek ? getWeekTonnage(selectedWeek.id) : 0;

  const weeklyChartData = visibleWeeks.map((w) => {
    const parts = w.date.split('/');
    const shortDate = parts.length >= 2 ? `${parts[0]}/${parts[1]}` : w.date;
    return {
      id: w.id,
      date: w.date,
      shortDate,
      tonnage: getWeekTonnage(w.id),
    };
  });

  const pulseDuration =
    warpFactor === 9 ? '0.25s' : warpFactor === 6 ? '0.6s' : warpFactor === 3 ? '1.1s' : '1.8s';
  const activePlasmaColor = isRedAlert ? '#FF2A2A' : palette.plasma;
  const elbowMainColor = isRedAlert ? '#D92222' : palette.elbowPrimary;
  const elbowCapColor = isRedAlert ? '#FF5555' : palette.elbowSecondary;

  const driveBadgeInfo = (() => {
    if (!driveWebhookUrl.trim() || driveSyncStatus === 'NO_URL') {
      return { color: '#778899', text: 'G-DRIVE: NO URL' };
    }
    if (driveSyncStatus === 'SYNCING') {
      return { color: '#38E8FF', text: 'SYNCING...' };
    }
    if (driveSyncStatus === 'PENDING') {
      return { color: '#FFD13B', text: 'QUEUED...' };
    }
    if (driveSyncStatus === 'ERROR') {
      return { color: '#FF4444', text: 'SYNC ERROR' };
    }
    if (driveSyncStatus === 'SYNCED') {
      return { color: '#39FF14', text: `SYNCED ${lastSyncTime}` };
    }
    return { color: '#39FF14', text: 'G-DRIVE READY' };
  })();

  const chamferClip = !isModern
    ? 'none'
    : themeKey === 'klingon'
    ? 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 20px)'
    : themeKey === 'borg'
    ? 'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)'
    : 'polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)';

  const topDividerGlow = isRedAlert
    ? '2px solid #FF2A2A'
    : themeKey === 'borg'
    ? '2px solid #39FF14'
    : themeKey === 'klingon'
    ? '2px solid #FF6B00'
    : themeKey === 'imperial'
    ? '2px solid #F1FAEE'
    : themeKey === 'adventureTime'
    ? '2px solid #48F5C4'
    : themeKey === 'lotr'
    ? '2px solid #F4B942'
    : '2px solid rgba(255, 255, 255, 0.85)';

  const getTactileSwitchStyle = (accentColor, isActiveState = false) => ({
    background: isActiveState
      ? `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}AA 100%)`
      : `repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px), ${palette.metalGrad}`,
    color: isActiveState ? '#000' : accentColor,
    border: `1px solid ${accentColor}77`,
    borderLeft: `5px solid ${accentColor}`,
    borderTop: `1px solid ${palette.metalSheen}`,
    borderBottom: `2px solid ${palette.metalShadow}`,
    borderRadius: isModern ? '4px' : '12px',
    boxShadow: isActiveState
      ? `0 0 14px ${accentColor}88, inset 0 1px 2px rgba(255,255,255,0.7)`
      : `0 4px 8px ${palette.metalShadow}, inset 0 1px 1px ${palette.metalSheen}`,
    textShadow: isActiveState ? 'none' : `0 1px 2px #000`,
  });

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: palette.bgMain,
        backgroundImage: `
          linear-gradient(${palette.gridColor} 1px, transparent 1px),
          linear-gradient(90deg, ${palette.gridColor} 1px, transparent 1px),
          radial-gradient(circle at 50% 0%, ${palette.elbowPrimary}18 0%, ${palette.bgMain} 72%)
        `,
        backgroundSize: '26px 26px, 26px 26px, 100% 100%',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Orbitron:wght@600;800&family=Rajdhani:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        html, body {
          margin: 0;
          max-width: 100%;
          overflow-x: hidden;
          background: ${palette.bgMain};
          color: ${palette.elbowPrimary};
          font-family: 'Rajdhani', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        @keyframes dilithiumPulse {
          0% { opacity: 0.25; transform: scaleX(0.84); box-shadow: 0 0 6px ${activePlasmaColor}; }
          50% { opacity: 1; transform: scaleX(1.06); box-shadow: 0 0 18px ${activePlasmaColor}, 0 0 34px ${activePlasmaColor}; }
          100% { opacity: 0.25; transform: scaleX(0.84); box-shadow: 0 0 6px ${activePlasmaColor}; }
        }
        @keyframes redAlertBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes spinCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinCCW {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes enginePulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        .gyro-spin-slow { animation: spinCW 28s linear infinite; }
        .gyro-spin-fast { animation: spinCW 6s linear infinite; }
        .gyro-spin-reverse { animation: spinCCW 18s linear infinite; }
        .holo-engine-pulse { animation: enginePulse 1.6s ease-in-out infinite; }
        .tactile-key { transition: transform 0.08s ease, box-shadow 0.15s ease, filter 0.15s ease; }
        .tactile-key:hover { filter: brightness(1.18); }
        .tactile-key:active { transform: translateY(2px); }
        input:focus, textarea:focus { outline: 1px solid ${palette.highlight}; background: rgba(20, 30, 48, 0.85) !important; box-shadow: inset 0 0 10px ${palette.highlight}44; }

        .metallic-panel {
          background-image:
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 0px,
              rgba(255, 255, 255, 0.03) 1px,
              rgba(0, 0, 0, 0.08) 1px,
              rgba(0, 0, 0, 0.08) 3px
            ),
            ${palette.metalGrad};
          border-top: 1px solid ${palette.metalSheen} !important;
          border-left: 1px solid ${palette.metalSheen} !important;
          border-bottom: 2px solid ${palette.metalShadow} !important;
          border-right: 2px solid ${palette.metalShadow} !important;
          box-shadow:
            0 10px 26px ${palette.metalShadow},
            inset 0 1px 1px ${palette.metalSheen},
            inset 0 -2px 8px rgba(0, 0, 0, 0.75);
        }

        .recessed-screen-well {
          background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.62) 100%);
          border: 1px solid rgba(0, 0, 0, 0.85);
          border-bottom: 1px solid ${palette.metalSheen};
          border-right: 1px solid ${palette.metalSheen};
          box-shadow: inset 0 3px 12px rgba(0, 0, 0, 0.9);
          border-radius: 5px;
          padding: 8px 10px;
        }

        .lcars-shell { display: flex; gap: 10px; flex: 1; min-width: 0; }
        .lcars-sidebar { width: 178px; display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; }
        .lcars-top-elbow-corner { width: 178px; flex-shrink: 0; }
        .warp-chamber-stack { display: flex; flex-direction: column; gap: 5px; align-items: center; }
        .warp-segment { width: 84%; height: 10px; border-radius: ${themeKey === 'borg' || themeKey === 'imperial' ? '2px' : '999px'}; }

        @media (max-width: 768px) {
          .lcars-top-elbow-corner { display: none; }
          .lcars-shell { flex-direction: column; }
          .lcars-sidebar {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            background: rgba(16, 20, 28, 0.95);
            border: 1px solid ${palette.accentCool};
            border-radius: 8px;
            padding: 6px;
            gap: 5px;
          }
          .lcars-sidebar > button {
            flex: 1 1 calc(33.33% - 4px);
            min-width: 0;
            text-align: center !important;
            padding: 8px 4px !important;
            font-size: 10px !important;
          }
          .warp-core-card {
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: 6px 10px !important;
          }
          .warp-chamber-stack {
            flex-direction: row !important;
            gap: 4px !important;
          }
          .warp-segment {
            width: 16px !important;
            height: 9px !important;
          }
          .lcars-table textarea {
            font-size: 13px !important;
          }
          .lcars-table button {
            font-size: 8px !important;
            padding: 1px 4px !important;
          }
          .lcars-table input {
            font-size: 12px !important;
            padding: 6px 4px !important;
          }
        }
      `}</style>

      {/* TOP CONSOLE HEADER */}
      <div style={styles.topElbowWrapper}>
        <div
          className="lcars-top-elbow-corner metallic-panel"
          style={
            isModern
              ? {
                  ...styles.gunmetalCornerOuter,
                  clipPath:
                    themeKey === 'klingon'
                      ? 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)'
                      : 'polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)',
                }
              : {
                  ...styles.sweepingCornerOuter,
                  background: `linear-gradient(135deg, ${elbowCapColor} 0%, #222 100%)`,
                }
          }
        >
          <div
            style={
              isModern
                ? {
                    ...styles.gunmetalCornerInner,
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    clipPath:
                      themeKey === 'klingon'
                        ? 'polygon(22px 0, 100% 0, 100% 100%, 0 100%, 0 22px)'
                        : 'polygon(14px 0, 100% 0, 100% 100%, 0 100%, 0 14px)',
                  }
                : { ...styles.sweepingCornerInnerCutout, backgroundColor: palette.bgMain }
            }
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: palette.highlight, fontSize: '10px', letterSpacing: '0.5px' }}>
              {palette.registryTop} {isModern ? '' : sectorCode}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#8899AA', fontSize: '10px' }}>
              {isModern ? `${palette.registrySub} ${sectorCode}` : palette.registrySub}
            </span>
          </div>
        </div>

        <div style={styles.topConduitColumn}>
          <div
            className="metallic-panel"
            style={
              isModern
                ? {
                    ...styles.topBarModern,
                    padding: isMobile ? '7px 10px' : '8px 18px',
                    borderBottom: topDividerGlow,
                    boxShadow: isRedAlert
                      ? '0 2px 18px rgba(255, 42, 42, 0.6)'
                      : `0 4px 18px ${palette.elbowPrimary}33`,
                  }
                : {
                    ...styles.topBar,
                    padding: isMobile ? '7px 12px' : '8px 20px',
                    background: `linear-gradient(180deg, ${elbowMainColor} 0%, ${elbowMainColor}AA 100%)`,
                    boxShadow: `0 0 18px ${elbowMainColor}44`,
                  }
            }
          >
            <div style={{ ...styles.titleEditContainer, maxWidth: '100%', minWidth: 0 }}>
              {isEditingTitle ? (
                <input
                  autoFocus
                  value={missionTitle}
                  onChange={(e) => setMissionTitle(e.target.value)}
                  onBlur={() => {
                    setIsEditingTitle(false);
                    playLcarsChirp(1046, 0.05);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Escape') {
                      setIsEditingTitle(false);
                      playLcarsChirp(1046, 0.05);
                    }
                  }}
                  style={{
                    ...styles.missionTitleInput,
                    fontSize: isMobile ? '13px' : '18px',
                    width: isMobile ? '100%' : '340px',
                  }}
                />
              ) : (
                <div
                  onClick={() => setIsEditingTitle(true)}
                  title="Click to edit mission title"
                  style={{ ...styles.headerTitleWrapper, maxWidth: '100%' }}
                >
                  <span
                    style={{
                      ...styles.headerTitle,
                      fontSize: isMobile ? '13px' : '20px',
                      lineHeight: isMobile ? '1.2' : '1.3',
                      color: isModern ? palette.elbowPrimary : '#000',
                      textShadow: isModern
                        ? `0 2px 4px #000, 0 0 12px ${palette.elbowPrimary}88`
                        : '0 1px 0 rgba(255,255,255,0.4)',
                    }}
                  >
                    {missionTitle}
                  </span>
                  <span style={styles.titleEditBadge}>✎</span>
                </div>
              )}
            </div>

            <div style={{ ...styles.topRightTelemetry, width: isMobile ? '100%' : 'auto', gap: isMobile ? '5px' : '8px' }}>
              {isRedAlert && <div style={styles.redAlertPill}>RED ALERT</div>}

              <div
                style={{
                  ...styles.controlPillGroup,
                  width: isMobile ? '100%' : 'auto',
                  justifyContent: 'space-between',
                  padding: isMobile ? '3px 8px' : '3px 10px',
                  backgroundColor: isModern ? 'rgba(0,0,0,0.58)' : 'rgba(0,0,0,0.25)',
                  border: isModern ? `1px solid ${palette.metalSheen}` : 'none',
                  color: isModern ? palette.textMain : '#000',
                }}
              >
                <span style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: 700, letterSpacing: '0.6px', flexShrink: 0 }}>ALLOY:</span>
                <select
                  value={themeKey}
                  onChange={(e) => {
                    playLcarsChirp(1174, 0.06);
                    setThemeKey(e.target.value);
                  }}
                  style={{
                    ...styles.lcarsSelect,
                    maxWidth: isMobile ? '76vw' : 'none',
                    fontSize: isMobile ? '10px' : '11px',
                    padding: isMobile ? '2px 5px' : '2px 8px',
                    color: palette.highlight,
                    borderColor: palette.highlight,
                  }}
                >
                  {Object.entries(LCARS_THEMES).map(([k, val]) => (
                    <option key={k} value={k} style={{ background: '#0B0E14', color: '#E6ECF5' }}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  ...styles.controlPillGroup,
                  width: isMobile ? '100%' : 'auto',
                  justifyContent: 'space-between',
                  padding: isMobile ? '3px 8px' : '3px 10px',
                  backgroundColor: isModern ? 'rgba(0,0,0,0.58)' : 'rgba(0,0,0,0.25)',
                  border: isModern ? `1px solid ${palette.metalSheen}` : 'none',
                  color: isModern ? palette.textMain : '#000',
                }}
              >
                <span style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: 700, letterSpacing: '0.6px', flexShrink: 0 }}>DATE:</span>
                <select
                  value={selectedWeek?.id || ''}
                  onChange={(e) => {
                    playLcarsChirp(1046, 0.05);
                    selectActiveWeek(e.target.value);
                  }}
                  style={{
                    ...styles.lcarsSelect,
                    fontSize: isMobile ? '10px' : '11px',
                    padding: isMobile ? '2px 5px' : '2px 8px',
                    color: palette.highlight,
                    borderColor: palette.highlight,
                  }}
                >
                  {visibleWeeks.map((w) => (
                    <option key={w.id} value={w.id} style={{ background: '#0B0E14', color: '#E6ECF5' }}>
                      {w.date}
                    </option>
                  ))}
                </select>
                <span
                  style={{
                    ...styles.tonnageBadge,
                    fontSize: isMobile ? '11px' : '13px',
                    padding: isMobile ? '2px 7px' : '3px 10px',
                    color: palette.accentWarm,
                  }}
                >
                  {selectedWeekTonnage.toLocaleString()} LBS
                </span>
              </div>
            </div>
          </div>

          <div style={styles.microTickStrip}>
            {Array.from({ length: isMobile ? 28 : 42 }).map((_, idx) => {
              const isLit = (idx * 7 + tickSeed) % 5 === 0 || (timerActive && idx % 3 === 0);
              const isHot = (idx + tickSeed) % 11 === 0;
              const tickColor = isHot ? palette.tickHot : palette.elbowPrimary;
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: isMobile ? '4px' : '5px',
                    borderRadius: '1px',
                    backgroundColor: isLit || isHot ? tickColor : `${palette.elbowPrimary}22`,
                    boxShadow: isLit || isHot ? `0 0 6px ${tickColor}` : 'none',
                    transition: 'background-color 0.4s ease',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN BODY SHELL */}
      <div className="lcars-shell">
        <div className="lcars-sidebar">
          <div
            className="warp-core-card metallic-panel"
            style={{
              ...styles.warpCoreHousing,
              borderColor: isRedAlert ? '#FF2A2A' : palette.accentCool,
              borderRadius: isModern ? '6px' : '14px',
            }}
          >
            <div className="recessed-screen-well" style={{ width: '100%', display: 'flex', flexDirection: 'inherit', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
              <div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", color: palette.accentCool, fontSize: '10px', letterSpacing: '1px' }}>
                  {palette.coreLabel}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: activePlasmaColor,
                    fontSize: '15px',
                    fontWeight: 700,
                    marginBottom: '4px',
                    textShadow: `0 0 8px ${activePlasmaColor}88`,
                  }}
                >
                  {palette.corePrefix} {warpFactor}.0
                </div>
              </div>

              <div className="warp-chamber-stack" style={{ width: isMobile ? 'auto' : '100%' }}>
                {[0, 1, 2, 3, 4, 5].map((segment) => {
                  const isCenterChamber = segment === 2 || segment === 3;
                  return (
                    <div
                      key={segment}
                      className="warp-segment"
                      style={{
                        backgroundColor: activePlasmaColor,
                        border: isCenterChamber ? '1px solid rgba(255,255,255,0.65)' : 'none',
                        animation: `dilithiumPulse ${pulseDuration} infinite ease-in-out`,
                        animationDelay: `${Math.abs(2.5 - segment) * 0.14}s`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <button
            className="tactile-key"
            style={{ ...styles.lcarsBtn, ...getTactileSwitchStyle(palette.elbowPrimary) }}
            onClick={addExercise}
          >
            + ADD EXERCISE
          </button>
          <button
            className="tactile-key"
            style={{ ...styles.lcarsBtn, ...getTactileSwitchStyle(palette.highlight) }}
            onClick={() => addWeekColumn(true)}
            title="Adds next week and copies previous schemes as dimmed targets"
          >
            + ADD WEEK (COPY)
          </button>
          <button
            className="tactile-key"
            style={{ ...styles.lcarsBtn, ...getTactileSwitchStyle(palette.accentCool, activeTab.hideNotesCols) }}
            onClick={toggleHideNotes}
          >
            {activeTab.hideNotesCols ? 'SHOW NOTES' : 'HIDE NOTES'}
          </button>
          <button
            className="tactile-key"
            style={{
              ...styles.lcarsBtn,
              ...getTactileSwitchStyle(hiddenCount > 0 ? '#FF9966' : '#778899', showHiddenDrawer),
            }}
            onClick={() => {
              playLcarsChirp(987, 0.06);
              setShowHiddenDrawer((prev) => !prev);
            }}
          >
            HIDDEN ({hiddenCount})
          </button>
          <button
            className="tactile-key"
            style={{
              ...styles.lcarsBtn,
              ...getTactileSwitchStyle(wakeLockEnabled ? '#39FF14' : '#668877', wakeLockEnabled),
            }}
            onClick={toggleWakeLock}
          >
            WAKE: {wakeLockEnabled ? 'ON' : 'OFF'}
          </button>

          <button
            className="tactile-key"
            style={{
              ...styles.lcarsBtn,
              ...getTactileSwitchStyle(driveBadgeInfo.color),
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-end',
              gap: '2px',
            }}
            onClick={() => syncToGoogleDrive(true)}
            title="Immediately create/update this week's Google Sheet in Google Drive"
          >
            <span>SYNC TO DRIVE</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', opacity: 0.9 }}>
              ● {driveBadgeInfo.text}
            </span>
          </button>

          <button
            className="tactile-key"
            style={{
              ...styles.lcarsBtn,
              ...getTactileSwitchStyle('#9BB0C1', showDriveDrawer),
            }}
            onClick={() => {
              playLcarsChirp(987, 0.06);
              setShowDriveDrawer((prev) => !prev);
            }}
          >
            DRIVE CONFIG
          </button>

          <button
            className="tactile-key"
            style={{ ...styles.lcarsBtn, ...getTactileSwitchStyle(palette.accentWarm) }}
            onClick={() => {
              playLcarsChirp(880, 0.06);
              setHailBanner(pickRandomHail());
            }}
          >
            NEXT HAIL
          </button>
        </div>

        {/* RIGHT WORKSPACE */}
        <div style={styles.workspace}>
          {showDriveDrawer && (
            <div className="metallic-panel" style={styles.hiddenDrawer}>
              <div style={styles.hiddenDrawerHeader}>
                <span style={{ color: '#38E8FF' }}>
                  GOOGLE DRIVE WEEKLY SHEET UPLINK // APPS SCRIPT WEBHOOK CONFIGURATION
                </span>
                <button
                  onClick={() => setShowDriveDrawer(false)}
                  style={styles.closeDrawerBtn}
                >
                  CLOSE ×
                </button>
              </div>

              <div className="recessed-screen-well" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '13px', color: '#B8C9D9', lineHeight: '1.35' }}>
                  Paste your Google Apps Script <strong>Web app URL</strong> (ending in <code>/exec</code>) below. Each week date automatically creates or updates its own Google Sheet file inside your <strong>Captain_Matt_Workout_Logs</strong> folder on Google Drive.
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="url"
                    value={driveWebhookUrl}
                    onChange={(e) => setDriveWebhookUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
                    style={styles.driveUrlInput}
                  />

                  <button
                    onClick={() => {
                      playLcarsChirp(1046, 0.06);
                      setAutoDriveSync((prev) => !prev);
                    }}
                    style={{
                      ...styles.driveToggleBtn,
                      backgroundColor: autoDriveSync ? '#39FF14' : 'rgba(0,0,0,0.65)',
                      color: autoDriveSync ? '#000' : '#8899AA',
                      borderColor: autoDriveSync ? '#39FF14' : '#445566',
                    }}
                  >
                    AUTO-SYNC: {autoDriveSync ? 'ON (4S)' : 'OFF'}
                  </button>

                  <button
                    onClick={() => syncToGoogleDrive(true)}
                    style={{
                      ...styles.driveToggleBtn,
                      backgroundColor: '#38E8FF',
                      color: '#000',
                      borderColor: '#38E8FF',
                    }}
                  >
                    TEST &amp; SYNC NOW
                  </button>
                </div>
              </div>
            </div>
          )}

          {showHiddenDrawer && (
            <div className="metallic-panel" style={styles.hiddenDrawer}>
              <div style={styles.hiddenDrawerHeader}>
                <span>CONCEALED MATRIX ELEMENTS — SELECT INDIVIDUAL ITEM TO RESTORE:</span>
                <button
                  onClick={() => setShowHiddenDrawer(false)}
                  style={styles.closeDrawerBtn}
                >
                  CLOSE ×
                </button>
              </div>
              {hiddenCount === 0 ? (
                <div style={{ color: '#8899AA', fontSize: '14px' }}>
                  No week columns, exercises, or notes columns are currently hidden on this tab.
                </div>
              ) : (
                <div style={styles.hiddenPillsWrap}>
                  {hiddenWeeksList.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => unhideSingleWeek(w.id)}
                      style={styles.restoreWeekPill}
                    >
                      + UNHIDE WEEK: {w.date}
                    </button>
                  ))}
                  {hiddenExercisesList.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => unhideSingleExercise(ex.id)}
                      style={styles.restoreExPill}
                    >
                      + UNHIDE EXERCISE: {ex.name || 'Unnamed'}
                    </button>
                  ))}
                  {activeTab.hideNotesCols && (
                    <button onClick={toggleHideNotes} style={styles.restoreNotesPill}>
                      + UNHIDE NOTES COLUMNS
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TELEMETRY ROW 1 */}
          <div style={styles.telemetryRow}>
            <div
              className="metallic-panel"
              style={{
                ...styles.timerBox,
                borderRadius: isModern ? '4px' : '16px',
                clipPath: chamferClip,
              }}
            >
              <div className="recessed-screen-well" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '11px', color: palette.accentCool, letterSpacing: '1px' }}>
                    CHRONOMETER // {timerActive ? (hiitMode ? 'HIIT CYCLE' : 'ACTIVE') : 'STANDBY'}
                  </div>

                  {hiitMode && (
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: hiitPhase === 'WORK' ? '#FF2A2A' : palette.highlight,
                        color: '#000',
                        fontWeight: 700,
                      }}
                    >
                      RD {hiitRound} // {hiitPhase === 'WORK' ? '20S SPRINT' : '40S RECOVER'}
                    </span>
                  )}

                  <div style={styles.timerControls}>
                    {[60, 90, 120, 180].map((sec) => (
                      <button
                        key={sec}
                        className="tactile-key"
                        style={{
                          ...styles.pillBtn,
                          ...getTactileSwitchStyle(palette.elbowPrimary),
                          borderLeftWidth: '3px',
                        }}
                        onClick={() => startStandardTimer(sec)}
                      >
                        {sec}S
                      </button>
                    ))}
                    <button
                      className="tactile-key"
                      style={{
                        ...styles.pillBtn,
                        ...getTactileSwitchStyle(palette.highlight, hiitMode),
                        borderLeftWidth: '3px',
                      }}
                      onClick={startHiit2040}
                    >
                      20/40
                    </button>
                    <button
                      className="tactile-key"
                      style={{
                        ...styles.pillBtn,
                        ...getTactileSwitchStyle('#FF4444'),
                        borderLeftWidth: '3px',
                      }}
                      onClick={stopTimer}
                    >
                      ABORT
                    </button>
                  </div>
                </div>

                <GyroChronometerGauge
                  secondsLeft={secondsLeft}
                  totalSeconds={totalDuration}
                  activeColor={isRedAlert ? '#FF3B3B' : secondsLeft > 0 ? palette.highlight : palette.elbowPrimary}
                  secondaryColor={palette.accentCool}
                  isRunning={timerActive}
                />
              </div>
            </div>

            <div
              className="metallic-panel"
              style={{
                ...styles.oneRmBox,
                borderRadius: isModern ? '4px' : '16px',
                clipPath: chamferClip,
              }}
            >
              <div className="recessed-screen-well" style={{ display: 'flex', flexDirection: 'column', gap: '6px', height: '100%', justifyContent: 'space-between' }}>
                <div style={{ ...styles.oneRmHeader, color: palette.accentWarm }}>
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '11px' }}>
                    ★ PEAK EST. 1RM &amp; VOLUME TELEMETRY
                  </span>
                  <FactionShipWireframe
                    shipType={palette.shipType}
                    primaryColor={palette.elbowPrimary}
                    highlightColor={palette.highlight}
                  />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: '1 1 210px' }}>
                    {trackedPRExercises.length === 0 ? (
                      <div style={{ color: '#8899AA', fontSize: '13px', lineHeight: '1.3' }}>
                        Flag any lift with <strong>☆ PR</strong> below to monitor peak estimated 1RM.
                      </div>
                    ) : (
                      <div style={styles.oneRmGrid}>
                        {trackedPRExercises.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              ...styles.oneRmChip,
                              backgroundColor: 'rgba(0,0,0,0.55)',
                              borderColor: `${palette.accentCool}88`,
                            }}
                          >
                            <div style={{ color: palette.accentWarm, fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px' }}>
                              {item.name.toUpperCase()}
                            </div>
                            <div style={styles.oneRmValueRow}>
                              <span style={{ ...styles.oneRmBigNum, color: palette.elbowPrimary }}>
                                {item.est1RM > 0 ? `${item.est1RM} LBS` : '---'}
                              </span>
                              {item.bestSetLabel && (
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: palette.highlight, fontSize: '10px' }}>
                                  [{item.bestSetLabel}]
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <TonnageTelemetryChart
                    weeklyData={weeklyChartData}
                    selectedWeekId={selectedWeek?.id}
                    onSelectWeek={(wId) => {
                      playLcarsChirp(1046, 0.05);
                      selectActiveWeek(wId);
                    }}
                    primaryColor={palette.elbowPrimary}
                    highlightColor={palette.highlight}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* TELEMETRY ROW 2: SUBSPACE TRANSMISSION */}
          <div
            className="metallic-panel"
            style={{
              ...styles.quoteBoxFull,
              borderRadius: isModern ? '4px' : '16px',
              clipPath: chamferClip,
            }}
          >
            <div className="recessed-screen-well">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '4px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: palette.highlight,
                    fontSize: '11px',
                    letterSpacing: '1.2px',
                  }}
                >
                  SUBSPACE TRANSMISSION // {hailBanner.author}{' '}
                  {hailBanner.universe ? `[${hailBanner.universe.toUpperCase()}]` : ''}
                </div>

                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => {
                      playLcarsChirp(987, 0.05);
                      setQuoteFilter('ALL');
                      setHailBanner(pickRandomHail('ALL'));
                    }}
                    style={{
                      ...styles.hailFilterBtn,
                      backgroundColor: quoteFilter === 'ALL' ? palette.highlight : 'rgba(0,0,0,0.6)',
                      color: quoteFilter === 'ALL' ? '#000' : palette.highlight,
                      borderColor: palette.highlight,
                    }}
                  >
                    ALL UNIVERSES (220)
                  </button>
                  <button
                    onClick={() => {
                      playLcarsChirp(987, 0.05);
                      setQuoteFilter('THEME');
                      setHailBanner(pickRandomHail('THEME'));
                    }}
                    style={{
                      ...styles.hailFilterBtn,
                      backgroundColor: quoteFilter === 'THEME' ? palette.elbowPrimary : 'rgba(0,0,0,0.6)',
                      color: quoteFilter === 'THEME' ? '#000' : palette.elbowPrimary,
                      borderColor: palette.elbowPrimary,
                    }}
                  >
                    {palette.universe.toUpperCase()} ONLY (55)
                  </button>
                </div>
              </div>

              <div style={{ color: palette.textMain, fontSize: '17px', fontWeight: 600, lineHeight: '1.35' }}>
                "{hailBanner.text}"
              </div>
            </div>
          </div>

          {/* WORKBOOK TABS */}
          <div
            style={{
              ...styles.tabBar,
              borderBottomColor: elbowMainColor,
            }}
          >
            {tabs.map((tab, tIdx) => {
              const isActive = tab.id === activeTab.id;
              const isEditing = editingTabId === tab.id;

              return (
                <div
                  key={tab.id}
                  draggable={!isEditing}
                  onDragStart={() => setDraggedTabIdx(tIdx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleTabDrop(tIdx)}
                  onClick={() => {
                    if (!isActive) {
                      playLcarsChirp(1046, 0.05);
                      setActiveTabId(tab.id);
                    }
                  }}
                  onDoubleClick={() => startRenamingTab(tab)}
                  style={{
                    ...styles.tabPill,
                    borderTopLeftRadius: isModern ? '4px' : '12px',
                    borderTopRightRadius: isModern ? '4px' : '12px',
                    background: isActive
                      ? `linear-gradient(180deg, ${elbowMainColor} 0%, ${elbowMainColor}AA 100%)`
                      : palette.metalGrad,
                    color: isActive ? '#000' : elbowMainColor,
                    borderTop: `1px solid ${isActive ? '#FFF' : palette.metalSheen}`,
                    borderLeft: `1px solid ${isActive ? '#FFF' : palette.metalSheen}`,
                    borderRight: `1px solid #000`,
                    boxShadow: isActive ? `0 0 14px ${elbowMainColor}66` : '0 2px 6px rgba(0,0,0,0.7)',
                  }}
                >
                  {isActive && tIdx > 0 && (
                    <button
                      title="Move Tab Left"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveTab(tIdx, -1);
                      }}
                      style={styles.tabOrderBtn}
                    >
                      ◀
                    </button>
                  )}

                  {isEditing ? (
                    <input
                      autoFocus
                      value={editingTabName}
                      onChange={(e) => setEditingTabName(e.target.value)}
                      onBlur={commitTabRename}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitTabRename();
                        if (e.key === 'Escape') setEditingTabId(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      style={styles.tabRenameInput}
                    />
                  ) : (
                    <span style={{ padding: '0 4px', userSelect: 'none' }}>{tab.name}</span>
                  )}

                  {isActive && !isEditing && (
                    <button
                      title="Rename Tab"
                      onClick={(e) => {
                        e.stopPropagation();
                        startRenamingTab(tab);
                      }}
                      style={styles.tabEditBtn}
                    >
                      ✎
                    </button>
                  )}

                  {isActive && tIdx < tabs.length - 1 && (
                    <button
                      title="Move Tab Right"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveTab(tIdx, 1);
                      }}
                      style={styles.tabOrderBtn}
                    >
                      ▶
                    </button>
                  )}

                  {isActive && tabs.length > 1 && (
                    <button
                      title="Delete This Tab"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTab(tab.id, tab.name);
                      }}
                      style={styles.tabDelBtn}
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}

            <button
              className="tactile-key"
              onClick={addNewTab}
              style={{
                ...styles.tabPill,
                ...getTactileSwitchStyle(palette.accentCool),
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              + NEW TAB
            </button>
          </div>

          {/* METALLIC-FRAMED SPREADSHEET MATRIX */}
          <div
            className="metallic-panel"
            style={{
              ...styles.tableScroll,
              backgroundColor: palette.tableBg,
            }}
          >
            <table className="lcars-table" style={styles.table}>
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    style={{
                      ...styles.stickyExerciseTh,
                      minWidth: `${exColWidth}px`,
                      width: `${exColWidth}px`,
                      maxWidth: `${exColWidth}px`,
                      fontSize: isMobile ? '11px' : '13px',
                      padding: isMobile ? '6px 4px' : '10px',
                      background: `linear-gradient(180deg, ${elbowMainColor} 0%, ${elbowMainColor}AA 100%)`,
                      borderTop: '1px solid rgba(255,255,255,0.6)',
                    }}
                  >
                    EXERCISE
                  </th>
                  <th
                    rowSpan={2}
                    style={{
                      ...styles.stickySetTh,
                      left: `${exColWidth}px`,
                      minWidth: `${setColWidth}px`,
                      width: `${setColWidth}px`,
                      maxWidth: `${setColWidth}px`,
                      fontSize: isMobile ? '10px' : '11px',
                      padding: isMobile ? '4px 2px' : '6px',
                      background: `linear-gradient(180deg, ${palette.accentWarm} 0%, ${palette.accentWarm}AA 100%)`,
                      borderTop: '1px solid rgba(255,255,255,0.6)',
                    }}
                  >
                    SET
                  </th>
                  {visibleWeeks.map((week) => {
                    const isSelectedWeek = week.id === selectedWeek?.id;
                    const headerBg = isSelectedWeek ? palette.highlight : palette.accentCool;
                    return (
                      <th
                        key={week.id}
                        colSpan={activeTab.hideNotesCols ? 1 : 2}
                        onClick={() => selectActiveWeek(week.id)}
                        style={{
                          ...styles.weekDateTh,
                          background: `linear-gradient(180deg, ${headerBg} 0%, ${headerBg}AA 100%)`,
                          borderTop: '1px solid rgba(255,255,255,0.55)',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={styles.weekHeaderInner}>
                          {isSelectedWeek && <span title="Active Tonnage Column">★</span>}
                          <input
                            value={week.date}
                            onClick={(e) => {
                              e.stopPropagation();
                              selectActiveWeek(week.id);
                            }}
                            onChange={(e) => updateWeekDate(week.id, e.target.value)}
                            title="Click to edit date (MM/DD/YYYY)"
                            style={styles.weekDateInput}
                          />
                          <button
                            title="Hide This Date Column Block"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleHideWeek(week.id);
                            }}
                            style={styles.hideWeekBtn}
                          >
                            HIDE
                          </button>
                          <button
                            title="Permanently Delete This Date Column Block"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteWeekColumn(week.id, week.date);
                            }}
                            style={styles.deleteWeekBtn}
                          >
                            DEL
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>

                <tr>
                  {visibleWeeks.map((week) => {
                    const isSelectedWeek = week.id === selectedWeek?.id;
                    return (
                      <React.Fragment key={`${week.id}-sub`}>
                        <th
                          onClick={() => selectActiveWeek(week.id)}
                          style={{
                            ...styles.subColTh,
                            minWidth: isMobile ? '128px' : '150px',
                            fontSize: isMobile ? '11px' : '13px',
                            background: isSelectedWeek
                              ? `linear-gradient(180deg, ${palette.highlight}DD 0%, ${palette.highlight}99 100%)`
                              : palette.metalGrad,
                            color: isModern && !isSelectedWeek ? palette.textMain : '#000',
                            cursor: 'pointer',
                          }}
                        >
                          Weight × Reps × Sets
                        </th>
                        {!activeTab.hideNotesCols && (
                          <th
                            onClick={() => selectActiveWeek(week.id)}
                            style={{
                              ...styles.subColThNotes,
                              minWidth: isMobile ? '115px' : '145px',
                              fontSize: isMobile ? '11px' : '13px',
                              background: isSelectedWeek
                                ? `linear-gradient(180deg, ${palette.highlight}BB 0%, ${palette.highlight}88 100%)`
                                : palette.metalGrad,
                              color: isModern && !isSelectedWeek ? palette.textMain : '#000',
                              cursor: 'pointer',
                            }}
                          >
                            Notes
                          </th>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {activeTab.exercises.map((exercise, exIdx) => {
                  if (activeTab.hiddenRowIds.includes(exercise.id)) return null;
                  const visibleSets = exercise.sets.filter(
                    (s) => !activeTab.hiddenRowIds.includes(s.id)
                  );
                  if (visibleSets.length === 0) return null;

                  const best1RM = exercise.trackPR ? getExerciseBest1RMDetails(exercise).est1RM : 0;

                  return visibleSets.map((setItem, sIdx) => {
                    const isFirstSet = sIdx === 0;
                    const isLastSet = sIdx === visibleSets.length - 1;

                    return (
                      <tr
                        key={setItem.id}
                        style={{
                          borderBottom: isLastSet
                            ? `2px solid ${elbowMainColor}`
                            : '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {isFirstSet && (
                          <td
                            rowSpan={visibleSets.length}
                            style={{
                              ...styles.stickyExerciseTd,
                              minWidth: `${exColWidth}px`,
                              width: `${exColWidth}px`,
                              maxWidth: `${exColWidth}px`,
                              padding: isMobile ? '4px' : '6px 8px',
                              background: palette.metalGrad,
                              borderTop: `1px solid ${palette.metalSheen}`,
                            }}
                          >
                            <div style={styles.exerciseCellWrapper}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                  <button
                                    disabled={exIdx === 0}
                                    onClick={() => moveExercise(exIdx, -1)}
                                    title="Move Exercise Up"
                                    style={{
                                      ...styles.moveExBtn,
                                      color: elbowMainColor,
                                      opacity: exIdx === 0 ? 0.25 : 1,
                                    }}
                                  >
                                    ▲
                                  </button>
                                  <button
                                    disabled={exIdx === activeTab.exercises.length - 1}
                                    onClick={() => moveExercise(exIdx, 1)}
                                    title="Move Exercise Down"
                                    style={{
                                      ...styles.moveExBtn,
                                      color: elbowMainColor,
                                      opacity: exIdx === activeTab.exercises.length - 1 ? 0.25 : 1,
                                    }}
                                  >
                                    ▼
                                  </button>
                                </div>

                                <textarea
                                  rows={Math.max(1, Math.min(3, visibleSets.length))}
                                  value={exercise.name}
                                  placeholder="Exercise Name..."
                                  onChange={(e) => updateExerciseName(exercise.id, e.target.value)}
                                  style={{ ...styles.exerciseNameInput, color: palette.textMain }}
                                />
                              </div>

                              <div style={styles.exerciseActionRow}>
                                <button
                                  title="Toggle Personal Record (PR) & Est. 1RM Tracking"
                                  onClick={() => toggleExercisePR(exercise.id)}
                                  style={{
                                    ...styles.prToggleBtn,
                                    backgroundColor: exercise.trackPR ? '#FFCC00' : 'rgba(0,0,0,0.55)',
                                    color: exercise.trackPR ? '#000' : '#8899AA',
                                    border: exercise.trackPR ? '1px solid #FFF' : '1px solid #3A4454',
                                    boxShadow: exercise.trackPR ? '0 0 8px #FFCC0088' : 'none',
                                  }}
                                >
                                  {exercise.trackPR ? '★ PR ON' : '☆ PR'}
                                </button>
                                <button
                                  title="Add Sub-Row"
                                  onClick={() => addSubSetRow(exercise.id)}
                                  style={styles.addSubRowBtn}
                                >
                                  + SUB
                                </button>
                                <button
                                  title="Hide Exercise"
                                  onClick={() => toggleHideRow(exercise.id)}
                                  style={styles.hideExerciseBtn}
                                >
                                  HIDE
                                </button>
                                <button
                                  title="Delete Exercise"
                                  onClick={() => deleteExercise(exercise.id, exercise.name)}
                                  style={styles.deleteExerciseBtn}
                                >
                                  DEL
                                </button>
                              </div>
                            </div>
                          </td>
                        )}

                        <td
                          style={{
                            ...styles.stickySetTd,
                            left: `${exColWidth}px`,
                            minWidth: `${setColWidth}px`,
                            width: `${setColWidth}px`,
                            maxWidth: `${setColWidth}px`,
                            padding: isMobile ? '2px' : '4px',
                            background: palette.metalGrad,
                            borderRight: `3px solid ${elbowMainColor}`,
                          }}
                        >
                          <div style={styles.setRowControlInner}>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: palette.highlight, fontSize: isMobile ? '11px' : '12px', fontWeight: 700 }}>
                              #{sIdx + 1}
                            </span>
                            {visibleSets.length > 1 && (
                              <button
                                title={`Delete Set Row #${sIdx + 1}`}
                                onClick={() => deleteSubSetRow(exercise.id, setItem.id)}
                                style={styles.deleteSubRowBtn}
                              >
                                ×
                              </button>
                            )}
                          </div>
                        </td>

                        {visibleWeeks.map((week) => {
                          const entry = setItem.entries[week.id] || {
                            scheme: '',
                            notes: '',
                            isGhost: false,
                          };
                          const isSelectedWeek = week.id === selectedWeek?.id;
                          const cellMetrics = parseSchemeMetrics(entry.scheme);
                          const isPRCell =
                            exercise.trackPR &&
                            !entry.isGhost &&
                            best1RM > 0 &&
                            cellMetrics.est1RM === best1RM;

                          return (
                            <React.Fragment key={`${setItem.id}-${week.id}`}>
                              <td
                                onClick={() => selectActiveWeek(week.id)}
                                style={{
                                  ...styles.schemeTd,
                                  backgroundColor: isPRCell
                                    ? 'rgba(255, 215, 0, 0.14)'
                                    : isSelectedWeek
                                    ? 'rgba(255, 255, 255, 0.05)'
                                    : 'rgba(0, 0, 0, 0.45)',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <input
                                    value={entry.scheme}
                                    placeholder="315 x 5 x 4"
                                    title={
                                      entry.isGhost
                                        ? 'Copied target from previous week — edit or confirm to log'
                                        : isPRCell
                                        ? `All-Time PR (${best1RM} lb Est. 1RM)`
                                        : ''
                                    }
                                    onFocus={() => selectActiveWeek(week.id)}
                                    onChange={(e) =>
                                      updateSetCell(
                                        exercise.id,
                                        setItem.id,
                                        week.id,
                                        'scheme',
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      ...styles.schemeInput,
                                      color: isPRCell
                                        ? '#FFD700'
                                        : entry.isGhost
                                        ? '#566A7E'
                                        : palette.highlight,
                                      fontStyle: entry.isGhost ? 'italic' : 'normal',
                                    }}
                                  />
                                  {isPRCell && (
                                    <span style={styles.cellPrBadge} title="Peak Est. 1RM">
                                      ★PR
                                    </span>
                                  )}
                                </div>
                              </td>

                              {!activeTab.hideNotesCols && (
                                <td
                                  onClick={() => selectActiveWeek(week.id)}
                                  style={{
                                    ...styles.notesTd,
                                    borderRight: `3px solid ${palette.accentCool}`,
                                    backgroundColor: isSelectedWeek
                                      ? 'rgba(255, 255, 255, 0.03)'
                                      : 'rgba(0, 0, 0, 0.55)',
                                  }}
                                >
                                  <input
                                    value={entry.notes}
                                    placeholder=""
                                    onFocus={() => selectActiveWeek(week.id)}
                                    onChange={(e) =>
                                      updateSetCell(
                                        exercise.id,
                                        setItem.id,
                                        week.id,
                                        'notes',
                                        e.target.value
                                      )
                                    }
                                    style={{ ...styles.notesInput, color: palette.textMain }}
                                  />
                                </td>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', width: '100%', maxWidth: '100%', overflowX: 'hidden', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' },
  topElbowWrapper: { display: 'flex', alignItems: 'stretch', gap: '6px', width: '100%', maxWidth: '100%', minWidth: 0 },
  sweepingCornerOuter: { borderTopLeftRadius: '64px', paddingLeft: '24px', paddingTop: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' },
  sweepingCornerInnerCutout: { borderTopLeftRadius: '28px', flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '2px' },
  gunmetalCornerOuter: { padding: '4px', display: 'flex', flexDirection: 'column' },
  gunmetalCornerInner: { flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '2px' },
  topConduitColumn: { flex: 1, minWidth: 0, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '5px' },
  topBar: { flex: 1, minWidth: 0, maxWidth: '100%', borderTopRightRadius: '999px', borderBottomRightRadius: '999px', padding: '8px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#000', flexWrap: 'wrap', gap: '8px' },
  topBarModern: { flex: 1, minWidth: 0, maxWidth: '100%', padding: '8px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderTopRightRadius: '8px' },
  microTickStrip: { height: '7px', width: '100%', maxWidth: '100%', display: 'flex', gap: '3px', alignItems: 'center', padding: '1px 2px', backgroundColor: 'rgba(0,0,0,0.55)' },
  titleEditContainer: { display: 'flex', alignItems: 'center', minWidth: 0 },
  headerTitleWrapper: { display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '2px 4px', borderRadius: '6px', minWidth: 0 },
  headerTitle: { fontFamily: "'Orbitron', sans-serif", fontSize: '20px', fontWeight: 800, letterSpacing: '1px' },
  titleEditBadge: { backgroundColor: '#000', color: '#FF9900', fontSize: '11px', padding: '2px 5px', borderRadius: '4px', flexShrink: 0 },
  missionTitleInput: { backgroundColor: '#000', color: '#00E5FF', border: '1px solid #00E5FF', borderRadius: '6px', fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: 700, padding: '3px 10px', width: '340px', maxWidth: '100%' },
  topRightTelemetry: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', maxWidth: '100%', minWidth: 0 },
  redAlertPill: { fontFamily: "'Orbitron', sans-serif", backgroundColor: '#000', color: '#FF2A2A', border: '1px solid #FF2A2A', borderRadius: '4px', padding: '3px 10px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', animation: 'redAlertBlink 0.7s infinite' },
  controlPillGroup: { display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: '6px', maxWidth: '100%', minWidth: 0 },
  lcarsSelect: { backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #00E5FF', borderRadius: '4px', padding: '2px 8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 700, cursor: 'pointer', minWidth: 0 },
  tonnageBadge: { fontFamily: "'JetBrains Mono', monospace", backgroundColor: 'rgba(0,0,0,0.8)', padding: '3px 10px', borderRadius: '4px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', whiteSpace: 'nowrap', flexShrink: 0 },
  warpCoreHousing: { padding: '6px', textAlign: 'center' },
  lcarsBtn: { padding: '9px 12px', fontFamily: "'Orbitron', sans-serif", fontSize: '11px', fontWeight: 700, cursor: 'pointer', textAlign: 'right', letterSpacing: '0.8px' },
  workspace: { flex: 1, minWidth: 0, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' },
  hiddenDrawer: { borderRadius: '8px', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' },
  hiddenDrawerHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FF9966', fontSize: '13px', fontWeight: 700, letterSpacing: '0.8px' },
  closeDrawerBtn: { backgroundColor: '#331111', color: '#FF7777', border: '1px solid #FF5555', borderRadius: '4px', padding: '2px 10px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' },
  hiddenPillsWrap: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  restoreWeekPill: { backgroundColor: '#00E5FF', color: '#000', border: 'none', borderRadius: '4px', padding: '5px 12px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '12px', cursor: 'pointer' },
  restoreExPill: { backgroundColor: '#CC99CC', color: '#000', border: 'none', borderRadius: '4px', padding: '5px 12px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '12px', cursor: 'pointer' },
  restoreNotesPill: { backgroundColor: '#9999FF', color: '#000', border: 'none', borderRadius: '4px', padding: '5px 12px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '12px', cursor: 'pointer' },
  driveUrlInput: { flex: '1 1 320px', backgroundColor: 'rgba(0,0,0,0.75)', color: '#38E8FF', border: '1px solid #38E8FF', borderRadius: '4px', padding: '6px 10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' },
  driveToggleBtn: { border: '1px solid', borderRadius: '4px', padding: '6px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 700, cursor: 'pointer' },
  telemetryRow: { display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: '100%' },
  timerBox: { flex: '1 1 285px', minWidth: 0, maxWidth: '100%', padding: '7px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  timerControls: { display: 'flex', flexWrap: 'wrap', gap: '5px' },
  pillBtn: { padding: '5px 9px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '11px', cursor: 'pointer' },
  oneRmBox: { flex: '1 1 360px', minWidth: 0, maxWidth: '100%', padding: '7px', display: 'flex', flexDirection: 'column' },
  oneRmHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', letterSpacing: '0.8px', fontWeight: 700 },
  oneRmGrid: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  oneRmChip: { border: '1px solid #806B00', borderRadius: '5px', padding: '5px 9px', flex: '1 1 125px', boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.8)' },
  oneRmValueRow: { display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' },
  oneRmBigNum: { fontFamily: "'JetBrains Mono', monospace", fontSize: '15px', fontWeight: 700 },
  quoteBoxFull: { width: '100%', maxWidth: '100%', minWidth: 0, padding: '7px' },
  hailFilterBtn: { fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '3px', border: '1px solid', cursor: 'pointer', letterSpacing: '0.5px' },
  tabBar: { display: 'flex', flexWrap: 'wrap', gap: '6px', borderBottom: '2px solid #FF9900', paddingBottom: '6px', alignItems: 'center', maxWidth: '100%' },
  tabPill: { display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontFamily: "'Orbitron', sans-serif", fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.8px', maxWidth: '100%' },
  tabOrderBtn: { backgroundColor: 'rgba(0,0,0,0.65)', color: '#FF9900', border: 'none', borderRadius: '4px', fontSize: '10px', padding: '2px 5px', cursor: 'pointer' },
  tabEditBtn: { backgroundColor: 'rgba(0,0,0,0.65)', color: '#00E5FF', border: 'none', borderRadius: '4px', fontSize: '11px', padding: '1px 5px', cursor: 'pointer' },
  tabDelBtn: { backgroundColor: '#3B0D0D', color: '#FF6666', border: '1px solid #FF4444', borderRadius: '4px', fontSize: '10px', padding: '1px 5px', cursor: 'pointer', marginLeft: '2px' },
  tabRenameInput: { backgroundColor: '#000', color: '#00E5FF', border: '1px solid #00E5FF', borderRadius: '4px', fontFamily: "'Orbitron', sans-serif", fontSize: '12px', fontWeight: 700, padding: '1px 6px', width: '130px' },
  tableScroll: { overflowX: 'auto', maxWidth: '100%', borderRadius: '8px', padding: '3px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  stickyExerciseTh: { position: 'sticky', left: 0, zIndex: 3, color: '#000', borderRight: '2px solid #000', borderBottom: '2px solid #000', textAlign: 'center', fontFamily: "'Orbitron', sans-serif", fontWeight: 800, letterSpacing: '1px' },
  stickySetTh: { position: 'sticky', zIndex: 3, color: '#000', borderRight: '3px solid #000', borderBottom: '2px solid #000', textAlign: 'center', fontFamily: "'Orbitron', sans-serif", fontWeight: 800 },
  weekDateTh: { color: '#000', padding: '6px 8px', borderRight: '3px solid #000', borderBottom: '1px solid #000', textAlign: 'center' },
  weekHeaderInner: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' },
  weekDateInput: { backgroundColor: 'rgba(0,0,0,0.14)', border: '1px dashed rgba(0,0,0,0.5)', borderRadius: '4px', color: '#000', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 700, textAlign: 'center', width: '102px', padding: '2px 4px' },
  hideWeekBtn: { backgroundColor: '#000', color: '#9999FF', border: 'none', borderRadius: '4px', fontSize: '10px', padding: '3px 6px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 },
  deleteWeekBtn: { backgroundColor: '#3B0D0D', color: '#FF6666', border: '1px solid #FF3333', borderRadius: '4px', fontSize: '10px', padding: '2px 6px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 },
  subColTh: { padding: '5px 8px', fontWeight: 700, borderRight: '1px solid rgba(0,0,0,0.4)', borderBottom: '2px solid #000', textAlign: 'center', letterSpacing: '0.5px' },
  subColThNotes: { padding: '5px 8px', fontWeight: 700, borderRight: '3px solid #000', borderBottom: '2px solid #000', textAlign: 'center', letterSpacing: '0.5px' },
  stickyExerciseTd: { position: 'sticky', left: 0, zIndex: 2, borderRight: '1px solid rgba(255,255,255,0.14)', verticalAlign: 'middle' },
  stickySetTd: { position: 'sticky', zIndex: 2, verticalAlign: 'middle' },
  setRowControlInner: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' },
  exerciseCellWrapper: { display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center' },
  moveExBtn: { backgroundColor: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '3px', fontSize: '9px', padding: '1px 4px', cursor: 'pointer', lineHeight: '1.1' },
  exerciseNameInput: { width: '100%', backgroundColor: 'transparent', border: 'none', fontFamily: "'Rajdhani', sans-serif", fontSize: '16px', fontWeight: 700, textAlign: 'center', resize: 'none', lineHeight: '1.2' },
  exerciseActionRow: { display: 'flex', justifyContent: 'center', gap: '3px', flexWrap: 'wrap' },
  prToggleBtn: { borderRadius: '4px', fontSize: '9px', padding: '2px 5px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 },
  addSubRowBtn: { backgroundColor: '#0A2530', color: '#38E8FF', border: '1px solid #38E8FF66', borderRadius: '4px', fontSize: '9px', padding: '2px 5px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 },
  hideExerciseBtn: { backgroundColor: '#292010', color: '#FFCC66', border: '1px solid #FF990066', borderRadius: '4px', fontSize: '9px', padding: '2px 5px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 },
  deleteExerciseBtn: { backgroundColor: '#360D0D', color: '#FF5555', border: '1px solid #FF333366', borderRadius: '4px', fontSize: '9px', padding: '2px 5px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 },
  schemeTd: { padding: 0 },
  notesTd: { padding: 0 },
  schemeInput: { width: '100%', backgroundColor: 'transparent', border: 'none', padding: '9px 8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 700, textAlign: 'center' },
  cellPrBadge: { fontFamily: "'JetBrains Mono', monospace", backgroundColor: '#FFD700', color: '#000', fontSize: '9px', fontWeight: 700, padding: '1px 4px', borderRadius: '3px', marginRight: '4px', whiteSpace: 'nowrap' },
  notesInput: { width: '100%', backgroundColor: 'transparent', border: 'none', padding: '9px 8px', fontFamily: "'Rajdhani', sans-serif", fontSize: '15px', fontWeight: 600 },
  deleteSubRowBtn: { backgroundColor: '#360D0D', color: '#FF5555', border: '1px solid #FF333366', borderRadius: '3px', fontSize: '11px', fontWeight: 700, padding: '0px 5px', cursor: 'pointer', lineHeight: '1.2' },
};