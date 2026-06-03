// Returns true when the device is likely low-spec based on CPU cores and RAM.
// navigator.deviceMemory is Chromium-only; Safari/Firefox always return undefined → default 4.
const cores = navigator.hardwareConcurrency ?? 4;
const memory = navigator.deviceMemory ?? 4; // reported in GB

export const isLowSpec = cores <= 4 || memory <= 4;

// Convenience bundle of canvas props — spread onto every <Canvas>
export const canvasPerf = isLowSpec
  ? { dpr: [0.5, 1], gl: { antialias: false, alpha: true, powerPreference: "default" } }
  : { dpr: [1, 1.5], gl: { antialias: true, alpha: true, powerPreference: "high-performance" } };
