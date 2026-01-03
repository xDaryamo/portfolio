import React, { useRef, useEffect } from 'react';

const Squares = ({
  direction = 'diagonal',
  speed = 0.5,
  borderColor = 'rgba(204, 214, 246, 0.1)', // Subtle Slate
  hoverFillColor = 'rgba(100, 255, 218, 0.05)', // Subtle Green
  squareSize = 40,
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate the starting offset for the grid lines
      // We use modulo to keep the offset within one square size, creating the infinite scrolling effect
      // We subtract squareSize to ensure we start drawing off-screen to the top-left
      const startX = (gridOffset.current.x % squareSize) - squareSize;
      const startY = (gridOffset.current.y % squareSize) - squareSize;

      ctx.lineWidth = 0.5;
      
      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          
          const squareX = x;
          const squareY = y;
          
          // Check hover based on raw mouse coordinates
          const isHovered = 
            mouseRef.current.x >= squareX && 
            mouseRef.current.x < squareX + squareSize && 
            mouseRef.current.y >= squareY && 
            mouseRef.current.y < squareY + squareSize;

          if (isHovered) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }
          
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    };

    const updateAnimation = () => {
      switch (direction) {
        case 'right': gridOffset.current.x -= speed; break;
        case 'left': gridOffset.current.x += speed; break;
        case 'down': gridOffset.current.y -= speed; break;
        case 'up': gridOffset.current.y += speed; break;
        case 'diagonal':
          gridOffset.current.x -= speed;
          gridOffset.current.y -= speed;
          break;
        default: break;
      }
      
      if (Math.abs(gridOffset.current.x) > squareSize) gridOffset.current.x = 0;
      if (Math.abs(gridOffset.current.y) > squareSize) gridOffset.current.y = 0;

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    // Track mouse globally since the canvas is behind other elements
    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave); // Detect leaving the window

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
    />
  );
};

export default Squares;