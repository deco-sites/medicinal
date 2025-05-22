import { useRef, useEffect } from "preact/hooks";

interface Props {
  content: string;
}

export default function ({ content }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scripts = containerRef.current?.querySelectorAll("script");

    scripts?.forEach((script) => {
      const newScript = document.createElement("script");
      newScript.textContent = script.textContent;
      script.parentNode?.replaceChild(newScript, script);
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}