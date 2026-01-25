// components/NewMaker.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Upload, Type, Palette, Clock,
  Image as ImageIcon, Layout, Zap,
  Save, Trash2, ChevronLeft, ChevronRight,
  Eye, EyeOff, Lock, Settings, Maximize2,
  Minus, Plus, Move, Sun, Moon, Droplets,
  CornerUpLeft, CornerUpRight, CornerDownLeft, CornerDownRight,
  Square, AlertCircle, Bold, Italic, Type as TypeIcon,
  AlignLeft, Hash
} from 'lucide-react';

const NewMaker = () => {
  // State for the editor
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [boxes, setBoxes] = useState(() => {
    const savedBoxes = localStorage.getItem('newMakerBoxes');
    return savedBoxes ? JSON.parse(savedBoxes) : [];
  });
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [password, setPassword] = useState('sherifatmaker12');
  const [inputPassword, setInputPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [editorMode, setEditorMode] = useState('create');
  const [boxDuration, setBoxDuration] = useState(5);
  const [storageError, setStorageError] = useState('');

  // Current box being edited
  const [currentBox, setCurrentBox] = useState({
    id: Date.now(),
    title: '',
    body: '',
    image: null,
    imagePreview: '',
    width: 350,
    height: 300,
    position: 'bottom-left',
    imagePosition: 'top',
    animation: 'fade',
    bgColor: '#000000',
    bgGradient: ['#000000', '#1a1a1a'],
    textColor: '#ffffff',
    showTime: 'always',
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: '',
    boxShadow: '2xl',
    opacity: 1,
    blur: 0,
    order: 0,
    borderRadius: {
      topLeft: '0px',
      topRight: '0px',
      bottomLeft: '0px',
      bottomRight: '0px',
      all: '0px'
    },
    borderRadiusMode: 'all',
    bgType: 'solid',
    borderSide: 'right',
    createdDate: new Date().toISOString().split('T')[0],
    textBgOpacity: 0.3,
    textBlur: 5,
    // New properties
    highlightColor: '#FF0000', // Red default
    headerStyle: 'gradient',
    fontFamily: 'font-sans',
    fontWeight: 'font-normal',
    textSize: 'base',
    // New: Text color options
    headerTextColor: '#FFFFFF',
    headerTextColorType: 'solid',
    bodyTextColor: '#FFFFFF',
    bodyTextColorType: 'solid',
    // New: Header background
    headerBackground: 'none',
    headerBackgroundType: 'none',
    headerBgBlur: 0,
    // New: Image border radius
    imageBorderRadius: '0px',
    imageBorderRadiusMode: 'preset',
    customImageBorderRadius: '0px'
  });

  const tapCount = useRef(0);
  const tapTimeout = useRef(null);
  const keyPressCount = useRef(0);
  const keyPressTimeout = useRef(null);
  const rightClickCount = useRef(0);
  const rightClickTimeout = useRef(null);
  const carouselInterval = useRef(null);
  const listeningTimeout = useRef(null);

  // Fixed animation presets
  const animations = {
    fade: {
      name: 'Fade In',
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 }
    },
    slide: {
      name: 'Slide Up',
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
      transition: { duration: 0.5 }
    },
    bounce: {
      name: 'Bounce',
      initial: { scale: 0.9, opacity: 0 },
      animate: {
        scale: 1,
        opacity: 1
      },
      exit: { scale: 0.9, opacity: 0 },
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 200
      }
    }
  };

  // Updated color presets with White theme
  const colorPresets = [
    {
      name: 'Black',
      type: 'solid',
      value: '#000000',
      textColor: '#ffffff',
      shadow: '0 4px 6px -1px rgba(255, 255, 255, 0.1)',
      bgType: 'solid',
      textBgOpacity: 0.3,
      textBlur: 5
    },
    {
      name: 'White',
      type: 'solid',
      value: '#FFFFFF',
      textColor: '#000000',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      bgType: 'solid',
      textBgOpacity: 0.1,
      textBlur: 3
    },
    {
      name: 'Dark Red',
      type: 'solid',
      value: '#8B0000',
      textColor: '#ffffff',
      shadow: '0 4px 6px -1px rgba(139, 0, 0, 0.3)',
      bgType: 'solid',
      textBgOpacity: 0.4,
      textBlur: 5
    },
    {
      name: 'Black-Red Gradient',
      type: 'gradient',
      gradient: ['#000000', '#8B0000'],
      textColor: '#ffffff',
      shadow: '0 4px 6px -1px rgba(139, 0, 0, 0.3)',
      bgType: 'gradient',
      textBgOpacity: 0.4,
      textBlur: 5
    },
    {
      name: 'Red-Black Gradient',
      type: 'gradient',
      gradient: ['#8B0000', '#000000'],
      textColor: '#ffffff',
      shadow: '0 4px 6px -1px rgba(139, 0, 0, 0.3)',
      bgType: 'gradient',
      textBgOpacity: 0.4,
      textBlur: 5
    },
    {
      name: 'Transparent Black Blur',
      type: 'glass',
      value: 'rgba(0, 0, 0, 0.15)',
      textColor: '#ffffff',
      blur: 10,
      shadow: '0 8px 32px rgba(139, 0, 0, 0.2)',
      bgType: 'glass',
      textBgOpacity: 0.5,
      textBlur: 8
    },
    {
      name: 'Transparent Red Blur',
      type: 'glass',
      value: 'rgba(139, 0, 0, 0.15)',
      textColor: '#ffffff',
      blur: 10,
      shadow: '0 8px 32px rgba(139, 0, 0, 0.2)',
      bgType: 'glass',
      textBgOpacity: 0.5,
      textBlur: 8
    }
  ];

  // Header style options
  const headerStyles = [
    {
      name: 'Gradient',
      value: 'gradient',
      icon: <div className="w-4 h-4 bg-linear-to-r from-red-500 to-red-700 rounded"></div>,
      description: 'Red gradient border'
    },
    {
      name: 'Solid',
      value: 'solid',
      icon: <div className="w-4 h-4 bg-red-600 rounded"></div>,
      description: 'Solid red line'
    },
    {
      name: 'Double',
      value: 'double',
      icon: <div className="w-4 h-4 flex flex-col justify-between">
        <div className="h-[2px] bg-red-600"></div>
        <div className="h-[2px] bg-red-600"></div>
      </div>,
      description: 'Double border'
    },
    {
      name: 'Dotted',
      value: 'dotted',
      icon: <div className="w-4 h-4 flex items-center justify-center">
        <div className="w-3 h-3 border-2 border-red-600 border-dotted rounded"></div>
      </div>,
      description: 'Dotted border'
    },
    {
      name: 'Underline',
      value: 'underline',
      icon: <div className="w-4 h-4 flex items-end">
        <div className="w-full h-1 bg-red-600"></div>
      </div>,
      description: 'Simple underline'
    }
  ];

  // Font family options
  const fontFamilies = [
    { name: 'Sans', value: 'font-sans', class: 'font-sans' },
    { name: 'Serif', value: 'font-serif', class: 'font-serif' },
    { name: 'Mono', value: 'font-mono', class: 'font-mono' },
    { name: 'Cursive', value: 'font-cursive', class: 'font-[cursive]' }
  ];

  // Font weight options
  const fontWeights = [
    { name: 'Normal', value: 'font-normal', class: 'font-normal' },
    { name: 'Medium', value: 'font-medium', class: 'font-medium' },
    { name: 'Semibold', value: 'font-semibold', class: 'font-semibold' },
    { name: 'Bold', value: 'font-bold', class: 'font-bold' },
    { name: 'Extrabold', value: 'font-extrabold', class: 'font-extrabold' }
  ];

  // Text size options
  const textSizes = [
    { name: 'Small', value: 'sm', class: 'text-sm' },
    { name: 'Base', value: 'base', class: 'text-base' },
    { name: 'Large', value: 'lg', class: 'text-lg' },
    { name: 'XL', value: 'xl', class: 'text-xl' }
  ];

  // Highlight color options
  const highlightColors = [
    { name: 'White', value: '#FFFFFF', textColor: '#000000' },
    { name: 'Red', value: '#FF0000', textColor: '#FFFFFF' },
    { name: 'Black', value: '#000000', textColor: '#FFFFFF' },
    { name: 'Blue', value: '#2563EB', textColor: '#FFFFFF' }
  ];

  // Text color options for header and body
  const textColorOptions = [
    { 
      name: 'Default (White)', 
      value: '#FFFFFF', 
      bgColor: '#000000',
      type: 'solid'
    },
    { 
      name: 'Red', 
      value: '#FF0000', 
      bgColor: '#000000',
      type: 'solid'
    },
    { 
      name: 'Black', 
      value: '#000000', 
      bgColor: '#FFFFFF',
      type: 'solid'
    },
    { 
      name: 'Blue', 
      value: '#2563EB', 
      bgColor: '#000000',
      type: 'solid'
    },
    { 
      name: 'Red-White Gradient', 
      value: 'linear-gradient(45deg, #FF0000, #FFFFFF)', 
      bgColor: '#000000',
      type: 'gradient'
    },
    { 
      name: 'White-Gold Gradient', 
      value: 'linear-gradient(45deg, #FFFFFF, #FFD700)', 
      bgColor: '#000000',
      type: 'gradient'
    },
    { 
      name: 'Glass Light', 
      value: 'rgba(255, 255, 255, 0.9)', 
      bgColor: '#000000',
      type: 'glass',
      blur: 5
    },
    { 
      name: 'Glass Dark', 
      value: 'rgba(0, 0, 0, 0.9)', 
      bgColor: '#FFFFFF',
      type: 'glass',
      blur: 5
    }
  ];

  // Header background/effect options
  const headerBgOptions = [
    {
      name: 'Default',
      value: 'none',
      bgColor: 'transparent',
      borderStyle: 'gradient',
      description: 'No background'
    },
    {
      name: 'Red Solid',
      value: '#8B0000',
      bgColor: '#8B0000',
      borderStyle: 'solid',
      textColor: '#FFFFFF',
      description: 'Solid dark red'
    },
    {
      name: 'Black Solid',
      value: '#000000',
      bgColor: '#000000',
      borderStyle: 'solid',
      textColor: '#FFFFFF',
      description: 'Solid black'
    },
    {
      name: 'White Solid',
      value: '#FFFFFF',
      bgColor: '#FFFFFF',
      borderStyle: 'solid',
      textColor: '#000000',
      description: 'Solid white'
    },
    {
      name: 'Red Gradient',
      value: 'linear-gradient(90deg, #FF0000, #8B0000)',
      bgColor: 'linear-gradient',
      borderStyle: 'gradient',
      textColor: '#FFFFFF',
      description: 'Red gradient'
    },
    {
      name: 'Black-Red Gradient',
      value: 'linear-gradient(90deg, #000000, #8B0000)',
      bgColor: 'linear-gradient',
      borderStyle: 'gradient',
      textColor: '#FFFFFF',
      description: 'Black to red'
    },
    {
      name: 'Glass Light',
      value: 'rgba(255, 255, 255, 0.15)',
      bgColor: 'rgba(255, 255, 255, 0.15)',
      borderStyle: 'glass',
      textColor: '#FFFFFF',
      blur: 10,
      description: 'Light glass effect'
    },
    {
      name: 'Glass Dark',
      value: 'rgba(0, 0, 0, 0.3)',
      bgColor: 'rgba(0, 0, 0, 0.3)',
      borderStyle: 'glass',
      textColor: '#FFFFFF',
      blur: 10,
      description: 'Dark glass effect'
    }
  ];

  // Image border radius options
  const imageBorderRadiusOptions = [
    { name: 'None', value: '0px', icon: <Square className="w-4 h-4" /> },
    { name: 'Small', value: '8px', icon: <div className="w-4 h-4 border border-current rounded-sm" /> },
    { name: 'Medium', value: '12px', icon: <div className="w-4 h-4 border border-current rounded-md" /> },
    { name: 'Large', value: '16px', icon: <div className="w-4 h-4 border border-current rounded-lg" /> },
    { name: 'Full', value: '50%', icon: <div className="w-4 h-4 border border-current rounded-full" /> },
    { name: 'Custom', value: 'custom', icon: <Settings className="w-4 h-4" /> }
  ];

  // Position options (avoiding navbar area)
  const positions = [
    {
      value: 'top-left',
      label: 'Top Left',
      style: { top: '80px', left: '20px' },
      description: 'Below navbar on left',
      borderSide: 'right'
    },
    {
      value: 'top-right',
      label: 'Top Right',
      style: { top: '80px', right: '20px' },
      description: 'Below navbar on right',
      borderSide: 'left'
    },
    {
      value: 'bottom-left',
      label: 'Bottom Left',
      style: { bottom: '20px', left: '20px' },
      description: 'Above footer on left',
      borderSide: 'right'
    },
    {
      value: 'bottom-right',
      label: 'Bottom Right',
      style: { bottom: '20px', right: '20px' },
      description: 'Above footer on right',
      borderSide: 'left'
    }
  ];

  // Save boxes to localStorage with error handling
  useEffect(() => {
    const saveBoxesToStorage = () => {
      try {
        localStorage.setItem('newMakerBoxes', JSON.stringify(boxes));
        setStorageError('');
      } catch (error) {
        console.error('Storage error:', error);
        setStorageError('Storage limit exceeded. Some data may not be saved. Try reducing image sizes or text content.');

        if (error.name === 'QuotaExceededError') {
          try {
            const trimmedBoxes = boxes.map(box => ({
              ...box,
              imagePreview: box.imagePreview ? '[IMAGE_REMOVED_DUE_TO_STORAGE_LIMIT]' : ''
            }));
            localStorage.setItem('newMakerBoxes', JSON.stringify(trimmedBoxes));
            setStorageError('Images removed due to storage limits. Text content saved successfully.');
          } catch (e) {
            try {
              const minimalBoxes = boxes.map(box => ({
                id: box.id,
                title: box.title,
                body: box.body.substring(0, 100),
                width: box.width,
                height: box.height,
                position: box.position,
                bgColor: box.bgColor,
                textColor: box.textColor,
                showTime: box.showTime,
                createdDate: box.createdDate
              }));
              localStorage.setItem('newMakerBoxes', JSON.stringify(minimalBoxes));
              setStorageError('Data trimmed to fit storage limits. Some content may be lost.');
            } catch (finalError) {
              setStorageError('Unable to save data. Storage is full. Please clear browser data.');
            }
          }
        }
      }
    };

    saveBoxesToStorage();
  }, [boxes]);

  // Handle triple tap - DISABLED when editor is open
  useEffect(() => {
    const handleTap = () => {
      if (isEditorOpen || isVisible) return;
      
      tapCount.current++;

      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
      }

      tapTimeout.current = setTimeout(() => {
        tapCount.current = 0;
      }, 1000);

      if (tapCount.current === 3) {
        activatePasswordMode();
        tapCount.current = 0;
      }
    };

    document.addEventListener('click', handleTap);
    return () => document.removeEventListener('click', handleTap);
  }, [isEditorOpen, isVisible]);

  // Handle P key press - DISABLED when editor is open
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isEditorOpen || isVisible) return;
      
      if (e.key.toLowerCase() === 'p') {
        keyPressCount.current++;

        if (keyPressTimeout.current) {
          clearTimeout(keyPressTimeout.current);
        }

        keyPressTimeout.current = setTimeout(() => {
          keyPressCount.current = 0;
        }, 1000);

        if (keyPressCount.current === 3) {
          activatePasswordMode();
          keyPressCount.current = 0;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isEditorOpen, isVisible]);

  // Handle right click - DISABLED when editor is open
  useEffect(() => {
    const handleContextMenu = (e) => {
      if (isEditorOpen || isVisible) return;
      
      e.preventDefault();
      rightClickCount.current++;

      if (rightClickTimeout.current) {
        clearTimeout(rightClickTimeout.current);
      }

      rightClickTimeout.current = setTimeout(() => {
        rightClickCount.current = 0;
      }, 1000);

      if (rightClickCount.current === 3) {
        activatePasswordMode();
        rightClickCount.current = 0;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [isEditorOpen, isVisible]);

  const activatePasswordMode = () => {
    if (isEditorOpen || isVisible) return;

    setShowPasswordInput(true);
    setIsListening(true);

    listeningTimeout.current = setTimeout(() => {
      setIsListening(false);
      setShowPasswordInput(false);
    }, 5 * 60 * 1000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === password) {
      setIsEditorOpen(true);
      setIsVisible(true);
      setShowPasswordInput(false);
      setIsListening(false);
      setInputPassword('');

      if (listeningTimeout.current) {
        clearTimeout(listeningTimeout.current);
      }
    } else {
      setInputPassword('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentBox({
          ...currentBox,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorSelect = (preset) => {
    setCurrentBox({
      ...currentBox,
      bgColor: preset.value || '',
      bgGradient: preset.gradient || ['#000000', '#8B0000'],
      textColor: preset.textColor,
      boxShadow: preset.shadow || 'lg',
      blur: preset.blur || 0,
      bgType: preset.type,
      textBgOpacity: preset.textBgOpacity || 0.3,
      textBlur: preset.textBlur || 5
    });
  };

  // Count words in a string
  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Handle title change with word limit and capitalization
  const handleTitleChange = (e) => {
    const text = e.target.value;
    const words = countWords(text);

    if (words <= 10) {
      const capitalized = text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      setCurrentBox({ ...currentBox, title: capitalized });
    } else {
      const wordsArray = text.trim().split(/\s+/);
      const truncated = wordsArray.slice(0, 10).join(' ');
      const capitalized = truncated
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      setCurrentBox({ ...currentBox, title: capitalized });
    }
  };

  // Handle body change with word limit and formatting
  const handleBodyChange = (e) => {
    const text = e.target.value;
    const words = countWords(text);

    if (words <= 200) {
      setCurrentBox({ ...currentBox, body: text });
    } else {
      const wordsArray = text.trim().split(/\s+/);
      const truncated = wordsArray.slice(0, 200).join(' ');
      setCurrentBox({ ...currentBox, body: truncated });
    }
  };

  // Format text for display with styling
  const formatText = (text, highlightColor) => {
    if (!text) return '';
    
    // Process asterisk for bold and highlight
    let formatted = text.replace(/\*(.*?)\*/g, (match, content) => {
      return `<span class="font-bold" style="color: ${highlightColor || '#FF0000'}">${content}</span>`;
    });
    
    // Process underscore for italic
    formatted = formatted.replace(/_(.*?)_/g, (match, content) => {
      return `<span class="italic">${content}</span>`;
    });
    
    // Process double asterisk for both bold and highlight
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, (match, content) => {
      return `<span class="font-bold" style="color: ${highlightColor || '#FF0000'}">${content}</span>`;
    });
    
    return formatted;
  };

  const addNewBox = () => {
    if (boxes.length >= 4) {
      alert('Maximum 4 boxes allowed!');
      return;
    }

    if (!currentBox.body.trim() && !currentBox.imagePreview) {
      alert('Please add either text content or an image before saving the box!');
      return;
    }

    let boxPosition = currentBox.position;
    let boxBorderSide = positions.find(p => p.value === currentBox.position)?.borderSide || 'right';

    if (boxes.length > 0) {
      boxPosition = boxes[0].position;
      boxBorderSide = boxes[0].borderSide;
    }

    const newBox = {
      ...currentBox,
      id: Date.now() + Math.random(),
      order: boxes.length,
      duration: boxDuration,
      position: boxPosition,
      borderSide: boxBorderSide,
      createdDate: new Date().toISOString().split('T')[0]
    };

    console.log('Adding new box:', newBox);

    try {
      setBoxes([...boxes, newBox]);
      resetCurrentBox();
    } catch (error) {
      console.error('Error adding box:', error);
      alert('Error saving box. The data might be too large. Try reducing image size or text content.');
    }
  };

  const updateBox = () => {
    if (!currentBox.body.trim() && !currentBox.imagePreview) {
      alert('Please add either text content or an image before updating the box!');
      return;
    }

    const updatedBoxes = [...boxes];
    updatedBoxes[currentBoxIndex] = {
      ...currentBox,
      position: boxes.length > 0 ? boxes[0].position : currentBox.position,
      borderSide: boxes.length > 0 ? boxes[0].borderSide : positions.find(p => p.value === currentBox.position)?.borderSide || 'right'
    };

    try {
      setBoxes(updatedBoxes);
      setEditorMode('create');
      resetCurrentBox();
    } catch (error) {
      console.error('Error updating box:', error);
      alert('Error updating box. The data might be too large.');
    }
  };

  const deleteBox = (index) => {
    const updatedBoxes = boxes.filter((_, i) => i !== index);

    try {
      setBoxes(updatedBoxes);

      if (index === currentBoxIndex && updatedBoxes.length > 0) {
        setCurrentBoxIndex(0);
      } else if (updatedBoxes.length === 0) {
        resetCurrentBox();
      }
    } catch (error) {
      console.error('Error deleting box:', error);
      alert('Error deleting box. Please try again.');
    }
  };

  const resetCurrentBox = () => {
    setCurrentBox({
      id: Date.now(),
      title: '',
      body: '',
      image: null,
      imagePreview: '',
      width: 350,
      height: 300,
      position: boxes.length > 0 ? boxes[0].position : 'bottom-left',
      imagePosition: 'left',
      animation: 'fade',
      bgColor: '#000000',
      bgGradient: ['#000000', '#1a1a1a'],
      textColor: '#ffffff',
      showTime: 'always',
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      boxShadow: 'lg',
      opacity: 1,
      blur: 0,
      order: boxes.length,
      borderRadius: {
        topLeft: '0px',
        topRight: '0px',
        bottomLeft: '0px',
        bottomRight: '0px',
        all: '0px'
      },
      borderRadiusMode: 'all',
      bgType: 'solid',
      borderSide: boxes.length > 0 ? boxes[0].borderSide : 'right',
      createdDate: new Date().toISOString().split('T')[0],
      textBgOpacity: 0.3,
      textBlur: 5,
      highlightColor: '#FF0000',
      headerStyle: 'gradient',
      fontFamily: 'font-sans',
      fontWeight: 'font-normal',
      textSize: 'base',
      headerTextColor: '#FFFFFF',
      headerTextColorType: 'solid',
      bodyTextColor: '#FFFFFF',
      bodyTextColorType: 'solid',
      headerBackground: 'none',
      headerBackgroundType: 'none',
      headerBgBlur: 0,
      imageBorderRadius: '0px',
      imageBorderRadiusMode: 'preset',
      customImageBorderRadius: '0px'
    });
  };

  // Get border radius string
  const getBorderRadius = (box) => {
    if (box.borderRadiusMode === 'all') {
      return box.borderRadius.all;
    } else {
      return `${box.borderRadius.topLeft} ${box.borderRadius.topRight} ${box.borderRadius.bottomRight} ${box.borderRadius.bottomLeft}`;
    }
  };

  const getBoxStyle = (box) => {
    const position = positions.find(p => p.value === box.position);

    let background = '';
    if (box.bgType === 'gradient' && box.bgGradient) {
      background = `linear-gradient(135deg, ${box.bgGradient[0]}, ${box.bgGradient[1]})`;
    } else if (box.bgType === 'glass') {
      background = box.bgColor || 'rgba(0, 0, 0, 0.15)';
    } else {
      background = box.bgColor || '#000000';
    }

    const style = {
      position: 'fixed',
      width: `${Math.min(box.width, 400)}px`,
      height: `${Math.min(box.height, 400)}px`,
      maxWidth: '400px',
      maxHeight: '400px',
      background,
      backdropFilter: box.blur > 0 ? `blur(${box.blur}px)` : 'none',
      color: box.textColor,
      boxShadow: box.boxShadow === 'lg' ?
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' :
        box.boxShadow === 'xl' ?
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' :
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderRadius: getBorderRadius(box),
      opacity: box.opacity,
      zIndex: 9998,
      overflow: 'hidden',
      ...position?.style
    };

    return style;
  };

  const checkBoxVisibility = (box) => {
    if (box.showTime === 'always') return true;

    const now = new Date();

    if (box.showTime === 'scheduled') {
      if (box.startDate) {
        const startDate = new Date(box.startDate);
        startDate.setHours(0, 0, 0, 0);

        const today = new Date(now);
        today.setHours(0, 0, 0, 0);

        if (today < startDate) {
          return false;
        }
      }

      if (box.endDate) {
        const endDate = new Date(box.endDate);
        endDate.setHours(23, 59, 59, 999);

        const today = new Date(now);
        today.setHours(0, 0, 0, 0);

        if (today > endDate) {
          return false;
        }
      }

      if (box.startTime && box.endTime) {
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [startHour, startMin] = box.startTime.split(':').map(Number);
        const [endHour, endMin] = box.endTime.split(':').map(Number);
        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;

        if (currentTime < startMinutes || currentTime > endMinutes) {
          return false;
        }
      }

      return true;
    }

    if (box.showTime === 'duration' && box.duration) {
      if (box.createdDate) {
        const createdDate = new Date(box.createdDate);
        const expiryDate = new Date(createdDate);
        expiryDate.setDate(expiryDate.getDate() + box.duration);

        return now <= expiryDate;
      }
    }

    return false;
  };

  // Start carousel rotation
  useEffect(() => {
    if (boxes.length > 1 && autoRotate && !isEditorOpen) {
      carouselInterval.current = setInterval(() => {
        setCurrentBoxIndex((prev) => (prev + 1) % boxes.length);
      }, 5000);
    }

    return () => {
      if (carouselInterval.current) {
        clearInterval(carouselInterval.current);
      }
    };
  }, [boxes.length, autoRotate, isEditorOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (carouselInterval.current) clearInterval(carouselInterval.current);
      if (listeningTimeout.current) clearTimeout(listeningTimeout.current);
      if (tapTimeout.current) clearTimeout(tapTimeout.current);
      if (keyPressTimeout.current) clearTimeout(keyPressTimeout.current);
      if (rightClickTimeout.current) clearTimeout(rightClickTimeout.current);
    };
  }, []);

  // Handle edit mode
  useEffect(() => {
    if (editorMode === 'edit' && boxes[currentBoxIndex]) {
      setCurrentBox(boxes[currentBoxIndex]);
    }
  }, [editorMode, currentBoxIndex, boxes]);

  const getBorderGradient = (box) => {
    const isDarkRed = box.bgType === 'solid' && box.bgColor === '#8B0000';
    const isRedGradient = box.bgType === 'gradient' && box.bgGradient?.[0]?.includes('8B0000');

    if (isDarkRed || isRedGradient) {
      return 'from-red-500 to-red-700';
    }
    return 'from-red-600 to-red-800';
  };

  const getBorderPosition = (borderSide) => {
    return borderSide === 'right'
      ? { left: '0', top: '0', bottom: '0', width: '3px' }
      : { right: '0', top: '0', bottom: '0', width: '3px' };
  };

  // Get header style class
  const getHeaderStyle = (box) => {
    switch (box.headerStyle) {
      case 'solid':
        return 'border-b-2 border-red-600';
      case 'double':
        return 'border-b-4 border-red-600 border-double';
      case 'dotted':
        return 'border-b-2 border-red-600 border-dotted';
      case 'underline':
        return 'border-b border-red-600';
      case 'gradient':
      default:
        return 'border-b-2 border-red-600';
    }
  };

  // Clear all data
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all boxes? This cannot be undone.')) {
      try {
        localStorage.removeItem('newMakerBoxes');
        setBoxes([]);
        resetCurrentBox();
        setCurrentBoxIndex(0);
        setStorageError('');
        alert('All data cleared successfully.');
      } catch (error) {
        console.error('Error clearing data:', error);
        alert('Error clearing data. Please try again.');
      }
    }
  };

  return (
    <>
      {/* Password Input Modal */}
      <AnimatePresence>
        {showPasswordInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-10000 flex items-center justify-center"
            onClick={() => {
              setShowPasswordInput(false);
              setIsListening(false);
              if (listeningTimeout.current) {
                clearTimeout(listeningTimeout.current);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="bg-linear-to-b from-gray-900 to-black border-2 border-red-600 shadow-2xl rounded-xl p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-bold text-white">Enter Password</h3>
              </div>

              <div className="mb-4 p-3 bg-linear-to-r from-red-900/30 to-black/30 border border-red-800/50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-red-300">
                  <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                  <span>{isListening ? 'Listening for password...' : 'Ready for password'}</span>
                </div>
                <p className="text-xs text-red-400 mt-1">
                  System will stop listening in 5 minutes
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-red-700 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-900 mb-4"
                  placeholder="Enter password"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-linear-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02]"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordInput(false);
                      setIsListening(false);
                      if (listeningTimeout.current) {
                        clearTimeout(listeningTimeout.current);
                      }
                    }}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <div className="mt-4 text-xs text-gray-400">
                <p>Activation methods:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Triple tap anywhere on screen</li>
                  <li>Triple right-click anywhere</li>
                  <li>Press 'P' key three times</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Storage Error Alert */}
      <AnimatePresence>
        {storageError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-10001 max-w-md"
          >
            <div className="bg-linear-to-r from-red-900 to-black border-2 border-red-600 rounded-lg shadow-2xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">Storage Warning</h4>
                  <p className="text-sm text-red-300 mb-2">{storageError}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={clearAllData}
                      className="px-3 py-1 text-xs bg-red-800 hover:bg-red-700 text-white rounded transition-colors"
                    >
                      Clear All Data
                    </button>
                    <button
                      onClick={() => setStorageError('')}
                      className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl bg-linear-to-b from-gray-900 to-black shadow-2xl z-[9999] overflow-hidden border-2 border-red-600"
          >
            <div className="bg-linear-to-r from-black via-red-900 to-black p-4 relative">
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-red-500 to-transparent"></div>
              <div className="absolute bottom-1 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-red-300 to-transparent opacity-50"></div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Settings className="w-6 h-6 text-red-400" />
                  <h2 className="text-xl font-bold text-white">New Maker - Content Box Creator</h2>
                </div>
                <button
                  onClick={() => {
                    setIsVisible(false);
                    setIsEditorOpen(false);
                  }}
                  className="p-2 rounded-full hover:bg-red-900/30 transition-colors border border-red-800"
                >
                  <X className="w-5 h-5 text-red-400" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[80vh] overflow-y-auto bg-linear-to-b from-gray-900 to-black custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Form */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-400 border-b border-red-700 pb-2">
                      <Layout className="w-5 h-5" />
                      Box Configuration
                    </h3>

                    {/* Size Controls */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-red-300">Width (px)</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="150"
                            max="400"
                            value={currentBox.width}
                            onChange={(e) => setCurrentBox({ ...currentBox, width: parseInt(e.target.value) })}
                            className="flex-1 accent-red-600"
                          />
                          <span className="w-20 px-2 py-1 border border-red-800 rounded text-center bg-gray-800 text-red-300">
                            {currentBox.width}px
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-red-300">Height (px)</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="150"
                            max="400"
                            value={currentBox.height}
                            onChange={(e) => setCurrentBox({ ...currentBox, height: parseInt(e.target.value) })}
                            className="flex-1 accent-red-600"
                          />
                          <span className="w-20 px-2 py-1 border border-red-800 rounded text-center bg-gray-800 text-red-300">
                            {currentBox.height}px
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Position */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-red-300">Position on Page</label>
                      <div className="grid grid-cols-2 gap-2">
                        {positions.map((pos) => (
                          <button
                            key={pos.value}
                            onClick={() => setCurrentBox({
                              ...currentBox,
                              position: pos.value,
                              borderSide: pos.borderSide
                            })}
                            className={`p-3 border rounded-lg text-center transition-all duration-300 ${currentBox.position === pos.value
                                ? 'bg-linear-to-b from-red-900 to-red-800 border-red-600 text-white shadow-lg'
                                : 'border-red-800 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-red-700'
                              }`}
                          >
                            <div className="font-medium">{pos.label}</div>
                            <div className="text-xs text-gray-400">{pos.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Position */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-red-300">Image Position</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['left', 'right', 'top', 'bottom'].map((pos) => (
                          <button
                            key={pos}
                            onClick={() => setCurrentBox({ ...currentBox, imagePosition: pos })}
                            className={`p-3 border rounded-lg text-center transition-all duration-300 ${currentBox.imagePosition === pos
                                ? 'bg-linear-to-b from-red-900 to-red-800 border-red-600 text-white shadow-lg'
                                : 'border-red-800 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-red-700'
                              }`}
                          >
                            {pos.charAt(0).toUpperCase() + pos.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Border Radius Options */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-red-300">Border Radius</label>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setCurrentBox({ ...currentBox, borderRadiusMode: 'all' })}
                            className={`flex-1 p-2 border rounded-lg text-center transition-all duration-300 ${currentBox.borderRadiusMode === 'all'
                                ? 'bg-linear-to-b from-red-900 to-red-800 border-red-600 text-white shadow-lg'
                                : 'border-red-800 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-red-700'
                              }`}
                          >
                            <Square className="w-4 h-4 mx-auto mb-1" />
                            <div className="text-xs">All Corners</div>
                          </button>
                          <button
                            onClick={() => setCurrentBox({ ...currentBox, borderRadiusMode: 'custom' })}
                            className={`flex-1 p-2 border rounded-lg text-center transition-all duration-300 ${currentBox.borderRadiusMode === 'custom'
                                ? 'bg-linear-to-b from-red-900 to-red-800 border-red-600 text-white shadow-lg'
                                : 'border-red-800 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-red-700'
                              }`}
                          >
                            <CornerUpLeft className="w-4 h-4 mx-auto mb-1" />
                            <div className="text-xs">Custom Corners</div>
                          </button>
                        </div>

                        {currentBox.borderRadiusMode === 'all' ? (
                          <div>
                            <label className="block text-xs mb-1 text-red-300">All Corners Radius: {currentBox.borderRadius.all}</label>
                            <input
                              type="range"
                              min="0"
                              max="50"
                              value={parseInt(currentBox.borderRadius.all) || 0}
                              onChange={(e) => setCurrentBox({
                                ...currentBox,
                                borderRadius: {
                                  ...currentBox.borderRadius,
                                  all: `${e.target.value}px`
                                }
                              })}
                              className="w-full accent-red-600"
                            />
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs mb-1 text-red-300">Top Left</label>
                              <div className="flex items-center gap-1">
                                <CornerUpLeft className="w-4 h-4 text-red-400" />
                                <input
                                  type="range"
                                  min="0"
                                  max="50"
                                  value={parseInt(currentBox.borderRadius.topLeft) || 0}
                                  onChange={(e) => setCurrentBox({
                                    ...currentBox,
                                    borderRadius: {
                                      ...currentBox.borderRadius,
                                      topLeft: `${e.target.value}px`
                                    }
                                  })}
                                  className="flex-1 accent-red-600"
                                />
                                <span className="text-xs text-red-300 w-10">{currentBox.borderRadius.topLeft}</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs mb-1 text-red-300">Top Right</label>
                              <div className="flex items-center gap-1">
                                <CornerUpRight className="w-4 h-4 text-red-400" />
                                <input
                                  type="range"
                                  min="0"
                                  max="50"
                                  value={parseInt(currentBox.borderRadius.topRight) || 0}
                                  onChange={(e) => setCurrentBox({
                                    ...currentBox,
                                    borderRadius: {
                                      ...currentBox.borderRadius,
                                      topRight: `${e.target.value}px`
                                    }
                                  })}
                                  className="flex-1 accent-red-600"
                                />
                                <span className="text-xs text-red-300 w-10">{currentBox.borderRadius.topRight}</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs mb-1 text-red-300">Bottom Left</label>
                              <div className="flex items-center gap-1">
                                <CornerDownLeft className="w-4 h-4 text-red-400" />
                                <input
                                  type="range"
                                  min="0"
                                  max="50"
                                  value={parseInt(currentBox.borderRadius.bottomLeft) || 0}
                                  onChange={(e) => setCurrentBox({
                                    ...currentBox,
                                    borderRadius: {
                                      ...currentBox.borderRadius,
                                      bottomLeft: `${e.target.value}px`
                                    }
                                  })}
                                  className="flex-1 accent-red-600"
                                />
                                <span className="text-xs text-red-300 w-10">{currentBox.borderRadius.bottomLeft}</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs mb-1 text-red-300">Bottom Right</label>
                              <div className="flex items-center gap-1">
                                <CornerDownRight className="w-4 h-4 text-red-400" />
                                <input
                                  type="range"
                                  min="0"
                                  max="50"
                                  value={parseInt(currentBox.borderRadius.bottomRight) || 0}
                                  onChange={(e) => setCurrentBox({
                                    ...currentBox,
                                    borderRadius: {
                                      ...currentBox.borderRadius,
                                      bottomRight: `${e.target.value}px`
                                    }
                                  })}
                                  className="flex-1 accent-red-600"
                                />
                                <span className="text-xs text-red-300 w-10">{currentBox.borderRadius.bottomRight}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Color Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-red-300">Box Color & Style</label>
                      <div className="grid grid-cols-3 gap-2">
                        {colorPresets.map((preset) => (
                          <button
                            key={preset.name}
                            onClick={() => handleColorSelect(preset)}
                            className="p-2 border border-red-800 rounded-lg text-center group transition-transform hover:scale-105 duration-300"
                            style={{
                              background: preset.type === 'gradient'
                                ? `linear-gradient(135deg, ${preset.gradient[0]}, ${preset.gradient[1]})`
                                : preset.value,
                              color: preset.textColor,
                              boxShadow: preset.shadow
                            }}
                          >
                            <div className="text-xs font-medium">{preset.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text Background Settings */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-red-300">Text Background</label>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs mb-1 text-red-300">Opacity: {currentBox.textBgOpacity}</label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={currentBox.textBgOpacity}
                            onChange={(e) => setCurrentBox({ ...currentBox, textBgOpacity: parseFloat(e.target.value) })}
                            className="w-full accent-red-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs mb-1 text-red-300">Blur: {currentBox.textBlur}px</label>
                          <input
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            value={currentBox.textBlur}
                            onChange={(e) => setCurrentBox({ ...currentBox, textBlur: parseInt(e.target.value) })}
                            className="w-full accent-red-600"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Animation Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-red-300">Animation</label>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(animations).map(([key, anim]) => (
                          <button
                            key={key}
                            onClick={() => setCurrentBox({ ...currentBox, animation: key })}
                            className={`p-3 border rounded-lg text-center transition-all duration-300 ${currentBox.animation === key
                                ? 'bg-linear-to-b from-red-900 to-red-800 border-red-600 text-white shadow-lg'
                                : 'border-red-800 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-red-700'
                              }`}
                          >
                            <Zap className="w-4 h-4 mx-auto mb-1" />
                            <div className="text-xs">{anim.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timing Settings */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-red-300">Display Timing</label>
                      <div className="space-y-2">
                        <select
                          value={currentBox.showTime}
                          onChange={(e) => setCurrentBox({ ...currentBox, showTime: e.target.value })}
                          className="w-full p-2 border border-red-800 rounded bg-gray-800 text-white"
                        >
                          <option value="always">Always Visible</option>
                          <option value="scheduled">Scheduled Date/Time</option>
                          <option value="duration">Specific Duration (Days)</option>
                        </select>

                        {currentBox.showTime === 'scheduled' && (
                          <>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div>
                                <label className="block text-xs mb-1 text-red-300">Start Date</label>
                                <input
                                  type="date"
                                  value={currentBox.startDate}
                                  onChange={(e) => setCurrentBox({ ...currentBox, startDate: e.target.value })}
                                  className="w-full p-2 border border-red-800 rounded bg-gray-800 text-white text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs mb-1 text-red-300">End Date</label>
                                <input
                                  type="date"
                                  value={currentBox.endDate}
                                  onChange={(e) => setCurrentBox({ ...currentBox, endDate: e.target.value })}
                                  className="w-full p-2 border border-red-800 rounded bg-gray-800 text-white text-sm"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs mb-1 text-red-300">Start Time</label>
                                <input
                                  type="time"
                                  value={currentBox.startTime}
                                  onChange={(e) => setCurrentBox({ ...currentBox, startTime: e.target.value })}
                                  className="w-full p-2 border border-red-800 rounded bg-gray-800 text-white text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs mb-1 text-red-300">End Time</label>
                                <input
                                  type="time"
                                  value={currentBox.endTime}
                                  onChange={(e) => setCurrentBox({ ...currentBox, endTime: e.target.value })}
                                  className="w-full p-2 border border-red-800 rounded bg-gray-800 text-white text-sm"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {currentBox.showTime === 'duration' && (
                          <div className="flex gap-2">
                            <input
                              type="number"
                              min="1"
                              max="365"
                              value={boxDuration}
                              onChange={(e) => setBoxDuration(parseInt(e.target.value))}
                              className="flex-1 p-2 border border-red-800 rounded bg-gray-800 text-white"
                              placeholder="Days"
                            />
                            <span className="self-center text-red-300">days</span>
                            </div>
                        )}
                      </div>
                    </div>
                  </div>

          {/* Live Preview */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2 text-red-300">Live Preview</h4>
                      <div
                        className="border border-red-800 overflow-hidden preview-container"
                        style={{
                          width: `${Math.min(currentBox.width, 400)}px`,
                          height: `${Math.min(currentBox.height, 400)}px`,
                          maxWidth: '100%',
                          maxHeight: '400px',
                          margin: '0 auto',
                          background: currentBox.bgType === 'gradient'
                            ? `linear-gradient(135deg, ${currentBox.bgGradient[0]}, ${currentBox.bgGradient[1]})`
                            : currentBox.bgColor,
                          backdropFilter: currentBox.blur > 0 ? `blur(${currentBox.blur}px)` : 'none',
                          color: currentBox.textColor,
                          boxShadow: currentBox.boxShadow === 'lg'
                            ? '0 10px 15px -3px rgba(139, 0, 0, 0.1)'
                            : '0 4px 6px -1px rgba(139, 0, 0, 0.1)',
                          borderRadius: getBorderRadius(currentBox)
                        }}
                      >
                        {currentBox.imagePreview && !currentBox.body.trim() && !currentBox.title.trim() ? (
                          <div className="w-full h-full">
                            <img
                              src={currentBox.imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              style={{
                                borderRadius: currentBox.imageBorderRadius
                              }}
                            />
                          </div>
                        ) : (
                          <div className={`flex h-full ${currentBox.imagePosition === 'left' ? 'flex-row' :
                              currentBox.imagePosition === 'right' ? 'flex-row-reverse' :
                                currentBox.imagePosition === 'top' ? 'flex-col' :
                                  'flex-col-reverse'
                            }`}>
                            {currentBox.imagePreview && (
                              <div className={`${currentBox.imagePosition === 'left' || currentBox.imagePosition === 'right'
                                  ? 'w-1/3 shrink-0'
                                  : 'h-1/3 shrink-0'
                                }`}>
                                <img
                                  src={currentBox.imagePreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                  style={{
                                    borderRadius: currentBox.imageBorderRadius
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex-1 overflow-auto p-4 relative">
                              <div
                                className="absolute inset-0"
                                style={{
                                  background: `rgba(255, 255, 255, ${currentBox.textBgOpacity || 0.3})`,
                                  backdropFilter: `blur(${currentBox.textBlur || 5}px)`,
                                  zIndex: 0
                                }}
                              ></div>
                              <div className={`relative z-10 ${currentBox.fontFamily} ${currentBox.fontWeight}`}>
                                {currentBox.title && (
                                  <div className={`mb-4 pb-3 ${getHeaderStyle(currentBox)} relative overflow-hidden rounded-t-lg`}
                                    style={{
                                      background: currentBox.headerBackground !== 'none' ? currentBox.headerBackground : 'transparent',
                                      backdropFilter: currentBox.headerBgBlur > 0 ? `blur(${currentBox.headerBgBlur}px)` : 'none',
                                      margin: '-1rem -1rem 1rem -1rem',
                                      padding: '1rem'
                                    }}
                                  >
                                    <h4 
                                      className={`font-bold ${currentBox.textSize === 'sm' ? 'text-lg' :
                                          currentBox.textSize === 'base' ? 'text-xl' :
                                          currentBox.textSize === 'lg' ? 'text-2xl' :
                                          'text-3xl'
                                        } text-left`}
                                      style={{
                                        background: currentBox.headerTextColorType === 'gradient' ? currentBox.headerTextColor : undefined,
                                        color: currentBox.headerTextColorType === 'gradient' ? 'transparent' : currentBox.headerTextColor,
                                        WebkitBackgroundClip: currentBox.headerTextColorType === 'gradient' ? 'text' : undefined,
                                        backgroundClip: currentBox.headerTextColorType === 'gradient' ? 'text' : undefined,
                                        textShadow: currentBox.headerTextColorType === 'glass' ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
                                      }}
                                    >
                                      {currentBox.title}
                                    </h4>
                                  </div>
                                )}
                                {currentBox.body && (
                                  <div className={`${currentBox.textSize} text-left leading-relaxed`}
                                    dangerouslySetInnerHTML={{
                                      __html: formatText(currentBox.body, currentBox.highlightColor)
                                    }}
                                    style={{
                                      background: currentBox.bodyTextColorType === 'gradient' ? currentBox.bodyTextColor : undefined,
                                      color: currentBox.bodyTextColorType === 'gradient' ? 'transparent' : currentBox.bodyTextColor,
                                      WebkitBackgroundClip: currentBox.bodyTextColorType === 'gradient' ? 'text' : undefined,
                                      backgroundClip: currentBox.bodyTextColorType === 'gradient' ? 'text' : undefined,
                                      textShadow: currentBox.bodyTextColorType === 'glass' ? '0 0 5px rgba(255,255,255,0.3)' : 'none'
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                </div>

                {/* Right Column - Content & Preview */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-400 border-b border-red-700 pb-2">
                      <Type className="w-5 h-5" />
                      Content & Typography
                    </h3>

                    {/* Title with word counter */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-red-300">Title</label>
                        <span className="text-xs text-red-400">
                          {countWords(currentBox.title)}/10 words
                        </span>
                      </div>
                      <input
                        type="text"
                        value={currentBox.title}
                        onChange={handleTitleChange}
                        className="w-full p-2 border border-red-800 rounded bg-gray-800 text-white"
                        placeholder="Enter box title (max 10 words)"
                      />
                      {countWords(currentBox.title) >= 10 && (
                        <p className="text-xs text-red-400 mt-1">Maximum 10 words reached</p>
                      )}
                    </div>

                    {/* Text Formatting Help */}
                    <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TypeIcon className="w-4 h-4 text-red-400" />
                        <h4 className="text-sm font-medium text-red-300">Text Formatting Guide</h4>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <Bold className="w-3 h-3 text-red-400" />
                          <span className="text-red-300">Wrap text with <code className="bg-red-900/50 px-1 rounded">*asterisks*</code> for bold and highlight</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Italic className="w-3 h-3 text-red-400" />
                          <span className="text-red-300">Wrap text with <code className="bg-red-900/50 px-1 rounded">_underscores_</code> for italic</span>
                        </div>
                      </div>
                    </div>

                    {/* Body Text with word counter */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-red-300">
                          Body Text <span className="text-red-500">*</span>
                        </label>
                        <span className="text-xs text-red-400">
                          {countWords(currentBox.body)}/200 words
                        </span>
                      </div>
                      <textarea
                        value={currentBox.body}
                        onChange={handleBodyChange}
                        className="w-full p-2 border border-red-800 rounded h-32 bg-gray-800 text-white font-sans"
                        placeholder="Enter main content (required if no image, max 200 words)"
                      />
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-400">
                          * Required only if no image is uploaded
                        </p>
                        {countWords(currentBox.body) >= 200 && (
                          <p className="text-xs text-red-400">Maximum 200 words reached</p>
                        )}
                      </div>
                    </div>

                    {/* Font Settings */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2 text-red-300">Typography Settings</h4>
                      <div className="space-y-3">
                        {/* Font Family */}
                        <div>
                          <label className="block text-xs mb-1 text-red-300">Font Family</label>
                          <div className="grid grid-cols-2 gap-2">
                            {fontFamilies.map((font) => (
                              <button
                                key={font.value}
                                onClick={() => setCurrentBox({ ...currentBox, fontFamily: font.value })}
                                className={`p-2 border rounded text-center transition-all duration-300 ${currentBox.fontFamily === font.value
                                    ? 'bg-linear-to-b from-red-900 to-red-800 border-red-600 text-white shadow-lg'
                                    : 'border-red-800 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-red-700'
                                  }`}
                              >
                                <div className={`text-xs ${font.class}`}>{font.name}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Font Weight */}
                        <div>
                          <label className="block text-xs mb-1 text-red-300">Font Weight</label>
                          <div className="grid grid-cols-3 gap-2">
                            {fontWeights.map((weight) => (
                              <button
                                key={weight.value}
                                onClick={() => setCurrentBox({ ...currentBox, fontWeight: weight.value })}
                                className={`p-2 border rounded text-center transition-all duration-300 ${currentBox.fontWeight === weight.value
                                    ? 'bg-linear-to-b from-red-900 to-red-800 border-red-600 text-white shadow-lg'
                                    : 'border-red-800 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-red-700'
                                  }`}
                              >
                                <div className={`text-xs ${weight.class}`}>{weight.name}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Text Size */}
                        <div>
                          <label className="block text-xs mb-1 text-red-300">Text Size</label>
                          <div className="grid grid-cols-4 gap-2">
                            {textSizes.map((size) => (
                              <button
                                key={size.value}
                                onClick={() => setCurrentBox({ ...currentBox, textSize: size.value })}
                                className={`p-2 border rounded text-center transition-all duration-300 ${currentBox.textSize === size.value
                                    ? 'bg-linear-to-b from-red-900 to-red-800 border-red-600 text-white shadow-lg'
                                    : 'border-red-800 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-red-700'
                                  }`}
                              >
                                <div className={`text-xs ${size.class}`}>{size.name}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Header Style */}
                        <div>
                          <label className="block text-xs mb-1 text-red-300">Header Style</label>
                          <div className="grid grid-cols-3 gap-2">
                            {headerStyles.map((style) => (
                              <button
                                key={style.value}
                                onClick={() => setCurrentBox({ ...currentBox, headerStyle: style.value })}
                                className={`p-2 border rounded text-center transition-all duration-300 ${currentBox.headerStyle === style.value
                                    ? 'bg-linear-to-b from-red-900 to-red-800 border-red-600 text-white shadow-lg'
                                    : 'border-red-800 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-red-700'
                                  }`}
                              >
                                <div className="flex flex-col items-center">
                                  <div className="mb-1">{style.icon}</div>
                                  <div className="text-xs">{style.name}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Highlight Color */}
                        <div>
                          <label className="block text-xs mb-1 text-red-300">Highlight Color</label>
                          <div className="grid grid-cols-4 gap-2">
                            {highlightColors.map((color) => (
                              <button
                                key={color.name}
                                onClick={() => setCurrentBox({ ...currentBox, highlightColor: color.value })}
                                className={`p-3 border rounded transition-all duration-300 ${currentBox.highlightColor === color.value
                                    ? 'border-red-600 ring-2 ring-red-500'
                                    : 'border-red-800 hover:border-red-700'
                                  }`}
                                style={{
                                  backgroundColor: color.value,
                                  color: color.textColor
                                }}
                              >
                                <div className="text-xs font-medium">{color.name}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Text Color Options */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-red-300">Text Colors</label>
                      <div className="space-y-3">
                        {/* Header Text Color */}
                        <div>
                          <label className="block text-xs mb-1 text-red-300">Header Text Color</label>
                          <div className="grid grid-cols-4 gap-2">
                            {textColorOptions.slice(0, 4).map((color) => (
                              <button
                                key={color.name}
                                onClick={() => setCurrentBox({
                                  ...currentBox,
                                  headerTextColor: color.value,
                                  headerTextColorType: color.type
                                })}
                                className={`p-2 border rounded transition-all duration-300 ${currentBox.headerTextColor === color.value
                                    ? 'border-red-600 ring-2 ring-red-500'
                                    : 'border-red-800 hover:border-red-700'
                                  }`}
                                style={{
                                  backgroundColor: color.bgColor,
                                  color: color.value,
                                  background: color.type === 'gradient' ? color.value : undefined
                                }}
                              >
                                <div className="text-xs font-medium truncate">{color.name.split(' ')[0]}</div>
                              </button>
                            ))}
                          </div>
                          <div className="grid grid-cols-4 gap-2 mt-2">
                            {textColorOptions.slice(4).map((color) => (
                              <button
                                key={color.name}
                                onClick={() => setCurrentBox({
                                  ...currentBox,
                                  headerTextColor: color.value,
                                  headerTextColorType: color.type
                                })}
                                className={`p-2 border rounded transition-all duration-300 ${currentBox.headerTextColor === color.value
                                    ? 'border-red-600 ring-2 ring-red-500'
                                    : 'border-red-800 hover:border-red-700'
                                  }`}
                                style={{
                                  backgroundColor: color.bgColor,
                                  color: color.type === 'gradient' ? 'white' : color.value,
                                  background: color.type === 'gradient' ? color.value : undefined
                                }}
                              >
                                <div className="text-xs font-medium truncate">{color.name.split(' ')[0]}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Body Text Color */}
                        <div>
                          <label className="block text-xs mb-1 text-red-300">Body Text Color</label>
                          <div className="grid grid-cols-4 gap-2">
                            {textColorOptions.slice(0, 4).map((color) => (
                              <button
                                key={color.name}
                                onClick={() => setCurrentBox({
                                  ...currentBox,
                                  bodyTextColor: color.value,
                                  bodyTextColorType: color.type
                                })}
                                className={`p-2 border rounded transition-all duration-300 ${currentBox.bodyTextColor === color.value
                                    ? 'border-red-600 ring-2 ring-red-500'
                                    : 'border-red-800 hover:border-red-700'
                                  }`}
                                style={{
                                  backgroundColor: color.bgColor,
                                  color: color.value,
                                  background: color.type === 'gradient' ? color.value : undefined
                                }}
                              >
                                <div className="text-xs font-medium truncate">{color.name.split(' ')[0]}</div>
                              </button>
                            ))}
                          </div>
                          <div className="grid grid-cols-4 gap-2 mt-2">
                            {textColorOptions.slice(4).map((color) => (
                              <button
                                key={color.name}
                                onClick={() => setCurrentBox({
                                  ...currentBox,
                                  bodyTextColor: color.value,
                                  bodyTextColorType: color.type
                                })}
                                className={`p-2 border rounded transition-all duration-300 ${currentBox.bodyTextColor === color.value
                                    ? 'border-red-600 ring-2 ring-red-500'
                                    : 'border-red-800 hover:border-red-700'
                                  }`}
                                style={{
                                  backgroundColor: color.bgColor,
                                  color: color.type === 'gradient' ? 'white' : color.value,
                                  background: color.type === 'gradient' ? color.value : undefined
                                }}
                              >
                                <div className="text-xs font-medium truncate">{color.name.split(' ')[0]}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Header Background Options */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-red-300">Header Background/Effect</label>
                      <div className="grid grid-cols-4 gap-2">
                        {headerBgOptions.slice(0, 4).map((option) => (
                          <button
                            key={option.name}
                            onClick={() => setCurrentBox({
                              ...currentBox,
                              headerBackground: option.value,
                              headerBackgroundType: option.borderStyle,
                              headerBgBlur: option.blur || 0
                            })}
                            className={`p-2 border rounded transition-all duration-300 flex flex-col items-center justify-center h-20 ${currentBox.headerBackground === option.value
                                ? 'border-red-600 ring-2 ring-red-500'
                                : 'border-red-800 hover:border-red-700'
                              }`}
                            style={{
                              background: option.value === 'none' ? 'transparent' : option.value,
                              color: option.textColor || '#FFFFFF',
                              backdropFilter: option.blur ? `blur(${option.blur}px)` : 'none'
                            }}
                          >
                            <div className="text-xs font-medium mb-1">{option.name}</div>
                            <div className="text-[10px] opacity-75 text-center">{option.description}</div>
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {headerBgOptions.slice(4).map((option) => (
                          <button
                            key={option.name}
                            onClick={() => setCurrentBox({
                              ...currentBox,
                              headerBackground: option.value,
                              headerBackgroundType: option.borderStyle,
                              headerBgBlur: option.blur || 0
                            })}
                            className={`p-2 border rounded transition-all duration-300 flex flex-col items-center justify-center h-20 ${currentBox.headerBackground === option.value
                                ? 'border-red-600 ring-2 ring-red-500'
                                : 'border-red-800 hover:border-red-700'
                              }`}
                            style={{
                              background: option.value,
                              color: option.textColor || '#FFFFFF',
                              backdropFilter: option.blur ? `blur(${option.blur}px)` : 'none'
                            }}
                          >
                            <div className="text-xs font-medium mb-1">{option.name}</div>
                            <div className="text-[10px] opacity-75 text-center">{option.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1 text-red-300">Image Upload</label>
                      <div className="border-2 border-dashed border-red-800 rounded-lg p-4 text-center bg-gray-900/50">
                        {currentBox.imagePreview ? (
                          <div className="space-y-2">
                            <img
                              src={currentBox.imagePreview}
                              alt="Preview"
                              className="mx-auto max-h-32 object-contain rounded"
                              style={{
                                borderRadius: currentBox.imageBorderRadius
                              }}
                            />
                            <button
                              onClick={() => setCurrentBox({ ...currentBox, image: null, imagePreview: '' })}
                              className="text-red-400 text-sm hover:text-red-300"
                            >
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <Upload className="w-8 h-8 mx-auto text-red-600 mb-2" />
                            <div className="text-sm text-red-400">
                              Click to upload image
                              <br />
                              <span className="text-xs">(PNG, JPG, max 2MB)</span>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Image Border Radius */}
                    {currentBox.imagePreview && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-red-300">Image Border Radius</label>
                        <div className="space-y-2">
                          <div className="grid grid-cols-3 gap-2">
                            {imageBorderRadiusOptions.map((option) => (
                              <button
                                key={option.name}
                                onClick={() => {
                                  if (option.value === 'custom') {
                                    setCurrentBox({
                                      ...currentBox,
                                      imageBorderRadiusMode: 'custom',
                                      imageBorderRadius: currentBox.customImageBorderRadius
                                    });
                                  } else {
                                    setCurrentBox({
                                      ...currentBox,
                                      imageBorderRadiusMode: 'preset',
                                      imageBorderRadius: option.value
                                    });
                                  }
                                }}
                                className={`p-2 border rounded text-center transition-all duration-300 flex flex-col items-center ${currentBox.imageBorderRadius === option.value ||
                                    (option.value === 'custom' && currentBox.imageBorderRadiusMode === 'custom')
                                    ? 'bg-linear-to-b from-red-900 to-red-800 border-red-600 text-white shadow-lg'
                                    : 'border-red-800 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-red-700'
                                  }`}
                              >
                                <div className="mb-1 text-red-400">{option.icon}</div>
                                <div className="text-xs">{option.name}</div>
                              </button>
                            ))}
                          </div>
                          
                          {currentBox.imageBorderRadiusMode === 'custom' && (
                            <div className="mt-2">
                              <label className="block text-xs mb-1 text-red-300">Custom Radius: {currentBox.customImageBorderRadius}</label>
                              <input
                                type="range"
                                min="0"
                                max="50"
                                value={parseInt(currentBox.customImageBorderRadius) || 0}
                                onChange={(e) => setCurrentBox({
                                  ...currentBox,
                                  customImageBorderRadius: `${e.target.value}px`,
                                  imageBorderRadius: `${e.target.value}px`
                                })}
                                className="w-full accent-red-600"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

          
                  </div>
                </div>
              </div>

              {/* Box Management */}
              <div className="border-t border-red-800 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-red-400">Your Boxes ({boxes.length}/4)</h3>
                  <div className="flex gap-2">
                    {editorMode === 'edit' ? (
                      <button
                        onClick={updateBox}
                        disabled={!currentBox.body.trim() && !currentBox.imagePreview}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${(currentBox.body.trim() || currentBox.imagePreview)
                            ? 'bg-linear-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:scale-[1.02]'
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-red-900'
                          }`}
                      >
                        <Save className="w-4 h-4 inline mr-2" />
                        Update Box
                      </button>
                    ) : (
                      <button
                        onClick={addNewBox}
                        disabled={boxes.length >= 4 || (!currentBox.body.trim() && !currentBox.imagePreview)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${boxes.length >= 4
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-red-900'
                            : (currentBox.body.trim() || currentBox.imagePreview)
                              ? 'bg-linear-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:scale-[1.02]'
                              : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-red-900'
                          }`}
                      >
                        <Save className="w-4 h-4 inline mr-2" />
                        Save New Box
                      </button>
                    )}
                    <button
                      onClick={() => setAutoRotate(!autoRotate)}
                      className={`px-4 py-2 rounded-lg border border-red-800 transition-all duration-300 ${autoRotate ? 'bg-linear-to-r from-red-700 to-red-800 text-white' : 'bg-gray-800 text-red-300'
                        }`}
                    >
                      {autoRotate ? 'Auto Rotate: ON' : 'Auto Rotate: OFF'}
                    </button>
                    <button
                      onClick={clearAllData}
                      className="px-4 py-2 rounded-lg bg-red-900/30 border border-red-800 text-red-300 hover:bg-red-800/40 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 inline mr-2" />
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Box List */}
                {boxes.length > 0 && (
                  <div className="space-y-2">
                    {boxes.map((box, index) => (
                      <div
                        key={box.id}
                        className={`flex items-center justify-between p-3 border rounded-lg transition-all duration-300 ${currentBoxIndex === index
                            ? 'bg-linear-to-r from-red-900/30 to-black/30 border-red-600'
                            : 'border-red-800 bg-gray-800/50 hover:bg-gray-800/70'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentBoxIndex === index
                              ? 'bg-linear-to-r from-red-700 to-red-800 text-white'
                              : 'bg-gray-700 text-red-300'
                            }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-white">{box.title || (box.imagePreview ? 'Image Box' : 'Untitled Box')}</div>
                            <div className="text-sm text-gray-400">
                              {box.width}×{box.height}px • {positions.find(p => p.value === box.position)?.label}
                              {box.showTime !== 'always' && ' • Scheduled'}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setCurrentBox(box);
                              setCurrentBoxIndex(index);
                              setEditorMode('edit');
                            }}
                            className="px-3 py-1 text-sm border border-red-800 rounded hover:bg-red-900/30 text-red-300 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteBox(index)}
                            className="px-3 py-1 text-sm bg-red-900/30 text-red-400 rounded hover:bg-red-800/40 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Carousel Controls */}
                {boxes.length > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                      onClick={() => setCurrentBoxIndex((prev) => (prev - 1 + boxes.length) % boxes.length)}
                      className="p-2 rounded-full hover:bg-red-900/30 border border-red-800 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-red-400" />
                    </button>
                    <span className="text-sm text-red-300">
                      Box {currentBoxIndex + 1} of {boxes.length}
                    </span>
                    <button
                      onClick={() => setCurrentBoxIndex((prev) => (prev + 1) % boxes.length)}
                      className="p-2 rounded-full hover:bg-red-900/30 border border-red-800 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Display Created Boxes */}
      <AnimatePresence>
        {boxes.map((box, index) => {
          if (currentBoxIndex !== index && boxes.length > 1) return null;

          const isVisible = checkBoxVisibility(box);
          if (!isVisible) return null;

          const animation = animations[box.animation];

          return (
            <motion.div
              key={box.id}
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={animation.transition}
              style={getBoxStyle(box)}
              className="new-maker-box"
            >
              <div className="h-full flex relative">
                {/* Dynamic border styling */}
                <div
                  className="absolute z-10"
                  style={{
                    ...getBorderPosition(box.borderSide),
                  }}
                >
                  <div className={`w-full h-full bg-linear-to-b ${getBorderGradient(box)}`}></div>
                  <div className="absolute inset-0 bg-linear-to-b from-red-400/30 to-transparent blur-sm"></div>
                </div>

                {/* Image only mode - full width/height */}
                {box.imagePreview && !box.body.trim() && !box.title.trim() ? (
                  <div className="w-full h-full">
                    <img
                      src={box.imagePreview}
                      alt="Content"
                      className="w-full h-full object-cover"
                      style={{
                        borderRadius: box.imageBorderRadius
                      }}
                    />
                  </div>
                ) : (
                  <div className={`flex h-full ${box.imagePosition === 'left' ? 'flex-row' :
                      box.imagePosition === 'right' ? 'flex-row-reverse' :
                        box.imagePosition === 'top' ? 'flex-col' :
                          'flex-col-reverse'
                    } flex-1`}>
                    {box.imagePreview && (
                      <div className={`${box.imagePosition === 'left' || box.imagePosition === 'right'
                          ? 'w-1/3 shrink-0'
                          : 'h-1/3 shrink-0'
                        }`}>
                        <img
                          src={box.imagePreview}
                          alt="Content"
                          className="w-full h-full object-cover"
                          style={{
                            borderRadius: box.imageBorderRadius
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1 relative overflow-hidden">
                      {/* Extended text background that covers scrolling area */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `rgba(255, 255, 255, ${box.textBgOpacity || 0.3})`,
                          backdropFilter: `blur(${box.textBlur || 5}px)`,
                          zIndex: 0
                        }}
                      ></div>

                      {/* Scrollable content with proper padding */}
                      <div className="relative z-10 h-full overflow-y-auto custom-scrollbar">
                        <div className={`p-4 ${box.fontFamily} ${box.fontWeight}`}>
                          {box.title && (
                            <div className={`mb-4 pb-3 ${getHeaderStyle(box)} relative overflow-hidden rounded-t-lg`}
                              style={{
                                background: box.headerBackground !== 'none' ? box.headerBackground : 'transparent',
                                backdropFilter: box.headerBgBlur > 0 ? `blur(${box.headerBgBlur}px)` : 'none',
                                margin: '-1rem -1rem 1rem -1rem',
                                padding: '1rem'
                              }}
                            >
                              <h3 
                                className={`font-bold ${box.textSize === 'sm' ? 'text-lg' :
                                    box.textSize === 'base' ? 'text-xl' :
                                    box.textSize === 'lg' ? 'text-2xl' :
                                    'text-3xl'
                                  } text-left`}
                                style={{
                                  background: box.headerTextColorType === 'gradient' ? box.headerTextColor : undefined,
                                  color: box.headerTextColorType === 'gradient' ? 'transparent' : box.headerTextColor,
                                  WebkitBackgroundClip: box.headerTextColorType === 'gradient' ? 'text' : undefined,
                                  backgroundClip: box.headerTextColorType === 'gradient' ? 'text' : undefined,
                                  textShadow: box.headerTextColorType === 'glass' ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
                                }}
                              >
                                {box.title}
                              </h3>
                            </div>
                          )}
                          {box.body && (
                            <div className={`${box.textSize} text-left leading-relaxed`}
                              dangerouslySetInnerHTML={{
                                __html: formatText(box.body, box.highlightColor)
                              }}
                              style={{
                                background: box.bodyTextColorType === 'gradient' ? box.bodyTextColor : undefined,
                                color: box.bodyTextColorType === 'gradient' ? 'transparent' : box.bodyTextColor,
                                WebkitBackgroundClip: box.bodyTextColorType === 'gradient' ? 'text' : undefined,
                                backgroundClip: box.bodyTextColorType === 'gradient' ? 'text' : undefined,
                                textShadow: box.bodyTextColorType === 'glass' ? '0 0 5px rgba(255,255,255,0.3)' : 'none'
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Carousel Indicator */}
                {boxes.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
                    {boxes.map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentBoxIndex
                            ? 'bg-linear-to-r from-red-500 to-red-600 scale-125 shadow-lg shadow-red-500/50'
                            : 'bg-red-900/50'
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <style jsx="true">{`
       /* Responsive adjustments */
        @media (max-width: 768px) {
          .new-maker-box {
            width: ${Math.min(currentBox.width, 300)}px !important;
            height: ${Math.min(currentBox.height, 350)}px !important;
            max-width: 300px !important;
            max-height: 350px !important;
          }
          
          .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 640px) {
          .new-maker-box {
            width: ${Math.min(currentBox.width, 270)}px !important;
            height: ${Math.min(currentBox.height, 300)}px !important;
            max-width: 270px !important;
            max-height: 300px !important;
          }
        }
        
        @media (max-width: 480px) {
          .new-maker-box {
            width: ${Math.min(currentBox.width, 270)}px !important;
            height: ${Math.min(currentBox.height, 300)}px !important;
            max-width: 270px !important;
            max-height: 300px !important;
          }
        }
      `}</style>
    </>
  );
};

export default NewMaker;