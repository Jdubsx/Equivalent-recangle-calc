class RectangleCalculator {
    constructor() {
        this.perimeterInput = document.getElementById('perimeter');
        this.areaInput = document.getElementById('area');
        this.calculateBtn = document.getElementById('calculate-btn');
        this.resultSection = document.getElementById('result-section');
        this.lengthValue = document.getElementById('length-value');
        this.widthValue = document.getElementById('width-value');
        this.errorMessage = document.getElementById('error-message');
        this.canvas = document.getElementById('rectangle-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.initializeEvents();
    }
    
    initializeEvents() {
        this.calculateBtn.addEventListener('click', () => this.calculateRectangle());
        
        // Allow Enter key to trigger calculation
        [this.perimeterInput, this.areaInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.calculateRectangle();
                }
            });
        });
        
        // Clear results when inputs change
        [this.perimeterInput, this.areaInput].forEach(input => {
            input.addEventListener('input', () => {
                this.hideResults();
                this.hideError();
            });
        });
    }
    
    calculateRectangle() {
        const perimeter = parseFloat(this.perimeterInput.value);
        const area = parseFloat(this.areaInput.value);
        
        // Validate inputs
        if (!this.validateInputs(perimeter, area)) {
            return;
        }
        
        // Calculate rectangle dimensions
        const dimensions = this.calculateDimensions(perimeter, area);
        
        if (dimensions.error) {
            this.showError(dimensions.error);
            return;
        }
        
        // Display results
        this.displayResults(dimensions.length, dimensions.width);
        this.drawRectangle(dimensions.length, dimensions.width);
    }
    
    validateInputs(perimeter, area) {
        this.hideError();
        
        if (isNaN(perimeter) || isNaN(area)) {
            this.showError('Please enter valid numbers for both perimeter and area.');
            return false;
        }
        
        if (perimeter <= 0 || area <= 0) {
            this.showError('Perimeter and area must be positive numbers.');
            return false;
        }
        
        return true;
    }
    
    calculateDimensions(perimeter, area) {
        // For rectangle: P = 2(w + h), A = w * h
        // Solving: w² - (P/2)w + A = 0
        // Using quadratic formula: w = (P/2 ± √((P/2)² - 4A))/2
        
        const halfPerimeter = perimeter / 2;
        const discriminant = Math.pow(halfPerimeter, 2) - 4 * area;
        
        if (discriminant < 0) {
            return {
                error: 'No valid rectangle exists with these perimeter and area values. The area is too large for the given perimeter.'
            };
        }
        
        const sqrtDiscriminant = Math.sqrt(discriminant);
        const dim1 = (halfPerimeter + sqrtDiscriminant) / 2;
        const dim2 = (halfPerimeter - sqrtDiscriminant) / 2;
        
        // Ensure length is the longer side and width is the shorter side
        return {
            length: Math.max(dim1, dim2),
            width: Math.min(dim1, dim2)
        };
    }
    
    displayResults(length, width) {
        this.lengthValue.textContent = length.toFixed(2);
        this.widthValue.textContent = width.toFixed(2);
        
        this.resultSection.classList.add('show');
        this.hideError();
    }
    
    drawRectangle(length, width) {
        const canvas = this.canvas;
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Canvas dimensions
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const padding = 40;
        
        // Calculate scale to fit rectangle in canvas
        const availableWidth = canvasWidth - 2 * padding;
        const availableHeight = canvasHeight - 2 * padding;
        
        const scaleX = availableWidth / length;
        const scaleY = availableHeight / width;
        const scale = Math.min(scaleX, scaleY);
        
        // Calculate actual rectangle dimensions on canvas
        const rectLength = length * scale;
        const rectWidth = width * scale;
        
        // Center the rectangle
        const x = (canvasWidth - rectLength) / 2;
        const y = (canvasHeight - rectWidth) / 2;
        
        // Draw rectangle
        ctx.fillStyle = '#3498db';
        ctx.fillRect(x, y, rectLength, rectWidth);
        
        // Draw rectangle border
        ctx.strokeStyle = '#2980b9';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, rectLength, rectWidth);
        
        // Draw dimensions
        this.drawDimensions(ctx, x, y, rectLength, rectWidth, length, width);
    }
    
    drawDimensions(ctx, x, y, rectLength, rectWidth, actualLength, actualWidth) {
        ctx.fillStyle = '#ecf0f1';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        
        // Length dimension (bottom)
        const lengthText = `${actualLength.toFixed(2)} units`;
        ctx.fillText(lengthText, x + rectLength / 2, y + rectWidth + 25);
        
        // Width dimension (right side)
        ctx.save();
        ctx.translate(x + rectLength + 20, y + rectWidth / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${actualWidth.toFixed(2)} units`, 0, 0);
        ctx.restore();
        
        // Draw dimension lines
        ctx.strokeStyle = '#95a5a6';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        // Length dimension line
        ctx.beginPath();
        ctx.moveTo(x, y + rectWidth + 15);
        ctx.lineTo(x + rectLength, y + rectWidth + 15);
        ctx.stroke();
        
        // Width dimension line
        ctx.beginPath();
        ctx.moveTo(x + rectLength + 10, y);
        ctx.lineTo(x + rectLength + 10, y + rectWidth);
        ctx.stroke();
        
        ctx.setLineDash([]);
    }
    
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');
        this.hideResults();
    }
    
    hideError() {
        this.errorMessage.classList.remove('show');
    }
    
    hideResults() {
        this.resultSection.classList.remove('show');
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RectangleCalculator();
});

// Add some example calculations in console for testing
console.log('Equivalent Rectangle Calculator loaded!');
console.log('Example: Perimeter=20, Area=25 → Length=7.5, Width=2.5');
console.log('Example: Perimeter=12, Area=9 → Length=4.5, Width=1.5'); 