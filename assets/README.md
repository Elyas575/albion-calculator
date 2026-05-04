# Albion Refining Calculator

A professional calculator for Albion Online players to calculate true crafting costs, including return bonuses, nutrition fees, and market sales taxes.

## Features

- **True Cost Calculation**: Accounts for material return bonuses
- **Nutrition Fees**: Includes crafting nutrition costs
- **Market Fees**: Calculates setup fees and sales tax (Premium/Non-Premium)
- **Batch Scaling**: See costs for larger quantities
- **Profit Analysis**: Calculate profit margins after all costs
- **Non-Artifact Only**: Specifically designed for standard crafting items

## Project Structure

```
calculator/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Base styles and variables
│   └── components.css     # Component-specific styles
├── js/
│   ├── utils.js           # Utility functions
│   ├── calculator.js     # Core calculation logic
│   ├── ui.js             # UI management
│   └── main.js           # Application entry point
└── assets/
    └── README.md          # This file
```

## How to Use

1. **Materials Tab**: Enter raw materials and their costs
2. **Set Return Rate**: Adjust your refining return bonus
3. **Scale Tab**: View costs for larger quantities
4. **Profit Tab**: Calculate profits including market fees

## Important Notes

- **Non-Artifact Items Only**: This calculator works for standard crafting items only
- **Artifact Items**: Don't receive return bonuses and aren't supported
- **Market Fees**: Includes 2.5% setup fee + 4% (Premium) or 8% (Non-Premium) sales tax

## Development

The project follows modern web development best practices:

- **Separation of Concerns**: HTML, CSS, and JavaScript are separated
- **Modular JavaScript**: Code is split into logical modules
- **Semantic HTML**: Uses proper HTML5 semantic elements
- **CSS Variables**: Centralized design system with CSS custom properties
- **Responsive Design**: Works on all device sizes

## Browser Support

- Modern browsers with ES6+ support
- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## License

This project is for educational and personal use.
