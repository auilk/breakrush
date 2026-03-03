const canvas = document.getElementById("webgl");

/** @type {WebGLRenderingContext} */
const gl = canvas.getContext("webgl");
if (!gl) alert("WebGL is not supported in your browser.");

gl.clearColor(0.1, 0.1, 0.1, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);