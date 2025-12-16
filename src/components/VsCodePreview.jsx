import { useEffect, useState } from "react";

const paragraphTexts = [
  "We are ACEDU Coding Bootcamp, a modern learning studio helping people build real-world tech skills from day one.",
  "Our mentors and curated curriculum guide you from the basics into building projects that recruiters notice.",
  "Join a vibrant community where code, creativity, and career growth come together.",
];

const skeletonHead = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>AceduBootCamp | Learn to Build</title>
  </head>
  <body>
`;

const skeletonTail =` 
</body>
</html>`;

const buildPLine = (text) => `<p>
${text}
</p>
`;

const ulBlock =
` <ul>
      <li>HTML&CSS</li>
      <li>JavaScript</li>
      <li>React</li>
      <li>C#</li>
      <li>Cybersecurity</li>
      <li>Data Analysis</li>LOADING MORE...
    </ul>
`;

// Slower speeds
const TYPE_SPEED = 45; // ms per character while typing
const DELETE_SPEED = 35; // ms per character while deleting
const HOLD_DELAY = 2000; // pause after each <p>
const HOLD_DELAY_UL = 2300; // pause after <ul> before erasing

const VSCodePreview = () => {
  // phases: typingDocP, deletingP, typingP, typingUL, deletingUL, deletingDoc
  const [phase, setPhase] = useState("typingDocP");
  const [paragraphIndex, setParagraphIndex] = useState(0); // 0,1,2
  const [progress, setProgress] = useState(0); // character count for current phase

  // Drive animation
  useEffect(() => {
    let timeout;

    if (phase === "typingDocP") {
      const fullDoc =
        skeletonHead + buildPLine(paragraphTexts[0]) + skeletonTail;
      const len = fullDoc.length;

      if (progress < len) {
        timeout = setTimeout(() => setProgress((p) => p + 1), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => {
          setPhase("deletingP");
          setParagraphIndex(0);
          setProgress(0);
        }, HOLD_DELAY);
      }
    } else if (phase === "deletingP") {
      const pLine = buildPLine(paragraphTexts[paragraphIndex]);
      const len = pLine.length;

      if (progress < len) {
        timeout = setTimeout(() => setProgress((p) => p + 1), DELETE_SPEED);
      } else {
        timeout = setTimeout(() => {
          if (paragraphIndex < paragraphTexts.length - 1) {
            setParagraphIndex((idx) => idx + 1);
            setPhase("typingP");
            setProgress(0);
          } else {
            setPhase("typingUL");
            setProgress(0);
          }
        }, 400);
      }
    } else if (phase === "typingP") {
      const pLine = buildPLine(paragraphTexts[paragraphIndex]);
      const len = pLine.length;

      if (progress < len) {
        timeout = setTimeout(() => setProgress((p) => p + 1), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => {
          setPhase("deletingP");
          setProgress(0);
        }, HOLD_DELAY);
      }
    } else if (phase === "typingUL") {
      const len = ulBlock.length;

      if (progress < len) {
        timeout = setTimeout(() => setProgress((p) => p + 1), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => {
          setPhase("deletingUL");
          setProgress(0);
        }, HOLD_DELAY_UL);
      }
    } else if (phase === "deletingUL") {
      const len = ulBlock.length;

      if (progress < len) {
        timeout = setTimeout(() => setProgress((p) => p + 1), DELETE_SPEED);
      } else {
        timeout = setTimeout(() => {
          setPhase("deletingDoc");
          setProgress(0);
        }, 400);
      }
    } else if (phase === "deletingDoc") {
      const fullDoc = skeletonHead + skeletonTail;
      const len = fullDoc.length;

      if (progress < len) {
        timeout = setTimeout(() => setProgress((p) => p + 1), DELETE_SPEED);
      } else {
        timeout = setTimeout(() => {
          setParagraphIndex(0);
          setPhase("typingDocP");
          setProgress(0);
        }, 800);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, progress, paragraphIndex]);

  // Compute what code should be visible based on current phase + progress
  let visibleCode = "";

  if (phase === "typingDocP") {
    const fullDoc =
      skeletonHead + buildPLine(paragraphTexts[0]) + skeletonTail;
    const len = fullDoc.length;
    visibleCode = fullDoc.slice(0, Math.min(progress, len));
  } else if (phase === "deletingP") {
    const pLine = buildPLine(paragraphTexts[paragraphIndex]);
    const len = pLine.length;
    const deleteCount = Math.min(progress, len);
    const remainingLen = Math.max(len - deleteCount, 0);
    const visibleP = pLine.slice(0, remainingLen);
    visibleCode = skeletonHead + visibleP + skeletonTail;
  } else if (phase === "typingP") {
    const pLine = buildPLine(paragraphTexts[paragraphIndex]);
    const len = pLine.length;
    const typedLen = Math.min(progress, len);
    const visibleP = pLine.slice(0, typedLen);
    visibleCode = skeletonHead + visibleP + skeletonTail;
  } else if (phase === "typingUL") {
    const len = ulBlock.length;
    const typedLen = Math.min(progress, len);
    const visibleUL = ulBlock.slice(0, typedLen);
    visibleCode = skeletonHead + visibleUL + skeletonTail;
  } else if (phase === "deletingUL") {
    const len = ulBlock.length;
    const deleteCount = Math.min(progress, len);
    const remainingLen = Math.max(len - deleteCount, 0);
    const visibleUL = ulBlock.slice(0, remainingLen);
    visibleCode = skeletonHead + visibleUL + skeletonTail;
  } else if (phase === "deletingDoc") {
    const fullDoc = skeletonHead + skeletonTail;
    const len = fullDoc.length;
    const deleteCount = Math.min(progress, len);
    const remainingLen = Math.max(len - deleteCount, 0);
    visibleCode = fullDoc.slice(0, remainingLen);
  }

  const lines = visibleCode.split("\n");
  const lineCount = Math.max(1, lines.length);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);
  const currentLineNumber = lineCount;
  const currentColumn = (lines[lines.length - 1]?.length || 0) + 1;

  // Basic HTML syntax highlight: tags red, text light gray
  const renderHighlightedCode = (code) => {
    const parts = [];
    let buffer = "";
    let inTag = false;

    for (let i = 0; i < code.length; i++) {
      const char = code[i];

      if (char === "<") {
        if (buffer) {
          parts.push({ text: buffer, inTag });
          buffer = "";
        }
        inTag = true;
        buffer += char;
      } else if (char === ">" && inTag) {
        buffer += char;
        parts.push({ text: buffer, inTag: true });
        buffer = "";
        inTag = false;
      } else {
        buffer += char;
      }
    }
    if (buffer) {
      parts.push({ text: buffer, inTag });
    }

    return parts.map((part, idx) => (
      <span
        key={idx}
        className={part.inTag ? "text-[#fb7185]" : "text-[#e5e5e5]"}
      >
        {part.text}
      </span>
    ));
  };

  return (
    <div className="w-full flex flex-col bg-[#0b0b0d] text-[#e5e5e5] text-[11px] max-[500px]:text-[9px] font-mono rounded-md border border-[#7f1d1d] overflow-hidden">
      {/* Top bar - dark red theme */}
      <div className="flex items-center justify-between h-7 px-3 max-[500px]:h-6 max-[500px]:px-2 bg-[#3f0d12] border-b border-[#7f1d1d]">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <span className="w-2 h-2 rounded-full bg-[#f97316]" />
          <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
        </div>
        <div className="text-xs max-[500px]:text-[10px] text-[#fecaca]">
          index.html
        </div>
        <div className="text-[10px] max-[500px]:text-[9px] text-[#fecaca]">
          UTF-8
        </div>
      </div>

      {/* Code area - height grows with content */}
      <div className="flex max-[500px]:px-1">
        {/* Line numbers */}
        <div className="flex flex-col items-end pt-2 pr-2 pl-1 w-8 max-[500px]:w-6 max-[500px]:pr-1 text-[10px] max-[500px]:text-[9px] text-[#a1a1aa] bg-[#12070a] select-none">
          {lineNumbers.map((n) => (
            <span key={n} className="leading-5 max-[500px]:leading-4">
              {n}
            </span>
          ))}
        </div>

        {/* Editor content */}
        <div className="pt-2 pr-3 pb-2 pl-1 max-[500px]:pr-2">
          <code className="block whitespace-pre-wrap leading-5 max-[500px]:leading-4">
            {renderHighlightedCode(visibleCode)}
            {/* Blinking cursor */}
            <span className="inline-block w-px h-4 align-middle bg-[#fecaca] ml-px animate-pulse" />
          </code>
        </div>
      </div>

      {/* Status bar (red bottom part) */}
      <div className="flex items-center justify-between h-6 max-[500px]:h-5 px-3 max-[500px]:px-2 bg-[#b91c1c] text-[10px] max-[500px]:text-[9px] text-white">
        <div className="flex items-center gap-3 max-[500px]:gap-1">
          <span>{`Ln ${currentLineNumber}, Col ${currentColumn}`}</span>
        </div>
        <div className="flex items-center gap-3 max-[500px]:gap-1">
          <span className="max-[500px]:hidden sm:inline">Spaces: 2</span>
          <span className="max-[500px]:hidden sm:inline">UTF-8</span>
          <span className="max-[500px]:hidden sm:inline">LF</span>
          <span>HTML</span>
        </div>
      </div>
    </div>
  );
};

export default VSCodePreview;