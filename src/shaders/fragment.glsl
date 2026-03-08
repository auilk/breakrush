#version 300 es
precision mediump float;

in vec2 vUV;

out vec4 FragColor;

void main()
{
    FragColor = vec4(vUV, 0.0, 1.0);
}