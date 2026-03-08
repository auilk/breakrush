import Shader from "./graphics/Shader";

import vertSource from "./shaders/vertex.glsl?raw";
import fragSource from "./shaders/fragment.glsl?raw";

const canvas = document.getElementById("webgl");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

/** @type {WebGLRenderingContext} */
const gl = canvas.getContext("webgl2");
if (!gl) alert("WebGL is not supported in your browser.");

const shader = new Shader(gl, vertSource, fragSource);

const vertices = new Float32Array([
     0.0,  1.0,
    -0.5, -0.5,
     0.5, -0.5
]);

const indices = new Uint16Array([0, 1, 2]);

const VAO = gl.createVertexArray();
gl.bindVertexArray(VAO);

const VBO = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const EBO = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EBO);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

const aPositionLocation = shader.getAttribLocation(gl, "aPosition");
gl.vertexAttribPointer(aPositionLocation, 2, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 2, 0);
gl.enableVertexAttribArray(aPositionLocation);

gl.bindVertexArray(null);

function MainLoop()
{
    gl.bindVertexArray(VAO);
    shader.bind(gl);

    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

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