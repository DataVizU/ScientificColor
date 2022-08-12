/**
 * Iwanthue Color Presets
 * @author médialab Sciences Po
 * https://github.com/medialab/iwanthue
 * https://medialab.sciencespo.fr
 *
 * Website's collection of color space presets.
 * https://medialab.github.io/iwanthue/
 */

/**
 *Format is [hmin, hmax, cmin, cmax, lmin, lmax] to save up some space
 */
export const PRESETS = {
  allColors: [0, 360, 0, 100, 0, 100],
  defaultPreset: [0, 360, 30, 80, 35, 80],
  sensible: [0, 360, 25.59, 55.59, 60.94, 90.94],
  colorblindFriendly: [0, 360, 40, 70, 15, 85],
  fancyLight: [0, 360, 15, 40, 70, 100],
  fancyDark: [0, 360, 8, 40, 7, 40],
  shades: [0, 240, 0, 15, 0, 100],
  tarnish: [0, 360, 0, 15, 30, 70],
  pastel: [0, 360, 0, 30, 70, 100],
  pimp: [0, 360, 30, 100, 25, 70],
  intense: [0, 360, 20, 100, 15, 80],
  fluo: [0, 300, 35, 100, 75, 100],
  redRoses: [330, 20, 10, 100, 35, 100],
  ochreSand: [20, 60, 20, 50, 35, 100],
  yellowLime: [60, 90, 10, 100, 35, 100],
  greenMint: [90, 150, 10, 100, 35, 100],
  iceCube: [150, 200, 0, 100, 35, 100],
  blueOcean: [220, 260, 8, 80, 0, 50],
  indigoNight: [260, 290, 40, 100, 35, 100],
  purpleWine: [290, 330, 0, 100, 0, 40],
};
