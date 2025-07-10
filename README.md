# Equivalent Rectangle Calculator

A clean, modern web application that calculates the dimensions of an equivalent rectangle given any shape's perimeter and area.

## Features

- **Simple Input**: Enter perimeter and area values in text fields
- **Instant Calculation**: Click the button or press Enter to calculate
- **Visual Representation**: See a scaled visual of the calculated rectangle
- **Error Handling**: Clear error messages for invalid inputs
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Modern, gradient-based design with smooth animations

## How It Works

The calculator uses the mathematical relationship between a rectangle's perimeter and area:

- **Perimeter (P)**: P = 2(width + height)
- **Area (A)**: A = width × height

Given P and A, it solves the quadratic equation:
`width² - (P/2)width + A = 0`

Using the quadratic formula to find the rectangle dimensions.

## Usage

1. Open `index.html` in a web browser
2. Enter the perimeter of your shape
3. Enter the area of your shape
4. Click "Calculate Rectangle" or press Enter
5. View the equivalent rectangle dimensions and visual representation

## Example

- **Input**: Perimeter = 20, Area = 25
- **Output**: Width = 7.5 units, Height = 2.5 units

## Files

- `index.html` - Main HTML structure
- `styles.css` - Modern CSS styling with gradients and animations
- `script.js` - JavaScript calculation logic and canvas visualization

## Browser Support

Works in all modern browsers that support HTML5 Canvas and ES6 JavaScript. 