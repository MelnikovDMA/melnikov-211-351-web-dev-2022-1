function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.sum = function(other) {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    this.mult = function(other) {
        return new Vector(this.x * other.x, this.y * other.y, this.z * other.z);
    }

    this.sub = function(other) {
        return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    this.multScalar = function(s) {
        return new Vector(this.x * s, this.y * s, this.z * s);
    }

    this.norm = function() {
        return Math.sqrt(this.x**2 + this.y**2 + this.z**2);
    }

    this.dotProduct = function(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
}

let v1 = new Vector (1, 2, 3)
let v2 = new Vector (4, 5, 6)

console.log(v1.sum(v2));