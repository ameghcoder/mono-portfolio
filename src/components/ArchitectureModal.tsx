"use client";

import { MermaidDiagram } from "./MermaidDiagram";
import { ZoomModal } from "./ZoomModal";

interface ArchitectureModalProps {
  source: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function ArchitectureModal({
  source,
  isOpen,
  onClose,
  title = "Architecture",
}: ArchitectureModalProps) {
  return (
    <ZoomModal isOpen={isOpen} onClose={onClose} title={title}>
      <MermaidDiagram source={source} />
    </ZoomModal>
  );
}
