# 0000 Reference Modes

| ID                  | Code   | Reference                                 | Physical?       | Default Numeric Zero?   | Primary Use                  |
| ------------------- | ------ | ----------------------------------------- | --------------- | ----------------------- | ---------------------------- |
| MAT:0000:REF:ORIGIN | ORIGIN | Computational coordinate origin           | No              | Yes after normalization | MAT state-space coordinates  |
| MAT:0000:REF:LAB    | LAB    | Laboratory baseline                       | Yes             | No                      | Experimental comparison      |
| MAT:0000:REF:THERMO | THERMO | Thermodynamic / chemical reference        | Yes             | No                      | Thermochemical comparison    |
| MAT:0000:REF:T0     | T0     | Temperature reference                     | Yes             | No                      | Temperature differences      |
| MAT:0000:REF:P0     | P0     | Pressure reference                        | Yes             | No                      | Pressure differences         |
| MAT:0000:REF:E0     | E0     | Zero specified externally applied E field | Condition       | Yes                     | Electric-field comparison    |
| MAT:0000:REF:B0     | B0     | Zero specified externally applied B field | Condition       | Yes                     | Magnetic-field comparison    |
| MAT:0000:REF:R0     | R0     | No added radiation source                 | Condition       | Not necessarily         | Radiation experiments        |
| MAT:0000:REF:N0     | N0     | No added atomic/nuclear species           | Condition       | Not numerical           | Species-addition experiments |
| MAT:0000:REF:C0     | C0     | No added chemical reagent                 | Condition       | Not numerical           | Chemical experiments         |
| MAT:0000:REF:S0     | S0     | Selected unstrained state                 | Yes             | Usually strain = 0      | Mechanics                    |
| MAT:0000:REF:X0     | X0     | Process-start state                       | Yes             | Not numerical           | Processing                   |
| MAT:0000:REF:TIME0  | TIME0  | Time origin                               | Convention      | elapsed time = 0        | Time-dependent data          |
| MAT:0000:REF:VAC    | VAC    | Laboratory vacuum                         | Yes             | No                      | Vacuum experiments           |
| MAT:0000:REF:QV     | QV     | Quantum-vacuum reference                  | Model-dependent | Model-dependent         | Quantum-field calculations   |

---

## Legacy Mapping

| Legacy    | MAT                 |
| --------- | ------------------- |
| G0000     | MAT:0000:REF:ORIGIN |
| G0000-QV  | MAT:0000:REF:QV     |
| G0000-LAB | MAT:0000:REF:LAB    |
| G0000-STP | MAT:0000:REF:THERMO |
| G0000-E0  | MAT:0000:REF:E0     |
| G0000-B0  | MAT:0000:REF:B0     |
| G0000-P0  | MAT:0000:REF:P0     |
| G0000-T0  | MAT:0000:REF:T0     |
| G0000-N0  | MAT:0000:REF:N0     |
| G0000-R0  | MAT:0000:REF:R0     |
| G0000-S0  | MAT:0000:REF:S0     |
| G0000-C0  | MAT:0000:REF:C0     |
| G0000-X0  | MAT:0000:REF:X0     |

`G0000-STP` is retained as a legacy alias only.

MAT requires the actual reference temperature, pressure and thermodynamic convention to be stated.

---
