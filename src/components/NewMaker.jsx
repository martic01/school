// components/NewMaker.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Upload, Palette, Clock,
  Image as ImageIcon, Layout, Zap,
  Save, Trash2, ChevronLeft, ChevronRight,
  Lock, Settings, Square, AlertCircle,
  CornerUpLeft, CornerUpRight, CornerDownLeft, CornerDownRight,
  Cloud, Loader, AlertTriangle, CheckCircle, RefreshCw,
  Link as LinkIcon, Smartphone, Monitor
} from 'lucide-react';
import axios from 'axios';

const NewMaker = () => {
  const API_URL = 'https://school-backend-frri.onrender.com/api';

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
  const [passwordBuffer, setPasswordBuffer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [editorMode, setEditorMode] = useState('create');
  const [boxDuration, setBoxDuration] = useState(5);
  const [notification, setNotification] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  const cloudinaryConfig = {
    cloudName: 'dq46c3lf3',
    uploadPreset: 'acedunews-image'
  };

  const buttonLinkOptions = [
    '/about',
    '/course/1',
    '/course/2',
    '/products',
    '/ai-chat',
    '/hostel',
    '/projects',
    '/register',
    '/register',
    'custom'
  ];

  const defaultBox = {
    id: null,
    imageUrl: '',
    imagePublicId: '',
    width: 350,
    height: 300,
    mobileWidth: 260,
    mobileHeight: 280,
    useMobileSize: false,
    position: 'bottom-left',
    animation: 'fade',
    bgColor: '#000000',
    bgGradient: ['#000000', '#1a1a1a'],
    showTime: 'always',
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: '',
    boxShadow: 'lg',
    opacity: 1,
    blur: 0,
    order: 0,
    borderRadius: { topLeft: '0px', topRight: '0px', bottomLeft: '0px', bottomRight: '0px', all: '0px' },
    borderRadiusMode: 'all',
    bgType: 'solid',
    borderSide: 'right',
    createdDate: new Date().toISOString().split('T')[0],
    imageFit: 'cover',
    imagePosition: 'center',
    button: {
      enabled: false,
      text: 'Learn More',
      link: '',
      customLink: '',
      color: '#cc0000',
      textColor: '#ffffff',
      size: 40
    }
  };

  const [currentBox, setCurrentBox] = useState(defaultBox);

  const tapCount = useRef(0);
  const tapTimeout = useRef(null);
  const rightClickCount = useRef(0);
  const rightClickTimeout = useRef(null);
  const carouselInterval = useRef(null);
  const listeningTimeout = useRef(null);
  const passwordTimeout = useRef(null);

  // ─── Notification helper ───────────────────────────────────────────────────
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // ─── Confirm modal ─────────────────────────────────────────────────────────
  const showConfirm = (title, message, onConfirm) => {
    setConfirmModal({ isOpen: true, title, message, onConfirm });
  };
  const closeConfirm = () => setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });

  // ─── Animations ────────────────────────────────────────────────────────────
  const animations = {
    fade: { name: 'Fade In', initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.5 } },
    slide: { name: 'Slide Up', initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -20, opacity: 0 }, transition: { duration: 0.5 } },
    bounce: { name: 'Bounce', initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, transition: { duration: 0.6, type: 'spring', stiffness: 200 } }
  };

  const colorPresets = [
    { name: 'Black', type: 'solid', value: '#000000', bgType: 'solid' },
    { name: 'White', type: 'solid', value: '#FFFFFF', bgType: 'solid' },
    { name: 'Dark Red', type: 'solid', value: '#8B0000', bgType: 'solid' },
    { name: 'Red Gradient', type: 'gradient', gradient: ['#000000', '#8B0000'], bgType: 'gradient' },
    { name: 'Glass Black', type: 'glass', value: 'rgba(0,0,0,0.15)', blur: 10, bgType: 'glass' }
  ];

  const positions = [
    { value: 'top-left', label: 'Top Left', style: { top: '80px', left: '20px' }, borderSide: 'right' },
    { value: 'top-right', label: 'Top Right', style: { top: '80px', right: '20px' }, borderSide: 'left' },
    { value: 'bottom-left', label: 'Bottom Left', style: { bottom: '20px', left: '20px' }, borderSide: 'right' },
    { value: 'bottom-right', label: 'Bottom Right', style: { bottom: '20px', right: '20px' }, borderSide: 'left' }
  ];

  const imageFitOptions = [
    { value: 'cover', label: 'Cover' },
    { value: 'contain', label: 'Contain' },
    { value: 'fill', label: 'Fill' }
  ];

  const thePassword = 'the4memaker';

  // ─── Fetch boxes ───────────────────────────────────────────────────────────
  const fetchBoxes = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/boxes`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBoxes(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchBoxes();
    const interval = setInterval(() => {
      if (!isDeleting) {
        fetchBoxes();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchBoxes, isDeleting]);

  // ─── Auto-delete expired boxes ────────────────────────────────────
  const boxesRef = useRef(boxes);
  useEffect(() => { boxesRef.current = boxes; }, [boxes]);

 useEffect(() => {
  const checkExpired = async () => {
    const now = new Date();
    const expired = boxesRef.current.filter(box => {
      // Use the improved isBoxExpired function
      return isBoxExpired(box);
    });

    if (expired.length === 0) return;

    console.log('Found expired boxes:', expired.map(b => ({ id: b.id, showTime: b.showTime })));

    for (const box of expired) {
      try {
        if (box.imagePublicId) {
          await fetch(`${API_URL}/delete-cloudinary-image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId: box.imagePublicId })
          });
        }
        await fetch(`${API_URL}/boxes/${box.id}`, { method: 'DELETE' });
        console.log(`Deleted expired box: ${box.id}`);
      } catch (e) {
        console.error('Auto-delete error:', e);
      }
    }

    await fetchBoxes();
    showNotification(`${expired.length} expired box(es) removed automatically.`, 'info');
  };

  const expiryInterval = setInterval(checkExpired, 60000); // Check every minute
  checkExpired(); // Run once immediately

  return () => clearInterval(expiryInterval);
}, []);

  // ─── Delete box ──────────────────────────────────
  const deleteBoxFromServer = async (boxId, imagePublicId) => {
    console.log('Starting delete for box:', boxId);

    console.log('Deleting from database...');
    const dbRes = await fetch(`${API_URL}/boxes/${boxId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!dbRes.ok) {
      const errorText = await dbRes.text();
      throw new Error(`Database deletion failed: ${errorText}`);
    }

    console.log('Database deletion successful');

    if (imagePublicId) {
      try {
        console.log('Cleaning up Cloudinary:', imagePublicId);
        await fetch(`${API_URL}/delete-cloudinary-image`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: imagePublicId })
        });
      } catch (e) {
        console.warn('Cloudinary cleanup failed (non-critical):', e);
      }
    }

    return true;
  };

  const clearAllData = () => {
    showConfirm(
      'Clear All Boxes',
      'This will delete ALL boxes and their images permanently. Are you sure?',
      async () => {
        closeConfirm();
        setIsDeleting(true);
        const currentBoxes = [...boxes];

        setBoxes([]);
        setCurrentBoxIndex(0);

        let successCount = 0;
        let failCount = 0;

        for (const box of currentBoxes) {
          try {
            await deleteBoxFromServer(box.id, box.imagePublicId);
            successCount++;
          } catch (e) {
            console.error('Delete error:', e);
            failCount++;
          }
        }

        setIsDeleting(false);

        if (failCount > 0) {
          showNotification(`Cleared ${successCount} boxes, but ${failCount} failed.`, 'error');
          fetchBoxes();
        } else {
          showNotification('All boxes cleared.', 'success');
        }
      }
    );
  };

  // ─── Triple-tap trigger ───────────────────────────────────
  useEffect(() => {
    const handleTap = () => {
      if (isEditorOpen || isVisible) return;

      tapCount.current++;
      clearTimeout(tapTimeout.current);

      tapTimeout.current = setTimeout(() => {
        tapCount.current = 0;
      }, 1000);

      if (tapCount.current === 3) {
        setIsListening(true);
        setPasswordBuffer('');

        if (passwordTimeout.current) {
          clearTimeout(passwordTimeout.current);
        }

        passwordTimeout.current = setTimeout(() => {
          setIsListening(false);
          setPasswordBuffer('');
        }, 10000);

        tapCount.current = 0;
      }
    };

    document.addEventListener('click', handleTap);
    return () => document.removeEventListener('click', handleTap);
  }, [isEditorOpen, isVisible]);

  // ─── Invisible password typing ───────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isListening) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (passwordTimeout.current) {
        clearTimeout(passwordTimeout.current);
      }

      const newBuffer = passwordBuffer + e.key;
      setPasswordBuffer(newBuffer);

      if (newBuffer === thePassword) {
        setIsEditorOpen(true);
        setIsVisible(true);
        setIsListening(false);
        setPasswordBuffer('');
        if (passwordTimeout.current) {
          clearTimeout(passwordTimeout.current);
        }
      } else if (newBuffer.length >= 11 || !thePassword.startsWith(newBuffer)) {
        setPasswordBuffer('');
        setIsListening(false);
        if (passwordTimeout.current) {
          clearTimeout(passwordTimeout.current);
        }
      } else {
        passwordTimeout.current = setTimeout(() => {
          setIsListening(false);
          setPasswordBuffer('');
        }, 10000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListening, passwordBuffer]);

  // ─── Right-click trigger (alternative) ────────────────────
  useEffect(() => {
    const handleRC = (e) => {
      if (isEditorOpen || isVisible) return;
      e.preventDefault();

      rightClickCount.current++;
      clearTimeout(rightClickTimeout.current);

      rightClickTimeout.current = setTimeout(() => {
        rightClickCount.current = 0;
      }, 1000);

      if (rightClickCount.current === 3) {
        setIsListening(true);
        setPasswordBuffer('');

        if (passwordTimeout.current) {
          clearTimeout(passwordTimeout.current);
        }

        passwordTimeout.current = setTimeout(() => {
          setIsListening(false);
          setPasswordBuffer('');
        }, 10000);

        rightClickCount.current = 0;
      }
    };

    document.addEventListener('contextmenu', handleRC);
    return () => document.removeEventListener('contextmenu', handleRC);
  }, [isEditorOpen, isVisible]);

  // ─── Cloudinary upload ─────────────────────────────────────────────────────
  const uploadToCloudinary = async (file) => {
    if (file.size > 5 * 1024 * 1024) { showNotification('Image must be under 5MB', 'error'); return null; }
    if (!file.type.startsWith('image/')) { showNotification('Please select an image file', 'error'); return null; }

    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', cloudinaryConfig.uploadPreset);
    fd.append('cloud_name', cloudinaryConfig.cloudName);

    try {
      setUploading(true);
      setUploadProgress(0);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        fd,
        { onUploadProgress: (e) => setUploadProgress(Math.round((e.loaded * 100) / e.total)) }
      );
      return { url: res.data.secure_url, publicId: res.data.public_id };
    } catch (e) {
      console.error('Upload error:', e);
      showNotification('Image upload failed. Try again.', 'error');
      return null;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await uploadToCloudinary(file);
    if (result) setCurrentBox(prev => ({ ...prev, imageUrl: result.url, imagePublicId: result.publicId }));
  };

  const handleColorSelect = (preset) => {
    setCurrentBox(prev => ({
      ...prev,
      bgColor: preset.value || '',
      bgGradient: preset.gradient || ['#000000', '#8B0000'],
      blur: preset.blur || 0,
      bgType: preset.type
    }));
  };

  // ─── Save / Update box ─────────────────────────────────────────────────────
  const addNewBox = async () => {
    if (boxes.length >= 4) { showNotification('Maximum 4 boxes allowed!', 'error'); return; }
    if (!currentBox.imageUrl) { showNotification('Please upload an image first.', 'error'); return; }

    const position = boxes.length > 0 ? boxes[0].position : currentBox.position;
    const borderSide = boxes.length > 0 ? boxes[0].borderSide : (positions.find(p => p.value === position)?.borderSide || 'right');

    const newBox = { ...currentBox, id: Date.now().toString(), order: boxes.length, duration: boxDuration, position, borderSide, createdDate: new Date().toISOString().split('T')[0] };

    try {
      setUploading(true);
      const res = await fetch(`${API_URL}/boxes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newBox) });
      if (!res.ok) throw new Error();
      await fetchBoxes();
      resetCurrentBox();
      showNotification('Box saved successfully!', 'success');
    } catch {
      showNotification('Failed to save box.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const updateBox = async () => {
    if (!currentBox.imageUrl || !currentBox.id) { showNotification('Please upload an image.', 'error'); return; }

    const updated = {
      ...currentBox,
      position: boxes.length > 0 ? boxes[0].position : currentBox.position,
      borderSide: boxes.length > 0 ? boxes[0].borderSide : (positions.find(p => p.value === currentBox.position)?.borderSide || 'right')
    };

    try {
      setUploading(true);
      const res = await fetch(`${API_URL}/boxes/${currentBox.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
      if (!res.ok) throw new Error();
      await fetchBoxes();
      setEditorMode('create');
      resetCurrentBox();
      showNotification('Box updated!', 'success');
    } catch {
      showNotification('Failed to update box.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const resetCurrentBox = () => {
    setCurrentBox({
      ...defaultBox,
      position: boxes.length > 0 ? boxes[0].position : 'bottom-left',
      borderSide: boxes.length > 0 ? boxes[0].borderSide : 'right',
      order: boxes.length
    });
  };

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const getBorderRadius = (box) => {
    if (box.borderRadiusMode === 'all') return box.borderRadius.all;
    return `${box.borderRadius.topLeft} ${box.borderRadius.topRight} ${box.borderRadius.bottomRight} ${box.borderRadius.bottomLeft}`;
  };

 const getBoxStyle = (box, isMobile = false) => {
  const pos = positions.find(p => p.value === box.position);
  const bg = box.bgType === 'gradient' ? `linear-gradient(135deg, ${box.bgGradient[0]}, ${box.bgGradient[1]})` : box.bgColor || '#000';
  
  // Determine which dimensions to use based on screen size and user preference
  const width = isMobile && box.useMobileSize 
    ? Math.min(box.mobileWidth || box.width, 400) 
    : Math.min(box.width, 400);
  const height = isMobile && box.useMobileSize 
    ? Math.min(box.mobileHeight || box.height, 400) 
    : Math.min(box.height, 400);
  
  return {
    position: 'fixed', width: `${width}px`, height: `${height}px`,
    maxWidth: '400px', maxHeight: '400px', background: bg,
    backdropFilter: box.blur > 0 ? `blur(${box.blur}px)` : 'none',
    boxShadow: '0 25px 50px -12px rgba(139,0,0,0.4), 0 0 0 1px rgba(139,0,0,0.2)',
    borderRadius: getBorderRadius(box), opacity: box.opacity, zIndex: 9998, overflow: 'hidden',
    ...pos?.style
  };
};
  // Replace your existing isBoxExpired function with this improved version
  const isBoxExpired = (box) => {
  const now = new Date();
  
  // Case 1: Duration-based expiry
  if (box.showTime === 'duration' && box.duration && box.createdDate) {
    const createdDate = new Date(box.createdDate);
    const expiry = new Date(createdDate);
    expiry.setDate(expiry.getDate() + box.duration);
    expiry.setHours(23, 59, 59, 999); // End of the expiry day
    return now > expiry;
  }

  // Case 2: Scheduled with end date only
  if (box.showTime === 'scheduled' && box.endDate && !box.endTime) {
    const endDate = new Date(box.endDate);
    endDate.setHours(23, 59, 59, 999); // End of the day
    return now > endDate;
  }

  // Case 3: Scheduled with end time only (same day)
  if (box.showTime === 'scheduled' && box.endTime && !box.endDate) {
    const [eh, em] = box.endTime.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(eh, em, 0, 0);
    return now > endTime;
  }

  // Case 4: Scheduled with both end date and end time
  if (box.showTime === 'scheduled' && box.endDate && box.endTime) {
    const endDateTime = new Date(box.endDate);
    const [eh, em] = box.endTime.split(':').map(Number);
    endDateTime.setHours(eh, em, 0, 0);
    return now > endDateTime;
  }

  // Case 5: Check if current time is past end time on the end date
  if (box.showTime === 'scheduled' && box.endDate) {
    const endDate = new Date(box.endDate);
    endDate.setHours(23, 59, 59, 999);
    
    if (now > endDate) return true;
    
    // If it's the end date, check the time
    if (now.toDateString() === endDate.toDateString() && box.endTime) {
      const [eh, em] = box.endTime.split(':').map(Number);
      const endTimeToday = new Date();
      endTimeToday.setHours(eh, em, 0, 0);
      return now > endTimeToday;
    }
  }

  return false;
};



  const checkBoxVisibility = (box) => {
    if (box.showTime === 'always') return true;
    const now = new Date();
    if (box.showTime === 'scheduled') {
      if (box.startDate) { const sd = new Date(box.startDate); sd.setHours(0, 0, 0, 0); const td = new Date(now); td.setHours(0, 0, 0, 0); if (td < sd) return false; }
      if (box.endDate) { const ed = new Date(box.endDate); ed.setHours(23, 59, 59, 999); if (now > ed) return false; }
      if (box.startTime && box.endTime) {
        const cur = now.getHours() * 60 + now.getMinutes();
        const [sh, sm] = box.startTime.split(':').map(Number);
        const [eh, em] = box.endTime.split(':').map(Number);
        if (cur < sh * 60 + sm || cur > eh * 60 + em) return false;
      }
      return true;
    }
    if (box.showTime === 'duration' && box.duration && box.createdDate) {
      const exp = new Date(box.createdDate);
      exp.setDate(exp.getDate() + box.duration);
      return now <= exp;
    }
    return false;
  };

  const getActiveBoxes = useCallback(() => {
    return boxes.filter(box => !isBoxExpired(box));
  }, [boxes]);

  // ─── Force re-check expiration every minute ─────────────────────────────
useEffect(() => {
  const forceExpiryCheck = () => {
    // This empty setState will trigger a re-render
    setBoxes(prev => [...prev]);
  };
  
  const interval = setInterval(forceExpiryCheck, 60000); // Check every minute
  return () => clearInterval(interval);
}, []);

 // ─── Carousel ──────────────────────────────────────────────────────────────
useEffect(() => {
  // Get boxes that are both visible (by schedule) and not expired
  const visibleActiveBoxes = boxes.filter(box => 
    checkBoxVisibility(box) && !isBoxExpired(box)
  );
  
  if (visibleActiveBoxes.length > 1 && autoRotate && !isEditorOpen) {
    carouselInterval.current = setInterval(() => {
      setCurrentBoxIndex(prev => (prev + 1) % visibleActiveBoxes.length);
    }, 5000);
  }
  return () => clearInterval(carouselInterval.current);
}, [boxes, autoRotate, isEditorOpen]);

// Reset currentBoxIndex if it's out of bounds for visible boxes
useEffect(() => {
  const visibleActiveBoxes = boxes.filter(box => 
    checkBoxVisibility(box) && !isBoxExpired(box)
  );
  
  if (visibleActiveBoxes.length === 0) {
    setCurrentBoxIndex(0);
  } else if (currentBoxIndex >= visibleActiveBoxes.length) {
    setCurrentBoxIndex(visibleActiveBoxes.length - 1);
  }
}, [boxes, currentBoxIndex]);

  useEffect(() => {
    if (editorMode === 'edit' && boxes[currentBoxIndex]) setCurrentBox(boxes[currentBoxIndex]);
  }, [editorMode, currentBoxIndex]);

  // Add window resize listener to update styles dynamically
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render when window resizes to apply mobile/desktop dimensions
      setBoxes(prev => [...prev]);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─── Border helpers ────────────────────────────────────────────────────────
  const getBorderPosition = (side) => side === 'right'
    ? { left: '0', top: '0', bottom: '0', width: '3px' }
    : { right: '0', top: '0', bottom: '0', width: '3px' };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&display=swap');

        .nm-root * { box-sizing: border-box; }

        .nm-panel {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(160deg, #0a0a0a 0%, #111 40%, #0a0a0a 100%);
          border: 1px solid rgba(180,0,0,0.35);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.9), 0 0 60px rgba(139,0,0,0.15);
        }

        .nm-header {
          background: linear-gradient(90deg, #0a0a0a 0%, #1a0000 40%, #0a0a0a 100%);
          border-bottom: 1px solid rgba(180,0,0,0.3);
          position: relative;
        }
        .nm-header::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #cc0000, transparent);
        }

        .nm-title {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.1em;
          color: #fff;
          font-size: 1.4rem;
        }

        .nm-section-title {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.12em;
          font-size: 1rem;
          color: #cc2222;
          text-transform: uppercase;
        }

        .nm-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          display: block;
          margin-bottom: 6px;
        }

        .nm-input {
          width: 100%;
          padding: 10px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(180,0,0,0.25);
          border-radius: 6px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
        }
        .nm-input:focus { border-color: rgba(200,0,0,0.6); background: rgba(255,255,255,0.06); }
        .nm-input::placeholder { color: rgba(255,255,255,0.2); }

        .nm-select {
          width: 100%;
          padding: 10px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(180,0,0,0.25);
          border-radius: 6px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
        }
        .nm-select option { background: #111; }

        .nm-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #cc0000, #8b0000);
          border: none;
          border-radius: 6px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .nm-btn-primary:hover:not(:disabled) { background: linear-gradient(135deg, #e00000, #aa0000); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(180,0,0,0.4); }
        .nm-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        .nm-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(180,0,0,0.3);
          border-radius: 6px;
          color: rgba(255,255,255,0.7);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .nm-btn-secondary:hover { background: rgba(180,0,0,0.12); border-color: rgba(180,0,0,0.5); color: #fff; }

        .nm-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 7px 12px;
          background: transparent;
          border: 1px solid rgba(180,0,0,0.2);
          border-radius: 5px;
          color: rgba(255,255,255,0.5);
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nm-btn-ghost:hover { border-color: rgba(180,0,0,0.5); color: #fff; background: rgba(180,0,0,0.1); }

        .nm-btn-danger {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 7px 12px;
          background: rgba(139,0,0,0.2);
          border: 1px solid rgba(180,0,0,0.3);
          border-radius: 5px;
          color: #ff4444;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nm-btn-danger:hover { background: rgba(180,0,0,0.35); border-color: #cc0000; }

        .nm-chip-group { display: flex; flex-wrap: wrap; gap: 6px; }
        .nm-chip {
          padding: 7px 14px;
          border: 1px solid rgba(180,0,0,0.25);
          border-radius: 5px;
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.55);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .nm-chip:hover { border-color: rgba(180,0,0,0.5); color: #fff; }
        .nm-chip.active { background: linear-gradient(135deg, rgba(180,0,0,0.3), rgba(100,0,0,0.4)); border-color: #cc0000; color: #fff; }

        .nm-color-chip {
          padding: 10px 8px;
          border: 1px solid rgba(180,0,0,0.3);
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          text-align: center;
          color: #fff;
          text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        }
        .nm-color-chip:hover { transform: scale(1.04); box-shadow: 0 6px 20px rgba(0,0,0,0.4); }

        .nm-range {
          width: 100%;
          accent-color: #cc0000;
          cursor: pointer;
        }

        .nm-divider {
          border: none;
          border-top: 1px solid rgba(180,0,0,0.15);
          margin: 20px 0;
        }

        .nm-box-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border: 1px solid rgba(180,0,0,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.02);
          transition: all 0.2s;
        }
        .nm-box-card:hover { border-color: rgba(180,0,0,0.4); background: rgba(255,255,255,0.04); }
        .nm-box-card.active { border-color: #cc0000; background: rgba(180,0,0,0.08); }

        .nm-badge {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
          background: rgba(180,0,0,0.2);
          color: #cc4444;
          border: 1px solid rgba(180,0,0,0.3);
          flex-shrink: 0;
        }
        .nm-badge.active { background: #cc0000; color: #fff; border-color: #cc0000; }

        .nm-upload-zone {
          border: 1.5px dashed rgba(180,0,0,0.35);
          border-radius: 10px;
          background: rgba(180,0,0,0.03);
          transition: all 0.2s;
        }
        .nm-upload-zone:hover { border-color: rgba(180,0,0,0.6); background: rgba(180,0,0,0.06); }

        .nm-scrollbar::-webkit-scrollbar { width: 3px; }
        .nm-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .nm-scrollbar::-webkit-scrollbar-thumb { background: rgba(180,0,0,0.4); border-radius: 2px; }

        .nm-progress-bar {
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
        }
        .nm-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #cc0000, #ff4444);
          transition: width 0.3s;
          border-radius: 2px;
        }

        .nm-close-btn {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(180,0,0,0.3);
          background: transparent;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.2s;
        }
        .nm-close-btn:hover { border-color: #cc0000; color: #fff; background: rgba(180,0,0,0.2); }

        .nm-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          background: rgba(180,0,0,0.15);
          border: 1px solid rgba(180,0,0,0.3);
          border-radius: 12px;
          font-size: 10px;
          color: #ff6666;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .nm-modal-centered {
          position: fixed;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          z-index: 9999;
          max-width: calc(100vw - 32px);
          max-height: calc(100vh - 32px);
        }

        @media (max-width: 768px) {
          .nm-modal-centered {
            width: 95vw !important;
            max-width: 95vw !important;
            max-height: 90vh !important;
          }
        }

        .new-maker-box { transition: none; }

        // @media (max-width: 640px) {
        //   .new-maker-box { width: 260px !important; height: 280px !important; }
        // }
        // @media (max-width: 380px) {
        //   .new-maker-box { width: 220px !important; height: 240px !important; }
        // }

        /* Mobile preview styles */
        .preview-container {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .preview-item {
          text-align: center;
          background: rgba(0,0,0,0.3);
          padding: 15px;
          border-radius: 8px;
          border: 1px solid rgba(180,0,0,0.2);
        }

        .preview-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 10px;
          font-size: 12px;
          color: #888;
        }

        .preview-label.desktop { color: #cc0000; }
        .preview-label.mobile { color: #3498db; }
      `}</style>

      <div className="nm-root">
        {/* Confirm Modal */}
        <AnimatePresence>
          {confirmModal.isOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', zIndex: 10003, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
              onClick={closeConfirm}
            >
              <motion.div
                initial={{ scale: 0.92, y: -16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: -16 }}
                style={{ background: 'linear-gradient(160deg,#111,#0a0a0a)', border: '1px solid rgba(180,0,0,0.5)', borderRadius: '12px', padding: '28px', maxWidth: '420px', width: '100%', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <AlertTriangle size={20} color="#cc0000" />
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.2rem', color: '#fff', letterSpacing: '0.08em' }}>{confirmModal.title}</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>{confirmModal.message}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="nm-btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={confirmModal.onConfirm}>
                    Yes, Delete
                  </button>
                  <button className="nm-btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={closeConfirm}>
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10005 }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px',
                background: notification.type === 'success' ? 'rgba(0,60,0,0.95)' : notification.type === 'error' ? 'rgba(80,0,0,0.95)' : 'rgba(20,20,20,0.95)',
                border: `1px solid ${notification.type === 'success' ? 'rgba(0,180,0,0.4)' : notification.type === 'error' ? 'rgba(200,0,0,0.5)' : 'rgba(180,180,180,0.2)'}`,
                borderRadius: '8px', backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#fff', whiteSpace: 'nowrap'
              }}>
                {notification.type === 'success' && <CheckCircle size={15} color="#44dd44" />}
                {notification.type === 'error' && <AlertCircle size={15} color="#ff4444" />}
                {notification.type === 'info' && <AlertCircle size={15} color="#4488ff" />}
                {notification.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor Panel */}
        <AnimatePresence>
          {isVisible && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', zIndex: 9998 }}
                onClick={() => { setIsVisible(false); setIsEditorOpen(false); }}
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="nm-panel nm-modal-centered"
                style={{
                  width: 'calc(100vw - 32px)',
                  maxWidth: '1080px',
                  maxHeight: 'calc(100vh - 32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '14px',
                  overflow: 'hidden',
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="nm-header" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(180,0,0,0.2)', border: '1px solid rgba(180,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Settings size={16} color="#cc4444" />
                    </div>
                    <div>
                      <div className="nm-title">New Maker</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Image Box Creator</div>
                    </div>
                    <div className="nm-tag">{boxes.length}/4 Active</div>
                  </div>
                  <button className="nm-close-btn" onClick={() => { setIsVisible(false); setIsEditorOpen(false); }}>
                    <X size={16} />
                  </button>
                </div>

                {/* Body */}
                <div className="nm-scrollbar" style={{ padding: '24px', overflowY: 'auto', flex: 1, minHeight: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
                    {/* Left: Config */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <Layout size={15} color="#cc2222" />
                        <span className="nm-section-title">Box Configuration</span>
                      </div>

                      {/* Size */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                        {['width', 'height'].map(dim => (
                          <div key={dim}>
                            <label className="nm-label">{dim} (px)</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input type="range" min="150" max="400" value={currentBox[dim]} onChange={e => setCurrentBox(p => ({ ...p, [dim]: parseInt(e.target.value) }))} className="nm-range" style={{ flex: 1 }} />
                              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)', width: '42px', textAlign: 'right' }}>{currentBox[dim]}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Mobile Size Toggle & Controls */}
                      <div style={{ 
                        marginTop: '16px', 
                        marginBottom: '20px',
                        padding: '12px', 
                        background: 'rgba(180,0,0,0.05)', 
                        borderRadius: '8px',
                        border: '1px solid rgba(180,0,0,0.2)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <label className="nm-label" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Smartphone size={14} color="#3498db" /> Mobile-Specific Size
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={currentBox.useMobileSize || false}
                              onChange={(e) => setCurrentBox(p => ({ 
                                ...p, 
                                useMobileSize: e.target.checked,
                                mobileWidth: p.mobileWidth || p.width,
                                mobileHeight: p.mobileHeight || p.height
                              }))}
                            />
                            <span style={{ fontSize: '12px', color: 'white' }}>Enable</span>
                          </label>
                        </div>

                        {currentBox.useMobileSize && (
                          <>
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px', 
                              marginBottom: '12px',
                              background: 'rgba(0,0,0,0.3)',
                              padding: '8px',
                              borderRadius: '6px'
                            }}>
                              <span style={{ fontSize: '11px', color: '#3498db' }}>📱</span>
                              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                                Mobile dimensions apply on screens smaller than 768px
                              </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                              <div>
                                <label className="nm-label">Mobile Width (px)</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <input 
                                    type="range" 
                                    min="20" 
                                    max="400" 
                                    value={currentBox.mobileWidth || currentBox.width}
                                    onChange={(e) => setCurrentBox(p => ({ 
                                      ...p, 
                                      mobileWidth: parseInt(e.target.value) 
                                    }))} 
                                    className="nm-range" 
                                    style={{ flex: 1 }} 
                                  />
                                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)', width: '42px', textAlign: 'right' }}>
                                    {currentBox.mobileWidth || currentBox.width}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <label className="nm-label">Mobile Height (px)</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <input 
                                    type="range" 
                                    min="20" 
                                    max="400" 
                                    value={currentBox.mobileHeight || currentBox.height}
                                    onChange={(e) => setCurrentBox(p => ({ 
                                      ...p, 
                                      mobileHeight: parseInt(e.target.value) 
                                    }))} 
                                    className="nm-range" 
                                    style={{ flex: 1 }} 
                                  />
                                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)', width: '42px', textAlign: 'right' }}>
                                    {currentBox.mobileHeight || currentBox.height}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Position */}
                      <div style={{ marginBottom: '20px' }}>
                        <label className="nm-label">Position</label>
                        <div className="nm-chip-group">
                          {positions.map(p => (
                            <button key={p.value} className={`nm-chip${currentBox.position === p.value ? ' active' : ''}`} onClick={() => setCurrentBox(prev => ({ ...prev, position: p.value, borderSide: p.borderSide }))}>{p.label}</button>
                          ))}
                        </div>
                      </div>

                      {/* Border Radius */}
                      <div style={{ marginBottom: '20px' }}>
                        <label className="nm-label">Border Radius</label>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                          {['all', 'custom'].map(mode => (
                            <button key={mode} className={`nm-chip${currentBox.borderRadiusMode === mode ? ' active' : ''}`} style={{ flex: 1, textAlign: 'center' }} onClick={() => setCurrentBox(p => ({ ...p, borderRadiusMode: mode }))}>
                              {mode === 'all' ? 'Uniform' : 'Per Corner'}
                            </button>
                          ))}
                        </div>
                        {currentBox.borderRadiusMode === 'all' ? (
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>All corners</span>
                              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{currentBox.borderRadius.all}</span>
                            </div>
                            <input type="range" min="0" max="50" value={parseInt(currentBox.borderRadius.all) || 0} onChange={e => setCurrentBox(p => ({ ...p, borderRadius: { ...p.borderRadius, all: `${e.target.value}px` } }))} className="nm-range" />
                          </div>
                        ) : (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {[['topLeft', 'TL', CornerUpLeft], ['topRight', 'TR', CornerUpRight], ['bottomLeft', 'BL', CornerDownLeft], ['bottomRight', 'BR', CornerDownRight]].map(([key, label, Icon]) => (
                              <div key={key}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                                  <Icon size={12} color="#cc4444" />
                                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{label} · {currentBox.borderRadius[key]}</span>
                                </div>
                                <input type="range" min="0" max="50" value={parseInt(currentBox.borderRadius[key]) || 0} onChange={e => setCurrentBox(p => ({ ...p, borderRadius: { ...p.borderRadius, [key]: `${e.target.value}px` } }))} className="nm-range" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Color */}
                      <div style={{ marginBottom: '20px' }}>
                        <label className="nm-label">Background Style</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '6px' }}>
                          {colorPresets.map(p => (
                            <button
                              key={p.name}
                              className="nm-color-chip"
                              style={{ background: p.type === 'gradient' ? `linear-gradient(135deg,${p.gradient[0]},${p.gradient[1]})` : p.value }}
                              onClick={() => handleColorSelect(p)}
                              title={p.name}
                            >
                              {p.name.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Image Fit */}
                      <div style={{ marginBottom: '20px' }}>
                        <label className="nm-label">Image Fit</label>
                        <div className="nm-chip-group">
                          {imageFitOptions.map(o => (
                            <button key={o.value} className={`nm-chip${currentBox.imageFit === o.value ? ' active' : ''}`} onClick={() => setCurrentBox(p => ({ ...p, imageFit: o.value }))}>{o.label}</button>
                          ))}
                        </div>
                      </div>

                      {/* Animation */}
                      <div style={{ marginBottom: '20px' }}>
                        <label className="nm-label">Entry Animation</label>
                        <div className="nm-chip-group">
                          {Object.entries(animations).map(([k, a]) => (
                            <button key={k} className={`nm-chip${currentBox.animation === k ? ' active' : ''}`} onClick={() => setCurrentBox(p => ({ ...p, animation: k }))}>{a.name}</button>
                          ))}
                        </div>
                      </div>

                      {/* Timing */}
                      <div style={{ marginBottom: '20px' }}>
                        <label className="nm-label">Display Timing</label>
                        <select value={currentBox.showTime} onChange={e => setCurrentBox(p => ({ ...p, showTime: e.target.value }))} className="nm-select" style={{ marginBottom: '12px' }}>
                          <option value="always">Always Visible</option>
                          <option value="scheduled">Scheduled Date / Time</option>
                          <option value="duration">Duration (Days)</option>
                        </select>

                        {currentBox.showTime === 'scheduled' && (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {[['Start Date', 'startDate', 'date'], ['End Date', 'endDate', 'date'], ['Start Time', 'startTime', 'time'], ['End Time', 'endTime', 'time']].map(([lbl, key, type]) => (
                              <div key={key}>
                                <label className="nm-label">{lbl}</label>
                                <input type={type} value={currentBox[key]} onChange={e => setCurrentBox(p => ({ ...p, [key]: e.target.value }))} className="nm-input" />
                              </div>
                            ))}
                          </div>
                        )}

                        {currentBox.showTime === 'duration' && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input type="number" min="1" max="365" value={boxDuration} onChange={e => setBoxDuration(parseInt(e.target.value))} className="nm-input" style={{ width: '100px' }} />
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>days from creation</span>
                          </div>
                        )}
                      </div>

                      {/* Button Configuration */}
                      <div style={{ marginTop: '20px', border: '1px solid rgba(180,0,0,0.2)', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <label className="nm-label" style={{ marginBottom: 0 }}>Action Button</label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={currentBox.button?.enabled || false}
                              onChange={(e) => setCurrentBox(p => ({
                                ...p,
                                button: {
                                  ...p.button,
                                  enabled: e.target.checked,
                                  text: p.button?.text || 'Learn More',
                                  color: p.button?.color || '#cc0000',
                                  textColor: p.button?.textColor || '#ffffff',
                                  size: p.button?.size || 40,
                                  link: p.button?.link || '',
                                  customLink: p.button?.customLink || ''
                                }
                              }))}
                            />
                            <span style={{ fontSize: '12px', color: 'white' }}>Enable Button</span>
                          </label>
                        </div>

                        {currentBox.button?.enabled && (
                          <>
                            {/* Button Text */}
                            <div style={{ marginBottom: '12px' }}>
                              <label className="nm-label">Button Text</label>
                              <input
                                type="text"
                                value={currentBox.button?.text || 'Learn More'}
                                onChange={(e) => setCurrentBox(p => ({
                                  ...p,
                                  button: { ...p.button, text: e.target.value }
                                }))}
                                className="nm-input"
                                placeholder="Button text"
                              />
                            </div>
                            {/* Button Link */}
                            <div style={{ marginBottom: '12px' }}>
                              <label className="nm-label">Button Link</label>
                              <select
                                value={(() => {
                                  // Determine what to show in select
                                  const currentLink = currentBox.button?.link || '';

                                  // Check if it's a section ID
                                  const sectionOption = buttonLinkOptions.find(
                                    opt => opt.type === 'section' && opt.value === currentLink
                                  );
                                  if (sectionOption) return currentLink;

                                  // Check if it's a regular route
                                  if (buttonLinkOptions.some(opt => opt.type === undefined && opt === currentLink)) {
                                    return currentLink;
                                  }

                                  // Check if it's custom
                                  if (currentLink && !buttonLinkOptions.some(opt =>
                                    (opt.type === 'section' && opt.value === currentLink) ||
                                    (typeof opt === 'string' && opt === currentLink)
                                  )) {
                                    return 'custom';
                                  }

                                  return '';
                                })()}
                                onChange={(e) => {
                                  const val = e.target.value;

                                  if (val === 'custom') {
                                    setCurrentBox(p => ({
                                      ...p,
                                      button: {
                                        ...p.button,
                                        link: 'custom',
                                        customLink: p.button?.customLink || ''
                                      }
                                    }));
                                  } else {
                                    setCurrentBox(p => ({
                                      ...p,
                                      button: {
                                        ...p.button,
                                        link: val,
                                        customLink: ''
                                      }
                                    }));
                                  }
                                }}
                                className="nm-select"
                                style={{ marginBottom: '8px' }}
                              >
                                <option value="">Select a link</option>

                                {/* Regular routes */}
                                <optgroup label="Pages">
                                  {buttonLinkOptions
                                    .filter(opt => typeof opt === 'string')
                                    .map(option => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                </optgroup>

                                {/* Section IDs */}
                                <optgroup label="Page Sections (Auto-scroll)">
                                  {buttonLinkOptions
                                    .filter(opt => opt.type === 'section')
                                    .map(option => (
                                      <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </optgroup>

                                {/* Custom option */}
                                <optgroup label="Custom">
                                  {buttonLinkOptions
                                    .filter(opt => opt.type === 'custom')
                                    .map(option => (
                                      <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </optgroup>
                              </select>

                              {/* Custom URL input */}
                              {(currentBox.button?.link === 'custom' ||
                                (currentBox.button?.link &&
                                  !buttonLinkOptions.some(opt =>
                                    (opt.type === 'section' && opt.value === currentBox.button?.link) ||
                                    (typeof opt === 'string' && opt === currentBox.button?.link)
                                  ))) && (
                                  <input
                                    type="text"
                                    value={currentBox.button?.customLink ||
                                      (currentBox.button?.link &&
                                        currentBox.button?.link !== 'custom' &&
                                        !buttonLinkOptions.some(opt =>
                                          (opt.type === 'section' && opt.value === currentBox.button?.link) ||
                                          (typeof opt === 'string' && opt === currentBox.button?.link)
                                        ) ? currentBox.button?.link : '')}
                                    onChange={(e) => {
                                      const customVal = e.target.value;
                                      setCurrentBox(p => ({
                                        ...p,
                                        button: {
                                          ...p.button,
                                          customLink: customVal,
                                          link: customVal
                                        }
                                      }));
                                    }}
                                    className="nm-input"
                                    placeholder="Enter custom URL (https://example.com or #section-id)"
                                  />
                                )}

                              {/* Helper text for section IDs */}
                              {currentBox.button?.link && currentBox.button.link.startsWith('#') && (
                                <div style={{
                                  marginTop: '6px',
                                  fontSize: '11px',
                                  color: '#3498db',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}>
                                  <span>🔗</span> This will auto-scroll to the section on the same page
                                </div>
                              )}
                            </div>
                            {/* Button Size */}
                            <div style={{ marginBottom: '12px' }}>
                              <label className="nm-label">Button Size (% of box width)</label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                  type="range"
                                  min="20"
                                  max="80"
                                  value={currentBox.button?.size || 40}
                                  onChange={(e) => setCurrentBox(p => ({
                                    ...p,
                                    button: { ...p.button, size: parseInt(e.target.value) }
                                  }))}
                                  className="nm-range"
                                  style={{ flex: 1 }}
                                />
                                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', width: '40px' }}>
                                  {currentBox.button?.size || 40}%
                                </span>
                              </div>
                            </div>

                            {/* Button Colors */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                              <div>
                                <label className="nm-label">Button Color</label>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  <input
                                    type="color"
                                    value={currentBox.button?.color || '#cc0000'}
                                    onChange={(e) => setCurrentBox(p => ({
                                      ...p,
                                      button: { ...p.button, color: e.target.value }
                                    }))}
                                    style={{ width: '40px', height: '30px', background: 'transparent', border: '1px solid rgba(180,0,0,0.3)', borderRadius: '4px' }}
                                  />
                                  <input
                                    type="text"
                                    value={currentBox.button?.color || '#cc0000'}
                                    onChange={(e) => setCurrentBox(p => ({
                                      ...p,
                                      button: { ...p.button, color: e.target.value }
                                    }))}
                                    className="nm-input"
                                    style={{ flex: 1 }}
                                    placeholder="#cc0000"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="nm-label">Text Color</label>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  <input
                                    type="color"
                                    value={currentBox.button?.textColor || '#ffffff'}
                                    onChange={(e) => setCurrentBox(p => ({
                                      ...p,
                                      button: { ...p.button, textColor: e.target.value }
                                    }))}
                                    style={{ width: '40px', height: '30px', background: 'transparent', border: '1px solid rgba(180,0,0,0.3)', borderRadius: '4px' }}
                                  />
                                  <input
                                    type="text"
                                    value={currentBox.button?.textColor || '#ffffff'}
                                    onChange={(e) => setCurrentBox(p => ({
                                      ...p,
                                      button: { ...p.button, textColor: e.target.value }
                                    }))}
                                    className="nm-input"
                                    style={{ flex: 1 }}
                                    placeholder="#ffffff"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Preview */}
                            <div style={{
                              padding: '8px',
                              background: 'rgba(0,0,0,0.3)',
                              borderRadius: '4px',
                              border: '1px solid rgba(180,0,0,0.2)'
                            }}>
                              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Preview:</div>
                              <div style={{
                                background: currentBox.button?.color || '#cc0000',
                                color: currentBox.button?.textColor || '#ffffff',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                display: 'inline-block',
                                fontWeight: 600
                              }}>
                                {currentBox.button?.text || 'Learn More'}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right: Image + Preview */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <ImageIcon size={15} color="#cc2222" />
                        <span className="nm-section-title">Image</span>
                      </div>

                      {/* Upload zone */}
                      <div className="nm-upload-zone" style={{ padding: '24px', textAlign: 'center', marginBottom: '20px' }}>
                        {uploading ? (
                          <div style={{ padding: '16px 0' }}>
                            <Loader size={32} color="#cc4444" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>Uploading to Cloudinary... {uploadProgress}%</div>
                            <div className="nm-progress-bar"><div className="nm-progress-fill" style={{ width: `${uploadProgress}%` }} /></div>
                          </div>
                        ) : currentBox.imageUrl ? (
                          <div>
                            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '12px' }}>
                              <img src={currentBox.imageUrl} alt="Preview" style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain', borderRadius: '6px', border: '1px solid rgba(180,0,0,0.2)' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', color: '#44aa44', marginBottom: '10px' }}>
                              <CheckCircle size={13} /> Uploaded to Cloudinary
                            </div>
                            <button className="nm-btn-ghost" onClick={() => setCurrentBox(p => ({ ...p, imageUrl: '', imagePublicId: '' }))} style={{ fontSize: '11px' }}>
                              <X size={12} /> Remove
                            </button>
                          </div>
                        ) : (
                          <label style={{ cursor: 'pointer', display: 'block' }}>
                            <Cloud size={40} color="rgba(180,0,0,0.5)" style={{ margin: '0 auto 12px' }} />
                            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px', fontWeight: 500 }}>Click to upload image</div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginBottom: '16px' }}>PNG · JPG · GIF · Max 5MB</div>
                            <span className="nm-btn-primary">
                              <Upload size={14} /> Select Image
                            </span>
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                          </label>
                        )}
                      </div>

                      {/* Dual Preview - Desktop & Mobile */}
                      {currentBox.imageUrl && (
                        <div>
                          <label className="nm-label" style={{ marginBottom: '12px' }}>Live Preview</label>
                          <div className="preview-container">
                            {/* Desktop Preview */}
                            <div className="preview-item">
                              <div className="preview-label desktop">
                                <Monitor size={14} /> Desktop View ({currentBox.width}×{currentBox.height})
                              </div>
                              <div style={{
                                ...getBoxStyle(currentBox, false),
                                position: 'relative',
                                margin: '0 auto'
                              }}>
                                <div style={{ height: '100%', position: 'relative' }}>
                                  <div style={{ position: 'absolute', ...getBorderPosition(currentBox.borderSide), background: 'linear-gradient(180deg,#cc0000,#8b0000)', zIndex: 10 }} />
                                  <img 
                                    src={currentBox.imageUrl} 
                                    alt="Desktop Preview" 
                                    style={{ 
                                      width: '100%', 
                                      height: '100%', 
                                      objectFit: currentBox.imageFit, 
                                      objectPosition: currentBox.imagePosition 
                                    }} 
                                  />
                                  {currentBox.button?.enabled && currentBox.button.link && (
                                    <div style={{
                                      position: 'absolute',
                                      bottom: '10px',
                                      right: '10px',
                                      zIndex: 30,
                                      background: currentBox.button.color,
                                      color: currentBox.button.textColor,
                                      padding: '6px 12px',
                                      borderRadius: '4px',
                                      fontSize: `${Math.max(10, Math.floor(currentBox.width * (currentBox.button.size / 100) * 0.1))}px`,
                                      fontWeight: 600,
                                      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                                      maxWidth: `${currentBox.button.size}%`,
                                      textAlign: 'center',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      pointerEvents: 'none',
                                      opacity: 0.8
                                    }}>
                                      {currentBox.button.text || 'Learn More'}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Mobile Preview (if enabled) */}
                            {currentBox.useMobileSize && (
                              <div className="preview-item">
                                <div className="preview-label mobile">
                                  <Smartphone size={14} /> Mobile View ({currentBox.mobileWidth || currentBox.width}×{currentBox.mobileHeight || currentBox.height})
                                </div>
                                <div style={{
                                  ...getBoxStyle(currentBox, true),
                                  position: 'relative',
                                  margin: '0 auto'
                                }}>
                                  <div style={{ height: '100%', position: 'relative' }}>
                                    <div style={{ position: 'absolute', ...getBorderPosition(currentBox.borderSide), background: 'linear-gradient(180deg,#cc0000,#8b0000)', zIndex: 10 }} />
                                    <img 
                                      src={currentBox.imageUrl} 
                                      alt="Mobile Preview" 
                                      style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: currentBox.imageFit, 
                                        objectPosition: currentBox.imagePosition 
                                      }} 
                                    />
                                    {currentBox.button?.enabled && currentBox.button.link && (
                                      <div style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                        zIndex: 30,
                                        background: currentBox.button.color,
                                        color: currentBox.button.textColor,
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        fontSize: `${Math.max(10, Math.floor((currentBox.mobileWidth || currentBox.width) * (currentBox.button.size / 100) * 0.1))}px`,
                                        fontWeight: 600,
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                                        maxWidth: `${currentBox.button.size}%`,
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        pointerEvents: 'none',
                                        opacity: 0.8
                                      }}>
                                        {currentBox.button.text || 'Learn More'}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Box Management */}
                  <hr className="nm-divider" />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="nm-section-title">Boxes</span>
                      <span className="nm-tag">{boxes.length} / 4</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {editorMode === 'edit' ? (
                        <button className="nm-btn-primary" onClick={updateBox} disabled={!currentBox.imageUrl || uploading || isDeleting}>
                          {uploading ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />} Update
                        </button>
                      ) : (
                        <button className="nm-btn-primary" onClick={addNewBox} disabled={boxes.length >= 4 || !currentBox.imageUrl || uploading || isDeleting}>
                          {uploading ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />} Save Box
                        </button>
                      )}
                      <button className={`nm-btn-secondary${autoRotate ? '' : ''}`} onClick={() => setAutoRotate(p => !p)} style={{ opacity: autoRotate ? 1 : 0.6 }}>
                        <RefreshCw size={13} /> {autoRotate ? 'Auto-Rotate On' : 'Auto-Rotate Off'}
                      </button>
                      <button className="nm-btn-ghost" onClick={clearAllData} disabled={isDeleting || boxes.length === 0}>
                        {isDeleting ? <Loader size={12} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={12} />} Clear All
                      </button>
                    </div>
                  </div>

                  {/* Box list */}
                  {boxes.length > 0 ? (
                    <div className="nm-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
                      {boxes.map((box, i) => {
                        const expired = isBoxExpired(box);
                        const isScheduled = box.showTime === 'scheduled' && !expired;

                        return (
                          <div key={box.id} className={`nm-box-card${currentBoxIndex === i ? ' active' : ''}`}>
                            <div className={`nm-badge${currentBoxIndex === i ? ' active' : ''}`}>{i + 1}</div>
                            {box.imageUrl && (
                              <div style={{ position: 'relative' }}>
                                <img
                                  src={box.imageUrl}
                                  alt=""
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    objectFit: 'cover',
                                    borderRadius: '5px',
                                    border: '1px solid rgba(180,0,0,0.25)',
                                    filter: expired ? 'grayscale(80%)' : 'none',
                                    opacity: expired ? 0.7 : 1
                                  }}
                                />
                                {expired && (
                                  <span style={{
                                    position: 'absolute',
                                    top: -2,
                                    right: -2,
                                    background: '#ff4444',
                                    color: 'white',
                                    fontSize: '8px',
                                    padding: '2px 4px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold'
                                  }}>
                                    EXP
                                  </span>
                                )}
                                {isScheduled && (
                                  <span style={{
                                    position: 'absolute',
                                    top: -2,
                                    left: -2,
                                    background: '#3498db',
                                    color: 'white',
                                    fontSize: '8px',
                                    padding: '2px 4px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold'
                                  }}>
                                    SCH
                                  </span>
                                )}
                                {box.button?.enabled && !expired && (
                                  <span style={{
                                    position: 'absolute',
                                    bottom: -2,
                                    right: -2,
                                    background: box.button.color || '#cc0000',
                                    color: 'white',
                                    fontSize: '8px',
                                    padding: '2px 4px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold'
                                  }}>
                                    BTN
                                  </span>
                                )}
                              </div>
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>
                                Image Box #{i + 1}
                                {expired && <span style={{ color: '#ff4444', marginLeft: '6px' }}>(Expired)</span>}
                                {isScheduled && <span style={{ color: '#3498db', marginLeft: '6px' }}>(Scheduled)</span>}
                                {box.useMobileSize && <span style={{ color: '#3498db', marginLeft: '6px' }}>📱</span>}
                              </div>
                              <div style={{ fontSize: '11px', color: expired ? 'rgba(255,68,68,0.5)' : 'rgba(255,255,255,0.35)' }}>
                                Desktop: {box.width}×{box.height}px · {positions.find(p => p.value === box.position)?.label}
                                {box.useMobileSize && (
                                  <span style={{ color: '#3498db', marginLeft: '6px' }}>
                                    📱 Mobile: {box.mobileWidth || box.width}×{box.mobileHeight || box.height}px
                                  </span>
                                )}
                                {box.showTime === 'duration' && box.duration && box.createdDate && !expired && (
                                  <span style={{ color: '#cc4444', marginLeft: '6px' }}>
                                    · Expires {new Date(new Date(box.createdDate).getTime() + box.duration * 86400000).toLocaleDateString()}
                                  </span>
                                )}
                                {isScheduled && box.startDate && (
                                  <span style={{ color: '#3498db', marginLeft: '6px' }}>
                                    · Starts {new Date(box.startDate).toLocaleDateString()}
                                  </span>
                                )}
                                {expired && (
                                  <span style={{ color: '#ff4444', marginLeft: '6px' }}>
                                    · Expired
                                  </span>
                                )}
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                              <button className="nm-btn-ghost" style={{ fontSize: '11px', padding: '5px 10px' }} onClick={() => { setCurrentBox(box); setCurrentBoxIndex(i); setEditorMode('edit'); }}>
                                Edit
                              </button>
                              <button
                                className="nm-btn-danger"
                                style={{ padding: '5px 8px' }}
                                onClick={async () => {
                                  const box = boxes[i];
                                  setConfirmModal({
                                    isOpen: true,
                                    title: 'Delete Box',
                                    message: 'This will permanently delete this box and its image. Continue?',
                                    onConfirm: async () => {
                                      closeConfirm();
                                      setIsDeleting(true);
                                      try {
                                        console.log('Deleting box:', box.id);
                                        const response = await fetch(`${API_URL}/boxes/${box.id}`, {
                                          method: 'DELETE',
                                          headers: { 'Content-Type': 'application/json' }
                                        });
                                        console.log('Delete response status:', response.status);
                                        if (!response.ok) {
                                          const errorText = await response.text();
                                          throw new Error(`Server returned ${response.status}: ${errorText}`);
                                        }
                                        if (box.imagePublicId) {
                                          fetch(`${API_URL}/delete-cloudinary-image`, {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ publicId: box.imagePublicId })
                                          }).catch(err => console.warn('Cloudinary cleanup failed:', err));
                                        }
                                        setBoxes(prev => prev.filter(b => b.id !== box.id));
                                        if (i === currentBoxIndex) {
                                          setCurrentBoxIndex(prev => Math.max(0, prev - 1));
                                        }
                                        showNotification('Box deleted successfully', 'success');
                                      } catch (err) {
                                        console.error('Delete failed:', err);
                                        showNotification(`Delete failed: ${err.message}`, 'error');
                                        fetchBoxes();
                                      } finally {
                                        setIsDeleting(false);
                                      }
                                    }
                                  });
                                }}
                                disabled={isDeleting}
                              >
                                {isDeleting ? <Loader size={12} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={12} />}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '32px', border: '1px dashed rgba(180,0,0,0.2)', borderRadius: '10px', color: 'rgba(255,255,255,0.2)', fontSize: '13px' }}>
                      No boxes yet. Upload an image and save your first box.
                    </div>
                  )}

                  {/* Carousel nav */}
                  {getActiveBoxes().length > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                      <button className="nm-close-btn" onClick={() => setCurrentBoxIndex(p => (p - 1 + getActiveBoxes().length) % getActiveBoxes().length)}><ChevronLeft size={14} /></button>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                        Box {currentBoxIndex + 1} of {getActiveBoxes().length} (Active)
                      </span>
                      <button className="nm-close-btn" onClick={() => setCurrentBoxIndex(p => (p + 1) % getActiveBoxes().length)}><ChevronRight size={14} /></button>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Display Floating Boxes - Only Show Visible (Based on Schedule) and Non-Expired */}
<AnimatePresence>
  {boxes.map((box, index) => {
    // Check if box should be visible based on schedule
    if (!checkBoxVisibility(box)) return null;

    // Check if box is expired
    if (isBoxExpired(box)) return null;

    // For carousel, only show current index when multiple boxes
    const activeBoxes = boxes.filter(b => checkBoxVisibility(b) && !isBoxExpired(b));
    if (activeBoxes.length > 1 && currentBoxIndex !== index) return null;

    const anim = animations[box.animation];
    const isMobile = window.innerWidth <= 600; // Changed to 600px
    
    return (
      <motion.div
        key={box.id}
        initial={anim.initial}
        animate={anim.animate}
        exit={anim.exit}
        transition={anim.transition}
        style={getBoxStyle(box, isMobile)} // FIX: Pass isMobile here
        className="new-maker-box"
      >
        <div style={{ height: '100%', position: 'relative' }}>
          <div style={{ position: 'absolute', ...getBorderPosition(box.borderSide), background: 'linear-gradient(180deg,#cc0000,#8b0000)', zIndex: 10 }} />
          <img src={box.imageUrl} alt="Content" style={{ width: '100%', height: '100%', objectFit: box.imageFit || 'cover', objectPosition: box.imagePosition || 'center', borderRadius: getBorderRadius(box) }} />

          {/* Action Button - also use isMobile for button size */}
          {box.button?.enabled && box.button.link && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                const link = box.button.link;

                if (link.startsWith('#')) {
                  e.preventDefault();
                  const element = document.getElementById(link.substring(1));
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  } else {
                    window.location.href = link;
                  }
                } else if (link.startsWith('http://') || link.startsWith('https://')) {
                  window.open(link, '_blank', 'noopener,noreferrer');
                } else {
                  window.open(link, '_blank', 'noopener,noreferrer');
                }
              }}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                zIndex: 30,
                background: box.button.color,
                color: box.button.textColor,
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: `${Math.max(10, Math.floor((isMobile && box.useMobileSize ? (box.mobileWidth || box.width) : box.width) * (box.button.size / 100) * 0.1))}px`,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s',
                maxWidth: `${box.button.size}%`,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                border: 'none',
                pointerEvents: 'auto'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              title={box.button.link.startsWith('#') ? 'Scroll to section' : 'Open link'}
            >
              {box.button.text || 'Learn More'}
            </div>
          )}

          {/* Duration expiry badge */}
          {box.showTime === 'duration' && box.duration && box.createdDate && !isBoxExpired(box) && (
            <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 20, padding: '3px 8px', background: 'rgba(100,0,0,0.85)', border: '1px solid rgba(180,0,0,0.5)', borderRadius: '10px', fontSize: '10px', color: '#ff8888', backdropFilter: 'blur(6px)' }}>
              Exp: {new Date(new Date(box.createdDate).getTime() + box.duration * 86400000).toLocaleDateString()}
            </div>
          )}

          {/* Mobile indicator */}
          {box.useMobileSize && isMobile && (
            <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 20, padding: '3px 8px', background: 'rgba(52,152,219,0.85)', border: '1px solid rgba(52,152,219,0.5)', borderRadius: '10px', fontSize: '10px', color: 'white', backdropFilter: 'blur(6px)' }}>
              📱 Mobile
            </div>
          )}

          {/* Carousel dots - only show for visible active boxes */}
          {boxes.filter(b => checkBoxVisibility(b) && !isBoxExpired(b)).length > 1 && (
            <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px', zIndex: 20 }}>
              {boxes.filter(b => checkBoxVisibility(b) && !isBoxExpired(b)).map((_, i) => (
                <div key={i} style={{ width: i === currentBoxIndex ? '16px' : '6px', height: '6px', borderRadius: '3px', background: i === currentBoxIndex ? '#cc0000' : 'rgba(255,255,255,0.25)', transition: 'all 0.3s' }} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  })}
</AnimatePresence>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </>
  );
};

export default NewMaker;