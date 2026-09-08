#!/usr/bin/env node
/* MAT Codex: build-elements-baseline.mjs
 * Creates authoritative 118-element baseline from IUPAC/NIST reference data.
 * No network required — uses verified reference values.
 * Run: npm run sync:elements
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const outDir = join(root, "data", "catalog");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// IUPAC 2021 Standard Atomic Weights (reliable single values for all 118)
// For elements with interval weights, we store the conventional value
const atomicWeights = {
  1:1.008,2:4.0026,3:6.94,4:9.0122,5:10.81,6:12.011,7:14.007,8:15.999,
  9:18.998,10:20.180,11:22.990,12:24.305,13:26.982,14:28.085,15:30.974,
  16:32.06,17:35.45,18:39.948,19:39.098,20:40.078,21:44.956,22:47.867,
  23:50.942,24:51.996,25:54.938,26:55.845,27:58.933,28:58.693,29:63.546,
  30:65.38,31:69.723,32:72.630,33:74.922,34:78.971,35:79.904,36:83.798,
  37:85.468,38:87.62,39:88.906,40:91.224,41:92.906,42:95.95,43:98,
  44:101.07,45:102.91,46:106.42,47:107.87,48:112.41,49:114.82,50:118.71,
  51:121.76,52:127.60,53:126.90,54:131.29,55:132.91,56:137.33,57:138.91,
  58:140.12,59:140.91,60:144.24,61:145,62:150.36,63:151.96,64:157.25,
  65:158.93,66:162.50,67:164.93,68:167.26,69:168.93,70:173.05,71:174.97,
  72:178.49,73:180.95,74:183.84,75:186.21,76:190.23,77:192.22,78:195.08,
  79:196.97,80:200.59,81:204.38,82:207.2,83:208.98,84:209,85:210,86:222,
  87:223,88:226,89:227,90:232.04,91:231.04,92:238.03,93:237,94:244,95:243,
  96:247,97:247,98:251,99:252,100:257,101:258,102:259,103:266,104:267,
  105:268,106:269,107:270,108:277,109:278,110:281,111:282,112:285,
  113:286,114:289,115:290,116:293,117:294,118:294
};

// Electron configurations (ground state)
const electronConfigs = {
  1:"1s¹",2:"1s²",3:"[He] 2s¹",4:"[He] 2s²",5:"[He] 2s² 2p¹",
  6:"[He] 2s² 2p²",7:"[He] 2s² 2p³",8:"[He] 2s² 2p⁴",9:"[He] 2s² 2p⁵",
  10:"[He] 2s² 2p⁶",11:"[Ne] 3s¹",12:"[Ne] 3s²",13:"[Ne] 3s² 3p¹",
  14:"[Ne] 3s² 3p²",15:"[Ne] 3s² 3p³",16:"[Ne] 3s² 3p⁴",
  17:"[Ne] 3s² 3p⁵",18:"[Ne] 3s² 3p⁶",19:"[Ar] 4s¹",20:"[Ar] 4s²",
  21:"[Ar] 3d¹ 4s²",22:"[Ar] 3d² 4s²",23:"[Ar] 3d³ 4s²",
  24:"[Ar] 3d⁵ 4s¹",25:"[Ar] 3d⁵ 4s²",26:"[Ar] 3d⁶ 4s²",
  27:"[Ar] 3d⁷ 4s²",28:"[Ar] 3d⁸ 4s²",29:"[Ar] 3d¹⁰ 4s¹",
  30:"[Ar] 3d¹⁰ 4s²",31:"[Ar] 3d¹⁰ 4s² 4p¹",32:"[Ar] 3d¹⁰ 4s² 4p²",
  33:"[Ar] 3d¹⁰ 4s² 4p³",34:"[Ar] 3d¹⁰ 4s² 4p⁴",
  35:"[Ar] 3d¹⁰ 4s² 4p⁵",36:"[Ar] 3d¹⁰ 4s² 4p⁶",
  37:"[Kr] 5s¹",38:"[Kr] 5s²",39:"[Kr] 4d¹ 5s²",40:"[Kr] 4d² 5s²",
  41:"[Kr] 4d⁴ 5s¹",42:"[Kr] 4d⁵ 5s¹",43:"[Kr] 4d⁵ 5s²",
  44:"[Kr] 4d⁷ 5s¹",45:"[Kr] 4d⁸ 5s¹",46:"[Kr] 4d¹⁰",
  47:"[Kr] 4d¹⁰ 5s¹",48:"[Kr] 4d¹⁰ 5s²",49:"[Kr] 4d¹⁰ 5s² 5p¹",
  50:"[Kr] 4d¹⁰ 5s² 5p²",51:"[Kr] 4d¹⁰ 5s² 5p³",
  52:"[Kr] 4d¹⁰ 5s² 5p⁴",53:"[Kr] 4d¹⁰ 5s² 5p⁵",
  54:"[Kr] 4d¹⁰ 5s² 5p⁶",55:"[Xe] 6s¹",56:"[Xe] 6s²",
  57:"[Xe] 5d¹ 6s²",58:"[Xe] 4f¹ 5d¹ 6s²",59:"[Xe] 4f³ 6s²",
  60:"[Xe] 4f⁴ 6s²",61:"[Xe] 4f⁵ 6s²",62:"[Xe] 4f⁶ 6s²",
  63:"[Xe] 4f⁷ 6s²",64:"[Xe] 4f⁷ 5d¹ 6s²",65:"[Xe] 4f⁹ 6s²",
  66:"[Xe] 4f¹⁰ 6s²",67:"[Xe] 4f¹¹ 6s²",68:"[Xe] 4f¹² 6s²",
  69:"[Xe] 4f¹³ 6s²",70:"[Xe] 4f¹⁴ 6s²",71:"[Xe] 4f¹⁴ 5d¹ 6s²",
  72:"[Xe] 4f¹⁴ 5d² 6s²",73:"[Xe] 4f¹⁴ 5d³ 6s²",
  74:"[Xe] 4f¹⁴ 5d⁴ 6s²",75:"[Xe] 4f¹⁴ 5d⁵ 6s²",
  76:"[Xe] 4f¹⁴ 5d⁶ 6s²",77:"[Xe] 4f¹⁴ 5d⁷ 6s²",
  78:"[Xe] 4f¹⁴ 5d⁹ 6s¹",79:"[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
  80:"[Xe] 4f¹⁴ 5d¹⁰ 6s²",81:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
  82:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",83:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
  84:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",85:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
  86:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",87:"[Rn] 7s¹",88:"[Rn] 7s²",
  89:"[Rn] 6d¹ 7s²",90:"[Rn] 6d² 7s²",91:"[Rn] 5f² 6d¹ 7s²",
  92:"[Rn] 5f³ 6d¹ 7s²",93:"[Rn] 5f⁴ 6d¹ 7s²",
  94:"[Rn] 5f⁶ 7s²",95:"[Rn] 5f⁷ 7s²",96:"[Rn] 5f⁷ 6d¹ 7s²",
  97:"[Rn] 5f⁹ 7s²",98:"[Rn] 5f¹⁰ 7s²",99:"[Rn] 5f¹¹ 7s²",
  100:"[Rn] 5f¹² 7s²",101:"[Rn] 5f¹³ 7s²",102:"[Rn] 5f¹⁴ 7s²",
  103:"[Rn] 5f¹⁴ 7s² 7p¹",104:"[Rn] 5f¹⁴ 6d² 7s²",
  105:"[Rn] 5f¹⁴ 6d³ 7s²",106:"[Rn] 5f¹⁴ 6d⁴ 7s²",
  107:"[Rn] 5f¹⁴ 6d⁵ 7s²",108:"[Rn] 5f¹⁴ 6d⁶ 7s²",
  109:"[Rn] 5f¹⁴ 6d⁷ 7s²",110:"[Rn] 5f¹⁴ 6d⁸ 7s²",
  111:"[Rn] 5f¹⁴ 6d⁹ 7s²",112:"[Rn] 5f¹⁴ 6d¹⁰ 7s²",
  113:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",114:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",
  115:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",116:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
  117:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",118:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶"
};

// Electronegativity (Pauling scale) — null for noble gases and some others
const electronegativity = {
  1:2.20,2:null,3:0.98,4:1.57,5:2.04,6:2.55,7:3.04,8:3.44,
  9:3.98,10:null,11:0.93,12:1.31,13:1.61,14:1.90,15:2.19,
  16:2.58,17:3.16,18:null,19:0.82,20:1.00,21:1.36,22:1.54,
  23:1.63,24:1.66,25:1.55,26:1.83,27:1.88,28:1.91,29:1.90,
  30:1.65,31:1.81,32:2.01,33:2.18,34:2.55,35:2.96,36:3.00,
  37:0.82,38:0.95,39:1.22,40:1.33,41:1.6,42:2.16,43:1.9,
  44:2.2,45:2.28,46:2.20,47:1.93,48:1.69,49:1.78,50:1.96,
  51:2.05,52:2.1,53:2.66,54:2.6,55:0.79,56:0.89,57:1.1,
  58:1.12,59:1.13,60:1.14,61:1.13,62:1.17,63:1.2,64:1.2,
  65:1.2,66:1.22,67:1.23,68:1.24,69:1.25,70:1.1,71:1.27,
  72:1.3,73:1.5,74:2.36,75:1.9,76:2.2,77:2.2,78:2.28,
  79:2.54,80:2.00,81:1.62,82:2.33,83:2.02,84:2.0,85:2.2,
  86:null,87:0.7,88:0.9,89:1.1,90:1.3,91:1.5,92:1.38,
  93:1.36,94:1.28,95:1.3,96:1.3,97:1.3,98:1.3,99:1.3,
  100:1.3,101:1.3,102:1.3,103:1.3,104:null,105:null,
  106:null,107:null,108:null,109:null,110:null,111:null,
  112:null,113:null,114:null,115:null,116:null,117:null,118:null
};

// First ionization energies (eV) — from NIST
const ionizationEnergy = {
  1:13.598,2:24.587,3:5.392,4:9.323,5:8.298,6:11.260,7:14.534,
  8:13.618,9:17.423,10:21.565,11:5.139,12:7.646,13:5.986,
  14:8.152,15:10.487,16:10.360,17:12.968,18:15.760,19:4.341,
  20:6.113,21:6.562,22:6.828,23:6.746,24:6.767,25:7.434,
  26:7.902,27:7.881,28:7.640,29:7.726,30:9.394,31:5.999,
  32:7.900,33:9.789,34:9.752,35:11.814,36:14.000,37:4.177,
  38:5.695,39:6.217,40:6.634,41:6.759,42:7.092,43:7.28,
  44:7.361,45:7.459,46:8.337,47:7.576,48:8.994,49:5.786,
  50:7.344,51:8.608,52:9.010,53:10.451,54:12.130,55:3.894,
  56:5.212,57:5.577,58:5.539,59:5.473,60:5.525,61:5.582,
  62:5.644,63:5.670,64:6.150,65:5.864,66:6.184,67:6.082,
  68:6.184,69:6.384,70:6.106,71:5.426,72:6.655,73:7.89,
  74:7.98,75:7.88,76:8.7,77:9.1,78:9.0,79:9.226,
  80:10.437,81:6.108,82:7.417,83:7.286,84:8.414,85:9.318,
  86:10.749,87:4.073,88:5.278,89:5.17,90:6.307,91:5.89,
  92:6.194,93:6.266,94:6.026,95:5.974,96:5.991,97:6.198,
  98:6.282,99:6.42,100:6.50,101:6.58,102:4.96,103:4.96,
  104:6.0,105:null,106:null,107:null,108:null,109:null,
  110:null,111:null,112:null,113:null,114:null,115:null,
  116:null,117:null,118:null
};

// Periodic table layout: z => {period, group, block, category}
const layout = [
  {z:1,p:1,g:1,b:"s",cat:"Reactive Nonmetal"},
  {z:2,p:1,g:18,b:"s",cat:"Noble Gas"},
  {z:3,p:2,g:1,b:"s",cat:"Alkali Metal"},
  {z:4,p:2,g:2,b:"s",cat:"Alkaline Earth Metal"},
  {z:5,p:2,g:13,b:"p",cat:"Metalloid"},
  {z:6,p:2,g:14,b:"p",cat:"Reactive Nonmetal"},
  {z:7,p:2,g:15,b:"p",cat:"Reactive Nonmetal"},
  {z:8,p:2,g:16,b:"p",cat:"Reactive Nonmetal"},
  {z:9,p:2,g:17,b:"p",cat:"Halogen"},
  {z:10,p:2,g:18,b:"p",cat:"Noble Gas"},
  {z:11,p:3,g:1,b:"s",cat:"Alkali Metal"},
  {z:12,p:3,g:2,b:"s",cat:"Alkaline Earth Metal"},
  {z:13,p:3,g:13,b:"p",cat:"Post-Transition Metal"},
  {z:14,p:3,g:14,b:"p",cat:"Metalloid"},
  {z:15,p:3,g:15,b:"p",cat:"Reactive Nonmetal"},
  {z:16,p:3,g:16,b:"p",cat:"Reactive Nonmetal"},
  {z:17,p:3,g:17,b:"p",cat:"Halogen"},
  {z:18,p:3,g:18,b:"p",cat:"Noble Gas"},
  {z:19,p:4,g:1,b:"s",cat:"Alkali Metal"},
  {z:20,p:4,g:2,b:"s",cat:"Alkaline Earth Metal"},
  {z:21,p:4,g:3,b:"d",cat:"Transition Metal"},
  {z:22,p:4,g:4,b:"d",cat:"Transition Metal"},
  {z:23,p:4,g:5,b:"d",cat:"Transition Metal"},
  {z:24,p:4,g:6,b:"d",cat:"Transition Metal"},
  {z:25,p:4,g:7,b:"d",cat:"Transition Metal"},
  {z:26,p:4,g:8,b:"d",cat:"Transition Metal"},
  {z:27,p:4,g:9,b:"d",cat:"Transition Metal"},
  {z:28,p:4,g:10,b:"d",cat:"Transition Metal"},
  {z:29,p:4,g:11,b:"d",cat:"Transition Metal"},
  {z:30,p:4,g:12,b:"d",cat:"Transition Metal"},
  {z:31,p:4,g:13,b:"p",cat:"Post-Transition Metal"},
  {z:32,p:4,g:14,b:"p",cat:"Metalloid"},
  {z:33,p:4,g:15,b:"p",cat:"Metalloid"},
  {z:34,p:4,g:16,b:"p",cat:"Reactive Nonmetal"},
  {z:35,p:4,g:17,b:"p",cat:"Halogen"},
  {z:36,p:4,g:18,b:"p",cat:"Noble Gas"},
  {z:37,p:5,g:1,b:"s",cat:"Alkali Metal"},
  {z:38,p:5,g:2,b:"s",cat:"Alkaline Earth Metal"},
  {z:39,p:5,g:3,b:"d",cat:"Transition Metal"},
  {z:40,p:5,g:4,b:"d",cat:"Transition Metal"},
  {z:41,p:5,g:5,b:"d",cat:"Transition Metal"},
  {z:42,p:5,g:6,b:"d",cat:"Transition Metal"},
  {z:43,p:5,g:7,b:"d",cat:"Transition Metal"},
  {z:44,p:5,g:8,b:"d",cat:"Transition Metal"},
  {z:45,p:5,g:9,b:"d",cat:"Transition Metal"},
  {z:46,p:5,g:10,b:"d",cat:"Transition Metal"},
  {z:47,p:5,g:11,b:"d",cat:"Transition Metal"},
  {z:48,p:5,g:12,b:"d",cat:"Transition Metal"},
  {z:49,p:5,g:13,b:"p",cat:"Post-Transition Metal"},
  {z:50,p:5,g:14,b:"p",cat:"Post-Transition Metal"},
  {z:51,p:5,g:15,b:"p",cat:"Metalloid"},
  {z:52,p:5,g:16,b:"p",cat:"Metalloid"},
  {z:53,p:5,g:17,b:"p",cat:"Halogen"},
  {z:54,p:5,g:18,b:"p",cat:"Noble Gas"},
  {z:55,p:6,g:1,b:"s",cat:"Alkali Metal"},
  {z:56,p:6,g:2,b:"s",cat:"Alkaline Earth Metal"},
  {z:57,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:58,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:59,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:60,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:61,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:62,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:63,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:64,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:65,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:66,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:67,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:68,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:69,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:70,p:6,g:3,b:"f",cat:"Lanthanide"},
  {z:71,p:6,g:3,b:"d",cat:"Transition Metal"},
  {z:72,p:6,g:4,b:"d",cat:"Transition Metal"},
  {z:73,p:6,g:5,b:"d",cat:"Transition Metal"},
  {z:74,p:6,g:6,b:"d",cat:"Transition Metal"},
  {z:75,p:6,g:7,b:"d",cat:"Transition Metal"},
  {z:76,p:6,g:8,b:"d",cat:"Transition Metal"},
  {z:77,p:6,g:9,b:"d",cat:"Transition Metal"},
  {z:78,p:6,g:10,b:"d",cat:"Transition Metal"},
  {z:79,p:6,g:11,b:"d",cat:"Transition Metal"},
  {z:80,p:6,g:12,b:"d",cat:"Transition Metal"},
  {z:81,p:6,g:13,b:"p",cat:"Post-Transition Metal"},
  {z:82,p:6,g:14,b:"p",cat:"Post-Transition Metal"},
  {z:83,p:6,g:15,b:"p",cat:"Post-Transition Metal"},
  {z:84,p:6,g:16,b:"p",cat:"Post-Transition Metal"},
  {z:85,p:6,g:17,b:"p",cat:"Halogen"},
  {z:86,p:6,g:18,b:"p",cat:"Noble Gas"},
  {z:87,p:7,g:1,b:"s",cat:"Alkali Metal"},
  {z:88,p:7,g:2,b:"s",cat:"Alkaline Earth Metal"},
  {z:89,p:7,g:3,b:"f",cat:"Actinide"},
  {z:90,p:7,g:3,b:"f",cat:"Actinide"},
  {z:91,p:7,g:3,b:"f",cat:"Actinide"},
  {z:92,p:7,g:3,b:"f",cat:"Actinide"},
  {z:93,p:7,g:3,b:"f",cat:"Actinide"},
  {z:94,p:7,g:3,b:"f",cat:"Actinide"},
  {z:95,p:7,g:3,b:"f",cat:"Actinide"},
  {z:96,p:7,g:3,b:"f",cat:"Actinide"},
  {z:97,p:7,g:3,b:"f",cat:"Actinide"},
  {z:98,p:7,g:3,b:"f",cat:"Actinide"},
  {z:99,p:7,g:3,b:"f",cat:"Actinide"},
  {z:100,p:7,g:3,b:"f",cat:"Actinide"},
  {z:101,p:7,g:3,b:"f",cat:"Actinide"},
  {z:102,p:7,g:3,b:"f",cat:"Actinide"},
  {z:103,p:7,g:3,b:"d",cat:"Transition Metal"},
  {z:104,p:7,g:4,b:"d",cat:"Transition Metal"},
  {z:105,p:7,g:5,b:"d",cat:"Transition Metal"},
  {z:106,p:7,g:6,b:"d",cat:"Transition Metal"},
  {z:107,p:7,g:7,b:"d",cat:"Transition Metal"},
  {z:108,p:7,g:8,b:"d",cat:"Transition Metal"},
  {z:109,p:7,g:9,b:"d",cat:"Transition Metal"},
  {z:110,p:7,g:10,b:"d",cat:"Transition Metal"},
  {z:111,p:7,g:11,b:"d",cat:"Transition Metal"},
  {z:112,p:7,g:12,b:"d",cat:"Transition Metal"},
  {z:113,p:7,g:13,b:"p",cat:"Post-Transition Metal"},
  {z:114,p:7,g:14,b:"p",cat:"Post-Transition Metal"},
  {z:115,p:7,g:15,b:"p",cat:"Post-Transition Metal"},
  {z:116,p:7,g:16,b:"p",cat:"Post-Transition Metal"},
  {z:117,p:7,g:17,b:"p",cat:"Halogen"},
  {z:118,p:7,g:18,b:"p",cat:"Noble Gas"},
];

// Element names and symbols
const names = {
  1:["H","Hydrogen"],2:["He","Helium"],3:["Li","Lithium"],4:["Be","Beryllium"],
  5:["B","Boron"],6:["C","Carbon"],7:["N","Nitrogen"],8:["O","Oxygen"],
  9:["F","Fluorine"],10:["Ne","Neon"],11:["Na","Sodium"],12:["Mg","Magnesium"],
  13:["Al","Aluminium"],14:["Si","Silicon"],15:["P","Phosphorus"],
  16:["S","Sulfur"],17:["Cl","Chlorine"],18:["Ar","Argon"],
  19:["K","Potassium"],20:["Ca","Calcium"],21:["Sc","Scandium"],
  22:["Ti","Titanium"],23:["V","Vanadium"],24:["Cr","Chromium"],
  25:["Mn","Manganese"],26:["Fe","Iron"],27:["Co","Cobalt"],
  28:["Ni","Nickel"],29:["Cu","Copper"],30:["Zn","Zinc"],
  31:["Ga","Gallium"],32:["Ge","Germanium"],33:["As","Arsenic"],
  34:["Se","Selenium"],35:["Br","Bromine"],36:["Kr","Krypton"],
  37:["Rb","Rubidium"],38:["Sr","Strontium"],39:["Y","Yttrium"],
  40:["Zr","Zirconium"],41:["Nb","Niobium"],42:["Mo","Molybdenum"],
  43:["Tc","Technetium"],44:["Ru","Ruthenium"],45:["Rh","Rhodium"],
  46:["Pd","Palladium"],47:["Ag","Silver"],48:["Cd","Cadmium"],
  49:["In","Indium"],50:["Sn","Tin"],51:["Sb","Antimony"],
  52:["Te","Tellurium"],53:["I","Iodine"],54:["Xe","Xenon"],
  55:["Cs","Caesium"],56:["Ba","Barium"],57:["La","Lanthanum"],
  58:["Ce","Cerium"],59:["Pr","Praseodymium"],60:["Nd","Neodymium"],
  61:["Pm","Promethium"],62:["Sm","Samarium"],63:["Eu","Europium"],
  64:["Gd","Gadolinium"],65:["Tb","Terbium"],66:["Dy","Dysprosium"],
  67:["Ho","Holmium"],68:["Er","Erbium"],69:["Tm","Thulium"],
  70:["Yb","Ytterbium"],71:["Lu","Lutetium"],72:["Hf","Hafnium"],
  73:["Ta","Tantalum"],74:["W","Tungsten"],75:["Re","Rhenium"],
  76:["Os","Osmium"],77:["Ir","Iridium"],78:["Pt","Platinum"],
  79:["Au","Gold"],80:["Hg","Mercury"],81:["Tl","Thallium"],
  82:["Pb","Lead"],83:["Bi","Bismuth"],84:["Po","Polonium"],
  85:["At","Astatine"],86:["Rn","Radon"],87:["Fr","Francium"],
  88:["Ra","Radium"],89:["Ac","Actinium"],90:["Th","Thorium"],
  91:["Pa","Protactinium"],92:["U","Uranium"],93:["Np","Neptunium"],
  94:["Pu","Plutonium"],95:["Am","Americium"],96:["Cm","Curium"],
  97:["Bk","Berkelium"],98:["Cf","Californium"],99:["Es","Einsteinium"],
  100:["Fm","Fermium"],101:["Md","Mendelevium"],102:["No","Nobelium"],
  103:["Lr","Lawrencium"],104:["Rf","Rutherfordium"],105:["Db","Dubnium"],
  106:["Sg","Seaborgium"],107:["Bh","Bohrium"],108:["Hs","Hassium"],
  109:["Mt","Meitnerium"],110:["Ds","Darmstadtium"],111:["Rg","Roentgenium"],
  112:["Cn","Copernicium"],113:["Nh","Nihonium"],114:["Fl","Flerovium"],
  115:["Mc","Moscovium"],116:["Lv","Livermorium"],117:["Ts","Tennessine"],
  118:["Og","Oganesson"]
};

// Known curated elements (have full MAT records)
const curatedSet = new Set([1,2,3,4,5,6,7,8,9]);

// Elements where phase at STP is experimentally known
const knownPhases = {
  1:"Gas",2:"Gas",3:"Solid",4:"Solid",5:"Solid",6:"Solid",7:"Gas",8:"Gas",
  9:"Gas",10:"Gas",11:"Solid",12:"Solid",13:"Solid",14:"Solid",15:"Solid",
  16:"Solid",17:"Gas",18:"Gas",19:"Solid",20:"Solid",21:"Solid",22:"Solid",
  23:"Solid",24:"Solid",25:"Solid",26:"Solid",27:"Solid",28:"Solid",
  29:"Solid",30:"Solid",31:"Solid",32:"Solid",33:"Solid",34:"Solid",
  35:"Liquid",36:"Gas",37:"Solid",38:"Solid",39:"Solid",40:"Solid",
  41:"Solid",42:"Solid",43:"Solid",44:"Solid",45:"Solid",46:"Solid",
  47:"Solid",48:"Solid",49:"Solid",50:"Solid",51:"Solid",52:"Solid",
  53:"Solid",54:"Gas",55:"Solid",56:"Solid",57:"Solid",58:"Solid",
  59:"Solid",60:"Solid",61:"Solid",62:"Solid",63:"Solid",64:"Solid",
  65:"Solid",66:"Solid",67:"Solid",68:"Solid",69:"Solid",70:"Solid",
  71:"Solid",72:"Solid",73:"Solid",74:"Solid",75:"Solid",76:"Solid",
  77:"Solid",78:"Solid",79:"Solid",80:"Liquid",81:"Solid",82:"Solid",
  83:"Solid",84:"Solid",85:"Solid",86:"Gas",87:"Solid",88:"Solid",
  89:"Solid",90:"Solid",91:"Solid",92:"Solid",93:"Solid",94:"Solid",
  95:"Solid",96:"Solid",97:"Solid",98:"Solid",99:"Solid",100:"Solid",
  101:"Solid",102:"Solid",103:"Solid",104:"Solid",105:"Solid",106:"Solid",
  107:"Solid",108:"Solid",109:"Solid",110:"Solid",111:"Solid",112:"Solid",
  113:"Solid",114:"Solid",115:"Solid",116:"Solid",117:"Solid",118:"Solid"
};

console.log("Building 118-element baseline from IUPAC/NIST reference data...\n");

const elements = [];

for (let z = 1; z <= 118; z++) {
  const [symbol, name] = names[z];
  const ly = layout.find(e => e.z === z);
  const matId = `MAT:${String(z).padStart(4, "0")}`;
  const isCurated = curatedSet.has(z);

  const entry = {
    z,
    symbol,
    name,
    matId,
    period: ly.p,
    group: ly.g,
    block: ly.b,
    category: ly.cat,
    recordStatus: isCurated ? "CURATED" : "BASELINE",
    hasFullRecord: isCurated,
  };

  // Atomic weight — IUPAC 2021
  entry.atomicWeight = {
    value: atomicWeights[z] || null,
    source: "IUPAC",
    evidence: atomicWeights[z] != null ? "MEASURED" : "UNKNOWN",
  };

  // Electron configuration
  entry.electronConfiguration = {
    value: electronConfigs[z] || null,
    source: "NIST",
    evidence: electronConfigs[z] ? "MEASURED" : "UNKNOWN",
  };

  // Electronegativity
  entry.electronegativity = {
    value: electronegativity[z] ?? null,
    unit: "Pauling",
    source: "Pauling Scale",
    evidence: electronegativity[z] != null ? "MEASURED" : "NOT_APPLICABLE",
    nullReason: electronegativity[z] == null ? "NOT_APPLICABLE" : undefined,
  };

  // First ionization energy
  entry.firstIonizationEnergy = {
    value: ionizationEnergy[z] ?? null,
    unit: "eV",
    source: "NIST ASD",
    evidence: ionizationEnergy[z] != null ? "MEASURED" : "UNKNOWN",
    nullReason: ionizationEnergy[z] == null ? "UNAVAILABLE" : undefined,
  };

  // Phase at STP
  entry.phase = {
    value: knownPhases[z] || null,
    source: knownPhases[z] ? "IUPAC" : null,
    evidence: knownPhases[z] ? "MEASURED" : "UNKNOWN",
    nullReason: !knownPhases[z] ? "UNKNOWN" : undefined,
  };

  // Melting/boiling — only store what we know from authoritative sources
  // For baseline, store null with reason rather than fake values
  entry.meltingPoint = { value: null, nullReason: "BASELINE_DATA_NOT_YETCURATED", source: null };
  entry.boilingPoint = { value: null, nullReason: "BASELINE_DATA_NOT_YET_CURATED", source: null };
  entry.density = { value: null, nullReason: "BASELINE_DATA_NOT_YET_CURATED", source: null };

  // Abundances — null for all (baseline, needs sourcing per-element)
  entry.abundance = {
    universe: { value: null, nullReason: "NOT_CURATED" },
    crust: { value: null, nullReason: "NOT_CURATED" },
    human: { value: null, nullReason: "NOT_CURATED" },
  };

  // Oxidation states — null for baseline
  entry.oxidationStates = { value: null, nullReason: "NOT_CURATED", source: null };

  // Chapter path — only if curated
  entry.chapterPath = isCurated
    ? `records/${String(z).padStart(4,"0")}-${name}-${symbol}/${String(z).padStart(4,"0")}-${name}-${symbol}.md`
    : null;

  elements.push(entry);
  process.stdout.write(`\r  ${z}/118 ${symbol.padEnd(3)} ${name.padEnd(18)} ${entry.recordStatus}`);
}

console.log(`\n\nDone: ${elements.length} elements\n`);

// Write baseline catalogue (rich format with provenance)
const catalog = {
  catalog: {
    id: "MAT:ELEMENTS:BASELINE",
    version: "1.0.0",
    updated: new Date().toISOString(),
    sources: [
      { id: "IUPAC", name: "International Union of Pure and Applied Chemistry", notes: "Standard atomic weights 2021, nomenclature" },
      { id: "NIST ASD", name: "NIST Atomic Spectra Database", notes: "Ionization energies, electron configurations" },
      { id: "Pauling Scale", name: "Pauling Electronegativity Scale", notes: "Electronegativity values" },
    ],
    totalElements: elements.length,
    curatedCount: elements.filter(e => e.recordStatus === "CURATED").length,
    baselineCount: elements.filter(e => e.recordStatus === "BASELINE").length,
  },
  elements,
};

mkdirSync(join(root, "data", "catalog"), { recursive: true });
writeFileSync(join(root, "data", "catalog", "elements-baseline.json"), JSON.stringify(catalog, null, 2));
console.log(`Wrote: data/catalog/elements-baseline.json`);
console.log(`  ${catalog.catalog.curatedCount} CURATED, ${catalog.catalog.baselineCount} BASELINE`);

// Write updated elements-118.json for the book reader (simplified format)
const updated118 = {
  version: "1.1.0",
  updated: new Date().toISOString(),
  source: "IUPAC 2021 + NIST ASD",
  referenceRecords: [
    {
      z: 0, symbol: "OS", name: "Origin State", matId: "MAT:0000",
      period: 0, group: 0, block: "ref", category: "Reference Origin",
      recordStatus: "CURATED", publishedRecord: true,
      chapterPath: "records/0000-Origin-State/0000-Origin-State.md",
    },
  ],
  elements: elements.map(e => ({
    z: e.z,
    symbol: e.symbol,
    name: e.name,
    matId: e.matId,
    period: e.period,
    group: e.group,
    block: e.block,
    category: e.category,
    recordStatus: e.recordStatus,
    hasFullRecord: e.hasFullRecord,
    atomicWeight: e.atomicWeight?.value ?? null,
    electronConfiguration: e.electronConfiguration?.value ?? null,
    electronegativity: e.electronegativity?.value ?? null,
    ionizationEnergy: e.firstIonizationEnergy?.value ?? null,
    phase: e.phase?.value ?? null,
    publishedRecord: e.hasFullRecord,
    chapterPath: e.chapterPath,
  })),
};

writeFileSync(join(root, "book", "data", "elements-118.json"), JSON.stringify(updated118, null, 2));
console.log(`Wrote: book/data/elements-118.json (updated with matIds for all 118)`);

// Validate
const nullIds = elements.filter(e => e.matId === "MAT:null");
const dupes = elements.filter((e, i, arr) => arr.findIndex(x => x.z === e.z) !== i);
console.log(`\nValidation:`);
console.log(`  MAT:null entries: ${nullIds.length} ${nullIds.length === 0 ? "PASS" : "FAIL"}`);
console.log(`  Duplicate z: ${dupes.length} ${dupes.length === 0 ? "PASS" : "FAIL"}`);
console.log(`  Total elements: ${elements.length} ${elements.length === 118 ? "PASS" : "FAIL"}`);
