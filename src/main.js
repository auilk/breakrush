const canvas = document.getElementById("webgl");

/** @type {WebGLRenderingContext} */
const gl = canvas.getContext("webgl2");
if (!gl) alert("WebGL is not supported in your browser.");

const vertSource = `#version 300 es
precision mediump float;

layout(location = 0) in vec2 aPosition;

void main()
{
    gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const fragSource = `#version 300 es
precision mediump float;

out vec4 FragColor;

void main()
{
    FragColor = vec4(1.0);
}`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertSource);
gl.compileShader(vertexShader);
if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
{
    const info = gl.getShaderInfoLog(vertexShader);
    gl.deleteShader(vertexShader);

    throw new Error("Vertex shader compile error:\n" + info);
}

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragSource);
gl.compileShader(fragmentShader);
if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
{
    const info = gl.getShaderInfoLog(fragmentShader);
    gl.deleteShader(fragmentShader);

    throw new Error("Fragment shader compile error:\n" + info);
}

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
{
    const info = gl.getProgramInfoLog(shaderProgram);
    
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteProgram(shaderProgram);
    
    throw new Error("Shader program linking error:\n" + info);
}

gl.deleteShader(vertexShader);
gl.deleteShader(fragmentShader);