class Shader
{
    #vertSource;
    #fragSource;
    #shaderProgram;

    constructor(gl, vertSource, fragSource)
    {
        this.#vertSource = vertSource;
        this.#fragSource = fragSource;

        const vertexShader = this.#createShader(gl, "VERTEX");
        const fragmentShader = this.#createShader(gl, "FRAGMENT");
        this.#shaderProgram = this.#createProgram(gl, vertexShader, fragmentShader);

        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
    }

    getAttribLocation(gl, name)
    {
        const location = gl.getAttribLocation(this.#shaderProgram, name);
        if (location === -1)
        {
            console.warn(`Attribute '${name}' not found or not used`);
        }

        return location;
    }

    bind(gl)
    {
        gl.useProgram(this.#shaderProgram);
    }

    unbind(gl)
    {
        gl.useProgram(null);
    }

    delete(gl)
    {
        gl.deleteProgram(this.#shaderProgram);
    }

    #createShader(gl, type)
    {
        const shaderTypes = {
            VERTEX: gl.VERTEX_SHADER,
            FRAGMENT: gl.FRAGMENT_SHADER
        };

        const shaderSources = {
            VERTEX: this.#vertSource,
            FRAGMENT: this.#fragSource
        };

        const shaderType = shaderTypes[type];
        const shaderSource = shaderSources[type];

        if (!shaderType || !shaderSource) throw new Error(`Unknown shader type: ${type}`);

        const shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        {
            const infoLog = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);

            throw new Error(`${type === "VERTEX" ? "Vertex" : "Fragment"} shader compile error:\n${infoLog}`);
        }

        return shader;
    }

    #createProgram(gl, vertexShader, fragmentShader)
    {
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

        return shaderProgram;
    }
}

export default Shader;