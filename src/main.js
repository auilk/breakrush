import Shader from "./graphics/Shader";
import Quad from "./geometry/Quad";

import vertSource from "./shaders/vertex.glsl?raw";
import fragSource from "./shaders/fragment.glsl?raw";

const canvas = document.getElementById("webgl");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

/** @type {WebGLRenderingContext} */
const gl = canvas.getContext("webgl2");
if (!gl) alert("WebGL is not supported in your browser.");

const shader = new Shader(gl, vertSource, fragSource);
const quad = new Quad(gl);


function MainLoop()
{
    gl.bindVertexArray(quad.getVAO());
    shader.bind(gl);

    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, quad.getIndexCount(), gl.UNSIGNED_SHORT, 0);

    shader.unbind(gl);
    gl.bindVertexArray(null);

    requestAnimationFrame(MainLoop);
}
requestAnimationFrame(MainLoop);

function ResizeCallback()
{
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width;
    canvas.height = height;

    gl.viewport(0, 0, width, height);
}
window.addEventListener("resize", ResizeCallback);