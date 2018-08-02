import Chroma from "chroma-js";
import { luminance, luminanceSwitch, LuminositySwitch } from "./luminosity";

/**
 * Adjust the darkness/lightness of a foreground color so that it matches a target contrast ratio against a background color
 * @param targetRatio - The desired contrast ratio to bring the operand to against the reference
 * @param operand - The color value to manipulate
 * @param reference - The color value to evaluate contrast against
 */
export function contrast(targetRatio: number, operand: string, reference: string): string {
    const operandColor: Chroma = Chroma(operand);
    const backgroundLuminance: number = Chroma(reference).luminance();
    const luminositySwitch: LuminositySwitch = luminanceSwitch(operandColor.luminance(), backgroundLuminance);

    return Chroma(luminance(
        luminositySwitch(L1, L2)(targetRatio, backgroundLuminance),
        operandColor,
        luminositySwitch(Math.ceil, Math.floor)
    )).hex();
}

/**
 * The following functions (L1 and L2) are formulas derived from the WCAG 2.0 formula for calculating
 * color contrast ratios - https://www.w3.org/TR/WCAG20-TECHS/G18.html):
 *
 * ContrastRatio = (L1 + 0.05) / (L2 + 0.05)
 *
 * Given a known contrast ratio (contrastRatio) and a known luminosity (L2 and L1 respectively),
 * these formulas solve for L1 and L2 respectively.
 */

/**
 * Solve for L1 when L2 and contrast ratio are known
 */
function L1(contrastRatio: number, l2: number): number {
    return (contrastRatio * l2) + (0.05 * contrastRatio) - 0.05;
}

/**
 * Solve for L2 when L1 and contrast ratio are known
 */
function L2(contrastRatio: number, l1: number): number {
    return (-0.05 * contrastRatio + l1 + 0.05) / contrastRatio;
}
