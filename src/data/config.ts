const config = {
  title: "Dipen Vishwakarma | Machine Learning & Web Developer",
  description: {
    long: "Explore the portfolio of Dipen Vishwakarma — a Computer Science student focused on AI, Machine Learning, and Web Development. I build hands-on AI systems, data-driven applications, and interactive web experiences that balance clean architecture with real-world usability.",
    short: "Dipen Vishwakarma — Machine Learning & Web Developer exploring intelligent systems with Python.",
  },
  keywords: [
    "Dipen",
    "portfolio",
    "machine learning",
    "artificial intelligence",
    "web development",
    "computer vision",
    "NLP",
    "data engineering",
    "TensorFlow",
    "PyTorch",
    "Python",
    "React",
    "Three.js",
  ],
  author: "Dipen Vishwakarma",
  email: "vishwakarmadipen85@gmail.com",
  site: "https://dipenvishwakarma.dev",

  // for github stars button
  githubUsername: "vishwakarmadipen85",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "https://www.linkedin.com/in/dipen-vishwakarma-976705303/",
    instagram: "",
    facebook: "",
    github: "https://github.com/vishwakarmadipen85",
  },
};
export { config };
