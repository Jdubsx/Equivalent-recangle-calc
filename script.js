class RectangleCalculator {
    constructor() {
        this.perimeterInput = document.getElementById('perimeter');
        this.areaInput = document.getElementById('area');
        this.calculateBtn = document.getElementById('calculate-btn');
        this.resultSection = document.getElementById('result-section');
        this.widthValue = document.getElementById('width-value');
        this.heightValue = document.getElementById('height-value');
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
        this.displayResults(dimensions.width, dimensions.height);
        this.drawRectangle(dimensions.width, dimensions.height);
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
        const width = (halfPerimeter + sqrtDiscriminant) / 2;
        const height = (halfPerimeter - sqrtDiscriminant) / 2;
        
        // Ensure width is the longer side for consistency
        return {
            width: Math.max(width, height),
            height: Math.min(width, height)
        };
    }
    
    displayResults(width, height) {
        this.widthValue.textContent = width.toFixed(2);
        this.heightValue.textContent = height.toFixed(2);
        
        this.resultSection.classList.add('show');
        this.hideError();
    }
    
    drawRectangle(width, height) {
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
        
        const scaleX = availableWidth / width;
        const scaleY = availableHeight / height;
        const scale = Math.min(scaleX, scaleY);
        
        // Calculate actual rectangle dimensions on canvas
        const rectWidth = width * scale;
        const rectHeight = height * scale;
        
        // Center the rectangle
        const x = (canvasWidth - rectWidth) / 2;
        const y = (canvasHeight - rectHeight) / 2;
        
        // Draw rectangle
        ctx.fillStyle = '#3498db';
        ctx.fillRect(x, y, rectWidth, rectHeight);
        
        // Draw rectangle border
        ctx.strokeStyle = '#2980b9';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, rectWidth, rectHeight);
        
        // Draw dimensions
        this.drawDimensions(ctx, x, y, rectWidth, rectHeight, width, height);
    }
    
    drawDimensions(ctx, x, y, rectWidth, rectHeight, actualWidth, actualHeight) {
        ctx.fillStyle = '#ecf0f1';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        
        // Width dimension (bottom)
        const widthText = `${actualWidth.toFixed(2)} units`;
        ctx.fillText(widthText, x + rectWidth / 2, y + rectHeight + 25);
        
        // Height dimension (right side)
        ctx.save();
        ctx.translate(x + rectWidth + 20, y + rectHeight / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${actualHeight.toFixed(2)} units`, 0, 0);
        ctx.restore();
        
        // Draw dimension lines
        ctx.strokeStyle = '#95a5a6';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        // Width dimension line
        ctx.beginPath();
        ctx.moveTo(x, y + rectHeight + 15);
        ctx.lineTo(x + rectWidth, y + rectHeight + 15);
        ctx.stroke();
        
        // Height dimension line
        ctx.beginPath();
        ctx.moveTo(x + rectWidth + 10, y);
        ctx.lineTo(x + rectWidth + 10, y + rectHeight);
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
console.log('Example: Perimeter=20, Area=25 → Width=7.5, Height=2.5');
console.log('Example: Perimeter=12, Area=9 → Width=4.5, Height=1.5'); 