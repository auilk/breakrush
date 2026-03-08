class Quad
{
    #VAO;
    #VBO;
    #EBO;
    #vertices;
    #indices;

    constructor(gl)
    {
        this.#vertices = new Float32Array([
            -1.0,  1.0,     0.0, 1.0,
            -1.0, -1.0,     0.0, 0.0,
             1.0, -1.0,     1.0, 0.0,
             1.0,  1.0,     1.0, 1.0
        ]);
        this.#indices = new Uint16Array([
            0, 1, 2,
            2, 3, 0
        ]);

        this.#VAO = gl.createVertexArray();
        gl.bindVertexArray(this.#VAO);

        this.#VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.#VBO);
        gl.bufferData(gl.ARRAY_BUFFER, this.#vertices, gl.STATIC_DRAW);

        this.#EBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.#EBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.#indices, gl.STATIC_DRAW);

        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 4, 0);
        gl.enableVertexAttribArray(0);

        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 4, Float32Array.BYTES_PER_ELEMENT * 2);
        gl.enableVertexAttribArray(1);

        gl.bindVertexArray(null);
    }

    getVAO()
    {
        return this.#VAO;
    }

    getIndexCount()
    {
        return this.#indices.length;
    }
}

export default Quad;