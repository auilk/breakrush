const canvas = document.getElementById("webgl");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

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

const aPositionLocation = gl.getAttribLocation(shaderProgram, "aPosition");
gl.vertexAttribPointer(aPositionLocation, 2, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 2, 0);
gl.enableVertexAttribArray(aPositionLocation);

gl.useProgram(shaderProgram);

gl.clearColor(0.1, 0.1, 0.1, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

gl.bindVertexArray(null);
gl.bindBuffer(gl.ARRAY_BUFFER, null);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
gl.useProgram(null);

gl.deleteBuffer(VBO);
gl.deleteBuffer(EBO);
gl.deleteVertexArray(VAO);
gl.deleteProgram(shaderProgram);