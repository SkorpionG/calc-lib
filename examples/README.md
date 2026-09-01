# calc-lib Examples

This folder contains comprehensive examples demonstrating all the capabilities of the calc-lib package, organized by category.

## Running the Examples

First, make sure you've built the package:

```bash
npm run build
```

Then run any example file:

```bash
node examples/index.js                      # Complete showcase
node examples/sigfig-examples.js            # Significant figures
node examples/arithmetic-examples.js        # Arithmetic operations
node examples/conversion-examples.js        # Number base conversions
node examples/formatting-examples.js        # Scientific formatting
node examples/measurement-examples.js       # Measurement with uncertainty
node examples/constants-examples.js         # Mathematical & physical constants
node examples/statistics-examples.js        # Statistical functions
node examples/geometry-examples.js          # Geometry & trigonometry
node examples/vector-examples.js            # Vector mathematics
node examples/computer-science-examples.js  # Computer science utilities
node examples/logic-gates-examples.js       # Logic gates & digital circuits
```

## Example Categories

### 🔣 [sigfig-examples.js](./sigfig-examples.js)

- Significant figure counting rules (non-zero digits, leading/trailing zeros, scientific notation)
- Why string inputs are needed to preserve trailing zeros
- Formatting numbers to `n` significant figures with `toSigfig`
- Precision mechanics for addition/subtraction and multiplication/division
- Practical science example: reporting calculation results at correct precision

### 🔢 [arithmetic-examples.js](./arithmetic-examples.js)

- Basic arithmetic (add, subtract, multiply, divide) with significant figure preservation
- Extended operations (modulo, integer division, power, square root)
- Absolute value and array operations (max, min)

### 🔄 [conversion-examples.js](./conversion-examples.js)

- Binary, hexadecimal, and octal conversions
- Custom base conversions (base 2-36)
- Practical examples with RGB colors, file permissions, network addresses

### 🔬 [formatting-examples.js](./formatting-examples.js)

- Scientific and engineering notation
- Rounding and truncating to significant figures
- Percentage calculations
- Physical constants formatting

### 🧪 [measurement-examples.js](./measurement-examples.js)

- Formatting scientific measurements as `"value ± error"` strings
- Custom significant figure override for uncertainty
- Creating `Measurement` objects with `createMeasurement`
- Practical lab measurement examples (gravity, temperature, voltage)
- Error propagation: area from radius, velocity from distance and time

### 🌌 [constants-examples.js](./constants-examples.js)

- All mathematical constants (π, e, φ, √2, √3, logarithms)
- All physical constants (speed of light, Planck, Boltzmann, Avogadro, gravity)
- Particle & atomic constants (electron mass, proton mass, Bohr radius)
- Unit conversion constants (eV, calorie, atmosphere, Kelvin offset)
- `getConstant(name)` and `listConstants()` usage
- Practical calculations: kinetic energy, photon energy, ideal gas law, de Broglie wavelength

### 📊 [statistics-examples.js](./statistics-examples.js)

- Basic statistics (mean, median, standard deviation)
- Descriptive statistics summary
- Linear regression analysis
- Real-world examples (temperature data, business metrics)
- Data comparison techniques

### 📐 [geometry-examples.js](./geometry-examples.js)

- Angle conversions (degrees ↔ radians)
- Circle and sphere calculations
- 2D and 3D distance calculations
- Navigation and practical geometry examples

### 📏 [vector-examples.js](./vector-examples.js)

- Constructing 2D, 3D, and n-dimensional vectors
- Static factory methods: `Vector.zero`, `Vector.unitVector`, `Vector.fromPoints`
- Magnitude and normalization
- Arithmetic: add, subtract, scale
- Dot product and 3D cross product
- Angles: `angleTo`, `isParallel`, `isPerpendicular`
- Projection: `projectOnto`
- Component access: `get`, `set`, `clone`, `toArray`
- Practical physics: projectile decomposition, force vectors, point distances

### 💻 [computer-science-examples.js](./computer-science-examples.js)

- ASCII, binary, and hexadecimal string conversions
- Bitwise operations and bit manipulation
- Hash functions and Base64 encoding/decoding
- Practical examples (file permissions, network subnetting, feature flags)

### ⚡ [logic-gates-examples.js](./logic-gates-examples.js)

- Basic logic gates (AND, OR, NOT, XOR, NAND, NOR, XNOR, buffer)
- Multi-input gates
- Arithmetic circuits (half adder, full adder)
- Data routing (multiplexer, demultiplexer)
- Encoding/decoding circuits (encoder, decoder, priority encoder)
- Truth table generation
- Practical digital circuit examples (4-bit adder, memory decoder, traffic light)

### 🎯 [index.js](./index.js)

- Complete showcase of all calc-lib capabilities
- Practical engineering calculations
- Digital system design examples
- Scientific data analysis workflows

## Key Features Demonstrated

- **Significant Figure Preservation**: All arithmetic operations respect scientific precision rules
- **Type Flexibility**: Functions accept both numbers and strings as input
- **Error Handling**: Comprehensive validation and meaningful error messages
- **Real-World Applications**: Examples show practical use cases in engineering, science, and computer science
- **Educational Value**: Clear explanations and step-by-step demonstrations

## Educational Use

These examples are perfect for:

- **Students** learning mathematics, physics, engineering, or computer science
- **Educators** teaching STEM concepts with practical code examples
- **Developers** integrating precise calculations into applications
- **Researchers** needing reliable computational tools

Each example file is self-contained and includes detailed comments explaining the concepts and calculations being performed.
