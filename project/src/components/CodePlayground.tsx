import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Code2, Eye, Download, Copy, Check, RotateCcw, Maximize } from 'lucide-react';

const CodePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState({
    html: `<div class="container">
  <h1 class="title">Welcome to My Playground!</h1>
  <div class="card">
    <h2>Interactive Demo</h2>
    <p>This is a live code editor where you can experiment with HTML, CSS, and JavaScript.</p>
    <button class="btn" onclick="changeColor()">Click me!</button>
    <div class="result" id="result">Result will appear here</div>
  </div>
</div>`,
    css: `.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center;
  color: #4F46E5;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  border-radius: 15px;
  color: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  text-align: center;
}

.card h2 {
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.card p {
  margin-bottom: 20px;
  line-height: 1.6;
  opacity: 0.9;
}

.btn {
  background: #FF6B6B;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.btn:hover {
  background: #FF5252;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.result {
  margin-top: 20px;
  padding: 15px;
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.animate {
  animation: bounce 1s ease infinite;
}`,
    js: `// Welcome to the JavaScript playground!
let clickCount = 0;
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];

function changeColor() {
  clickCount++;
  const resultElement = document.getElementById('result');
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  resultElement.style.background = randomColor;
  resultElement.textContent = \`Button clicked \${clickCount} times! 🎉\`;
  
  // Add bounce animation
  resultElement.classList.remove('animate');
  setTimeout(() => {
    resultElement.classList.add('animate');
  }, 10);
  
  // Create floating particles
  createParticles();
}

function createParticles() {
  const container = document.querySelector('.container');
  
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = \`
      position: absolute;
      width: 10px;
      height: 10px;
      background: \${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      left: \${Math.random() * 100}%;
      top: \${Math.random() * 100}%;
      animation: float 2s ease-out forwards;
    \`;
    
    container.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 2000);
  }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = \`
  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(180deg);
      opacity: 0;
    }
  }
\`;
document.head.appendChild(style);

// Initialize with a welcome message
document.addEventListener('DOMContentLoaded', function() {
  const result = document.getElementById('result');
  result.textContent = 'Ready to interact! Click the button above.';
});`
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      
      // Set src to about:blank to ensure clean sandboxed context
      iframe.src = 'about:blank';
      
      // Wait for iframe to load the blank page
      iframe.onload = () => {
        const document = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (document) {
          document.open();
          document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <style>${code.css}</style>
              </head>
              <body>
                ${code.html}
                <script>${code.js}</script>
              </body>
            </html>
          `);
          document.close();
        }
      };
    }
  };

  useEffect(() => {
    const timer = setTimeout(runCode, 500);
    return () => clearTimeout(timer);
  }, [code]);

  const copyCode = () => {
    const allCode = `<!-- HTML -->\n${code.html}\n\n/* CSS */\n${code.css}\n\n// JavaScript\n${code.js}`;
    navigator.clipboard.writeText(allCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetCode = () => {
    setCode({
      html: `<div class="container">
  <h1 class="title">Welcome to My Playground!</h1>
  <div class="card">
    <h2>Interactive Demo</h2>
    <p>This is a live code editor where you can experiment with HTML, CSS, and JavaScript.</p>
    <button class="btn" onclick="changeColor()">Click me!</button>
    <div class="result" id="result">Result will appear here</div>
  </div>
</div>`,
      css: `.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center;
  color: #4F46E5;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  border-radius: 15px;
  color: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  text-align: center;
}

.card h2 {
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.card p {
  margin-bottom: 20px;
  line-height: 1.6;
  opacity: 0.9;
}

.btn {
  background: #FF6B6B;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.btn:hover {
  background: #FF5252;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.result {
  margin-top: 20px;
  padding: 15px;
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.animate {
  animation: bounce 1s ease infinite;
}`,
      js: `// Welcome to the JavaScript playground!
let clickCount = 0;
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];

function changeColor() {
  clickCount++;
  const resultElement = document.getElementById('result');
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  resultElement.style.background = randomColor;
  resultElement.textContent = \`Button clicked \${clickCount} times! 🎉\`;
  
  // Add bounce animation
  resultElement.classList.remove('animate');
  setTimeout(() => {
    resultElement.classList.add('animate');
  }, 10);
  
  // Create floating particles
  createParticles();
}

function createParticles() {
  const container = document.querySelector('.container');
  
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = \`
      position: absolute;
      width: 10px;
      height: 10px;
      background: \${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      left: \${Math.random() * 100}%;
      top: \${Math.random() * 100}%;
      animation: float 2s ease-out forwards;
    \`;
    
    container.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 2000);
  }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = \`
  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(180deg);
      opacity: 0;
    }
  }
\`;
document.head.appendChild(style);

// Initialize with a welcome message
document.addEventListener('DOMContentLoaded', function() {
  const result = document.getElementById('result');
  result.textContent = 'Ready to interact! Click the button above.';
});`
    });
  };

  const downloadCode = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Code Playground</title>
    <style>
${code.css}
    </style>
</head>
<body>
${code.html}
    <script>
${code.js}
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playground.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'html' as const, label: 'HTML', icon: '🏗️' },
    { id: 'css' as const, label: 'CSS', icon: '🎨' },
    { id: 'js' as const, label: 'JS', icon: '⚡' },
  ];

  return (
    <section id="playground" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Code <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Playground</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Interactive code editor where you can experiment with HTML, CSS, and JavaScript
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden ${
            isFullscreen ? 'fixed inset-4 z-50' : ''
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <Code2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Live Code Editor
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runCode}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                Run
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyCode}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetCode}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadCode}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                <Maximize className="w-4 h-4" />
                {isFullscreen ? 'Exit' : 'Fullscreen'}
              </motion.button>
            </div>
          </div>

          <div className={`grid ${isFullscreen ? 'grid-cols-2' : 'lg:grid-cols-2'} ${isFullscreen ? 'h-full' : 'h-96 lg:h-[600px]'}`}>
            {/* Code Editor */}
            <div className="flex flex-col">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Code Area */}
              <div className="flex-1 p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-auto">
                <textarea
                  value={code[activeTab]}
                  onChange={(e) => setCode({ ...code, [activeTab]: e.target.value })}
                  className="w-full h-full bg-transparent text-green-400 font-mono text-sm resize-none outline-none"
                  placeholder={`Enter your ${activeTab.toUpperCase()} code here...`}
                  spellCheck="false"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="flex flex-col border-l border-gray-200 dark:border-slate-700">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Preview</span>
              </div>
              
              <div className="flex-1 bg-white">
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-none"
                  title="Code Preview"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Play,
              title: 'Live Preview',
              description: 'See your changes instantly as you type'
            },
            {
              icon: Code2,
              title: 'Syntax Highlighting',
              description: 'Clean code display with proper formatting'
            },
            {
              icon: Download,
              title: 'Export Code',
              description: 'Download your creation as an HTML file'
            },
            {
              icon: Maximize,
              title: 'Fullscreen Mode',
              description: 'Expand for a better coding experience'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CodePlayground;