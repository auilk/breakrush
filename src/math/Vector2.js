class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    add(other)
    {
        if (other instanceof Vector2)
        {
            this.x += other.x;
            this.y += other.y;
            return this;
        }
        else if (typeof other === "number")
        {
            this.x += other;
            this.y += other; 
            return this;
        }
        else
        {
            throw new TypeError(`Vector2.add expected a Vector2 or number, got ${typeof other}`);
        }
    }

    subtract(other)
    {
        if (other instanceof Vector2)
        {
            this.x -= other.x;
            this.y -= other.y; 
            return this;
        }
        else if (typeof other === "number")
        {
            this.x -= other;
            this.y -= other; 
            return this;
        }
        else
        {
            throw new TypeError(`Vector2.subtract expected a Vector2 or number, got ${typeof other}`);
        }
    }

    multiply(other)
    {
        if (other instanceof Vector2)
        {
            this.x *= other.x;
            this.y *= other.y; 
            return this;
        }
        else if (typeof other === "number")
        {
            this.x *= other;
            this.y *= other;
            return this; 
        }
        else
        {
            throw new TypeError(`Vector2.multiply expected a Vector2 or number, got ${typeof other}`);
        }
    }

    divide(other)
    {
        if (other instanceof Vector2)
        {
            this.x /= other.x;
            this.y /= other.y; 
        }
        else if (typeof other === "number")
        {
            this.x /= other;
            this.y /= other; 
            return this;
        }
        else
        {
            throw new TypeError(`Vector2.divide expected a Vector2 or number, got ${typeof other}`);
        }
    }

    set(x, y)
    {
        if (typeof x === "number" && typeof y === "number")
        {
            this.x = x;
            this.y = y;
            return this;
        }
        else
        {
            throw new TypeError(`Vector2.set expected a number fo x and y, got ${typeof x}, ${typeof y}`);
        }
    }

    clone()
    {
        return new Vector2(this.x, this.y);
    }

    copy(other)
    {
        if (other instanceof Vector2)
        {
            this.x = other.x;
            this.y = other.y;
            return this;
        }
        else
        {
            throw new TypeError(`Vector2.copy expected a Vector2, got ${typeof other}`);
        }
    }
}

export default Vector2;