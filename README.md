# Personal Portfolio Website

A modern, responsive portfolio website built with React.js and vanilla CSS. Features a clean design, smooth animations, and dark mode support.

## Features

- 🎨 Modern and clean design
- 🌓 Dark mode support
- 📱 Fully responsive
- ⚡ Smooth animations and transitions
- 📝 Easy to customize content
- 🔍 SEO friendly
- 🚀 Fast loading times

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The website will be available at `http://localhost:3000`.

## Customization

### Personal Information

1. Update the content in the following components:
   - `src/components/Home/Home.js` - Update name and tagline
   - `src/components/About/About.js` - Update about text and skills
   - `src/components/Footer/Footer.js` - Update social media links

2. Add your projects in `src/data/projects.js`:
```javascript
export const projects = [
  {
    id: 1,
    title: "Project Title",
    description: "Project description",
    techStack: ["Tech1", "Tech2"],
    githubLink: "https://github.com/yourusername/project",
    demoLink: "https://project-demo.com",
    image: "/images/project1.jpg"
  },
  // Add more projects...
];
```

### Styling

- Colors and themes can be modified in `src/App.css`
- Component-specific styles are in their respective CSS files
- Dark mode colors can be adjusted in the `.dark-mode` class in `src/App.css`

### Images

1. Add your project images to the `public/images` directory
2. Update image paths in `src/data/projects.js`

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to your preferred hosting service (e.g., Netlify, Vercel, GitHub Pages)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
